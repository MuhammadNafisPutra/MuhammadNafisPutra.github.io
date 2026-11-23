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

  /* muncul pelan saat digulir */
  if (!calm) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    $$('.head, .case__head, .case__media, .case__split, .case__body, .flow, .cards, .about__big, .about__cols, .sheet, .tickets, .contact__title, .socials')
      .forEach((el) => { el.classList.add('rv'); io.observe(el); });
  }
}

/* intip gambar proyek di daftar karya (hanya di perangkat dengan kursor) */
const peek = $('.peek');
if (peek && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const img = $('img', peek);
  $$('.plist a').forEach((a) => {
    a.addEventListener('mouseenter', () => {
      img.src = a.dataset.peek;
      peek.classList.toggle('is-tall', a.hasAttribute('data-tall'));
      peek.classList.add('is-on');
    });
    a.addEventListener('mousemove', (e) => {
      peek.style.left = `${e.clientX + (peek.classList.contains('is-tall') ? 110 : 170)}px`;
      peek.style.top = `${e.clientY}px`;
    });
    a.addEventListener('mouseleave', () => peek.classList.remove('is-on'));
  });
}
