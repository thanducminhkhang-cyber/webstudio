"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, HardHat, Clock, Award, Layers } from "lucide-react";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: Cpu,
      title: "Mô Hình BIM 5D & AI Digital Twin",
      desc: "Quản trị số hóa 100% dữ liệu thiết kế, mô phỏng xung đột kết cấu trước khi thi công, loại bỏ 99% sai số thực địa.",
    },
    {
      icon: ShieldCheck,
      title: "An Toàn Tuyệt Đối Zero-Accident",
      desc: "Hệ thống giám sát HSE tự động 24/7 theo chuẩn OHSAS 18001 & ISO 45001, đảm bảo kỷ luật lao động nghiêm ngặt.",
    },
    {
      icon: Clock,
      title: "Cam Kết Đúng Tiến Độ 100%",
      desc: "Hệ thống cung ứng vật tư khép kín và năng lực điều phối hơn 3,200 kỹ sư cùng lúc trên các công trường trọng điểm.",
    },
    {
      icon: Layers,
      title: "Năng Lực Siêu Kết Cấu & Hạ Tầng Phức Tạp",
      desc: "Chuyên gia thi công hầm ngầm, cầu dây văng, cảng biển nước sâu và khu công nghiệp cao quy mô hàng trăm hecta.",
    },
    {
      icon: Award,
      title: "Chứng Chỉ Quốc Tế FIDIC & ISO",
      desc: "Tuân thủ hợp đồng chuẩn quốc tế FIDIC, minh bạch tài chính và kiểm soát chất lượng bởi tập đoàn giám sát uy tín thế giới.",
    },
    {
      icon: HardHat,
      title: "Đội Ngũ Kỹ Sư Trình Độ Cao",
      desc: "85% Kỹ sư chỉ huy trưởng đạt chứng chỉ hành nghề hạng I và trên 15 năm kinh nghiệm thực chiến công trình cấp đặc biệt.",
    },
  ];

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 bg-[#0B0F19] text-white border-y border-white/10 relative overflow-hidden">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
            WHY VANGUARD CONSTRUCT
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Năng Lực Cạnh Tranh & Giá Trị Cốt Lõi
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-normal">
            Lý do các tập đoàn toàn cầu tin tưởng lựa chọn Vanguard Construct làm tổng thầu cho các siêu dự án.
          </p>
        </div>

        {/* 6 Advantages 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-[#151C28]/80 border border-white/10 hover:border-[#F4B942]/60 p-8 rounded-3xl backdrop-blur-md space-y-4 hover:-translate-y-2 transition-all duration-400 shadow-xl group"
              >
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-[#F4B942]/40 flex items-center justify-center text-[#F4B942] group-hover:bg-[#F4B942] group-hover:text-[#0B0F19] transition-colors">
                  <Icon className="h-6 w-6 stroke-[1.75]" />
                </div>
                <h3 className="font-heading font-extrabold text-xl uppercase text-white group-hover:text-[#F4B942] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
