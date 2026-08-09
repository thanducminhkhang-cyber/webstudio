import React from "react";

export function Philosophy() {
  return (
    <section id="triet-ly" className="bg-[#1E1813] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subheading */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#B98A45] font-sans mb-8">
          Triết lý ẩm thực
        </p>

        {/* Philosophy Main Statement */}
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#EDE6D8] leading-tight md:leading-snug tracking-wide mb-12">
          "Tĩnh để cảm nhận chiều sâu nguyên bản của đất trời Việt Nam."
        </h2>

        {/* 2-3 Sentences Body Copy */}
        <div className="max-w-2xl mx-auto space-y-8 text-base md:text-lg text-[#9A9186] font-sans font-light leading-relaxed tracking-wider">
          <p>
            Tại TỊNH, mỗi thực đơn nếm là một chuyến hành trình chậm rãi đi qua mùa màng bản địa. Chúng tôi chắt lọc sự thanh thuần của thảo mộc, hải sản tươi trong ngày và kỹ nghệ nấu nướng hiện đại để tạo nên trải nghiệm trọn vẹn từng giác quan.
          </p>
          <p>
            Không gian lấy cảm hứng từ chiều sâu sơn mài truyền thống — tĩnh lặng, sâu lắng và tinh tế đến từng chi tiết nhỏ nhất.
          </p>
        </div>
      </div>
    </section>
  );
}
