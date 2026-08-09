"use client";

import Image from "next/image";
import React, { useState } from "react";
import { EggshellInlay, Reveal, Figure } from "./parts";

/* ============================================================================
   ẢNH — sửa TẤT CẢ đường dẫn ảnh tại đây. Hiện dùng ảnh minh hoạ (stock
   Unsplash) tông tối hợp sơn mài; thay bằng ảnh thật của nhà hàng khi có.
   ========================================================================== */
const IMG = {
  hero: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop", // món ăn tối, cận cảnh — nền hero
  table: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop", // bàn ăn dưới ánh nến
  dish: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", // một món trong thực đơn
  moody: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=800&auto=format&fit=crop", // không gian ấm trầm
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop", // rượu vang ghép món
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop", // chân dung bếp trưởng
};

/* Thực đơn nếm — bảy chương theo thứ tự phục vụ. Số La Mã ở đây mang thông tin
   thật (trình tự món), không phải trang trí. Tên món & nguyên liệu là placeholder. */
const COURSES = [
  { no: "I", name: "Tĩnh Đầu", detail: "Củ quả muối theo mùa, giấm mơ, rau thơm vườn" },
  { no: "II", name: "Nước Trong", detail: "Canh rong biển, nghêu, rau răm" },
  { no: "III", name: "Vị Biển", detail: "Cá vược hấp, mỡ gà, hành hoa" },
  { no: "IV", name: "Hương Đồng", detail: "Lươn nướng lá lốt, riềng, mẻ" },
  { no: "V", name: "Lộc Rừng", detail: "Nấm hương, măng tươi, tiêu xanh" },
  { no: "VI", name: "Trọn", detail: "Vịt om sấu, khoai môn, hạt sen" },
  { no: "VII", name: "Ngọt Cuối", detail: "Chè hạt sen, long nhãn" },
];

type FormState = {
  hoTen: string;
  soDienThoai: string;
  soKhach: string;
  ngay: string;
  gio: string;
  ghiChu: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  hoTen: "",
  soDienThoai: "",
  soKhach: "",
  ngay: "",
  gio: "",
  ghiChu: "",
};

