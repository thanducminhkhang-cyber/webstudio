"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Phone,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

interface OrderDetail {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: { name: string; image: string; qty: number; price: string }[];
  subtotal: string;
  shippingFee: string;
  total: string;
  status: string;
  statusType: "success" | "info" | "warning" | "danger";
  date: string;
}

const INITIAL_ORDERS: OrderDetail[] = [
  {
    id: "#LM-1847",
    customer: "Nguyễn Thị Mai",
    phone: "0901234567",
    address: "123 Lê Lợi, P. Bến Nghé, Quận 1, TP.HCM",
    items: [{ name: "Aqua Dewy Glass Serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop", qty: 2, price: "495.000₫" }],
    subtotal: "990.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "990.000₫",
    status: "Đã giao",
    statusType: "success",
    date: "02/08/2026 14:20",
  },
  {
    id: "#LM-1846",
    customer: "Trần Văn Hùng",
    phone: "0912345678",
    address: "456 Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
    items: [
      { name: "Peony Glow Radiance Cream", image: "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=200&auto=format&fit=crop", qty: 1, price: "580.000₫" },
      { name: "Botanical Centella Soothing Toner", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop", qty: 1, price: "380.000₫" },
    ],
    subtotal: "960.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "960.000₫",
    status: "Đang giao",
    statusType: "info",
    date: "02/08/2026 13:10",
  },
  {
    id: "#LM-1845",
    customer: "Lê Hà My",
    phone: "0987654321",
    address: "789 Hoàng Hoa Thám, Quận Bình Thạnh, TP.HCM",
    items: [{ name: "Dewy Glass Garden Ritual Set", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop", qty: 1, price: "1.290.000₫" }],
    subtotal: "1.290.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "1.290.000₫",
    status: "Chờ xác nhận",
    statusType: "warning",
    date: "02/08/2026 11:45",
  },
  {
    id: "#LM-1844",
    customer: "Phạm Bảo Châu",
    phone: "0934567890",
    address: "12 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
    items: [{ name: "Pure Vita C Brightening Shot", image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop", qty: 1, price: "620.000₫" }],
    subtotal: "620.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "620.000₫",
    status: "Đã giao",
    statusType: "success",
    date: "02/08/2026 09:15",
  },
  {
    id: "#LM-1843",
    customer: "Hoàng Minh Tú",
    phone: "0945678901",
    address: "34 Nguyễn Huệ, Quận 1, TP.HCM",
    items: [
      { name: "Botanical Centella Soothing Toner", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop", qty: 1, price: "380.000₫" },
      { name: "Aqua Dewy Glass Serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop", qty: 1, price: "495.000₫" },
    ],
    subtotal: "875.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "875.000₫",
    status: "Đã huỷ",
    statusType: "danger",
    date: "01/08/2026 18:30",
  },
  {
    id: "#LM-1842",
    customer: "Đỗ Hải Yến",
    phone: "0976543210",
    address: "56 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội",
    items: [{ name: "Rose Quartz Velvet Cushion", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop", qty: 1, price: "520.000₫" }],
    subtotal: "520.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "520.000₫",
    status: "Đã giao",
    statusType: "success",
    date: "01/08/2026 15:10",
  },
  {
    id: "#LM-1841",
    customer: "Ngô Nhật Minh",
    phone: "0965432109",
    address: "88 Cầu Giấy, Quận Cầu Giấy, Hà Nội",
    items: [{ name: "Watery Sunscreen Fluid SPF50+", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200&auto=format&fit=crop", qty: 2, price: "420.000₫" }],
    subtotal: "840.000₫",
    shippingFee: "0₫ (Freeship)",
    total: "840.000₫",
    status: "Đang giao",
    statusType: "info",
    date: "01/08/2026 11:20",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderDetail[]>(INITIAL_ORDERS);
  const [filterTab, setFilterTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "Đang giao", statusType: "info" } : o
      )
    );
    showToast(`Đã xác nhận đơn hàng ${orderId}!`);
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "Đã huỷ", statusType: "danger" } : o
      )
    );
    showToast(`Đã huỷ đơn hàng ${orderId}!`);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      filterTab === "all"
        ? true
        : filterTab === "pending"
        ? order.status === "Chờ xác nhận"
        : filterTab === "shipping"
        ? order.status === "Đang giao"
        : filterTab === "delivered"
        ? order.status === "Đã giao"
        : order.status === "Đã huỷ";

    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#2D6A4F] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FFBE98]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Quản Lý Đơn Hàng
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Xem và xử lý tất cả đơn hàng phát sinh từ trang storefront.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm theo mã đơn hoặc tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <Button
          variant={filterTab === "all" ? "default" : "outline"}
          onClick={() => setFilterTab("all")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterTab === "all" ? "bg-[#2D6A4F] text-white" : "border-slate-200"}`}
        >
          Tất Cả ({orders.length})
        </Button>
        <Button
          variant={filterTab === "pending" ? "default" : "outline"}
          onClick={() => setFilterTab("pending")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterTab === "pending" ? "bg-amber-500 text-white" : "border-slate-200"}`}
        >
          Chờ Xác Nhận ({orders.filter((o) => o.status === "Chờ xác nhận").length})
        </Button>
        <Button
          variant={filterTab === "shipping" ? "default" : "outline"}
          onClick={() => setFilterTab("shipping")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterTab === "shipping" ? "bg-blue-500 text-white" : "border-slate-200"}`}
        >
          Đang Giao ({orders.filter((o) => o.status === "Đang giao").length})
        </Button>
        <Button
          variant={filterTab === "delivered" ? "default" : "outline"}
          onClick={() => setFilterTab("delivered")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterTab === "delivered" ? "bg-emerald-600 text-white" : "border-slate-200"}`}
        >
          Đã Giao ({orders.filter((o) => o.status === "Đã giao").length})
        </Button>
        <Button
          variant={filterTab === "cancelled" ? "default" : "outline"}
          onClick={() => setFilterTab("cancelled")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterTab === "cancelled" ? "bg-red-500 text-white" : "border-slate-200"}`}
        >
          Đã Huỷ ({orders.filter((o) => o.status === "Đã huỷ").length})
        </Button>
      </div>

      {/* Orders Table Card */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
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
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-sm font-medium">
                    Không tìm thấy đơn hàng phù hợp.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#2D6A4F]">{order.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{order.customer}</td>
                    <td className="py-4 px-6 text-slate-700 max-w-xs truncate">
                      {order.items.map((i) => `${i.name} (x${i.qty})`).join(", ")}
                    </td>
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
                    <td className="py-4 px-6 text-slate-400">{order.date}</td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs font-bold rounded-xl border-slate-200 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white"
                      >
                        <Eye className="mr-1 h-3.5 w-3.5" /> Xem Chi Tiết
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Hiển thị 1 - {filteredOrders.length} của {orders.length} đơn hàng</span>
          <div className="flex items-center gap-2 font-semibold">
            <Button variant="outline" size="sm" disabled className="rounded-xl border-slate-200 text-xs">
              <ChevronLeft className="h-4 w-4" /> Trước
            </Button>
            <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">Trang 1 / 1</span>
            <Button variant="outline" size="sm" disabled className="rounded-xl border-slate-200 text-xs">
              Sau <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Order Detail Dialog Modal */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl bg-white rounded-3xl p-6 space-y-6">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <div className="flex justify-between items-center">
                <DialogTitle className="font-heading font-extrabold text-xl text-slate-900">
                  Chi Tiết Đơn Hàng {selectedOrder.id}
                </DialogTitle>
                <Badge
                  className={`font-semibold border-none px-3 py-1 text-xs ${
                    selectedOrder.statusType === "success"
                      ? "bg-emerald-100 text-emerald-800"
                      : selectedOrder.statusType === "info"
                      ? "bg-blue-100 text-blue-800"
                      : selectedOrder.statusType === "warning"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedOrder.status}
                </Badge>
              </div>
            </DialogHeader>

            {/* Customer Info */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
              <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-[#2D6A4F]" /> {selectedOrder.customer}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" /> {selectedOrder.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> {selectedOrder.address}
              </p>
            </div>

            {/* Products List */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Danh Sách Sản Phẩm</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-white">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-slate-400">Số lượng: x{item.qty}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#2D6A4F]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="border-t border-slate-100 pt-4 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="font-bold text-slate-900">{selectedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-bold text-slate-900">{selectedOrder.shippingFee}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-100 pt-2">
                <span>Tổng cộng:</span>
                <span className="text-[#2D6A4F]">{selectedOrder.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <DialogFooter className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => handleCancelOrder(selectedOrder.id)}
                className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold"
              >
                <XCircle className="mr-1.5 h-4 w-4" /> Huỷ Đơn Hàng
              </Button>
              <Button
                onClick={() => handleConfirmOrder(selectedOrder.id)}
                className="rounded-xl bg-[#2D6A4F] text-white hover:bg-[#2D6A4F]/90 text-xs font-bold"
              >
                <CheckCircle2 className="mr-1.5 h-4 w-4" /> Xác Nhận Đơn Hàng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
