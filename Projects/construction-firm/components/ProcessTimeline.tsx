"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, ShoppingBag, HardHat, CheckCircle } from "lucide-react";

export default function ProcessTimeline() {
  const steps = [
    {
      step: "01",
      icon: Compass,
      title: "Khảo Sát & Khả Thi (Feasibility)",
      desc: "Khảo sát địa chất hầm sâu, đánh giá tác động môi trường và lập quy hoạch tổng mặt bằng thi công.",
    },
    {
      step: "02",
      icon: Cpu,
      title: "Số Hóa BIM 5D & Thiết Kế (Design)",
      desc: "Lập mô hình 3D kết cấu, mô phỏng xung đột MEP và lập tiến độ thi công chính xác từng ngày.",
    },
    {
      step: "03",
      icon: ShoppingBag,
      title: "Mua Sắm Bán Vật Tư (Procurement)",
      desc: "Cung ứng vật tư kết cấu thép, bê tông mác cao và thiết bị siêu trọng từ các tập đoàn hàng đầu thế giới.",
    },
    {
      step: "04",
      icon: HardHat,
      title: "Thi Công & Giám Sát HSE (Construction)",
      desc: "Triển khai thi công thực địa với kỷ luật an toàn lao động tuyệt đối và kiểm soát chất lượng nghiêm ngặt.",
    },
    {
      step: "05",
      icon: CheckCircle,
      title: "Nghiệm Thu & Bàn Giao (Commissioning)",
      desc: "Chạy thử tải toàn hệ thống, nghiệm thu PCCC và bàn giao công trình đưa vào vận hành thương mại.",
    },
  ];

  return (
    <section id="timeline" className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F7F8FA] space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
            EPC WORKFLOW STANDARDS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0B0F19]">
            Quy Trình Thi Công Chuẩn EPC Quốc Tế
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm font-normal">
            5 Bước quản trị dự án nghiêm ngặt đảm bảo tiến độ và chất lượng cho các công trình cấp đặc biệt.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#F4B942] shadow-md hover:shadow-xl transition-all space-y-4 relative group"
              >
                <span className="font-mono text-2xl font-extrabold text-[#F4B942] block">
                  STEP {st.step}
                </span>

                <div className="h-10 w-10 rounded-xl bg-[#0B0F19] text-[#F4B942] flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-heading font-extrabold text-base uppercase text-[#0B0F19]">
                  {st.title}
                </h3>

                <p className="text-xs text-[#555555] leading-relaxed">
                  {st.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
