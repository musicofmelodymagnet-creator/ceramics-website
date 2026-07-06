<?php
declare(strict_types=1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']); exit;
}

$VENDOR  = '/home/orlinskyceramic';                                  // vendor вне webroot
$SECRETS = '/home/admin/web/orlinskyceramic.ca/private';            // ключи вне webroot
require $VENDOR  . '/vendor/autoload.php';
$config  = require $SECRETS . '/stripe-config.php';
$catalog = require $SECRETS . '/catalog.php';

\Stripe\Stripe::setApiKey($config['secret_key']);

$input = json_decode(file_get_contents('php://input'), true) ?? [];

$currency = strtolower($input['currency'] ?? '');
if (!in_array($currency, ['cad', 'usd'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid currency']); exit;
}

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
    $amount  += (int) $catalog[$id][$currency];
    $titles[] = $catalog[$id]['title'];
}

$ship = $input['shipping'] ?? [];

try {
    $intent = \Stripe\PaymentIntent::create([
        'amount'   => $amount,
        'currency' => $currency,
        'automatic_payment_methods' => ['enabled' => true],
        'description'   => 'ORLANSKI Ceramic — ' . implode(', ', $titles),
        'receipt_email' => $input['email'] ?? null,
        'shipping' => [
            'name'    => $ship['name'] ?? '',
            'phone'   => $ship['phone'] ?? null,
            'address' => [
                'line1'       => $ship['line1'] ?? '',
                'line2'       => $ship['line2'] ?? null,
                'city'        => $ship['city'] ?? '',
                'state'       => $ship['state'] ?? '',
                'postal_code' => $ship['postal_code'] ?? '',
                'country'     => $ship['country'] ?? '',
            ],
        ],
        'metadata' => ['product_ids' => implode(',', $items)],
    ]);

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
