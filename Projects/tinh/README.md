# Thanh An — Landing page nhà hàng fine-dining Việt

Landing một trang cho nhà hàng thực đơn nếm theo mùa (ẩm thực miền Bắc, Hà Nội).
Ngôn ngữ hình ảnh ground vào **sơn mài Việt**: nền *then* (đen ngả nâu), *son* (đỏ ta),
*kim* (vàng thếp), *cẩn trứng* (vỏ trứng rạn), *con triện* đỏ.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind v4
- **GSAP + ScrollTrigger** (hero load-in, scroll reveal, parallax) + **Lenis** (smooth scroll)
- Font `next/font`: **Fraunces** (display/heading) + **Be Vietnam Pro** (body/UI) — cả hai kèm subset `vietnamese`.

## Chạy
Từ thư mục gốc monorepo `WebStudio`:
```bash
corepack pnpm install
corepack pnpm --filter tinh dev
```
Build: `corepack pnpm --filter tinh build`

## Kiến trúc
- `app/globals.css` — 10 token màu sơn mài, cẩn trứng (nền số La Mã), grain overlay, form custom, hairline, trạng thái ẩn/hiện cho motion.
- `app/layout.tsx` — font, `<noscript>` hiện lại nội dung khi không có JS, grain, `MotionProvider`.
- `app/parts.tsx` — `MotionProvider` (Lenis + GSAP, tôn trọng `prefers-reduced-motion`, có failsafe để nội dung luôn hiện), `Seal` (con triện), `EggNum` (số La Mã trên cẩn trứng), `Figure` (ảnh + parallax).
- `app/page.tsx` — 7 section: Hero · Triết lý · Thực đơn nếm (I–VII) · Không gian · Bếp trưởng · Đặt bàn · Footer.

## Placeholder cần thay (TODO)
| Chỗ | Hiện tại | Thay bằng |
|-----|----------|-----------|
| Ảnh | `IMG` trong `app/page.tsx` (ảnh minh hoạ Unsplash tông tối) | Ảnh thật; nên đặt `/public/images/*` |
| Bếp trưởng | `[Tên bếp trưởng]`, `[Tên]`, `[Chữ ký]` | Tên & tiểu sử & chữ ký thật |
| Giá | `[Giá thực đơn]` | Giá/khách |
| Địa chỉ / SĐT | `[Số nhà…]`, `[Số điện thoại]` | Thông tin thật |
| Mạng xã hội / bản đồ | `href="#"` | Link thật |

## Ghi chú thiết kế
- **Con triện** dùng ký tự **"An"** (Thanh An) thay cho "TỊNH/靜" trong brief gốc — vì tên hiển thị hiện là *Thanh An*, và tránh phải nhúng glyph CJK (dễ tofu).
- Form đặt bàn: validate client-side, thông báo trong-giọng-thương-hiệu; **date** ẩn giao diện `mm/dd/yyyy` mặc định, overlay `dd/mm/yyyy`; **giờ / số khách** là select custom (không lộ `--:--`). Chỗ nối API thật: `// TODO` trong `handleSubmit`.
- Ảnh: dùng ảnh minh hoạ remote qua `next/image` (đã cấu hình `remotePatterns`) vì môi trường không tải được file về `/public`. Đổi sang `/public/images` khi có ảnh thật.
