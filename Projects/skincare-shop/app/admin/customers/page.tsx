"use client";

import React, { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Eye,
  CheckCircle2,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  totalSpentFormatted: string;
  joinedDate: string;
  isVip: boolean;
  isNew: boolean;
  history: { id: string; date: string; items: string; total: string }[];
  note?: string;
}

const CUSTOMERS_DATA: Customer[] = [
  {
    id: "c1",
    name: "Nguyễn Thị Mai",
    initials: "NM",
    email: "mai.nguyen@gmail.com",
    phone: "0901234567",
    ordersCount: 5,
    totalSpent: 3450000,
    totalSpentFormatted: "3.450.000₫",
    joinedDate: "15/01/2026",
    isVip: true,
    isNew: false,
    history: [
      { id: "#LM-1847", date: "02/08/2026", items: "Aqua Dewy Glass Serum x2", total: "990.000₫" },
      { id: "#LM-1720", date: "15/06/2026", items: "Glass Skin Discovery Set", total: "1.290.000₫" },
      { id: "#LM-1580", date: "10/04/2026", items: "Rose Quartz Cushion", total: "520.000₫" },
    ],
    note: "Khách hàng thân thiết, thường dùng dòng Aqua Serum.",
  },
  {
    id: "c2",
    name: "Trần Văn Hùng",
    initials: "TH",
    email: "hung.tran@yahoo.com",
    phone: "0912345678",
    ordersCount: 2,
    totalSpent: 1840000,
    totalSpentFormatted: "1.840.000₫",
    joinedDate: "28/07/2026",
    isVip: false,
    isNew: true,
    history: [
      { id: "#LM-1846", date: "02/08/2026", items: "Peony Glow Cream + Toner", total: "960.000₫" },
      { id: "#LM-1810", date: "28/07/2026", items: "Watery Sunscreen Fluid", total: "420.000₫" },
    ],
  },
  {
    id: "c3",
    name: "Lê Hà My",
    initials: "LM",
    email: "hamy.le@outlook.com",
    phone: "0987654321",
    ordersCount: 4,
    totalSpent: 2980000,
    totalSpentFormatted: "2.980.000₫",
    joinedDate: "10/03/2026",
    isVip: true,
    isNew: false,
    history: [
      { id: "#LM-1845", date: "02/08/2026", items: "Dewy Glass Garden Set", total: "1.290.000₫" },
      { id: "#LM-1650", date: "20/05/2026", items: "Pure Vita C Shot", total: "620.000₫" },
    ],
  },
  {
    id: "c4",
    name: "Phạm Bảo Châu",
    initials: "PC",
    email: "bao.chau@gmail.com",
    phone: "0934567890",
    ordersCount: 1,
    totalSpent: 620000,
    totalSpentFormatted: "620.000₫",
    joinedDate: "30/07/2026",
    isVip: false,
    isNew: true,
    history: [
      { id: "#LM-1844", date: "02/08/2026", items: "Pure Vita C Shot", total: "620.000₫" },
    ],
  },
  {
    id: "c5",
    name: "Hoàng Minh Tú",
    initials: "HT",
    email: "minhtu.hoang@gmail.com",
    phone: "0945678901",
    ordersCount: 3,
    totalSpent: 2150000,
    totalSpentFormatted: "2.150.000₫",
    joinedDate: "05/02/2026",
    isVip: true,
    isNew: false,
    history: [
      { id: "#LM-1843", date: "01/08/2026", items: "Centella Toner + Serum", total: "875.000₫" },
    ],
  },
  {
    id: "c6",
    name: "Đỗ Hải Yến",
    initials: "DY",
    email: "haiyen.do@gmail.com",
    phone: "0976543210",
    ordersCount: 2,
    totalSpent: 1040000,
    totalSpentFormatted: "1.040.000₫",
    joinedDate: "12/04/2026",
    isVip: false,
    isNew: false,
    history: [
      { id: "#LM-1842", date: "01/08/2026", items: "Rose Quartz Cushion", total: "520.000₫" },
    ],
  },
  {
    id: "c7",
    name: "Ngô Nhật Minh",
    initials: "NM",
    email: "nhatminh.ngo@gmail.com",
    phone: "0965432109",
    ordersCount: 1,
    totalSpent: 840000,
    totalSpentFormatted: "840.000₫",
    joinedDate: "01/08/2026",
    isVip: false,
    isNew: true,
    history: [
      { id: "#LM-1841", date: "01/08/2026", items: "Watery Sunscreen x2", total: "840.000₫" },
    ],
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS_DATA);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Quản Lý Khách Hàng
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Danh sách {customers.length} khách hàng đã đăng ký và phát sinh đơn hàng.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm theo tên, email, SĐT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Customers Table Card */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Khách Hàng</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Số Điện Thoại</th>
                <th className="py-3.5 px-6">Số Đơn</th>
                <th className="py-3.5 px-6">Tổng Chi Tiêu</th>
                <th className="py-3.5 px-6">Ngày Phân Hạng</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#2D6A4F] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {c.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          {c.name}
                          {c.isVip && (
                            <Badge className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-1.5 py-0 border-none">
                              VIP
                            </Badge>
                          )}
                          {c.isNew && (
                            <Badge className="bg-blue-100 text-blue-800 font-extrabold text-[10px] px-1.5 py-0 border-none">
                              Mới
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{c.email}</td>
                  <td className="py-4 px-6 font-mono text-slate-700">{c.phone}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{c.ordersCount} đơn</td>
                  <td className="py-4 px-6 font-bold text-[#2D6A4F]">{c.totalSpentFormatted}</td>
                  <td className="py-4 px-6 text-slate-400">{c.joinedDate}</td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedCustomer(c)}
                      className="text-xs font-bold rounded-xl border-slate-200 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white"
                    >
                      <Eye className="mr-1 h-3.5 w-3.5" /> Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Profile Dialog Modal */}
      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6 space-y-6">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#2D6A4F] text-white font-extrabold text-base flex items-center justify-center">
                  {selectedCustomer.initials}
                </div>
                <div>
                  <DialogTitle className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                    {selectedCustomer.name}
                    {selectedCustomer.isVip && (
                      <Badge className="bg-amber-400 text-slate-950 font-bold text-[10px]">
                        Hạng VIP
                      </Badge>
                    )}
                  </DialogTitle>
                  <p className="text-xs text-slate-400">{selectedCustomer.email}</p>
                </div>
              </div>
            </DialogHeader>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[11px] text-slate-400">Tổng Số Đơn Hàng</p>
                <p className="font-heading font-extrabold text-lg text-slate-900 mt-0.5">
                  {selectedCustomer.ordersCount} Đơn
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[11px] text-slate-400">Tổng Chi Tiêu</p>
                <p className="font-heading font-extrabold text-lg text-[#2D6A4F] mt-0.5">
                  {selectedCustomer.totalSpentFormatted}
                </p>
              </div>
            </div>

            {/* Past Order History */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Lịch Sử Đơn Hàng Mới Nhất</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white text-xs">
                {selectedCustomer.history.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#2D6A4F]">{item.id}</span>
                      <span className="text-slate-400 text-[11px] ml-2">({item.date})</span>
                      <p className="text-slate-700 font-medium mt-0.5">{item.items}</p>
                    </div>
                    <span className="font-bold text-slate-900">{item.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedCustomer.note && (
              <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-xs text-amber-900">
                <span className="font-bold">Ghi chú quản trị:</span> {selectedCustomer.note}
              </div>
            )}

            <DialogFooter className="pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setSelectedCustomer(null)}
                className="w-full rounded-xl border-slate-200 text-xs font-bold"
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
