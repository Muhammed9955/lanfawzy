"use client";

import React, { useState, useEffect } from "react";
import { Language } from "@/data/translations";

export default function WhatsAppButton({ lang }: { lang: Language }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for smooth fade-in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const phone = "201040044415";
  const message = lang === "ar"
    ? "مرحباً فوزي للديكور، أنا أزور موقعكم ولدّي استفسار."
    : "Hello Fawzy Decor, I am visiting your website and have an inquiry.";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 z-40 transition-all duration-500 ease-out animate-fade-in-up ${
      lang === "ar" ? "left-6" : "right-6"
    }`}>
      {/* Tooltip / Label */}
      <span className={`absolute bottom-full mb-3 hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-white bg-premium-charcoal/90 border border-primary/20 rounded-lg whitespace-nowrap shadow-lg backdrop-blur-sm pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${
        lang === "ar" ? "left-0 origin-bottom-left" : "right-0 origin-bottom-right"
      }`}
      style={{
        // Custom group trigger behavior is styled via CSS or inline relative structure
      }}>
        {lang === "ar" ? "تواصل معنا عبر واتساب" : "Chat on WhatsApp"}
      </span>

      {/* Button link wrapper */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing Radar Ring Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none scale-105"></span>

        {/* WhatsApp Official SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-[8deg]"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.509 0 9.992-4.478 9.996-9.986.002-2.67-1.033-5.18-2.918-7.07C16.56 1.66 14.055.622 11.39.622c-5.505 0-9.989 4.479-9.993 9.987-.001 1.914.501 3.78 1.457 5.421l.162.28-1.006 3.675 3.77-1.002.274.159c1.62.96 3.328 1.465 5.003 1.465zm11.305-6.72c-.328-.163-1.94-.959-2.24-1.07-.3-.11-.518-.163-.738.163-.219.329-.85.1.07-1.07.22-.3-.549-.85-.85-1.15-.316-.316-.623-.267-.852-.163-.229.1-.852.329-1.07.549-.22.22-.852.658-.852 1.62 0 .959.7 1.89.8 2.02.1.135 1.374 2.11 3.329 2.956.465.2.827.32 1.11.41.468.149.894.128 1.23.078.375-.056 1.94-.79 2.24-1.558.3-.769.3-1.429.21-1.559-.09-.13-.328-.247-.656-.41z" />
        </svg>

        {/* CSS Tooltip Hover Style Helper */}
        <style jsx>{`
          a:hover + span {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </a>
    </div>
  );
}
