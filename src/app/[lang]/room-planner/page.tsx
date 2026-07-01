"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import { translations, Language } from "@/data/translations";
import {
  Layers, ArrowRight, RotateCcw, Share2, Calculator,
  Eye, CheckCircle2, ChevronRight, Sparkles, Info,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type RoomShape = "rectangle" | "lShape" | "uShape" | "galley" | "island" | "gShape";

type LayoutSuggestion = {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  efficiencyPct: number;
  counterLengthFn: (w: number, d: number) => number;
  cabinetsFn: (w: number, d: number) => number;
  workTriangle: "good" | "fair" | "poor";
  wallPanel: "oak" | "charcoal" | "walnut" | "white" | "marble";
  tags: string[];
  tagsAr: string[];
  pros: string[];
  prosAr: string[];
};

type PageProps = { params: Promise<{ lang: string }> };

// ── Shape Definitions ─────────────────────────────────────────────────────
const SHAPES: { key: RoomShape; labelEn: string; labelAr: string; svgPath: string }[] = [
  { key: "rectangle", labelEn: "Rectangle",      labelAr: "مستطيل",       svgPath: "M4,4 L60,4 L60,56 L4,56 Z" },
  { key: "lShape",    labelEn: "L-Shape",         labelAr: "شكل L",        svgPath: "M4,4 L60,4 L60,32 L36,32 L36,56 L4,56 Z" },
  { key: "uShape",    labelEn: "U-Shape",         labelAr: "شكل U",        svgPath: "M4,4 L60,4 L60,56 L44,56 L44,24 L20,24 L20,56 L4,56 Z" },
  { key: "galley",    labelEn: "Galley",          labelAr: "ممر مزدوج",    svgPath: "M4,4 L60,4 L60,56 L4,56 Z" },
  { key: "island",    labelEn: "Island",          labelAr: "جزيرة وسطى",  svgPath: "M4,4 L60,4 L60,56 L4,56 Z" },
  { key: "gShape",    labelEn: "G-Shape",         labelAr: "شكل G",        svgPath: "M4,4 L60,4 L60,56 L28,56 L28,40 L44,40 L44,4" },
];

// ── Layout Catalog ────────────────────────────────────────────────────────
const ALL_LAYOUTS: LayoutSuggestion[] = [
  {
    id: "single-wall",
    name: "Single-Wall Kitchen",
    nameAr: "مطبخ أحادي الحائط",
    description: "All appliances and cabinets along one wall. Perfect for narrow spaces and open-plan living.",
    descriptionAr: "كل الأجهزة والخزائن على حائط واحد. مثالي للمساحات الضيقة والشقق المفتوحة.",
    efficiencyPct: 72,
    counterLengthFn: (w) => +(w * 0.85).toFixed(1),
    cabinetsFn: (w) => Math.floor(w / 0.6) + 2,
    workTriangle: "fair",
    wallPanel: "white",
    tags: ["Compact", "Open-Plan", "Budget"],
    tagsAr: ["مضغوط", "مفتوح", "اقتصادي"],
    pros: ["Easy to clean", "Maximum open floor space", "Suits studio apartments"],
    prosAr: ["سهل التنظيف", "أقصى مساحة للأرضية", "مناسب للشقق الاستوديو"],
  },
  {
    id: "galley",
    name: "Galley Kitchen",
    nameAr: "مطبخ الممر المزدوج",
    description: "Two parallel counter runs facing each other. Maximizes workflow efficiency for narrow rooms.",
    descriptionAr: "صفان متوازيان من الكونتر في مواجهة بعضهما. يضخم كفاءة العمل في الغرف المستطيلة الضيقة.",
    efficiencyPct: 85,
    counterLengthFn: (w, d) => +((w + d) * 0.7).toFixed(1),
    cabinetsFn: (w, d) => Math.floor(w / 0.6) + Math.floor(d / 0.6),
    workTriangle: "good",
    wallPanel: "charcoal",
    tags: ["High Efficiency", "Professional", "Symmetric"],
    tagsAr: ["كفاءة عالية", "احترافي", "متوازن"],
    pros: ["Short work triangle", "Ideal for chefs", "Easy traffic flow"],
    prosAr: ["مثلث عمل قصير", "مثالي لعشاق الطبخ", "سهل الحركة"],
  },
  {
    id: "l-shape",
    name: "L-Shape Kitchen",
    nameAr: "مطبخ شكل L",
    description: "Cabinets along two adjacent walls forming an L. Versatile and leaves room for a dining table.",
    descriptionAr: "خزائن على حائطين متجاورين بشكل L. متعدد الاستخدامات ويترك مساحة لطاولة الطعام.",
    efficiencyPct: 88,
    counterLengthFn: (w, d) => +((w + d) * 0.8).toFixed(1),
    cabinetsFn: (w, d) => Math.floor((w + d) / 0.6),
    workTriangle: "good",
    wallPanel: "oak",
    tags: ["Versatile", "Family", "Open-Feel"],
    tagsAr: ["متعدد الاستخدام", "عائلي", "مفتوح الشعور"],
    pros: ["Great work triangle", "Natural traffic flow", "Room for kitchen island"],
    prosAr: ["مثلث عمل ممتاز", "حركة طبيعية", "مجال لإضافة جزيرة"],
  },
  {
    id: "u-shape",
    name: "U-Shape Kitchen",
    nameAr: "مطبخ شكل U",
    description: "Counters along three walls for maximum storage. Best for dedicated kitchen rooms.",
    descriptionAr: "كونترات على ثلاثة حوائط لأقصى تخزين. الأفضل لغرف المطبخ المنفصلة.",
    efficiencyPct: 94,
    counterLengthFn: (w, d) => +((w * 2 + d) * 0.75).toFixed(1),
    cabinetsFn: (w, d) => Math.floor((w * 2 + d) / 0.6),
    workTriangle: "good",
    wallPanel: "walnut",
    tags: ["Maximum Storage", "Professional", "Large Space"],
    tagsAr: ["أقصى تخزين", "احترافي", "مساحة كبيرة"],
    pros: ["Highest storage capacity", "Short distances between zones", "Multiple cooks friendly"],
    prosAr: ["أعلى طاقة تخزينية", "مسافات قصيرة بين المناطق", "مناسب لأكثر من طباخ"],
  },
  {
    id: "island",
    name: "Island Kitchen",
    nameAr: "مطبخ الجزيرة الوسطى",
    description: "L-Shape or U-Shape with a central island. The premium open-plan kitchen. Requires minimum 4×4m.",
    descriptionAr: "مطبخ شكل L أو U مع جزيرة مركزية. أفخم تصميم للمطبخ المفتوح. يتطلب مساحة 4×4 م على الأقل.",
    efficiencyPct: 98,
    counterLengthFn: (w, d) => +((w + d + Math.min(w, d) * 0.5) * 0.75).toFixed(1),
    cabinetsFn: (w, d) => Math.floor((w + d + 2) / 0.6),
    workTriangle: "good",
    wallPanel: "marble",
    tags: ["Premium", "Entertaining", "Statement"],
    tagsAr: ["فاخر", "مناسب للضيافة", "مميز"],
    pros: ["Extra prep surface", "Social cooking experience", "Increases home value"],
    prosAr: ["سطح تحضير إضافي", "تجربة طبخ اجتماعية", "يرفع قيمة المنزل"],
  },
  {
    id: "g-shape",
    name: "G-Shape Kitchen",
    nameAr: "مطبخ شكل G",
    description: "U-Shape with an added peninsula on one side. Extra counter space and semi-open breakfast bar.",
    descriptionAr: "شكل U مع رصيف إضافي على جانب واحد. كونتر إضافي ومنطقة إفطار شبه مفتوحة.",
    efficiencyPct: 91,
    counterLengthFn: (w, d) => +((w * 2 + d * 1.5) * 0.7).toFixed(1),
    cabinetsFn: (w, d) => Math.floor((w * 2 + d * 1.5) / 0.6),
    workTriangle: "fair",
    wallPanel: "charcoal",
    tags: ["Generous Storage", "Peninsula", "Semi-Open"],
    tagsAr: ["تخزين وفير", "رصيف جانبي", "شبه مفتوح"],
    pros: ["Peninsula acts as breakfast bar", "Defines kitchen zone", "Lots of counter space"],
    prosAr: ["الرصيف يعمل كبار إفطار", "يحدد منطقة المطبخ", "كونتر واسع جداً"],
  },
];

// ── Layout Matching Engine ────────────────────────────────────────────────
function getLayoutsForShape(shape: RoomShape, width: number, depth: number): LayoutSuggestion[] {
  const area = width * depth;
  const isNarrow = Math.min(width, depth) < 2.5;
  const isSmall = area < 10;
  const isMedium = area >= 10 && area < 20;
  const isLarge = area >= 20;

  switch (shape) {
    case "rectangle":
      if (isNarrow) return [ALL_LAYOUTS[1], ALL_LAYOUTS[0]];
      if (isSmall)  return [ALL_LAYOUTS[0], ALL_LAYOUTS[2]];
      if (isMedium) return [ALL_LAYOUTS[2], ALL_LAYOUTS[1], ALL_LAYOUTS[3]];
      return [ALL_LAYOUTS[2], ALL_LAYOUTS[3], ALL_LAYOUTS[4]];
    case "lShape":
      return [ALL_LAYOUTS[2], ALL_LAYOUTS[3], ALL_LAYOUTS[4]].slice(0, isSmall ? 2 : 3);
    case "uShape":
      return [ALL_LAYOUTS[3], ALL_LAYOUTS[5], ALL_LAYOUTS[4]].slice(0, isSmall ? 2 : 3);
    case "galley":
      return [ALL_LAYOUTS[1], ALL_LAYOUTS[0]];
    case "island":
      if (!isLarge) return [ALL_LAYOUTS[2], ALL_LAYOUTS[3]];
      return [ALL_LAYOUTS[4], ALL_LAYOUTS[3], ALL_LAYOUTS[5]];
    case "gShape":
      return [ALL_LAYOUTS[5], ALL_LAYOUTS[3], ALL_LAYOUTS[4]].slice(0, isSmall ? 2 : 3);
    default:
      return ALL_LAYOUTS.slice(0, 3);
  }
}

// ── SVG Layout Diagram ────────────────────────────────────────────────────
function LayoutDiagram({ layoutId, shape }: { layoutId: string; shape: RoomShape }) {
  const S = 96;
  const roomPaths: Record<RoomShape, string> = {
    rectangle: `M2,2 L${S-2},2 L${S-2},${S-2} L2,${S-2} Z`,
    lShape:    `M2,2 L${S-2},2 L${S-2},${S/2} L${S/2},${S/2} L${S/2},${S-2} L2,${S-2} Z`,
    uShape:    `M2,2 L${S-2},2 L${S-2},${S-2} L${S*0.65},${S-2} L${S*0.65},${S*0.45} L${S*0.35},${S*0.45} L${S*0.35},${S-2} L2,${S-2} Z`,
    galley:    `M2,2 L${S-2},2 L${S-2},${S-2} L2,${S-2} Z`,
    island:    `M2,2 L${S-2},2 L${S-2},${S-2} L2,${S-2} Z`,
    gShape:    `M2,2 L${S-2},2 L${S-2},${S-2} L${S*0.45},${S-2} L${S*0.45},${S*0.65} L${S*0.65},${S*0.65} L${S*0.65},${S*0.35} L${S-2},${S*0.35}`,
  };

  const cabinetBlocks: React.ReactNode[] = [];
  const cab = (x: number, y: number, w: number, h: number, key: string) => (
    <rect key={key} x={x} y={y} width={w} height={h} rx="2" fill="#c8a24a" opacity="0.8" />
  );

  if (layoutId === "single-wall")  { cabinetBlocks.push(cab(4, 4, S-8, 13, "a")); }
  else if (layoutId === "galley")  { cabinetBlocks.push(cab(4, 4, S-8, 12, "a"), cab(4, S-16, S-8, 12, "b")); }
  else if (layoutId === "l-shape") { cabinetBlocks.push(cab(4, 4, S-8, 13, "a"), cab(S-17, 4, 13, S-8, "b")); }
  else if (layoutId === "u-shape") { cabinetBlocks.push(cab(4, 4, S-8, 13, "a"), cab(S-17, 4, 13, S-8, "b"), cab(4, 4, 13, S-8, "c")); }
  else if (layoutId === "island")  { cabinetBlocks.push(cab(4, 4, S-8, 13, "a"), cab(S-17, 4, 13, S/2, "b"), cab(S*0.27, S*0.42, S*0.46, S*0.28, "isl")); }
  else if (layoutId === "g-shape") { cabinetBlocks.push(cab(4, 4, S-8, 13, "a"), cab(S-17, 4, 13, S-8, "b"), cab(4, 4, 13, S-8, "c"), cab(4, S-17, S*0.44, 13, "d")); }

  const zones = [
    { cx: S*0.25, cy: S*0.5, c: "#38bdf8" },
    { cx: S*0.5,  cy: S*0.5, c: "#f97316" },
    { cx: S*0.75, cy: S*0.5, c: "#4ade80" },
  ];

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d={roomPaths[shape]} fill="#1a1a1e" stroke="#c8a24a" strokeWidth="1.5" />
      {Array.from({length:7},(_,i)=><line key={`h${i}`} x1="0" y1={i*16} x2={S} y2={i*16} stroke="#2a2a30" strokeWidth="0.4"/>)}
      {Array.from({length:7},(_,i)=><line key={`v${i}`} x1={i*16} y1="0" x2={i*16} y2={S} stroke="#2a2a30" strokeWidth="0.4"/>)}
      {cabinetBlocks}
      <polygon points={zones.map(z=>`${z.cx},${z.cy}`).join(" ")} fill="rgba(200,162,74,0.07)" stroke="rgba(200,162,74,0.3)" strokeWidth="1" strokeDasharray="3,2"/>
      {zones.map((z,i)=>(
        <g key={i}>
          <circle cx={z.cx} cy={z.cy} r="6" fill={z.c} opacity="0.2"/>
          <circle cx={z.cx} cy={z.cy} r="3.5" fill={z.c}/>
        </g>
      ))}
    </svg>
  );
}

