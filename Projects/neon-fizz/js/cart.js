/* ==========================================================================
   NEON FIZZ — FRESH NEON CART LOGIC
   ========================================================================== */

// --- Products Data (Minimal clean badges: "Bán chạy" & "Mới") ---
const PRODUCTS_DATA = [
  {
    id: 'p1',
    name: 'Pink Velvet Dragon Tea',
    category: 'tra-trai-cay',
    price: 49000,
    originalPrice: 59000,
    rating: 4.9,
    reviews: 128,
    badge: 'Bán chạy', // Only 2-3 featured items have badges
    desc: 'Trà ô long thanh mát kết hợp dừa nướng, thanh long đỏ tươi & thạch dừa giòn.',
    img: 'assets/images/cat_fruit_tea.jpg'
  },
  {
    id: 'p2',
    name: 'Electric Cyan Galaxy Soda',
    category: 'soda',
    price: 45000,
    originalPrice: 52000,
    rating: 5.0,
    reviews: 94,
    badge: 'Mới',
    desc: 'Soda hoa đậu biếc chanh tươi, hạt popping kiwi nổ bùng sảng khoái.',
    img: 'assets/images/cat_neon_soda.jpg'
  },
  {
    id: 'p3',
    name: 'Tiger Brown Sugar Boba',
    category: 'tra-sua',
    price: 55000,
    originalPrice: 65000,
    rating: 4.8,
    reviews: 210,
    badge: 'Bán chạy',
    desc: 'Sữa tươi Dalat Milk ngậy béo hòa quyện đường đen Okinawa & trân châu dẻo.',
    img: 'assets/images/cat_boba_milk.jpg'
  },
  {
    id: 'p4',
    name: 'Lime Glow Matcha Cloud',
    category: 'tra-sua',
    price: 52000,
    originalPrice: 60000,
    rating: 4.7,
    reviews: 86,
    badge: null, // No badge
    desc: 'Matcha Uji Nhật Bản đậm đà phủ lớp macchiato kem phô mai ngậy thanh.',
    img: 'assets/images/cat_fresh_juice.jpg'
  },
  {
    id: 'p5',
    name: 'Midnight Berry Fizz',
    category: 'soda',
    price: 48000,
    originalPrice: 55000,
    rating: 4.9,
    reviews: 154,
    badge: null,
    desc: 'Sữa chua lên men mát lạnh hòa cùng việt quất tươi & soda sảng khoái.',
    img: 'assets/images/cat_neon_soda.jpg'
  },
  {
    id: 'p6',
    name: 'Solar Citrus Passion Juice',
    category: 'nuoc-ep',
    price: 42000,
    originalPrice: 50000,
    rating: 4.8,
    reviews: 73,
    badge: null,
    desc: 'Nước ép cam vàng, chanh dây & xoài chín tươi 100% nguyên chất tự nhiên.',
    img: 'assets/images/cat_fresh_juice.jpg'
  },
  {
    id: 'p7',
    name: 'Cyber Mango Coconut Shake',
    category: 'nuoc-ep',
    price: 55000,
    originalPrice: 62000,
    rating: 4.9,
    reviews: 112,
    badge: null,
    desc: 'Sinh tố xoài Cát Chu dầm cốt dừa nướng Bến Tre thơm béo cuốn vị.',
    img: 'assets/images/hero_drink.jpg'
  },
  {
    id: 'p8',
    name: 'Acid Lemon Sparkling Tea',
    category: 'tra-trai-cay',
    price: 39000,
    originalPrice: 45000,
    rating: 4.6,
    reviews: 67,
    badge: null,
    desc: 'Trà nhài ướp lạnh lắc chanh vàng ngâm mật ong và đá tuyết giải nhiệt.',
    img: 'assets/images/cat_fruit_tea.jpg'
  }
];

