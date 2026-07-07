<?php
declare(strict_types=1);
/**
 * Monthly GeoLite2-Country DB update endpoint.
 * Call: GET /api/_geo_update.php?token=<update_token>
 * Credentials and token live in private/geo-config.php (not in git).
 * Cron: 0 3 1 * * curl -s 'http://185.181.165.99:8080/api/_geo_update.php?token=TOKEN' -H 'Host: orlinskyceramic.ca'
 */

$BASE   = '/home/admin/web/orlinskyceramic.ca/private';
$config = @include "$BASE/geo-config.php";
if (!$config) { http_response_code(503); echo 'config missing'; exit; }

$tok = $_GET['token'] ?? '';
if (!hash_equals($config['update_token'], $tok)) {
    http_response_code(403); echo 'forbidden'; exit;
}

header('Content-Type: text/plain');
$acct = $config['account_id'];
$key  = $config['license_key'];
$url  = "https://download.maxmind.com/geoip/databases/GeoLite2-Country/download?suffix=tar.gz";
$dest = "$BASE/GeoLite2-Country.mmdb";
$tmp  = sys_get_temp_dir() . '/geo_update_' . getmypid() . '.tar.gz';

// Download via PHP curl
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_USERPWD        => "$acct:$key",
    CURLOPT_TIMEOUT        => 120,
]);
$data = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($err || $code !== 200 || strlen($data) < 100000) {
    http_response_code(500);
    echo "Download failed: HTTP $code, " . strlen($data) . " bytes, err=$err\n";
    exit;
}
echo "Downloaded: " . strlen($data) . " bytes (HTTP $code)\n";

file_put_contents($tmp, $data);
$phar = new PharData($tmp);
$tmpdir = sys_get_temp_dir() . '/geo_update_' . getmypid();
@mkdir($tmpdir, 0700);
$phar->extractTo($tmpdir, null, true);

// Find mmdb file
$mmdb = null;
foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($tmpdir)) as $f) {
    if ($f->getExtension() === 'mmdb') { $mmdb = $f->getPathname(); break; }
}

if (!$mmdb) {
    array_map('unlink', glob("$tmpdir/*"));
    rmdir($tmpdir);
    unlink($tmp);
    http_response_code(500);
    echo "mmdb not found in archive\n"; exit;
}
echo "Extracted: $mmdb (" . filesize($mmdb) . " bytes)\n";

copy($mmdb, $dest);
chmod($dest, 0640);
echo "Installed to: $dest\n";

// Cleanup
array_map(static function($f) { is_dir($f) ? rmdir($f) : unlink($f); },
    array_merge(glob("$tmpdir/*/*"), glob("$tmpdir/*")));
@rmdir($tmpdir);
@unlink($tmp);

echo "Done: GeoLite2-Country.mmdb updated " . date('Y-m-d H:i:s') . "\n";
