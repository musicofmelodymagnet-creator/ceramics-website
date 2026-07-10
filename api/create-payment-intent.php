<?php
declare(strict_types=1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']); exit;
}

// Currency determined server-side by client IP via MaxMind GeoLite2.
// CA → CAD, everyone else → USD.  Falls back to USD if DB not installed yet.
define('GEO_INTERNAL', 1);
require __DIR__ . '/_geo.php';
$ip       = clientIp();
$currency = currencyByIp($ip);

// ── Rate limiting: 20 payment intents per IP per hour (atomic via flock) ─────
function checkPayRateLimit(string $ip): bool {
    $f   = sys_get_temp_dir() . '/orlpay_' . md5($ip) . '.json';
    $now = time();
    $fh  = fopen($f, 'c+');
    if (!$fh) return true; // filesystem issue — don't block real customers
    flock($fh, LOCK_EX);
    $d      = json_decode(stream_get_contents($fh) ?: '', true) ?? ['r' => []];
    $d['r'] = array_values(array_filter($d['r'] ?? [], fn($t) => $now - $t < 3600));
    if (count($d['r']) >= 20) {
        flock($fh, LOCK_UN); fclose($fh);
        return false;
    }
    $d['r'][] = $now;
    rewind($fh); ftruncate($fh, 0); fwrite($fh, json_encode($d));
    flock($fh, LOCK_UN); fclose($fh);
    return true;
}
if (!checkPayRateLimit($ip)) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many attempts. Please wait a moment and try again.']); exit;
}

$BASE    = '/home/admin/web/orlinskyceramic.ca/private';
require $BASE . '/vendor/autoload.php';
$config  = require $BASE . '/stripe-config.php';
$catalog = require $BASE . '/catalog.php';

\Stripe\Stripe::setApiKey($config['secret_key']);

$input = json_decode(file_get_contents('php://input'), true) ?? [];

$items = $input['items'] ?? [];
if (!is_array($items) || count($items) === 0) {
    http_response_code(400);
    echo json_encode(['error' => 'No items']); exit;
}

// СУММА СЧИТАЕТСЯ ТОЛЬКО ПО СЕРВЕРНОМУ КАТАЛОГУ — фронт цену не диктует
$amount = 0; $titles = [];
foreach ($items as $id) {
    if (!isset($catalog[$id])) {
        http_response_code(400);
        echo json_encode(['error' => 'Unknown item']); exit;
    }
    $amount  += (int) $catalog[$id]['price'];
    $titles[] = $catalog[$id]['title'];
}

$ship = $input['shipping'] ?? [];

$intentParams = [
    'amount'   => $amount,
    'currency' => $currency,
    'payment_method_types' => ['card'],
    'description'   => 'ORLINSKY Ceramic — ' . implode(', ', $titles),
    'metadata' => ['product_ids' => implode(',', $items)],
];

// receipt_email только если это валидный email — иначе просто не ставим
if (filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
    $intentParams['receipt_email'] = $input['email'];
}

// Shipping only if name is provided (Stripe rejects empty name)
// Все поля обрезаются до 200 символов перед передачей в Stripe
$clip = fn($v) => mb_substr(trim((string) $v), 0, 200);
if (!empty($ship['name'])) {
    $intentParams['shipping'] = [
        'name'    => $clip($ship['name']),
        'phone'   => ($ship['phone'] ?? '') !== '' ? $clip($ship['phone']) : null,
        'address' => [
            'line1'       => $clip($ship['line1'] ?? ''),
            'line2'       => ($ship['line2'] ?? '') !== '' ? $clip($ship['line2']) : null,
            'city'        => $clip($ship['city'] ?? ''),
            'state'       => $clip($ship['state'] ?? ''),
            'postal_code' => $clip($ship['postal_code'] ?? ''),
            'country'     => $clip($ship['country'] ?? 'CA'),
        ],
    ];
}

try {
    $intent = \Stripe\PaymentIntent::create($intentParams);

    echo json_encode([
        'clientSecret' => $intent->client_secret,
        'amount'       => $amount,
        'currency'     => $currency,
    ]);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Payment init failed']);
    error_log('[stripe] ' . $e->getMessage());
}
