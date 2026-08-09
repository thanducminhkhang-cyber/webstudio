# TỊNH — Landing page nhà hàng fine-dining Việt

Landing page 1 trang cho nhà hàng thực đơn nếm (tasting menu) theo mùa. Next.js 16
(App Router) + TypeScript + Tailwind v4. Không dùng thư viện UI dùng chung — bản sắc
thị giác riêng, lấy cảm hứng **sơn mài** (lacquer) với **khảm vỏ trứng** làm signature.

## Chạy

Từ thư mục gốc monorepo `WebStudio`:

```bash
corepack pnpm install
corepack pnpm --filter tinh dev
```

Mở http://localhost:3000 (hoặc PORT bạn đặt).

Build: `corepack pnpm --filter tinh build`

## Kiến trúc

- `app/globals.css` — 6 token màu sơn mài (`--lacquer`, `--brass`, `--son`, `--eggshell`…),
  `--radius: 0`, style form/nút/placeholder. Chỉ dùng đúng 6 màu này.
- `app/layout.tsx` — font `Cormorant` (wordmark/heading) + `Be Vietnam Pro` (body),
  đều kèm subset `vietnamese`.
- `app/parts.tsx` — `EggshellInlay` (signature khảm vỏ trứng, SVG pattern),
  `Reveal` (scroll reveal, tôn trọng `prefers-reduced-motion`), `Photo` (placeholder ảnh).
- `app/page.tsx` — 7 section: Hero · Triết lý · Thực đơn nếm (I–VII) · Không gian ·
  Bếp trưởng · Đặt bàn · Footer.

## Cần thay (đều là PLACEHOLDER)

| Chỗ | Hiện tại | Thay bằng |
|-----|----------|-----------|
| Tên món / nguyên liệu | `COURSES` trong `app/page.tsx` | Thực đơn thật |
| Giá | `[Giá thực đơn]` | Giá/khách thật |
| Bếp trưởng | `[Tên bếp trưởng]`, `[Tên]` + 3 câu | Tên & tiểu sử thật |
| Địa chỉ / SĐT | `[Số nhà…]`, `[Số điện thoại]` (footer + form) | Thông tin thật |
| Thành phố | "Hà Nội" | Thành phố thật |
| Mạng xã hội / bản đồ | `href="#"` | Link thật |
| Ảnh | `<Photo>` (màu solid, có `alt` tiếng Việt) | `next/image` ảnh thật, `loading="lazy"` |

## Nối API đặt bàn

Form validate client-side + hiện toast "Đã ghi nhận" (giả lập). Chỗ nối API thật đã
đánh dấu `// TODO` trong `handleSubmit` (`app/page.tsx`).
