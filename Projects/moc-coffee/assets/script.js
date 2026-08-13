/* ===== PRELOADER ===== */
(function () {
  const pre = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => pre && pre.classList.add('done'), 900));
  setTimeout(() => pre && pre.classList.add('done'), 2600);
})();

/* ===== NAV / PROGRESS / REVEAL (scroll-driven, gentle) ===== */
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
const revealEls = [...document.querySelectorAll('.reveal')];

function frameUpdate() {
  const y = window.scrollY, vh = window.innerHeight;
  nav.classList.toggle('scrolled', y > 30);
  const h = document.documentElement.scrollHeight - vh;
  progress.style.width = (h > 0 ? y / h * 100 : 0) + '%';
  for (let i = revealEls.length - 1; i >= 0; i--) {
    if (revealEls[i].getBoundingClientRect().top < vh * 0.88) {
      revealEls[i].classList.add('in');
      revealEls.splice(i, 1);
    }
  }
}
window.addEventListener('scroll', frameUpdate, { passive: true });
window.addEventListener('resize', frameUpdate);
frameUpdate();

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => { burger.classList.remove('open'); navLinks.classList.remove('open'); }));

/* ===== BOOKING FORM ===== */
const form = document.getElementById('bookForm');
const ok = document.getElementById('ok');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !phone) {
    [['name', name], ['phone', phone]].forEach(([id, v]) => {
      if (!v) { const f = document.getElementById(id); f.style.borderColor = '#c0553c'; setTimeout(() => f.style.borderColor = '', 1500); }
    });
    return;
  }
  ok.classList.add('show');
  form.querySelector('button').textContent = '✓ Đã gửi';
  setTimeout(() => {
    form.reset(); ok.classList.remove('show');
    form.querySelector('button').textContent = 'Gửi cho Mộc';
  }, 4500);
});
