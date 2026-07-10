/* Wires the product page "Add to Cart" button (#order-btn) to the cart.
   Reads the current selection from the button's data-* attributes (kept in sync
   by the size switcher) and the active gallery image. */
(function () {
    'use strict';
    var btn = document.getElementById('order-btn');
    if (!btn) return;

    function currentImage() {
        var el = document.querySelector('.prod-slide.active') || document.querySelector('.prod-slide');
        return el ? el.getAttribute('src') : '';
    }

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!window.ORLCart) return;
        var id = btn.getAttribute('data-item');
        if (!id) return;
        window.ORLCart.add({
            id:    id,
            title: btn.getAttribute('data-title') || '',
            size:  btn.getAttribute('data-size') || '',
            price: parseInt(btn.getAttribute('data-price'), 10) || 0,
            img:   currentImage(),
            qty:   1
        });
    });
})();
