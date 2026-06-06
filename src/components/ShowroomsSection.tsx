"use client";

import { useState } from "react";
import { Language, translations } from "@/data/translations";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";

export default function ShowroomsSection({ lang }: { lang: Language }) {
  const t = translations[lang] || translations.en;
  const [activeBranch, setActiveBranch] = useState<"cairo" | "giza" | "alex">("cairo");

  const branchKeys = ["cairo", "giza", "alex"] as const;
  const currentBranchData = t.showrooms[activeBranch];

  // Map embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    currentBranchData.mapQuery
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  // Direct external map link
  const externalMapUrl = currentBranchData.mapLink;

  return (
    <section id="showrooms" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-primary/10">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold uppercase tracking-wider text-primary-light mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {lang === "en" ? "Our Showrooms" : "فروعنا ومعارضنا"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold gold-text-gradient mb-4">
          {t.showrooms.title}
        </h2>
        <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
          {t.showrooms.subtitle}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Branch Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {branchKeys.map((key) => {
            const branch = t.showrooms[key];
            const isActive = activeBranch === key;

            return (
              <button
                key={key}
                onClick={() => setActiveBranch(key)}
                className={`w-full p-5 rounded-2xl border transition-all duration-300 text-left rtl:text-right flex flex-col gap-3 relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? "bg-premium-charcoal border-primary/80 shadow-[0_0_20px_rgba(176,141,92,0.15)]"
                    : "bg-premium-charcoal/40 border-primary/10 hover:border-primary/40 hover:bg-premium-charcoal/70"
                }`}
              >
                {/* Active Indicator Bar */}
                <div
                  className={`absolute top-0 bottom-0 w-1 bg-primary transition-all duration-300 ${
                    lang === "ar" ? "right-0" : "left-0"
                  } ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                />

                <div className="flex justify-between items-start w-full">
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isActive ? "text-primary-light" : "text-white group-hover:text-primary-light"
                    }`}
                  >
                    {branch.name}
                  </h3>
                  {isActive && (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-primary/25 text-primary-light px-2.5 py-0.5 rounded-full border border-primary/30">
                      {lang === "en" ? "Selected" : "محدد"}
                    </span>
                  )}
                </div>

                <p className="text-sm text-premium-beige/70 leading-relaxed">
                  {branch.address}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-primary/10 mt-1">
                  <div className="flex items-center gap-2 text-premium-beige/65">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a
                      href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                      className="hover:text-primary transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()} // prevent card selection trigger
                    >
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-premium-beige/65">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Map Embed (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[400px] lg:h-auto min-h-[350px] relative rounded-2xl overflow-hidden border border-primary/20 premium-glass group">
          {/* Top Bar for controls */}
          <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-premium-dark/80 backdrop-blur border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-light animate-pulse" />
              <span className="text-xs font-semibold text-white/95">{currentBranchData.name}</span>
            </div>
            <a
              href={externalMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-light transition-colors"
            >
              <span>{lang === "en" ? "Open in Google Maps" : "فتح في خرائط Google"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Iframe container */}
          <div className="w-full h-full pt-[45px] relative">
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={currentBranchData.name}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
