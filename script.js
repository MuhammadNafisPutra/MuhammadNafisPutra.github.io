// Interaksi seperlunya. Tanpa JS, semua konten tetap tampil utuh.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* menu ponsel */
const nav = $('#nav');
const menu = $('.menu');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Tutup' : 'Menu';
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && nav.classList.contains('is-open')) menu.click();
});

$('#year').textContent = new Date().getFullYear();

/* progres gulir + garis header */
const header = $('.top');
const bar = $('.progress');
let ticking = false;
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.setProperty('--p', max > 0 ? scrollY / max : 0);
  header.classList.toggle('is-scrolled', scrollY > 8);
  ticking = false;
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* angka statistik menghitung naik */
if (!calm) {
  $$('.stats dd').forEach((el, i) => {
    const raw = el.childNodes[0].textContent.trim();
    const target = parseFloat(raw.replace(',', '.'));
    if (Number.isNaN(target)) return;
    const dec = raw.includes(',') ? raw.split(',')[1].length : 0;
    const t0 = performance.now() + 750 + i * 80;
    el.textContent = (0).toFixed(dec).replace('.', ',');
    const step = (t) => {
      const k = Math.min(Math.max((t - t0) / 1200, 0), 1);
      el.textContent = (target * (1 - Math.pow(1 - k, 4))).toFixed(dec).replace('.', ',');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

if ('IntersectionObserver' in window) {
  /* menu aktif */
  const links = new Map($$('.nav a').map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      links.get(en.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* muncul saat digulir */
  if (!calm) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.head__title, .contact__title, .about__big').forEach((el) => io.observe(el));
    $$('.head__note, .filters, .about__cols, .sheet, .tickets, .socials').forEach((el) => { el.classList.add('rv'); io.observe(el); });
    $$('.proj').forEach((el, i) => {
      el.classList.add('rv');
      el.style.transitionDelay = `${(i % 3) * 90}ms`;
      io.observe(el);
    });
    // setelah muncul, hapus jeda agar efek hover terasa langsung
    setTimeout(() => $$('.proj').forEach((el) => { el.style.transitionDelay = ''; }), 2500);
  }
}

/* saring proyek per kategori */
const grid = $('.grid');
const cards = $$('.proj');
let busy = false;
$$('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (busy || btn.classList.contains('is-on')) return;
    $$('.filter').forEach((b) => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', b === btn); });
    const cat = btn.dataset.filter;
    const apply = () => {
      cards.forEach((c) => { c.hidden = cat !== 'all' && c.dataset.cat !== cat; });
      grid.classList.toggle('is-filtered', cat !== 'all');
      const shown = cards.filter((c) => !c.hidden);
      if (calm) return;
      shown.forEach((c) => { c.classList.add('is-hiding'); c.classList.add('is-in'); });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        shown.forEach((c, i) => setTimeout(() => c.classList.remove('is-hiding'), i * 70));
        busy = false;
      }));
    };
    if (calm) { apply(); return; }
    busy = true;
    cards.filter((c) => !c.hidden).forEach((c) => c.classList.add('is-hiding'));
    setTimeout(apply, 280);
  });
});
