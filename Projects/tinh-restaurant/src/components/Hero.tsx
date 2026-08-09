import React from "react";
import Image from "next/image";
import { EggshellUnderline } from "./EggshellDivider";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#14100D] pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-between overflow-hidden">
      {/* Background ambient lighting subtle accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B98A45]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full text-center z-10 flex flex-col items-center flex-grow justify-center">
        {/* Sub-header / Location */}
        <div className="animate-fade-in">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#B98A45] font-sans mb-4">
            Thực đơn nếm theo mùa · Hà Nội
          </p>
        </div>

        {/* Wordmark "TỊNH" */}
        <div className="animate-fade-in my-2">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] font-light text-[#EDE6D8] uppercase">
            TỊNH
          </h1>
          {/* Signature Eggshell Underline */}
          <EggshellUnderline className="mt-2 mb-6" />
        </div>

        {/* Tagline */}
        <p className="max-w-xl mx-auto text-sm md:text-base text-[#9A9186] font-sans font-light tracking-widest leading-relaxed mb-8 md:mb-12">
          Nơi nhịp sống lắng đọng để tôn vinh sự tinh khiết của nông sản Việt qua góc nhìn đương đại.
        </p>

        {/* Featured Main Dish Close-up Photo */}
        <div className="w-full max-w-4xl mx-auto my-4 md:my-8 relative group">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#B98A45]/30 bg-[#1E1813]">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop"
              alt="Món ăn biểu tượng trong thực đơn nếm mùa hạ của nhà hàng TỊNH"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover object-center filter contrast-[1.08] saturate-[0.9] hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Fine border frame interior */}
            <div className="absolute inset-2 border border-[#B98A45]/20 pointer-events-none" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#9A9186] mt-3 text-right font-sans">
            Món biểu tượng · Cá Lăng Sông Cấm khảm lá lốt & Sốt tía tô chín
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-6 md:mt-10 animate-fade-in">
          <a
            href="#dat-ban"
            className="inline-block px-10 py-4 text-xs uppercase tracking-[0.25em] text-[#EDE6D8] border border-[#B98A45] hover:bg-[#8E2C24] hover:border-[#8E2C24] hover:text-[#EDE6D8] transition-all duration-500 rounded-none focus-visible:ring-1 focus-visible:ring-[#B98A45]"
          >
            Đặt bàn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-12 z-10">
        <a
          href="#triet-ly"
          className="inline-flex flex-col items-center text-[10px] uppercase tracking-[0.3em] text-[#9A9186] hover:text-[#B98A45] transition-colors group"
          aria-label="Cuộn xuống khám phá triết lý"
        >
          <span className="mb-2">Khám phá</span>
          <div className="w-[1px] h-6 bg-[#B98A45]/40 group-hover:bg-[#B98A45] group-hover:h-8 transition-all duration-300" />
        </a>
      </div>
    </section>
  );
}
