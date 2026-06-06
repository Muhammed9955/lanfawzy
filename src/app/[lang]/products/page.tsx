import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, Language } from "@/data/translations";
import { productsCatalog, getProductTranslation } from "@/data/products";
import { Check, Layers, ArrowRight, Download } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ProductsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  const louvers = productsCatalog.filter((p) => p.category === "louver");
  const chipboard = productsCatalog.filter((p) => p.category === "chipboard");
  const adhesives = productsCatalog.filter((p) => p.category === "adhesive");

  const catalogPdfs = [
    {
      title: lang === "en" ? "Chipboard Alternative Catalog" : "كتالوج بديل الشيبورد",
      href: "https://lanfawzy.com/wp-content/uploads/2025/11/كتالوج-بديل-الشيبورد.pdf",
    },
    {
      title: lang === "en" ? "Wall Cladding Alternative Catalog" : "كتالوج بديل الخشب الكوري",
      href: "https://lanfawzy.com/wp-content/uploads/2025/11/كتالوج-بديل-الخشب-الكورى.pdf",
    },
  ];

  return (
    <div className="py-20 bg-premium-dark text-premium-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.products.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>

        {/* Catalog PDFs Section */}
        <div className="mb-20 premium-glass p-6 rounded-2xl border border-primary/15 max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-white mb-4 text-center">
            {lang === "en" ? "Download Product Catalogs (PDF)" : "تحميل الكتالوجات الفنية (PDF)"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {catalogPdfs.map((pdf, idx) => (
              <a
                key={idx}
                href={pdf.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-premium-charcoal border border-primary/10 hover:border-primary/40 hover:bg-premium-charcoal/80 transition-all duration-300"
              >
                <span className="font-semibold text-sm text-premium-beige hover:text-primary transition-colors">
                  {pdf.title}
                </span>
                <Download className="w-4 h-4 text-primary shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* 1. PS Louvers Section */}
        <div className="mb-24">
          <div className="border-b border-primary/15 pb-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.products.louver.title}
            </h2>
            <p className="text-sm text-primary-light/85 mt-2">
              {t.products.louver.dimensions}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {louvers.map((product) => {
              const { name, specifications } = getProductTranslation(product, lang);
              return (
                <div
                  key={product.id}
                  className="premium-glass rounded-2xl overflow-hidden border border-primary/10 flex flex-col md:flex-row hover:border-primary/30 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-premium-charcoal/40 border-b md:border-b-0 md:border-r border-primary/10">
                    <Image
                      src={product.image}
                      alt={name}
                      fill
                      className="object-cover object-center p-2 rounded-xl"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-primary-light">
                      {product.code}
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between text-left rtl:text-right">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">{name}</h3>
                      <ul className="space-y-2 text-xs text-premium-beige/80">
                        {specifications.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Chipboard Alternatives Section */}
        <div className="mb-24">
          <div className="border-b border-primary/15 pb-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.products.chipboard.title}
            </h2>
            <p className="text-sm text-primary-light/85 mt-2">
              {t.products.chipboard.dimensions}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {chipboard.map((product) => {
              const { name, specifications } = getProductTranslation(product, lang);
              return (
                <div
                  key={product.id}
                  className="premium-glass rounded-2xl overflow-hidden border border-primary/10 flex flex-col lg:flex-row hover:border-primary/30 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full lg:w-96 h-64 lg:h-auto shrink-0 bg-premium-charcoal/40 border-b lg:border-b-0 lg:border-r border-primary/10">
                    <Image
                      src={product.image}
                      alt={name}
                      fill
                      className="object-cover object-center p-4 rounded-xl"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-primary-light">
                      {product.code}
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-8 flex-grow flex flex-col justify-between text-left rtl:text-right">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6">{name}</h3>
                      <p className="text-sm leading-relaxed text-premium-beige/70 mb-6">
                        {product.category === "chipboard" && t.products.chipboard.desc}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-premium-beige/85">
                        {specifications.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Adhesives Section */}
        <div className="mb-24">
          <div className="border-b border-primary/15 pb-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.products.adhesives.title}
            </h2>
            <p className="text-sm text-primary-light/85 mt-2">
              {t.products.adhesives.dimensions}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adhesives.map((product) => {
              const { name, specifications } = getProductTranslation(product, lang);
              return (
                <div
                  key={product.id}
                  className="premium-glass rounded-2xl overflow-hidden border border-primary/10 flex flex-col md:flex-row hover:border-primary/30 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-premium-charcoal/40 border-b md:border-b-0 md:border-r border-primary/10">
                    <Image
                      src={product.image}
                      alt={name}
                      fill
                      className="object-cover object-center p-2 rounded-xl"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-primary-light">
                      {product.code}
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between text-left rtl:text-right">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">{name}</h3>
                      <p className="text-xs text-premium-beige/60 mb-4">{t.products.adhesives.desc}</p>
                      <ul className="space-y-2 text-xs text-premium-beige/85">
                        {specifications.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calculator CTA Banner */}
        <div className="premium-glass p-8 md:p-10 rounded-2xl border border-primary/25 shadow-xl text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h3 className="text-2xl font-bold text-white">
            {lang === "en" ? "Need to calculate exact materials?" : "هل تريد حساب الكميات المطلوبة لمشروعك؟"}
          </h3>
          <p className="text-sm text-premium-beige/85 max-w-lg leading-relaxed">
            {lang === "en"
              ? "Use our smart estimator to calculate panels, adhesive tubes, and send details straight to our team."
              : "استخدم الحاسبة المعمارية الذكية لمعرفة عدد الألواح والمواد اللاصقة المطلوبة وأرسل تقرير المقايسة مباشرة لفريقنا."}
          </p>
          <Link
            href={`/${lang}/calculator`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm hover:scale-102 hover:shadow-lg transition-all"
          >
            <span>{t.calculator.title}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
