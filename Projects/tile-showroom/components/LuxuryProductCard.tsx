"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TileProduct } from "../app/page";

interface LuxuryProductCardProps {
  product: TileProduct;
  onClick: () => void;
}

export default function LuxuryProductCard({ product, onClick }: LuxuryProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onClick={onClick}
      data-cursor="hover"
      data-cursor-text="VIEW"
      className="group cursor-pointer space-y-4 relative"
    >
      {/* Image Container with Shimmer & Slow Zoom */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FBFAF8] border border-[#E2DDD5] group-hover:border-[#9A7B4F]/50 group-hover:shadow-[0_20px_40px_rgba(154,123,79,0.15)] transition-all duration-700">
        <Image
          src={product.textureImage}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Soft Bronze Hover Tint */}
        <div className="absolute inset-0 bg-[#9A7B4F]/0 group-hover:bg-[#9A7B4F]/10 transition-colors duration-500 pointer-events-none" />

        {product.badge && (
          <span className="absolute top-4 left-4 bg-[#2A2724] text-white text-[10px] uppercase font-bold tracking-[0.15em] px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Content with 4px Upward Shift on Hover */}
      <div className="space-y-1 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
        <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.15em] uppercase block">
          {product.series} • {product.size}
        </span>
        <h3 className="font-heading font-normal text-2xl text-[#1C1A17] group-hover:text-[#9A7B4F] transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-[#8B8378] font-medium">
          Xuất xứ: <b>{product.origin}</b> • Bề mặt: <b>{product.finish}</b>
        </p>
        <span className="text-xs font-bold text-[#9A7B4F] group-hover:underline mt-2 inline-block">
          Khám phá bộ sưu tập →
        </span>
      </div>
    </motion.div>
  );
}
