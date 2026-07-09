<?php
declare(strict_types=1);
header('Content-Type: application/json');
header('Cache-Control: no-store, private');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}

$BASE   = '/home/admin/web/orlinskyceramic.ca/private';
$config = require "$BASE/services-config.php";
$key    = $config['resend_api_key'] ?? '';
if (!$key) {
    http_response_code(503); echo json_encode(['error' => 'Service unavailable']); exit;
}

$raw     = json_decode(file_get_contents('php://input'), true) ?? [];

// Honeypot — bot filled a hidden field, silently pretend success
if (trim($raw['hp'] ?? '') !== '') {
    echo json_encode(['success' => true]); exit;
}

$name    = mb_substr(trim(strip_tags($raw['name']    ?? '')), 0, 200);
$email   = trim($raw['email']   ?? '');
$message = mb_substr(trim(strip_tags($raw['message'] ?? '')), 0, 5000);

if (!$name || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); echo json_encode(['error' => 'Invalid input']); exit;
}

// reCAPTCHA v3 verification
$rcSecret = $config['recaptcha_secret_key'] ?? '';
$rcToken  = trim($raw['recaptcha_token'] ?? '');
if ($rcSecret && $rcToken) {
    $rc = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($rc, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query(['secret' => $rcSecret, 'response' => $rcToken]),
        CURLOPT_TIMEOUT        => 10,
    ]);
    $gr   = json_decode(curl_exec($rc), true);
    curl_close($rc);
    if (!($gr['success'] ?? false) || ($gr['score'] ?? 0) < 0.5) {
        http_response_code(400);
        echo json_encode(['error' => 'Verification failed. Please try again.']); exit;
    }
}

$html = '<p><strong>From:</strong> ' . htmlspecialchars($name) . ' &lt;' . htmlspecialchars($email) . '&gt;</p>'
      . '<p><strong>Message:</strong></p><p>' . nl2br(htmlspecialchars($message)) . '</p>';

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode([
        'from'     => 'ORLINSKY Ceramic Studio <noreply@orlinskyceramic.ca>',
        'to'       => ['info@orlinskyceramic.ca'],
        'reply_to' => $email,
        'subject'  => 'New message from ' . $name . ' — orlinskyceramic.ca',
        'html'     => $html,
    ]),
    CURLOPT_TIMEOUT    => 15,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $key,
        'Content-Type: application/json',
    ],
]);

$resp = curl_exec($ch);
$code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($err || $code >= 400) {
    error_log('[contact] Resend error HTTP ' . $code . ': ' . $err . ' ' . $resp);
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send. Please email us directly at info@orlinskyceramic.ca']); exit;
}

echo json_encode(['success' => true]);
