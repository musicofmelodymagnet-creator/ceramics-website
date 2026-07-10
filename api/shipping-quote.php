<?php
declare(strict_types=1);
header('Content-Type: application/json');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}

define('GEO_INTERNAL', 1);
require __DIR__ . '/_geo.php';
require __DIR__ . '/_shipping.php';

$BASE    = '/home/admin/web/orlinskyceramic.ca/private';
$catalog = require $BASE . '/catalog.php';
$currency = currencyByIp(clientIp());

$input    = json_decode(file_get_contents('php://input'), true) ?? [];
$rawItems = $input['items'] ?? [];
if (!is_array($rawItems) || count($rawItems) === 0) {
    http_response_code(400); echo json_encode(['error' => 'No items']); exit;
}

// Subtotal from the SERVER catalog — client prices are ignored.
$subtotal = 0;
foreach ($rawItems as $it) {
    $id  = is_array($it) ? ($it['id'] ?? '') : $it;
    $qty = is_array($it) ? (int) ($it['qty'] ?? 1) : 1;
    $qty = max(1, min(10, $qty));
    if (!is_string($id) || !isset($catalog[$id])) continue; // ignore unknown for a quote
    $subtotal += (int) $catalog[$id]['price'] * $qty;
}

$country = strtoupper(substr(trim((string) ($input['country'] ?? 'CA')), 0, 2));
$ship    = shippingCents($subtotal, $country);

echo json_encode([
    'subtotal'      => $subtotal,
    'shipping'      => $ship,
    'total'         => $subtotal + $ship,
    'freeShipping'  => $ship === 0,
    'freeThreshold' => SHIP_FREE_THRESHOLD,
    'currency'      => $currency,
]);
