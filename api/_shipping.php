<?php
declare(strict_types=1);
// ─────────────────────────────────────────────────────────────────────────────
// TEMPORARY shipping stub. Replace shippingCents() with real carrier rates later.
// Rule: free shipping at/above threshold; otherwise a flat regional rate (cents).
// Same amounts as the client preview in cart.js — keep the two in sync until the
// real carrier integration lands.
// ─────────────────────────────────────────────────────────────────────────────
if (!defined('SHIP_FREE_THRESHOLD')) {
    define('SHIP_FREE_THRESHOLD', 30000); // $300.00 → free shipping
}

function shippingCents(int $subtotalCents, string $country): int {
    if ($subtotalCents >= SHIP_FREE_THRESHOLD) return 0;
    $country = strtoupper(trim($country));
    if ($country === 'CA') return 1200; // $12
    if ($country === 'US') return 1800; // $18
    $eu = ['GB','IE','DE','FR','IT','ES','NL','SE','NO','DK','FI','BE','AT','CH','PT','PL','CZ','GR','LU'];
    if (in_array($country, $eu, true)) return 2800; // $28
    return 3500; // $35 — rest of world
}
