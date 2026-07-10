<?php
declare(strict_types=1);
header('Content-Type: application/json');
header('Cache-Control: no-store, private');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}

define('CHAT_INTERNAL', 1);
require __DIR__ . '/_knowledge.php';

$BASE   = '/home/admin/web/orlinskyceramic.ca/private';
$config = require "$BASE/services-config.php";
$apiKey = $config['anthropic_api_key'] ?? '';
if (!$apiKey) {
    http_response_code(503);
    echo json_encode(['error' => 'Chat is temporarily unavailable.']); exit;
}

// ── Rate limiting: 30 requests per IP per hour (atomic via flock) ────────────
function checkRateLimit(string $ip): bool {
    $f   = sys_get_temp_dir() . '/orlchat_' . md5($ip) . '.json';
    $now = time();
    $fh  = fopen($f, 'c+');
    if (!$fh) return true; // проблемы с ФС — не блокируем живых пользователей
    flock($fh, LOCK_EX);
    $d      = json_decode(stream_get_contents($fh) ?: '', true) ?? ['r' => []];
    $d['r'] = array_values(array_filter($d['r'] ?? [], fn($t) => $now - $t < 3600));
    if (count($d['r']) >= 30) {
        flock($fh, LOCK_UN); fclose($fh);
        return false;
    }
    $d['r'][] = $now;
    rewind($fh); ftruncate($fh, 0);
    fwrite($fh, json_encode($d));
    flock($fh, LOCK_UN); fclose($fh);
    return true;
}

// ── Input sanitization ───────────────────────────────────────────────────────
function sanitize(string $s): string {
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $s);
    return mb_substr(trim($s), 0, 800);
}

// ── Prompt injection detection ───────────────────────────────────────────────
function isInjection(string $s): bool {
    foreach ([
        '/ignore\s+(all\s+)?(previous|prior|above|your)\s+(instructions?|prompt|rules)/i',
        '/you\s+are\s+now\s+(a\s+)?(different|new|another|not\s+emma)/i',
        '/system\s*prompt/i',
        '/jailbreak/i',
        '/forget\s+(everything|all|your|these)\s+(instructions?|rules|prompt)/i',
        '/reveal\s+(your|the)\s+(prompt|instructions?|api[\s_]?key|config)/i',
        '/override\s+(your|the|all)\s*(instructions?|rules|prompt)/i',
        '/\bDAN\b/',
        '/pretend\s+(you\s+are|to\s+be)\s+(?!emma|a\s+studio|an?\s+assistant)/i',
        '/what\s+are\s+your\s+(instructions?|rules|prompt|training)/i',
    ] as $p) {
        if (preg_match($p, $s)) return true;
    }
    return false;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
if (!checkRateLimit($ip)) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please try again in a little while.']); exit;
}

$raw     = json_decode(file_get_contents('php://input'), true) ?? [];
$message = sanitize($raw['message'] ?? '');

if (!$message) {
    http_response_code(400); echo json_encode(['error' => 'Empty message']); exit;
}

if (isInjection($message)) {
    echo json_encode(['reply' => "I'm here to help with questions about our ceramics and studio. What can I assist you with?"]);
    exit;
}

// ── Build messages (max 8 history entries = 4 turns) ─────────────────────────
$history  = array_slice($raw['history'] ?? [], -8);
$messages = [];
foreach ($history as $h) {
    $role    = ($h['role'] ?? '') === 'user' ? 'user' : 'assistant';
    $content = sanitize($h['content'] ?? '');
    if ($content && !isInjection($content)) $messages[] = ['role' => $role, 'content' => $content];
}
$messages[] = ['role' => 'user', 'content' => $message];

// ── Call Anthropic Messages API ───────────────────────────────────────────────
$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode([
        'model'      => 'claude-haiku-4-5-20251001',
        'max_tokens' => 400,
        'system'     => getSystemPrompt(),
        'messages'   => $messages,
    ]),
    CURLOPT_TIMEOUT  => 30,
    CURLOPT_HTTPHEADER => [
        'x-api-key: '          . $apiKey,
        'anthropic-version: 2023-06-01',
        'content-type: application/json',
    ],
]);

$resp = curl_exec($ch);
$code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($err || $code !== 200) {
    error_log('[chat] Anthropic error HTTP ' . $code . ': ' . $err);
    http_response_code(500);
    echo json_encode(['error' => 'Unable to respond right now. Please try again shortly.']); exit;
}

$data  = json_decode($resp, true);
$reply = $data['content'][0]['text'] ?? '';

if (!$reply) {
    http_response_code(500);
    echo json_encode(['error' => 'Empty response from AI']); exit;
}

echo json_encode(['reply' => $reply]);
