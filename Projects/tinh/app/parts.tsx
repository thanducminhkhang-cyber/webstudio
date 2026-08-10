"use client";

import Image from "next/image";
import React, { useEffect } from "react";

/* ============================================================================
   MotionProvider — Lenis smooth scroll + GSAP/ScrollTrigger.
   • prefers-reduced-motion: không smooth-scroll, CSS đã hiện hết nội dung.
   • JS lỗi / GSAP không tải được: revealAll() để nội dung luôn hiện.
   • Chỉ animate transform/opacity.
   ========================================================================== */
export function MotionProvider() {
  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapRef: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tickerFn: any = null;
    let cleanupExtra: (() => void) | null = null;

    const HERO_SEL =
      "[data-hero-line],[data-hero-seal],[data-hero-img-inner],[data-hero-eyebrow],[data-hero-sub],[data-hero-cta]";

    // Hiện phần tử bằng style trực tiếp (KHÔNG phụ thuộc rAF/GSAP).
    const snap = (sel: string, inViewOnly = false) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (inViewOnly) {
          const r = el.getBoundingClientRect();
          if (!(r.top < window.innerHeight * 0.95 && r.bottom > 0)) return;
        }
        el.style.opacity = "1";
        el.style.transform = "none";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any).__rv = true;
      });
    };

    // FAILSAFE: nếu animation không chạy được (rAF bị đóng băng / GSAP lỗi),
    // vẫn hiện hero + nội dung đang trong khung nhìn sau 1.8s => "visible by default".
    const failsafe = window.setTimeout(() => {
      snap(HERO_SEL);
      snap("[data-reveal]", true);
    }, 1800);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      if (reduce) return; // CSS @media đã hiện hết; giữ trang tĩnh.
      try {
        const [gsapMod, stMod, lenisMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
        if (cancelled) return;

        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger;
        const Lenis = lenisMod.default;
        gsap.registerPlugin(ScrollTrigger);
        gsapRef = gsap;

        // --- Lenis ---
        lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        tickerFn = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        // Anchor links -> cuộn mượt bằng Lenis
        const onAnchor = (e: MouseEvent) => {
          const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
          if (!a) return;
          const id = a.getAttribute("href");
          if (!id || id.length < 2) return;
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -12 });
          }
        };
        document.addEventListener("click", onAnchor);

        // --- HERO load-in (orchestrated ~1.2s) ---
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to("[data-hero-eyebrow]", { opacity: 1, y: 0, duration: 0.6 })
          .to("[data-hero-line]", { yPercent: 0, duration: 1.05, stagger: 0.12 }, "-=0.15")
          .to("[data-hero-sub]", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
          .to("[data-hero-cta]", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to("[data-hero-seal]", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, "-=0.65")
          .to("[data-hero-img-inner]", { scale: 1, duration: 1.6, ease: "power2.out" }, 0);

        // --- Scroll reveals: theo scroll thật (+ IO dự phòng) ---
        const revealEl = (el: Element) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((el as any).__rv) return;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (el as any).__rv = true;
          gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", overwrite: true });
        };
        const checkReveals = () => {
          const vh = window.innerHeight;
          document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((el as any).__rv) return;
            const r = el.getBoundingClientRect();
            if (r.top < vh * 0.88 && r.bottom > 0) revealEl(el);
          });
        };
        checkReveals();
        window.addEventListener("scroll", checkReveals, { passive: true });
        window.addEventListener("resize", checkReveals);
        lenis.on("scroll", checkReveals);

        const io = new IntersectionObserver(
          (entries) => entries.forEach((en) => en.isIntersecting && revealEl(en.target)),
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

        // --- Parallax (giữ scale để không hở mép) ---
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 6, scale: 1.12 },
            {
              yPercent: -6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        ScrollTrigger.refresh();

        cleanupExtra = () => {
          document.removeEventListener("click", onAnchor);
          window.removeEventListener("scroll", checkReveals);
          window.removeEventListener("resize", checkReveals);
          io.disconnect();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      } catch {
        snap(HERO_SEL);
        snap("[data-reveal]");
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      try {
        if (gsapRef && tickerFn) gsapRef.ticker.remove(tickerFn);
      } catch {}
      try {
        cleanupExtra?.();
      } catch {}
      try {
        lenis?.destroy();
      } catch {}
    };
  }, []);

  return null;
}

/* ============================================================================
   Seal — con dấu triện đỏ son (logomark). Ký tự "An" (Thanh An).
   ========================================================================== */
export function Seal({
  size = 56,
  className = "",
  label = "Con dấu triện Thanh An",
}: {
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={`seal ${className}`.trim()}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
      role="img"
      aria-label={label}
    >
      <span style={{ fontStyle: "italic", fontWeight: 500, transform: "translateY(-1px)" }}>An</span>
    </span>
  );
}

/* ============================================================================
   EggNum — số La Mã trên nền cẩn trứng (vỏ trứng rạn).
   ========================================================================== */
export function EggNum({ children }: { children: React.ReactNode }) {
  return (
    <span className="eggnum eggshell" aria-hidden="true">
      <span className="eggnum-text">{children}</span>
    </span>
  );
}

/* ============================================================================
   Figure — ảnh thật (next/image) trong khung; hỗ trợ parallax + caption.
   Đổi ảnh tại IMG trong page.tsx. TODO: thay bằng ảnh thật của nhà hàng.
   ========================================================================== */
export function Figure({
  src,
  alt,
  caption,
  className = "",
  style,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  parallax = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
}) {
  return (
    <figure className={`gfig ${className}`.trim()} style={style}>
      <div className="absolute inset-0" data-parallax={parallax ? "" : undefined}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ filter: "saturate(0.9) brightness(0.92)" }}
        />
      </div>
      {caption ? <figcaption className="gcap">{caption}</figcaption> : null}
    </figure>
  );
}
