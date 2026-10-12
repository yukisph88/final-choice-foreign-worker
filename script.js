/* ==========================================================================
   Final Choice — landing page script (vanilla JS, no dependencies)
   Shared by the English page (index.html) and the Malay page (ms/index.html).
   The language is taken from <html lang="..."> ("ms…" = Bahasa Melayu).
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG — edit these values only
     whatsappNumber: main foreign worker enquiry line (Yuki, 013-377 3333),
                     international format, digits only, no "+" or spaces.
     formEndpoint:   leave '' — the enquiry form then prepares the message in
                     WhatsApp and the visitor presses Send themselves. Nothing
                     is ever "sent" silently and no "received" message is shown.
                     Only set a URL (Formspree, Getform, Google Apps Script…)
                     if you later connect an online form service; the success
                     message is then shown only if that service confirms receipt.
     ------------------------------------------------------------------ */
  var CONFIG = {
    whatsappNumber: '60133773333',
    formEndpoint: ''
  };

  /* ------------------------------------------------------------------
     TEXT — one block per language. WhatsApp messages are keyed by the
     data-wa="..." attribute in the HTML.
     ------------------------------------------------------------------ */
  var TEXT = {
    en: {
      wa: {
        general: 'Hi Final Choice, I would like to enquire about foreign worker services.',
        question: 'Hi Final Choice, I have some questions about the foreign worker application process for my company.',
        checklist: 'Hi Final Choice, I would like to request the foreign worker application document checklist.',
        team: 'Hi Final Choice, I would like to speak with your team about the foreign worker application process and timeline.',
        final: 'Hi Final Choice, I need foreign workers for my business.\nSector:\nBusiness activity:\nJob position:\nNumber of workers:\nCompany location:',
        manufacturing: 'Hi Final Choice, I would like to enquire about foreign workers for the manufacturing sector.',
        services: 'Hi Final Choice, I would like to enquire about foreign workers for the services sector.',
        construction: 'Hi Final Choice, I would like to enquire about foreign workers for the construction sector.',
        plantation: 'Hi Final Choice, I would like to enquire about foreign workers for the plantation sector.',
        agriculture: 'Hi Final Choice, I would like to enquire about foreign workers for the agriculture sector.'
      },
      form: {
        intro: 'Hi Final Choice, I would like to enquire about foreign worker services.',
        name: 'Name', company: 'Company', mobile: 'Mobile', email: 'Email', location: 'Company Location',
        sector: 'Sector', workers: 'Workers Required', position: 'Job Position', stage: 'Current Stage', message: 'Message'
      },
      err: {
        name: 'Please enter your full name.',
        company: 'Please enter your company name.',
        phoneEmpty: 'Please enter your mobile / WhatsApp number.',
        phone: 'Please enter a valid Malaysian mobile number, e.g. 012-345 6789.',
        email: 'Please enter a valid email address.',
        location: 'Please enter your company location.',
        sector: 'Please select your business sector.',
        workers: 'Please enter a whole number of workers.'
      },
      sending: 'Sending…',
      sendFailed: 'Sorry, your enquiry could not be sent. Please try again or contact us on WhatsApp.',
      menuOpen: 'Open menu',
      menuClose: 'Close menu'
    },
    ms: {
      wa: {
        general: 'Hi Final Choice, saya ingin bertanya mengenai perkhidmatan pekerja asing.',
        question: 'Hi Final Choice, saya ada beberapa soalan mengenai proses permohonan pekerja asing untuk syarikat saya.',
        checklist: 'Hi Final Choice, saya ingin mendapatkan senarai semak dokumen untuk permohonan pekerja asing.',
        team: 'Hi Final Choice, saya ingin berbincang dengan pasukan anda mengenai proses dan tempoh permohonan pekerja asing.',
        final: 'Hi Final Choice, saya memerlukan pekerja asing untuk perniagaan saya.\nSektor:\nAktiviti perniagaan:\nJawatan:\nBilangan pekerja:\nLokasi syarikat:',
        manufacturing: 'Hi Final Choice, saya ingin bertanya mengenai pekerja asing untuk sektor pembuatan.',
        services: 'Hi Final Choice, saya ingin bertanya mengenai pekerja asing untuk sektor perkhidmatan.',
        construction: 'Hi Final Choice, saya ingin bertanya mengenai pekerja asing untuk sektor pembinaan.',
        plantation: 'Hi Final Choice, saya ingin bertanya mengenai pekerja asing untuk sektor perladangan.',
        agriculture: 'Hi Final Choice, saya ingin bertanya mengenai pekerja asing untuk sektor pertanian.'
      },
      form: {
        intro: 'Hi Final Choice, saya ingin bertanya mengenai perkhidmatan pekerja asing.',
        name: 'Nama', company: 'Syarikat', mobile: 'Telefon', email: 'E-mel', location: 'Lokasi Syarikat',
        sector: 'Sektor', workers: 'Bilangan Pekerja', position: 'Jawatan', stage: 'Peringkat Semasa', message: 'Mesej'
      },
      err: {
        name: 'Sila masukkan nama penuh anda.',
        company: 'Sila masukkan nama syarikat anda.',
        phoneEmpty: 'Sila masukkan nombor telefon / WhatsApp anda.',
        phone: 'Sila masukkan nombor telefon bimbit Malaysia yang sah, cth. 012-345 6789.',
        email: 'Sila masukkan alamat e-mel yang sah.',
        location: 'Sila masukkan lokasi syarikat anda.',
        sector: 'Sila pilih sektor perniagaan anda.',
        workers: 'Sila masukkan bilangan pekerja dalam nombor bulat.'
      },
      sending: 'Menghantar…',
      sendFailed: 'Maaf, pertanyaan anda tidak dapat dihantar. Sila cuba lagi atau hubungi kami melalui WhatsApp.',
      menuOpen: 'Buka menu',
      menuClose: 'Tutup menu'
    }
  };

  var doc = document;
  var LANG = /^ms/i.test(doc.documentElement.lang) ? 'ms' : 'en';
  var T = TEXT[LANG];

  /* ---------------- Analytics helper ----------------
     Pushes to dataLayer (GTM/GA4) and calls gtag / fbq only if installed,
     so nothing breaks while Google Analytics is not configured.
     Events: whatsapp_click, phone_click (contact: yuki),
     form_whatsapp_handoff, sector_enquiry, checklist_click,
     email_click, maps_click, cta_click, language_switch. Every event also
     carries page_language: en | ms. */
  window.dataLayer = window.dataLayer || [];
  function track(eventName, params) {
    params = Object.assign({ page_language: LANG }, params || {});
    try {
      window.dataLayer.push(Object.assign({ event: eventName }, params));
      if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
      if (typeof window.fbq === 'function') {
        if (eventName === 'form_submit' || eventName === 'form_whatsapp_handoff') window.fbq('track', 'Lead', params);
        else if (eventName === 'whatsapp_click' || eventName === 'phone_click' || eventName === 'sector_enquiry') window.fbq('track', 'Contact', params);
      }
    } catch (e) { /* never break the page because of analytics */ }
  }

  doc.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el || el.tagName === 'FORM') return;
    var params = {
      label: el.getAttribute('data-track-label') || '',
      link_url: el.getAttribute('href') || ''
    };
    if (el.hasAttribute('data-contact')) params.contact = el.getAttribute('data-contact');
    track(el.getAttribute('data-track'), params);
  });

  /* ---------------- WhatsApp links ---------------- */
  var waNumber = String(CONFIG.whatsappNumber).replace(/\D/g, '');

  function waUrl(msg) {
    return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(msg);
  }

  doc.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waUrl(T.wa[a.getAttribute('data-wa')] || T.wa.general);
    a.target = '_blank';
    a.rel = 'noopener';
  });


  /* ---------------- Sticky header shadow + floating WhatsApp ---------------- */
  var header = doc.querySelector('.site-header');
  var waFloat = doc.querySelector('.wa-float');
  var hero = doc.getElementById('home');
  var contact = doc.getElementById('contact');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    if (waFloat) {
      // Show after the hero; hide while the contact form is on screen
      var pastHero = y > hero.offsetTop + hero.offsetHeight - 200;
      var r = contact.getBoundingClientRect();
      var atForm = r.top < window.innerHeight * 0.6 && r.bottom > 0;
      waFloat.classList.toggle('is-visible', pastHero && !atForm);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile navigation ---------------- */
  var toggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('primary-nav');

  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? T.menuClose : T.menuOpen;
    nav.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) setNav(false); });

  /* ---------------- Active nav link on scroll ---------------- */
  var navLinks = nav.querySelectorAll('ul a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var linkFor = {};
    navLinks.forEach(function (l) { linkFor[l.getAttribute('href').slice(1)] = l; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && linkFor[en.target.id]) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
          linkFor[en.target.id].classList.add('is-active');
          linkFor[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(linkFor).forEach(function (id) { var s = doc.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Form prefill from CTAs ----------------
     data-prefill-sector / data-prefill-stage must match an <option> text
     on the same page (English text on index.html, Malay text on ms/). */
  var form = doc.getElementById('enquiry-form');
  var sectorSelect = doc.getElementById('f-sector');
  var stageSelect = doc.getElementById('f-stage');

  doc.querySelectorAll('[data-prefill-sector], [data-prefill-stage]').forEach(function (el) {
    el.addEventListener('click', function () {
      var sector = el.getAttribute('data-prefill-sector');
      var stage = el.getAttribute('data-prefill-stage');
      if (sector) { sectorSelect.value = sector; clearError(sectorSelect); }
      if (stage) stageSelect.value = stage;
      // Move focus to the first field once the smooth scroll has finished
      setTimeout(function () { doc.getElementById('f-name').focus({ preventScroll: true }); }, 700);
    });
  });

  /* ---------------- Form mode ---------------- */
  var successBox = doc.getElementById('form-success');
  var statusEl = doc.getElementById('form-status');
  var notice = doc.getElementById('form-notice');
  var handoff = doc.getElementById('form-handoff');
  var handoffLink = doc.getElementById('form-handoff-link');
  var submitBtn = form.querySelector('button[type="submit"]');
  var online = !!CONFIG.formEndpoint;

  if (online) {
    notice.hidden = true;
    submitBtn.classList.replace('btn-wa', 'btn-primary');
    submitBtn.querySelector('.btn-wa-icon').style.display = 'none';
    submitBtn.querySelector('.btn-label').textContent = submitBtn.getAttribute('data-label-online');
  }

  /* ---------------- Form validation ---------------- */

  var RULES = {
    'f-name': function (v) { return v.length >= 2 ? '' : T.err.name; },
    'f-company': function (v) { return v.length >= 2 ? '' : T.err.company; },
    'f-phone': function (v) {
      if (!v) return T.err.phoneEmpty;
      var digits = v.replace(/[\s\-()]/g, '');
      // Malaysian mobile: 01X-XXXXXXX(X), optionally with 6 / +6 prefix
      return /^(\+?6)?01\d{8,9}$/.test(digits) ? '' : T.err.phone;
    },
    'f-email': function (v) {
      return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : T.err.email;
    },
    'f-location': function (v) { return v.length >= 2 ? '' : T.err.location; },
    'f-sector': function (v) { return v ? '' : T.err.sector; },
    'f-workers': function (v) {
      if (!v) return '';
      var n = Number(v);
      return Number.isInteger(n) && n >= 1 && n <= 10000 ? '' : T.err.workers;
    }
  };

  function errEl(input) { return doc.getElementById(input.id + '-err'); }
  function showError(input, msg) {
    input.setAttribute('aria-invalid', 'true');
    var e = errEl(input);
    if (e) { e.textContent = msg; }
    var describedBy = (input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
    if (describedBy.indexOf(input.id + '-err') === -1) describedBy.push(input.id + '-err');
    input.setAttribute('aria-describedby', describedBy.join(' '));
  }
  function clearError(input) {
    input.removeAttribute('aria-invalid');
    var e = errEl(input);
    if (e) e.textContent = '';
  }
  function validateField(input) {
    var rule = RULES[input.id];
    if (!rule) return true;
    var msg = rule(input.value.trim());
    if (msg) { showError(input, msg); return false; }
    clearError(input);
    return true;
  }

  Object.keys(RULES).forEach(function (id) {
    var input = doc.getElementById(id);
    input.addEventListener('blur', function () { if (input.value.trim()) validateField(input); });
    input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') validateField(input); });
    input.addEventListener('change', function () { if (input.getAttribute('aria-invalid') === 'true') validateField(input); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusEl.textContent = '';

    var firstInvalid = null;
    Object.keys(RULES).forEach(function (id) {
      var input = doc.getElementById(id);
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Honeypot: ignore bots
    if (form.website.value) return;

    var data = {};
    new FormData(form).forEach(function (value, key) { if (key !== 'website') data[key] = String(value).trim(); });

    if (!online) { handOffToWhatsApp(data); return; }

    data.page = location.href;
    data.page_language = LANG;
    data.submitted_at = new Date().toISOString();
    var label = submitBtn.querySelector('.btn-label');
    submitBtn.setAttribute('aria-busy', 'true');
    label.textContent = T.sending;

    send(data).then(function () {
      track('form_submit', { sector: data.sector, application_stage: data.application_stage || '' });
      showSuccess();
    }).catch(function () {
      statusEl.textContent = T.sendFailed;
    }).then(function () {
      submitBtn.removeAttribute('aria-busy');
      label.textContent = submitBtn.getAttribute('data-label-online');
    });
  });

  /* No backend: build a WhatsApp message from the form (in the page's
     language) and open wa.me/<number>?text=<encodeURIComponent(message)>.
     The form is NOT cleared and NO "received" message is shown — the visitor
     reviews the message and presses Send in WhatsApp themselves. Optional
     fields that were left empty are omitted. */
  function handOffToWhatsApp(d) {
    var L = T.form;
    var lines = [
      L.intro,
      '',
      L.name + ': ' + d.full_name,
      L.company + ': ' + d.company_name,
      L.mobile + ': ' + d.mobile,
      d.email ? L.email + ': ' + d.email : null,
      L.location + ': ' + d.company_location,
      L.sector + ': ' + d.sector,
      d.workers_required ? L.workers + ': ' + d.workers_required : null,
      d.job_position ? L.position + ': ' + d.job_position : null,
      d.application_stage ? L.stage + ': ' + d.application_stage : null,
      d.message ? L.message + ': ' + d.message : null
    ].filter(function (l) { return l !== null; });
    var url = waUrl(lines.join('\n'));
    handoffLink.href = url;

    track('form_whatsapp_handoff', { sector: d.sector, application_stage: d.application_stage || '' });
    // Open WhatsApp in a new tab; if a popup blocker stops it, use this tab.
    var win = window.open(url, '_blank');
    if (win) { win.opener = null; } else { window.location.href = url; }
    handoff.hidden = false;
    handoff.focus();
  }

  function send(data) {
    return fetch(CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res; });
  }

  function showSuccess() {
    form.reset();
    form.hidden = true;
    successBox.hidden = false;
    successBox.focus();
  }

  /* ---------------- Footer year ---------------- */
  var year = doc.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
