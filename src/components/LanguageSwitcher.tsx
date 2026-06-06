"use client";

import { usePathname, useRouter } from "next/navigation";
import { Language } from "@/data/translations";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ currentLang }: { currentLang: Language }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "ar" : "en";
    
    // Split path to replace the language segment
    // e.g. /en/products -> /ar/products
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = nextLang;
      router.push(segments.join("/"));
    } else {
      router.push(`/${nextLang}`);
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-premium-charcoal/40 text-sm font-medium hover:border-primary/80 hover:bg-premium-charcoal/80 transition-all text-primary-light"
      aria-label={currentLang === "en" ? "Switch to Arabic" : "التغيير للعربية"}
    >
      <Globe className="w-4 h-4" />
      <span>{currentLang === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
