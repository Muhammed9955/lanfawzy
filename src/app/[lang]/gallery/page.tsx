import React, { use } from "react";
import Image from "next/image";
import { translations, Language } from "@/data/translations";
import { Compass, MapPin, Building, Home } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  category: "residential" | "commercial";
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "proj-1",
    titleEn: "Luxury Living Room Slats",
    titleAr: "صالون سكني فاخر ببديل الخشب الكوري",
    locationEn: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    category: "residential",
    image: "/living_room_showroom.png",
  },
  {
    id: "proj-2",
    titleEn: "Executive Corporate Headquarters",
    titleAr: "المقر الإداري الرئيسي لإحدى الشركات",
    locationEn: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    category: "commercial",
    image: "/living_room_showroom.png", // Re-using our high-quality premium image
  },
  {
    id: "proj-3",
    titleEn: "Premium Bedroom Accent Wall",
    titleAr: "خلفية سرير غرفة نوم رئيسية فاخرة",
    locationEn: "Amman, Jordan",
    locationAr: "عمان، الأردن",
    category: "residential",
    image: "/living_room_showroom.png",
  },
  {
    id: "proj-4",
    titleEn: "Commercial Hotel Lobby Cladding",
    titleAr: "تكسيات حوائط بهو فندق سياحي",
    locationEn: "Hurghada, Egypt",
    locationAr: "الغردقة، مصر",
    category: "commercial",
    image: "/living_room_showroom.png",
  },
];

export default function GalleryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  return (
    <div className="py-20 bg-premium-dark text-premium-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.gallery.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item) => {
            const title = lang === "ar" ? item.titleAr : item.titleEn;
            const location = lang === "ar" ? item.locationAr : item.locationEn;
            
            return (
              <div
                key={item.id}
                className="premium-glass rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-72 md:h-80 w-full overflow-hidden border-b border-primary/10">
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-light flex items-center gap-1">
                    {item.category === "residential" ? (
                      <Home className="w-3.5 h-3.5" />
                    ) : (
                      <Building className="w-3.5 h-3.5" />
                    )}
                    <span>{t.gallery[item.category]}</span>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 bg-premium-charcoal/30 flex flex-col gap-2 text-left rtl:text-right">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-premium-beige/60">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
