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
  Package,
} from "lucide-react";

import { Card } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Button } from "@wsos/ui/components/button";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "active" | "hidden";
  image: string;
}

const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: "p1",
    name: "Aqua Dewy Glass Serum",
    category: "Chăm sóc da",
    price: "495.000₫",
    stock: 120,
    status: "active",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Peony Glow Radiance Cream",
    category: "Chăm sóc da",
    price: "580.000₫",
    stock: 45,
    status: "active",
    image: "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Botanical Centella Soothing Toner",
    category: "Chăm sóc da",
    price: "380.000₫",
    stock: 85,
    status: "active",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Pure Vita C Brightening Shot",
    category: "Chăm sóc da",
    price: "620.000₫",
    stock: 8,
    status: "active",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Rose Quartz Velvet Cushion",
    category: "Trang điểm",
    price: "520.000₫",
    stock: 30,
    status: "active",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Peach Dew Tinted Lip Oil",
    category: "Trang điểm",
    price: "290.000₫",
    stock: 65,
    status: "active",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p7",
    name: "Botanical Green Body Cleanser",
    category: "Dưỡng thể",
    price: "340.000₫",
    stock: 90,
    status: "active",
    image: "https://images.unsplash.com/photo-1556228722-d1191e469c43?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p8",
    name: "Dewy Glass Garden Ritual Set",
    category: "Bộ sản phẩm",
    price: "1.290.000₫",
    stock: 15,
    status: "active",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p9",
    name: "Watery Sunscreen Fluid SPF50+",
    category: "Chăm sóc da",
    price: "420.000₫",
    stock: 110,
    status: "active",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p10",
    name: "Green Tea Cleansing Balm",
    category: "Chăm sóc da",
    price: "360.000₫",
    stock: 5,
    status: "active",
    image: "https://images.unsplash.com/photo-1567928257827-4a03213a058c?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p11",
    name: "Rose Petal Hydrating Lotion",
    category: "Dưỡng thể",
    price: "390.000₫",
    stock: 40,
    status: "active",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "p12",
    name: "Dewy Garden Renewal Night Mask",
    category: "Chăm sóc da",
    price: "540.000₫",
    stock: 25,
    status: "active",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=200&auto=format&fit=crop",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_ADMIN_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Chăm sóc da",
    price: "",
    stock: 50,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "active" ? "hidden" : "active" } : p
      )
    );
    showToast("Đã thay đổi trạng thái hiển thị sản phẩm!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Đã xóa sản phẩm khỏi danh mục!");
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created: AdminProduct = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: `${Number(newProduct.price).toLocaleString("vi-VN")}₫`,
      stock: Number(newProduct.stock),
      status: "active",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
    };

    setProducts([created, ...products]);
    setIsAddOpen(false);
    setNewProduct({ name: "", category: "Chăm sóc da", price: "", stock: 50 });
    showToast("🎉 Đã thêm sản phẩm mới thành công!");
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    setEditProduct(null);
    showToast("Đã cập nhật thông tin sản phẩm!");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Quản Lý Sản Phẩm
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Danh mục {products.length} sản phẩm hiển thị trên trang storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm tên hoặc danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs bg-white border-slate-200 rounded-xl"
            />
          </div>

          <Button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white font-bold rounded-xl text-xs px-4 py-2.5 shrink-0 shadow-sm"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Thêm Sản Phẩm
          </Button>
        </div>
      </div>

      {/* Products Table Card */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Sản Phẩm</th>
                <th className="py-3.5 px-6">Danh Mục</th>
                <th className="py-3.5 px-6">Giá Bán</th>
                <th className="py-3.5 px-6">Tồn Kho</th>
                <th className="py-3.5 px-6">Trạng Thái</th>
                <th className="py-3.5 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-slate-900">{prod.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{prod.category}</td>
                  <td className="py-4 px-6 font-bold text-[#2D6A4F]">{prod.price}</td>
                  <td className="py-4 px-6">
                    <Badge
                      className={`font-bold border-none px-2.5 py-0.5 text-[11px] ${
                        prod.stock > 50
                          ? "bg-emerald-100 text-emerald-800"
                          : prod.stock >= 10
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {prod.stock < 10 ? `Sắp hết (${prod.stock})` : `${prod.stock} sp`}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleToggleStatus(prod.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
                    >
                      {prod.status === "active" ? (
                        <>
                          <Eye className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đang Hiển Thị</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-slate-400">Đang Ẩn</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditProduct(prod)}
                        className="h-8 w-8 text-slate-600 hover:text-[#2D6A4F]"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteProduct(prod.id)}
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

      {/* Add Product Dialog Modal */}
      {isAddOpen && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-lg text-slate-900">
                Thêm Sản Phẩm Mới
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateProduct} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Tên Sản Phẩm *</Label>
                <Input
                  required
                  placeholder="Ví dụ: Dewy Peptide Eye Serum"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Danh Mục</Label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2D6A4F]"
                >
                  <option value="Chăm sóc da">Chăm sóc da</option>
                  <option value="Trang điểm">Trang điểm</option>
                  <option value="Dưỡng thể">Dưỡng thể</option>
                  <option value="Bộ sản phẩm">Bộ sản phẩm</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Giá Bán (VNĐ) *</Label>
                  <Input
                    required
                    type="number"
                    placeholder="450000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Số Lượng Tồn Kho</Label>
                  <Input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-xl border-slate-200 text-xs font-bold"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#2D6A4F] text-white hover:bg-[#2D6A4F]/90 text-xs font-bold"
                >
                  Lưu Sản Phẩm
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Product Dialog Modal */}
      {editProduct && (
        <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-lg text-slate-900">
                Chỉnh Sửa Sản Phẩm
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdateProduct} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Tên Sản Phẩm</Label>
                <Input
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Giá Bán</Label>
                  <Input
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Tồn Kho</Label>
                  <Input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditProduct(null)}
                  className="rounded-xl border-slate-200 text-xs font-bold"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#2D6A4F] text-white hover:bg-[#2D6A4F]/90 text-xs font-bold"
                >
                  Cập Nhật
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
