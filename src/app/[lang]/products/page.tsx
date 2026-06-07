"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, Language } from "@/data/translations";
import { productsCatalog, getProductTranslation, getOptimizedImageUrl, Product } from "@/data/products";
import { Check, Layers, ArrowRight, Download, Search, MessageSquare, Info } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ProductsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "louver-thick" | "louver-thin" | "flat-pvc" | "flat-ps" | "chipboard" | "adhesive">("all");

  const categories = [
    { id: "all", nameEn: "All Products", nameAr: "جميع المنتجات" },
    { id: "louver-thick", nameEn: "Thick Stripes Louver", nameAr: "بديل الخشب (سميك)" },
    { id: "louver-thin", nameEn: "Thin Stripes Louver", nameAr: "بديل الخشب (رفيع)" },
    { id: "flat-pvc", nameEn: "Flat PVC 3D", nameAr: "بديل الرخام (PVC)" },
    { id: "flat-ps", nameEn: "Flat PS Korean", nameAr: "تكسيات فلات (PS)" },
    { id: "chipboard", nameEn: "Solid Chipboard Alt", nameAr: "بديل الشيبورد الصلب" },
    { id: "adhesive", nameEn: "Eco-Adhesives", nameAr: "المواد اللاصقة" },
  ];

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

  // Helper to filter products
  const filteredProducts = productsCatalog.filter((product) => {
    // Search match
    const codeMatch = product.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab match
    let tabMatch = false;
    if (activeTab === "all") {
      tabMatch = true;
    } else if (activeTab === "louver-thick") {
      tabMatch = product.category === "louver" && product.code.startsWith("E157-");
    } else if (activeTab === "louver-thin") {
      tabMatch = product.category === "louver" && !product.code.startsWith("E157-");
    } else {
      tabMatch = product.category === activeTab;
    }

    return codeMatch && tabMatch;
  });

  // Calculate WhatsApp quote link
  const getWhatsAppQuoteLink = (product: Product) => {
    const phone = "201040044415";
    const text = lang === "ar"
      ? `مرحباً فوزي للديكور، أنا مهتم بالمنتج ذو الكود ${product.code}. هل يمكن إرسال تفاصيل السعر والمواصفات؟`
      : `Hello Fawzy Decor, I am interested in product code ${product.code}. Could you please send me price details and specifications?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="py-16 bg-premium-dark text-premium-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
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
        <div className="mb-12 premium-glass p-6 rounded-2xl border border-primary/15 max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-white mb-4 text-center">
            {lang === "en" ? "Download Technical Catalogs (PDF)" : "تحميل الكتالوجات الفنية والكتالوج المصور (PDF)"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {catalogPdfs.map((pdf, idx) => (
              <a
                key={idx}
                href={pdf.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-premium-charcoal border border-primary/10 hover:border-primary/40 hover:bg-premium-charcoal/80 transition-all duration-300 group"
              >
                <span className="font-semibold text-sm text-premium-beige group-hover:text-primary transition-colors">
                  {pdf.title}
                </span>
                <Download className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Search & Tabs Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className={`absolute ${lang === "ar" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-premium-beige/45 w-5 h-5`} />
            <input
              type="text"
              placeholder={lang === "ar" ? "البحث برقم الكود..." : "Search by product code..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-3.5 ${lang === "ar" ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"} rounded-xl bg-premium-charcoal/70 border border-primary/15 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-premium-beige/40 text-sm transition-all`}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((tab) => {
              const tabName = lang === "ar" ? tab.nameAr : tab.nameEn;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                      : "bg-premium-charcoal/30 text-premium-beige/80 border-primary/10 hover:border-primary/30 hover:bg-premium-charcoal/60"
                  }`}
                >
                  {tabName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Badges / Technical Metadata Box */}
        {activeTab !== "all" && activeTab !== "adhesive" && (
          <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/10 max-w-4xl mx-auto flex items-start gap-3 text-xs leading-relaxed text-premium-beige/80">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              {activeTab === "louver-thick" && (
                <>
                  <span className="font-bold text-white text-sm block mb-1">
                    {lang === "en" ? "PS Louvers - Thick Stripes" : "بديل الخشب الكوري - الخطوط العريضة السميكة"}
                  </span>
                  {lang === "en"
                    ? "Premium South Korean polystyrene cladding. Width: 12cm, Length: 2.9m, Thickness: 12mm. Coverage: 0.348 sqm per panel. Extremely durable, solid-core polymer."
                    : "تكسيات كورية جنوبية فاخرة من بوليمر البوليستيرين المعالج. العرض: 12 سم، الارتفاع: 2.9 متر، السمك: 12 مم. يغطي اللوح الواحد مساحة 0.348 متر مربع. هيكل صلب بالكامل مضاد للحشرات والماء."}
                </>
              )}
              {activeTab === "louver-thin" && (
                <>
                  <span className="font-bold text-white text-sm block mb-1">
                    {lang === "en" ? "PS Louvers - Thin Stripes" : "بديل الخشب الكوري - الخطوط الرفيعة الكلاسيكية"}
                  </span>
                  {lang === "en"
                    ? "Premium South Korean polystyrene cladding with fine linear vertical stripes. Width: 12cm, Length: 2.9m, Thickness: 12mm. Coverage: 0.348 sqm per panel."
                    : "تكسيات كورية جنوبية فاخرة بتصميم خطوط طولية رفيعة وأنيقة. العرض: 12 سم، الارتفاع: 2.9 متر، السمك: 12 مم. يغطي اللوح الواحد مساحة 0.348 متر مربع."}
                </>
              )}
              {activeTab === "flat-pvc" && (
                <>
                  <span className="font-bold text-white text-sm block mb-1">
                    {lang === "en" ? "Flat PVC 3D Cladding" : "بديل الرخام فلات PVC ثلاثي الأبعاد"}
                  </span>
                  {lang === "en"
                    ? "Flat PVC panels displaying premium marble veins. Width: 60cm, Length: 2.8m, Thickness: 5mm. Coverage: 1.68 sqm per sheet. Lightweight, water and stain-resistant."
                    : "ألواح تكسيات بديل الرخام مسطحة (فلات) بنقوش وتأثيرات ثلاثية الأبعاد. العرض: 60 سم، الارتفاع: 2.8 متر، السمك: 5 مم. يغطي اللوح الواحد 1.68 متر مربع. مقاوم للرطوبة والبقع تماماً."}
                </>
              )}
              {activeTab === "flat-ps" && (
                <>
                  <span className="font-bold text-white text-sm block mb-1">
                    {lang === "en" ? "Flat PS Korean Cladding" : "تكسيات فلات PS كوري فاخر"}
                  </span>
                  {lang === "en"
                    ? "Flat-profile polystyrene panels from South Korea. Width: 12cm, Length: 2.9m, Thickness: 12mm. Coverage: 0.348 sqm per panel. Perfect for sleek contemporary backdrops."
                    : "تكسيات مسطحة (فلات) من بوليمر البوليستيرين الكوري عالي الكثافة. العرض: 12 سم، الارتفاع: 2.9 متر، السمك: 12 مم. تغطي مساحة 0.348 متر مربع للوح الواحد."}
                </>
              )}
              {activeTab === "chipboard" && (
                <>
                  <span className="font-bold text-white text-sm block mb-1">
                    {lang === "en" ? "Solid-Core Chipboard Alternative" : "بديل الشيبورد الصلب المعزز بمسحوق الحجر"}
                  </span>
                  {lang === "en"
                    ? "High-density solid PVC-stone composite panels. Width: 122cm, Length: 2.8m, Thickness: 18mm. Coverage: 3.416 sqm per sheet. Chemical resistance to volatile silicone gas prevents blistering."
                    : "ألواح بديل الشيبورد الصلب المصنعة من مركب الـ PVC وبودرة الحجر فائقة الكثافة. العرض: 122 سم، الارتفاع: 2.8 متر، السمك: 18 مم. يغطي اللوح الواحد 3.416 متر مربع. يمنع تكوين فقاعات هوائية ومقاوم تماماً لغازات السيليكون."}
                </>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const { name, specifications } = getProductTranslation(product, lang);
              return (
                <div
                  key={product.id}
                  className="premium-glass rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full bg-premium-charcoal/40 border-b border-primary/10 overflow-hidden shrink-0">
                    <Image
                      src={getOptimizedImageUrl(product.image, 300, 300)}
                      alt={name}
                      fill
                      className="object-cover object-center p-3 rounded-2xl transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className={`absolute top-3 ${lang === "ar" ? "right-3" : "left-3"} bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-primary-light border border-primary/20`}>
                      {product.code}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors text-left rtl:text-right line-clamp-1">
                        {name}
                      </h3>
                      
                      {/* Dimension Stats */}
                      {product.widthM > 0 && (
                        <div className="grid grid-cols-3 gap-1 bg-premium-charcoal/30 p-2 rounded-lg text-[10px] text-premium-beige/60 text-center font-medium border border-primary/5">
                          <div>
                            <span className="block text-[8px] text-premium-beige/40 uppercase">{lang === "ar" ? "العرض" : "Width"}</span>
                            <span className="text-white font-semibold">{product.widthM * 100}cm</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-premium-beige/40 uppercase">{lang === "ar" ? "الارتفاع" : "Height"}</span>
                            <span className="text-white font-semibold">{product.heightM}m</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-premium-beige/40 uppercase">{lang === "ar" ? "السمك" : "Thick"}</span>
                            <span className="text-white font-semibold">{product.thicknessMm}mm</span>
                          </div>
                        </div>
                      )}

                      {/* Technical specifications */}
                      <ul className="space-y-1.5 text-[10px] text-premium-beige/80 text-left rtl:text-right">
                        {specifications.slice(0, 3).map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5 line-clamp-2">
                            <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* WhatsApp Action Button */}
                    <a
                      href={getWhatsAppQuoteLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-premium-charcoal border border-primary/20 text-xs font-bold text-premium-beige hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>{lang === "ar" ? "طلب عرض سعر" : "Inquire / Get Quote"}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 premium-glass max-w-xl mx-auto rounded-2xl border border-primary/10">
            <Info className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === "ar" ? "لا توجد نتائج مطابقة" : "No products found"}
            </h3>
            <p className="text-sm text-premium-beige/60">
              {lang === "ar"
                ? "يرجى التحقق من كود البحث أو تبديل الفئات."
                : "Please check your search keyword or change the category tab."}
            </p>
          </div>
        )}

        {/* Estimator Quick CTA */}
        <div className="mt-20 premium-glass p-8 md:p-10 rounded-2xl border border-primary/25 shadow-xl text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
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