// --- Cart Manager ---
class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('neon_fizz_cart')) || [
      { id: 'p1', name: 'Pink Velvet Dragon Tea', price: 49000, qty: 2, img: 'assets/images/cat_fruit_tea.jpg' }
    ];
    this.appliedDiscount = 0;
    this.promoCode = '';
    this.initUI();
  }

  initUI() {
    this.updateCartBadge();
    this.renderCartItems();
    this.setupEventListeners();
  }

  save() {
    localStorage.setItem('neon_fizz_cart', JSON.stringify(this.items));
    this.updateCartBadge();
    this.renderCartItems();
  }

  addItem(id, triggerElement = null) {
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (!product) return;

    const existing = this.items.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        img: product.img
      });
    }

    this.save();

    if (triggerElement) {
      this.animateFlyToCart(triggerElement, product.img);
    } else {
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'mint');
    }
  }

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeItem(id);
        return;
      }
      this.save();
    }
  }

  removeItem(id) {
    const item = this.items.find(i => i.id === id);
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    if (item) {
      showToast(`Đã xóa "${item.name}" khỏi giỏ hàng`, 'pink');
    }
  }

  clear() {
    this.items = [];
    this.appliedDiscount = 0;
    this.promoCode = '';
    this.save();
  }

  getTotalItems() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  }

  getFinalTotal() {
    const subtotal = this.getSubtotal();
    return Math.round(subtotal * (1 - this.appliedDiscount));
  }

  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const total = this.getTotalItems();
    badges.forEach(b => {
      b.textContent = total;
      if (total > 0) {
        b.classList.remove('hidden');
        b.classList.add('bounce-badge');
        setTimeout(() => b.classList.remove('bounce-badge'), 400);
      } else {
        b.classList.add('hidden');
      }
    });
  }

  renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const footer = document.getElementById('cart-footer-summary');

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (footer) footer.classList.add('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (footer) footer.classList.remove('hidden');

    container.innerHTML = this.items.map(item => `
      <div class="flex items-center gap-4 p-3 rounded-2xl bg-[#F5F5F3] border border-[#E5E5E5] hover:border-[#00D9A3] transition-all">
        <img src="${item.img}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover border border-[#E5E5E5]" />
        <div class="flex-1 min-w-0">
          <h4 class="font-display font-semibold text-[#1A1A1F] text-sm truncate">${item.name}</h4>
          <p class="text-[#00D9A3] font-bold text-sm mt-0.5">${formatVND(item.price)}</p>
          <div class="flex items-center gap-2 mt-1.5">
            <button onclick="cartManager.updateQty('${item.id}', -1)" class="w-6 h-6 rounded-lg bg-white border border-[#E5E5E5] text-[#1A1A1F] flex items-center justify-center hover:bg-[#FF3E8E] hover:text-white transition-colors text-xs font-bold">-</button>
            <span class="text-xs font-bold text-[#1A1A1F] px-1">${item.qty}</span>
            <button onclick="cartManager.updateQty('${item.id}', 1)" class="w-6 h-6 rounded-lg bg-white border border-[#E5E5E5] text-[#1A1A1F] flex items-center justify-center hover:bg-[#00D9A3] hover:text-white transition-colors text-xs font-bold">+</button>
          </div>
        </div>
        <button onclick="cartManager.removeItem('${item.id}')" class="text-[#6B6B75] hover:text-[#FF3E8E] p-1 transition-colors" title="Xóa">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');

    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountEl = document.getElementById('cart-discount-val');
    const totalEl = document.getElementById('cart-total-val');

    if (subtotalEl) subtotalEl.textContent = formatVND(this.getSubtotal());
    if (discountEl) {
      if (this.appliedDiscount > 0) {
        discountEl.parentElement.classList.remove('hidden');
        discountEl.textContent = `-${formatVND(this.getSubtotal() * this.appliedDiscount)}`;
      } else {
        discountEl.parentElement.classList.add('hidden');
      }
    }
    if (totalEl) totalEl.textContent = formatVND(this.getFinalTotal());

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  applyPromoCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NEON30' || cleanCode === 'GENZ30') {
      this.appliedDiscount = 0.3;
      this.promoCode = cleanCode;
      this.save();
      showToast('Áp dụng mã giảm giá 30% thành công! 🎉', 'mint');
      return true;
    } else {
      showToast('Mã giảm giá không hợp lệ!', 'pink');
      return false;
    }
  }

  animateFlyToCart(triggerBtn, imageSrc) {
    const cartIcon = document.getElementById('cart-btn-trigger');
    if (!cartIcon || !triggerBtn) {
      showToast('Đã thêm sản phẩm vào giỏ hàng!', 'mint');
      return;
    }

    const btnRect = triggerBtn.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const imgClone = document.createElement('img');
    imgClone.src = imageSrc;
    imgClone.className = 'flying-product-thumbnail';
    imgClone.style.left = `${btnRect.left + btnRect.width / 2 - 27}px`;
    imgClone.style.top = `${btnRect.top + btnRect.height / 2 - 27}px`;

    document.body.appendChild(imgClone);

    const targetX = cartRect.left + cartRect.width / 2 - 27;
    const targetY = cartRect.top + cartRect.height / 2 - 27;

    imgClone.animate([
      { transform: 'scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${(targetX - (btnRect.left + btnRect.width/2 - 27)) * 0.5}px, ${(targetY - (btnRect.top + btnRect.height/2 - 27)) - 60}px) scale(1.1) rotate(180deg)`, opacity: 0.9 },
      { transform: `translate(${targetX - (btnRect.left + btnRect.width/2 - 27)}px, ${targetY - (btnRect.top + btnRect.height/2 - 27)}px) scale(0.2) rotate(360deg)`, opacity: 0 }
    ], {
      duration: 750,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      fill: 'forwards'
    }).onfinish = () => {
      imgClone.remove();
      this.updateCartBadge();
      showToast('Đã thêm vào giỏ hàng! 🍹', 'mint');
    };
  }

  setupEventListeners() {
    const promoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('cart-promo-input');

    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        if (promoInput.value) {
          this.applyPromoCode(promoInput.value);
        }
      });
    }

    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) {
          showToast('Giỏ hàng của bạn đang trống!', 'pink');
          return;
        }
        openCheckoutModal();
      });
    }
  }
}

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function showToast(message, color = 'mint') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const dotColor = color === 'pink' ? '#FF3E8E' : '#00D9A3';
  
  toast.className = 'toast';
  toast.style.borderColor = color === 'pink' ? '#FF3E8E' : '#00D9A3';
  toast.innerHTML = `
    <div class="w-2.5 h-2.5 rounded-full" style="background-color: ${dotColor}"></div>
    <span class="text-xs font-semibold text-[#1A1A1F]">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2800);
}

const cartManager = new CartManager();
window.cartManager = cartManager;
window.showToast = showToast;
window.formatVND = formatVND;
