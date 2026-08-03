"use client";

import React, { useState } from "react";
import { CheckCircle2, FileText, Filter, Check } from "lucide-react";
import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";

export default function AdminInquiriesPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const inquiries = [
    { id: "inq-1", name: "Nguyễn Văn Hùng", phone: "0901234567", product: "ST-901 Calacatta Gold Slab", area: "150 m²", date: "2026-08-03", status: "Mới" },
    { id: "inq-2", name: "Trần Thị Mai", phone: "0912345678", product: "ST-903 Nero Marquina", area: "85 m²", date: "2026-08-03", status: "Đang tư vấn" },
    { id: "inq-3", name: "Lê Hoàng Nam", phone: "0988776655", product: "ST-908 Cement Grey", area: "220 m²", date: "2026-08-02", status: "Đã báo giá" },
    { id: "inq-4", name: "Phạm Hà Phương", phone: "0933445566", product: "ST-906 Oak Natural Wood", area: "120 m²", date: "2026-08-01", status: "Hoàn thành" },
    { id: "inq-5", name: "Vũ Hải Đăng", phone: "0977889900", product: "ST-909 Urban Ash Big Slab", area: "310 m²", date: "2026-08-01", status: "Đang tư vấn" },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredInquiries =
    filterStatus === "all"
      ? inquiries
      : inquiries.filter((i) => i.status === filterStatus);

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0F172A] text-white px-5 py-3.5 font-medium shadow-2xl text-sm border border-[#2563EB]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2563EB]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2">
            Quản Lý Yêu Cầu Báo Giá <Badge className="bg-[#2563EB] text-white">DEMO</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Danh sách thông tin khách hàng gửi yêu cầu nhận báo giá m².</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={`text-xs font-bold rounded-xl ${filterStatus === "all" ? "bg-[#2563EB] text-white" : ""}`}
          >
            Tất Cả (5)
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "Mới" ? "default" : "outline"}
            onClick={() => setFilterStatus("Mới")}
            className={`text-xs font-bold rounded-xl ${filterStatus === "Mới" ? "bg-[#2563EB] text-white" : ""}`}
          >
            Mới (1)
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "Đang tư vấn" ? "default" : "outline"}
            onClick={() => setFilterStatus("Đang tư vấn")}
            className={`text-xs font-bold rounded-xl ${filterStatus === "Đang tư vấn" ? "bg-[#2563EB] text-white" : ""}`}
          >
            Đang Tư Vấn (2)
          </Button>
        </div>
      </div>

      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-6">Tên Khách Hàng</th>
              <th className="py-3.5 px-6">Số Điện Thoại Zalo</th>
              <th className="py-3.5 px-6">Mẫu Gạch Quan Tâm</th>
              <th className="py-3.5 px-6">Diện Tích (m²)</th>
              <th className="py-3.5 px-6">Ngày Gửi</th>
              <th className="py-3.5 px-6">Trạng Thái</th>
              <th className="py-3.5 px-6 text-right">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredInquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-6 font-bold text-slate-900">{inq.name}</td>
                <td className="py-3.5 px-6 font-mono text-[#2563EB] font-bold">{inq.phone}</td>
                <td className="py-3.5 px-6 font-bold text-slate-800">{inq.product}</td>
                <td className="py-3.5 px-6 font-bold text-slate-900">{inq.area}</td>
                <td className="py-3.5 px-6 text-slate-400">{inq.date}</td>
                <td className="py-3.5 px-6">
                  <Badge
                    className={`font-bold border-none ${
                      inq.status === "Mới"
                        ? "bg-amber-100 text-amber-800"
                        : inq.status === "Đang tư vấn"
                        ? "bg-blue-100 text-blue-800"
                        : inq.status === "Đã báo giá"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {inq.status}
                  </Badge>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => showToast(`✅ Đã đánh dấu liên hệ khách hàng ${inq.name}!`)}
                    className="text-xs font-bold rounded-xl border-slate-200 text-[#2563EB]"
                  >
                    <Check className="mr-1 h-3.5 w-3.5 text-[#2563EB]" /> Đã Liên Hệ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