export default function Page() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<string | null>(null);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (data: FormState): FormErrors => {
    const e: FormErrors = {};
    if (data.hoTen.trim().length < 2) e.hoTen = "Vui lòng nhập họ tên.";

    const phone = data.soDienThoai.replace(/[\s.]/g, "");
    if (!phone) e.soDienThoai = "Vui lòng nhập số điện thoại.";
    else if (!/^(0|\+84)\d{8,10}$/.test(phone)) e.soDienThoai = "Số điện thoại chưa hợp lệ.";

    const guests = Number(data.soKhach);
    if (!data.soKhach) e.soKhach = "Vui lòng nhập số khách.";
    else if (!Number.isInteger(guests) || guests < 1 || guests > 12)
      e.soKhach = "Số khách từ 1 đến 12. Đoàn lớn hơn, xin gọi trực tiếp.";

    if (!data.ngay) e.ngay = "Vui lòng chọn ngày.";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(data.ngay) < today) e.ngay = "Ngày đặt phải từ hôm nay trở đi.";
    }

    if (!data.gio) e.gio = "Vui lòng chọn giờ.";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Đưa con trỏ tới trường lỗi đầu tiên cho người dùng bàn phím.
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    // TODO: nối API đặt bàn ở đây — ví dụ: await fetch("/api/reservations", { method: "POST", body: JSON.stringify(form) })
    // Hiện tại chỉ giả lập ghi nhận phía client.
    setToast("Đã ghi nhận. Chúng tôi sẽ gọi lại để xác nhận bàn của bạn.");
    setForm(EMPTY_FORM);
    setErrors({});
    window.clearTimeout((handleSubmit as unknown as { _t?: number })._t);
    (handleSubmit as unknown as { _t?: number })._t = window.setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="min-h-screen bg-lacquer text-eggshell">
      {/* Header tối giản — chỉ một lối vào "Đặt bàn". Wordmark để dành cho hero. */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 h-20 flex items-center justify-end">
          <a
            href="#dat-ban"
            className="text-[0.7rem] tracking-[0.28em] uppercase text-eggshell/80 hover:text-brass transition-colors"
          >
            Đặt bàn
          </a>
        </div>
      </header>

      {/* ===================== 1 · HERO (full-bleed) ===================== */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Ảnh món ăn full-bleed + lớp phủ sơn mài để chữ dễ đọc và giữ tông tối */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.hero}
            alt="Món ăn tinh tế trong thực đơn nếm của Thanh An"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) brightness(0.8)" }}
          />
          {/* phủ tối đều + đậm hơn phía trái nơi đặt chữ */}
          <div className="absolute inset-0" style={{ background: "rgba(20,16,13,0.5)" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-lacquer) 0%, color-mix(in srgb, var(--color-lacquer) 74%, transparent) 44%, transparent 100%)",
            }}
          />
          {/* nối mượt xuống section kế tiếp */}
          <div
            className="absolute inset-x-0 bottom-0 h-44"
            style={{ background: "linear-gradient(180deg, transparent, var(--color-lacquer))" }}
          />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 py-28">
          <Reveal className="max-w-2xl" delay={80}>
            <h1 className="font-display font-light leading-[0.95] text-eggshell text-[16vw] sm:text-[12vw] lg:text-[8.5rem] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
              Thanh An
            </h1>
            {/* Gạch chân wordmark bằng chính motif khảm vỏ trứng */}
            <div className="mt-3 max-w-[24rem]">
              <EggshellInlay height={20} />
            </div>
            <p className="mt-8 text-base sm:text-lg text-eggshell/80 font-light leading-relaxed max-w-md">
              Thực đơn nếm theo mùa · Hà Nội
            </p>
            <div className="mt-10">
              <a href="#dat-ban" className="btn-brass">
                Đặt bàn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== 2 · TRIẾT LÝ ===================== */}
      <section id="triet-ly" className="bg-lacquer">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 py-28 sm:py-40">
          <Reveal>
            <p className="eyebrow mb-10">Triết lý</p>
            <p className="font-display font-light text-eggshell text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.4]">
              Tĩnh không phải là im lặng. Là để nguyên liệu lên tiếng đúng lúc nó ngon nhất, rồi đứng
              sang một bên. Chúng tôi chọn rau, cá, gia vị theo mùa của miền Bắc — nấu vừa đủ, bày vừa
              đủ, và giữ lại phần lặng cho vị thật.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <EggshellInlay />
      </div>

      {/* ===================== 3 · THỰC ĐƠN NẾM ===================== */}
      <section id="thuc-don" className="bg-lacquer-2">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 py-28 sm:py-36">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <h2 className="font-display font-light text-eggshell text-4xl sm:text-5xl">Thực đơn nếm</h2>
              <p className="text-sm text-muted tracking-wide">Bảy chương · theo mùa</p>
            </div>
          </Reveal>

          <ul>
            {COURSES.map((c, i) => (
              <li key={c.no}>
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-full"
                    style={{
                      background: "color-mix(in srgb, var(--color-brass) 22%, transparent)",
                    }}
                  />
                )}
                <Reveal delay={Math.min(i, 4) * 60}>
                  <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-8 items-baseline py-8 sm:py-10">
                    <span className="font-display text-brass text-2xl sm:text-3xl leading-none">{c.no}</span>
                    <div>
                      <h3 className="font-display font-normal text-eggshell text-2xl sm:text-3xl leading-tight">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-muted font-light">{c.detail}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <p className="mt-16 text-sm text-muted font-light leading-relaxed">
              Thực đơn thay đổi theo mùa và theo chợ mỗi sáng.
              <br className="hidden sm:block" />
              <span className="text-eggshell">[Giá thực đơn]</span> mỗi khách · rượu ghép món tuỳ chọn.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <EggshellInlay />
      </div>

      {/* ===================== 4 · KHÔNG GIAN ===================== */}
      <section id="khong-gian" className="bg-lacquer">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow mb-14">Không gian</p>
          </Reveal>
          {/* Lưới không đều, im lặng — không caption, alt nằm ở role="img". */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6">
            <Reveal className="sm:col-span-7">
              <Figure src={IMG.table} alt="Bàn ăn dưới ánh nến" className="w-full" style={{ aspectRatio: "16 / 11" }} sizes="(max-width: 768px) 100vw, 58vw" />
            </Reveal>
            <Reveal className="sm:col-span-5" delay={120}>
              <Figure src={IMG.dish} alt="Một món trong thực đơn nếm theo mùa" className="w-full h-full" style={{ minHeight: "14rem" }} sizes="(max-width: 768px) 100vw, 42vw" />
            </Reveal>
            <Reveal className="sm:col-span-5" delay={80}>
              <Figure src={IMG.moody} alt="Không gian ấm trầm dưới ánh đèn buổi tối" className="w-full h-full" style={{ minHeight: "14rem" }} sizes="(max-width: 768px) 100vw, 42vw" />
            </Reveal>
            <Reveal className="sm:col-span-7" delay={160}>
              <Figure src={IMG.wine} alt="Ly rượu vang ghép món và bóng đổ trên bàn" className="w-full" style={{ aspectRatio: "16 / 10" }} sizes="(max-width: 768px) 100vw, 58vw" />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <EggshellInlay />
      </div>

      {/* ===================== 5 · BẾP TRƯỞNG ===================== */}
      <section id="bep-truong" className="bg-lacquer-2">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-28 sm:py-36 grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <Figure src={IMG.chef} alt="Chân dung bếp trưởng của Thanh An" className="w-full" style={{ aspectRatio: "4 / 5" }} sizes="(max-width: 1024px) 100vw, 42vw" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="eyebrow mb-8">Bếp trưởng</p>
            <h2 className="font-display font-light text-eggshell text-4xl sm:text-5xl leading-tight">
              [Tên bếp trưởng]
            </h2>
            <div className="mt-8 space-y-5 text-muted font-light leading-relaxed max-w-md">
              <p>
                Lớn lên bên gian bếp củi của bà, [Tên] quen lắng nghe nguyên liệu trước khi chạm dao.
              </p>
              <p>
                Sau nhiều năm qua những căn bếp lớn, anh trở về Hà Nội để nấu thứ bếp Việt mộc mạc mà
                mình nhớ nhất — đúng mùa, và tĩnh.
              </p>
              <p className="text-eggshell">Mỗi tối, Thanh An chỉ dọn một thực đơn, cho những người ngồi lại.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <EggshellInlay />
      </div>

      {/* ===================== 6 · ĐẶT BÀN ===================== */}
      <section id="dat-ban" className="bg-lacquer scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow mb-8">Đặt bàn</p>
            <h2 className="font-display font-light text-eggshell text-4xl sm:text-5xl leading-tight">
              Giữ chỗ cho buổi tối của bạn
            </h2>
            <p className="mt-6 text-muted font-light leading-relaxed max-w-xl">
              Thanh An phục vụ theo lượt, mỗi tối một thực đơn nếm. Vui lòng đặt trước — chúng tôi sẽ gọi
              lại để xác nhận.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <form className="mt-14 grid gap-8 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <Field
                id="hoTen"
                label="Họ tên"
                value={form.hoTen}
                error={errors.hoTen}
                autoComplete="name"
                onChange={(v) => setField("hoTen", v)}
              />
              <Field
                id="soDienThoai"
                label="Số điện thoại"
                type="tel"
                inputMode="tel"
                value={form.soDienThoai}
                error={errors.soDienThoai}
                autoComplete="tel"
                onChange={(v) => setField("soDienThoai", v)}
              />
              <Field
                id="soKhach"
                label="Số khách"
                type="number"
                min={1}
                max={12}
                value={form.soKhach}
                error={errors.soKhach}
                onChange={(v) => setField("soKhach", v)}
              />
              <Field
                id="ngay"
                label="Ngày"
                type="date"
                value={form.ngay}
                error={errors.ngay}
                onChange={(v) => setField("ngay", v)}
              />
              <Field
                id="gio"
                label="Giờ"
                type="time"
                value={form.gio}
                error={errors.gio}
                onChange={(v) => setField("gio", v)}
              />
              <div className="sm:col-span-1" />
              <div className="sm:col-span-2">
                <label htmlFor="ghiChu" className="field-label">
                  Ghi chú <span className="normal-case tracking-normal text-muted/70">(dị ứng, dịp đặc biệt…)</span>
                </label>
                <textarea
                  id="ghiChu"
                  className="field-input"
                  rows={3}
                  value={form.ghiChu}
                  onChange={(e) => setField("ghiChu", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
                <button type="submit" className="btn-brass">
                  Xác nhận đặt bàn
                </button>
                <p className="text-sm text-muted font-light">Mở cửa 18:00 – 22:30 · Thứ Ba – Chủ Nhật</p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <EggshellInlay />
      </div>

      {/* ===================== 7 · FOOTER ===================== */}
      <footer className="bg-lacquer-2">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-3xl text-eggshell leading-none">Thanh An</p>
            <p className="mt-4 text-sm text-muted font-light leading-relaxed">
              Thực đơn nếm theo mùa của miền Bắc.
            </p>
          </div>
          <div>
            <p className="field-label">Địa chỉ</p>
            <p className="text-sm text-eggshell/90 font-light leading-relaxed">
              [Số nhà, tên đường]
              <br />
              [Phường / Quận], Hà Nội
            </p>
          </div>
          <div>
            <p className="field-label">Giờ mở cửa</p>
            <p className="text-sm text-eggshell/90 font-light leading-relaxed">
              Thứ Ba – Chủ Nhật
              <br />
              18:00 – 22:30
            </p>
            <p className="mt-4 field-label">Điện thoại</p>
            <p className="text-sm text-eggshell/90 font-light">[Số điện thoại]</p>
          </div>
          <div>
            <p className="field-label">Kết nối</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-eggshell/90 hover:text-brass transition-colors font-light">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-eggshell/90 hover:text-brass transition-colors font-light">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-eggshell/90 hover:text-brass transition-colors font-light">
                  Xem bản đồ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 sm:px-8 pb-10">
          <p className="text-xs text-muted/70 tracking-wide">© 2026 Thanh An · Hà Nội</p>
        </div>
      </footer>

      {/* Toast giả lập — thay bằng phản hồi thật từ API sau. */}
      <div aria-live="polite" className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-6 px-6 pointer-events-none">
        {toast && (
          <div className="pointer-events-auto max-w-md bg-lacquer-2 border border-brass px-6 py-4 text-sm text-eggshell font-light shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Trường nhập liệu dùng chung cho form đặt bàn ---- */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  min,
  max,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric";
  autoComplete?: string;
  min?: number;
  max?: number;
}) {
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errId : undefined}
      />
      {error && (
        <p id={errId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
