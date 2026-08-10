/* ===== PRELOADER ===== */
(function () {
  const pre = document.getElementById('preloader');
  const count = document.getElementById('count');
  let n = 0;
  const t = setInterval(() => {
    n += Math.floor(Math.random() * 12) + 4;
    if (n >= 100) { n = 100; clearInterval(t); }
    if (count) count.textContent = n;
  }, 90);
  window.addEventListener('load', () => setTimeout(() => pre && pre.classList.add('done'), 1200));
  setTimeout(() => pre && pre.classList.add('done'), 3200);
})();

/* ===== SMOOTH MOMENTUM SCROLL (desktop only) ===== */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canSmooth = window.matchMedia('(hover:hover) and (pointer:fine)').matches
  && !prefersReduced && window.innerWidth > 960;
const content = document.getElementById('smooth-content');
let smoothY = 0;

if (canSmooth && content) {
  document.documentElement.classList.add('smooth-on');
  const setHeight = () => { document.body.style.height = content.offsetHeight + 'px'; };
  setHeight();
  window.addEventListener('load', setHeight);
  if ('ResizeObserver' in window) new ResizeObserver(setHeight).observe(content);
  smoothY = window.scrollY;
  const raf = () => {
    const targetY = window.scrollY;
    smoothY += (targetY - smoothY) * 0.09;
    if (Math.abs(targetY - smoothY) < 0.4) smoothY = targetY;
    content.style.transform = `translate3d(0,${-smoothY}px,0)`;
    frameUpdate();
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* ===== NAV / PROGRESS / REVEAL / COUNTERS (scroll-driven, clip-path safe) ===== */
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
const revealEls = [...document.querySelectorAll('.reveal, .reveal-mask')];
const counterEls = [...document.querySelectorAll('[data-count]')];
const sections = [...document.querySelectorAll('section[id]')];
const linkMap = {};
document.querySelectorAll('.nav__links a').forEach(a => { linkMap[a.getAttribute('href').slice(1)] = a; });

function animateCounter(el) {
  const target = +el.dataset.count, dur = 1600, start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    el.textContent = target >= 1000 ? val.toLocaleString('vi-VN') : val;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = (target >= 1000 ? target.toLocaleString('vi-VN') : target) + '+';
  })(start);
}

function frameUpdate() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  nav.classList.toggle('scrolled', y > 40);
  const h = document.documentElement.scrollHeight - vh;
  progress.style.width = (h > 0 ? y / h * 100 : 0) + '%';

  // reveal (getBoundingClientRect is unaffected by clip-path)
  for (let i = revealEls.length - 1; i >= 0; i--) {
    if (revealEls[i].getBoundingClientRect().top < vh * 0.86) {
      revealEls[i].classList.add('in');
      revealEls.splice(i, 1);
    }
  }
  // counters
  for (let i = counterEls.length - 1; i >= 0; i--) {
    if (counterEls[i].getBoundingClientRect().top < vh * 0.85) {
      animateCounter(counterEls[i]);
      counterEls.splice(i, 1);
    }
  }
  // active nav link
  let current = null;
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top <= vh * 0.5 && r.bottom >= vh * 0.5) { current = s.id; break; }
  }
  Object.entries(linkMap).forEach(([id, a]) => {
    if (!a.classList.contains('nav__cta'))
      a.style.color = (id === current) ? 'var(--cream)' : '';
  });
}

if (!canSmooth) window.addEventListener('scroll', frameUpdate, { passive: true });
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
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ===== MAGNETIC BUTTONS (desktop) ===== */
if (canSmooth) {
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const strength = 0.35;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px,${y}px)`;
      const inner = el.querySelector('span');
      if (inner) inner.style.transform = `translate(${x * 0.3}px,${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      const inner = el.querySelector('span');
      if (inner) inner.style.transform = '';
    });
  });
}

/* ===== HERO: play once, freeze, dissolve into artwork ===== */
(function () {
  const hv = document.getElementById('heroVideo');
  const art = document.getElementById('heroArt');
  if (!hv || !art) return;
  hv.loop = false;
  const toArt = () => art.classList.add('show');
  hv.addEventListener('ended', toArt);
  // safety: if the video can't autoplay/decode, still reveal artwork
  hv.play && hv.play().catch(() => setTimeout(toArt, 1500));
})();

/* ===== LAZY-PLAY CANDLE VIDEO ===== */
const fv = document.getElementById('featureVideo');
if (fv) {
  const vio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { fv.play().catch(() => {}); }
      else fv.pause();
    });
  }, { threshold: 0.2 });
  vio.observe(fv);
}

/* ===== RESERVE FORM ===== */
const form = document.getElementById('reserveForm');
const ok = document.getElementById('formOk');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !phone) {
    form.querySelectorAll('[required]').forEach(f => {
      if (!f.value) { f.style.borderColor = '#c0553c'; setTimeout(() => f.style.borderColor = '', 1500); }
    });
    return;
  }
  ok.classList.add('show');
  form.querySelector('button span').textContent = '✓ Đã Gửi';
  setTimeout(() => {
    form.reset();
    ok.classList.remove('show');
    form.querySelector('button span').textContent = 'Gửi Yêu Cầu Đặt Bàn';
  }, 4500);
});
const dateEl = document.getElementById('date');
if (dateEl) dateEl.min = new Date().toISOString().split('T')[0];
