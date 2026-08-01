---
wsos_version: "1.0.0"
project_id: "cafe-showcase"
project_name: "Cafe Showcase — Mẫu trưng bày studio (Tokyo Midnight Espresso)"
created: "2026-08-01"
updated: "2026-08-01"
phase: "qa"
status: "active"

stack:
  next: "16.2.12"
  react: "19.2.4"
  tailwind: "4"
  wsos_ui: "0.1.0"

deploy_target: "standalone"

shared_usage: []

local_forks: []

blockers: []

dod:
  build: true
  typecheck: true
  lint: true
  responsive: true
  env_validated: true
  error_states: true
  a11y_keyboard: true
  readme: true
  licenses_cleared: true
---

## Work Order
Website Cafe mẫu (KISSATEN Tokyo Midnight Specialty Coffee) để đăng Facebook tìm khách hàng. Các trang/section: Hero, Câu chuyện (About), Menu (Tabs), Gallery (BentoGrid), Đặt bàn (Form + Toast), Review (Marquee), Liên hệ & Footer. Mobile-first.

## Phạm vi
**Trong phạm vi:** UI hoàn chỉnh, responsive 375px/768px/1440px, animation BlurFade & TypingAnimation & BorderBeam & ShimmerButton, dark mode toggle.
**Ngoài phạm vi:** Backend, gửi form thật, CMS, database, auth.

## Quyết định
| Ngày | Quyết định | Lý do |
| 2026-08-01 | Chọn Hướng 1: Tokyo Midnight Espresso | Phong cách thiết kế ấn tượng, độc đáo, tạo giá trị bán hàng cao nhất trên Facebook |

## Nhật ký giai đoạn
| Ngày | Giai đoạn | Kết quả |
| 2026-08-01 | Creative Direction | Đề xuất 3 hướng, Owner chọn Hướng 1 |
| 2026-08-01 | Code & QA | Xây dựng hoàn chỉnh single-page, build & typecheck 100% sạch |

## Hành động kế tiếp
Bàn giao website mẫu cho Owner đăng Facebook tìm khách hàng.
