"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Search,
  UploadCloud,
  Building2,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";
import { MEGA_PROJECTS, ProjectItem } from "../../../components/ProjectShowcase";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(MEGA_PROJECTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProject, setEditProject] = useState<ProjectItem | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  // Upload Simulation State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
  const [formState, setFormState] = useState<Partial<ProjectItem>>({
    code: "PRJ-905",
    title: "",
    category: "Infrastructure",
    location: "TP.HCM",
    value: "$250 Million USD",
    year: "2024 - 2026",
    scale: "Quy mô 50 Hecta",
    client: "Tập Đoàn Đầu Tư Quốc Tế",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
    description: "Tổ hợp công trình hạ tầng kỹ thuật cao ứng dụng công nghệ kết cấu siêu trọng.",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
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
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
          }));
          showToast(" Tải ảnh phối cảnh 4K siêu dự án lên thành công!");
          return 100;
        }
        return prev + 30;
      });
    }, 350);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.code) return;

    if (editProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editProject.id ? ({ ...p, ...formState } as ProjectItem) : p))
      );
      setEditProject(null);
      showToast(`✅ Đã lưu cập nhật thông tin dự án "${formState.title}" thành công!`);
    } else {
      const newP: ProjectItem = {
        id: `p-${Date.now()}`,
        code: formState.code || `PRJ-${Math.floor(Math.random() * 900 + 100)}`,
        title: formState.title || "Siêu dự án mới",
        category: (formState.category as any) || "Infrastructure",
        location: formState.location || "TP.HCM",
        value: formState.value || "$150 Million USD",
        year: formState.year || "2024 - 2026",
        scale: formState.scale || "Quy mô 50 Hecta",
        client: formState.client || "Chủ đầu tư quốc tế",
        image: formState.image || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
        description: formState.description || "Công trình hạ tầng quy mô lớn.",
        specs: [
          { label: "Tổng diện tích sàn", value: "150,000 m²" },
          { label: "Tiêu chuẩn xanh", value: "LEED Gold Certified" },
        ],
      };
      setProjects([newP, ...projects]);
      setIsAddOpen(false);
      showToast(`✅ Đã thêm siêu dự án mới "${newP.title}" vào danh mục!`);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteProjectId) return;
    setProjects((prev) => prev.filter((p) => p.id !== deleteProjectId));
    setDeleteProjectId(null);
    showToast("Đã xoá dự án khỏi hệ thống quản lý!");
  };

  const openEditModal = (p: ProjectItem) => {
    setEditProject(p);
    setFormState(p);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0B0F19] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#F4B942]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F4B942]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
            Quản Lý Siêu Dự Án Tỷ Đô <Badge className="bg-[#0B0F19] text-[#F4B942] font-bold">DEMO CRUD ⭐</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chủ đầu tư & ban chỉ huy tự cập nhật tiến độ, upload ảnh phối cảnh 4K và thông số gói thầu EPC.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo mã hoặc tên dự án..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
            />
          </div>

          <Button
            onClick={() => {
              setFormState({
                code: `PRJ-${Math.floor(Math.random() * 900 + 100)}`,
                title: "",
                category: "Infrastructure",
                location: "TP.HCM",
                value: "$250 Million USD",
                year: "2024 - 2026",
                scale: "Quy mô 50 Hecta",
                client: "Tập Đoàn Đầu Tư Quốc Tế",
                image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
                description: "Tổ hợp công trình hạ tầng kỹ thuật cao ứng dụng công nghệ kết cấu siêu trọng.",
              });
              setIsAddOpen(true);
            }}
            className="bg-[#0B0F19] hover:bg-slate-800 text-[#F4B942] font-bold rounded-xl text-xs px-4 py-2.5 shrink-0 shadow-md"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Siêu Dự Án Mới
          </Button>
        </div>
      </div>

      {/* Projects Table */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Phối Cảnh</th>
                <th className="py-3.5 px-6">Mã Dự Án</th>
                <th className="py-3.5 px-6">Tên Siêu Dự Án</th>
                <th className="py-3.5 px-6">Lĩnh Vực</th>
                <th className="py-3.5 px-6">Giá Trị Dự Án</th>
                <th className="py-3.5 px-6">Chủ Đầu Tư</th>
                <th className="py-3.5 px-6">Địa Điểm</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="relative h-12 w-20 rounded-xl overflow-hidden bg-slate-100 border shrink-0">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-[#0B0F19]">{p.code}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 max-w-xs">{p.title}</td>
                  <td className="py-3.5 px-6">
                    <Badge variant="secondary" className="font-bold bg-amber-100 text-amber-900">
                      {p.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-6 font-mono text-[#0B0F19] font-bold">{p.value}</td>
                  <td className="py-3.5 px-6 text-slate-700 font-bold">{p.client}</td>
                  <td className="py-3.5 px-6 text-slate-600">{p.location}</td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(p)}
                        className="text-xs font-bold rounded-xl border-slate-200 text-[#0B0F19] hover:bg-[#0B0F19] hover:text-[#F4B942]"
                      >
                        <Edit2 className="mr-1 h-3.5 w-3.5" /> Sửa
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteProjectId(p.id)}
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

      {/* Add / Edit Dialog Modal */}
      {(isAddOpen || editProject) && (
        <Dialog open={isAddOpen || !!editProject} onOpenChange={() => { setIsAddOpen(false); setEditProject(null); }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <DialogTitle className="font-heading font-extrabold text-xl text-slate-900">
                {editProject ? `Chỉnh Sửa Dự Án: ${editProject.code}` : "Thêm Siêu Dự Án Mới Vào Hệ Thống"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveProject} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Mã Dự Án *</Label>
                  <Input
                    required
                    placeholder="VD: PRJ-905"
                    value={formState.code}
                    onChange={(e) => setFormState({ ...formState, code: e.target.value })}
                    className="text-xs font-mono font-bold bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Tên Siêu Dự Án *</Label>
                  <Input
                    required
                    placeholder="VD: Tổ Hợp Cảng Biển Nước Sâu Hòn Khoai"
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="text-xs font-bold bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Lĩnh Vực</Label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="Infrastructure">Infrastructure (Hạ tầng)</option>
                    <option value="Industrial">Industrial (Khu công nghiệp)</option>
                    <option value="Skyscraper">Skyscraper (Cao ốc 88 tầng)</option>
                    <option value="Clean Energy">Clean Energy (Năng lượng sạch)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Giá Trị Dự Án</Label>
                  <Input
                    value={formState.value}
                    onChange={(e) => setFormState({ ...formState, value: e.target.value })}
                    className="text-xs font-mono font-bold bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Chủ Đầu Tư</Label>
                  <Input
                    value={formState.client}
                    onChange={(e) => setFormState({ ...formState, client: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* SIMULATED PHOTO UPLOAD */}
              <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                <Label className="text-xs font-bold text-slate-700 block">Ảnh Phối Cảnh 4K Siêu Dự Án (Demo Upload File)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-32 rounded-xl overflow-hidden border bg-white shrink-0">
                    <Image src={formState.image || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop"} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSimulateUpload}
                      disabled={isUploading}
                      className="rounded-xl border-slate-200 text-xs font-bold text-[#0B0F19]"
                    >
                      <UploadCloud className="mr-1.5 h-4 w-4" /> Đổi Ảnh Phối Cảnh 4K (Chọn File)
                    </Button>
                    {isUploading && (
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div style={{ width: `${uploadProgress}%` }} className="h-full bg-[#F4B942] transition-all" />
                        </div>
                        <span className="text-[10px] text-amber-800 font-bold">Đang tải ảnh phối cảnh... {uploadProgress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Mô Tả Kỹ Thuật Dự Án</Label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0B0F19]"
                />
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setEditProject(null); }} className="rounded-xl text-xs font-bold">
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-[#0B0F19] text-[#F4B942] hover:bg-slate-800 text-xs font-bold shadow-md">
                  Lưu Dự Án (Cập Nhật State)
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirm Modal */}
      {deleteProjectId && (
        <Dialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
          <DialogContent className="max-w-sm bg-white rounded-3xl p-6 text-center space-y-4">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-base text-slate-900">
                Xác Nhận Xoá Dự Án
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs text-slate-500">Bạn có chắc chắn muốn xoá dự án này khỏi hệ thống?</p>
            <DialogFooter className="flex justify-center gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeleteProjectId(null)} className="rounded-xl text-xs font-bold">
                Hủy
              </Button>
              <Button onClick={handleDeleteConfirm} className="rounded-xl bg-red-600 text-white font-bold text-xs">
                Xoá Dự Án
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
