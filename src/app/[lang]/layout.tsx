import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { translations, Language } from "@/data/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const resolvedLang: Language = lang === "ar" ? "ar" : "en";
  const t = translations[resolvedLang];
  
  return {
    title: {
      default: t.hero.title,
      template: `%s - LAN Fawzy For Import & Export`,
    },
    description: t.hero.subtitle,
    alternates: {
      canonical: `https://lanfawzy.com/${resolvedLang}`,
      languages: {
        en: "https://lanfawzy.com/en",
        ar: "https://lanfawzy.com/ar",
      },
    },
    openGraph: {
      title: t.hero.title,
      description: t.hero.subtitle,
      url: `https://lanfawzy.com/${resolvedLang}`,
      siteName: "LAN Fawzy For Import & Export",
      locale: resolvedLang === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.hero.title,
      description: t.hero.subtitle,
    },
  };
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const resolvedLang: Language = lang === "ar" ? "ar" : "en";
  const t = translations[resolvedLang];
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": resolvedLang === "ar" ? "لان فوزي للاستيراد والتصدير" : "LAN Fawzy For Import & Export",
    "image": "https://lanfawzy.com/wp-content/uploads/2022/08/Home-1024x640.png",
    "@id": "https://lanfawzy.com",
    "url": `https://lanfawzy.com/${resolvedLang}`,
    "telephone": "+201040044415",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": resolvedLang === "ar" ? "القاهرة" : "Cairo",
      "addressLocality": resolvedLang === "ar" ? "القاهرة" : "Cairo",
      "addressCountry": "EG",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <html
      lang={resolvedLang}
      dir={t.dir}
      className={`${inter.variable} ${cairo.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`min-h-full flex flex-col antialiased bg-premium-dark text-premium-beige ${
          resolvedLang === "ar" ? "font-cairo" : "font-inter"
        }`}
        style={{
          fontFamily: resolvedLang === "ar" ? "var(--font-cairo), sans-serif" : "var(--font-inter), sans-serif",
        }}
      >
        <Navbar lang={resolvedLang} />
        <main className="flex-grow">{children}</main>
        <Footer lang={resolvedLang} />
      </body>
    </html>
  );
}