// ── Room Shape Preview ────────────────────────────────────────────────────
function ShapePreview({ path, selected }: { path: string; selected: boolean }) {
  return (
    <svg viewBox="0 0 64 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d={path} fill={selected ? "rgba(200,162,74,0.2)" : "rgba(255,255,255,0.04)"} stroke={selected ? "#c8a24a" : "rgba(255,255,255,0.25)"} strokeWidth={selected ? "2" : "1.5"}/>
    </svg>
  );
}

// ── Efficiency Gauge ──────────────────────────────────────────────────────
function EfficiencyBadge({ pct }: { pct: number }) {
  const color = pct >= 90 ? "#4ade80" : pct >= 80 ? "#fbbf24" : "#94a3b8";
  const r = 22; const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1e1e22" strokeWidth="4"/>
        <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={`${(pct/100)*circ} ${circ-(pct/100)*circ}`} strokeLinecap="round"/>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold" style={{color}}>{pct}%</span>
      </div>
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────
export default function RoomPlannerPage({ params }: PageProps) {
  const { lang: rawLang } = use(params);
  const lang = (rawLang === "ar" ? "ar" : "en") as Language;
  const t = translations[lang];
  const rp = t.roomPlanner;
  const isRTL = lang === "ar";

  const [selectedShape, setSelectedShape] = useState<RoomShape | null>(null);
  const [width, setWidth] = useState<string>("4.0");
  const [depth, setDepth] = useState<string>("3.5");
  const [suggestions, setSuggestions] = useState<LayoutSuggestion[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<LayoutSuggestion | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleGenerate = useCallback(() => {
    if (!selectedShape) return;
    const w = Math.max(1.5, Math.min(12, parseFloat(width) || 4));
    const d = Math.max(1.5, Math.min(12, parseFloat(depth) || 3.5));
    const results = getLayoutsForShape(selectedShape, w, d);
    setSuggestions(results);
    setSelectedLayout(results[0]);
    setStep(3);
  }, [selectedShape, width, depth]);

  const handleReset = () => {
    setSelectedShape(null);
    setSuggestions([]);
    setSelectedLayout(null);
    setStep(1);
    setWidth("4.0");
    setDepth("3.5");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    });
  };

  const w = parseFloat(width) || 4;
  const d = parseFloat(depth) || 3.5;

  return (
    <div className="min-h-screen bg-premium-dark text-premium-beige">

      {/* ── Hero ── */}
      <div className="border-b border-primary/10 bg-gradient-to-b from-[#0f0f13] to-premium-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Smart Kitchen Planner" : "مخطط المطبخ الذكي"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">{rp.title}</h1>
          <p className="text-premium-beige/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{rp.subtitle}</p>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mt-10 max-w-xs mx-auto" dir="ltr">
            {([1,2,3] as const).map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  step >= s ? "bg-primary border-primary text-white" : "bg-transparent border-white/20 text-white/30"
                }`}>
                  {step > s ? <CheckCircle2 className="w-4 h-4"/> : s}
                </div>
                {i < 2 && <div className={`w-16 h-0.5 transition-all ${step > s ? "bg-primary" : "bg-white/10"}`}/>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 xl:gap-14 items-start">

          {/* ── Controls Column ── */}
          <div className="xl:col-span-1 flex flex-col gap-6">

            {/* Step 1 – Shape */}
            <div className="premium-glass p-6 rounded-2xl border border-primary/15">
              <h2 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs flex items-center justify-center font-bold">1</span>
                <span>{rp.step1}</span>
              </h2>
              <div className="grid grid-cols-3 gap-2.5">
                {SHAPES.map((shape) => (
                  <button
                    key={shape.key}
                    onClick={() => { setSelectedShape(shape.key); if (step === 1) setStep(2); }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${
                      selectedShape === shape.key
                        ? "border-primary bg-primary/15 shadow-[0_0_12px_rgba(200,162,74,0.2)]"
                        : "border-white/10 bg-white/2 hover:border-primary/40"
                    }`}
                  >
                    <div className="w-12 h-10">
                      <ShapePreview path={shape.svgPath} selected={selectedShape === shape.key}/>
                    </div>
                    <span className={`text-[10px] font-semibold leading-tight ${selectedShape === shape.key ? "text-primary-light" : "text-premium-beige/65"}`}>
                      {isRTL ? shape.labelAr : shape.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 – Dimensions */}
            <div className={`premium-glass p-6 rounded-2xl border transition-all ${
              step >= 2 ? "border-primary/15" : "border-white/5 opacity-45 pointer-events-none"
            }`}>
              <h2 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs flex items-center justify-center font-bold">2</span>
                <span>{rp.step2}</span>
              </h2>

              <div className="space-y-5">
                {[
                  { label: rp.widthLabel, val: width, set: setWidth },
                  { label: rp.depthLabel, val: depth, set: setDepth },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-premium-beige/65">{label}</label>
                      <span className="text-sm font-bold text-primary-light">{parseFloat(val).toFixed(1)}m</span>
                    </div>
                    <input
                      type="range" min="1.5" max="10" step="0.5"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      className="w-full h-1.5 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[9px] text-premium-beige/35 mt-1">
                      <span>1.5m</span><span>10m</span>
                    </div>
                  </div>
                ))}

                {/* Area summary */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-premium-charcoal/50 border border-primary/10 text-center">
                  {[
                    { k: "Area", v: `${(w * d).toFixed(1)}m²` },
                    { k: "Width", v: `${w.toFixed(1)}m` },
                    { k: "Depth", v: `${d.toFixed(1)}m` },
                  ].map(({ k, v }) => (
                    <div key={k}>
                      <span className="text-[9px] text-premium-beige/40 block">{k}</span>
                      <span className="text-xs font-bold text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!selectedShape}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-[#a07840] text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(200,162,74,0.4)] hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Layers className="w-4 h-4"/>
                <span>{rp.generateBtn}</span>
              </button>

              {step >= 3 && (
                <button
                  onClick={handleReset}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-premium-beige/55 hover:text-white hover:border-white/25 font-semibold text-xs transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5"/>
                  <span>{rp.resetBtn}</span>
                </button>
              )}
            </div>

            {/* Info note */}
            <div className="flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/12 text-xs text-premium-beige/55">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5"/>
              <p>{lang === "en"
                ? "Suggestions are based on standard kitchen design principles. Final layout depends on structural constraints and your contractor."
                : "الاقتراحات مبنية على مبادئ تصميم المطابخ القياسية. يعتمد التخطيط الفعلي على القيود الإنشائية والمقاول."
              }</p>
            </div>
          </div>

          {/* ── Results Column ── */}
          <div className="xl:col-span-2">
            {step < 3 ? (
              <div className="flex flex-col items-center justify-center min-h-[520px] rounded-2xl border border-dashed border-white/10 text-center p-10 gap-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/8 border border-primary/18 flex items-center justify-center">
                  <Layers className="w-9 h-9 text-primary/50"/>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {lang === "en" ? "Your kitchen suggestions will appear here" : "ستظهر هنا اقتراحات مطبخك"}
                  </h3>
                  <p className="text-premium-beige/45 text-sm">
                    {lang === "en" ? "Select a room shape and enter dimensions to get personalized kitchen layout recommendations." : "اختر شكل الغرفة وأدخل الأبعاد للحصول على توصيات مخصصة لتخطيط مطبخك."}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary/50 text-xs font-semibold">
                  <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}/>
                  <span>{lang === "en" ? "Start by selecting a shape on the left" : "ابدأ باختيار الشكل من القائمة"}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs flex items-center justify-center font-bold">3</span>
                    <span>{rp.step3}</span>
                  </h2>
                  <span className="text-[10px] text-premium-beige/35 font-semibold">
                    {suggestions.length} {lang === "en" ? "suggestions" : "اقتراح"}
                  </span>
                </div>

                {/* Layout Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.map((layout, idx) => {
                    const isSelected = selectedLayout?.id === layout.id;
                    const counterLen = layout.counterLengthFn(w, d);
                    const cabinetCount = layout.cabinetsFn(w, d);
                    const triLabel = layout.workTriangle === "good" ? rp.good : layout.workTriangle === "fair" ? rp.fair : rp.poor;
                    const triColor = layout.workTriangle === "good" ? "#4ade80" : layout.workTriangle === "fair" ? "#fbbf24" : "#94a3b8";
                    return (
                      <button
                        key={layout.id}
                        onClick={() => setSelectedLayout(layout)}
                        className={`flex flex-col text-left rtl:text-right rounded-2xl border overflow-hidden transition-all ${
                          isSelected ? "border-primary shadow-[0_0_20px_rgba(200,162,74,0.18)]" : "border-white/10 hover:border-primary/40"
                        }`}
                      >
                        {idx === 0 && (
                          <div className="bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest text-center">
                            {lang === "en" ? "⭐ Best Match" : "⭐ الأنسب لك"}
                          </div>
                        )}
                        {/* Diagram */}
                        <div className="bg-[#0f0f13] h-36 p-4 relative">
                          <LayoutDiagram layoutId={layout.id} shape={selectedShape!}/>
                          <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 flex gap-1.5">
                            {[{c:"#38bdf8",l:"S"},{c:"#f97316",l:"C"},{c:"#4ade80",l:"F"}].map(z=>(
                              <div key={z.l} className="flex items-center gap-0.5">
                                <span className="w-2 h-2 rounded-full" style={{backgroundColor:z.c}}/>
                                <span className="text-[8px] text-white/35">{z.l}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4 bg-premium-charcoal/30 flex-1 flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-white leading-snug">
                              {isRTL ? layout.nameAr : layout.name}
                            </h3>
                            <EfficiencyBadge pct={layout.efficiencyPct}/>
                          </div>
                          <p className="text-[11px] text-premium-beige/55 leading-relaxed line-clamp-2">
                            {isRTL ? layout.descriptionAr : layout.description}
                          </p>
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-1 text-center">
                            {[
                              { k: rp.counterLength, v: `${counterLen}m` },
                              { k: rp.cabinets, v: `${cabinetCount}` },
                              { k: rp.workTriangle, v: triLabel, color: triColor },
                            ].map(({ k, v, color }) => (
                              <div key={k} className="p-1.5 rounded-lg bg-premium-dark/60">
                                <span className="text-[8px] text-premium-beige/35 block leading-tight">{k}</span>
                                <span className="text-[10px] font-bold" style={color ? {color} : {color:"#fff"}}>{v}</span>
                              </div>
                            ))}
                          </div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {(isRTL ? layout.tagsAr : layout.tags).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-semibold text-primary-light">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Layout Detail Panel */}
                {selectedLayout && (
                  <div className="premium-glass rounded-2xl border border-primary/20 overflow-hidden animate-fade-in-up">
                    <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm">
                        {lang === "en" ? "Selected: " : "المختار: "}
                        <span className="text-primary-light">{isRTL ? selectedLayout.nameAr : selectedLayout.name}</span>
                      </h3>
                      <span className="text-[10px] text-premium-beige/35 font-semibold">
                        {lang === "en" ? "Recommended wall:" : "حائط موصى به:"} {selectedLayout.wallPanel}
                      </span>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Pros */}
                      <div>
                        <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">
                          {lang === "en" ? "Key Advantages" : "المزايا الرئيسية"}
                        </h4>
                        <ul className="space-y-2">
                          {(isRTL ? selectedLayout.prosAr : selectedLayout.pros).map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-premium-beige/72">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"/>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col gap-3 justify-center">
                        <Link
                          href={`/${lang}/visualizer?room=kitchen&material=${selectedLayout.wallPanel}`}
                          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-primary to-[#a07840] text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(200,162,74,0.4)] hover:scale-[1.02] transition-all"
                        >
                          <Eye className="w-4 h-4"/>
                          <span>{rp.visualizeBtn}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`}/>
                        </Link>

                        <Link
                          href={`/${lang}/calculator?product=louver`}
                          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-primary/40 text-primary-light hover:border-primary hover:bg-primary/5 font-bold text-xs transition-all"
                        >
                          <Calculator className="w-4 h-4"/>
                          <span>{rp.calculatorBtn}</span>
                        </Link>

                        <div className="relative">
                          <button
                            onClick={handleShare}
                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-white/10 text-premium-beige/55 hover:text-white hover:border-white/28 font-bold text-xs transition-all"
                          >
                            <Share2 className="w-4 h-4"/>
                            <span>{rp.shareBtn}</span>
                          </button>
                          {shareToast && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-50 animate-fade-in-up">
                              {lang === "en" ? "✓ Link copied!" : "✓ تم النسخ"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
