import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations, Language } from "@/data/translations";
import { ArrowRight, ShieldCheck, Leaf, Compass, HelpCircle } from "lucide-react";
import ShowcaseSlider from "@/components/ShowcaseSlider";
import ShowroomsSection from "@/components/ShowroomsSection";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function HomePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  const features = [
    {
      icon: ShieldCheck,
      title: t.features.koreanQuality.title,
      desc: t.features.koreanQuality.desc,
    },
    {
      icon: Leaf,
      title: t.features.ecoFriendly.title,
      desc: t.features.ecoFriendly.desc,
    },
    {
      icon: Compass,
      title: t.features.solidCore.title,
      desc: t.features.solidCore.desc,
    },
    {
      icon: HelpCircle,
      title: t.features.waterproof.title,
      desc: t.features.waterproof.desc,
    },
  ];

  return (
    <div className="bg-premium-dark text-premium-beige min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/living_room_showroom.png"
            alt="Fawzy Premium Showroom"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-premium-dark/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-start text-left rtl:items-end rtl:text-right">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold uppercase tracking-wider text-primary-light mb-6 animate-fade-in-up">
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-[1.15] animate-fade-in-up">
            <span className="gold-text-gradient block mb-2">{t.hero.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-premium-beige/85 max-w-2xl mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:shadow-[0_0_20px_rgba(176,141,92,0.5)] hover:scale-102 transition-all duration-300 text-base"
            >
              <span>{t.hero.ctaVisualizer}</span>
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </a>

            <a
              href="https://wa.me/201040044415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-primary/40 text-primary-light hover:border-primary hover:bg-primary/10 font-bold transition-all duration-300 text-base"
            >
              <span>{lang === "en" ? "WhatsApp Us" : "واتساب"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Showcase Image Slider */}
      <ShowcaseSlider lang={lang} />

      {/* 2. Key Benefits / Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-primary/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold gold-text-gradient mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-premium-charcoal/50 border border-primary/10 hover:border-primary/40 hover:bg-premium-charcoal transition-all duration-300 flex flex-col gap-4 text-left rtl:text-right"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit border border-primary/20">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {feat.title}
              </h3>
              <p className="text-sm text-premium-beige/70 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Materials Spotlight Section */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left rtl:text-right">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold gold-text-gradient mb-4">
              {t.products.title}
            </h2>
            <p className="text-lg text-premium-beige/70 max-w-xl">
              {t.products.subtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-light transition-colors group"
          >
            <span>{lang === "en" ? "View Full Catalog" : "تصفح الكتالوج بالكامل"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Mockup Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Louver Spotlight */}
          <div className="premium-glass rounded-2xl overflow-hidden border border-primary/10 flex flex-col">
            <div className="h-48 bg-gradient-to-r from-primary/10 to-primary-dark/20 relative flex items-center justify-center p-6 border-b border-primary/10">
              <div className="w-full h-full flex gap-1 justify-center max-w-xs overflow-hidden">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex-grow h-full bg-gradient-to-r from-[#8a6f4a] via-[#c2a77d] to-[#8a6f4a] shadow-[inset_-1px_0_2px_rgba(0,0,0,0.4)]" />
                ))}
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between text-left rtl:text-right">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{t.products.louver.title}</h3>
                <p className="text-sm text-premium-beige/70 mb-4">{t.products.louver.desc}</p>
                <span className="text-xs font-semibold text-primary-light">{t.products.louver.dimensions}</span>
              </div>
              <Link
                href={`/${lang}/products`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-light"
              >
                <span>{t.hero.ctaCatalog}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Chipboard Spotlight */}
          <div className="premium-glass rounded-2xl overflow-hidden border border-primary/10 flex flex-col">
            <div className="h-48 bg-gradient-to-r from-primary-dark/20 to-primary/10 relative flex items-center justify-center p-6 border-b border-primary/10">
              {/* Marble slab representation */}
              <div className="w-full h-full max-w-xs bg-[#f5f2eb] relative shadow-lg rounded-md overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-10,80 C50,20 100,100 200,50" fill="none" stroke="#b08d5c" strokeWidth="2" />
                  <path d="M30,10 C100,50 150,-10 250,60" fill="none" stroke="#8d6b3e" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between text-left rtl:text-right">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{t.products.chipboard.title}</h3>
                <p className="text-sm text-premium-beige/70 mb-4">{t.products.chipboard.desc}</p>
                <span className="text-xs font-semibold text-primary-light">{t.products.chipboard.dimensions}</span>
              </div>
              <Link
                href={`/${lang}/products`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-light"
              >
                <span>{t.hero.ctaCatalog}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms & Map Section */}
      <ShowroomsSection lang={lang} />
    </div>
  );
}
