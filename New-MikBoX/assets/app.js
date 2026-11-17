/* New-MikBoX hotspot pages. Settings come from config.js (CONFIG); router values from HS
   (set by each .html page, because RouterOS only fills $(variables) inside .html files). */
(function () {
  var C = window.CONFIG || {};
  var HS = window.HS || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; };

  var ICON = {
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M17.9 17.9A10 10 0 0 1 12 19c-6.5 0-10-7-10-7a18 18 0 0 1 5.1-5.9M9.9 4.2A9 9 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2M2 2l20 20"/>',
    login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bolt: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    wa: '<path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.4L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5z"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
    fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    tt: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3a5 5 0 0 0 5 5"/>'
  };
  var svg = function (name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + '</svg>';
  };

  /* ---------- theme ---------- */
  var root = document.documentElement;
  root.setAttribute('data-color', C.warna || 'pink');
  function systemDark() { return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches; }
  function savedMode() { try { return localStorage.getItem('nmb-mode'); } catch (e) { return null; } }
  function applyTheme() {
    var mode = savedMode() || C.mode || 'otomatis';
    var dark = mode === 'gelap' || (mode === 'otomatis' && systemDark());
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    var btn = $('themeBtn');
    if (btn) btn.innerHTML = svg(dark ? 'sun' : 'moon');
  }
  applyTheme();
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(applyTheme);
  }

  /* ---------- shared header / footer ---------- */
  function renderShell() {
    var brand = $('brand');
    if (brand) {
      brand.innerHTML = '<div class="brand-mark">' + (C.logo ? '<img src="' + esc(C.logo) + '" alt="">' : svg('wifi')) + '</div>'
        + '<div><h1>' + esc(C.namaHotspot || 'Hotspot') + '</h1>' + (C.slogan ? '<p>' + esc(C.slogan) + '</p>' : '') + '</div>';
    }
    var themeBtn = $('themeBtn');
    if (themeBtn) {
      themeBtn.innerHTML = svg(root.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon');
      themeBtn.onclick = function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'terang' : 'gelap';
        try { localStorage.setItem('nmb-mode', next); } catch (e) {}
        applyTheme();
      };
    }
    var notice = $('notice');
    if (notice && C.pengumuman) {
      notice.innerHTML = svg('info') + '<span>' + esc(C.pengumuman) + '</span>';
      notice.hidden = false;
    }
    var social = $('social');
    if (social) {
      var links = [];
      if (C.whatsapp) links.push(['https://wa.me/' + String(C.whatsapp).replace(/\D/g, ''), 'wa', 'WhatsApp']);
      if (C.instagram) links.push([C.instagram, 'ig', 'Instagram']);
      if (C.facebook) links.push([C.facebook, 'fb', 'Facebook']);
      if (C.tiktok) links.push([C.tiktok, 'tt', 'TikTok']);
      social.innerHTML = links.map(function (l) {
        return '<a href="' + esc(l[0]) + '" target="_blank" rel="noopener" aria-label="' + l[2] + '">' + svg(l[1]) + '</a>';
      }).join('');
    }
    var foot = $('foot');
    if (foot) foot.textContent = C.footer ? '© ' + new Date().getFullYear() + ' ' + C.footer : '';
  }

  /* ---------- MikBoX links ---------- */
  function mikboxBase() {
    return C.mikbox && C.mikbox.alamat && C.mikbox.idToko ? String(C.mikbox.alamat).replace(/\/+$/, '') : '';
  }
  function query(o) {
    return Object.keys(o).filter(function (k) { return o[k]; }).map(function (k) { return k + '=' + encodeURIComponent(o[k]); }).join('&');
  }
  function shopUrl(profil) {
    return mikboxBase() + '/shop/?' + query({ s: C.mikbox.idToko, p: profil, mac: HS.mac, ip: HS.ip, back: HS.login });
  }
  function checkUrl() {
    return mikboxBase() + '/shop/cek.php?' + query({ s: C.mikbox.idToko, mac: HS.mac, back: HS.login });
  }

  /* ---------- login page ---------- */
  function initLogin() {
    var form = $('loginForm');
    var mode = 'voucher';
    var user = $('username'), pass = $('password'), passField = $('passField');

    if (HS.error) { $('error').textContent = HS.error; $('error').hidden = false; }

    if (C.loginMember) {
      $('tabs').hidden = false;
      $('tabs').onclick = function (e) {
        var t = e.target.closest('.tab');
        if (!t) return;
        mode = t.getAttribute('data-mode');
        Array.prototype.forEach.call(this.children, function (b) { b.setAttribute('aria-selected', b === t ? 'true' : 'false'); });
        passField.hidden = mode === 'voucher';
        $('userLabel').textContent = mode === 'voucher' ? 'Kode voucher' : 'Username';
        user.className = mode === 'voucher' ? 'input code' : 'input';
        user.focus();
      };
    }
    user.oninput = function () {
      if (mode !== 'voucher') return;
      if (C.hurufVoucher === 'besar') user.value = user.value.toUpperCase();
      if (C.hurufVoucher === 'kecil') user.value = user.value.toLowerCase();
    };
    $('eye').innerHTML = svg('eye');
    $('eye').onclick = function () {
      var show = pass.type === 'password';
      pass.type = show ? 'text' : 'password';
      this.innerHTML = svg(show ? 'eyeOff' : 'eye');
    };

    function submitLogin(username, password) {
      var send = document.forms.sendin;
      send.username.value = username;
      // CHAP: the router never sees the plain password (falls back to PAP when chap is off).
      send.password.value = HS.chapId ? hexMD5(HS.chapId + password + HS.chapChallenge) : password;
      $('loginBtn').disabled = true;
      send.submit();
    }
    form.onsubmit = function (e) {
      e.preventDefault();
      var u = user.value.trim();
      if (!u) { user.focus(); return; }
      submitLogin(u, mode === 'voucher' ? u : pass.value);
    };

    if (C.tombolTrial && HS.trial === 'yes') {
      var t = $('trialLink');
      t.href = HS.login + '?' + query({ dst: HS.dst, username: 'T-' + HS.mac });
      t.innerHTML = svg('bolt') + 'Coba gratis';
      t.hidden = false;
    }

    // Back from MikBoX after paying: ?mbx_voucher=CODE logs in at once.
    var m = /[?&]mbx_voucher=([A-Za-z0-9_-]{3,32})/.exec(location.search);
    if (m) { user.value = m[1]; submitLogin(m[1], m[1]); return; }

    // Packages & prices come live from MikBoX (Router → Jual Online); nothing to list in config.js.
    var base = mikboxBase();
    if (!base || !window.fetch) return;
    fetch(base + '/shop/api/packages.php?s=' + encodeURIComponent(C.mikbox.idToko))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var pk = (d && d.packages) || [];
        if (!pk.length) return;
        $('packages').innerHTML = pk.map(function (p) {
          var info = rupiah(p.price) + (p.validity ? ' · ' + p.validity : '');
          return '<div class="pkg"><div class="pkg-ico">' + svg('wifi') + '</div><div class="pkg-info"><b>' + esc(p.title) + '</b><span>' + esc(info) + '</span></div>'
            + '<a class="btn btn-primary" href="' + esc(shopUrl(p.profile)) + '">Beli</a></div>';
        }).join('');
        var c = $('checkLink');
        c.href = checkUrl();
        c.innerHTML = svg('search') + 'Sudah bayar? Cek voucher';
        $('shop').hidden = false;
      })
      .catch(function () { /* MikBoX unreachable: shop stays hidden, login still works */ });
  }
  // RouterOS durations ("1w2d3h4m5s", "8m30s") → seconds; null when empty/unknown.
  function seconds(s) {
    var m = /^(?:(\d+)w)?(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(String(s || '').trim());
    if (!s || !m || m[0] === '') return null;
    return (+m[1] || 0) * 604800 + (+m[2] || 0) * 86400 + (+m[3] || 0) * 3600 + (+m[4] || 0) * 60 + (+m[5] || 0);
  }
  function duration(sec) {
    var d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60), out = [];
    if (d) out.push(d + ' hari');
    if (h) out.push(h + ' jam');
    if (m) out.push(m + ' menit');
    return out.length ? out.join(' ') : '< 1 menit';
  }
  function setTimeLeft(text) {
    var el = $('timeLeft');
    if (!el) return;
    if (text) el.querySelector('b').textContent = text; else el.parentNode.removeChild(el);
  }
  function loadTimeLeft(base, tries) {
    if (!window.fetch) return setTimeLeft('');
    fetch(base + '/shop/api/voucher.php?' + query({ s: C.mikbox.idToko, u: HS.username, mac: HS.mac }))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.left !== null && d.left !== undefined) {
          var end = Date.now() + d.left * 1000;
          var tick = function () { var s = Math.round((end - Date.now()) / 1000); setTimeLeft(s > 0 ? duration(s) : 'Habis'); };
          tick(); setInterval(tick, 30000);
        } else if (d && d.pending && tries < 3) {
          setTimeout(function () { loadTimeLeft(base, tries + 1); }, 4000);   // expiry is written ~5 s after first login
        } else {
          setTimeLeft('');
        }
      })
      .catch(function () { setTimeLeft(''); });
  }
  function rupiah(n) { return 'Rp' + String(n | 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  /* ---------- status page ---------- */
  function initStatus() {
    $('voucher').textContent = HS.username || '-';
    // Router knows the time left only for limit-uptime vouchers; MikBoX validity lives in the user comment.
    var left = seconds(HS.timeLeft), base = mikboxBase();
    var rows = [
      ['Sisa waktu', left !== null ? duration(left) : (base && HS.username ? '…' : ''), '', 'timeLeft'],
      ['Sisa kuota', HS.bytesLeft === 'unlimited' ? 'Tanpa batas' : HS.bytesLeft], ['Lama terhubung', HS.uptime ? duration(seconds(HS.uptime)) : ''],
      ['Unduh / Unggah', HS.bytesOut && HS.bytesIn ? HS.bytesOut + ' / ' + HS.bytesIn : ''], ['IP', HS.ip], ['MAC', HS.mac, 'wide']
    ];
    $('stats').innerHTML = rows.filter(function (r) { return r[1]; }).map(function (r) {
      return '<div class="stat' + (r[2] ? ' wide' : '') + '"' + (r[3] ? ' id="' + r[3] + '"' : '') + '><small>' + r[0] + '</small><b>' + esc(r[1]) + '</b></div>';
    }).join('');
    if (left === null && base && HS.username) loadTimeLeft(base, 0);
    var copy = $('copyBtn');
    copy.innerHTML = svg('copy') + 'Salin kode';
    copy.onclick = function () {
      var done = function () { copy.innerHTML = svg('check') + 'Tersalin'; };
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(HS.username).then(done); return; }
      var r = document.createRange(); r.selectNodeContents($('voucher'));
      var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      try { document.execCommand('copy'); done(); } catch (e) {}
    };
    $('logoutBtn').href = HS.logout;
    $('logoutBtn').innerHTML = svg('logout') + 'Logout';
    if (HS.orig) { $('browseBtn').href = HS.orig; $('browseBtn').hidden = false; }
  }

  /* ---------- simple pages (logout, alogin, error) ---------- */
  function initInfo() {
    var icon = $('stateIcon');
    if (icon) icon.innerHTML = svg(icon.getAttribute('data-icon'));
    var stats = $('stats');
    if (stats) {
      stats.innerHTML = [['Kode / username', HS.username], ['Lama terhubung', HS.uptime], ['Unduh / Unggah', HS.bytesOut && HS.bytesIn ? HS.bytesOut + ' / ' + HS.bytesIn : '']]
        .filter(function (r) { return r[1]; })
        .map(function (r) { return '<div class="stat"><small>' + r[0] + '</small><b>' + esc(r[1]) + '</b></div>'; }).join('');
    }
    var msg = $('message');
    if (msg && HS.error) msg.textContent = HS.error;
    var again = $('againBtn');
    if (again) { again.innerHTML = svg('login') + again.textContent; if (HS.login) again.href = HS.login; }
  }

  renderShell();
  var page = document.body.getAttribute('data-page');
  if (page === 'login') initLogin();
  else if (page === 'status') initStatus();
  else initInfo();
})();
