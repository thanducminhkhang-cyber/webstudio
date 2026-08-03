"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, CheckCircle2, Building2 } from "lucide-react";
import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";

export default function AdminProjectsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const projects = [
    { id: "p1", title: "Biệt Thự Thảo Điền Quận 2", type: "Biệt thự cao cấp", tileUsed: "ST-901 Calacatta Gold Slab", status: "Đã hoàn thành", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop" },
    { id: "p2", title: "Phòng Tắm Master Villa Heritage", type: "Villa nghỉ dưỡng", tileUsed: "ST-902 Statuario White", status: "Đã hoàn thành", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format&fit=crop" },
    { id: "p3", title: "Mặt Tiền Showroom Porsche HCM", type: "Showroom thương mại", tileUsed: "ST-909 Urban Ash Big Slab", status: "Đang thi công", image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=400&auto=format&fit=crop" },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

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
            Quản Lý Dự Án / Công Trình <Badge className="bg-[#2563EB] text-white">DEMO</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Danh sách công trình đã cung cấp gạch Stona Slab.</p>
        </div>

        <Button onClick={() => showToast("Đã mở form thêm dự án!")} className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-bold rounded-xl text-xs px-4 py-2.5 shadow-md">
          <Plus className="mr-1.5 h-4 w-4" /> Thêm Dự Án Mới
        </Button>
      </div>

      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-6">Ảnh Dự Án</th>
              <th className="py-3.5 px-6">Tên Dự Án</th>
              <th className="py-3.5 px-6">Loại Công Trình</th>
              <th className="py-3.5 px-6">Gạch Sử Dụng</th>
              <th className="py-3.5 px-6">Trạng Thái</th>
              <th className="py-3.5 px-6 text-right">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-6">
                  <div className="relative h-12 w-20 rounded-xl overflow-hidden bg-slate-100 border">
                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                  </div>
                </td>
                <td className="py-3.5 px-6 font-bold text-slate-900">{p.title}</td>
                <td className="py-3.5 px-6 text-slate-700">{p.type}</td>
                <td className="py-3.5 px-6 font-bold text-[#2563EB]">{p.tileUsed}</td>
                <td className="py-3.5 px-6">
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold">{p.status}</Badge>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <Button size="sm" variant="outline" onClick={() => showToast(`Đã chọn sửa dự án ${p.title}`)} className="text-xs font-bold rounded-xl border-slate-200 text-[#2563EB]">
                    <Edit2 className="mr-1 h-3.5 w-3.5" /> Sửa
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
