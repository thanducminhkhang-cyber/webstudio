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
  window.addEventListener('load', () => {
    setTimeout(() => pre && pre.classList.add('done'), 1300);
  });
  // safety fallback
  setTimeout(() => pre && pre.classList.add('done'), 3200);
})();

/* ===== NAV: scroll state + progress ===== */
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (y / h * 100) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

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

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const el = e.target;
      const delay = el.dataset.delay || (i % 4) * 90;
      setTimeout(() => el.classList.add('in'), delay);
      io.unobserve(el);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== COUNTERS ===== */
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1600; const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let val = Math.floor(eased * target);
      el.textContent = target >= 1000 ? val.toLocaleString('vi-VN') : val;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (target >= 1000 ? target.toLocaleString('vi-VN') : target) + '+';
    }
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => cio.observe(c));

/* ===== PARALLAX ===== */
const parallaxEls = document.querySelectorAll('[data-parallax]');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    parallaxEls.forEach(el => {
      const rect = el.parentElement.getBoundingClientRect();
      const speed = 0.16;
      const offset = (rect.top - window.innerHeight / 2) * -speed;
      el.style.transform = `translateY(${offset}px) scale(1.14)`;
    });
    ticking = false;
  });
}, { passive: true });

/* ===== CUSTOM CURSOR ===== */
(function () {
  if (window.matchMedia('(hover:none)').matches) return;
  const cur = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  function loop() {
    cx += (mx - cx) * 0.16; cy += (my - cy) * 0.16;
    cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('[data-hover],a,button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('grow'));
    el.addEventListener('mouseleave', () => cur.classList.remove('grow'));
  });
})();

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
  form.querySelector('button').textContent = '✓ Đã Gửi';
  setTimeout(() => {
    form.reset();
    ok.classList.remove('show');
    form.querySelector('button').textContent = 'Gửi Yêu Cầu Đặt Bàn';
  }, 4500);
});

/* set min date = today */
const dateEl = document.getElementById('date');
if (dateEl) dateEl.min = new Date().toISOString().split('T')[0];

/* ===== ACTIVE NAV LINK ===== */
const sections = [...document.querySelectorAll('section[id]')];
const linkMap = {};
document.querySelectorAll('.nav__links a').forEach(a => {
  const id = a.getAttribute('href').slice(1); linkMap[id] = a;
});
const sio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Object.values(linkMap).forEach(a => a.style.color = '');
      const a = linkMap[e.target.id];
      if (a && !a.classList.contains('nav__cta')) a.style.color = 'var(--cream)';
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => sio.observe(s));
