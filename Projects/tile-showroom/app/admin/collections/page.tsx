"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, CheckCircle2, FolderTree } from "lucide-react";
import { Card, CardContent } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";

export default function AdminCollectionsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const collections = [
    { id: "col-1", name: "Marble Series", count: 180, desc: "Gạch giả đá cẩm thạch Ý & Tây Ban Nha sang trọng", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop" },
    { id: "col-2", name: "Stone Series", count: 120, desc: "Gạch vân đá tự nhiên mờ nhám kiến trúc", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop" },
    { id: "col-3", name: "Wood-look", count: 85, desc: "Gạch giả vân gỗ tự nhiên chống mối mọt", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop" },
    { id: "col-4", name: "Concrete", count: 65, desc: "Gạch giả bê tông xi măng phong cách Loft", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
    { id: "col-5", name: "Terrazzo", count: 42, desc: "Gạch đá mài Terrazzo phong cách Retro", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop" },
    { id: "col-6", name: "Mosaic", count: 20, desc: "Gạch trang trí lục giác & vảy cá điểm nhấn", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop" },
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
            Quản Lý Bộ Sưu Tập <Badge className="bg-[#2563EB] text-white">DEMO</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Danh mục các dòng sản phẩm gạch men tại Stona Slab.</p>
        </div>

        <Button onClick={() => showToast("Đã mở form thêm bộ sưu tập!")} className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-bold rounded-xl text-xs px-4 py-2.5 shadow-md">
          <Plus className="mr-1.5 h-4 w-4" /> Thêm Bộ Sưu Tập Mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Card key={col.id} className="bg-white border-slate-200 overflow-hidden rounded-2xl shadow-xs space-y-3 p-5">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border">
              <Image src={col.image} alt={col.name} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-base text-slate-900">{col.name}</h3>
              <Badge variant="secondary" className="font-bold font-mono">{col.count} mẫu</Badge>
            </div>
            <p className="text-xs text-slate-500">{col.desc}</p>
            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button size="sm" variant="outline" onClick={() => showToast(`Chỉnh sửa ${col.name}`)} className="text-xs font-bold text-[#2563EB]">
                <Edit2 className="mr-1 h-3.5 w-3.5" /> Sửa
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
