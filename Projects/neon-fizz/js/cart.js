/* ==========================================================================
   NEON FIZZ — FRESH NEON CART LOGIC & PRODUCTS DATA
   ========================================================================== */

// --- Products Data (Vietnamese Menu) ---
const PRODUCTS_DATA = [
  {
    id: 'p1',
    name: 'Trà Đào Cam Sả',
    category: 'tra-trai-cay',
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    reviews: 128,
    badge: null,
    desc: 'Trà ô long thanh mát kết hợp đào ngâm, cam tươi và sả thơm dịu.',
    img: 'assets/images/tra-dao-cam-sa.jpg'
  },
  {
    id: 'p2',
    name: 'Trà Vải Hoa Hồng',
    category: 'tra-trai-cay',
    price: 42000,
    originalPrice: 50000,
    rating: 4.8,
    reviews: 94,
    badge: 'Mới',
    desc: 'Trà vải thiều ngọt thanh, thoảng hương hoa hồng nhẹ nhàng, giải nhiệt tức thì.',
    img: 'assets/images/tra-vai-hoa-hong.jpg'
  },
  {
    id: 'p3',
    name: 'Trà Sữa Trân Châu Đường Đen',
    category: 'tra-sua',
    price: 49000,
    originalPrice: 59000,
    rating: 4.9,
    reviews: 210,
    badge: 'Bán chạy',
    desc: 'Trà sữa béo thơm, trân châu đường đen dẻo mềm, phủ lớp caramel đường đen sánh mịn.',
    img: 'assets/images/tra-sua-tran-chau-duong-den.jpg'
  },
  {
    id: 'p4',
    name: 'Trà Sữa Matcha Kem Trứng',
    category: 'tra-sua',
    price: 52000,
    originalPrice: 60000,
    rating: 4.7,
    reviews: 86,
    badge: null,
    desc: 'Matcha Nhật nguyên chất kết hợp lớp kem trứng béo ngậy phủ mặt.',
    img: 'assets/images/tra-sua-matcha-kem-trung.jpg'
  },
  {
    id: 'p5',
    name: 'Cà Phê Sữa Đá',
    category: 'ca-phe',
    price: 29000,
    originalPrice: 35000,
    rating: 4.9,
    reviews: 154,
    badge: null,
    desc: 'Cà phê phin truyền thống pha cùng sữa đặc, đậm đà đúng chuẩn cà phê Việt.',
    img: 'assets/images/ca-phe-sua-da.jpg'
  },
  {
    id: 'p6',
    name: 'Bạc Xỉu Đá',
    category: 'ca-phe',
    price: 32000,
    originalPrice: 38000,
    rating: 4.8,
    reviews: 73,
    badge: null,
    desc: 'Cà phê sữa nhẹ nhàng, nhiều sữa ít cà phê, phù hợp người mới uống cà phê.',
    img: 'assets/images/bac-xiu-da.jpg'
  },
  {
    id: 'p7',
    name: 'Nước Ép Cam Vàng',
    category: 'nuoc-ep-sinh-to',
    price: 39000,
    originalPrice: 45000,
    rating: 4.8,
    reviews: 112,
    badge: null,
    desc: 'Cam vàng ép nguyên chất 100%, giàu vitamin C, không đường thêm.',
    img: 'assets/images/nuoc-ep-cam-vang.jpg'
  },
  {
    id: 'p8',
    name: 'Sinh Tố Xoài Dừa',
    category: 'nuoc-ep-sinh-to',
    price: 45000,
    originalPrice: 52000,
    rating: 4.7,
    reviews: 67,
    badge: null,
    desc: 'Xoài chín mọng xay cùng nước cốt dừa béo thơm, mát lạnh sảng khoái.',
    img: 'assets/images/sinh-to-xoai-dua.jpg'
  }
];

// --- Cart Manager ---
class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('neon_fizz_cart')) || [
      { id: 'p1', name: 'Trà Đào Cam Sả', price: 45000, qty: 2, img: 'assets/images/tra-dao-cam-sa.jpg' }
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
