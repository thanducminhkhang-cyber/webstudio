"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Trophy, ShieldCheck } from "lucide-react";

export default function TestimonialsAndAwards() {
  const reviews = [
    {
      quote: "Vanguard Construct là tổng thầu xuất sắc nhất mà chúng tôi hợp tác. Nhà máy bán dẫn trị giá $650M của Samsung được hoàn thành vượt tiến độ 2 tháng với tiêu chuẩn phòng sạch tuyệt đối.",
      author: "Mr. Choi Won-Seok",
      role: "Vice President of Infrastructure",
      company: "Samsung Electronics Corp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "Khả năng ứng dụng BIM 5D và mô phỏng số của Vanguard giúp chúng tôi tiết kiệm hơn $18M chi phí phát sinh trong quá trình thi công tòa tháp tài chính 88 tầng.",
      author: "Mr. David Harrison",
      role: "Chief Development Officer",
      company: "Apex Financial Group",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "Dự án trang trại điện gió ngoài khơi Mũi Dinh đòi hỏi kỹ thuật đóng cọc hầm ngầm biển cực kỳ phức tạp. Vanguard đã thi công thành công với tỷ lệ an toàn 100%.",
      author: "Ông Nguyễn Thế Anh",
      role: "Tổng Giám Đốc",
      company: "Vanguard Renewable Energy",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const awards = [
    { title: "Top 10 Tổng Thầu EPC Uy Tín Việt Nam 2024", body: "Vinh danh bởi Vietnam Report & Bộ Xây Dựng cho năng lực thi công siêu dự án tỷ đô." },
    { title: "Chứng Chỉ Quốc Tế ISO 9001:2015 & ISO 14001", body: "Kiểm soát hệ thống quản lý chất lượng và cam kết bảo vệ môi trường toàn diện." },
    { title: "Giải Thưởng Kiến Trúc Biểu Tượng Châu Á 2023", body: "Trao tặng cho tòa tháp tài chính Apex Financial Tower 88 Story." },
    { title: "Chứng Nhận An Toàn OHSAS 18001 / ISO 45001", body: "Kỷ lục 15 triệu giờ làm việc an toàn không xảy ra bất kỳ sự cố lao động nào." },
  ];

  return (
    <section id="testimonials-awards" className="py-24 px-4 sm:px-6 bg-[#1E293B] text-white border-t border-[#334155]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
            TRUST & RECOGNITION
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
            Đánh Giá Đối Tác & Giải Thưởng Quốc Tế
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Uy tín được khẳng định bởi trải nghiệm thực tế từ các chủ đầu tư lớn cùng chuỗi giải thưởng quốc tế danh giá.
          </p>
        </div>

        {/* Testimonials Cards Grid with Circular Avatars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#0F172A] border border-[#334155] p-8 rounded-2xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="h-7 w-7 text-[#3B82F6]" />
                <p className="text-xs sm:text-sm leading-relaxed text-[#94A3B8] italic">
                  “{rev.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#334155] flex items-center gap-3">
                {/* Circular Avatar */}
                <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 border border-[#D4A017]">
                  <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-heading font-bold text-sm uppercase text-white truncate">{rev.author}</p>
                  <p className="text-[11px] text-[#94A3B8] truncate">
                    {rev.role} • <b className="text-[#D4A017] font-semibold">{rev.company}</b>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* International Awards Grid */}
        <div className="pt-8 border-t border-[#334155] space-y-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-[#D4A017]" />
            <h3 className="font-heading font-bold text-xl uppercase text-white">
              Chứng Nhận Chất Lượng & Giải Thưởng Tiêu Biểu
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0F172A] border border-[#334155] p-6 rounded-2xl space-y-2"
              >
                <Trophy className="h-6 w-6 text-[#D4A017]" />
                <h4 className="font-heading font-bold text-sm uppercase leading-snug text-white">{item.title}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
