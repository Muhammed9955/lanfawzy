import Link from "next/link";
import { translations, Language } from "@/data/translations";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Footer({ lang }: { lang: Language }) {
  const t = translations[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-premium-dark border-t border-primary/10 pt-16 pb-8 text-premium-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href={`/${lang}`} className="inline-block">
              <Logo variant="standard" height={52} />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mt-2">
              {t.footer.tagline}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-2">
              <a
                href="https://www.facebook.com/LANdecore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary/20 bg-premium-charcoal/40 text-primary-light hover:text-white hover:bg-primary transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/LANFAWZY"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary/20 bg-premium-charcoal/40 text-primary-light hover:text-white hover:bg-primary transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@lanfawzy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary/20 bg-premium-charcoal/40 text-primary-light hover:text-white hover:bg-primary transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/201040044415"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary/20 bg-premium-charcoal/40 text-primary-light hover:text-white hover:bg-primary transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase mb-4">
              {lang === "en" ? "Quick Links" : "روابط سريعة"}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href={`/${lang}/products`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t.navbar.products}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/visualizer`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t.navbar.visualizer}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/calculator`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t.navbar.calculator}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/gallery`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t.navbar.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase mb-4">
              {lang === "en" ? "Our Materials" : "خاماتنا"}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <span className="hover:text-primary transition-colors duration-200 cursor-default">
                  {t.products.louver.title}
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors duration-200 cursor-default">
                  {t.products.chipboard.title}
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors duration-200 cursor-default">
                  {t.products.adhesives.title}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase mb-1">
              {t.contact.info}
            </h3>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">{t.contact.phone}</span>
                <a
                  href="https://wa.me/201040044415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +20 104 004 4415
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">{t.contact.email}</span>
                <a
                  href="mailto:info@lanfawzy.com"
                  className="hover:text-primary transition-colors"
                >
                  info@lanfawzy.com
                </a>
              </div>
            </div>

            <Link
              href={`/${lang}#showrooms`}
              className="flex items-start gap-2.5 group hover:text-primary transition-colors duration-200"
            >
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex flex-col">
                <span className="font-semibold text-white group-hover:text-primary transition-colors duration-200">
                  {t.contact.address}
                </span>
                <span className="text-xs text-premium-beige/60 group-hover:text-premium-beige transition-colors duration-200">
                  {t.contact.addressDetail}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Copyright divider */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>{t.footer.rights.replace("{year}", year.toString())}</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">
              {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </a>
            <span className="text-primary/20">|</span>
            <a href="#" className="hover:underline">
              {lang === "en" ? "Terms of Service" : "شروط الخدمة"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
