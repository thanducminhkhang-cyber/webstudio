# 🌸 MAISON FLEUR — Website Bán Hoa Tươi

Cửa hàng hoa tươi online (single-page storefront) xây bằng **Next.js 16 + React 19 + Tailwind v4**, dùng chung thư viện giao diện `@wsos/ui` trong monorepo WebStudio.

## Tính năng

- **Trang chủ**: hero, thanh cuộn ưu đãi (marquee), đồng hồ đếm ngược flash sale, sản phẩm bán chạy, hoa theo dịp (tabs), đánh giá khách hàng, feed Instagram.
- **Cửa hàng**: lọc theo danh mục (Bó hoa · Giỏ & Hộp · Sự kiện · Cây & Hoa chậu), tìm kiếm theo tên.
- **Chi tiết sản phẩm**: gallery ảnh, chọn size/phiên bản, chọn số lượng, thành phần hoa & cách chăm sóc, sản phẩm liên quan.
- **Giỏ hàng** (Sheet trượt): thêm/xóa/đổi số lượng, tính phí ship (freeship từ 500K), thanh toán demo.
- **Wishlist**, tìm kiếm overlay, thông báo toast, responsive & mobile menu.
- 12 sản phẩm mẫu với dữ liệu tiếng Việt.

## Chạy dự án

Từ thư mục gốc của monorepo `WebStudio`:

```bash
corepack pnpm install
corepack pnpm --filter flower-shop dev
```

Mặc định mở tại [http://localhost:3000](http://localhost:3000). Sửa nội dung/sản phẩm tại `app/page.tsx` (mảng `PRODUCTS_DATA`).

## Build

```bash
corepack pnpm --filter flower-shop build
```

## Cấu trúc

- `app/page.tsx` — toàn bộ storefront (client component) + dữ liệu sản phẩm.
- `app/layout.tsx` — metadata, font (Playfair Display + DM Sans), import CSS.
- `app/globals.css` — bảng màu thương hiệu (rose `#C1436D`, blush `#F4C9D7`, leaf `#6B8E5A`).

Giao diện dùng các component (`button`, `card`, `badge`, `tabs`, `sheet`) và block (`blur-fade`, `marquee`, `number-ticker`, `border-beam`, `shimmer-button`) từ `@wsos/ui`.

## Ghi chú

- Ảnh sản phẩm lấy từ Unsplash (đã cấu hình `remotePatterns` trong `next.config.ts`).
- Đây là bản demo — luồng thanh toán/đặt hàng là giả lập phía client, chưa kết nối backend/thanh toán thật.
