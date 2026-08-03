"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Testimonials() {
  const { theme } = useTheme();

  const reviews = [
    {
      quote: "Vanguard Construct là tổng thầu xuất sắc nhất mà chúng tôi hợp tác. Nhà máy bán dẫn trị giá $650M của Samsung được hoàn thành vượt tiến độ 2 tháng với tiêu chuẩn phòng sạch tuyệt đối.",
      author: "Mr. Choi Won-Seok",
      role: "Vice President of Infrastructure",
      company: "Samsung Electronics Corp",
    },
    {
      quote: "Khả năng ứng dụng BIM 5D và mô phỏng số của Vanguard giúp chúng tôi tiết kiệm hơn $18M chi phí phát sinh trong quá trình thi công tòa tháp tài chính 88 tầng.",
      author: "Mr. David Harrison",
      role: "Chief Development Officer",
      company: "Apex Financial Group",
    },
    {
      quote: "Dự án trang trại điện gió ngoài khơi Mũi Dinh đòi hỏi kỹ thuật đóng cọc hầm ngầm biển cực kỳ phức tạp. Vanguard đã thi công thành công với tỷ lệ an toàn 100%.",
      author: "Ông Nguyễn Thế Anh",
      role: "Tổng Giám Đốc",
      company: "Vanguard Renewable Energy",
    },
  ];

  return (
    <section className={`py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
    }`}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.25]">
            Đánh Giá Từ Các Tập Đoàn Đối Tác
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between border ${
                theme === "light"
                  ? "bg-white border-[#0D1321]/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                  : "bg-[#121A2D] border-[rgba(201,162,39,0.25)] shadow-xl"
              }`}
            >
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-[#C9A227]" />
                <p className={`text-xs sm:text-sm leading-[1.6] font-normal italic ${
                  theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
                }`}>
                  “{rev.quote}”
                </p>
              </div>

              <div className={`pt-4 border-t space-y-1 ${theme === 'light' ? 'border-[#0D1321]/10' : 'border-white/10'}`}>
                <p className="font-heading font-extrabold text-base uppercase">{rev.author}</p>
                <p className={`text-[11px] font-semibold ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                  {rev.role} • <b className="text-[#C9A227]">{rev.company}</b>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
