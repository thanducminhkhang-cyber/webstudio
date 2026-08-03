"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
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
    <section className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F7F8FA] space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0B0F19]">
            Đánh Giá Từ Các Tập Đoàn Đối Tác
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-[#F4B942]" />
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-normal italic">
                  “{rev.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1">
                <p className="font-heading font-extrabold text-base uppercase text-[#0B0F19]">{rev.author}</p>
                <p className="text-[11px] text-[#555555] font-semibold">{rev.role} • <b className="text-[#F4B942]">{rev.company}</b></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
