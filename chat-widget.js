/* ORLINSKY Emma — floating chat widget
   Shared localStorage key keeps history across all pages */
(function () {
    'use strict';

    var STORAGE_KEY = 'orlinsky_emma_v1';
    var MAX_AGE     = 7 * 24 * 60 * 60 * 1000; // 7 days
    var API_URL     = '/api/chat.php';
    var SITE_KEY    = '6LfE10stAAAAAFnHCUdzWwwps9sRfxfwNowmchIw';

    // ── Persist history ───────────────────────────────────────────────────────
    var chatHistory = [];

    function loadHistory() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var s = JSON.parse(raw);
            if (s && s.ts && (Date.now() - s.ts) < MAX_AGE) {
                chatHistory = s.messages || [];
            }
        } catch (e) {}
    }

    function saveHistory() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ts: Date.now(),
                messages: chatHistory.slice(-40)
            }));
        } catch (e) {}
    }

    loadHistory();

    // ── Inject CSS ────────────────────────────────────────────────────────────
    var CSS = [
        /* z-index 90: above page content, below sticky header (100) and mobile menu (99) */
        '#emma-fab{position:fixed;bottom:28px;right:28px;z-index:90;display:flex;flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none}',

        /* Button */
        '#emma-btn{width:54px;height:54px;border-radius:50%;background:oklch(58% 0.12 45);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px oklch(58% 0.12 45 / 0.5),0 2px 6px oklch(0% 0 0 / 0.18);transition:background 180ms ease,transform 120ms ease,box-shadow 180ms ease;pointer-events:all;position:relative;flex-shrink:0;outline:none}',
        '#emma-btn:hover{background:oklch(53% 0.14 45);transform:scale(1.09);box-shadow:0 6px 24px oklch(58% 0.12 45 / 0.55),0 2px 8px oklch(0% 0 0 / 0.2)}',
        '#emma-btn:focus-visible{outline:2px solid oklch(58% 0.12 45);outline-offset:3px}',
        '#emma-btn svg{transition:opacity 140ms ease,transform 140ms ease;position:absolute}',
        '#emma-ic-x{opacity:0;transform:rotate(-45deg) scale(0.7)}',
        '#emma-fab.emma-open #emma-ic-chat{opacity:0;transform:rotate(45deg) scale(0.7)}',
        '#emma-fab.emma-open #emma-ic-x{opacity:1;transform:rotate(0) scale(1)}',

        /* Unread badge */
        '#emma-badge{position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:oklch(52% 0.17 30);display:flex;align-items:center;justify-content:center;font-size:10px;font-family:monospace;color:#fff;font-weight:700;box-shadow:0 1px 4px oklch(0% 0 0 / 0.3);pointer-events:none;display:none}',

        /* Panel */
        '#emma-panel{width:368px;background:oklch(97.5% 0.006 75);border-radius:16px;box-shadow:0 12px 56px oklch(16% 0.05 50 / 0.22),0 3px 12px oklch(16% 0.05 50 / 0.12);display:flex;flex-direction:column;overflow:hidden;max-height:0;opacity:0;transform:translateY(10px) scale(0.97);transform-origin:bottom right;transition:max-height 280ms cubic-bezier(0.34,1.1,0.64,1),opacity 200ms ease,transform 220ms cubic-bezier(0.34,1.1,0.64,1);pointer-events:none;border:1px solid oklch(88% 0.01 75 / 0.6)}',
        '#emma-fab.emma-open #emma-panel{max-height:540px;opacity:1;transform:translateY(0) scale(1);pointer-events:all}',

        /* Header */
        '.ew-head{background:oklch(21% 0.045 50);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}',
        '.ew-head-left{display:flex;align-items:center;gap:10px}',
        '.ew-avatar{width:36px;height:36px;border-radius:50%;background:oklch(58% 0.12 45);display:flex;align-items:center;justify-content:center;font-family:Georgia,"Times New Roman",serif;font-size:16px;font-weight:400;color:#fff;flex-shrink:0;letter-spacing:0}',
        '.ew-name{font-family:Georgia,"Times New Roman",serif;font-size:15px;font-weight:400;color:oklch(95% 0.008 75);line-height:1;margin-bottom:3px}',
        '.ew-sub{font-family:monospace;font-size:8px;letter-spacing:0.26em;text-transform:uppercase;color:oklch(58% 0.12 45);line-height:1}',
        '.ew-head-right{display:flex;align-items:center;gap:4px}',
        '.ew-icon-btn{background:none;border:none;cursor:pointer;padding:6px;color:oklch(55% 0.02 50);border-radius:6px;display:flex;align-items:center;transition:color 140ms ease,background 140ms ease}',
        '.ew-icon-btn:hover{color:oklch(80% 0.01 75);background:oklch(28% 0.04 50)}',

        /* Messages */
        '.ew-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;min-height:120px;max-height:360px}',
        '.ew-msgs::-webkit-scrollbar{width:4px}',
        '.ew-msgs::-webkit-scrollbar-track{background:transparent}',
        '.ew-msgs::-webkit-scrollbar-thumb{background:oklch(82% 0.01 75);border-radius:2px}',

        /* Message rows */
        '.ew-msg{display:flex;flex-direction:column;max-width:82%}',
        '.ew-msg.user{align-self:flex-end;align-items:flex-end}',
        '.ew-msg.bot{align-self:flex-start;align-items:flex-start}',
        '.ew-bubble{padding:9px 13px;border-radius:14px;font-family:Georgia,"Times New Roman",serif;font-size:13.5px;line-height:1.55;word-break:break-word}',
        '.ew-msg.bot .ew-bubble{background:#fff;color:oklch(21% 0.045 50);border-bottom-left-radius:4px;box-shadow:0 1px 4px oklch(0% 0 0 / 0.07)}',
        '.ew-msg.user .ew-bubble{background:oklch(21% 0.045 50);color:oklch(95% 0.008 75);border-bottom-right-radius:4px}',

        /* Typing */
        '.ew-typing{display:flex;align-items:center;gap:5px;padding:11px 14px;background:#fff;border-radius:14px;border-bottom-left-radius:4px;box-shadow:0 1px 4px oklch(0% 0 0 / 0.07);align-self:flex-start}',
        '.ew-typing span{width:6px;height:6px;border-radius:50%;background:oklch(62% 0.04 50);animation:ew-td 1.3s infinite ease-in-out}',
        '.ew-typing span:nth-child(2){animation-delay:.18s}',
        '.ew-typing span:nth-child(3){animation-delay:.36s}',
        '@keyframes ew-td{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-5px);opacity:1}}',

        /* Input */
        '.ew-input-row{padding:10px 12px 12px;background:oklch(97.5% 0.006 75);border-top:1px solid oklch(90% 0.008 75);display:flex;align-items:center;gap:8px;flex-shrink:0}',
        '#emma-input{flex:1;border:1.5px solid oklch(87% 0.012 75);border-radius:22px;padding:8px 14px;font-family:Georgia,"Times New Roman",serif;font-size:13px;color:oklch(21% 0.045 50);background:#fff;outline:none;transition:border-color 160ms ease;line-height:1.4}',
        '#emma-input:focus{border-color:oklch(58% 0.12 45)}',
        '#emma-input::placeholder{color:oklch(66% 0.02 75)}',
        '#emma-send{width:36px;height:36px;border-radius:50%;background:oklch(58% 0.12 45);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 150ms ease,transform 100ms ease;box-shadow:0 2px 8px oklch(58% 0.12 45 / 0.35)}',
        '#emma-send:hover{background:oklch(53% 0.14 45);transform:scale(1.08)}',
        '#emma-send:disabled{opacity:0.5;cursor:default;transform:none}',

        /* Mobile */
        '@media(max-width:440px){#emma-fab{bottom:16px;right:16px}#emma-panel{width:calc(100vw - 24px)}}'
    ].join('');

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // ── Build DOM ─────────────────────────────────────────────────────────────
    var fab = document.createElement('div');
    fab.id = 'emma-fab';
    fab.innerHTML =
        '<div id="emma-panel" role="dialog" aria-label="Chat with Emma" aria-hidden="true">' +
            '<div class="ew-head">' +
                '<div class="ew-head-left">' +
                    '<div class="ew-avatar">E</div>' +
                    '<div><div class="ew-name">Emma</div><div class="ew-sub">Studio · ORLINSKY</div></div>' +
                '</div>' +
                '<div class="ew-head-right">' +
                    '<button class="ew-icon-btn" id="ew-clear" title="Clear history">' +
                        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>' +
                    '</button>' +
                    '<button class="ew-icon-btn" id="ew-close" aria-label="Close">' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<div class="ew-msgs" id="ew-msgs"></div>' +
            '<div class="ew-input-row">' +
                '<input type="text" id="emma-input" placeholder="Ask about our ceramics…" autocomplete="off" maxlength="800">' +
                '<button id="emma-send">' +
                    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="white"/></svg>' +
                '</button>' +
            '</div>' +
        '</div>' +
        '<button id="emma-btn" aria-label="Chat with Emma, our studio assistant">' +
            '<span id="emma-badge"></span>' +
            '<svg id="emma-ic-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
            '<svg id="emma-ic-x"   width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>';

    document.body.appendChild(fab);

    // ── Elements ──────────────────────────────────────────────────────────────
    var panel    = document.getElementById('emma-panel');
    var msgsEl   = document.getElementById('ew-msgs');
    var inputEl  = document.getElementById('emma-input');
    var sendBtn  = document.getElementById('emma-send');
    var mainBtn  = document.getElementById('emma-btn');
    var closeBtn = document.getElementById('ew-close');
    var clearBtn = document.getElementById('ew-clear');
    var badge    = document.getElementById('emma-badge');
    var isOpen   = false;
    var unread   = 0;

    // ── Render helpers ────────────────────────────────────────────────────────
    function esc(s) {
        return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function markdownToHTML(s) {
        return esc(s)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    function addMsg(role, text) {
        var row = document.createElement('div');
        row.className = 'ew-msg ' + role;
        var bub = document.createElement('div');
        bub.className = 'ew-bubble';
        bub.innerHTML = markdownToHTML(text);
        row.appendChild(bub);
        msgsEl.appendChild(row);
        msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function addTyping() {
        var row = document.createElement('div');
        row.className = 'ew-typing';
        row.id = 'ew-typing';
        row.innerHTML = '<span></span><span></span><span></span>';
        msgsEl.appendChild(row);
        msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function removeTyping() {
        var t = document.getElementById('ew-typing');
        if (t) t.remove();
    }

    function renderHistory() {
        msgsEl.innerHTML = '';
        if (chatHistory.length === 0) {
            addMsg('bot', 'Hello! I\'m Emma, the ORLINSKY studio assistant. I can help with questions about our ceramics, ordering, shipping, and more. What can I do for you?');
        } else {
            chatHistory.forEach(function (m) {
                addMsg(m.role === 'user' ? 'user' : 'bot', m.content);
            });
        }
    }

    // ── Badge ─────────────────────────────────────────────────────────────────
    function showBadge(n) {
        badge.textContent = n > 9 ? '9+' : String(n);
        badge.style.display = 'flex';
    }

    function hideBadge() {
        badge.style.display = 'none';
        unread = 0;
    }

    // ── Open / Close ──────────────────────────────────────────────────────────
    function open() {
        isOpen = true;
        fab.classList.add('emma-open');
        panel.setAttribute('aria-hidden', 'false');
        hideBadge();
        renderHistory();
        setTimeout(function () { inputEl.focus(); }, 300);
    }

    function close() {
        isOpen = false;
        fab.classList.remove('emma-open');
        panel.setAttribute('aria-hidden', 'true');
    }

    mainBtn.addEventListener('click', function () { isOpen ? close() : open(); });
    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); close(); });

    clearBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        chatHistory = [];
        try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
        msgsEl.innerHTML = '';
        addMsg('bot', 'History cleared. How can I help?');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) close();
    });

    // ── Send ──────────────────────────────────────────────────────────────────
    function send() {
        var text = inputEl.value.trim();
        if (!text || sendBtn.disabled) return;
        inputEl.value = '';
        sendBtn.disabled = true;

        addMsg('user', text);
        chatHistory.push({ role: 'user', content: text });
        saveHistory();
        addTyping();

        // Pass last 8 messages as history (excluding the just-added user message)
        var apiHistory = chatHistory.slice(-9, -1).map(function (m) {
            return { role: m.role === 'user' ? 'user' : 'assistant', content: m.content };
        });

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, history: apiHistory })
        })
        .then(function (r) { return r.json(); })
        .then(function (d) {
            removeTyping();
            if (d.reply) {
                addMsg('bot', d.reply);
                chatHistory.push({ role: 'assistant', content: d.reply });
                if (chatHistory.length > 40) chatHistory = chatHistory.slice(-40);
                saveHistory();
            } else {
                // Error messages are shown but NOT persisted to history,
                // so they never go back to the API as assistant context
                addMsg('bot', d.error || 'I\'m unable to respond right now. Please try again or email info@orlinskyceramic.ca');
            }
            sendBtn.disabled = false;
            if (!isOpen) { unread++; showBadge(unread); }
        })
        .catch(function () {
            removeTyping();
            addMsg('bot', 'Connection error. Please try again or reach us at info@orlinskyceramic.ca');
            sendBtn.disabled = false;
        });
    }

    sendBtn.addEventListener('click', send);
    inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });

})();
