"use client";

import React from "react";
import Image from "next/image";
import {
  TrendingUp,
  Users,
  CreditCard,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";

const MONTHLY_REVENUE_BARS = [
  { day: "01", val: "4.2M", h: "35%" },
  { day: "05", val: "6.5M", h: "50%" },
  { day: "10", val: "5.1M", h: "40%" },
  { day: "15", val: "9.4M", h: "75%" },
  { day: "20", val: "8.8M", h: "68%" },
  { day: "25", val: "12.2M", h: "92%" },
  { day: "30", val: "13.8M", h: "100%" },
];

const TOP_REVENUE_COURSES = [
  { name: "IELTS Academic 7.0+ Intensive", category: "IELTS", revenue: "588.800.000₫", share: "35%" },
  { name: "TOEIC 800+ Luyện Đề Thực Chiến", category: "TOEIC", revenue: "282.580.000₫", share: "25%" },
  { name: "Giao Tiếp Tiếng Anh Tự Tin", category: "Giao Tiếp", revenue: "296.700.000₫", share: "20%" },
  { name: "Business English cho Dân Văn Phòng", category: "Business", revenue: "286.350.000₫", share: "12%" },
  { name: "Phát Âm Chuẩn Giọng Mỹ", category: "Giao Tiếp", revenue: "87.220.000₫", share: "5%" },
  { name: "Tiếng Anh Cho Trẻ Em (6-12 tuổi)", category: "Trẻ em", revenue: "270.400.000₫", share: "3%" },
];

const TOP_INSTRUCTORS_REVENUE = [
  { name: "Sarah Johnson", nationality: "Anh (Native)", revenue: "588.800.000₫", students: 184 },
  { name: "Nguyễn Minh Tuấn", nationality: "Việt Nam", revenue: "282.580.000₫", students: 142 },
  { name: "Emily Chen", nationality: "Mỹ (Native)", revenue: "296.700.000₫", students: 230 },
  { name: "David Miller", nationality: "Mỹ (Native)", revenue: "286.350.000₫", students: 115 },
  { name: "Trần Hà Linh", nationality: "Việt Nam", revenue: "87.220.000₫", students: 98 },
];

export default function AdminRevenuePage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Thống Kê Doanh Thu & Tuyển Sinh
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Báo cáo tổng hợp học phí, doanh thu khoá học và tỷ lệ đăng ký theo tháng.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Doanh Thu Tháng Này</span>
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">156.800.000₫</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18% vs tháng trước
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Đăng Ký Mới Tháng Này</span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">127 Lượt</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24% vs tháng trước
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Giá Trị TB / Đăng Ký (AOV)</span>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">1.234.000₫</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +6% vs tháng trước
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tỷ Lệ Hoàn Học Phí</span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <RotateCcw className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">0.5%</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3.5 w-3.5" /> -0.2% (Tốt)
            </p>
          </div>
        </Card>
      </div>

      {/* 30-Day Revenue Chart & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 bg-white border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Doanh Thu 30 Ngày Gần Nhất</h3>
              <p className="text-xs text-slate-500">Biểu đồ học phí thu về theo chu kỳ tháng.</p>
            </div>
            <Badge className="bg-blue-600 text-white text-xs font-bold">Tháng 8 / 2026</Badge>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 pt-6 px-4">
            {MONTHLY_REVENUE_BARS.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.val}
                </span>
                <div
                  style={{ height: item.h }}
                  className="w-full bg-blue-600/80 group-hover:bg-blue-600 rounded-t-xl transition-all duration-300 shadow-sm"
                />
                <span className="text-xs font-bold text-slate-600">Ngày {item.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution Grid */}
        <Card className="lg:col-span-4 bg-white border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">Phân Bổ Theo Danh Mục</h3>
            <p className="text-xs text-slate-500">Tỷ lệ lượt đăng ký theo mảng khoá học.</p>
          </div>

          <div className="space-y-3.5 text-xs font-bold">
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200/60 flex justify-between items-center text-blue-900">
              <span>IELTS Academic</span>
              <span className="font-heading text-base font-extrabold text-blue-700">35%</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 flex justify-between items-center text-amber-900">
              <span>TOEIC Luyện Đề</span>
              <span className="font-heading text-base font-extrabold text-amber-700">25%</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/60 flex justify-between items-center text-emerald-900">
              <span>Giao Tiếp Phản Xạ</span>
              <span className="font-heading text-base font-extrabold text-emerald-700">20%</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200/60 flex justify-between items-center text-purple-900">
              <span>Business English</span>
              <span className="font-heading text-base font-extrabold text-purple-700">12%</span>
            </div>
            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 flex justify-between items-center text-slate-900">
              <span>Tiếng Anh Trẻ Em</span>
              <span className="font-heading text-base font-extrabold text-slate-700">8%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Tables: Courses & Instructors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-6 bg-white border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-base text-slate-900">Top Khoá Học Doanh Thu Cao Nhất</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-5">Khoá Học</th>
                  <th className="py-3 px-5">Doanh Thu</th>
                  <th className="py-3 px-5 text-right">Tỷ Thị Phần</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {TOP_REVENUE_COURSES.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{item.name}</td>
                    <td className="py-3.5 px-5 font-bold text-blue-600">{item.revenue}</td>
                    <td className="py-3.5 px-5 text-right font-bold text-slate-700">{item.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6 bg-white border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-base text-slate-900">Top Giảng Viên Theo Doanh Thu</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-5">Giảng Viên</th>
                  <th className="py-3 px-5">Học Viên</th>
                  <th className="py-3 px-5 text-right">Tổng Doanh Thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {TOP_INSTRUCTORS_REVENUE.map((ins, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900">{ins.name}</p>
                      <p className="text-[10px] text-slate-400">{ins.nationality}</p>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-bold">{ins.students} HV</td>
                    <td className="py-3.5 px-5 text-right font-bold text-blue-600">{ins.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
