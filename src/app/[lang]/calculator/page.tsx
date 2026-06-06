"use client";

import React, { useState, use } from "react";
import { translations, Language } from "@/data/translations";
import { calculateMaterials } from "@/data/products";
import { Calculator, ArrowRight, MessageSquare } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function CalculatorPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  const [width, setWidth] = useState<number>(3.0);
  const [height, setHeight] = useState<number>(2.8);
  const [productType, setProductType] = useState<"louver" | "chipboard">("louver");

  const results = calculateMaterials(productType, width, height);

  const getWhatsAppLink = () => {
    const productLabel =
      productType === "louver"
        ? t.products.louver.title
        : t.products.chipboard.title;
        
    const message = t.calculator.whatsappMessage
      .replace("{product}", productLabel)
      .replace("{width}", width.toString())
      .replace("{height}", height.toString())
      .replace("{panels}", results.panels.toString());

    return `https://wa.me/201040044415?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="py-20 bg-premium-dark text-premium-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.calculator.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 premium-glass p-8 md:p-10 rounded-2xl shadow-xl border border-primary/15">
          {/* Inputs Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-primary-light">
                {t.calculator.selectProduct}
              </label>
              <select
                value={productType}
                onChange={(e) =>
                  setProductType(e.target.value as "louver" | "chipboard")
                }
                className="w-full px-4 py-3.5 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
              >
                <option value="louver">{t.products.louver.title}</option>
                <option value="chipboard">{t.products.chipboard.title}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-primary-light">
                {t.calculator.wallWidth}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3.5 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-primary-light">
                {t.calculator.wallHeight}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3.5 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col justify-between p-6 md:p-8 bg-premium-charcoal/50 border border-primary/10 rounded-xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-4">
                <span className="text-premium-beige/80 text-sm font-medium">
                  {t.calculator.panelRequired}
                </span>
                <span className="text-3xl font-bold text-primary">
                  {results.panels}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-primary/10 pb-4">
                <span className="text-premium-beige/80 text-sm font-medium">
                  {t.calculator.glueRequired}
                </span>
                <span className="text-3xl font-bold text-primary">
                  {results.glue}
                </span>
              </div>

              <p className="text-xs text-premium-beige/50 leading-relaxed italic">
                {t.calculator.notice}
              </p>
            </div>

            <div className="mt-8">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:shadow-[0_0_20px_rgba(176,141,92,0.4)] hover:scale-[1.01] transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <span>{t.calculator.ctaQuote}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
