<?php
declare(strict_types=1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']); exit;
}

$BASE    = '/home/admin/web/orlinskyceramic.ca/private';
require $BASE . '/vendor/autoload.php';
$config  = require $BASE . '/stripe-config.php';
$catalog = require $BASE . '/catalog.php';

\Stripe\Stripe::setApiKey($config['secret_key']);

$input = json_decode(file_get_contents('php://input'), true) ?? [];

// Currency is determined SERVER-SIDE from HTTP_HOST — never from client input.
// This prevents a client from switching to a cheaper currency by manipulating the request.
$reqHost  = strtolower($_SERVER['HTTP_HOST'] ?? '');
$currency = str_contains($reqHost, '.com') ? 'usd' : 'cad';

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
    'description'   => 'ORLANSKI Ceramic — ' . implode(', ', $titles),
    'metadata' => ['product_ids' => implode(',', $items)],
];

if (($input['email'] ?? '') !== '') {
    $intentParams['receipt_email'] = $input['email'];
}

// Shipping only if name is provided (Stripe rejects empty name)
if (!empty($ship['name'])) {
    $intentParams['shipping'] = [
        'name'    => $ship['name'],
        'phone'   => ($ship['phone'] ?? '') !== '' ? $ship['phone'] : null,
        'address' => [
            'line1'       => $ship['line1'] ?? '',
            'line2'       => ($ship['line2'] ?? '') !== '' ? $ship['line2'] : null,
            'city'        => $ship['city'] ?? '',
            'state'       => $ship['state'] ?? '',
            'postal_code' => $ship['postal_code'] ?? '',
            'country'     => $ship['country'] ?? 'CA',
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
