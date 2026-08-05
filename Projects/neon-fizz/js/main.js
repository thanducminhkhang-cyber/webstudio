/* ==========================================================================
   NEON FIZZ — CLEAN UNIFORM ROUNDED MAIN JAVASCRIPT
   ========================================================================== */

// Category Slug -> Accented Vietnamese Label Mapper
const CATEGORY_LABEL_MAP = {
  'tra-trai-cay': 'TRÀ TRÁI CÂY',
  'tra-sua': 'TRÀ SỮA',
  'ca-phe': 'CÀ PHÊ',
  'nuoc-ep-sinh-to': 'NƯỚC ÉP & SINH TỐ'
};

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
    if (window.scrollY > 30) {
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
/* 3. Subtle Warm Particle Canvas                                             */
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
  const colors = ['rgba(217, 113, 60, ', 'rgba(122, 139, 92, '];

  for (let i = 0; i < 5; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.5,
      color: colors[i % 2],
      alpha: Math.random() * 0.3 + 0.15,
      speedY: Math.random() * 0.25 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2
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
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;

    heroDrink.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroDrink.style.transform = `translate3d(0, 0, 0)`;
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Render Product Grid with Clean Uniform Rounded Cards                     */
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
      const categoryName = CATEGORY_LABEL_MAP[p.category] || p.category.toUpperCase();

      const badgeHTML = p.badge ? `
        <span class="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full ${p.badge === 'Mới' ? 'bg-[#7A8B5C] text-white' : 'bg-[#D9713C] text-white'} shadow-sm">
          ${p.badge}
        </span>
      ` : '';

      return `
        <div class="product-card group bg-white rounded-2xl p-4 flex flex-col justify-between border border-[#E8DCC8] warm-shadow-hover">
          <div>
            <!-- Image Container with Clean Rounded Corner Crop -->
            <div class="relative overflow-hidden mb-4 bg-[#F5EBDD] aspect-square flex items-center justify-center rounded-xl">
              <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              ${badgeHTML}
              <button onclick="openQuickView('${p.id}')" class="absolute bottom-3 right-3 bg-white/90 hover:bg-[#D9713C] text-[#3D2B1F] hover:text-white p-2.5 rounded-full shadow-md backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100" title="Xem nhanh">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Title & Accented Category Tag -->
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-xs text-[#8B7355] flex items-center gap-1">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-[#D9713C] text-[#D9713C]"></i>
                <strong class="text-[#3D2B1F]">${p.rating}</strong> (${p.reviews})
              </span>
              <span class="text-[10px] font-bold tracking-wider text-[#8B7355] uppercase">${categoryName}</span>
            </div>
            
            <h3 class="font-display font-bold text-base text-[#3D2B1F] mb-1.5 group-hover:text-[#D9713C] transition-colors leading-snug">${p.name}</h3>
            <p class="text-xs text-[#8B7355] line-clamp-2 mb-4">${p.desc}</p>
          </div>

          <!-- Price & Add Button -->
          <div class="pt-3 border-t border-[#E8DCC8] flex items-center justify-between">
            <div>
              <span class="font-display font-extrabold text-base text-[#D9713C]">${formatVND(p.price)}</span>
              <span class="text-xs text-[#8B7355] line-through ml-1.5">${formatVND(p.originalPrice)}</span>
            </div>
            <button onclick="window.cartManager.addItem('${p.id}', this)" class="bg-[#D9713C] hover:bg-[#C25B28] text-white p-2.5 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95 hover:scale-105" title="Thêm vào giỏ">
              <i data-lucide="plus" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.style.opacity = '1';

    if (window.lucide) {
      lucide.createIcons();
    }
  }, 180);
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
        const duration = 1800;
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
  }, { threshold: 0.4 });

  statsElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 7. Testimonials Slider (Multi-card Grid on Desktop)                        */
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
    if (cards.length === 0) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
  };

  nextBtn.addEventListener('click', () => {
    const visibleCount = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const maxIndex = Math.max(0, total - visibleCount);
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    const visibleCount = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const maxIndex = Math.max(0, total - visibleCount);
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSlide();
  });

  window.addEventListener('resize', updateSlide);
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
      showToast('Vui lòng nhập email hợp lệ!', 'pink');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Đang gửi...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `ĐÃ ĐĂNG KÝ! 🎉`;
      input.value = '';
      showToast('Đăng ký thành công! Nhận mã NEON30 giảm 30%.', 'mint');
      triggerConfetti();

      setTimeout(() => {
        submitBtn.innerHTML = `Nhận ưu đãi`;
      }, 4000);
    }, 1000);
  });
}

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#D9713C', '#7A8B5C', '#E8DCC8', '#FFFFFF'];

  for (let i = 0; i < 80; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360
    });
  }

  let frames = 0;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 4;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 160) {
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
/* 10. Checkout Modal Logic                                                   */
/* -------------------------------------------------------------------------- */
function initCheckoutModalLogic() {
  window.openCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    const summaryContainer = document.getElementById('checkout-order-summary');
    const items = window.cartManager.items;
    
    if (summaryContainer) {
      summaryContainer.innerHTML = items.map(item => `
        <div class="flex justify-between text-xs py-1.5 border-b border-[#E8DCC8]">
          <span class="text-[#3D2B1F] font-medium">${item.name} x${item.qty}</span>
          <span class="text-[#D9713C] font-semibold">${formatVND(item.price * item.qty)}</span>
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
      submitBtn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Đang xử lý...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `ĐẶT HÀNG THÀNH CÔNG! 🎉`;

        showToast('Đặt hàng thành công! Neon Fizz sẽ liên hệ xác nhận trong 5 phút.', 'mint');
        window.cartManager.clear();
        triggerConfetti();

        setTimeout(() => {
          closeCheckoutModal();
          document.getElementById('cart-drawer')?.classList.add('translate-x-full');
          document.getElementById('cart-overlay')?.classList.add('hidden');
          submitBtn.innerHTML = `XÁC NHẬN ĐẶT HÀNG`;
        }, 1800);
      }, 1200);
    });
  }
}
