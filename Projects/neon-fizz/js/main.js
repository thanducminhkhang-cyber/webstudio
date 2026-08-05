/* ==========================================================================
   NEON FIZZ — MAIN JAVASCRIPT & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initParticleCanvas();
  initHeroParallax();
  renderProductsGrid('all');
  initCategoryTabs();
  initStatsCounter();
  initTestimonialsSlider();
  initNewsletterForm();
  initCheckoutModalLogic();
  initQuickViewModal();

  // Re-initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* -------------------------------------------------------------------------- */
/* 1. Navbar Scroll Effect                                                    */
/* -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Drawer Navigation                                               */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menuOverlay) return;

  const openMenu = () => {
    menuOverlay.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menuOverlay.classList.add('translate-x-full');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* -------------------------------------------------------------------------- */
/* 3. Hero Rising Neon Particle Canvas                                        */
/* -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const particles = [];
  const colors = ['rgba(255, 46, 147, ', 'rgba(0, 240, 255, ', 'rgba(212, 255, 0, '];

  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------------- */
/* 4. Mouse Parallax for Hero Drink                                           */
/* -------------------------------------------------------------------------- */
function initHeroParallax() {
  const heroSection = document.getElementById('hero-section');
  const heroDrink = document.getElementById('hero-floating-drink');

  if (!heroSection || !heroDrink) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;

    heroDrink.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${x * 0.3}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroDrink.style.transform = `translate3d(0, 0, 0) rotate(0deg)`;
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Render Product Grid & Filter Logic                                       */
/* -------------------------------------------------------------------------- */
function renderProductsGrid(categoryFilter = 'all') {
  const container = document.getElementById('products-grid-container');
  if (!container) return;

  const filtered = categoryFilter === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === categoryFilter);

  container.style.opacity = '0';

  setTimeout(() => {
    container.innerHTML = filtered.map(p => {
      const tagBg = p.tagColor === 'cyan' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/40'
        : p.tagColor === 'yellow' ? 'bg-[#D4FF00]/20 text-[#D4FF00] border-[#D4FF00]/40'
        : 'bg-[#FF2E93]/20 text-[#FF2E93] border-[#FF2E93]/40';

      return `
        <div class="product-card group glass-panel rounded-3xl p-4 flex flex-col justify-between hover-glow-${p.tagColor} transition-all duration-300 transform hover:-translate-y-2">
          <div>
            <!-- Image & Badge Container -->
            <div class="relative overflow-hidden rounded-2xl mb-4 bg-[#12121A]">
              <img src="${p.img}" alt="${p.name}" class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <span class="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${tagBg}">
                ${p.tag}
              </span>
              <button onclick="openQuickView('${p.id}')" class="absolute bottom-3 right-3 bg-black/60 hover:bg-[#FF2E93] text-white p-2.5 rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100" title="Xem nhanh">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Title & Rating -->
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs text-[#9A9AB0] flex items-center gap-1">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-[#D4FF00] text-[#D4FF00]"></i>
                <strong class="text-white">${p.rating}</strong> (${p.reviews})
              </span>
              <span class="text-[10px] uppercase font-bold tracking-wider text-[#9A9AB0]">${p.category.replace('-', ' ')}</span>
            </div>
            
            <h3 class="font-display font-bold text-lg text-white mb-2 group-hover:text-[#00F0FF] transition-colors leading-snug">${p.name}</h3>
            <p class="text-xs text-[#9A9AB0] line-clamp-2 mb-4">${p.desc}</p>
          </div>

          <!-- Price & Add Button -->
          <div class="pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span class="font-display font-extrabold text-lg text-[#00F0FF]">${formatVND(p.price)}</span>
              <span class="text-xs text-[#9A9AB0] line-through ml-1.5">${formatVND(p.originalPrice)}</span>
            </div>
            <button onclick="window.cartManager.addItem('${p.id}', this)" class="bg-[#FF2E93] hover:bg-[#00F0FF] hover:text-black text-white p-3 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-[#00F0FF]/30 active:scale-95" title="Thêm vào giỏ">
              <i data-lucide="plus" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.style.opacity = '1';

    if (window.lucide) {
      lucide.createIcons();
    }
  }, 200);
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderProductsGrid(cat);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Stats Counter Animation                                                */
/* -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.counter-val');
  if (statsElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = `${prefix}${Number.isInteger(target) ? target.toLocaleString('en-US') : target.toFixed(1)}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${prefix}${Number.isInteger(target) ? Math.floor(start).toLocaleString('en-US') : start.toFixed(1)}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 7. Testimonials Slider                                                    */
/* -------------------------------------------------------------------------- */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.children;
  const total = cards.length;

  const updateSlide = () => {
    const width = cards[0].offsetWidth + 24; // width + gap
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  };

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateSlide();
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    updateSlide();
  }, 5000);
}

/* -------------------------------------------------------------------------- */
/* 8. Newsletter Form & Confetti FX                                           */
/* -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!input || !input.value.trim()) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ!', 'pink');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Đang gửi...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `ĐÃ ĐĂNG KÝ! 🎉`;
      input.value = '';
      showToast('Đăng ký thành công! Bạn nhận được mã ưu đãi NEON30 giảm 30%.', 'lime');
      triggerConfetti();

      setTimeout(() => {
        submitBtn.innerHTML = `Đăng ký ngay`;
      }, 4000);
    }, 1200);
  });
}

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#FF2E93', '#00F0FF', '#D4FF00', '#FFFFFF'];

  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360
    });
  }

  let frames = 0;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 5;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 180) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  render();
}

/* -------------------------------------------------------------------------- */
/* 9. Quick View Modal                                                        */
/* -------------------------------------------------------------------------- */
function initQuickViewModal() {
  window.openQuickView = (id) => {
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('quickview-modal');
    if (!modal) return;

    document.getElementById('qv-img').src = product.img;
    document.getElementById('qv-name').textContent = product.name;
    document.getElementById('qv-desc').textContent = product.desc;
    document.getElementById('qv-price').textContent = formatVND(product.price);
    document.getElementById('qv-[#00F0FF]')?.classList.remove('hidden');

    const addBtn = document.getElementById('qv-add-btn');
    addBtn.onclick = (e) => {
      window.cartManager.addItem(product.id, e.target);
      closeQuickView();
    };

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuickView = () => {
    const modal = document.getElementById('quickview-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  };
}

/* -------------------------------------------------------------------------- */
/* 10. Checkout Form Modal Logic                                              */
/* -------------------------------------------------------------------------- */
function initCheckoutModalLogic() {
  window.openCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    // Populate order items summary inside checkout modal
    const summaryContainer = document.getElementById('checkout-order-summary');
    const items = window.cartManager.items;
    
    if (summaryContainer) {
      summaryContainer.innerHTML = items.map(item => `
        <div class="flex justify-between text-xs py-1 border-b border-white/5">
          <span class="text-white">${item.name} x${item.qty}</span>
          <span class="text-[#00F0FF] font-semibold">${formatVND(item.price * item.qty)}</span>
        </div>
      `).join('');
    }

    const checkoutTotal = document.getElementById('checkout-total-val');
    if (checkoutTotal) {
      checkoutTotal.textContent = formatVND(window.cartManager.getFinalTotal());
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('checkout-submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Đang xử lý đơn hàng...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `ĐẶT HÀNG THÀNH CÔNG! 🎉`;

        showToast('Đặt hàng thành công! Nhân viên Neon Fizz sẽ gọi xác nhận trong 5 phút.', 'lime');
        window.cartManager.clear();
        triggerConfetti();

        setTimeout(() => {
          closeCheckoutModal();
          // Close cart drawer if open
          document.getElementById('cart-drawer')?.classList.add('translate-x-full');
          document.getElementById('cart-overlay')?.classList.add('hidden');
          submitBtn.innerHTML = `XÁC NHẬN ĐẶT HÀNG`;
        }, 2000);
      }, 1500);
    });
  }
}
