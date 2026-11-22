/* Power Action Resources — interaksi ringkas */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav: bayang bila skrol
  var nav = document.querySelector('.nav');
  var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 10); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu telefon
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  var setMenu = function (open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    if (open) { var f = menu.querySelector('a'); if (f) f.focus(); }
  };
  toggle.addEventListener('click', function () { setMenu(menu.hidden); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });
  window.addEventListener('resize', function () { if (window.innerWidth >= 900 && !menu.hidden) setMenu(false); });

  // Marquee: gandakan item supaya gelung lancar
  document.querySelectorAll('.marquee__track').forEach(function (t) {
    Array.prototype.slice.call(t.children).forEach(function (li) {
      var c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); t.appendChild(c);
    });
  });

  // Muncul semasa skrol
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Pautan menu aktif
  var links = document.querySelectorAll('.nav__links a[href^="#"]');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  // FAQ: buka satu pada satu masa
  var faqs = document.querySelectorAll('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  // Video galeri: main senyap secara automatik bila kelihatan, jeda bila keluar skrin
  var clips = document.querySelectorAll('.vid video');
  var tryPlay = function (v) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); };
  if (!reduce && 'IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; tryPlay(v); } else { v.pause(); }
      });
    }, { threshold: 0.5 });
    clips.forEach(function (v) { vo.observe(v); });
  }

  // Lightbox (gambar & video dengan bunyi)
  var lb = document.getElementById('lb');
  if (lb && typeof lb.showModal === 'function') {
    var stage = lb.querySelector('.lb__stage');
    var cap = lb.querySelector('.lb__cap');
    var all = Array.prototype.slice.call(document.querySelectorAll('[data-lb],[data-lb-video]'));
    var items = all;
    var idx = 0, opener = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      stage.innerHTML = '';
      var el;
      if (it.hasAttribute('data-lb-video')) {
        el = document.createElement('video');
        el.src = it.getAttribute('data-lb-video');
        el.poster = it.getAttribute('data-poster') || '';
        el.controls = true; el.playsInline = true; el.autoplay = true;
        var song = document.getElementById('vnAudio');
        if (song && !song.paused) song.pause(); // jangan bertindih dengan lagu
        var pv = el.play(); if (pv && pv.catch) pv.catch(function () {});
      } else {
        el = document.createElement('img');
        el.src = it.getAttribute('data-lb');
        el.alt = (it.querySelector('img') || {}).alt || '';
      }
      stage.appendChild(el);
      cap.textContent = it.getAttribute('data-cap') || '';
    };
    all.forEach(function (it) {
      it.addEventListener('click', function () {
        opener = it;
        // hanya item yang sedang kelihatan (ikut penapis album)
        items = all.filter(function (x) { return x.offsetParent !== null; });
        clips.forEach(function (v) { v.pause(); });
        show(items.indexOf(it)); lb.showModal();
      });
    });
    lb.querySelector('.lb__x').addEventListener('click', function () { lb.close(); });
    lb.querySelector('.lb__prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb__next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === stage) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
    });
    lb.addEventListener('close', function () {
      stage.innerHTML = '';
      if (opener) opener.focus();
      if (!reduce) clips.forEach(function (v) {
        var r = v.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) tryPlay(v);
      });
    });
  }

  // Bento bergilir: setiap petak galeri bertukar gambar, satu petak pada satu masa
  var rots = Array.prototype.slice.call(document.querySelectorAll('.rot'));
  if (rots.length && !reduce) {
    var load = function (img) {
      if (img.dataset.src) {
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.src = img.dataset.src;
        img.removeAttribute('data-src'); img.removeAttribute('data-srcset');
      }
    };
    var state = rots.map(function (r) {
      return { el: r, imgs: r.querySelectorAll('.rot__img'), dots: r.querySelectorAll('.rot__dots i'),
        btn: r.querySelector('.gal__btn'), cap: r.querySelector('figcaption'), i: 0, seen: false, hover: false };
    });
    state.forEach(function (st) {
      st.el.addEventListener('mouseenter', function () { st.hover = true; });
      st.el.addEventListener('mouseleave', function () { st.hover = false; });
      st.el.addEventListener('focusin', function () { st.hover = true; });
      st.el.addEventListener('focusout', function () { st.hover = false; });
    });
    if ('IntersectionObserver' in window) {
      var ro = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var st = state[rots.indexOf(e.target)];
          st.seen = e.isIntersecting;
          if (e.isIntersecting && st.imgs[1]) load(st.imgs[1]); // pramuat gambar seterusnya
        });
      }, { rootMargin: '200px 0px' });
      rots.forEach(function (r) { ro.observe(r); });
    }
    var step = function (st) {
      var n = st.imgs.length, nx = (st.i + 1) % n, img = st.imgs[nx];
      load(img);
      var go = function () {
        st.imgs[st.i].classList.remove('is-on'); st.imgs[st.i].setAttribute('aria-hidden', 'true');
        img.classList.add('is-on'); img.removeAttribute('aria-hidden');
        if (st.dots[st.i]) st.dots[st.i].classList.remove('is-on');
        if (st.dots[nx]) st.dots[nx].classList.add('is-on');
        var cap = img.getAttribute('data-cap');
        st.btn.setAttribute('data-lb', img.getAttribute('data-lb'));
        st.btn.setAttribute('data-cap', cap);
        st.btn.setAttribute('aria-label', 'Besarkan gambar: ' + cap);
        st.cap.classList.add('is-swap');
        setTimeout(function () { st.cap.textContent = cap; st.cap.classList.remove('is-swap'); }, 400);
        st.i = nx;
        load(st.imgs[(nx + 1) % n]);
      };
      if (img.complete && img.naturalWidth) go(); else img.addEventListener('load', go, { once: true });
    };
    var turn = 0;
    setInterval(function () {
      if (document.hidden || (lb && lb.open)) return;
      for (var k = 0; k < state.length; k++) {
        var st = state[(turn + k) % state.length];
        if (st.seen && !st.hover) { step(st); turn = (turn + k + 1) % state.length; return; }
      }
    }, 1800);
  }

  // Album: penapis & lihat semua
  var alb = document.getElementById('album');
  var more = document.getElementById('albMore');
  if (alb && more) {
    var albItems = alb.querySelectorAll('.alb__item');
    var chips = document.querySelectorAll('.chipbtn');
    var setAll = function (on) {
      alb.classList.toggle('is-all', on);
      more.setAttribute('aria-expanded', String(on));
      more.textContent = on ? 'Tunjuk kurang' : 'Lihat semua ' + albItems.length + ' gambar';
    };
    more.addEventListener('click', function () {
      var on = !alb.classList.contains('is-all');
      setAll(on);
      if (!on) alb.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-f');
        chips.forEach(function (o) { var on = o === c; o.classList.toggle('is-on', on); o.setAttribute('aria-pressed', String(on)); });
        albItems.forEach(function (it) { it.classList.toggle('is-out', f !== 'semua' && it.getAttribute('data-cat') !== f); });
        if (f === 'semua') { more.parentElement.hidden = false; setAll(false); }
        else { alb.classList.add('is-all'); more.parentElement.hidden = true; }
      });
    });
  }

  // Voice note / lagu (gaya WhatsApp) + auto-main pada sentuhan pertama
  var vn = document.getElementById('vn'), au = document.getElementById('vnAudio');
  if (vn && au) {
    var vPlay = document.getElementById('vnPlay'), vTrack = document.getElementById('vnTrack'), vTime = document.getElementById('vnTime');
    var fmt = function (x) { x = Math.max(0, Math.floor(isFinite(x) ? x : 0)); return Math.floor(x / 60) + ':' + ('0' + (x % 60)).slice(-2); };
    // Chrome kadang-kadang melaporkan tempoh Opus sebagai Infinity → guna data-duration
    var dur = function () { return (isFinite(au.duration) && au.duration > 0) ? au.duration : (+au.getAttribute('data-duration') || 0); };
    var sync = function () {
      var d = dur(), pc = d ? Math.min(100, au.currentTime / d * 100) : 0;
      vTrack.style.setProperty('--p', pc + '%');
      vTrack.setAttribute('aria-valuenow', String(Math.round(pc)));
      vTime.textContent = fmt(au.paused && !au.currentTime ? d : au.currentTime);
    };
    var ready = function () { vn.hidden = false; sync(); };
    au.addEventListener('loadedmetadata', ready);
    if (au.readyState >= 1) ready();
    au.addEventListener('timeupdate', sync);
    au.addEventListener('play', function () { vn.classList.add('is-playing'); vPlay.setAttribute('aria-label', 'Jeda lagu'); });
    au.addEventListener('pause', function () { vn.classList.remove('is-playing'); vPlay.setAttribute('aria-label', 'Main lagu'); });
    au.addEventListener('ended', function () { au.currentTime = 0; sync(); });
    vPlay.addEventListener('click', function () { if (au.paused) { var q = au.play(); if (q && q.catch) q.catch(function () {}); } else au.pause(); });
    var seek = function (x) { var r = vTrack.getBoundingClientRect(), d = dur(); if (d) au.currentTime = Math.min(1, Math.max(0, (x - r.left) / r.width)) * d; sync(); };
    vTrack.addEventListener('click', function (e) { seek(e.clientX); });
    vTrack.addEventListener('keydown', function (e) {
      if (!dur()) return;
      if (e.key === 'ArrowRight') { au.currentTime = Math.min(dur(), au.currentTime + 3); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { au.currentTime = Math.max(0, au.currentTime - 3); e.preventDefault(); }
      if (e.key === ' ' || e.key === 'Enter') { vPlay.click(); e.preventDefault(); }
      sync();
    });
    // Video berbunyi (paparan besar) menjeda lagu; video galeri senyap tidak menjejaskan lagu
    document.addEventListener('play', function (e) {
      var t = e.target;
      if (t && t.tagName === 'VIDEO' && !t.muted && !au.paused) au.pause();
    }, true);
    au.addEventListener('play', function () {
      document.querySelectorAll('video').forEach(function (v) { if (!v.muted && !v.paused) v.pause(); });
    });
    // Auto-main: pelayar menyekat bunyi sebelum interaksi. Cuba terus; jika disekat, main pada
    // sentuhan/klik/kekunci PERTAMA (bukan skrol). Sekali sahaja; jeda pelawat dihormati.
    var started = false, EVTS = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];
    var disarm = function () { EVTS.forEach(function (t) { document.removeEventListener(t, onFirst, true); }); vn.classList.remove('is-waiting'); };
    au.addEventListener('play', function () { started = true; disarm(); });
    function onFirst(e) {
      if (started) return disarm();
      if (e.type === 'keydown' && e.key === 'Escape') return;
      if (e.target.closest && e.target.closest('#vn, video, .vid, .lb')) return;
      var q = au.play(); if (q && q.catch) q.catch(function () {});
    }
    var arm = function () { if (started) return; vn.classList.add('is-waiting'); EVTS.forEach(function (t) { document.addEventListener(t, onFirst, true); }); };
    var first = au.play();
    if (first && first.catch) first.catch(arm); else if (au.paused) arm();
  }

  // Tahun semasa
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  doc.classList.add('ready');
})();
