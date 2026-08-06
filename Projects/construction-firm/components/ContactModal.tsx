"use client";

import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Calculator, ShieldCheck, Zap } from "lucide-react";
import CountUp from "./CountUp";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

const PROJECT_TYPE_RATES: Record<string, { baseRate: number; timeRate: number; manpowerRate: number }> = {
  "Hạ tầng / Đường sắt đô thị": { baseRate: 2200, timeRate: 0.00035, manpowerRate: 0.025 },
  "Nhà máy / Khu công nghiệp": { baseRate: 1500, timeRate: 0.00028, manpowerRate: 0.018 },
  "Tòa tháp cao ốc / Thương mại": { baseRate: 2800, timeRate: 0.00042, manpowerRate: 0.032 },
  "Năng lượng tái tạo": { baseRate: 1800, timeRate: 0.00030, manpowerRate: 0.020 },
  "Khác": { baseRate: 1600, timeRate: 0.00030, manpowerRate: 0.020 },
};

export default function ContactModal({ isOpen, onClose, onSubmitSuccess }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "Hạ tầng / Đường sắt đô thị",
    areaSize: 50000,
    techStandard: "BIM 5D & AI",
    message: "",
  });

  const [activeTab, setActiveTab] = useState<"form" | "calculator">("form");

  // Dynamic changing numbers calculation
  const estimates = useMemo(() => {
    const rates = PROJECT_TYPE_RATES[formData.projectType] || PROJECT_TYPE_RATES["Hạ tầng / Đường sắt đô thị"];
    const area = formData.areaSize;

    // Budget in USD Million
    const rawBudgetMillion = (area * rates.baseRate) / 1000000;
    const estBudgetStr = `$${rawBudgetMillion.toFixed(1)} Million USD`;

    // Duration in Months
    const rawMonths = Math.max(6, Math.round(10 + area * rates.timeRate));
    const estMonthsStr = `${rawMonths} Tháng`;

    // Workforce
    const rawManpower = Math.max(100, Math.round(area * rates.manpowerRate));
    const estManpowerStr = `${rawManpower.toLocaleString("vi-VN")} Kỹ sư & Nhân sự`;

    return {
      budgetStr: estBudgetStr,
      monthsStr: estMonthsStr,
      manpowerStr: estManpowerStr,
    };
  }, [formData.projectType, formData.areaSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onClose();
    onSubmitSuccess(
      `🎉 Đã nhận thông tin! Báo giá ước tính (${estimates.budgetStr}, ${estimates.monthsStr}) đã được chuyển tới Kỹ sư trưởng Vanguard Construct.`
    );
    setFormData({
      name: "",
      phone: "",
      projectType: "Hạ tầng / Đường sắt đô thị",
      areaSize: 50000,
      techStandard: "BIM 5D & AI",
      message: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 border border-[#334155] shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-[#334155] pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-[#D4A017] uppercase tracking-widest block">
              VANGUARD CONSTRUCT CONSULTATION & ESTIMATOR
            </span>
            <div className="flex items-center gap-1 bg-[#1E293B] p-1 rounded-xl border border-[#334155]">
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                  activeTab === "form" ? "bg-[#D4A017] text-[#0F172A]" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Tư Vấn
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("calculator")}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === "calculator" ? "bg-[#D4A017] text-[#0F172A]" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Calculator className="h-3 w-3 inline" />
                <span>Tính Ngân Sách</span>
              </button>
            </div>
          </div>

          <DialogTitle className="font-heading font-extrabold text-2xl uppercase text-white mt-2">
            {activeTab === "form" ? "Nhận Báo Giá Miễn Phí" : "Công Cụ Dự Tính Quy Mô & Ngân Sách EPC"}
          </DialogTitle>
        </DialogHeader>

        {/* Dynamic Estimated Numbers Display Bar */}
        <div className="my-4 p-4 rounded-xl bg-[#0A0E1A] border border-[#334155] grid grid-cols-3 gap-3 text-center">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Dự Toán Hợp Đồng</span>
            <span className="font-heading font-extrabold text-base sm:text-lg text-[#D4A017] block">
              <CountUp value={estimates.budgetStr} glowOnComplete={true} glowColor="gold" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Thời Gian Thi Công</span>
            <span className="font-heading font-extrabold text-base sm:text-lg text-white block">
              <CountUp value={estimates.monthsStr} glowOnComplete={true} glowColor="gold" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Nhân Sự Dự Kiến</span>
            <span className="font-heading font-extrabold text-xs sm:text-sm text-[#3B82F6] block mt-1 truncate">
              <CountUp value={estimates.manpowerStr} />
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "calculator" && (
            <div className="p-4 rounded-xl bg-[#1E293B] border border-[#334155] space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#D4A017]" /> Quy Mô Sàn Thi Công (m²)
                </Label>
                <span className="font-mono text-sm font-extrabold text-[#D4A017]">
                  {formData.areaSize.toLocaleString("vi-VN")} m²
                </span>
              </div>

              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={formData.areaSize}
                onChange={(e) => setFormData({ ...formData, areaSize: Number(e.target.value) })}
                className="w-full h-2 bg-[#0F172A] rounded-lg appearance-none cursor-pointer accent-[#D4A017]"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>10.000 m²</span>
                <span>250.000 m²</span>
                <span>500.000 m²</span>
              </div>
            </div>
          )}

          {/* Field 1: Họ và Tên */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-white">Họ và Tên *</Label>
            <Input
              required
              placeholder="Ví dụ: Nguyễn Văn Hùng"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="text-xs bg-[#1E293B] border-[#334155] text-white rounded-xl focus:border-[#3B82F6]"
            />
          </div>

          {/* Field 2: Số Điện Thoại */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-white">Số Điện Thoại *</Label>
            <Input
              required
              placeholder="0901234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="text-xs bg-[#1E293B] border-[#334155] text-white font-mono rounded-xl focus:border-[#3B82F6]"
            />
          </div>

          {/* Field 3: Loại Công Trình Dropdown */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-white">Loại Công Trình (Tự động tính ngân sách)</Label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#1E293B] border border-[#334155] text-xs font-semibold text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="Hạ tầng / Đường sắt đô thị">Hạ tầng / Đường sắt đô thị ($2.200/m²)</option>
              <option value="Nhà máy / Khu công nghiệp">Nhà máy / Khu công nghiệp ($1.500/m²)</option>
              <option value="Tòa tháp cao ốc / Thương mại">Tòa tháp cao ốc / Thương mại ($2.800/m²)</option>
              <option value="Năng lượng tái tạo">Năng lượng tái tạo ($1.800/m²)</option>
              <option value="Khác">Khác ($1.600/m²)</option>
            </select>
          </div>

          {/* Field 4: Ghi Chú / Nhu Cầu */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-white">Ghi Chú / Nhu Cầu Tối Ưu</Label>
            <textarea
              rows={2}
              placeholder="Mô tả sơ bộ về địa điểm, tiến độ yêu cầu hoặc các yêu cầu kỹ thuật đặc thù..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <DialogFooter className="pt-4 border-t border-[#334155] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
              <ShieldCheck className="h-4 w-4 text-[#D4A017] shrink-0" />
              <span>Bảo mật 100% theo ISO 27001</span>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold border-[#334155] bg-[#1E293B] text-white">
                Hủy
              </Button>
              <Button type="submit" className="rounded-xl bg-[#D4A017] text-[#0F172A] hover:bg-[#B8890F] font-extrabold text-xs uppercase tracking-wider shadow-md">
                GỬI YÊU CẦU BÁO GIÁ
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

