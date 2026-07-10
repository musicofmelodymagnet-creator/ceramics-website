/* ORLINSKY — storefront currency display.
   Determines the visitor's currency (CAD/USD) from the server geo endpoint and
   prefixes displayed prices accordingly (CA$ / US$). Server remains the source
   of truth for the charged amount; this only affects presentation. */
(function () {
    'use strict';

    var CACHE_KEY = 'orl_currency_v1';

    function prefixFor(code) {
        return code === 'cad' ? 'CA$' : 'US$';
    }

    // Normalise any existing CA$/US$/$ back to a single $, then apply the prefix.
    function reprice(el, prefix) {
        var base = (el.getAttribute('data-price-base') || el.textContent);
        if (!el.getAttribute('data-price-base')) el.setAttribute('data-price-base', base);
        el.textContent = base.replace(/(?:CA\$|US\$|\$)/g, prefix);
    }

    function apply(code) {
        var prefix = prefixFor(code);
        window.ORL_CURRENCY = { code: code.toUpperCase(), prefix: prefix };
        var nodes = document.querySelectorAll('.g-price, .gcat-price, #price-display, [data-currency-price]');
        for (var i = 0; i < nodes.length; i++) reprice(nodes[i], prefix);
        // Let page scripts (e.g. product size switcher) react.
        try { document.dispatchEvent(new CustomEvent('orl-currency', { detail: { code: code, prefix: prefix } })); } catch (e) {}
    }

    var cached = null;
    try { cached = sessionStorage.getItem(CACHE_KEY); } catch (e) {}
    if (cached) { apply(cached); return; }

    var done = false;
    function resolve(code) {
        if (done) return; done = true;
        try { sessionStorage.setItem(CACHE_KEY, code); } catch (e) {}
        apply(code);
    }

    try {
        var ctrl = new AbortController();
        var timer = setTimeout(function () { ctrl.abort(); }, 4000);
        fetch('/api/currency.php', { signal: ctrl.signal })
            .then(function (r) { return r.json(); })
            .then(function (d) {
                clearTimeout(timer);
                var code = (d && d.ready && (d.currency === 'cad' || d.currency === 'usd')) ? d.currency : 'usd';
                resolve(code);
            })
            .catch(function () { resolve('usd'); });
    } catch (e) { resolve('usd'); }
})();
