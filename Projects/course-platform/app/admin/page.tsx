"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";

const RECENT_ENROLLMENTS = [
  { id: "#REG-921", student: "Đặng Hoàng An", course: "IELTS Academic 7.0+ Intensive", amount: "3.200.000₫", time: "10 phút trước", status: "Đã thanh toán" },
  { id: "#REG-920", student: "Vũ Minh Phương", course: "TOEIC 800+ Luyện Đề Thực Chiến", amount: "1.990.000₫", time: "45 phút trước", status: "Đã thanh toán" },
  { id: "#REG-919", student: "Phạm Hải Đăng", course: "Giao Tiếp Tiếng Anh Tự Tin", amount: "1.290.000₫", time: "2 giờ trước", status: "Chờ chuyển khoản" },
  { id: "#REG-918", student: "Lê Ngọc Linh", course: "Business English cho Dân Văn Phòng", amount: "2.490.000₫", time: "4 giờ trước", status: "Đã thanh toán" },
  { id: "#REG-917", student: "Trịnh Bảo Nam", course: "Phát Âm Chuẩn Giọng Mỹ", amount: "890.000₫", time: "1 ngày trước", status: "Đã thanh toán" },
];

const TOP_COURSES = [
  { name: "IELTS Academic 7.0+ Intensive", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop", students: 184, revenue: "588.800.000₫", percent: 100 },
  { name: "TOEIC 800+ Luyện Đề Thực Chiến", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&auto=format&fit=crop", students: 142, revenue: "282.580.000₫", percent: 75 },
  { name: "Giao Tiếp Tiếng Anh Tự Tin", image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=200&auto=format&fit=crop", students: 230, revenue: "296.700.000₫", percent: 80 },
];

const WEEKLY_SIGNUPS = [
  { day: "T2", count: 18, height: "45%" },
  { day: "T3", count: 24, height: "60%" },
  { day: "T4", count: 15, height: "38%" },
  { day: "T5", count: 32, height: "80%" },
  { day: "T6", val: 28, height: "70%" },
  { day: "T7", val: 40, height: "100%" },
  { day: "CN", val: 35, height: "88%" },
];

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Tổng Quan Hoạt Động Trung Tâm
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Báo cáo học viên mới, doanh thu khóa học và hiệu suất tuyển sinh real-time.
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
            <span className="text-xs font-bold text-slate-500">Học Viên Mới</span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">127 Học Viên</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24% vs tháng trước
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Khoá Học Active</span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">6 Khoá Học</h2>
            <p className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +1 khoá mới thêm
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tỷ Lệ Hoàn Thành</span>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">87%</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +3% vs tháng trước
            </p>
          </div>
        </Card>
      </div>

      {/* Main Grid: Weekly Chart + Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-7 bg-white border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Số Lượng Đăng Ký (7 Ngày)</h3>
              <p className="text-xs text-slate-500">Tổng cộng 192 lượt đăng ký học tuần này.</p>
            </div>
            <Badge className="bg-blue-600 text-white font-bold text-xs">Tuần Này</Badge>
          </div>

          <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
            {WEEKLY_SIGNUPS.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.count || item.val}
                </span>
                <div
                  style={{ height: item.height }}
                  className="w-full bg-blue-600/80 group-hover:bg-blue-600 rounded-t-xl transition-all duration-300 shadow-sm"
                />
                <span className="text-xs font-bold text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-5 bg-white border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">Top 3 Khoá Học Đăng Ký Nhiều Nhất</h3>
            <Link href="/admin/courses" className="text-xs font-bold text-blue-600 hover:underline">
              Quản lý khoá học
            </Link>
          </div>

          <div className="space-y-4">
            {TOP_COURSES.map((course, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="relative h-8 w-8 rounded-lg overflow-hidden shrink-0 border">
                      <Image src={course.image} alt={course.name} fill className="object-cover" />
                    </div>
                    <span className="font-bold text-slate-900 truncate max-w-44">{course.name}</span>
                  </div>
                  <span className="font-bold text-blue-600 shrink-0">{course.revenue}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: `${course.percent}%` }} className="h-full bg-blue-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Registrations Table */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-slate-900">Đăng Ký Học Mới Nhất</h3>
            <p className="text-xs text-slate-500">Danh sách 5 học viên mới đăng ký các khoá học.</p>
          </div>
          <Link href="/admin/students">
            <Button variant="outline" size="sm" className="text-xs font-bold rounded-xl border-slate-200">
              Quản Lý Tất Cả Học Viên <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Mã Đăng Ký</th>
                <th className="py-3.5 px-6">Học Viên</th>
                <th className="py-3.5 px-6">Khoá Học</th>
                <th className="py-3.5 px-6">Học Phí</th>
                <th className="py-3.5 px-6">Thời Gian</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {RECENT_ENROLLMENTS.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">{reg.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{reg.student}</td>
                  <td className="py-4 px-6 text-slate-700 font-bold">{reg.course}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{reg.amount}</td>
                  <td className="py-4 px-6 text-slate-400">{reg.time}</td>
                  <td className="py-4 px-6">
                    <Badge className={`font-bold border-none ${reg.status === "Đã thanh toán" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {reg.status}
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
