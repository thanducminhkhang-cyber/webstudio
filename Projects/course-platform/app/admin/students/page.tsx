"use client";

import React, { useState } from "react";
import {
  Search,
  User,
  BookOpen,
  Phone,
  Mail,
  Award,
  Eye,
  CheckCircle2,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

interface Student {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  coursesCount: number;
  progress: number; // percentage
  joinedDate: string;
  isVip: boolean;
  isNew: boolean;
  status: "learning" | "completed" | "not_started";
  enrolledCourses: { name: string; progress: number; score?: string }[];
}

const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Đặng Hoàng An",
    initials: "HA",
    email: "hoangan.dang@gmail.com",
    phone: "0901234567",
    coursesCount: 2,
    progress: 75,
    joinedDate: "15/05/2026",
    isVip: true,
    isNew: false,
    status: "learning",
    enrolledCourses: [
      { name: "IELTS Academic 7.0+ Intensive", progress: 75, score: "Target 7.5" },
      { name: "Phát Âm Chuẩn Giọng Mỹ", progress: 100, score: "Đã hoàn thành" },
    ],
  },
  {
    id: "s2",
    name: "Vũ Minh Phương",
    initials: "MP",
    email: "phuong.vu@yahoo.com",
    phone: "0912345678",
    coursesCount: 1,
    progress: 40,
    joinedDate: "28/07/2026",
    isVip: false,
    isNew: true,
    status: "learning",
    enrolledCourses: [
      { name: "TOEIC 800+ Luyện Đề Thực Chiến", progress: 40, score: "Target 850" },
    ],
  },
  {
    id: "s3",
    name: "Phạm Hải Đăng",
    initials: "HD",
    email: "haidang.pham@gmail.com",
    phone: "0987654321",
    coursesCount: 1,
    progress: 15,
    joinedDate: "01/08/2026",
    isVip: false,
    isNew: true,
    status: "learning",
    enrolledCourses: [
      { name: "Giao Tiếp Tiếng Anh Tự Tin", progress: 15 },
    ],
  },
  {
    id: "s4",
    name: "Lê Ngọc Linh",
    initials: "NL",
    email: "linh.le@outlook.com",
    phone: "0934567890",
    coursesCount: 2,
    progress: 100,
    joinedDate: "10/02/2026",
    isVip: true,
    isNew: false,
    status: "completed",
    enrolledCourses: [
      { name: "Business English cho Dân Văn Phòng", progress: 100, score: "Chứng chỉ Xuất sắc" },
      { name: "Giao Tiếp Tiếng Anh Tự Tin", progress: 100, score: "Đã hoàn thành" },
    ],
  },
  {
    id: "s5",
    name: "Trịnh Bảo Nam",
    initials: "BN",
    email: "baonam.trinh@gmail.com",
    phone: "0945678901",
    coursesCount: 1,
    progress: 90,
    joinedDate: "12/03/2026",
    isVip: false,
    isNew: false,
    status: "learning",
    enrolledCourses: [
      { name: "Phát Âm Chuẩn Giọng Mỹ", progress: 90 },
    ],
  },
  {
    id: "s6",
    name: "Nguyễn Thu Hà",
    initials: "TH",
    email: "thuha.nguyen@gmail.com",
    phone: "0976543210",
    coursesCount: 1,
    progress: 0,
    joinedDate: "02/08/2026",
    isVip: false,
    isNew: true,
    status: "not_started",
    enrolledCourses: [
      { name: "Tiếng Anh Cho Trẻ Em (6-12 tuổi)", progress: 0 },
    ],
  },
  {
    id: "s7",
    name: "Bùi Anh Tuấn",
    initials: "AT",
    email: "anhtuan.bui@gmail.com",
    phone: "0965432109",
    coursesCount: 3,
    progress: 85,
    joinedDate: "05/01/2026",
    isVip: true,
    isNew: false,
    status: "learning",
    enrolledCourses: [
      { name: "IELTS Academic 7.0+ Intensive", progress: 85, score: "IELTS 7.5" },
      { name: "Business English", progress: 100 },
      { name: "Phát Âm Chuẩn Giọng Mỹ", progress: 100 },
    ],
  },
];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery);

    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "learning"
        ? s.status === "learning"
        : filterStatus === "completed"
        ? s.status === "completed"
        : s.status === "not_started";

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Quản Lý Học Viên
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Danh sách {students.length} học viên đăng ký khoá học tại trung tâm.
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          onClick={() => setFilterStatus("all")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterStatus === "all" ? "bg-blue-600 text-white" : ""}`}
        >
          Tất Cả ({students.length})
        </Button>
        <Button
          variant={filterStatus === "learning" ? "default" : "outline"}
          onClick={() => setFilterStatus("learning")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterStatus === "learning" ? "bg-blue-600 text-white" : ""}`}
        >
          Đang Học ({students.filter((s) => s.status === "learning").length})
        </Button>
        <Button
          variant={filterStatus === "completed" ? "default" : "outline"}
          onClick={() => setFilterStatus("completed")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterStatus === "completed" ? "bg-emerald-600 text-white" : ""}`}
        >
          Đã Hoàn Thành ({students.filter((s) => s.status === "completed").length})
        </Button>
        <Button
          variant={filterStatus === "not_started" ? "default" : "outline"}
          onClick={() => setFilterStatus("not_started")}
          className={`rounded-xl text-xs font-bold px-4 py-2 ${filterStatus === "not_started" ? "bg-amber-500 text-white" : ""}`}
        >
          Chưa Bắt Đầu ({students.filter((s) => s.status === "not_started").length})
        </Button>
      </div>

      {/* Students Table Card */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Học Viên</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Số Điện Thoại</th>
                <th className="py-3.5 px-6">Khoá Đăng Ký</th>
                <th className="py-3.5 px-6">Tiến Độ Học</th>
                <th className="py-3.5 px-6">Ngày Tham Gia</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {s.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          {s.name}
                          {s.isVip && (
                            <Badge className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-1.5 py-0 border-none">
                              VIP
                            </Badge>
                          )}
                          {s.isNew && (
                            <Badge className="bg-blue-100 text-blue-800 font-extrabold text-[10px] px-1.5 py-0 border-none">
                              Mới
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{s.email}</td>
                  <td className="py-4 px-6 font-mono text-slate-700">{s.phone}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{s.coursesCount} khoá</td>
                  <td className="py-4 px-6">
                    <div className="space-y-1 w-28">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>{s.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${s.progress}%` }} className="h-full bg-blue-600 rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{s.joinedDate}</td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedStudent(s)}
                      className="text-xs font-bold rounded-xl border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white"
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

      {/* Student Profile Dialog Modal */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6 space-y-6">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white font-extrabold text-base flex items-center justify-center">
                  {selectedStudent.initials}
                </div>
                <div>
                  <DialogTitle className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                    {selectedStudent.name}
                    {selectedStudent.isVip && (
                      <Badge className="bg-amber-400 text-slate-950 font-bold text-[10px]">
                        Hạng VIP
                      </Badge>
                    )}
                  </DialogTitle>
                  <p className="text-xs text-slate-400">{selectedStudent.email}</p>
                </div>
              </div>
            </DialogHeader>

            {/* Enrolled Courses List */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Khoá Học Đã Đăng Ký</h4>
              <div className="space-y-2">
                {selectedStudent.enrolledCourses.map((c, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{c.name}</span>
                      {c.score && <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">{c.score}</Badge>}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Tiến độ bài học:</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div style={{ width: `${c.progress}%` }} className="h-full bg-blue-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setSelectedStudent(null)}
                className="w-full rounded-xl border-slate-200 text-xs font-bold"
              >
                Đóng Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
