/* =====================================================================
   MAIN.JS – Hiệu ứng & tương tác (vanilla JS, không cần thư viện)
   Cấu trúc:  Tiện ích → Icon → Ảnh (hotlink + dự phòng) → Song ngữ
              → Header/Footer → Thành phần dùng chung → Khởi tạo từng trang
   ===================================================================== */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const page = document.body.dataset.page || 'home';
  let lang = (localStorage.getItem('ap_lang') || 'vi');
  if (!I18N[lang]) lang = 'vi';
  const t = k => (I18N[lang] && I18N[lang][k] != null) ? I18N[lang][k] : (I18N.vi[k] != null ? I18N.vi[k] : k);
  const L = o => o ? (o[lang] || o.vi || '') : '';
  const renderFns = [];
  const params = new URLSearchParams(location.search);

  /* ---------- ICONS ---------- */
  const ICONS = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>', chevR: '<path d="m9 18 6-6-6-6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    factory: '<path d="M2 20V8l6 4V8l6 4V4h4v16z"/><path d="M2 20h20"/>',
    ruler: '<path d="m21.3 8.7-5.9-5.9a1 1 0 0 0-1.4 0L2.7 14.1a1 1 0 0 0 0 1.4l5.9 5.9a1 1 0 0 0 1.4 0L21.3 10a1 1 0 0 0 0-1.3z"/><path d="m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/>',
    truck: '<rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    drop: '<path d="M12 2.7S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.3-7-12.3z"/>',
    cut: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m15.5 13.9 1.5 8.1-5-3-5 3 1.5-8.1"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z"/>',
    play: '<path d="m6 3 14 9-14 9z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    send: '<path d="m22 2-11 11M22 2l-7 20-4-9-9-4z"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
  };
  const ic = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ---------- IMAGES (hotlink + ảnh dự phòng) ---------- */
  const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe6ee"/><stop offset=".5" stop-color="#f7f9fb"/><stop offset="1" stop-color="#b9c7d6"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><rect x="120" y="70" width="160" height="260" rx="80" fill="#eef3f8" stroke="#c8a45a" stroke-width="5"/><path d="M150 120l60-30M150 170l90-45" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".8"/><text x="200" y="365" font-family="Arial" font-size="15" letter-spacing="4" text-anchor="middle" fill="#8aa0b6">AN PHU MIRROR</text></svg>');
  function hydrate(root) {
    root = root || document;
    $$('i[data-ic]', root).forEach(el => { el.outerHTML = ic(el.dataset.ic); });
    $$('img[data-img]', root).forEach(img => {
      const key = img.dataset.img; img.removeAttribute('data-img');
      const url = IMG[key] || key;
      img.referrerPolicy = 'no-referrer';
      img.loading = 'lazy'; img.decoding = 'async';
      img.classList.add('fade');
      const box = img.parentElement; if (box) box.classList.add('imgbox');
      const done = () => { img.classList.add('ok'); if (box) box.classList.add('loaded'); };
      img.addEventListener('load', done);
      img.addEventListener('error', () => { if (img.src !== PLACEHOLDER) { img.src = PLACEHOLDER; } done(); });
      img.src = url;
      if (img.complete && img.naturalWidth) done();
    });
  }
  const imgUrl = k => IMG[k] || k;

  /* ---------- I18N ---------- */
  function applyI18n(root) {
    root = root || document;
    $$('[data-i18n]', root).forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$('[data-i18n-ph]', root).forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]', root).forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  }
  function setTitle() {
    const key = 'pg.' + (page === 'product' ? 'products' : page);
    const base = I18N.vi[key] ? t(key) : t('pg.title.home');
    const name = page === 'product' && window.__pdName ? window.__pdName() : base;
    document.title = (page === 'home' ? t('pg.title.home') : name) + ' | ' + COMPANY.brand;
  }
  function setLang(l) {
    lang = l; localStorage.setItem('ap_lang', l);
    document.documentElement.lang = l;
    $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
    applyI18n(); renderFns.forEach(f => f()); setTitle();
  }

  /* ---------- HEADER / FOOTER ---------- */
  const NAV = [['home', 'index.html'], ['products', 'products.html'], ['cnc', 'cnc-service.html'], ['projects', 'projects.html'], ['about', 'about.html'], ['news', 'news.html'], ['contact', 'contact.html']];
  const activeKey = page === 'product' ? 'products' : page;
  const langSwitch = `<div class="lang" role="group" aria-label="Language"><button type="button" data-lang="vi">VI</button><button type="button" data-lang="en">EN</button></div>`;
  function buildChrome() {
    const pre = document.createElement('div'); pre.id = 'preloader';
    pre.innerHTML = `<div class="pl-logo">${COMPANY.brand}</div>`; document.body.prepend(pre);

    const megaItems = CATEGORIES.map(c => `<a class="mega-item" href="products.html?cat=${c.id}"><span class="thumb"><img data-img="${c.img}" alt=""></span><span><b data-i18n="cat.${c.id}"></b><small data-i18n="catd.${c.id}"></small></span></a>`).join('');
    const menu = NAV.map(([k, h]) => `<li${k === 'products' ? ' class="has-mega"' : ''}><a href="${h}" class="${k === activeKey ? 'active' : ''}" data-i18n="nav.${k}"></a>${k === 'products' ? `<div class="mega">${megaItems}</div>` : ''}</li>`).join('');
    const brandHtml = (() => { const b = COMPANY.brand.split(' '); return `<b>${b[0]}${b[1] ? ' <i>' + b.slice(1).join(' ') + '</i>' : ''}</b>`; })();
    $('#site-header').innerHTML = `
      <div class="topbar"><div class="container">
        <div class="tb-left">
          <a href="tel:${COMPANY.hotlines[0].replace(/[^\d+]/g, '')}">${ic('phone')}<span data-i18n="topbar.hot"></span>: ${COMPANY.hotlines[0]}</a>
          <a class="hide-m" href="mailto:${COMPANY.email}">${ic('mail')}${COMPANY.email}</a>
          <a class="hide-m" href="contact.html">${ic('pin')}<span data-i18n="lbl.office"></span>: 75 Nguyên Hồng, TP.HCM</a>
        </div>${langSwitch}
      </div></div>
      <header class="header" id="hdr"><div class="container nav">
        <a class="logo" href="index.html" aria-label="${COMPANY.brand}">${brandHtml}<small data-i18n-brand></small></a>
        <ul class="menu">${menu}</ul>
        <div class="nav-actions">
          <button class="icon-btn" id="openSearch" type="button" data-i18n-aria="search.ph">${ic('search')}</button>
          <a class="btn btn-gold btn-sm" href="contact.html"><span data-i18n="btn.quote"></span>${ic('arrow')}</a>
          <button class="icon-btn burger" id="openDrawer" type="button" aria-label="Menu">${ic('menu')}</button>
        </div>
      </div></header>
      <div class="overlay" id="ov"></div>
      <aside class="drawer" id="drawer"><button class="close" type="button" id="closeDrawer" aria-label="Close">${ic('close')}</button>
        <div style="margin:1.2rem 0 1rem;font-weight:800;letter-spacing:.1em">${COMPANY.brand}</div>
        ${NAV.map(([k, h]) => `<a href="${h}" data-i18n="nav.${k}"></a>`).join('')}${langSwitch}
        <a class="btn btn-gold" style="margin-top:1.4rem;border:0" href="contact.html"><span data-i18n="btn.quote"></span></a>
      </aside>
      <div class="search-box" id="searchBox" role="dialog" aria-modal="true">
        <input id="searchInp" type="search" data-i18n-ph="search.ph" autocomplete="off"><div class="sr-list" id="srList"></div>
      </div>`;
    $$('[data-i18n-brand]').forEach(el => { el.innerHTML = ''; el.textContent = L(COMPANY.brandSub); });

    const cols = CATEGORIES.map(c => `<li><a href="products.html?cat=${c.id}" data-i18n="cat.${c.id}"></a></li>`).join('');
    $('#site-footer').innerHTML = `
      <footer class="footer"><div class="container">
        <div class="fgrid4">
          <div><a class="logo" href="index.html" style="margin-bottom:1rem">${brandHtml}</a><p data-i18n="ft.about"></p></div>
          <div><h4 data-i18n="ft.links"></h4><ul>${NAV.map(([k, h]) => `<li><a href="${h}" data-i18n="nav.${k}"></a></li>`).join('')}</ul></div>
          <div><h4 data-i18n="ft.prod"></h4><ul>${cols}</ul></div>
          <div><h4 data-i18n="ft.contact"></h4><ul>
            <li data-company="name" style="color:#fff;font-weight:600"></li>
            <li>${ic('pin')}<span data-company="address"></span></li>
            <li>${ic('factory')}<span data-company="factory"></span></li>
            ${COMPANY.hotlines.map(h => `<li>${ic('phone')}<a href="tel:${h.replace(/[^\d+]/g, '')}">${h}</a></li>`).join('')}
            <li>${ic('mail')}<a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>
          </ul></div>
        </div>
        <div class="fbottom"><span>© <span id="yr"></span> <span data-company="name"></span></span><span class="demo-tag" data-i18n="ft.demo"></span></div>
      </div></footer>
      <div class="floats">
        <button class="fl top" id="toTop" type="button" data-i18n-aria="toTop">${ic('up')}</button>
        <a class="fl zalo" href="https://zalo.me/${COMPANY.zalo}" target="_blank" rel="noopener">Zalo</a>
        <a class="fl tel" href="tel:${COMPANY.hotlines[0].replace(/[^\d+]/g, '')}" aria-label="Call">${ic('phone')}</a>
      </div>
      <div class="modal" id="qvModal"><div class="modal-card" id="qvCard"></div></div>
      <div class="lb" id="lb"><button class="lx" type="button" id="lbX">${ic('close')}</button><button class="prev" type="button" id="lbP">${ic('chevL')}</button><img id="lbImg" alt=""><button class="next" type="button" id="lbN">${ic('chevR')}</button><div class="cap" id="lbCap"></div></div>
      <div class="toast" id="toast" role="status"></div>`;
    $('#yr').textContent = new Date().getFullYear();
    const fillCompany = () => $$('[data-company]').forEach(el => { el.textContent = L(COMPANY[el.dataset.company]); });
    renderFns.push(fillCompany);
    renderFns.push(() => $$('[data-i18n-brand]').forEach(el => { el.textContent = L(COMPANY.brandSub); }));
    renderFns.push(() => { const s = $('#srInput'); });
    fillCompany();

    /* behaviours */
    const hdr = $('#hdr');
    const onScroll = () => { hdr.classList.toggle('stuck', scrollY > 30); $('#toTop').classList.toggle('on', scrollY > 600); const bg = $('.banner .bg'); if (bg) { const r = bg.parentElement.getBoundingClientRect(); bg.style.transform = `translateY(${(r.top * -0.12).toFixed(1)}px)`; } };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    $('#toTop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
    const dr = $('#drawer'), ov = $('#ov'), sb = $('#searchBox'), si = $('#searchInp');
    const closeAll = () => { dr.classList.remove('open'); sb.classList.remove('on'); ov.classList.remove('on'); };
    $('#openDrawer').onclick = () => { dr.classList.add('open'); ov.classList.add('on'); };
    $('#closeDrawer').onclick = closeAll; ov.onclick = closeAll;
    $('#openSearch').onclick = () => { sb.classList.add('on'); ov.classList.add('on'); setTimeout(() => si.focus(), 120); renderSearch(''); };
    addEventListener('keydown', e => { if (e.key === 'Escape') { closeAll(); closeQV(); closeLB(); } });
    si.addEventListener('input', () => renderSearch(si.value));
    function renderSearch(q) {
      q = q.trim().toLowerCase();
      const list = PRODUCTS.filter(p => !q || (L(p.name) + ' ' + p.code + ' ' + t('cat.' + p.cat)).toLowerCase().includes(q)).slice(0, 8);
      $('#srList').innerHTML = list.length ? list.map(p => `<a class="sr-item" href="product-detail.html?id=${p.id}"><img src="${imgUrl(p.imgs[0])}" referrerpolicy="no-referrer" alt="" onerror="this.onerror=null;this.src='${PLACEHOLDER}'"><div><b>${L(p.name)}</b><br><small>${p.code} • ${t('cat.' + p.cat)}</small></div></a>`).join('') : `<p style="padding:1rem;color:var(--muted)">${t('search.empty')}</p>`;
    }
    renderFns.push(() => renderSearch(si.value));
    document.addEventListener('click', e => { const b = e.target.closest('.lang button'); if (b) setLang(b.dataset.lang); });
    window.addEventListener('load', () => setTimeout(() => $('#preloader').classList.add('done'), 350));
    setTimeout(() => $('#preloader').classList.add('done'), 2500);
  }

  /* ---------- SHARED UI ---------- */
  const toastEl = () => $('#toast');
  function toast(msg) { const el = toastEl(); el.textContent = msg; el.classList.add('on'); clearTimeout(toast.tm); toast.tm = setTimeout(() => el.classList.remove('on'), 3200); }
  let revealIO;
  function observeReveal(root) {
    root = root || document;
    if (!revealIO) revealIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal:not(.in)', root).forEach((el, i) => { if (el.dataset.d) el.style.transitionDelay = el.dataset.d + 'ms'; revealIO.observe(el); });
  }
  function counters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, dur = 1600, t0 = performance.now();
      (function step(n) { const p = Math.min(1, (n - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString('en-US') + (el.dataset.suffix || ''); if (p < 1) requestAnimationFrame(step); })(t0);
    }), { threshold: .5 });
    $$('[data-count]').forEach(el => io.observe(el));
  }
  function tilt(root) {
    $$('.cat-card', root).forEach(c => {
      c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`; });
      c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });
  }
  function accordion() {
    $$('.acc').forEach(a => { const b = $('button', a), ans = $('.ans', a); b.onclick = () => { const open = a.classList.toggle('open'); ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0; }; });
  }
  /* Product card */
  function cardHtml(p) {
    return `<article class="pcard" data-cat="${p.cat}">
      <a class="pimg shine" href="product-detail.html?id=${p.id}"><img data-img="${p.imgs[0]}" alt="${L(p.name).replace(/"/g, '')}"><span class="badge">${t('cat.' + p.cat)}</span>${p.led ? `<span class="badge led">${ic('bolt')} LED</span>` : ''}</a>
      <div class="pbody"><div class="pcode">${p.code}</div><h3><a href="product-detail.html?id=${p.id}">${L(p.name)}</a></h3><p>${L(p.short)}</p>
      <div class="pfoot"><a class="btn btn-outline btn-sm" href="contact.html?product=${p.code}">${t('btn.quote')}</a><button class="qv" type="button" data-qv="${p.id}" title="${t('quickview')}">${ic('eye')}</button></div></div></article>`;
  }
  function renderCards(container, list) {
    container.innerHTML = list.map(cardHtml).join('');
    hydrate(container);
    $$('.pcard', container).forEach((c, i) => { c.style.animationDelay = (i * 60) + 'ms'; c.classList.add('pop'); });
  }
  /* Quick view */
  function openQV(id) {
    const p = PRODUCTS.find(x => x.id === id); if (!p) return;
    $('#qvCard').innerHTML = `<button class="x" type="button" id="qvX">${ic('close')}</button><div class="mi"><img data-img="${p.imgs[0]}" alt=""></div>
      <div class="mb"><span class="badge" style="position:static;display:inline-block;margin-bottom:.8rem">${t('cat.' + p.cat)}</span><div class="pcode">${p.code}</div><h3 style="font-size:1.4rem;margin:.3rem 0 .8rem">${L(p.name)}</h3><p style="color:var(--muted)">${L(p.short)}</p>
      <p><b>${t('pd.size')}:</b> ${SIZES[p.cat].slice(0, 4).join(' • ')}</p><div class="price">${t('contactForPrice')}</div>
      <div class="pd-cta"><a class="btn btn-gold" href="product-detail.html?id=${p.id}">${t('btn.more')}${ic('arrow')}</a><a class="btn btn-outline" href="contact.html?product=${p.code}">${t('btn.quote')}</a></div></div>`;
    hydrate($('#qvCard')); $('#qvModal').classList.add('on'); $('#qvX').onclick = closeQV;
  }
  function closeQV() { const m = $('#qvModal'); if (m) m.classList.remove('on'); }
  /* Lightbox */
  let lbItems = [], lbIdx = 0;
  function openLB(items, i) { lbItems = items; lbIdx = i; showLB(); $('#lb').classList.add('on'); }
  function showLB() { const it = lbItems[lbIdx]; const im = $('#lbImg'); im.referrerPolicy = 'no-referrer'; im.onerror = () => { im.onerror = null; im.src = PLACEHOLDER; }; im.style.animation = 'none'; void im.offsetWidth; im.style.animation = ''; im.src = it.src; $('#lbCap').textContent = it.cap || ''; $('#lbP').style.display = $('#lbN').style.display = lbItems.length > 1 ? '' : 'none'; }
  function closeLB() { const l = $('#lb'); if (l) l.classList.remove('on'); }
  function bindGlobalClicks() {
    document.addEventListener('click', e => {
      const qv = e.target.closest('[data-qv]'); if (qv) { e.preventDefault(); openQV(qv.dataset.qv); return; }
      if (e.target.id === 'qvModal') closeQV();
      const lbEl = e.target.closest('[data-lb]');
      if (lbEl) { const all = $$('[data-lb]').filter(x => !x.classList.contains('hide') && x.dataset.lbg === lbEl.dataset.lbg); openLB(all.map(x => ({ src: imgUrl(x.dataset.lb), cap: x.dataset.cap })), Math.max(0, all.indexOf(lbEl))); }
      if (e.target.id === 'lb' || e.target.closest('#lbX')) closeLB();
      if (e.target.closest('#lbP')) { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; showLB(); }
      if (e.target.closest('#lbN')) { lbIdx = (lbIdx + 1) % lbItems.length; showLB(); }
    });
    addEventListener('keydown', e => { if (!$('#lb').classList.contains('on')) return; if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; showLB(); } if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbItems.length; showLB(); } });
  }
  /* Forms */
  function bindForms() {
    $$('form.js-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const f = form.elements, name = (f.name.value || '').trim(), phone = (f.phone.value || '').trim();
        const okName = name.length > 1, okPhone = /^[0-9 +().-]{8,}$/.test(phone);
        f.name.classList.toggle('err', !okName); f.phone.classList.toggle('err', !okPhone);
        if (!okName || !okPhone) { toast(t('f.req')); return; }
        const msg = `Name: ${name}\nPhone: ${phone}\nEmail: ${(f.email && f.email.value) || ''}\nInterest: ${(f.type && f.type.value) || ''}\n\n${(f.msg && f.msg.value) || ''}`;
        const res = $('.form-result', form);
        res.innerHTML = `<b>${t('f.ok')}</b><br>${t('f.demo')}<br><a class="btn btn-dark btn-sm" href="mailto:${COMPANY.email}?subject=${encodeURIComponent('Quote request – ' + COMPANY.brand)}&body=${encodeURIComponent(msg)}">${ic('mail')} ${t('f.mail')}</a><a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="https://zalo.me/${COMPANY.zalo}">${t('f.zalo')}</a>`;
        res.classList.add('on'); toast(t('f.ok'));
      });
    });
  }
  function renderSteps(sel) {
    const el = $(sel); if (!el) return;
    el.innerHTML = [1, 2, 3, 4, 5, 6].map(i => `<div class="step reveal" data-d="${i * 90}"><div class="num">0${i}</div><h4 data-i18n="ps${i}.t"></h4><p data-i18n="ps${i}.d"></p></div>`).join('');
  }

  /* ---------- PAGE: HOME ---------- */
  function initHome() {
    /* hero slider */
    const slides = $$('.hslide'), dots = $('.hdots'); let cur = 0, timer;
    slides.forEach((_, n) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Slide ' + (n + 1)); b.onclick = () => go(n, true); dots.appendChild(b); });
    function go(n, manual) { cur = (n + slides.length) % slides.length; slides.forEach((s, i) => s.classList.toggle('active', i === cur)); $$('button', dots).forEach((d, i) => d.classList.toggle('on', i === cur)); clearInterval(timer); timer = setInterval(() => go(cur + 1), 6500); }
    $('#hPrev').onclick = () => go(cur - 1); $('#hNext').onclick = () => go(cur + 1);
    $('.hero').addEventListener('mouseenter', () => clearInterval(timer)); $('.hero').addEventListener('mouseleave', () => go(cur));
    go(0);
    /* categories */
    $('#catGrid').innerHTML = CATEGORIES.map((c, i) => `<a class="cat-card reveal zoom" data-d="${i * 80}" href="products.html?cat=${c.id}"><img data-img="${c.img}" alt=""><span class="go">${ic('arrow')}</span><div class="cc"><h3 data-i18n="cat.${c.id}"></h3><p data-i18n="catd.${c.id}"></p></div></a>`).join('');
    /* featured tabs */
    const tabs = $('#featTabs'); let ftab = 'all';
    const drawFeat = () => {
      tabs.innerHTML = ['all', ...CATEGORIES.map(c => c.id)].map(k => `<button class="tab ${k === ftab ? 'on' : ''}" type="button" data-t="${k}">${t('cat.' + k)}</button>`).join('');
      const list = (ftab === 'all' ? PRODUCTS.filter(p => p.hot) : PRODUCTS.filter(p => p.cat === ftab)).slice(0, 8);
      renderCards($('#featGrid'), list);
    };
    tabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (!b) return; ftab = b.dataset.t; drawFeat(); });
    drawFeat(); renderFns.push(drawFeat);
    /* steps */
    renderSteps('#steps');
    /* projects */
    const drawPrj = () => {
      $('#prjGrid').innerHTML = PROJECTS.slice(0, 4).map((p, i) => `<div class="prj reveal" data-d="${i * 90}" data-lb="${p.img}" data-lbg="home" data-cap="${L(p.title)} – ${L(p.meta)}"><img data-img="${p.img}" alt=""><span class="zoom">${ic('zoom')}</span><div class="pi"><h4>${L(p.title)}</h4><small>${L(p.meta)}</small></div></div>`).join('');
      hydrate($('#prjGrid')); observeReveal($('#prjGrid'));
    };
    drawPrj(); renderFns.push(drawPrj);
    /* testimonials */
    const tmw = $('#tmWrap'), tmd = $('#tmDots');
    tmw.innerHTML = [1, 2, 3].map(i => `<div class="tm ${i === 1 ? 'active' : ''}"><div class="stars">${ic('star').repeat(5)}</div><blockquote data-i18n="tm${i}"></blockquote><cite data-i18n="tm${i}.n"></cite></div>`).join('');
    tmd.innerHTML = [0, 1, 2].map(i => `<button type="button" class="${i === 0 ? 'on' : ''}" aria-label="${i + 1}"></button>`).join('');
    let ti = 0; const tms = $$('.tm', tmw), tds = $$('button', tmd);
    const showTm = n => { ti = n; tms.forEach((x, i) => x.classList.toggle('active', i === n)); tds.forEach((x, i) => x.classList.toggle('on', i === n)); };
    tds.forEach((d, i) => d.onclick = () => showTm(i)); setInterval(() => showTm((ti + 1) % 3), 6000);
    /* marquee */
    const names = ['HOTEL GRAND', 'SUNRISE RESORT', 'VINA HOME', 'LUXE INTERIOR', 'URBAN LIVING', 'PEARL SPA', 'METRO MALL', 'ARCHI STUDIO'];
    $('#mqTrack').innerHTML = [...names, ...names].map(n => `<span>${n}</span>`).join('');
    /* news */
    const drawNews = () => { $('#newsGrid').innerHTML = NEWS.slice(0, 3).map(newsCard).join(''); hydrate($('#newsGrid')); observeReveal($('#newsGrid')); };
    drawNews(); renderFns.push(drawNews);
  }
  function newsCard(n, i) {
    return `<article class="ncard reveal" data-d="${(i || 0) * 90}"><a class="ni shine" href="news.html"><img data-img="${n.img}" alt=""></a><div class="nb"><div class="meta"><b>${t('nc.' + n.cat)}</b><span>${n.date}</span></div><h3>${L(n.title)}</h3><p>${L(n.ex)}</p><a class="more" href="news.html">${t('btn.readmore')} ${ic('arrow')}</a></div></article>`;
  }

  /* ---------- PAGE: PRODUCTS ---------- */
  function initProducts() {
    const st = { cat: params.get('cat') || 'all', q: '', sort: 'def', led: false };
    if (st.cat !== 'all' && !CATEGORIES.some(c => c.id === st.cat)) st.cat = 'all';
    const drawFilters = () => {
      $('#catFilters').innerHTML = ['all', ...CATEGORIES.map(c => c.id)].map(k => {
        const n = k === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === k).length;
        return `<button class="fcat ${k === st.cat ? 'on' : ''}" type="button" data-c="${k}">${t('cat.' + k)}<span>${n}</span></button>`;
      }).join('');
    };
    const draw = () => {
      let list = PRODUCTS.filter(p => (st.cat === 'all' || p.cat === st.cat) && (!st.led || p.led) && (!st.q || (L(p.name) + p.code + L(p.short)).toLowerCase().includes(st.q)));
      if (st.sort === 'az') list.sort((a, b) => L(a.name).localeCompare(L(b.name), lang));
      if (st.sort === 'hot') list.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
      renderCards($('#pGrid'), list);
      $('#pCount').textContent = list.length + ' ' + t('count.items');
      $('#empty').style.display = list.length ? 'none' : 'block';
      drawFilters();
      const h = $('#pbTitle'); if (h) h.textContent = st.cat === 'all' ? t('pg.products') : t('cat.' + st.cat);
    };
    $('#catFilters').addEventListener('click', e => { const b = e.target.closest('.fcat'); if (!b) return; st.cat = b.dataset.c; history.replaceState(null, '', st.cat === 'all' ? 'products.html' : '?cat=' + st.cat); draw(); });
    $('#q').addEventListener('input', e => { st.q = e.target.value.trim().toLowerCase(); draw(); });
    $('#sort').addEventListener('change', e => { st.sort = e.target.value; draw(); });
    $('#ledOnly').addEventListener('change', e => { st.led = e.target.checked; draw(); });
    $('#reset').addEventListener('click', () => { st.cat = 'all'; st.q = ''; st.sort = 'def'; st.led = false; $('#q').value = ''; $('#sort').value = 'def'; $('#ledOnly').checked = false; history.replaceState(null, '', 'products.html'); draw(); });
    draw(); renderFns.push(draw);
  }

  /* ---------- PAGE: PRODUCT DETAIL ---------- */
  function initDetail() {
    const p = PRODUCTS.find(x => x.id === params.get('id')) || null;
    const root = $('#pdRoot');
    const state = { img: 0, size: 0, glow: false, temp: '#ffe2a8' };
    window.__pdName = () => p ? L(p.name) : t('pg.title.pd');
    const draw = () => {
      if (!p) { root.innerHTML = `<div class="nf"><div><h2>${t('pd.notfound')}</h2><a class="btn btn-gold" href="products.html">${t('pd.back')}</a></div></div>`; return; }
      const sizes = SIZES[p.cat];
      root.innerHTML = `
      <div class="pd">
        <div class="gallery reveal in left">
          <div class="zoombox ${state.glow ? 'glow-on' : ''}" id="zb" style="--glow:${state.temp}"><img id="zimg" src="${imgUrl(p.imgs[state.img])}" referrerpolicy="no-referrer" alt="${L(p.name).replace(/"/g, '')}"><div class="glowlayer"></div></div>
          <div class="thumbs">${p.imgs.map((k, i) => `<button type="button" class="${i === state.img ? 'on' : ''}" data-i="${i}"><img src="${imgUrl(k)}" referrerpolicy="no-referrer" alt=""></button>`).join('')}</div>
          <div class="hint">${ic('zoom')} ${t('pd.zoomhint')}</div>
        </div>
        <div class="pd-info reveal in right">
          <span class="badge" style="position:static;display:inline-block">${t('cat.' + p.cat)}</span> ${p.led ? `<span class="badge led" style="position:static;display:inline-flex">${ic('bolt')} LED</span>` : ''}
          <h1>${L(p.name)}</h1><div class="pcode">${t('pd.model')}: ${p.code}</div>
          <p style="margin-top:.8rem;color:var(--muted)">${L(p.short)}</p>
          <div class="price">${t('contactForPrice')}</div>
          <b style="font-size:.85rem">${t('pd.size')}</b><div class="chips" style="margin:.5rem 0 0">${sizes.map((s, i) => `<button type="button" class="chip ${i === state.size ? 'on' : ''}" data-s="${i}">${s}</button>`).join('')}</div>
          <div class="lightbox-ctl"><b>${ic('sun')} ${t('pd.light')}</b>
            ${p.led ? `<div class="row"><label class="switch"><input type="checkbox" id="glowSw" ${state.glow ? 'checked' : ''}><i></i></label><span>${t('pd.lighton')}</span>
              <button type="button" class="chip ${state.temp === '#ffc46b' ? 'on' : ''}" data-k="#ffc46b"><span class="k3" style="background:#ffc46b"></span> ${t('pd.warm')}</button>
              <button type="button" class="chip ${state.temp === '#ffe2a8' ? 'on' : ''}" data-k="#ffe2a8"><span class="k3" style="background:#ffe2a8"></span> ${t('pd.neutral')}</button>
              <button type="button" class="chip ${state.temp === '#cfe8ff' ? 'on' : ''}" data-k="#cfe8ff"><span class="k3" style="background:#cfe8ff"></span> ${t('pd.cool')}</button></div>` : `<p style="margin:.5rem 0 0;font-size:.88rem;color:var(--muted)">${t('pd.nolight')}</p>`}
          </div>
          <div class="pd-cta"><a class="btn btn-gold" href="contact.html?product=${p.code}&size=${encodeURIComponent(sizes[state.size])}">${t('btn.quote')}${ic('arrow')}</a>
            <a class="btn btn-outline" href="tel:${COMPANY.hotlines[0].replace(/[^\d+]/g, '')}">${ic('phone')} ${t('pd.call')}</a>
            <a class="btn btn-outline" target="_blank" rel="noopener" href="https://zalo.me/${COMPANY.zalo}">${t('pd.zalo')}</a></div>
        </div>
      </div>
      <div class="ptabs"><div class="tabbar"><button type="button" class="on" data-p="0">${t('pd.tab1')}</button><button type="button" data-p="1">${t('pd.tab2')}</button><button type="button" data-p="2">${t('pd.tab3')}</button></div>
        <div class="tabpane on"><table class="spec"><tr><td>${t('pd.model')}</td><td>${p.code}</td></tr><tr><td>${t('pd.shape')}</td><td>${L(p.shape)}</td></tr><tr><td>${t('pd.size')}</td><td>${sizes.join(' • ')}</td></tr><tr><td>${t('pd.glass')}</td><td>${t('pd.glassv')}</td></tr>
          ${p.led ? `<tr><td>${t('pd.volt')}</td><td>AC 100–240V, 50/60Hz</td></tr><tr><td>${t('pd.temp')}</td><td>3000K – 4000K – 6000K</td></tr><tr><td>${t('pd.ip')}</td><td>IP44</td></tr>` : ''}<tr><td>${t('pd.wty')}</td><td>${t('pd.wtyv')}</td></tr></table></div>
        <div class="tabpane"><ul class="checklist">${[1, 2, 3, 4, 5].map(i => `<li>${ic('check')}<span>${t('pd.f' + i)}</span></li>`).join('')}</ul></div>
        <div class="tabpane"><ul class="checklist">${[1, 2, 3].map(i => `<li>${ic('truck')}<span>${t('pd.pk' + i)}</span></li>`).join('')}</ul></div>
      </div>`;
      bindDetail();
    };
    function bindDetail() {
      const zb = $('#zb'), zimg = $('#zimg');
      zimg.addEventListener('error', () => { zimg.onerror = null; zimg.src = PLACEHOLDER; }, { once: true });
      zb.addEventListener('mouseenter', () => zb.classList.add('zoom'));
      zb.addEventListener('mouseleave', () => { zb.classList.remove('zoom'); zimg.style.transformOrigin = '50% 50%'; });
      zb.addEventListener('mousemove', e => { const r = zb.getBoundingClientRect(); zimg.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; });
      zb.addEventListener('click', () => openLB(p.imgs.map(k => ({ src: imgUrl(k), cap: L(p.name) })), state.img));
      $$('.thumbs button').forEach(b => b.onclick = () => { state.img = +b.dataset.i; zimg.src = imgUrl(p.imgs[state.img]); $$('.thumbs button').forEach(x => x.classList.toggle('on', x === b)); });
      $$('.chip[data-s]').forEach(b => b.onclick = () => { state.size = +b.dataset.s; $$('.chip[data-s]').forEach(x => x.classList.toggle('on', x === b)); const q = $('.pd-cta .btn-gold'); q.href = `contact.html?product=${p.code}&size=${encodeURIComponent(SIZES[p.cat][state.size])}`; });
      const sw = $('#glowSw'); if (sw) { sw.onchange = () => { state.glow = sw.checked; zb.classList.toggle('glow-on', state.glow); }; }
      $$('.chip[data-k]').forEach(b => b.onclick = () => { state.temp = b.dataset.k; zb.style.setProperty('--glow', state.temp); $$('.chip[data-k]').forEach(x => x.classList.toggle('on', x === b)); if (sw && !sw.checked) { sw.checked = true; state.glow = true; zb.classList.add('glow-on'); } });
      $$('.tabbar button').forEach(b => b.onclick = () => { $$('.tabbar button').forEach(x => x.classList.toggle('on', x === b)); $$('.tabpane').forEach((x, i) => x.classList.toggle('on', i === +b.dataset.p)); });
    }
    draw(); renderFns.push(draw);
    /* related */
    if (p) { const rel = $('#related'); const drawRel = () => { renderCards(rel, PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter(x => x.cat !== p.cat && x.hot)).slice(0, 4)); }; drawRel(); renderFns.push(drawRel); }
    else { const s = $('#relSec'); if (s) s.style.display = 'none'; }
    setTitle();
  }

  /* ---------- PAGE: CNC ---------- */
  function initCnc() {
    renderSteps('#steps');
    accordion();
    const st = { shape: 'rect', w: 60, h: 90, edge: 'polish', thick: 5, led: false };
    const SHAPES = { rect: '6px', round: '28px', oval: '50%', arch: '999px 999px 8px 8px', pill: '999px', organic: '58% 42% 55% 45% / 48% 58% 42% 52%' };
    $('#shapeBtns').innerHTML = Object.keys(SHAPES).map(k => `<button type="button" class="chip ${k === st.shape ? 'on' : ''}" data-sh="${k}" data-i18n="sh.${k}"></button>`).join('');
    $('#edgeBtns').innerHTML = ['polish', 'bevel', 'frost'].map(k => `<button type="button" class="chip ${k === st.edge ? 'on' : ''}" data-ed="${k}" data-i18n="ed.${k}"></button>`).join('');
    $('#thickBtns').innerHTML = [4, 5, 6, 8].map(k => `<button type="button" class="chip ${k === st.thick ? 'on' : ''}" data-th="${k}">${k} mm</button>`).join('');
    applyI18n($('.cfg'));
    const m = $('#cfgMirror');
    function upd() {
      const sc = Math.min(300 / st.w, 340 / st.h);
      m.style.width = Math.round(st.w * sc) + 'px'; m.style.height = Math.round(st.h * sc) + 'px';
      m.style.borderRadius = SHAPES[st.shape];
      m.className = 'cfg-mirror ' + (st.edge === 'bevel' ? 'bevel ' : st.edge === 'frost' ? 'frost ' : '') + (st.led ? 'led' : '');
      $('#cfgDim').textContent = `${st.w} × ${st.h} cm`;
      $('#wv').textContent = st.w; $('#hv').textContent = st.h;
      let area = st.w * st.h / 10000; if (st.shape === 'oval') area *= Math.PI / 4;
      $('#cfgArea').textContent = area.toFixed(2) + ' m²';
      $('#cfgTh').textContent = st.thick + ' mm';
      const q = $('#cfgGo'); q.href = `contact.html?service=cnc&shape=${st.shape}&size=${st.w}x${st.h}&edge=${st.edge}&thick=${st.thick}&led=${st.led ? 1 : 0}`;
    }
    $('#shapeBtns').onclick = e => { const b = e.target.closest('[data-sh]'); if (!b) return; st.shape = b.dataset.sh; $$('#shapeBtns .chip').forEach(x => x.classList.toggle('on', x === b)); upd(); };
    $('#edgeBtns').onclick = e => { const b = e.target.closest('[data-ed]'); if (!b) return; st.edge = b.dataset.ed; $$('#edgeBtns .chip').forEach(x => x.classList.toggle('on', x === b)); upd(); };
    $('#thickBtns').onclick = e => { const b = e.target.closest('[data-th]'); if (!b) return; st.thick = +b.dataset.th; $$('#thickBtns .chip').forEach(x => x.classList.toggle('on', x === b)); upd(); };
    $('#rw').oninput = e => { st.w = +e.target.value; upd(); };
    $('#rh').oninput = e => { st.h = +e.target.value; upd(); };
    $('#cfgLed').onchange = e => { st.led = e.target.checked; upd(); };
    upd();
  }

  /* ---------- PAGE: PROJECTS ---------- */
  function initProjects() {
    let f = 'all';
    const types = ['all', 'hotel', 'apartment', 'retail', 'spa'];
    const draw = () => {
      $('#prjTabs').innerHTML = types.map(k => `<button class="tab ${k === f ? 'on' : ''}" type="button" data-f="${k}">${t('pt.' + k)}</button>`).join('');
      $('#prjAll').innerHTML = PROJECTS.map((p, i) => `<div class="prj ${f !== 'all' && p.type !== f ? 'hide' : ''} pop" style="animation-delay:${i * 50}ms" data-lb="${p.img}" data-lbg="prj" data-cap="${L(p.title)} – ${L(p.meta)}"><img data-img="${p.img}" alt=""><span class="zoom">${ic('zoom')}</span><div class="pi"><h4>${L(p.title)}</h4><small>${L(p.meta)}</small></div></div>`).join('');
      hydrate($('#prjAll'));
    };
    $('#prjTabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (!b) return; f = b.dataset.f; draw(); });
    draw(); renderFns.push(draw);
  }

  /* ---------- PAGE: ABOUT ---------- */
  function initAbout() {
    $('#vals').innerHTML = [1, 2, 3, 4].map(i => `<div class="val reveal" data-d="${i * 80}"><span class="num">0${i}</span><h4 data-i18n="v${i}.t"></h4><p data-i18n="v${i}.d"></p></div>`).join('');
    $('#tl').innerHTML = [['', 'tl1'], ['', 'tl2'], ['', 'tl3'], ['', 'tl4']].map((x, i) => `<div class="tl reveal"><div><b>${['2010s', '', '', ''][i] || '•'}</b><span data-i18n="${x[1]}"></span></div></div>`).join('');
    $('#certs').innerHTML = ['ISO 9001', 'CE', 'RoHS', 'IP44'].map(c => `<span class="cert reveal zoom">${c}</span>`).join('');
  }

  /* ---------- PAGE: NEWS ---------- */
  function initNews() {
    let f = 'all'; const cats = ['all', 'guide', 'trend', 'tech'];
    const draw = () => {
      $('#nTabs').innerHTML = cats.map(k => `<button class="tab ${k === f ? 'on' : ''}" type="button" data-f="${k}">${t('nc.' + k)}</button>`).join('');
      $('#nCats').innerHTML = cats.map(k => `<button class="fcat ${k === f ? 'on' : ''}" type="button" data-f="${k}">${t('nc.' + k)}<span>${k === 'all' ? NEWS.length : NEWS.filter(n => n.cat === k).length}</span></button>`).join('');
      const list = NEWS.filter(n => f === 'all' || n.cat === f);
      const first = list[0];
      $('#nFeat').innerHTML = first ? `<div class="featured reveal in"><a class="ni shine" href="#"><img data-img="${first.img}" alt=""></a><div class="nb"><div class="meta"><b>${t('news.feat')}</b><span>${first.date}</span></div><h3>${L(first.title)}</h3><p style="color:var(--muted)">${L(first.ex)}</p><a class="more" href="#">${t('btn.readmore')} ${ic('arrow')}</a></div></div>` : '';
      $('#nList').innerHTML = list.slice(1).map((n, i) => newsCard(n, i)).join('');
      hydrate($('#nFeat')); hydrate($('#nList')); observeReveal($('#nList'));
    };
    const click = e => { const b = e.target.closest('[data-f]'); if (!b) return; f = b.dataset.f; draw(); };
    $('#nTabs').addEventListener('click', click); $('#nCats').addEventListener('click', click);
    draw(); renderFns.push(draw);
    $('#nlForm').addEventListener('submit', e => { e.preventDefault(); toast(t('f.ok')); e.target.reset(); });
  }

  /* ---------- PAGE: CONTACT ---------- */
  function initContact() {
    const pr = params.get('product'), sv = params.get('service');
    const msg = $('#cMsg'); const bits = [];
    if (pr) bits.push('Product: ' + pr); if (params.get('size')) bits.push('Size: ' + params.get('size'));
    if (sv === 'cnc') { bits.push('CNC – shape: ' + params.get('shape') + ', size: ' + params.get('size') + ' cm, edge: ' + params.get('edge') + ', thickness: ' + params.get('thick') + 'mm, LED: ' + (params.get('led') === '1' ? 'yes' : 'no')); $('#cType').value = 'cnc'; }
    if (bits.length) msg.value = bits.join('\n');
    $('#ctCards').innerHTML = `
      <div class="ic-card reveal"><span class="ico">${ic('pin')}</span><div><b data-i18n="lbl.office"></b><span data-company="address"></span></div></div>
      <div class="ic-card reveal"><span class="ico">${ic('factory')}</span><div><b data-i18n="lbl.factory"></b><span data-company="factory"></span></div></div>
      <div class="ic-card reveal"><span class="ico">${ic('phone')}</span><div><b data-i18n="lbl.hotline"></b>${COMPANY.hotlines.map(h => `<a href="tel:${h.replace(/[^\d+]/g, '')}" style="display:block;font-weight:600">${h}</a>`).join('')}</div></div>
      <div class="ic-card reveal"><span class="ico">${ic('mail')}</span><div><b data-i18n="lbl.email"></b><a href="mailto:${COMPANY.email}" style="font-weight:600">${COMPANY.email}</a><br><b data-i18n="lbl.hours" style="margin-top:.5rem"></b><span data-i18n="hours.v"></span></div></div>`;
    $('#mapBox').innerHTML = `<iframe title="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&output=embed"></iframe>`;
    applyI18n($('#ctCards')); $$('[data-company]', $('#ctCards')).forEach(el => el.textContent = L(COMPANY[el.dataset.company]));
    accordion();
  }

  /* ---------- BOOT ---------- */
  function boot() {
    buildChrome(); bindGlobalClicks();
    const init = { home: initHome, products: initProducts, product: initDetail, cnc: initCnc, projects: initProjects, about: initAbout, news: initNews, contact: initContact }[page];
    if (init) init();
    bindForms();
    $$('.reveal:not(.in)').forEach(el => el.dataset.d && (el.style.transitionDelay = el.dataset.d + 'ms'));
    hydrate(); applyI18n(); setLang(lang); observeReveal(); counters(); tilt(document);
    /* re-observe & re-tilt after language/dynamic re-render */
    renderFns.push(() => { hydrate(); observeReveal(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
