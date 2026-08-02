"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Search,
  Award,
  Globe,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

interface Instructor {
  id: string;
  name: string;
  role: string;
  nationality: string;
  isNative: boolean;
  expertise: string;
  coursesCount: number;
  rating: number;
  image: string;
  bio: string;
}

const INSTRUCTORS_DATA: Instructor[] = [
  {
    id: "ins1",
    name: "Sarah Johnson",
    role: "Senior IELTS Examiner",
    nationality: "Anh (Native)",
    isNative: true,
    expertise: "IELTS Academic 8.5+, Speaking & Writing",
    coursesCount: 2,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    bio: "Cựu giám khảo chấm thi IELTS tại British Council với hơn 12 năm kinh nghiệm.",
  },
  {
    id: "ins2",
    name: "Nguyễn Minh Tuấn",
    role: "TOEIC 990 Master",
    nationality: "Việt Nam",
    isNative: false,
    expertise: "TOEIC Luyện Đề, Bẫy Đề Thi",
    coursesCount: 1,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    bio: "Đạt 990/990 TOEIC 3 lần liên tiếp. Tác giả 2 đầu sách giải đề TOEIC bán chạy.",
  },
  {
    id: "ins3",
    name: "Emily Chen",
    role: "TESOL Master Certified",
    nationality: "Mỹ (Native)",
    isNative: true,
    expertise: "Giao Tiếp Phản Xạ, Phonetics",
    coursesCount: 2,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    bio: "Chuyên gia huấn luyện phản xạ giao tiếp tự nhiên không cần dịch nhẩm trong đầu.",
  },
  {
    id: "ins4",
    name: "David Miller",
    role: "Ex-Corporate Manager",
    nationality: "Mỹ (Native)",
    isNative: true,
    expertise: "Business English, Corporate Communication",
    coursesCount: 1,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    bio: "Cựu Giám đốc truyền thông doanh nghiệp Fortune 500 với kinh nghiệm đào tạo nhân sự cao cấp.",
  },
  {
    id: "ins5",
    name: "Trần Hà Linh",
    role: "Pronunciation Specialist",
    nationality: "Việt Nam",
    isNative: false,
    expertise: "IPA 44 Sounds, Giọng Mỹ Nâng Cao",
    coursesCount: 1,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    bio: "Chuyên gia chữa ngọng tiếng Anh và chuẩn hóa ngữ điệu chuẩn giọng Mỹ.",
  },
];

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>(INSTRUCTORS_DATA);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editInstructor, setEditInstructor] = useState<Instructor | null>(null);

  const [formState, setFormState] = useState<Partial<Instructor>>({
    name: "",
    role: "IELTS Trainer",
    nationality: "Anh (Native)",
    expertise: "IELTS & Speaking",
    bio: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name) return;

    if (editInstructor) {
      setInstructors((prev) =>
        prev.map((ins) => (ins.id === editInstructor.id ? ({ ...ins, ...formState } as Instructor) : ins))
      );
      setEditInstructor(null);
      showToast("Đã cập nhật thông tin giảng viên!");
    } else {
      const created: Instructor = {
        id: `ins-${Date.now()}`,
        name: formState.name || "Giảng viên mới",
        role: formState.role || "Master Trainer",
        nationality: formState.nationality || "Mỹ (Native)",
        isNative: formState.nationality?.includes("Native") || false,
        expertise: formState.expertise || "Giao tiếp",
        coursesCount: 1,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        bio: formState.bio || "Giảng viên kinh nghiệm.",
      };
      setInstructors([created, ...instructors]);
      setIsAddOpen(false);
      showToast("🎉 Đã thêm giảng viên mới thành công!");
    }
  };

  const filteredInstructors = instructors.filter(
    (ins) =>
      ins.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ins.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-blue-600 text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Quản Lý Giảng Viên
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Đội ngũ {instructors.length} giảng viên bản ngữ và Việt Nam đào tạo tại trung tâm.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo tên hoặc chuyên môn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
            />
          </div>

          <Button
            onClick={() => {
              setFormState({ name: "", role: "IELTS Specialist", nationality: "Mỹ (Native)", expertise: "IELTS", bio: "" });
              setIsAddOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs px-4 py-2.5 shrink-0 shadow-md"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Giảng Viên
          </Button>
        </div>
      </div>

      {/* Instructors Table Card */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Giảng Viên</th>
                <th className="py-3.5 px-6">Quốc Tịch</th>
                <th className="py-3.5 px-6">Chuyên Môn</th>
                <th className="py-3.5 px-6">Khoá Đang Dạy</th>
                <th className="py-3.5 px-6">Đánh Giá</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredInstructors.map((ins) => (
                <tr key={ins.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-blue-600">
                        <Image src={ins.image} alt={ins.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{ins.name}</p>
                        <p className="text-[11px] text-blue-600 font-bold">{ins.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={`font-bold border-none ${ins.isNative ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-800"}`}>
                      {ins.nationality}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{ins.expertise}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{ins.coursesCount} khoá</td>
                  <td className="py-4 px-6 font-bold text-amber-500">⭐ {ins.rating} / 5.0</td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditInstructor(ins);
                        setFormState(ins);
                      }}
                      className="text-xs font-bold rounded-xl border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Edit2 className="mr-1 h-3.5 w-3.5" /> Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Dialog Form */}
      {(isAddOpen || editInstructor) && (
        <Dialog open={isAddOpen || !!editInstructor} onOpenChange={() => { setIsAddOpen(false); setEditInstructor(null); }}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-lg text-slate-900">
                {editInstructor ? "Chỉnh Sửa Giảng Viên" : "Thêm Giảng Viên Mới"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Họ và Tên Giảng Viên *</Label>
                <Input
                  required
                  placeholder="VD: Sarah Johnson"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Chức Danh / Vị Trí</Label>
                <Input
                  placeholder="VD: Senior IELTS Examiner"
                  value={formState.role}
                  onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Quốc Tịch</Label>
                  <Input
                    placeholder="VD: Anh (Native)"
                    value={formState.nationality}
                    onChange={(e) => setFormState({ ...formState, nationality: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Chuyên Môn Đào Tạo</Label>
                  <Input
                    placeholder="VD: IELTS Academic 8.5+"
                    value={formState.expertise}
                    onChange={(e) => setFormState({ ...formState, expertise: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setIsAddOpen(false); setEditInstructor(null); }}
                  className="rounded-xl border-slate-200 text-xs font-bold"
                >
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-blue-600 text-white font-bold text-xs">
                  Lưu Thông Tin
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
