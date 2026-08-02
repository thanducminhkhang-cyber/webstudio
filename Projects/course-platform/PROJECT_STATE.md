# PROJECT_STATE — course-platform

## Meta
- **Project ID:** course-platform
- **Work Order:** #003
- **Loại:** Course Platform showcase (tiếng Anh / ngoại ngữ) + Admin Dashboard UI
- **Trạng thái:** completed
- **Prompt gốc:** PROMPT-09

## Tóm tắt
Website mẫu bán khoá học tiếng Anh phong cách **Bold & Energetic** (VANGUARD ENGLISH):
- **Storefront**:
  - Home (`/`): Partner trust bar (Marquee), Hero (`TextAnimate`, `BlurFade`, `BorderBeam`, `NumberTicker`), Khoá học nổi bật, Why Choose Us, Giảng viên, Review Marquee, CTA Full-width.
  - Catalog (`/courses`): Bộ lọc danh mục (IELTS, TOEIC, Giao tiếp, Business, Trẻ em).
  - Detail (`/courses/[slug]`): Hero video player modal, Tabs (Giới thiệu, Curriculum Modules, Giảng viên), Sticky pricing card + CTA đăng ký.
  - About (`/about`): Sứ mệnh, tầm nhìn, 3 giá trị cốt lõi.
- **Admin Dashboard**:
  - `/admin`: Dashboard Tổng quan (4 metric cards, biểu đồ tuyển sinh 7 ngày, 5 đăng ký mới nhất, top 3 khoá bán chạy).
  - `/admin/courses` ⭐: Quản lý khoá học (CRUD React state, toggle Hiện/Ẩn, Form thêm/sửa với UI giả lập upload ảnh 2s progress bar & tự động nhận diện YouTube Video Thumbnail + Video Preview Modal, quản lý Modules & Bài học).
  - `/admin/students`: Quản lý 15 học viên (Filter status, Profile Dialog với tiến độ khoá học).
  - `/admin/instructors`: Quản lý 5 giảng viên (Add/Edit Dialog modal).
  - `/admin/revenue`: Thống kê doanh thu (4 metric cards, biểu đồ 30 ngày, top khoá/giảng viên, phân bổ danh mục).

## Phạm vi
**Trong phạm vi:** UI storefront + admin dashboard, 6 khoá học đầy đủ, responsive, animation mượt, form CRUD demo (state only).
**Ngoài phạm vi:** Backend thật, database thật, auth thật.

## Quyết định
| Ngày | Quyết định | Lý do |
| 2026-08-02 | Chọn Hướng 1: NEON IMPACT | Tương phản cực cao (Electric Cobalt `#3B82F6` + Amber `#F59E0B`), typographySyne 800 bạo dạn |

## Nhật ký giai đoạn
| 2026-08-02 | Creative Direction | Owner đã duyệt Hướng 1 (NEON IMPACT - VANGUARD ENGLISH) |
| 2026-08-02 | Implementation | Xây dựng 100% Storefront + Admin Dashboard với CRUD khoá học & YouTube Preview |
| 2026-08-02 | QA & Push | Static build 9/9 pages sạch, tsc 0 lỗi, git commit & push thành công |

## Hành động kế tiếp
Sẵn sàng đăng Facebook quảng bá portfolio 3 sản phẩm showcase chuyên nghiệp của Studio.
