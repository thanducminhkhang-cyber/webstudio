# 🍹 NEON FIZZ — Website Bán Đồ Uống Gen Z (Cyberpunk / Neon Vibe)

Website giới thiệu và đặt mua đồ uống online (Trà trái cây, Trà sữa, Soda Galaxy, Nước ép) với phong cách thiết kế **Neon Fizz** rực rỡ, tối tân hướng tới khách hàng trẻ Gen Z (16–28 tuổi).

---

## 🌟 Tính Năng Nổi Bật

1. **Giao diện Cyberpunk Neon Trendsetter**:
   - Nền tối profund Navy (`#0A0A0F`), kết hợp dải màu Neon Pink (`#FF2E93`), Neon Cyan (`#00F0FF`) & Neon Lime (`#D4FF00`).
   - Hiệu ứng **Glassmorphism**, viền phát sáng (Neon Glow) và gradient sắc nét.
   - Font chữ tiêu đề uốn lượn phong cách **Space Grotesk** kết hợp font **Inter** hiện đại.

2. **Hiệu ứng Animation & Micro-Interactions**:
   - **Particle Canvas**: Các hạt bong bóng neon tự do bay trên nền Hero.
   - **Parallax 3D & Keyframe Float**: Ly nước Hero floating xoay chuyển theo con trỏ chuột.
   - **Fly-to-Cart Animation**: Khi bấm `+` thêm sản phẩm, hình ảnh thu nhỏ sản phẩm nảy lên và bay vòng cung vào icon giỏ hàng trên Header.
   - **Confetti Animation**: Hiệu ứng bắn pháo hoa giấy khi đăng ký nhận voucher hoặc xác nhận đặt hàng thành công.
   - **Counter Stats**: Số liệu tự động đếm tăng khi cuộn trang tới section "Vì sao chọn chúng tôi".

3. **Giỏ Hàng & Thanh Toán (Local Persistence)**:
   - **Slide-out Cart Drawer**: Thanh giỏ hàng trượt mượt từ lề phải.
   - Lưu trữ tự động với `localStorage` (không mất giỏ hàng khi reload).
   - Mã giảm giá thông minh: Nhập `NEON30` để giảm ngay 30% tổng đơn hàng.
   - Checkout Modal thu thập thông tin giao hàng & phương thức thanh toán (COD/MoMo/VietQR) với phản hồi Toast notification chuyên nghiệp.

4. **Responsive & SEO Optimal**:
   - Tương thích tối đa trên Mobile (<640px), Tablet (640px-1024px) và Desktop (>1024px).
   - Thẻ Meta Open Graph (OG tags) chuẩn SEO cho việc chia sẻ mạng xã hội (TikTok, Facebook, Insta).

---

## 📁 Cấu Trúc Thư Mục

```text
c:/WSOS STUDIO/
├── index.html              # Trang chính Semantic HTML5 & CDN setup
├── css/
│   └── style.css           # Design Tokens, Custom Neon Utilities & Keyframe Animations
├── js/
│   ├── main.js             # Particle Canvas, Hero Parallax, Category Filters, Counter Stats, Confetti FX
│   └── cart.js             # Cart logic, Fly-to-Cart animation, LocalStorage & Checkout Modal
├── assets/
│   ├── images/             # Bộ ảnh sản phẩm render 3D High Quality Neon Cyberpunk
│   └── icons/              # Icon assets & Favicon
└── README.md               # Hướng dẫn chi tiết dự án
```

---

## 🚀 Hướng Dẫn Chạy Local

Website được xây dựng theo chuẩn **Vanilla Web Stack**, có thể chạy trực tiếp mà không cần build tool phức tạp:

### Cách 1: Mở trực tiếp file HTML
- Double-click vào file `index.html` hoặc kéo thả file `index.html` vào trình duyệt web bất kỳ (Chrome, Edge, Safari, Firefox).

### Cách 2: Chạy qua Local Server (Khuyên dùng)
Nếu sử dụng VS Code:
1. Mở thư mục dự án trong VS Code.
2. Cài đặt extension **Live Server**.
3. Bấm nút `Go Live` ở góc dưới cùng bên phải để mở trang web tại `http://127.0.0.1:5500`.

Hoặc dùng Python:
```bash
python -m http.server 8000
```
Sau đó truy cập `http://localhost:8000` trên trình duyệt.

---

## 🖼️ Hướng Dẫn Thay Đổi Ảnh & Nội Dung Sản Phẩm

### 1. Thay đổi danh sách sản phẩm & giá tiền:
Mở file `js/cart.js`, tìm đến mảng `PRODUCTS_DATA`:
```javascript
const PRODUCTS_DATA = [
  {
    id: 'p1',
    name: 'Tên Sản Phẩm Mới',
    category: 'tra-trai-cay', // Các danh mục: 'tra-trai-cay', 'tra-sua', 'soda', 'nuoc-ep'
    price: 49000,
    originalPrice: 59000,
    rating: 4.9,
    reviews: 128,
    tag: 'BEST SELLER',
    tagColor: 'pink', // Options: 'pink', 'cyan', 'yellow', 'lime'
    desc: 'Mô tả nguyên liệu sản phẩm...',
    img: 'assets/images/anh_san_pham_moi.jpg'
  },
  ...
];
```

### 2. Thay đổi đường dẫn hình ảnh:
- Đặt ảnh mới của bạn vào thư mục `assets/images/`.
- Cập nhật đường dẫn file trong `PRODUCTS_DATA` (file `js/cart.js`) hoặc các thẻ `<img>` trong `index.html`.

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5 & CSS3** (Vanilla CSS Variables & Neon Utilities)
- **Tailwind CSS CDN** (Styling rapid & responsive system)
- **Vanilla JS (ES6+)**
- **Lucide Icons CDN** (Sắc nét & hiện đại)
- **GSAP CDN** (Smooth micro-interactions & animations)
