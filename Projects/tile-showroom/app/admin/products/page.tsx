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
  UploadCloud,
  X,
  Layers,
  Sparkles,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";
import { TILE_PRODUCTS, TileProduct } from "../../page";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<TileProduct[]>(TILE_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<TileProduct | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Upload Simulation State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
  const [formState, setFormState] = useState<Partial<TileProduct>>({
    code: "",
    title: "",
    series: "Marble Series",
    size: "120x240 cm",
    finish: "Bóng kính (Polished)",
    thickness: "9 mm",
    origin: "Ý (Italy)",
    antiSlip: "R9",
    application: "Lát sàn phòng khách, vách tivi",
    textureImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
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
            textureImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
          }));
          showToast(" Tải ảnh texture gạch mới lên thành công!");
          return 100;
        }
        return prev + 30;
      });
    }, 350);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.code) return;

    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? ({ ...p, ...formState } as TileProduct) : p))
      );
      setEditProduct(null);
      showToast(`✅ Đã lưu cập nhật mẫu gạch "${formState.title}" thành công!`);
    } else {
      const newP: TileProduct = {
        id: `t-${Date.now()}`,
        code: formState.code || `ST-${Math.floor(Math.random() * 900 + 100)}`,
        title: formState.title || "Mẫu gạch mới",
        series: (formState.series as any) || "Marble Series",
        size: formState.size || "80x80 cm",
        finish: formState.finish || "Bóng kính",
        thickness: formState.thickness || "9 mm",
        origin: formState.origin || "Ý (Italy)",
        antiSlip: formState.antiSlip || "R9",
        application: formState.application || "Ốp tường và lát sàn",
        textureImage: formState.textureImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
        roomImage: formState.roomImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
        gallery: [formState.textureImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"],
        badge: "Mới Nhập Khẩu",
      };
      setProducts([newP, ...products]);
      setIsAddOpen(false);
      showToast(`✅ Đã thêm mẫu gạch mới "${newP.title}" vào catalog!`);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteProductId) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProductId));
    setDeleteProductId(null);
    showToast("Đã xoá mẫu gạch khỏi hệ thống!");
  };

  const openEditModal = (p: TileProduct) => {
    setEditProduct(p);
    setFormState(p);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#2A2724] text-white px-5 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#9A7B4F]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#9A7B4F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
            Quản Lý Sản Phẩm Gạch <Badge className="bg-[#9A7B4F] text-white font-bold">DEMO CRUD ⭐</Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chủ showroom tự thêm/sửa mẫu gạch, upload ảnh texture 4K và điều chỉnh thông số kỹ thuật.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo mã hoặc tên gạch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
            />
          </div>

          <Button
            onClick={() => {
              setFormState({
                code: `ST-${Math.floor(Math.random() * 900 + 100)}`,
                title: "",
                series: "Marble Series",
                size: "120x240 cm",
                finish: "Bóng kính (Polished)",
                thickness: "9 mm",
                origin: "Ý (Italy)",
                antiSlip: "R9",
                application: "Lát sàn phòng khách, vách tivi",
                textureImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
                roomImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
              });
              setIsAddOpen(true);
            }}
            className="bg-[#9A7B4F] hover:bg-[#85683F] text-white font-bold rounded-xl text-xs px-4 py-2.5 shrink-0 shadow-md"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Mẫu Gạch Mới
          </Button>
        </div>
      </div>

      {/* Tile Products Table */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Texture</th>
                <th className="py-3.5 px-6">Mã Gạch</th>
                <th className="py-3.5 px-6">Tên Sản Phẩm</th>
                <th className="py-3.5 px-6">Dòng Gạch</th>
                <th className="py-3.5 px-6">Kích Thước</th>
                <th className="py-3.5 px-6">Bề Mặt</th>
                <th className="py-3.5 px-6">Xuất Xứ</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 border shrink-0">
                      <Image src={p.textureImage} alt={p.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-[#9A7B4F]">{p.code}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 max-w-xs">{p.title}</td>
                  <td className="py-3.5 px-6">
                    <Badge variant="secondary" className="font-bold bg-slate-100 text-slate-800">
                      {p.series}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-6 font-mono text-slate-800 font-bold">{p.size}</td>
                  <td className="py-3.5 px-6 text-slate-700">{p.finish}</td>
                  <td className="py-3.5 px-6 text-[#9A7B4F] font-bold">{p.origin}</td>
                  <td className="py-3.5 px-6">
                    <button onClick={() => showToast("Đã cập nhật hiển thị mẫu gạch!")} className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Eye className="h-3.5 w-3.5" /> Đang Hiện
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(p)}
                        className="text-xs font-bold rounded-xl border-slate-200 text-[#9A7B4F] hover:bg-[#9A7B4F] hover:text-white"
                      >
                        <Edit2 className="mr-1 h-3.5 w-3.5" /> Sửa
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteProductId(p.id)}
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
      {(isAddOpen || editProduct) && (
        <Dialog open={isAddOpen || !!editProduct} onOpenChange={() => { setIsAddOpen(false); setEditProduct(null); }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <DialogTitle className="font-heading font-extrabold text-xl text-slate-900">
                {editProduct ? `Chỉnh Sửa Mẫu Gạch: ${editProduct.code}` : "Thêm Mẫu Gạch Mới Vào Catalog"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Mã Gạch *</Label>
                  <Input
                    required
                    placeholder="VD: ST-901"
                    value={formState.code}
                    onChange={(e) => setFormState({ ...formState, code: e.target.value })}
                    className="text-xs font-mono font-bold bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Tên Sản Phẩm *</Label>
                  <Input
                    required
                    placeholder="VD: Calacatta Gold Big Slab"
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="text-xs font-bold bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Dòng Gạch</Label>
                  <select
                    value={formState.series}
                    onChange={(e) => setFormState({ ...formState, series: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="Marble Series">Marble Series</option>
                    <option value="Stone Series">Stone Series</option>
                    <option value="Wood-look">Wood-look</option>
                    <option value="Concrete">Concrete</option>
                    <option value="Terrazzo">Terrazzo</option>
                    <option value="Mosaic">Mosaic</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Kích Thước</Label>
                  <select
                    value={formState.size}
                    onChange={(e) => setFormState({ ...formState, size: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="120x240 cm">120x240 cm (Big Slab)</option>
                    <option value="80x160 cm">80x160 cm</option>
                    <option value="60x120 cm">60x120 cm</option>
                    <option value="80x80 cm">80x80 cm</option>
                    <option value="60x60 cm">60x60 cm</option>
                    <option value="20x120 cm">20x120 cm (Thanh gỗ)</option>
                    <option value="30x30 cm">30x30 cm (Mosaic)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Xuất Xứ</Label>
                  <select
                    value={formState.origin}
                    onChange={(e) => setFormState({ ...formState, origin: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="Ý (Italy)">Ý (Italy)</option>
                    <option value="Tây Ban Nha">Tây Ban Nha</option>
                    <option value="Ấn Độ">Ấn Độ</option>
                    <option value="Việt Nam Export">Việt Nam Premium</option>
                  </select>
                </div>
              </div>

              {/* SIMULATED TEXTURE IMAGE UPLOAD */}
              <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                <Label className="text-xs font-bold text-slate-700 block">Ảnh Texture Vân Gạch 4K (Demo Upload File)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden border bg-white shrink-0">
                    <Image src={formState.textureImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"} alt="Texture Preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSimulateUpload}
                      disabled={isUploading}
                      className="rounded-xl border-slate-200 text-xs font-bold text-[#9A7B4F]"
                    >
                      <UploadCloud className="mr-1.5 h-4 w-4" /> Đổi Ảnh Texture 4K (Chọn File)
                    </Button>
                    {isUploading && (
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div style={{ width: `${uploadProgress}%` }} className="h-full bg-[#9A7B4F] transition-all" />
                        </div>
                        <span className="text-[10px] text-[#9A7B4F] font-bold">Đang tải ảnh texture... {uploadProgress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Bề Mặt Hoàn Thiện</Label>
                  <Input
                    value={formState.finish}
                    onChange={(e) => setFormState({ ...formState, finish: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Độ Dày / Chống Trượt</Label>
                  <Input
                    value={formState.thickness}
                    onChange={(e) => setFormState({ ...formState, thickness: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Khu Vực Ứng Dụng</Label>
                <textarea
                  rows={2}
                  value={formState.application}
                  onChange={(e) => setFormState({ ...formState, application: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#9A7B4F]"
                />
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setEditProduct(null); }} className="rounded-xl text-xs font-bold">
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-[#9A7B4F] text-white hover:bg-[#85683F] text-xs font-bold shadow-md">
                  Lưu Sản Phẩm Gạch (Cập Nhật State)
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirm Modal */}
      {deleteProductId && (
        <Dialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
          <DialogContent className="max-w-sm bg-white rounded-3xl p-6 text-center space-y-4">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-base text-slate-900">
                Xác Nhận Xoá Mẫu Gạch
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs text-slate-500">Bạn có chắc chắn muốn xoá mẫu gạch này khỏi catalog?</p>
            <DialogFooter className="flex justify-center gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeleteProductId(null)} className="rounded-xl text-xs font-bold">
                Hủy
              </Button>
              <Button onClick={handleDeleteConfirm} className="rounded-xl bg-red-600 text-white font-bold text-xs">
                Xoá Mẫu Gạch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
