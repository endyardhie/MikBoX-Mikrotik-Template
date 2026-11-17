/* Honai Grand Resort: photo slideshow beside the panel + floating WhatsApp button. MIT.
   Photos come from config.js (foto, gantiFoto); without photos a built-in honai illustration is shown. */
(function () {
  var C = window.CONFIG || {};
  var hero = document.getElementById('hero');

  // Night valley with honai huts (own artwork, no external files).
  var SCENE = '<svg class="scene" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140a2e"/><stop offset=".6" stop-color="#3a1f6b"/><stop offset="1" stop-color="#c76b4a"/></linearGradient>'
    + '<linearGradient id="hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d3b2f"/><stop offset="1" stop-color="#0c1d17"/></linearGradient>'
    + '<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc861" stop-opacity=".9"/><stop offset="1" stop-color="#ffc861" stop-opacity="0"/></radialGradient></defs>'
    + '<rect width="800" height="600" fill="url(#sky)"/>'
    + '<circle cx="610" cy="130" r="46" fill="#f8e7c0" opacity=".9"/>'
    + '<g fill="#fff" opacity=".7"><circle cx="90" cy="70" r="1.6"/><circle cx="210" cy="120" r="1.2"/><circle cx="330" cy="50" r="1.4"/><circle cx="460" cy="95" r="1"/><circle cx="720" cy="60" r="1.3"/><circle cx="540" cy="40" r="1"/></g>'
    + '<path d="M0 360 L120 250 L230 330 L360 200 L500 320 L620 230 L800 340 V600 H0Z" fill="#2a2350" opacity=".9"/>'
    + '<path d="M0 420 Q200 340 400 410 T800 400 V600 H0Z" fill="url(#hill)"/>'
    + hut(170, 470, 1) + hut(330, 500, 1.35) + hut(520, 480, 1.1) + hut(660, 515, .9)
    + '<rect y="560" width="800" height="40" fill="#0a1712"/></svg>';
  function hut(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">'
      + '<ellipse cx="0" cy="-8" rx="70" ry="40" fill="url(#glow)"/>'
      + '<path d="M-48 0 V-26 Q-48 -78 0 -84 Q48 -78 48 -26 V0Z" fill="#5a3a22"/>'
      + '<path d="M-52 -26 Q-52 -82 0 -88 Q52 -82 52 -26 Q0 -40 -52 -26Z" fill="#8a6a3c"/>'
      + '<path d="M-40 -40 Q0 -52 40 -40M-34 -56 Q0 -66 34 -56" stroke="#6d5130" stroke-width="3" fill="none"/>'
      + '<rect x="-9" y="-24" width="18" height="24" rx="3" fill="#ffcf73"/></g>';
  }

  if (hero) {
    var photos = (C.foto || []).filter(Boolean);
    hero.innerHTML = SCENE;
    if (photos.length) {
      var slides = photos.map(function (src, i) {
        var img = document.createElement('img');
        img.alt = '';
        img.className = 'slide' + (i === 0 ? ' on' : '');
        img.onerror = function () {   // missing file: skip it (the illustration stays if none load)
          var wasOn = img.classList.contains('on');
          if (img.parentNode) img.parentNode.removeChild(img);
          var next = wasOn && hero.querySelector('.slide');
          if (next) next.classList.add('on');
        };
        img.src = src;
        hero.appendChild(img);
        return img;
      });
      var at = 0, every = Math.max(2, +C.gantiFoto || 5) * 1000;
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (slides.length > 1 && !reduce) {
        setInterval(function () {
          var live = slides.filter(function (s) { return s.parentNode; });
          if (live.length < 2) return;
          at = (at + 1) % live.length;
          live.forEach(function (s, i) { s.classList.toggle('on', i === at); });
        }, every);
      }
    }
  }

  if (C.whatsapp) {
    var wa = document.createElement('a');
    wa.className = 'chat-fab';
    wa.href = 'https://wa.me/' + String(C.whatsapp).replace(/\D/g, '');
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.4L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5z"/></svg>';
    document.body.appendChild(wa);
    var dup = document.querySelector('.social a[aria-label="WhatsApp"]');   // already floating
    if (dup) dup.parentNode.removeChild(dup);
    document.body.classList.add('has-chat');
  }
})();
