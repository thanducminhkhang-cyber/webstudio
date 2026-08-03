"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  Menu,
  CheckCircle2,
  ChevronRight,
  HardHat,
} from "lucide-react";

import { Button } from "@wsos/ui/components/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const navItems = [
    { href: "/admin", label: "Tổng Quan", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Quản Lý Dự Án ⭐", icon: Building2 },
    { href: "/admin/bids", label: "Hồ Sơ Đấu Thầu EPC", icon: Briefcase },
    { href: "/admin/inquiries", label: "Yêu Cầu Báo Giá", icon: FileText },
  ];

  const getPageTitle = () => {
    if (pathname === "/admin") return "Tổng Quan";
    if (pathname === "/admin/projects") return "Quản Lý Siêu Dự Án";
    if (pathname === "/admin/bids") return "Quản Lý Hồ Sơ Đấu Thầu EPC";
    if (pathname === "/admin/inquiries") return "Quản Lý Yêu Cầu Báo Giá";
    return "Admin Dashboard";
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 font-sans flex flex-col selection:bg-[#F4B942]/20 selection:text-[#0B0F19]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0B0F19] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#F4B942]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F4B942]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Demo Mode Banner */}
      <div className="bg-amber-100 border-b border-amber-200 text-amber-900 text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <span>🔒 Demo Mode — Trang Quản Trị Hệ Thống Vanguard Construct (Dữ liệu giả lập demo cho chủ đầu tư)</span>
      </div>

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 sticky top-0 h-[calc(100vh-33px)] justify-between">
          <div className="p-5 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#0B0F19] text-[#F4B942] flex items-center justify-center font-extrabold text-lg border border-[#F4B942]">
                V
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-slate-900 leading-none block">
                  VANGUARD <span className="text-[#F4B942]">ADMIN</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">EPC Engineering</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#0B0F19] text-[#F4B942] shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#F4B942]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div
                title="Tính năng đang phát triển"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 cursor-not-allowed opacity-60"
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-slate-400" />
                  <span>Cài Đặt</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded">Soon</span>
              </div>
            </nav>
          </div>

          {/* User Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#0B0F19] text-[#F4B942] font-bold text-xs flex items-center justify-center shadow-sm">
                AD
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Project Director</p>
                <p className="text-[10px] text-slate-500">admin@vanguard.vn</p>
              </div>
            </div>
            <button
              onClick={() => showToast("Đã đăng xuất khỏi hệ thống quản trị!")}
              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Bar */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-700">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 bg-white p-0">
                    <SheetHeader className="p-5 border-b border-slate-100 text-left">
                      <SheetTitle className="font-heading font-extrabold text-base text-[#0B0F19]">
                        VANGUARD ADMIN
                      </SheetTitle>
                    </SheetHeader>
                    <div className="p-4 space-y-1 font-bold">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              isActive ? "bg-[#0B0F19] text-[#F4B942]" : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Admin</span>
                <ChevronRight className="h-3 w-3 text-slate-400" />
                <span className="font-bold text-slate-900">{getPageTitle()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-500 w-48">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <span>Tìm mã dự án, gói thầu...</span>
              </div>

              <button className="relative p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-amber-500 text-[#0B0F19] font-bold text-[10px] flex items-center justify-center">
                  5
                </span>
              </button>

              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-slate-200 text-xs font-bold text-[#0B0F19] hover:bg-[#0B0F19] hover:text-[#F4B942]"
                >
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Xem Website →
                </Button>
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
