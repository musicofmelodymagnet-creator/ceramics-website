/* ORLINSKY — guest shopping cart (no accounts).
   Source of truth for PRICES is always the server (create-payment-intent.php /
   shipping-quote.php re-validate everything from the private catalog). This file
   only stores a convenience copy for display and drives the cart UI. */
(function () {
    'use strict';

    var KEY = 'orlinsky_cart_v1';
    var MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
    var MAX_QTY = 10;
    var FREE_THRESHOLD = 30000; // cents ($300) — keep in sync with api/_shipping.php

    // ── Storage ────────────────────────────────────────────────────────────────
    function load() {
        try {
            var s = JSON.parse(localStorage.getItem(KEY) || 'null');
            if (s && s.ts && (Date.now() - s.ts) < MAX_AGE && Array.isArray(s.items)) {
                return s.items;
            }
        } catch (e) {}
        return [];
    }
    function save(items) {
        try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), items: items.slice(0, 50) })); } catch (e) {}
    }

    var items = load();
    var listeners = [];

    function emit() { listeners.forEach(function (cb) { try { cb(items); } catch (e) {} }); updateButton(); }

    function count() { return items.reduce(function (n, i) { return n + i.qty; }, 0); }
    function subtotalCents() { return items.reduce(function (n, i) { return n + i.price * i.qty; }, 0); }

    // Only keep fields we control; coerce types (defensive against tampered storage).
    function sanitizeItem(raw) {
        var qty = parseInt(raw.qty, 10); if (!(qty >= 1)) qty = 1; if (qty > MAX_QTY) qty = MAX_QTY;
        var price = parseInt(raw.price, 10); if (!(price >= 0)) price = 0;
        return {
            id:    String(raw.id || ''),
            title: String(raw.title || ''),
            size:  String(raw.size || ''),
            img:   String(raw.img || ''),
            price: price,
            qty:   qty
        };
    }

    function add(raw) {
        var it = sanitizeItem(raw);
        if (!it.id) return;
        var found = null;
        for (var i = 0; i < items.length; i++) { if (items[i].id === it.id) { found = items[i]; break; } }
        if (found) { found.qty = Math.min(MAX_QTY, found.qty + it.qty); }
        else { items.push(it); }
        save(items); emit(); toast('Added to cart');
    }
    function setQty(id, qty) {
        qty = parseInt(qty, 10);
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                if (!(qty >= 1)) { items.splice(i, 1); }
                else { items[i].qty = Math.min(MAX_QTY, qty); }
                break;
            }
        }
        save(items); emit();
    }
    function remove(id) {
        items = items.filter(function (i) { return i.id !== id; });
        save(items); emit();
    }
    function clear() { items = []; save(items); emit(); }

    // Public API
    window.ORLCart = {
        add: add, remove: remove, setQty: setQty, clear: clear,
        items: function () { return items.map(function (i) { return Object.assign({}, i); }); },
        count: count, subtotalCents: subtotalCents,
        freeThreshold: FREE_THRESHOLD,
        onChange: function (cb) { listeners.push(cb); },
        money: money
    };

    // ── Money formatting (uses currency.js prefix if present) ────────────────────
    function money(cents) {
        var prefix = (window.ORL_CURRENCY && window.ORL_CURRENCY.prefix) ? window.ORL_CURRENCY.prefix : '$';
        var v = cents / 100;
        var s = (cents % 100 === 0) ? String(v) : v.toFixed(2);
        // thousands separator
        s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return prefix + s;
    }

    // ── Floating cart button + toast (injected on every page) ────────────────────
    var CSS = [
        '#orl-cart-btn{position:fixed;top:84px;right:24px;z-index:95;display:none;align-items:center;gap:8px;background:#16130F;border:1px solid #2E2820;color:#F5F1E8;padding:9px 14px;border-radius:30px;cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;box-shadow:0 4px 18px rgba(0,0,0,0.4);transition:transform 140ms ease,border-color 160ms ease;text-decoration:none;border-bottom:1px solid #2E2820;}',
        '#orl-cart-btn:hover{transform:translateY(-1px);border-color:#C8701F;}',
        '#orl-cart-btn svg{width:16px;height:16px;stroke:#C8701F;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;}',
        '#orl-cart-count{min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#C8701F;color:#16130F;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}',
        '#orl-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);z-index:9999;background:#2C2724;color:#F5F1E8;border:1px solid #C8701F;padding:12px 22px;border-radius:6px;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;opacity:0;pointer-events:none;transition:opacity 220ms ease,transform 260ms cubic-bezier(0.34,1.1,0.64,1);box-shadow:0 6px 24px rgba(0,0,0,0.4);}',
        '#orl-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}',
        '@media(max-width:480px){#orl-cart-btn{top:auto;bottom:92px;right:16px;}}'
    ].join('');

    function injectUI() {
        if (document.getElementById('orl-cart-btn')) return;
        var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);

        var btn = document.createElement('a');
        btn.id = 'orl-cart-btn'; btn.href = 'cart.html'; btn.setAttribute('aria-label', 'View cart');
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span>Cart</span><span id="orl-cart-count">0</span>';
        document.body.appendChild(btn);

        var t = document.createElement('div'); t.id = 'orl-toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
        document.body.appendChild(t);
        updateButton();
    }

    function updateButton() {
        var btn = document.getElementById('orl-cart-btn');
        if (!btn) return;
        var c = count();
        var cEl = document.getElementById('orl-cart-count');
        if (cEl) cEl.textContent = String(c);
        btn.style.display = c > 0 ? 'inline-flex' : 'none';
    }

    var toastTimer = null;
    function toast(msg) {
        var t = document.getElementById('orl-toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
    }

    // Cross-tab sync
    window.addEventListener('storage', function (e) {
        if (e.key !== KEY) return;
        items = load(); emit();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectUI);
    } else {
        injectUI();
    }
})();
