import React from "react";
import Image from "next/image";

export function ChefSection() {
  return (
    <section id="bep-truong" className="bg-[#14100D] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Portrait Photo */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#B98A45]/30 bg-[#1E1813] group">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop"
                alt="Chân dung Bếp trưởng điều hành nhà hàng TỊNH"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center filter contrast-[1.05] grayscale-[20%] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-3 border border-[#B98A45]/20 pointer-events-none" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A9186] mt-3 font-sans text-center md:text-left">
              Bếp trưởng Nguyễn Vũ Lâm · Người kiến tạo hương vị TỊNH
            </p>
          </div>

          {/* Philosophy & Copy */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B98A45] font-sans">
              Bếp trưởng sáng tạo
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#EDE6D8] font-light leading-snug tracking-wide">
              "Mỗi món ăn là một bài thơ tĩnh lặng về ký ức ẩm thực Việt."
            </h2>
            <div className="space-y-4 text-sm md:text-base text-[#9A9186] font-sans font-light leading-relaxed tracking-wider">
              <p>
                Với hơn 15 năm nghiên cứu nguồn nguyên liệu bản địa từ miền núi Tây Bắc đến vùng duyên hải miền Trung, tôi tin rằng điều quý giá nhất của ẩm thực Việt nằm ở sự cân bằng dịu nhẹ giữa âm và dương, giữa độ tươi thuần khiết và kỹ nghệ chế tác kỳ công.
              </p>
              <p>
                Tại TỊNH, chúng tôi không phô trương kỹ thuật. Chúng tôi dùng thời gian và sự kiên nhẫn để nguyên liệu cất lời.
              </p>
            </div>
            <div className="pt-4">
              <span className="font-serif text-xl text-[#B98A45] tracking-widest italic block">
                Nguyễn Vũ Lâm
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9A9186] font-sans block mt-1">
                Executive Chef & Founder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
