"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  FileText,
  Eye,
  Building2,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Plus,
  Clock,
  ChevronRight,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { TILE_PRODUCTS } from "../page";

export default function AdminDashboardPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const chartData = [
    { day: "Thứ 2", requests: 12 },
    { day: "Thứ 3", requests: 18 },
    { day: "Thứ 4", requests: 15 },
    { day: "Thứ 5", requests: 24 },
    { day: "Thứ 6", requests: 20 },
    { day: "Thứ 7", requests: 31 },
    { day: "CN", requests: 16 },
  ];

  const recentInquiries = [
    { id: "inq-1", name: "Nguyễn Văn Hùng", phone: "0901234567", product: "ST-901 Calacatta Gold Slab", area: "150 m²", time: "10 phút trước", status: "Mới" },
    { id: "inq-2", name: "Trần Thị Mai", phone: "0912345678", product: "ST-903 Nero Marquina", area: "85 m²", time: "1 giờ trước", status: "Đang tư vấn" },
    { id: "inq-3", name: "Lê Hoàng Nam", phone: "0988776655", product: "ST-908 Cement Grey", area: "220 m²", time: "3 giờ trước", status: "Đã báo giá" },
    { id: "inq-4", name: "Phạm Hà Phương", phone: "0933445566", product: "ST-906 Oak Natural Wood", area: "120 m²", time: "Hôm qua", status: "Hoàn thành" },
    { id: "inq-5", name: "Vũ Hải Đăng", phone: "0977889900", product: "ST-909 Urban Ash Concrete", area: "310 m²", time: "Hôm qua", status: "Đang tư vấn" },
  ];

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#2A2724] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#9A7B4F]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#9A7B4F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
            Tổng Quan Showroom Stona <Badge className="bg-[#9A7B4F] text-white font-bold">STONE GALLERY</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Thống kê lượt yêu cầu báo giá, lượt xem catalog gạch và công trình đang tư vấn.
          </p>
        </div>

        <Link href="/admin/products">
          <Button className="bg-[#9A7B4F] hover:bg-[#85683F] text-white font-bold rounded-xl text-xs px-4 py-2.5 shadow-md">
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Mẫu Gạch Mới
          </Button>
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">TỔNG MẪU GẠCH</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-[#9A7B4F] flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-bold text-2xl text-slate-900">512</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">Active catalog</span>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">YÊU CẦU BÁO GIÁ THÁNG</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-[#9A7B4F] flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-bold text-2xl text-slate-900">87</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">+15% tháng này</span>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">LƯỢT XEM CATALOG</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-bold text-2xl text-slate-900">12.4K</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">+22% lượt xem</span>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">DỰ ÁN ĐANG TƯ VẤN</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-bold text-2xl text-slate-900">14</span>
            <span className="text-xs text-slate-500 font-bold ml-2">Biệt thự & Penhouse</span>
          </div>
        </Card>
      </div>

      {/* 7-Day Chart & Top Tiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CSS Bar Chart (7-day Inquiries) */}
        <Card className="lg:col-span-7 bg-white border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#9A7B4F]" /> Biểu Đồ Yêu Cầu Báo Giá (7 Ngày Gần Nhất)
            </h3>
            <span className="text-xs font-bold text-[#9A7B4F]">Tổng: 136 yêu cầu</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#9A7B4F]">{d.requests}</span>
                <div
                  style={{ height: `${(d.requests / 35) * 100}%` }}
                  className="w-full max-w-[36px] bg-[#9A7B4F] hover:bg-[#85683F] rounded-t-xl transition-all"
                />
                <span className="text-[11px] text-slate-500 font-bold">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top 5 Viewed Products */}
        <Card className="lg:col-span-5 bg-white border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Top Mẫu Gạch Được Xem Nhiều
            </h3>
            <Link href="/admin/products" className="text-xs font-bold text-[#9A7B4F] hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {TILE_PRODUCTS.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-400 w-4">#{idx + 1}</span>
                  <div>
                    <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{p.code} • {p.size}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {(980 - idx * 120)} views
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent 5 Quote Requests Table */}
      <Card className="bg-white border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#9A7B4F]" /> Yêu Cầu Báo Giá Mới Nhất
          </h3>
          <Link href="/admin/inquiries">
            <Button size="sm" variant="outline" className="text-xs font-bold text-[#9A7B4F]">
              Quản Lý Yêu Cầu <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Tên Khách</th>
                <th className="py-3.5 px-6">Số Điện Thoại</th>
                <th className="py-3.5 px-6">Mẫu Gạch Quan Tâm</th>
                <th className="py-3.5 px-6">Diện Tích</th>
                <th className="py-3.5 px-6">Thời Gian</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{inq.name}</td>
                  <td className="py-3.5 px-6 font-mono text-[#9A7B4F] font-bold">{inq.phone}</td>
                  <td className="py-3.5 px-6 text-slate-800">{inq.product}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{inq.area}</td>
                  <td className="py-3.5 px-6 text-slate-400">{inq.time}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
