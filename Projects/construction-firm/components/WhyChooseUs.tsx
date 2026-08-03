"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, HardHat, Clock, Award, Layers, ArrowRight } from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { useTheme } from "./ThemeProvider";

interface WhyChooseUsProps {
  onOpenConsultation?: () => void;
}

export default function WhyChooseUs({ onOpenConsultation }: WhyChooseUsProps) {
  const { theme } = useTheme();

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
      title: "Năng Lực Siêu Kết Cấu & Hạ Tầng",
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
    <section id="why-us" className={`py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
    }`}>
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono">
            WHY VANGUARD CONSTRUCT
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.25]">
            Năng Lực Cạnh Tranh & Giá Trị Cốt Lõi
          </h2>
          <p className={`max-w-xl mx-auto text-sm font-normal ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
            Lý do các tập đoàn toàn cầu tin tưởng lựa chọn Vanguard Construct làm tổng thầu cho các siêu dự án.
          </p>
        </div>

        {/* 6 Advantages 3D Tilt Cards (gap: 32px, padding: 32-40px, border 1px solid rgba(201,162,39,0.25)) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`p-8 sm:p-10 rounded-3xl space-y-4 hover:-translate-y-2 transition-all duration-400 shadow-xl group border ${
                  theme === "light"
                    ? "bg-white border-[#0D1321]/10 hover:border-[#C9A227] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                    : "bg-[#121A2D] border-[rgba(201,162,39,0.25)] hover:border-[#C9A227]"
                }`}
              >
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#0D1321] transition-colors">
                  <Icon className="h-6 w-6 stroke-[1.75]" />
                </div>
                <h3 className="font-heading font-extrabold text-xl uppercase group-hover:text-[#C9A227] transition-colors leading-[1.35]">
                  {item.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-[1.6] font-normal ${
                  theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
                }`}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* REPEATED CTA 1: Outline / Ghost Button with Gold Border */}
        <div className="text-center pt-6">
          <Button
            onClick={onOpenConsultation}
            variant="outline"
            className="border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0D1321] font-extrabold rounded-full text-xs tracking-[0.15em] uppercase px-8 py-4 h-auto transition-all hover:-translate-y-0.5"
          >
            NĂNG LỰC CẠNH TRANH EPC — TẢI HỒ SƠ NĂNG LỰC (PDF) <ArrowRight className="ml-2 h-4 w-4 inline" />
          </Button>
        </div>
      </div>
    </section>
  );
}
