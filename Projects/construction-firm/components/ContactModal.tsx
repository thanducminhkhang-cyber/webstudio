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
    email: "",
    projectType: "General Contracting EPC",
    budget: "$10M - $50M USD",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onClose();
    onSubmitSuccess("🎉 Đã gửi yêu cầu tư vấn dự án thành công! Ban Quản Lý Tổng Thầu Vanguard Construct sẽ liên hệ với bạn trong vòng 12h làm việc.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: "General Contracting EPC",
      budget: "$10M - $50M USD",
      message: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#0B0F19] text-white rounded-3xl p-6 border border-white/20 shadow-2xl">
        <DialogHeader className="border-b border-white/10 pb-4">
          <span className="text-[11px] font-mono font-bold text-[#F4B942] uppercase tracking-widest block">
            VANGUARD CONSTRUCT CONSULTATION
          </span>
          <DialogTitle className="font-heading font-extrabold text-2xl uppercase text-white mt-1">
            Đăng Ký Tư Vấn & Báo Giá Dự Án
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Họ và Tên *</Label>
            <Input
              required
              placeholder="Ví dụ: Nguyễn Văn Hùng"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="text-xs bg-white/5 border-white/10 text-white rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Số Điện Thoại *</Label>
              <Input
                required
                placeholder="0901234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-xs bg-white/5 border-white/10 text-white font-mono rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Email Công Ty</Label>
              <Input
                type="email"
                placeholder="hung.nguyen@corp.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-xs bg-white/5 border-white/10 text-white rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-300">Loại Hình Dự Án</Label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-[#151C28] border border-white/10 text-xs font-semibold text-white"
              >
                <option value="General Contracting EPC">General Contracting EPC</option>
                <option value="Industrial Mega Plant">Industrial Mega Plant (Nhà máy bán dẫn)</option>
                <option value="Skyscraper Office">Skyscraper Financial Tower</option>
                <option value="Civil Infrastructure">Infrastructure & Bridges</option>
                <option value="Clean Energy">Offshore Wind / Clean Energy</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-[#F4B942]">Ngân Sách Dự Kiến</Label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-[#151C28] border border-white/10 text-xs font-semibold text-white"
              >
                <option value="<$10M USD">{"< $10M USD"}</option>
                <option value="$10M - $50M USD">$10M - $50M USD</option>
                <option value="$50M - $200M USD">$50M - $200M USD</option>
                <option value=">$200M USD">{"> $200M USD (Siêu dự án)"}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-300">Mô Tả Sơ Bộ Yêu Cầu</Label>
            <textarea
              rows={3}
              placeholder="Yêu cầu diện tích sàn, địa điểm thi công, mốc thời gian hoàn thành mong muốn..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#F4B942]"
            />
          </div>

          <DialogFooter className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold border-white/20 text-white">
              Hủy
            </Button>
            <Button type="submit" className="rounded-xl bg-[#F4B942] text-[#0B0F19] hover:bg-[#e0a430] font-extrabold text-xs">
              Gửi Đăng Ký Tư Vấn (EPC Project)
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
