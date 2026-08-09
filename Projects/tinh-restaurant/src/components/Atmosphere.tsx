import React from "react";
import Image from "next/image";

export function Atmosphere() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
      alt: "Bàn ăn tối tinh tế dưới ánh nến ấm áp tại nhà hàng TỊNH",
      caption: "Ánh sáng dịu nhẹ tôn vinh khoảnh khắc thưởng ẩm",
      aspect: "aspect-[4/5]",
      colSpan: "md:col-span-7",
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      alt: "Không gian phòng ăn riêng tư với tông màu sơn mài trầm lắng",
      caption: "Sơn mài đen và chi tiết khảm vỏ trứng độc bản",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-5",
    },
    {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
      alt: "Chi tiết bàn ăn gỗ tự nhiên và gốm thủ công cao cấp",
      caption: "Vật liệu tự nhiên mang hơi thở đương đại",
      aspect: "aspect-[16/10]",
      colSpan: "md:col-span-12",
    },
  ];

  return (
    <section id="khong-gian" className="bg-[#1E1813] py-24 md:py-36 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B98A45] font-sans mb-3">
            Sơn mài & Ánh sáng
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#EDE6D8] tracking-wider uppercase font-light">
            Không gian TỊNH
          </h2>
          <p className="text-xs md:text-sm text-[#9A9186] font-sans font-light tracking-widest mt-4">
            Mỗi góc nhỏ là một khoảng lặng giữa lòng đô thị, nơi thời gian dường như dừng lại.
          </p>
        </div>

        {/* Asymmetrical Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {images.map((item, idx) => (
            <div key={idx} className={`${item.colSpan} flex flex-col group`}>
              <div className={`relative w-full ${item.aspect} overflow-hidden border border-[#B98A45]/25 bg-[#14100D]`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                  className="object-cover object-center filter contrast-[1.05] grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                {/* Thin inner frame border */}
                <div className="absolute inset-3 border border-[#B98A45]/20 pointer-events-none" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A9186] mt-3 font-sans">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
