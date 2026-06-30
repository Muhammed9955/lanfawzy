"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations, Language } from "@/data/translations";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({ lang }: { lang: Language }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[lang];

  const navItems = [
    { name: t.navbar.home, href: `/${lang}`, comingSoon: false },
    { name: t.navbar.products, href: `/${lang}/products`, comingSoon: false },
    { name: t.navbar.visualizer, href: `/${lang}/visualizer`, comingSoon: false },
    { name: t.navbar.calculator, href: `/${lang}/calculator`, comingSoon: false },
    { name: t.navbar.gallery, href: `/${lang}/gallery`, comingSoon: false },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // console.log(navItems)

  return (
    <header className="sticky top-0 z-50 w-full premium-glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href={`/${lang}`} className="flex items-center group">
            <Logo variant="standard" height={44} className="group-hover:scale-102 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10 border-b-2 border-primary"
                    : "text-premium-beige/85 hover:text-primary hover:bg-premium-charcoal/40"
                }`}
              >
                {item.name}
                {item.comingSoon && (
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-primary/15 text-primary border border-primary/25 leading-none">
                    {lang === "ar" ? "قريباً" : "Soon"}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Action Area (Language & Contact button) */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-medium text-sm hover:shadow-[0_0_15px_rgba(176,141,92,0.4)] transition-all duration-300 hover:scale-102"
            >
              <span>{t.navbar.contact}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher currentLang={lang} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-premium-beige/80 hover:text-primary hover:bg-premium-charcoal/60 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden premium-glass border-b border-primary/20 animate-fade-in-up">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-premium-beige/90 hover:text-primary hover:bg-premium-charcoal/50"
                }`}
              >
                <span>{item.name}</span>
                {item.comingSoon && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-primary/15 text-primary border border-primary/25">
                    {lang === "ar" ? "قريباً" : "Soon"}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-3.5 mt-4 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold shadow-md"
            >
              {t.navbar.contact}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
