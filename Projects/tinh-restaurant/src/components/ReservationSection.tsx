"use client";

import React, { useState } from "react";

interface FormData {
  fullName: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  guests?: string;
  date?: string;
  time?: string;
}

export function ReservationSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên quý khách.";
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại liên hệ.";
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ (cần 10 chữ số).";
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày đặt bàn.";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Ngày đặt bàn không thể trong quá khứ.";
      }
    }

    if (!formData.time) {
      newErrors.time = "Vui lòng chọn giờ phục vụ.";
    }

    const guestNum = parseInt(formData.guests, 10);
    if (isNaN(guestNum) || guestNum < 1 || guestNum > 12) {
      newErrors.guests = "Số lượng khách từ 1 đến 12 người.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      /* 
        ========================================================================
        [BACKEND INTEGRATION POINT / CHỖ NỐI API BACKEND]
        Ví dụ tích hợp sau này:
        
        const response = await fetch('/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        ========================================================================
      */

      // Giả lập latency mạng 800ms
      await new Promise((resolve) => setTimeout(resolve, 800));

      setToastMessage("Đã ghi nhận yêu cầu đặt bàn của quý khách. Nhân viên TỊNH sẽ liên hệ xác nhận trong vòng 30 phút.");
      
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        guests: "2",
        date: "",
        time: "19:00",
        notes: "",
      });
      setErrors({});
    } catch {
      setToastMessage("Có lỗi xảy ra khi ghi nhận đặt bàn. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);

      // Tự động ẩn toast sau 6 giây
      setTimeout(() => {
        setToastMessage(null);
      }, 6000);
    }
  };

  return (
    <section id="dat-ban" className="bg-[#1E1813] py-24 md:py-36 px-6 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B98A45] font-sans mb-3">
            Đặt trước chỗ ngồi
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#EDE6D8] tracking-wider uppercase font-light">
            Đặt bàn trải nghiệm
          </h2>
          <p className="text-xs md:text-sm text-[#9A9186] font-sans font-light tracking-widest mt-4 max-w-lg mx-auto">
            Để đảm bảo sự tĩnh lặng và chu đáo tốt nhất, TỊNH chỉ phục vụ tối đa 24 khách mỗi lượt ăn.
          </p>
        </div>

        {/* Opening Hours & Policy Note */}
        <div className="mb-12 p-6 border border-[#B98A45]/20 bg-[#14100D] text-center md:flex md:justify-between md:items-center text-xs tracking-wider text-[#9A9186] font-sans">
          <div>
            <span className="text-[#B98A45] font-medium block md:inline">Giờ mở cửa: </span>
            Ăn tối: 18:00 – 22:30 (Đón khách muộn nhất 20:30)
          </div>
          <div className="mt-2 md:mt-0">
            Nghỉ định kỳ vào thứ Hai hàng tuần
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-[#14100D] p-8 md:p-12 border border-[#B98A45]/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Họ tên */}
            <div>
              <label htmlFor="fullName" className="block text-xs uppercase tracking-[0.2em] text-[#EDE6D8] font-sans mb-2">
                Họ và tên <span className="text-[#8E2C24]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full bg-[#1E1813] border border-[#B98A45]/40 px-4 py-3 text-sm text-[#EDE6D8] placeholder-[#9A9186]/50 focus:border-[#B98A45] focus:outline-none rounded-none font-sans"
              />
              {errors.fullName && (
                <p className="text-xs text-[#8E2C24] font-sans mt-1.5">{errors.fullName}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] text-[#EDE6D8] font-sans mb-2">
                Số điện thoại <span className="text-[#8E2C24]">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0912 345 678"
                className="w-full bg-[#1E1813] border border-[#B98A45]/40 px-4 py-3 text-sm text-[#EDE6D8] placeholder-[#9A9186]/50 focus:border-[#B98A45] focus:outline-none rounded-none font-sans"
              />
              {errors.phone && (
                <p className="text-xs text-[#8E2C24] font-sans mt-1.5">{errors.phone}</p>
              )}
            </div>

            {/* Số lượng khách */}
            <div>
              <label htmlFor="guests" className="block text-xs uppercase tracking-[0.2em] text-[#EDE6D8] font-sans mb-2">
                Số lượng khách <span className="text-[#8E2C24]">*</span>
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full bg-[#1E1813] border border-[#B98A45]/40 px-4 py-3 text-sm text-[#EDE6D8] focus:border-[#B98A45] focus:outline-none rounded-none font-sans"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} Khách
                  </option>
                ))}
                <option value="9">Trên 8 khách (Liên hệ trực tiếp)</option>
              </select>
              {errors.guests && (
                <p className="text-xs text-[#8E2C24] font-sans mt-1.5">{errors.guests}</p>
              )}
            </div>

            {/* Ngày đặt */}
            <div>
              <label htmlFor="date" className="block text-xs uppercase tracking-[0.2em] text-[#EDE6D8] font-sans mb-2">
                Ngày đặt bàn <span className="text-[#8E2C24]">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-[#1E1813] border border-[#B98A45]/40 px-4 py-3 text-sm text-[#EDE6D8] focus:border-[#B98A45] focus:outline-none rounded-none font-sans [color-scheme:dark]"
              />
              {errors.date && (
                <p className="text-xs text-[#8E2C24] font-sans mt-1.5">{errors.date}</p>
              )}
            </div>

            {/* Giờ đón khách */}
            <div className="md:col-span-2">
              <label htmlFor="time" className="block text-xs uppercase tracking-[0.2em] text-[#EDE6D8] font-sans mb-2">
                Khung giờ đón khách <span className="text-[#8E2C24]">*</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"].map((timeSlot) => (
                  <button
                    key={timeSlot}
                    type="button"
                    onClick={() => setFormData({ ...formData, time: timeSlot })}
                    className={`py-2.5 text-xs font-sans tracking-widest border transition-all ${
                      formData.time === timeSlot
                        ? "bg-[#B98A45] text-[#14100D] border-[#B98A45] font-medium"
                        : "bg-[#1E1813] text-[#EDE6D8] border-[#B98A45]/30 hover:border-[#B98A45]"
                    }`}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="text-xs text-[#8E2C24] font-sans mt-1.5">{errors.time}</p>
              )}
            </div>

            {/* Ghi chú */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-xs uppercase tracking-[0.2em] text-[#EDE6D8] font-sans mb-2">
                Ghi chú đặc biệt (Dị ứng thực phẩm / Dịp kỷ niệm)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ví dụ: Khách dị ứng hải sản thân mềm, hoặc kỷ niệm ngày cưới..."
                className="w-full bg-[#1E1813] border border-[#B98A45]/40 px-4 py-3 text-sm text-[#EDE6D8] placeholder-[#9A9186]/50 focus:border-[#B98A45] focus:outline-none rounded-none font-sans resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4 text-xs uppercase tracking-[0.25em] text-[#EDE6D8] bg-[#14100D] border border-[#B98A45] hover:bg-[#8E2C24] hover:border-[#8E2C24] transition-all duration-300 rounded-none focus-visible:ring-1 focus-visible:ring-[#B98A45] disabled:opacity-50"
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt bàn"}
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 max-w-md bg-[#14100D] border border-[#B98A45] text-[#EDE6D8] p-4 shadow-2xl animate-fade-in flex items-start space-x-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#B98A45] mt-1.5 shrink-0" />
            <p className="text-xs md:text-sm font-sans tracking-wide leading-relaxed">
              {toastMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
