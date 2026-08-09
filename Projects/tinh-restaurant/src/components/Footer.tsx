import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#14100D] border-t border-[#B98A45]/20 py-16 px-6 md:px-12 text-[#9A9186] font-sans text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* Brand & Wordmark */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-serif text-3xl tracking-[0.25em] text-[#EDE6D8] block">
            TỊNH
          </span>
          <p className="text-xs font-light text-[#9A9186] leading-relaxed max-w-xs">
            Ẩm thực fine-dining Việt hiện đại theo mùa. Tĩnh lặng trong tâm, tinh tế trong vị.
          </p>
        </div>

        {/* Address & Contact */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#B98A45] font-medium mb-3">
            Địa chỉ & Liên hệ
          </h4>
          <p className="text-[#EDE6D8] font-light">
            Số 18 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội
          </p>
          <p className="font-light">
            Hotline đặt bàn:{" "}
            <a href="tel:02439876543" className="text-[#EDE6D8] hover:text-[#B98A45] transition-colors">
              (024) 3987 6543
            </a>
          </p>
          <p className="font-light">
            Email:{" "}
            <a href="mailto:reservation@tinhdining.vn" className="text-[#EDE6D8] hover:text-[#B98A45] transition-colors">
              reservation@tinhdining.vn
            </a>
          </p>
          <div className="pt-2">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-[#B98A45] hover:underline"
            >
              <span>Xem trên Google Maps</span>
              <span className="ml-1">↗</span>
            </a>
          </div>
        </div>

        {/* Hours & Social */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#B98A45] font-medium mb-3">
            Thời gian phục vụ
          </h4>
          <p className="font-light">
            Thứ Ba – Chủ Nhật: 18:00 – 22:30
          </p>
          <p className="font-light">
            Nghỉ định kỳ thứ Hai hàng tuần
          </p>

          <div className="pt-4 flex space-x-6">
            <a
              href="#"
              aria-label="Facebook nhà hàng TỊNH"
              className="uppercase tracking-widest text-[10px] text-[#EDE6D8] hover:text-[#B98A45] transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              aria-label="Instagram nhà hàng TỊNH"
              className="uppercase tracking-widest text-[10px] text-[#EDE6D8] hover:text-[#B98A45] transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              aria-label="Michelin Guide"
              className="uppercase tracking-widest text-[10px] text-[#EDE6D8] hover:text-[#B98A45] transition-colors"
            >
              Michelin Guide
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#B98A45]/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#9A9186]/70 gap-4">
        <div>
          © {new Date().getFullYear()} TỊNH FINE DINING. ALL RIGHTS RESERVED.
        </div>
        <div>
          SƠN MÀI & CẢM CỨNG ẨM THỰC VIỆT
        </div>
      </div>
    </footer>
  );
}
