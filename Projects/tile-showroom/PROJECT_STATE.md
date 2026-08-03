# PROJECT_STATE — tile-showroom

## Meta
- **Project ID:** tile-showroom
- **Work Order:** #004 (CTO v2.0 Luxury Experience Upgrade)
- **Loại:** Showroom / Catalog showcase (gạch men cao cấp & vật liệu nội thất)
- **Trạng thái:** completed
- **Prompt gốc:** CTO REVIEW (v2.0 Luxury Experience)

## Tóm tắt
Đã nâng cấp toàn bộ giao diện thành **AWARD-LEVEL LUXURY EXPERIENCE** (Đỉnh cao trải nghiệm bảo tàng & showroom kiến trúc 60fps):
- **Custom Desktop Circle Cursor**: Con trỏ hình tròn tối giản có hiệu ứng vật lý lò xo (spring physics) qua `framer-motion`, phóng to nhẹ khi hover qua các nút bấm, sản phẩm và ảnh gallery.
- **Top Scroll Progress Indicator**: Thanh 2px Bronze `#9A7B4F` phát sáng nhẹ cố định ở trên cùng màn hình.
- **HeroCinematic Section**:
  - Background ảnh marble khổ lớn có hiệu ứng Ken Burns slow zoom mượt mà.
  - Phản hồi độ sâu parallax theo chuyển động chuột (`mouseMove` 3D translate).
  - Tiêu đề Serif hiển thị từng từ từ (staggered word-by-word reveal).
  - Nút bấm trượt từ dưới lên kèm hiệu ứng hover nảy mượt.
  - Scroll down indicator có animation lên xuống liên tục.
- **HeaderGlass (Glassmorphic Navigation)**:
  - Tự động chuyển đổi từ nền trong suốt ở đầu trang sang nền mờ ngọc bích `backdrop-blur-md` khi cuộn trang.
  - Thu nhỏ logo mượt mà khi cuộn.
- **LuxuryProductCard (GPU-Accelerated 60fps)**:
  - Hover zoom ảnh mượt 1.05x.
  - Tiêu đề nâng nhẹ 4px (`translate-y-[-4px]`).
  - Đường viền và bóng phát sáng nhẹ màu Bronze `#9A7B4F`.
- **Cinematic Gallery & Lightbox**:
  - Hiệu ứng xuất hiện từng mảng ảnh không gian kiến trúc.
  - Lightbox modal xem ảnh 4K phóng to có phím tắt hỗ trợ.

## Phạm vi
**Trong phạm vi:** UI catalog + admin, Framer Motion animations 60fps, custom cursor, scroll progress bar, responsive, 0 lỗi TypeScript.
**Ngoài phạm vi:** Backend thật, database thật, giỏ hàng, thanh toán online.

## Nhật ký giai đoạn
| 2026-08-03 | CTO v2.0 Upgrade | Tích hợp Framer Motion, custom cursor, Ken Burns hero, 60fps card hover |
| 2026-08-03 | QA & Build | Static build 12/12 pages sạch, tsc 0 lỗi, git commit `feat: upgrade tile-showroom to v2.0 award-level luxury experience` |

## Hành động kế tiếp
Trọn bộ 5 website portfolio trong hệ sinh thái WSOS Studio đã đạt đẳng cấp Awwwards/CSS Design Awards. Sẵn sàng đăng Facebook quảng bá studio!
