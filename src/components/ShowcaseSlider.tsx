"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Language } from "@/data/translations";

interface Slide {
  src: string;
  labelEn: string;
  labelAr: string;
  captionEn: string;
  captionAr: string;
}

const slides: Slide[] = [
  {
    src: "/living_room_showroom.png",
    labelEn: "LAN Fawzy Showroom",
    labelAr: "معرض لان فوزي",
    captionEn: "Premium Korean PS Louvers — Natural Oak Finish",
    captionAr: "لوفر PS الكوري الفاخر — تشطيب أوك طبيعي",
  },
  {
    src: "/showcase_oak_living.png",
    labelEn: "Living Room | Oak",
    labelAr: "غرفة المعيشة | أوك",
    captionEn: "Warm oak vertical louver cladding, creating depth and elegance",
    captionAr: "تكسية ألواح عمودية بخشب الأوك الدافئ تمنح عمقاً وأناقة",
  },
  {
    src: "/showcase_charcoal_office.png",
    labelEn: "Executive Office | Charcoal",
    labelAr: "مكتب تنفيذي | شاركول",
    captionEn: "Dramatic charcoal panels for bold, modern workspaces",
    captionAr: "ألواح شاركول الجريئة لبيئات عمل عصرية",
  },
  {
    src: "/showcase_marble_bedroom.png",
    labelEn: "Master Bedroom | Marble",
    labelAr: "غرفة نوم | رخام",
    captionEn: "Calacatta marble alternative — the luxury of stone without the weight",
    captionAr: "بديل رخام كالاكاتا — فخامة الحجر بدون ثقله",
  },
  {
    src: "/showcase_walnut_reception.png",
    labelEn: "Hotel Lobby | Walnut",
    labelAr: "بهو الفندق | والنت",
    captionEn: "Rich dark walnut floor-to-ceiling panels for grand entrances",
    captionAr: "ألواح والنت الداكن من الأرض للسقف للمداخل الفارهة",
  },
];

export default function ShowcaseSlider({ lang }: { lang: Language }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const isAr = lang === "ar";

  return (
    <section
      className="relative py-24 overflow-hidden bg-premium-dark border-b border-primary/10"
      aria-label={isAr ? "معرض الصور" : "Showcase Gallery"}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
          {isAr ? "إلهام حقيقي" : "Real Installations"}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold gold-text-gradient mb-4">
          {isAr ? "ألهم مساحتك" : "Inspire Your Space"}
        </h2>
        <p className="text-premium-beige/65 max-w-xl mx-auto text-base">
          {isAr
            ? "تصفح تطبيقات واقعية لخاماتنا الكورية في مشاريع فاخرة حول مصر والشرق الأوسط."
            : "Browse real-world applications of our Korean materials in luxury projects across Egypt and the Middle East."}
        </p>
      </div>

      {/* Slider Container */}
      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Slide Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_32px_80px_rgba(0,0,0,0.7)] aspect-[16/9] bg-premium-charcoal">
          {slides.map((slide, idx) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-all duration-700 ease-in-out"
              style={{
                opacity: idx === current ? 1 : 0,
                transform: idx === current ? "scale(1)" : "scale(1.03)",
                pointerEvents: idx === current ? "auto" : "none",
              }}
              aria-hidden={idx !== current}
            >
              <Image
                src={slide.src}
                alt={isAr ? slide.labelAr : slide.labelEn}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          ))}

          {/* Slide Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/25 border border-primary/40 backdrop-blur-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary-light">
                {isAr ? slides[current].labelAr : slides[current].labelEn}
              </span>
            </div>
            <p className="text-white text-lg sm:text-xl font-semibold max-w-lg leading-snug drop-shadow-md">
              {isAr ? slides[current].captionAr : slides[current].captionEn}
            </p>
          </div>

          {/* Slide counter */}
          <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-bold text-white tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            aria-label={isAr ? "السابق" : "Previous slide"}
            className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/55 hover:bg-primary/80 border border-white/15 hover:border-primary text-white flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <button
            onClick={next}
            aria-label={isAr ? "التالي" : "Next slide"}
            className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/55 hover:bg-primary/80 border border-white/15 hover:border-primary text-white flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>

        {/* Progress Dots + Bar */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Dot navigation */}
          <div className="flex items-center gap-2.5" role="tablist" aria-label={isAr ? "انتقل للشريحة" : "Go to slide"}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => goTo(idx)}
                className="group relative flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    idx === current
                      ? "w-8 h-2.5 bg-primary shadow-[0_0_8px_rgba(176,141,92,0.7)]"
                      : "w-2.5 h-2.5 bg-premium-beige/25 hover:bg-primary/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs h-px bg-premium-beige/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className={`h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-none ${
                isPaused ? "" : "animate-progress-bar"
              }`}
              style={{
                width: `${((current + 1) / slides.length) * 100}%`,
                transition: "width 0.7s ease",
              }}
            />
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-6 flex gap-3 justify-center">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`relative w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                idx === current
                  ? "border-primary shadow-[0_0_10px_rgba(176,141,92,0.5)] scale-105"
                  : "border-white/10 opacity-50 hover:opacity-80 hover:border-primary/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
