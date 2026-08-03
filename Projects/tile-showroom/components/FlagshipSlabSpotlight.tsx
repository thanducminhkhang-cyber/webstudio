"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { TileProduct } from "../app/page";

interface FlagshipSlabSpotlightProps {
  products: TileProduct[];
  onSelectProduct: (product: TileProduct) => void;
  onOpenLightbox: (imageUrl: string) => void;
}

export default function FlagshipSlabSpotlight({
  products,
  onSelectProduct,
  onOpenLightbox,
}: FlagshipSlabSpotlightProps) {
  const flagship1 = products[0]; // Calacatta Gold
  const flagship2 = products[2]; // Nero Marquina Black

  if (!flagship1 || !flagship2) return null;

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 bg-[#FBFAF8] border-y border-[#E2DDD5] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E2DDD5] pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#9A7B4F] uppercase tracking-[0.25em]">
              FLAGSHIP BIG SLAB 120x240CM
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-normal text-[#1C1A17]">
              Tuyệt Tác Đá Tấm Khổ Lớn
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8B8378] max-w-sm font-normal">
            Bề mặt liên kết liền mạch 120x240cm thay thế hoàn toàn đường ron gạch truyền thống.
          </p>
        </div>

        {/* Spotlight 1: Calacatta Gold (Asymmetric Left Image / Right Specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#9A7B4F]/30 group cursor-pointer"
            onClick={() => onSelectProduct(flagship1)}
            data-cursor="hover"
            data-cursor-text="EXPLORE"
          >
            <Image
              src={flagship1.textureImage}
              alt={flagship1.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2724]/80 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-8 right-8 text-white flex justify-between items-end">
              <div>
                <span className="text-[10px] text-[#E8D0AA] font-bold tracking-[0.2em] uppercase block mb-1">
                  ITALIAN PORCELAIN SLAB
                </span>
                <h3 className="font-heading text-3xl font-normal">{flagship1.title}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(flagship1.textureImage);
                }}
                className="p-3 rounded-full bg-black/60 hover:bg-[#9A7B4F] text-white backdrop-blur-md transition-colors"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.2em] uppercase">
              MÃ SẢN PHẨM: {flagship1.code}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-normal text-[#1C1A17] leading-tight">
              Đường Vân Vàng Calacatta Huyền Thoại Trên Nền Nước Đá Trắng
            </h3>
            <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed">
              {flagship1.application}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#E2DDD5] text-xs">
              <div className="flex justify-between py-1 border-b border-[#E2DDD5]/60">
                <span className="text-[#8B8378]">Kích thước chuẩn:</span>
                <span className="font-bold font-mono text-[#1C1A17]">120 x 240 cm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E2DDD5]/60">
                <span className="text-[#8B8378]">Bề mặt hoàn thiện:</span>
                <span className="font-bold text-[#1C1A17]">Bóng kính Polished</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E2DDD5]/60">
                <span className="text-[#8B8378]">Độ chống thấm:</span>
                <span className="font-bold text-[#9A7B4F]">{"< 0.05% Absolute"}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectProduct(flagship1)}
              data-cursor="hover"
              className="text-xs font-bold text-[#9A7B4F] hover:underline tracking-[0.15em] uppercase flex items-center gap-2 pt-2"
            >
              <span>Xem Thông Số Kỹ Thuật Chi Tiết</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* Spotlight 2: Nero Marquina Black Slab (Flipped Asymmetric) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 lg:order-1 order-2"
          >
            <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.2em] uppercase">
              MÃ SẢN PHẨM: {flagship2.code}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-normal text-[#1C1A17] leading-tight">
              Sự Tinh Tế Huyền Bí Từ Sắc Đen Nero Marquina
            </h3>
            <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed">
              Tạo điểm nhấn đẳng cấp vượt trội cho mặt đảo bếp, vách tivi đại sảnh và phòng tắm master penthouse.
            </p>

            <div className="space-y-3 pt-4 border-t border-[#E2DDD5] text-xs">
              <div className="flex justify-between py-1 border-b border-[#E2DDD5]/60">
                <span className="text-[#8B8378]">Kích thước chuẩn:</span>
                <span className="font-bold font-mono text-[#1C1A17]">120 x 240 cm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E2DDD5]/60">
                <span className="text-[#8B8378]">Độ dày chịu lực:</span>
                <span className="font-bold text-[#1C1A17]">12 mm Premium Extra</span>
              </div>
            </div>

            <button
              onClick={() => onSelectProduct(flagship2)}
              data-cursor="hover"
              className="text-xs font-bold text-[#9A7B4F] hover:underline tracking-[0.15em] uppercase flex items-center gap-2 pt-2"
            >
              <span>Xem Thông Số Kỹ Thuật Chi Tiết</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#9A7B4F]/30 group cursor-pointer lg:order-2 order-1"
            onClick={() => onSelectProduct(flagship2)}
            data-cursor="hover"
            data-cursor-text="EXPLORE"
          >
            <Image
              src={flagship2.textureImage}
              alt={flagship2.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2724]/80 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-8 right-8 text-white flex justify-between items-end">
              <div>
                <span className="text-[10px] text-[#E8D0AA] font-bold tracking-[0.2em] uppercase block mb-1">
                  SPANISH MARBLE SLAB
                </span>
                <h3 className="font-heading text-3xl font-normal">{flagship2.title}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(flagship2.textureImage);
                }}
                className="p-3 rounded-full bg-black/60 hover:bg-[#9A7B4F] text-white backdrop-blur-md transition-colors"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
