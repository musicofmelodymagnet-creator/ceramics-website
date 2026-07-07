<?php
declare(strict_types=1);
// Internal helper — must not be called directly as a web endpoint
if (!defined('GEO_INTERNAL')) { http_response_code(404); exit; }

function clientIp(): string {
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function currencyByIp(string $ip): string {
    return countryByIp($ip) === 'CA' ? 'cad' : 'usd';
}

function countryByIp(string $ip): string {
    $db = '/home/admin/web/orlinskyceramic.ca/private/GeoLite2-Country.mmdb';
    if (!file_exists($db)) return '';

    // Load MaxMind reader: compiled extension > Composer autoload > bundled copy
    if (!class_exists('\MaxMind\Db\Reader')) {
        $auto = '/home/admin/web/orlinskyceramic.ca/private/vendor/autoload.php';
        if (file_exists($auto)) require_once $auto;
    }
    if (!class_exists('\MaxMind\Db\Reader')) {
        $mmSrc = '/home/admin/web/orlinskyceramic.ca/private/maxmind-reader/src';
        if (is_dir($mmSrc)) {
            spl_autoload_register(static function (string $cls) use ($mmSrc): void {
                $f = $mmSrc . '/' . str_replace('\\', '/', $cls) . '.php';
                if (file_exists($f)) require_once $f;
            });
        }
    }
    if (!class_exists('\MaxMind\Db\Reader')) return '';

    try {
        $reader = new \MaxMind\Db\Reader($db);
        $record = $reader->get($ip);
        $reader->close();
        return $record['country']['iso_code'] ?? '';
    } catch (\Throwable $e) {
        error_log('[geo] ' . $e->getMessage());
        return '';
    }
}
