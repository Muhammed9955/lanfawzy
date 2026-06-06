"use client";

import React, { useState, use } from "react";
import { translations, Language } from "@/data/translations";
import { Phone, Mail, MapPin, Send, MessageSquare, ShieldCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ContactPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("louver");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    // Simulate API call
    setFormSubmitted(true);
    
    // Reset fields
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="py-20 bg-premium-dark text-premium-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.contact.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Info Card - 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6 premium-glass p-8 rounded-2xl border border-primary/15">
            <h2 className="text-xl font-bold text-white mb-2">{t.contact.info}</h2>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left rtl:text-right">
                <span className="text-xs text-premium-beige/50 uppercase tracking-wider mb-0.5">
                  {t.contact.phone}
                </span>
                <a
                  href="https://wa.me/201040044415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-white hover:text-primary transition-colors"
                >
                  +20 104 004 4415
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left rtl:text-right">
                <span className="text-xs text-premium-beige/50 uppercase tracking-wider mb-0.5">
                  {t.contact.email}
                </span>
                <a
                  href="mailto:info@lanfawzy.com"
                  className="text-base font-bold text-white hover:text-primary transition-colors"
                >
                  info@lanfawzy.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left rtl:text-right">
                <span className="text-xs text-premium-beige/50 uppercase tracking-wider mb-0.5">
                  {t.contact.address}
                </span>
                <span className="text-sm text-premium-beige/85">
                  {t.contact.addressDetail}
                </span>
              </div>
            </div>

            <hr className="border-primary/10 my-2" />

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/201040044415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold transition-all shadow-md text-sm"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{lang === "en" ? "Chat Directly on WhatsApp" : "تواصل معنا مباشرة عبر واتساب"}</span>
            </a>
          </div>

          {/* Form - 3 cols */}
          <div className="lg:col-span-3 premium-glass p-8 md:p-10 rounded-2xl border border-primary/15">
            {formSubmitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-4 animate-fade-in-up">
                <div className="p-4 rounded-full bg-primary/15 text-primary border border-primary/35 mb-2">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t.contact.success}</h3>
                <p className="text-sm text-premium-beige/60 max-w-sm">
                  {lang === "en"
                    ? "A decorative materials specialist will review your request and get back within 24 hours."
                    : "سيقوم أحد خبراء الديكور لدينا بمراجعة طلبك والتواصل معك خلال 24 ساعة."}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 text-sm font-semibold text-primary hover:underline"
                >
                  {lang === "en" ? "Send another message" : "إرسال رسالة أخرى"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-premium-beige/80 mb-2">
                      {t.contact.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-premium-beige/80 mb-2">
                      {t.contact.formPhone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-premium-beige/80 mb-2">
                      {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-premium-beige/80 mb-2">
                      {t.contact.formInterest}
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-3 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all text-sm"
                    >
                      <option value="louver">{t.products.louver.title}</option>
                      <option value="chipboard">{t.products.chipboard.title}</option>
                      <option value="dealer">
                        {lang === "en" ? "Become a Distributor/Dealer" : "طلب وكالة / توزيع"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-premium-beige/80 mb-2">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-premium-charcoal border border-primary/20 rounded-xl text-premium-beige focus:border-primary focus:outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:shadow-[0_0_20px_rgba(176,141,92,0.4)] transition-all duration-300"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>{t.contact.send}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
