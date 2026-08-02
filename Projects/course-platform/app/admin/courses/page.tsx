"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Search,
  BookOpen,
  Play,
  UploadCloud,
  X,
  PlusCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@wsos/ui/components/tabs";
import { COURSES_DATA, Course } from "../../page";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Upload simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
  const [formState, setFormState] = useState<Partial<Course>>({
    title: "",
    category: "ielts",
    level: "Intermediate",
    instructor: "Sarah Johnson (Native)",
    price: 2900000,
    originalPrice: 3800000,
    sessions: "30 buổi",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "",
    fullDesc: "",
    modules: [
      { title: "Module 1: Cấu trúc bứt phá", lessons: ["Bài 1: Phân tích chiến thuật", "Bài 2: Thực hành phản xạ"] },
    ],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleStatus = (id: string) => {
    showToast("Đã cập nhật trạng thái hiển thị khoá học trên storefront!");
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFormState((f) => ({
            ...f,
            image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
          }));
          showToast(" Tải ảnh thumbnail mới lên thành công!");
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  const getYoutubeVideoId = (url?: string) => {
    if (!url) return "dQw4w9WgXcQ";
    if (url.includes("embed/")) return url.split("embed/")[1];
    if (url.includes("v=")) return url.split("v=")[1]?.split("&")[0];
    return "dQw4w9WgXcQ";
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title) return;

    if (editCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editCourse.id ? ({ ...c, ...formState } as Course) : c))
      );
      setEditCourse(null);
      showToast(`✅ Đã lưu cập nhật khoá học "${formState.title}" thành công!`);
    } else {
      const newC: Course = {
        id: `c-${Date.now()}`,
        slug: (formState.title || "khoa-hoc-moi").toLowerCase().replace(/\s+/g, "-"),
        title: formState.title || "Khoá học mới",
        category: (formState.category as any) || "ielts",
        level: (formState.level as any) || "Intermediate",
        instructor: formState.instructor || "Sarah Johnson (Native)",
        instructorRole: "Master Trainer",
        instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        price: Number(formState.price) || 2500000,
        originalPrice: Number(formState.originalPrice) || 3500000,
        sessions: formState.sessions || "30 buổi",
        rating: 5.0,
        reviewsCount: 1,
        studentCount: 100,
        badge: "Mới",
        badgeType: "cyan",
        image: formState.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        videoUrl: formState.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
        shortDesc: formState.shortDesc || "Mô tả ngắn khoá học.",
        fullDesc: formState.fullDesc || "Mô tả chi tiết khoá học.",
        modules: formState.modules || [],
      };
      setCourses([newC, ...courses]);
      setIsAddOpen(false);
      showToast(`✅ Đã thêm khoá học mới "${newC.title}" thành công!`);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteCourseId) return;
    setCourses((prev) => prev.filter((c) => c.id !== deleteCourseId));
    setDeleteCourseId(null);
    showToast("Đã xoá khoá học khỏi danh sách!");
  };

  const openEditModal = (c: Course) => {
    setEditCourse(c);
    setFormState(c);
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#7C3AED] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F97316]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden aspect-video">
            <button onClick={() => setPreviewVideoUrl(null)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white">
              <X className="h-5 w-5" />
            </button>
            <iframe src={previewVideoUrl} title="Preview Video" className="w-full h-full" allowFullScreen />
          </div>
        </div>
      )}

      {/* Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
            Quản Lý Khoá Học <Badge className="bg-[#F97316] text-white font-bold">DEMO CRUD ⭐</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chủ trung tâm tự chỉnh sửa tiêu đề, hình ảnh, video giới thiệu và giáo trình dễ dàng.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo tên khoá học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
            />
          </div>

          <Button
            onClick={() => {
              setFormState({
                title: "",
                category: "ielts",
                level: "Intermediate",
                instructor: "Sarah Johnson (Native)",
                price: 2900000,
                originalPrice: 3800000,
                sessions: "30 buổi",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                shortDesc: "",
                fullDesc: "",
                modules: [{ title: "Module 1: Foundation", lessons: ["Bài 1: Giới thiệu"] }],
              });
              setIsAddOpen(true);
            }}
            className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-bold rounded-xl text-xs px-4 py-2.5 shrink-0 shadow-md"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Khoá Học Mới
          </Button>
        </div>
      </div>

      {/* Courses Table Card */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Thumbnail</th>
                <th className="py-3.5 px-6">Tên Khoá Học</th>
                <th className="py-3.5 px-6">Giảng Viên</th>
                <th className="py-3.5 px-6">Trình Độ</th>
                <th className="py-3.5 px-6">Học Phí</th>
                <th className="py-3.5 px-6">Học Viên</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="relative h-12 w-20 rounded-xl overflow-hidden bg-slate-100 border shrink-0">
                      <Image src={c.image} alt={c.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 max-w-xs">{c.title}</td>
                  <td className="py-3.5 px-6 text-slate-700">{c.instructor}</td>
                  <td className="py-3.5 px-6">
                    <Badge
                      className={`font-bold border-none px-2.5 py-0.5 text-[11px] ${
                        c.level === "Beginner"
                          ? "bg-[#06B6D4]/15 text-[#06B6D4]"
                          : c.level === "Intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-[#7C3AED]/15 text-[#7C3AED]"
                      }`}
                    >
                      {c.level}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-[#7C3AED]">{c.price.toLocaleString("vi-VN")}đ</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">{c.reviewsCount} HV</td>
                  <td className="py-3.5 px-6">
                    <button onClick={() => handleToggleStatus(c.id)} className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Eye className="h-3.5 w-3.5" /> Đang Mở
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(c)}
                        className="text-xs font-bold rounded-xl border-slate-200 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white"
                      >
                        <Edit2 className="mr-1 h-3.5 w-3.5" /> Sửa
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteCourseId(c.id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Course Dialog Form Modal */}
      {(isAddOpen || editCourse) && (
        <Dialog open={isAddOpen || !!editCourse} onOpenChange={() => { setIsAddOpen(false); setEditCourse(null); }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <DialogTitle className="font-heading font-extrabold text-xl text-slate-900">
                {editCourse ? `Chỉnh Sửa Khoá Học: ${editCourse.title}` : "Thêm Khoá Học Mới"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveCourse} className="space-y-6 pt-4">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 mb-4">
                  <TabsTrigger value="info" className="font-bold text-xs">Thông Tin Khoá Học & Media</TabsTrigger>
                  <TabsTrigger value="curriculum" className="font-bold text-xs">Chương Trình Học (Modules)</TabsTrigger>
                </TabsList>

                {/* Tab 1: General Info & Media */}
                <TabsContent value="info" className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Tiêu Đề Khoá Học *</Label>
                    <Input
                      required
                      placeholder="VD: IELTS Academic 7.0+ Intensive"
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      className="text-xs bg-slate-50 border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Danh Mục Khoá Học</Label>
                      <select
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                        className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                      >
                        <option value="ielts">IELTS Academic</option>
                        <option value="toeic">TOEIC Luyện Đề</option>
                        <option value="giaotiep">Giao Tiếp & Phát Âm</option>
                        <option value="business">Business English</option>
                        <option value="treem">Tiếng Anh Trẻ Em</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Trình Độ (Level)</Label>
                      <select
                        value={formState.level}
                        onChange={(e) => setFormState({ ...formState, level: e.target.value as any })}
                        className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* IMAGE UPLOAD UI DEMO */}
                  <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <Label className="text-xs font-bold text-slate-700 block">Ảnh Thumbnail Khoá Học (Demo Upload UI)</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-32 rounded-xl overflow-hidden border bg-white shrink-0">
                        <Image src={formState.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"} alt="Preview" fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSimulateUpload}
                          disabled={isUploading}
                          className="rounded-xl border-slate-200 text-xs font-bold text-[#7C3AED]"
                        >
                          <UploadCloud className="mr-1.5 h-4 w-4" /> Đổi Ảnh Thumbnail (Chọn File)
                        </Button>
                        {isUploading && (
                          <div className="space-y-1">
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div style={{ width: `${uploadProgress}%` }} className="h-full bg-[#7C3AED] transition-all" />
                            </div>
                            <span className="text-[10px] text-[#7C3AED] font-bold">Đang tải ảnh lên... {uploadProgress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* YOUTUBE VIDEO PREVIEW DEMO */}
                  <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <Label className="text-xs font-bold text-slate-700 block">Video Giới Thiệu (YouTube URL Preview)</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        value={formState.videoUrl}
                        onChange={(e) => setFormState({ ...formState, videoUrl: e.target.value })}
                        className="text-xs bg-white border-slate-200 rounded-xl flex-1 font-mono"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPreviewVideoUrl(formState.videoUrl || null)}
                        className="rounded-xl border-slate-200 text-xs font-bold text-[#7C3AED] shrink-0"
                      >
                        <Play className="mr-1 h-3.5 w-3.5 fill-[#7C3AED]" /> Xem Preview
                      </Button>
                    </div>

                    {/* YouTube Thumbnail Auto Preview */}
                    <div className="mt-2 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="relative h-14 w-24 rounded-lg overflow-hidden bg-black shrink-0">
                        <Image
                          src={`https://img.youtube.com/vi/${getYoutubeVideoId(formState.videoUrl)}/hqdefault.jpg`}
                          alt="YouTube Thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900">Tự Động Nhận Diện Thumbnail YouTube</p>
                        <p className="text-[10px] text-slate-400 font-mono">Video ID: {getYoutubeVideoId(formState.videoUrl)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Giá Gốc (VNĐ)</Label>
                      <Input
                        type="number"
                        value={formState.originalPrice}
                        onChange={(e) => setFormState({ ...formState, originalPrice: Number(e.target.value) })}
                        className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Giá Ưu Đãi (VNĐ) *</Label>
                      <Input
                        type="number"
                        value={formState.price}
                        onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                        className="text-xs bg-slate-50 border-slate-200 rounded-xl font-bold text-[#7C3AED]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-700">Số Buổi Học</Label>
                      <Input
                        value={formState.sessions}
                        onChange={(e) => setFormState({ ...formState, sessions: e.target.value })}
                        className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">Mô Tả Ngắn</Label>
                    <textarea
                      rows={2}
                      value={formState.shortDesc}
                      onChange={(e) => setFormState({ ...formState, shortDesc: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                </TabsContent>

                {/* Tab 2: Curriculum Modules Editor */}
                <TabsContent value="curriculum" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-bold text-slate-700">Danh Sách Modules & Bài Học</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFormState({
                          ...formState,
                          modules: [
                            ...(formState.modules || []),
                            { title: `Module ${(formState.modules?.length || 0) + 1}: Chuyên sâu mới`, lessons: ["Bài 1: Thực hành"] },
                          ],
                        })
                      }
                      className="rounded-xl border-slate-200 text-xs font-bold text-[#7C3AED]"
                    >
                      <PlusCircle className="mr-1 h-3.5 w-3.5" /> Thêm Module Mới
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {formState.modules?.map((mod, idx) => (
                      <Card key={idx} className="p-4 border border-slate-200 bg-slate-50/50 space-y-3 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <Input
                            value={mod.title}
                            onChange={(e) => {
                              const updatedMods = [...(formState.modules || [])];
                              updatedMods[idx].title = e.target.value;
                              setFormState({ ...formState, modules: updatedMods });
                            }}
                            className="text-xs font-bold bg-white border-slate-200 rounded-xl"
                          />
                        </div>
                        <div className="pl-4 space-y-1 border-l-2 border-[#7C3AED]">
                          {mod.lessons.map((lesson, lIdx) => (
                            <p key={lIdx} className="text-xs text-slate-600 font-medium">
                              • {lesson}
                            </p>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setIsAddOpen(false); setEditCourse(null); }}
                  className="rounded-xl border-slate-200 text-xs font-bold"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90 text-xs font-bold shadow-md"
                >
                  Lưu Khoá Học (Cập Nhật State)
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Delete Dialog */}
      {deleteCourseId && (
        <Dialog open={!!deleteCourseId} onOpenChange={() => setDeleteCourseId(null)}>
          <DialogContent className="max-w-sm bg-white rounded-3xl p-6 text-center space-y-4">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-base text-slate-900">
                Xác Nhận Xoá Khoá Học
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs text-slate-500">Bạn có chắc chắn muốn xoá khoá học này khỏi hệ thống?</p>
            <DialogFooter className="flex justify-center gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeleteCourseId(null)} className="rounded-xl text-xs font-bold">
                Hủy
              </Button>
              <Button onClick={handleDeleteConfirm} className="rounded-xl bg-red-600 text-white font-bold text-xs">
                Xoá Khoá Học
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
