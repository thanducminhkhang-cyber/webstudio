"use client";

import React from "react";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";

const MONTHLY_REVENUE_BARS = [
  { day: "01", val: "6.2M", h: "40%" },
  { day: "05", val: "8.5M", h: "55%" },
  { day: "10", val: "7.1M", h: "45%" },
  { day: "15", val: "12.4M", h: "80%" },
  { day: "20", val: "9.8M", h: "62%" },
  { day: "25", val: "14.2M", h: "90%" },
  { day: "30", val: "15.8M", h: "100%" },
];

const TOP_REVENUE_PRODUCTS = [
  { name: "Glass Skin Discovery 4-Step Set", category: "Bộ sản phẩm", revenue: "126.420.000₫", share: "32%" },
  { name: "Aqua Dewy Glass Serum", category: "Chăm sóc da", revenue: "70.290.000₫", share: "22%" },
  { name: "Peony Glow Radiance Cream", category: "Chăm sóc da", revenue: "42.920.000₫", share: "14%" },
  { name: "Pure Vita C Brightening Shot", category: "Chăm sóc da", revenue: "40.300.000₫", share: "12%" },
  { name: "Botanical Centella Soothing Toner", category: "Chăm sóc da", revenue: "32.680.000₫", share: "10%" },
];

const TOP_SPEND_CUSTOMERS = [
  { name: "Nguyễn Thị Mai", email: "mai.nguyen@gmail.com", spent: "3.450.000₫", orders: 5 },
  { name: "Lê Hà My", email: "hamy.le@outlook.com", spent: "2.980.000₫", orders: 4 },
  { name: "Hoàng Minh Tú", email: "minhtu.hoang@gmail.com", spent: "2.150.000₫", orders: 3 },
  { name: "Trần Văn Hùng", email: "hung.tran@yahoo.com", spent: "1.840.000₫", orders: 2 },
  { name: "Đỗ Hải Yến", email: "haiyen.do@gmail.com", spent: "1.040.000₫", orders: 2 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Thống Kê Doanh Thu & Kinh Doanh
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Báo cáo chi tiết hiệu quả bán hàng và phân bổ chỉ số tháng này.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Doanh Thu Tháng Này</span>
            <div className="h-10 w-10 rounded-xl bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">245.800.000₫</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18.4% vs tháng trước
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Đơn Hàng Thành Công</span>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">482 Đơn</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> 94.2% hoàn thành
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Giá Trị TB / Đơn (AOV)</span>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">510.000₫</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +5.2% vs tháng trước
            </p>
          </div>
        </Card>

        <Card className="bg-white border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tỷ Lệ Hoàn Trả / Huỷ</span>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <RotateCcw className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">1.8%</h2>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3.5 w-3.5" /> -0.4% (Tốt)
            </p>
          </div>
        </Card>
      </div>

      {/* 30-Day Revenue Chart & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-8 bg-white border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Tăng Trưởng Doanh Thu (30 Ngày)</h3>
              <p className="text-xs text-slate-500">Biểu đồ tổng hợp chu kỳ 30 ngày gần nhất.</p>
            </div>
            <Badge className="bg-[#2D6A4F] text-white text-xs font-bold">Tháng 8 / 2026</Badge>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 pt-6 px-4">
            {MONTHLY_REVENUE_BARS.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.val}
                </span>
                <div
                  style={{ height: item.h }}
                  className="w-full bg-[#2D6A4F]/80 group-hover:bg-[#2D6A4F] rounded-t-xl transition-all duration-300 shadow-sm"
                />
                <span className="text-xs font-semibold text-slate-600">Ngày {item.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Status Distribution Grid */}
        <Card className="lg:col-span-4 bg-white border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">Phân Bổ Trạng Thái Đơn</h3>
            <p className="text-xs text-slate-500">Tỷ lệ đơn hàng phân theo quy trình.</p>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-xs text-slate-900">Đã Giao Thành Công</p>
                  <p className="text-[11px] text-slate-500">328 đơn hàng</p>
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-emerald-700">68%</span>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-bold text-xs text-slate-900">Đang Vận Chuyển</p>
                  <p className="text-[11px] text-slate-500">72 đơn hàng</p>
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-blue-700">15%</span>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-bold text-xs text-slate-900">Chờ Xác Nhận</p>
                  <p className="text-[11px] text-slate-500">58 đơn hàng</p>
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-amber-700">12%</span>
            </div>

            <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-bold text-xs text-slate-900">Đã Huỷ / Hoàn</p>
                  <p className="text-[11px] text-slate-500">24 đơn hàng</p>
                </div>
              </div>
              <span className="font-heading font-extrabold text-lg text-red-700">5%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Tables Grid: Products & Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Products Table */}
        <Card className="lg:col-span-6 bg-white border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-base text-slate-900">Top Sản Phẩm Doanh Thu Cao Nhất</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-5">Sản Phẩm</th>
                  <th className="py-3 px-5">Doanh Thu</th>
                  <th className="py-3 px-5 text-right">Tỷ Thị Phần</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {TOP_REVENUE_PRODUCTS.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{item.name}</td>
                    <td className="py-3.5 px-5 font-bold text-[#2D6A4F]">{item.revenue}</td>
                    <td className="py-3.5 px-5 text-right font-bold text-slate-700">{item.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Spend Customers Table */}
        <Card className="lg:col-span-6 bg-white border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-base text-slate-900">Top Khách Hàng Chi Tiêu Cao Nhất</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-5">Khách Hàng</th>
                  <th className="py-3 px-5">Số Đơn</th>
                  <th className="py-3 px-5 text-right">Tổng Chi Tiêu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {TOP_SPEND_CUSTOMERS.map((cust, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900">{cust.name}</p>
                      <p className="text-[10px] text-slate-400">{cust.email}</p>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700">{cust.orders} đơn</td>
                    <td className="py-3.5 px-5 text-right font-bold text-[#2D6A4F]">{cust.spent}</td>
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
