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
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onClick={onClick}
      data-cursor="hover"
      data-cursor-text="VIEW"
      className="group cursor-pointer space-y-4 relative"
    >
      {/* Image Container with Shimmer & Slow Zoom */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E2DED6] group-hover:border-[#C5A880] group-hover:shadow-[0_20px_40px_rgba(197,168,128,0.2)] transition-all duration-500">
        <Image
          src={product.textureImage}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Soft Titanium Gold Hover Tint */}
        <div className="absolute inset-0 bg-[#C5A880]/0 group-hover:bg-[#C5A880]/10 transition-colors duration-500 pointer-events-none" />

        {product.badge && (
          <span className="absolute top-4 left-4 bg-[#0D0D0C]/90 backdrop-blur-md border border-[#C5A880]/40 text-white text-[10px] uppercase font-mono font-bold tracking-[0.15em] px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Content with Upward Shift on Hover */}
      <div className="space-y-1.5 group-hover:-translate-y-1 transition-transform duration-400 ease-out">
        <span className="text-[10px] text-[#C5A880] font-mono font-bold tracking-[0.2em] uppercase block">
          {product.series} • {product.size}
        </span>
        <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-[#121110] group-hover:text-[#C5A880] transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-[#78736A] font-medium">
          Xuất xứ: <b className="text-[#121110]">{product.origin}</b> • Bề mặt: <b className="text-[#121110]">{product.finish}</b>
        </p>
        <span className="text-xs font-extrabold text-[#C5A880] group-hover:underline mt-2 inline-block uppercase tracking-wider">
          Khám phá chi tiết →
        </span>
      </div>
    </motion.div>
  );
}
