"use client";

import React, { useState, use } from "react";
import { translations, Language } from "@/data/translations";
import {
  Calculator,
  Plus,
  Trash2,
  MessageSquare,
  ArrowRight,
  Minus,
  Ruler,
  DoorOpen,
} from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

type ProductCategory = "louver" | "flat-ps" | "flat-pvc" | "chipboard";

interface Deduction {
  id: number;
  width: number;
  height: number;
}

interface Wall {
  id: number;
  width: number;
  height: number;
  deductions: Deduction[];
}

let nextId = 1;
const uid = () => nextId++;

export default function CalculatorPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;
  const isRtl = lang === "ar";

  const [productType, setProductType] = useState<ProductCategory>("louver");
  const [walls, setWalls] = useState<Wall[]>([
    { id: uid(), width: 3.0, height: 2.8, deductions: [] },
  ]);

  // ── Wall helpers ──────────────────────────────────────────────────────────
  const addWall = () => {
    if (walls.length >= 6) return;
    setWalls((prev) => [
      ...prev,
      { id: uid(), width: 3.0, height: 2.8, deductions: [] },
    ]);
  };

  const removeWall = (wallId: number) =>
    setWalls((prev) => prev.filter((w) => w.id !== wallId));

  const updateWall = (wallId: number, field: "width" | "height", val: string) =>
    setWalls((prev) =>
      prev.map((w) =>
        w.id === wallId ? { ...w, [field]: parseFloat(val) || 0 } : w
      )
    );

  const addDeduction = (wallId: number) =>
    setWalls((prev) =>
      prev.map((w) =>
        w.id === wallId
          ? { ...w, deductions: [...w.deductions, { id: uid(), width: 0.9, height: 2.1 }] }
          : w
      )
    );

  const removeDeduction = (wallId: number, dedId: number) =>
    setWalls((prev) =>
      prev.map((w) =>
        w.id === wallId
          ? { ...w, deductions: w.deductions.filter((d) => d.id !== dedId) }
          : w
      )
    );

  const updateDeduction = (
    wallId: number,
    dedId: number,
    field: "width" | "height",
    val: string
  ) =>
    setWalls((prev) =>
      prev.map((w) =>
        w.id === wallId
          ? {
              ...w,
              deductions: w.deductions.map((d) =>
                d.id === dedId ? { ...d, [field]: parseFloat(val) || 0 } : d
              ),
            }
          : w
      )
    );

  // ── Calculation ───────────────────────────────────────────────────────────
  const wallAreas = walls.map((w) => {
    const gross = w.width * w.height;
    const deducted = w.deductions.reduce((s, d) => s + d.width * d.height, 0);
    return Math.max(0, gross - deducted);
  });

  const totalNetArea = wallAreas.reduce((s, a) => s + a, 0);

  const computeResults = (cat: ProductCategory, netSqm: number) => {
    const safety = 1.05;
    if (cat === "louver" || cat === "flat-ps") {
      const panelArea = 0.12 * 2.9; // 0.348 m²
      const panels = Math.ceil(Math.ceil(netSqm / panelArea) * safety);
      const glue = Math.max(1, Math.ceil(panels / 5));
      return { panels, glue };
    } else if (cat === "flat-pvc") {
      const panelArea = 0.60 * 2.8; // 1.68 m²
      const panels = Math.ceil(Math.ceil(netSqm / panelArea) * safety);
      const glue = Math.max(1, Math.ceil(panels / 2));
      return { panels, glue };
    } else {
      const panelArea = 1.22 * 2.8; // 3.416 m²
      const panels = Math.ceil(Math.ceil(netSqm / panelArea) * safety);
      const glue = Math.max(1, panels);
      return { panels, glue };
    }
  };

  const results = computeResults(productType, totalNetArea);

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  const productLabels: Record<ProductCategory, string> = {
    louver: t.calculator.productTypes.louver,
    "flat-ps": t.calculator.productTypes.flatPs,
    "flat-pvc": t.calculator.productTypes.flatPvc,
    chipboard: t.calculator.productTypes.chipboard,
  };

  const getWhatsAppLink = () => {
    const msg = t.calculator.whatsappMessage
      .replace("{product}", productLabels[productType])
      .replace("{area}", totalNetArea.toFixed(2))
      .replace("{panels}", results.panels.toString())
      .replace("{glue}", results.glue.toString());
    return `https://wa.me/201040044415?text=${encodeURIComponent(msg)}`;
  };

  // ── Product option data ───────────────────────────────────────────────────
  const productOptions: {
    value: ProductCategory;
    label: string;
    dims: string;
    thickness: string;
    image: string;
    bestFor: string;
    bestForAr: string;
    specs: string[];
    specsAr: string[];
  }[] = [
    {
      value: "louver",
      label: t.calculator.productTypes.louver,
      dims: "12 × 290 cm",
      thickness: "12mm",
      image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_076.png?ssl=1",
      bestFor: "Accent walls & feature panels",
      bestForAr: "حوائط مميزة وديكورات بارزة",
      specs: ["100% Solid-core PS", "Waterproof & insect-proof", "Wood-grain textures", "FDA approved"],
      specsAr: ["هيكل PS صلب 100%", "مقاوم للماء والحشرات", "ملمس خشبي طبيعي", "معتمد FDA"],
    },
    {
      value: "flat-ps",
      label: t.calculator.productTypes.flatPs,
      dims: "60 × 290 cm",
      thickness: "12mm",
      image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1963-scaled.jpeg?ssl=1",
      bestFor: "Sleek modern & minimalist walls",
      bestForAr: "حوائط عصرية ومينيمالست",
      specs: ["Flat contemporary finish", "Zero hollow pockets", "Matte surface coating", "Eco-friendly"],
      specsAr: ["تشطيب معاصر مستوٍ", "بدون فراغات داخلية", "طبقة سطحية مطفأة", "صديق للبيئة"],
    },
    {
      value: "flat-pvc",
      label: t.calculator.productTypes.flatPvc,
      dims: "60 × 280 cm",
      thickness: "5mm",
      image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2906-scaled.jpg?ssl=1",
      bestFor: "3D effect & marble-look walls",
      bestForAr: "تأثير ثلاثي الأبعاد ومظهر رخامي",
      specs: ["PVC 3D flat cladding", "100% Waterproof", "Scratch resistant", "Silicone install"],
      specsAr: ["تكسية PVC ثلاثية الأبعاد", "مقاومة للماء 100%", "مقاومة للخدوش", "تركيب بالسيليكون"],
    },
    {
      value: "chipboard",
      label: t.calculator.productTypes.chipboard,
      dims: "122 × 280 cm",
      thickness: "18mm",
      image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E123-scaled.png?ssl=1",
      bestFor: "Luxury feature walls & ceilings",
      bestForAr: "حوائط رئيسية فاخرة وأسقف",
      specs: ["PVC + stone powder core", "Chemical resistant", "No bubbling or peeling", "Premium coating"],
      specsAr: ["PVC ممزوج ببودرة الحجر", "مقاومة كيميائية", "لا تقشير ولا فقاعات", "تلميع فاخر"],
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-premium-dark text-premium-beige">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-5 border border-primary/20">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.calculator.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Step 1 – Product selector */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold shrink-0">1</span>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-light">
              {t.calculator.selectProduct}
            </h2>
          </div>

          {/* Rich visual cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productOptions.map((opt) => {
              const isSelected = productType === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setProductType(opt.value)}
                  className={`group relative flex flex-col rounded-2xl border overflow-hidden text-left rtl:text-right transition-all duration-300 ${
                    isSelected
                      ? "border-primary shadow-[0_0_24px_rgba(176,141,92,0.3)] scale-[1.02]"
                      : "border-primary/15 hover:border-primary/50 hover:scale-[1.01]"
                  }`}
                >
                  {/* Selected indicator ring */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/60 pointer-events-none z-10" />
                  )}

                  {/* Product image */}
                  <div className="relative h-36 w-full overflow-hidden bg-premium-charcoal/60 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={opt.image}
                      alt={opt.label}
                      className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? "bg-primary/20" : "bg-black/30 group-hover:bg-black/15"}`} />

                    {/* Dimension badge */}
                    <div className="absolute bottom-2 start-2 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white/90 border border-white/10">
                        {opt.dims}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono text-primary/90 border border-primary/20">
                        {opt.thickness}
                      </span>
                    </div>

                    {/* Selected checkmark */}
                    {isSelected && (
                      <div className="absolute top-2 end-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className={`flex flex-col flex-grow p-3.5 transition-colors duration-300 ${isSelected ? "bg-primary/8" : "bg-premium-charcoal/40 group-hover:bg-premium-charcoal/60"}`}>
                    {/* Title */}
                    <p className={`text-xs font-bold leading-snug mb-1.5 ${isSelected ? "text-white" : "text-premium-beige/90"}`}>
                      {opt.label}
                    </p>

                    {/* Best for tag */}
                    <p className={`text-[10px] font-medium mb-2.5 ${isSelected ? "text-primary-light" : "text-primary/60"}`}>
                      ✦ {isRtl ? opt.bestForAr : opt.bestFor}
                    </p>

                    {/* Spec bullets */}
                    <ul className="space-y-1 mt-auto">
                      {(isRtl ? opt.specsAr : opt.specs).map((spec, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className={`mt-0.5 shrink-0 w-1 h-1 rounded-full ${isSelected ? "bg-primary" : "bg-premium-beige/30"}`} />
                          <span className={`text-[10px] leading-tight ${isSelected ? "text-premium-beige/80" : "text-premium-beige/50"}`}>
                            {spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2 – Walls */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold shrink-0">2</span>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-light">
                {t.calculator.walls}
              </h2>
            </div>
            {walls.length < 6 && (
              <button
                onClick={addWall}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/15 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.calculator.addWall}
              </button>
            )}
          </div>

          <div className="space-y-4">
            {walls.map((wall, wIdx) => {
              const gross = wall.width * wall.height;
              const deducted = wall.deductions.reduce((s, d) => s + d.width * d.height, 0);
              const netArea = Math.max(0, gross - deducted);

              return (
                <div
                  key={wall.id}
                  className="premium-glass rounded-2xl border border-primary/15 overflow-hidden"
                >
                  {/* Wall header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-primary/10 bg-premium-charcoal/30">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-white">
                        {t.calculator.wallLabel} {wIdx + 1}
                      </span>
                      <span className="text-xs text-primary/60 font-mono">
                        {netArea.toFixed(2)} m²
                      </span>
                    </div>
                    {walls.length > 1 && (
                      <button
                        onClick={() => removeWall(wall.id)}
                        className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Width / Height */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary-light">
                          {t.calculator.wallWidth}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={wall.width}
                          onChange={(e) => updateWall(wall.id, "width", e.target.value)}
                          className="w-full px-3 py-2.5 bg-premium-charcoal border border-primary/20 rounded-lg text-premium-beige text-sm focus:border-primary focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary-light">
                          {t.calculator.wallHeight}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={wall.height}
                          onChange={(e) => updateWall(wall.id, "height", e.target.value)}
                          className="w-full px-3 py-2.5 bg-premium-charcoal border border-primary/20 rounded-lg text-premium-beige text-sm focus:border-primary focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Deductions */}
                    {wall.deductions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-premium-beige/50 flex items-center gap-1.5">
                          <DoorOpen className="w-3.5 h-3.5" />
                          {t.calculator.deductions}
                        </p>
                        {wall.deductions.map((ded) => (
                          <div key={ded.id} className="flex items-center gap-2">
                            <input
                              type="number"
                              step="0.05"
                              min="0.1"
                              placeholder={t.calculator.deductionWidth}
                              value={ded.width}
                              onChange={(e) => updateDeduction(wall.id, ded.id, "width", e.target.value)}
                              className="flex-1 px-2.5 py-2 bg-premium-charcoal/60 border border-primary/10 rounded-lg text-premium-beige text-xs focus:border-primary/40 focus:outline-none"
                            />
                            <span className="text-premium-beige/30 text-xs shrink-0">×</span>
                            <input
                              type="number"
                              step="0.05"
                              min="0.1"
                              placeholder={t.calculator.deductionHeight}
                              value={ded.height}
                              onChange={(e) => updateDeduction(wall.id, ded.id, "height", e.target.value)}
                              className="flex-1 px-2.5 py-2 bg-premium-charcoal/60 border border-primary/10 rounded-lg text-premium-beige text-xs focus:border-primary/40 focus:outline-none"
                            />
                            <button
                              onClick={() => removeDeduction(wall.id, ded.id)}
                              className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all shrink-0"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => addDeduction(wall.id)}
                      className="inline-flex items-center gap-1 text-xs text-primary/50 hover:text-primary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      {t.calculator.addDeduction}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Results */}
        <section className="premium-glass rounded-2xl border border-primary/20 overflow-hidden shadow-[0_0_40px_rgba(176,141,92,0.08)]">
          <div className="px-6 py-4 border-b border-primary/15 bg-primary/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              {isRtl ? "نتيجة الحساب" : "Estimate Results"}
            </h2>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Net area */}
              <div className="flex flex-col gap-1 p-5 rounded-xl bg-premium-charcoal/50 border border-primary/10">
                <span className="text-xs font-semibold text-premium-beige/60 uppercase tracking-wider">
                  {t.calculator.netArea}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-white">{totalNetArea.toFixed(2)}</span>
                  <span className="text-sm text-premium-beige/50">m²</span>
                </div>
              </div>

              {/* Panels */}
              <div className="flex flex-col gap-1 p-5 rounded-xl bg-primary/10 border border-primary/30">
                <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                  {t.calculator.panelRequired}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-primary">{results.panels}</span>
                  <span className="text-sm text-primary/60">{isRtl ? "لوح" : "pcs"}</span>
                </div>
              </div>

              {/* Glue */}
              <div className="flex flex-col gap-1 p-5 rounded-xl bg-premium-charcoal/50 border border-primary/10">
                <span className="text-xs font-semibold text-premium-beige/60 uppercase tracking-wider">
                  {t.calculator.glueRequired}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-white">{results.glue}</span>
                  <span className="text-sm text-premium-beige/50">{isRtl ? "أنبوب" : "tubes"}</span>
                </div>
              </div>
            </div>

            {/* Per-wall breakdown */}
            {walls.length > 1 && (
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-premium-beige/40 mb-2">
                  {isRtl ? "تفصيل الحوائط" : "Wall Breakdown"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {walls.map((w, i) => {
                    const g = w.width * w.height;
                    const d = w.deductions.reduce((s, x) => s + x.width * x.height, 0);
                    const net = Math.max(0, g - d);
                    return (
                      <span key={w.id} className="px-3 py-1.5 rounded-lg bg-premium-charcoal/60 border border-primary/10 text-xs text-premium-beige/70">
                        <span className="text-primary font-semibold">{t.calculator.wallLabel} {i + 1}:</span> {net.toFixed(2)} m²
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-xs text-premium-beige/35 italic mb-6">{t.calculator.wastageNote}</p>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base hover:shadow-[0_0_24px_rgba(176,141,92,0.45)] hover:scale-[1.01] transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>{t.calculator.ctaQuote}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

