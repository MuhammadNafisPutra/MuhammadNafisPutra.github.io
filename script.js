// Menu ponsel, progres gulir, menu aktif, hitungan IPK, dan animasi muncul.
// Tanpa JS, semua konten tetap tampil utuh.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Menu ponsel */
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

/* Garis header + bilah progres */
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

$('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  /* Menu aktif sesuai bagian yang sedang dibaca */
  const links = new Map($$('.nav a').map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      links.get(en.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  if (!calm) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    $$('.section__head').forEach((el) => io.observe(el));
    $$('.work__meta, .timeline > li, .pull, .about__body > p, .contact__title')
      .forEach((el) => { el.classList.add('reveal'); io.observe(el); });
    $$('.work').forEach((el) => io.observe(el));
    $$('.cards, .certs, .socials').forEach((el) => {
      el.classList.add('stagger');
      [...el.children].forEach((c, i) => { c.style.transitionDelay = `${i * 80}ms`; });
      io.observe(el);
      // setelah muncul, hapus jeda agar efek hover terasa langsung
      el.addEventListener('transitionend', () => [...el.children].forEach((c) => { c.style.transitionDelay = ''; }), { once: true });
    });

    /* Hitungan IPK */
    const ipk = $('[data-count]');
    const target = parseFloat(ipk.dataset.count);
    const t0 = performance.now() + 900;
    const step = (t) => {
      const k = Math.min(Math.max((t - t0) / 1400, 0), 1);
      ipk.textContent = (target * (1 - Math.pow(1 - k, 3))).toFixed(2).replace('.', ',');
      if (k < 1) requestAnimationFrame(step);
    };
    ipk.textContent = '0,00';
    requestAnimationFrame(step);
  }
}
