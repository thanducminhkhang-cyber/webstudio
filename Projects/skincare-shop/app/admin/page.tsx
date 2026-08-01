"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Target,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";

const RECENT_ORDERS = [
  {
    id: "#LM-1847",
    customer: "Nguyễn Thị Mai",
    product: "Aqua Dewy Glass Serum x2",
    total: "990.000₫",
    status: "Đã giao",
    statusType: "success",
    time: "2 giờ trước",
  },
  {
    id: "#LM-1846",
    customer: "Trần Văn Hùng",
    product: "Peony Glow Cream + Toner",
    total: "960.000₫",
    status: "Đang giao",
    statusType: "info",
    time: "3 giờ trước",
  },
  {
    id: "#LM-1845",
    customer: "Lê Hà My",
    product: "Glass Skin Set (combo)",
    total: "1.450.000₫",
    status: "Chờ xác nhận",
    statusType: "warning",
    time: "5 giờ trước",
  },
  {
    id: "#LM-1844",
    customer: "Phạm Bảo Châu",
    product: "Vita C Brightening Shot",
    total: "620.000₫",
    status: "Đã giao",
    statusType: "success",
    time: "8 giờ trước",
  },
  {
    id: "#LM-1843",
    customer: "Hoàng Minh Tú",
    product: "Centella Toner + Serum",
    total: "875.000₫",
    status: "Đã huỷ",
    statusType: "danger",
    time: "1 ngày trước",
  },
];

const TOP_PRODUCTS = [
  {
    name: "Aqua Dewy Glass Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
    sales: 142,
    revenue: "70.290.000₫",
    percent: 100,
  },
  {
    name: "Glass Skin Discovery 4-Step Set",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop",
    sales: 98,
    revenue: "126.420.000₫",
    percent: 85,
  },
  {
    name: "Botanical Centella Soothing Toner",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
    sales: 86,
    revenue: "32.680.000₫",
    percent: 70,
  },
  {
    name: "Peony Glow Radiance Cream",
    image: "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=200&auto=format&fit=crop",
    sales: 74,
    revenue: "42.920.000₫",
    percent: 60,
  },
  {
    name: "Pure Vita C Brightening Shot",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop",
    sales: 65,
    revenue: "40.300.000₫",
    percent: 50,
  },
];

const WEEKLY_DATA = [
  { day: "T2", val: 8.2, height: "55%" },
  { day: "T3", val: 6.5, height: "42%" },
  { day: "T4", val: 9.1, height: "62%" },
  { day: "T5", val: 7.8, height: "50%" },
  { day: "T6", val: 12.4, height: "80%" },
  { day: "T7", val: 15.2, height: "100%" },
  { day: "CN", val: 11.5, height: "74%" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Tổng Quan Cửa Hàng
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Theo dõi doanh thu, đơn hàng và các chỉ số hoạt động kinh doanh real-time.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-white border-slate-200 p-5 shadow-xs hover:border-[#2D6A4F]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Doanh Thu Hôm Nay</span>
            <div className="h-10 w-10 rounded-xl bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">12.450.000₫</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +23% vs hôm qua
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs hover:border-[#2D6A4F]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Đơn Hàng Mới</span>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">28 Đơn</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +12% vs hôm qua
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs hover:border-[#2D6A4F]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Khách Hàng Mới</span>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">15 Khách</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +8% vs hôm qua
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs hover:border-[#2D6A4F]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tỷ Lệ Chuyển Đổi</span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">3.2%</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +0.5% vs tuần trước
            </p>
          </div>
        </Card>
      </div>

      {/* Main Grid: Revenue Chart + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Revenue Bar Chart (7 Cols) */}
        <Card className="lg:col-span-7 bg-white border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Biểu Đồ Doanh Thu (7 Ngày)</h3>
              <p className="text-xs text-slate-500">Tổng doanh thu tuần này: 70.6M₫</p>
            </div>
            <Badge variant="outline" className="text-xs font-semibold border-slate-200 text-[#2D6A4F]">
              Tuần Này
            </Badge>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {WEEKLY_DATA.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.val}M
                </span>
                <div
                  style={{ height: item.height }}
                  className="w-full bg-[#2D6A4F]/80 group-hover:bg-[#2D6A4F] rounded-t-xl transition-all duration-300 shadow-sm"
                />
                <span className="text-xs font-semibold text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top 5 Products List (5 Cols) */}
        <Card className="lg:col-span-5 bg-white border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">Top Sản Phẩm Bán Chạy</h3>
            <Link href="/admin/products" className="text-xs font-bold text-[#2D6A4F] hover:underline">
              Tất cả
            </Link>
          </div>

          <div className="space-y-4">
            {TOP_PRODUCTS.map((prod, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="relative h-8 w-8 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                    </div>
                    <span className="font-bold text-slate-900 truncate max-w-44">{prod.name}</span>
                  </div>
                  <span className="font-bold text-[#2D6A4F] shrink-0">{prod.revenue}</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${prod.percent}%` }}
                    className="h-full bg-[#2D6A4F] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-slate-900">Đơn Hàng Gần Đây</h3>
            <p className="text-xs text-slate-500">Hiển thị 5 đơn hàng mới phát sinh nhất.</p>
          </div>
          <Link href="/admin/orders">
            <Button variant="outline" size="sm" className="text-xs font-bold rounded-xl border-slate-200">
              Quản Lý Tất Cả Đơn Hàng <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Mã Đơn</th>
                <th className="py-3.5 px-6">Khách Hàng</th>
                <th className="py-3.5 px-6">Sản Phẩm</th>
                <th className="py-3.5 px-6">Tổng Tiền</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
                <th className="py-3.5 px-6">Thời Gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#2D6A4F]">{order.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{order.customer}</td>
                  <td className="py-4 px-6 text-slate-700">{order.product}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{order.total}</td>
                  <td className="py-4 px-6">
                    <Badge
                      className={`font-semibold border-none px-2.5 py-1 text-[11px] ${
                        order.statusType === "success"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.statusType === "info"
                          ? "bg-blue-100 text-blue-800"
                          : order.statusType === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
