// Interaksi portofolio. Tanpa JS, semua konten tetap tampil utuh.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---- menu ponsel ---- */
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

/* ---- progres gulir, bayangan header, parallax ---- */
const header = $('.top');
const bar = $('.progress');
const para = calm ? [] : $$('[data-parallax]');
let ticking = false;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.setProperty('--p', max > 0 ? scrollY / max : 0);
  header.classList.toggle('is-scrolled', scrollY > 8);
  for (const el of para) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) continue;
    const mid = r.top + r.height / 2 - innerHeight / 2;
    el.style.translate = `0 ${(mid * parseFloat(el.dataset.parallax)).toFixed(1)}px`;
  }
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);
onScroll();

/* ---- menu aktif sesuai bagian yang dibaca ---- */
if ('IntersectionObserver' in window) {
  const links = new Map($$('.nav a').map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      links.get(en.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

/* ---- hitungan naik ---- */
function countUp(el, delay = 0) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals || '0', 10);
  const fmt = (v) => v.toFixed(dec).replace('.', ',');
  if (calm) { el.textContent = fmt(target); return; }
  const t0 = performance.now() + delay;
  el.textContent = fmt(0);
  const step = (t) => {
    const k = Math.min(Math.max((t - t0) / 1500, 0), 1);
    el.textContent = fmt(target * (1 - Math.pow(1 - k, 4)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
$$('[data-count]').forEach((el, i) => countUp(el, 1000 + i * 100));

/* ---- muncul saat digulir ---- */
if (!calm && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  $$('.head__title, .case__title, .contact__title, .about__big, .case__no').forEach((el) => io.observe(el));
  $$('.head__note, .case__media, .case__body, .case__head .mono, .flow__label, .about__cols p, .sheet, .case__big')
    .forEach((el) => { el.classList.add('rv'); io.observe(el); });
  $$('.plist, .cards, .tickets, .socials, .flow__steps').forEach((el) => {
    el.classList.add('st');
    [...el.children].forEach((c, i) => { c.style.transitionDelay = `${i * 70}ms`; });
    io.observe(el);
    setTimeout(() => [...el.children].forEach((c) => { c.style.transitionDelay = ''; }), 4000);
  });
}

/* ---- intip gambar proyek yang mengikuti kursor ---- */
const peek = $('.peek');
if (finePointer && peek) {
  const img = $('img', peek);
  let x = 0, y = 0, px = 0, py = 0, raf = 0;
  const loop = () => {
    px += (x - px) * 0.18; py += (y - py) * 0.18;
    peek.style.left = `${px}px`; peek.style.top = `${py}px`;
    raf = Math.abs(x - px) + Math.abs(y - py) > 0.5 ? requestAnimationFrame(loop) : 0;
  };
  $$('.plist a').forEach((a) => {
    a.addEventListener('mouseenter', (e) => {
      img.src = a.dataset.peek;
      peek.classList.toggle('is-tall', a.hasAttribute('data-tall'));
      x = px = e.clientX + 170; y = py = e.clientY;
      peek.classList.add('is-on');
    });
    a.addEventListener('mousemove', (e) => {
      x = e.clientX + (peek.classList.contains('is-tall') ? 120 : 200); y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    a.addEventListener('mouseleave', () => peek.classList.remove('is-on'));
  });
}

/* ---- kartu miring mengikuti kursor ---- */
if (finePointer && !calm) {
  $$('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* tombol magnet */
  $$('.btn').forEach((b) => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });
}
