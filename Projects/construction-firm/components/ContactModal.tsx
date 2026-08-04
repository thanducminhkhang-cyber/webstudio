"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export default function ContactModal({ isOpen, onClose, onSubmitSuccess }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "Hạ tầng / Đường sắt đô thị",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onClose();
    onSubmitSuccess("🎉 Đã nhận thông tin đăng ký! Kỹ sư trưởng Vanguard Construct sẽ liên hệ báo giá tư vấn trong vòng 24h.");
    setFormData({
      name: "",
      phone: "",
      projectType: "Hạ tầng / Đường sắt đô thị",
      message: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0F172A] text-white rounded-2xl p-6 border border-[#334155] shadow-2xl">
        <DialogHeader className="border-b border-[#334155] pb-4">
          <span className="text-[11px] font-mono font-bold text-[#D4A017] uppercase tracking-widest block">
            VANGUARD CONSTRUCT LEAD CONSULTATION
          </span>
          <DialogTitle className="font-heading font-extrabold text-2xl uppercase text-white mt-1">
            Nhận Báo Giá Miễn Phí
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
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
            <Label className="text-xs font-bold text-white">Loại Công Trình</Label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full h-10 px-3 rounded-xl bg-[#1E293B] border border-[#334155] text-xs font-semibold text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="Hạ tầng / Đường sắt đô thị">Hạ tầng / Đường sắt đô thị</option>
              <option value="Nhà máy / Khu công nghiệp">Nhà máy / Khu công nghiệp</option>
              <option value="Tòa tháp cao ốc / Thương mại">Tòa tháp cao ốc / Thương mại</option>
              <option value="Năng lượng tái tạo">Năng lượng tái tạo</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Field 4: Ghi Chú / Nhu Cầu */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-white">Ghi Chú / Nhu Cầu</Label>
            <textarea
              rows={3}
              placeholder="Mô tả sơ bộ về diện tích, địa điểm hoặc thời gian hoàn thành mong muốn..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <DialogFooter className="pt-4 border-t border-[#334155] flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold border-[#334155] bg-[#1E293B] text-white">
              Hủy
            </Button>
            <Button type="submit" className="rounded-xl bg-[#D4A017] text-[#0F172A] hover:bg-[#B8890F] font-extrabold text-xs uppercase tracking-wider">
              NHẬN BÁO GIÁ MIỄN PHÍ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
