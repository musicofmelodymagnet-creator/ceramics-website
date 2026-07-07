<?php
declare(strict_types=1);
header('Content-Type: application/json');
header('Cache-Control: no-store, private');

define('GEO_INTERNAL', 1);
require __DIR__ . '/_geo.php';

$ip       = clientIp();
$country  = countryByIp($ip);
$currency = $country === 'CA' ? 'cad' : 'usd';
$ready    = $country !== ''; // false when GeoLite2 DB not yet installed

echo json_encode([
    'currency' => $currency,
    'ready'    => $ready,
]);
