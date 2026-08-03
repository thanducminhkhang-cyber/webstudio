# PROJECT_STATE — tile-showroom

## Meta
- **Project ID:** tile-showroom
- **Work Order:** #004
- **Loại:** Showroom / Catalog showcase (gạch men cao cấp & vật liệu nội thất)
- **Trạng thái:** completed
- **Prompt gốc:** PROMPT-12

## Tóm tắt
Website mẫu showroom gạch men cao cấp & đá tấm khổ lớn Big Slab (STONA SLAB). Catalog + showroom trực quan, không giỏ hàng (đúng đặc thù ngành gạch: xem mẫu → liên hệ báo giá m²).
- **DNA Thiết Kế**: **ULTRA GLOSS / INDUSTRIAL SLAB**
  - Main Background: `#F8FAFC` (Cool Crisp Studio Slate)
  - Surface Card: `#FFFFFF` (Pure Studio Glass)
  - Text Main: `#0F172A` (Deep Obsidian)
  - Primary Accent: `#2563EB` (Cobalt Slab / Sapphire Steel)
  - Font: `Sora` (Display 800) + `Inter` (Body)
- **Storefront Pages**: Home (`/`), Collections (`/collections`), Product Detail (`/collections/[slug]`), Projects (`/projects`), About (`/about`).
  - Lightbox gallery xem ảnh texture 4K phóng to.
  - Modal form yêu cầu báo giá m² và đặt lịch hẹn showroom (UI toast).
  - 12+ Mẫu gạch với thông số kỹ thuật (R-rating, xuất xứ Ý/Tây Ban Nha, bề mặt bóng/mờ/nhám). KHÔNG có giá tiền (dùng "Liên hệ báo giá").
  - Ẩn liên kết admin trên header, chỉ có link mờ `Quản trị` 12px sát dòng copyright ở footer.
- **Admin Dashboard**:
  - `/admin`: Overview (4 metrics, 7-day request CSS bar chart, recent quote requests, top viewed tiles).
  - `/admin/products` ⭐: Products CRUD + Upload ảnh texture giả lập (2s progress bar animation) + Toggle hiển thị.
  - `/admin/projects`: Project Management.
  - `/admin/inquiries`: Quote Requests Management với bộ lọc trạng thái (Mới / Đang tư vấn / Đã báo giá / Hoàn thành).
  - `/admin/collections`: Collections Management.

## Phạm vi
**Trong phạm vi:** UI catalog + admin, 12+ mẫu gạch, gallery không gian thực tế, form báo giá/đặt lịch (UI), responsive, 0 lỗi TypeScript.
**Ngoài phạm vi:** Backend thật, database thật, giỏ hàng, thanh toán online.

## Quyết định
| Ngày | Quyết định | Lý do |
| 2026-08-03 | Chọn Hướng 3 (STONA SLAB) | Owner yêu cầu hướng ULTRA GLOSS / INDUSTRIAL SLAB hiện đại, khác biệt 100% so với 4 web trước |

## Nhật ký giai đoạn
| 2026-08-03 | Project Setup & Execution | Tạo Next.js 16 app với Turbopack, build 12+ mẫu gạch, storefront + admin dashboard |
| 2026-08-03 | QA & Build | Static build 12/12 pages sạch, tsc 0 lỗi, git commit `feat: complete tile-showroom catalog with admin dashboard` |

## Hành động kế tiếp
Dự án đã hoàn thành 100%. Sẵn sàng deploy Vercel và đăng Facebook quảng bá studio!
