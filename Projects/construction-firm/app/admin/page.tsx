"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  FileText,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Plus,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { MEGA_PROJECTS } from "../../components/ProjectShowcase";

export default function AdminDashboardPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const chartData = [
    { month: "T1", bids: 4 },
    { month: "T2", bids: 7 },
    { month: "T3", bids: 5 },
    { month: "T4", bids: 9 },
    { month: "T5", bids: 6 },
    { month: "T6", bids: 12 },
    { month: "T7", bids: 8 },
  ];

  const recentInquiries = [
    { id: "inq-1", name: "Nguyễn Hoàng Nam", phone: "0901234567", project: "Nhà Máy Công Nghệ Bán Dẫn 50 Hecta", budget: "$120M USD", time: "15 phút trước", status: "Mới" },
    { id: "inq-2", name: "Phạm Hải Đăng", phone: "0912345678", project: "Tòa Tháp Văn Phòng Hạng A 45 Tầng", budget: "$85M USD", time: "2 giờ trước", status: "Đang đàm phán" },
    { id: "inq-3", name: "Trần Minh Trí", phone: "0988776655", project: "Trang Trại Điện Gió Ngoài Khơi 200MW", budget: "$210M USD", time: "5 giờ trước", status: "Đã gửi hồ sơ EPC" },
    { id: "inq-4", name: "Lê Thanh Tùng", phone: "0933445566", project: "Hạ Tầng Cảng Biển Nước Sâu Hòn Khoai", budget: "$350M USD", time: "Hôm qua", status: "Hoàn thành" },
  ];

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0B0F19] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#F4B942]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F4B942]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
            Tổng Quan Hệ Thống Vanguard Construct <Badge className="bg-[#0B0F19] text-[#F4B942] font-bold">EPC EMPIRE</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quản trị danh mục siêu dự án tỷ đô, tiến độ gói thầu EPC và yêu cầu tư vấn đầu tư.
          </p>
        </div>

        <Link href="/admin/projects">
          <Button className="bg-[#0B0F19] hover:bg-slate-800 text-[#F4B942] font-bold rounded-xl text-xs px-4 py-2.5 shadow-md">
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Siêu Dự Án Mới
          </Button>
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">GIÁ TRỊ DANH MỤC DỰ ÁN</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-[#F4B942] flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-extrabold text-2xl text-slate-900">$4.8 Billion</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">Active portfolio</span>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">SIÊU DỰ ÁN ĐÃ BÀN GIAO</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-extrabold text-2xl text-slate-900">450+ Mega</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">100% On-time</span>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">HỒ SƠ ĐẤU THẦU EPC HOT</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-extrabold text-2xl text-slate-900">12 Gói Thầu</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">+20% tỷ lệ trúng</span>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">KỶ LỤC AN TOÀN HSE</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-extrabold text-2xl text-slate-900">15.2M Giờ</span>
            <span className="text-xs text-emerald-600 font-bold ml-2">Zero-Incident</span>
          </div>
        </Card>
      </div>

      {/* 7-Month Chart & Top Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CSS Bar Chart */}
        <Card className="lg:col-span-7 bg-white border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#F4B942]" /> Thống Kê Gói Thầu EPC Nộp Mới (7 Tháng Gần Nhất)
            </h3>
            <span className="text-xs font-bold text-[#F4B942]">Tổng: 51 gói thầu</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#F4B942]">{d.bids}</span>
                <div
                  style={{ height: `${(d.bids / 15) * 100}%` }}
                  className="w-full max-w-[36px] bg-[#0B0F19] hover:bg-[#F4B942] rounded-t-xl transition-all"
                />
                <span className="text-[11px] text-slate-500 font-bold">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Mega Projects */}
        <Card className="lg:col-span-5 bg-white border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Siêu Dự Án Trọng Điểm
            </h3>
            <Link href="/admin/projects" className="text-xs font-bold text-[#0B0F19] hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {MEGA_PROJECTS.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-400 w-4">#{idx + 1}</span>
                  <div>
                    <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{p.code} • {p.value}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="font-bold text-[10px] bg-amber-100 text-amber-900">
                  {p.category}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Inquiries Table */}
      <Card className="bg-white border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#F4B942]" /> Yêu Cầu Báo Giá & Tư Vấn Mới Nhất
          </h3>
          <Link href="/admin/inquiries">
            <Button size="sm" variant="outline" className="text-xs font-bold text-[#0B0F19]">
              Quản Lý Yêu Cầu <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Tên Khách Hàng / Đối Tác</th>
                <th className="py-3.5 px-6">Số Điện Thoại</th>
                <th className="py-3.5 px-6">Tên Dự Án Quan Tâm</th>
                <th className="py-3.5 px-6">Ngân Sách Dự Kiến</th>
                <th className="py-3.5 px-6">Thời Gian</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{inq.name}</td>
                  <td className="py-3.5 px-6 font-mono text-[#0B0F19] font-bold">{inq.phone}</td>
                  <td className="py-3.5 px-6 text-slate-800">{inq.project}</td>
                  <td className="py-3.5 px-6 font-mono font-bold text-emerald-700">{inq.budget}</td>
                  <td className="py-3.5 px-6 text-slate-400">{inq.time}</td>
                  <td className="py-3.5 px-6">
                    <Badge
                      className={`font-bold border-none ${
                        inq.status === "Mới"
                          ? "bg-amber-100 text-amber-800"
                          : inq.status === "Đang đàm phán"
                          ? "bg-blue-100 text-blue-800"
                          : inq.status === "Đã gửi hồ sơ EPC"
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
