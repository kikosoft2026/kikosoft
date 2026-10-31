(function () {
  var t = null;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  if (t !== 'light' && t !== 'dark') t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
})();

/* ---------- Main site interactions ---------- */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- i18n (textContent only: no HTML injection) ---------- */
  var bn = {
    skip: 'মূল অংশে যান', nav_services: 'সার্ভিস', nav_show: 'শোকেস', nav_why: 'কেন আমরা', nav_about: 'সম্পর্কে', nav_contact: 'যোগাযোগ', nav_book: 'প্রজেক্ট শুরু করুন',
    t1: 'ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট', h1a: 'আমরা ডিজাইন ও ডেভেলপ করি ওয়েবসাইট', h1b: 'আপনার ব্যবসার জন্য।', p1: 'রেসপন্সিভ, দ্রুত ও যত্নে ডিজাইন করা ওয়েবসাইট, যা আপনার ব্র্যান্ডকে স্পষ্টভাবে তুলে ধরে।',
    t2: 'কাস্টম সফটওয়্যার', h2a: 'কাস্টম সফটওয়্যার দরকার', h2b: 'আপনার পরবর্তী প্রজেক্টের জন্য?', p2: 'ব্যবসায়িক টুল থেকে অটোমেশন, পরিচ্ছন্ন ও রক্ষণাবেক্ষণযোগ্য কোডে তৈরি।',
    t3: 'অ্যাপ ও এআই', h3a: 'অ্যাপ ও এআই টুল', h3b: 'আপনার লক্ষ্য অনুযায়ী তৈরি।', p3: 'অ্যান্ড্রয়েড ও ওয়েব অ্যাপ, স্মার্ট অটোমেশন এবং মেশিন লার্নিং সিস্টেম।',
    cta1: 'প্রজেক্ট শুরু করুন', cta2: 'আমরা কী তৈরি করি দেখুন',
    intro: 'Kikosoft একটি প্রতিষ্ঠাতা-পরিচালিত স্টুডিও, যা পরিচ্ছন্ন কোড, স্পষ্ট যোগাযোগ ও নিখুঁত ফিনিশিংসহ ওয়েবসাইট, সফটওয়্যার, অ্যাপ ও এআই টুল ডিজাইন ও তৈরি করে।',
    e1: 'আমরা যা করি', sv_h: 'স্টার্টআপ, ব্যবসা ও ক্রিয়েটরদের জন্য সার্ভিস',
    s1h: 'ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট', s1p: 'প্রিমিয়াম ইউআই/ইউএক্স ও রেসপন্সিভ ওয়েবসাইট, যা সব স্ক্রিনে ভালো কাজ করে।',
    s2h: 'রেসপন্সিভ ওয়েব ডিজাইন', s2p: 'ফোন, ট্যাবলেট, ল্যাপটপ ও বড় ডিসপ্লের জন্য মানানসই লেআউট।',
    s3h: 'অ্যান্ড্রয়েড ও ওয়েব অ্যাপ', s3p: 'আপনার ইউজার ও টিমের জন্য স্মুথ ও কার্যকর অ্যাপ্লিকেশন।',
    s4h: 'কাস্টম সফটওয়্যার', s4p: 'ব্যবসা অটোমেশন ও প্রোডাক্টিভিটির জন্য আপনার মতো করে তৈরি টুল।',
    s5h: 'বিজনেস অটোমেশন', s5p: 'নির্ভরযোগ্য স্ক্রিপ্ট ও ইন্টিগ্রেশনে বারবার করা কাজ কমান।',
    s6h: 'এআই টুলস ও এমএল সিস্টেম', s6p: 'স্মার্ট অ্যাসিস্ট্যান্ট, অটোমেশন ও মেশিন লার্নিং সিস্টেম।',
    e2: 'শোকেস', sc_h: 'আমরা যা তৈরি করি', sc_p: 'প্রজেক্টের ধরনের উদাহরণ। ক্লায়েন্ট কাজ প্রকাশ হলে কেস স্টাডি যুক্ত হবে।',
    e3: 'কেন Kikosoft', wy_h: 'আধুনিক ইঞ্জিনিয়ারিংসহ প্রফেশনাল মান', w1: 'দ্রুত পারফরম্যান্স', w2: 'নিরাপদ সিস্টেম', w3: 'আধুনিক ডিজাইন', w4: 'সরাসরি যোগাযোগ',
    e4: 'প্রতিষ্ঠাতা সম্পর্কে', ab_h: 'প্রোগ্রামার ও Kikosoft-এর প্রতিষ্ঠাতা',
    ab1: 'হ্যালো! আমি আবরার নাহিন, একজন প্যাশনেট প্রোগ্রামার ও প্রযুক্তিপ্রেমী। আমি আধুনিক ওয়েবসাইট, সফটওয়্যার, মোবাইল অ্যাপ্লিকেশন এবং এআই সিস্টেম তৈরিতে বিশেষজ্ঞ।',
    ab2: 'গত ৩ বছর ধরে আমি প্রোগ্রামিং ও ডেভেলপমেন্টে কাজ করছি এবং আধুনিক প্রযুক্তিতে ক্রমাগত দক্ষতা বাড়াচ্ছি।',
    ab3: 'প্রোগ্রামিং ও সফটওয়্যার ডেভেলপমেন্ট সংক্রান্ত সার্টিফিকেট আমার রয়েছে।',
    ab4: 'আমার লক্ষ্য Kikosoft-এর মাধ্যমে শক্তিশালী ডিজিটাল সমাধান তৈরি করা এবং ব্যবসাগুলোকে অনলাইনে বেড়ে উঠতে সাহায্য করা।',
    tc_h: 'আমরা যেসব প্রযুক্তিতে কাজ করি', e6: 'কোম্পানি সম্পর্কে', co_h: 'আমরা যা করি, ভালোবেসেই করি',
    co1: 'Kikosoft একটি প্রতিষ্ঠাতা-পরিচালিত ফুল-সার্ভিস টেকনোলজি স্টুডিও। আমরা ওয়েব ডিজাইন ও ডেভেলপমেন্টে বেশি মনোযোগ দিই, পাশাপাশি ব্যক্তি, স্টার্টআপ ও ব্যবসার জন্য সফটওয়্যার, অ্যাপ ও এআই টুল তৈরি করি।',
    co2: 'আমরা বিশ্বাস করি প্রতিটি গ্রাহক সুন্দর ও নির্ভরযোগ্য ডিজিটাল অভিজ্ঞতা পাওয়ার যোগ্য। তাই যোগাযোগ সহজ রাখি, জটিল টেকনিক্যাল ভাষা এড়াই এবং প্রতিটি প্রজেক্ট আপনার লক্ষ্যের সাথে মিলিয়ে করি।',
    p1h: 'আলোচনা', p1p: 'আপনার লক্ষ্য, ইউজার ও সময়সীমা জানান।', p2h: 'ডিজাইন', p2p: 'আমরা লেআউট, লুক ও ইউজার এক্সপেরিয়েন্স সাজাই।', p3h: 'ডেভেলপ', p3p: 'পরিচ্ছন্ন ও নিরাপদ কোড, বাস্তব ডিভাইসে পরীক্ষিত।', p4h: 'ডেলিভারি', p4p: 'লঞ্চ, হস্তান্তর এবং গো-লাইভের পরে সহায়তা।',
    e7: 'তারা কী বলে', cl_h: 'আমাদের ক্লায়েন্ট', cl_p: 'প্রজেক্ট ডেলিভারি হওয়ার সাথে সাথে ক্লায়েন্টদের গল্প ও রিভিউ এখানে প্রকাশ করা হবে। আপনার প্রজেক্টই হতে পারে প্রথম।',
    bd_h: 'আপনার পরবর্তী ওয়েবসাইট বা সফটওয়্যার তৈরির জন্য টিম খুঁজছেন?', bd_b: 'যোগাযোগ করুন',
    e5: 'যোগাযোগ', ct_h: 'আসুন আপনার পরবর্তী প্রজেক্ট তৈরি করি', ct_p: 'মেসেজ পাঠান, আমি ইমেইলে উত্তর দেব।',
    l_n: 'নাম', l_e: 'ইমেইল', l_m: 'মেসেজ', send: 'মেসেজ পাঠান', k_e: 'ইমেইল', k_a: 'ঠিকানা', rights: 'সর্বস্বত্ব সংরক্ষিত।', ftag: 'ওয়েবসাইট · অ্যাপ · সফটওয়্যার · এআই'
  };
  var ui = {
    en: { req: 'This field is required.', name: 'Name must be at least 2 characters.', mail: 'Enter a valid email address.', msg: 'Message must be at least 10 characters.', sending: 'Sending…', ok: 'Thank you! Your message was received.', fail: 'Could not send your message. Please try again, or email kikosoft2026@gmail.com.', net: 'Could not reach the server. Check your connection and try again.', many: 'Too many messages. Please try again later.', cap: 'Please complete the human verification before sending.', off: 'The contact form is not connected yet. Please email kikosoft2026@gmail.com or use WhatsApp.' },
    bn: { req: 'এই ঘরটি পূরণ করা আবশ্যক।', name: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে।', mail: 'সঠিক ইমেইল ঠিকানা দিন।', msg: 'মেসেজ কমপক্ষে ১০ অক্ষরের হতে হবে।', sending: 'পাঠানো হচ্ছে…', ok: 'ধন্যবাদ! আপনার মেসেজ পাওয়া গেছে।', fail: 'মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন বা kikosoft2026@gmail.com-এ ইমেইল করুন।', net: 'সার্ভারে পৌঁছানো যায়নি। সংযোগ দেখে আবার চেষ্টা করুন।', many: 'অনেক বেশি মেসেজ। পরে আবার চেষ্টা করুন।', cap: 'পাঠানোর আগে অনুগ্রহ করে মানব যাচাইকরণ সম্পন্ন করুন।', off: 'কন্টাক্ট ফর্ম এখনো সংযুক্ত হয়নি। অনুগ্রহ করে kikosoft2026@gmail.com-এ ইমেইল করুন বা WhatsApp ব্যবহার করুন।' }
  };
  var lang = 'en', base = new Map();
  $$('[data-i18n]').forEach(function (el) { base.set(el, el.textContent); });
  function setLang(l) {
    lang = l; document.documentElement.lang = l;
    base.forEach(function (en, el) { var k = el.getAttribute('data-i18n'); el.textContent = l === 'bn' && bn[k] ? bn[k] : en; });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    try { localStorage.setItem('lang', l); } catch (e) {}
    if (typeof tb !== 'undefined' && tb) paintTheme();
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
  try { if (localStorage.getItem('lang') === 'bn') setLang('bn'); } catch (e) {}

  /* ---------- theme switch ---------- */
  var tb = $('#theme'), root = document.documentElement, meta = $('meta[name="theme-color"]');
  var tl = { en: ['Switch to dark theme', 'Switch to light theme'], bn: ['ডার্ক থিমে যান', 'লাইট থিমে যান'] };
  function paintTheme() {
    var dark = root.getAttribute('data-theme') === 'dark';
    tb.setAttribute('aria-pressed', String(dark)); tb.setAttribute('aria-label', tl[lang][dark ? 1 : 0]);
    if (meta) meta.setAttribute('content', dark ? '#0A1413' : '#3ea094');
  }
  tb.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next); try { localStorage.setItem('theme', next); } catch (e) {} paintTheme();
  });
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener && mq.addEventListener('change', function (e) { var s = null; try { s = localStorage.getItem('theme'); } catch (x) {} if (!s) { root.setAttribute('data-theme', e.matches ? 'dark' : 'light'); paintTheme(); } });
  paintTheme();

  /* ---------- mobile menu ---------- */
  var menu = $('#menu'), nav = $('#nav');
  function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', function () { menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))); });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); menu.focus(); } });

  /* ---------- services dropdown ---------- */
  var dd = $('.dd'), ddb = $('.dd > button');
  ddb.addEventListener('click', function () { ddb.setAttribute('aria-expanded', String(dd.classList.toggle('open'))); });
  $$('.ddp a').forEach(function (a) { a.addEventListener('click', function () { dd.classList.remove('open'); ddb.setAttribute('aria-expanded', 'false'); closeMenu(); }); });

  /* ---------- hero slider ---------- */
  var slides = $$('.slide'), dots = $('#dots'), cur = 0, timer = null, paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  slides.forEach(function (s, i) {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.addEventListener('click', function () { go(i); }); dots.appendChild(b);
  });
  function go(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); s.setAttribute('aria-hidden', String(k !== cur)); });
    $$('button', dots).forEach(function (b, k) { if (k === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
  }
  function play() { stop(); if (!paused) timer = setInterval(function () { go(cur + 1); }, 6500); }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  var pp = $('#pp');
  function setPP() { pp.textContent = paused ? '▶' : '❚❚'; pp.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); }
  $('#prev').addEventListener('click', function () { go(cur - 1); });
  $('#next').addEventListener('click', function () { go(cur + 1); });
  pp.addEventListener('click', function () { paused = !paused; setPP(); play(); });
  $('#home').addEventListener('mouseenter', stop); $('#home').addEventListener('mouseleave', play);
  $('#home').addEventListener('focusin', stop); $('#home').addEventListener('focusout', play);
  go(0); setPP(); play();

  /* ---------- showcase filter ---------- */
  $$('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.filters button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      $$('.pc').forEach(function (c) { c.hidden = !(b.dataset.f === 'all' || c.dataset.f === b.dataset.f); c.classList.add('in'); });
    });
  });

  /* ---------- reveal + active nav ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$('.rv').forEach(function (el) { io.observe(el); });
    var links = $$('#nav a'), so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { so.observe(s); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- card spotlight ---------- */
  $$('.pc').forEach(function (c) {
    c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--x', (e.clientX - r.left) + 'px'); c.style.setProperty('--y', (e.clientY - r.top) + 'px'); });
  });

  /* ---------- contact form ---------- */
  var form = $('#cf'), st = $('#st'), btn = $('#sb'), t0 = Date.now(), token = '', wid = null;
  var siteKey = form.dataset.sitekey || '';
  function resetCaptcha() { token = ''; try { if (wid !== null && window.turnstile) window.turnstile.reset(wid); } catch (e) {} }
  if (siteKey) {  /* Cloudflare Turnstile: the token is verified again on the server; this only collects it */
    var slot = $('#ts'); if (slot) slot.hidden = false;
    var sc = document.createElement('script');
    sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; sc.async = true; sc.defer = true;
    sc.onload = function () {
      if (!window.turnstile || !slot) return;
      wid = window.turnstile.render(slot, { sitekey: siteKey, action: 'contact', theme: 'auto',
        callback: function (t) { token = t; }, 'expired-callback': function () { token = ''; }, 'error-callback': function () { token = ''; } });
    };
    document.head.appendChild(sc);
  }
  function setErr(id, msg) { var i = $('#' + id), p = $('#' + id + '-e'); p.textContent = msg || ''; i.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg; }
  function validate() {
    var n = form.elements.name.value.trim(), e = form.elements.email.value.trim(), m = form.elements.message.value.trim(), u = ui[lang];
    var a = setErr('n', !n ? u.req : n.length < 2 ? u.name : ''),
        b = setErr('e', !e ? u.req : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) ? u.mail : ''),
        c = setErr('m', !m ? u.req : m.length < 10 ? u.msg : '');
    return a && b && c;
  }
  function show(kind, text) { st.className = kind; st.textContent = text; }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); show('', '');
    if (!validate()) { var bad = $('[aria-invalid="true"]', form); if (bad) bad.focus(); return; }
    var u = ui[lang], label = btn.firstElementChild, orig = label.textContent;
    if (!form.dataset.api) { show('bad', u.off); return; }
    if (siteKey && !token) { show('bad', u.cap); return; }
    btn.disabled = true; label.textContent = u.sending;
    var ctl = new AbortController(), timer = setTimeout(function () { ctl.abort(); }, 15000);
    fetch(form.dataset.api, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctl.signal, credentials: 'omit',
      body: JSON.stringify({ name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), message: form.elements.message.value.trim(), website: form.elements.website.value, formLoadedAt: t0, turnstileToken: token })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { r: r, d: d }; }); })
      .then(function (x) {
        if (x.r.ok && x.d.success === true) { show('ok', u.ok); form.reset(); t0 = Date.now(); }
        else if (x.r.status === 429) show('bad', u.many);
        else if (x.d && x.d.code === 'captcha') show('bad', u.cap);
        else show('bad', u.fail);
      })
      .catch(function () { show('bad', u.net); })
      .finally(function () { clearTimeout(timer); resetCaptcha(); btn.disabled = false; label.textContent = orig; setLang(lang); });
  });
})();
