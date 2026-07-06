<?php
declare(strict_types=1);

$BASE   = '/home/admin/web/orlinskyceramic.ca/private';
require $BASE . '/vendor/autoload.php';
$config = require $BASE . '/stripe-config.php';

\Stripe\Stripe::setApiKey($config['secret_key']);

$payload   = file_get_contents('php://input');
$sigHeader = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

try {
    // Проверка подписи — защита от подделки запроса
    $event = \Stripe\Webhook::constructEvent($payload, $sigHeader, $config['webhook_secret']);
} catch (\Throwable $e) {
    http_response_code(400); exit; // подпись не прошла — игнорируем
}

if ($event->type === 'payment_intent.succeeded') {
    $pi = $event->data->object;
    $order = [
        'time'     => date('c'),
        'id'       => $pi->id,
        'amount'   => $pi->amount,
        'currency' => $pi->currency,
        'email'    => $pi->receipt_email,
        'products' => $pi->metadata->product_ids ?? '',
        'shipping' => $pi->shipping,
    ];
    // Заказ в приватный лог (одна JSON-строка на заказ)
    file_put_contents($BASE . '/orders.log',
        json_encode($order, JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX);

    // Уведомление на почту (раскомментируй и подставь адрес)
    // mail('you@orlinskyceramic.ca', 'Новый заказ ' . $pi->id, print_r($order, true));
}

http_response_code(200); // Stripe ждёт 200, иначе будет ретраить
