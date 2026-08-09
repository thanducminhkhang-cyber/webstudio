"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";

/* ============================================================================
   SIGNATURE — motif khảm vỏ trứng (eggshell inlay).
   Một hairline brass mảnh + các mảnh vỏ trứng li ti (SVG, không phải ảnh nặng).
   CHỈ dùng ở divider giữa section và gạch chân wordmark — không bê đi nơi khác.

   Các mảnh được sinh bằng LCG có seed cố định => server và client render
   giống hệt nhau (không lệch hydration). Pattern userSpaceOnUse để mảnh vỏ
   không bị kéo méo dù divider rộng bao nhiêu.
   ========================================================================== */
function makeTileShards() {
  let s = 20240517;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const W = 150;
  const H = 24;
  const CY = 12;
  const n = 20;
  const shards: { cx: number; cy: number; rot: number; op: number; pts: string }[] = [];
  for (let i = 0; i < n; i++) {
    const cx = rnd() * W;
    const cy = CY + (rnd() - 0.5) * 11;
    const size = 1.2 + rnd() * 3;
    const rot = Math.round(rnd() * 90);
    const op = +(0.4 + rnd() * 0.5).toFixed(2);
    const pts = [
      [-size * (0.6 + rnd() * 0.6), -size * (0.5 + rnd() * 0.5)],
      [size * (0.5 + rnd() * 0.7), -size * (0.4 + rnd() * 0.6)],
      [size * (0.6 + rnd() * 0.5), size * (0.5 + rnd() * 0.6)],
      [-size * (0.5 + rnd() * 0.6), size * (0.4 + rnd() * 0.7)],
    ]
      .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");
    shards.push({ cx: +cx.toFixed(1), cy: +cy.toFixed(1), rot, op, pts });
  }
  return { W, H, shards };
}
const TILE = makeTileShards();

export function EggshellInlay({
  height = 24,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const patId = `egg-${uid}`;
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <pattern id={patId} x="0" y="0" width={TILE.W} height={height} patternUnits="userSpaceOnUse">
          {TILE.shards.map((sh, i) => (
            <polygon
              key={i}
              points={sh.pts}
              transform={`translate(${sh.cx} ${sh.cy}) rotate(${sh.rot})`}
              fill="var(--color-eggshell)"
              opacity={sh.op}
            />
          ))}
        </pattern>
      </defs>
      {/* hairline brass */}
      <rect x="0" y={height / 2 - 0.4} width="100%" height="0.8" fill="var(--color-brass)" opacity="0.5" />
      {/* mảnh vỏ trứng khảm lên trên */}
      <rect x="0" y="0" width="100%" height={height} fill={`url(#${patId})`} />
    </svg>
  );
}

/* ============================================================================
   Reveal — fade/slide nhẹ khi vào khung nhìn. prefers-reduced-motion đã tắt
   hiệu ứng ở globals.css (.reveal luôn hiện).
   ========================================================================== */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ============================================================================
   Photo — placeholder ảnh bằng màu solid, có alt tiếng Việt (role="img").
   Khi có ảnh thật: thay bằng <Image ... alt={label} loading="lazy" />.
   ========================================================================== */
export function Photo({
  label,
  className = "",
  style,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`photo-ph ${className}`.trim()} role="img" aria-label={label} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ============================================================================
   Figure — ảnh thật (next/image), khung brass mảnh + tông tối hoà sơn mài.
   Lazy-load mặc định; `alt` tiếng Việt bắt buộc. Đổi ảnh tại IMG trong page.tsx.
   ========================================================================== */
export function Figure({
  src,
  alt,
  className = "",
  style,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo-ph ${className}`.trim()} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ filter: "saturate(0.9) brightness(0.9)" }}
      />
    </div>
  );
}
