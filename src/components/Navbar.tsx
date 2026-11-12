import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ChevronRight } from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface NavbarProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  settings: SiteSettings;
  onOpenAdmin?: () => void;
  newLeadsCount?: number;
  firebaseOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    {
      href: '#workshop',
      label: lang === 'hi' ? 'प्रो वर्कशॉप' : 'Workshop',
    },
    {
      href: '#services',
      label: lang === 'hi' ? '8 सेवाएं' : 'Services',
    },
    {
      href: '#catalog',
      label: lang === 'hi' ? 'लाइनअप' : 'Lineup',
    },
    {
      href: '#legacy',
      label: lang === 'hi' ? 'विरासत' : 'Legacy',
    },
    {
      href: '#gallery',
      label: lang === 'hi' ? 'पोर्टफोलियो' : 'Portfolio',
    },
    {
      href: '#contact',
      label: lang === 'hi' ? 'हिसार स्टूडियो' : 'Hisar Studio',
    },
  ];

  const whatsappDirectUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा ग्लास फैब्रिकेटर, मुझे खिड़कियों और ग्लास वर्क के लिए जानकारी चाहिए।'
      : 'Hello Haryana Glass Fabricator, I would like to inquire about architectural glass and window solutions.'
  );

  return (
    <>
      {/* Deep Navy Blue (#102A43) Top Ribbon with Crisp White Text & Bilingual Switcher */}
      <div className="bg-[#0C2237] text-white text-[12px] py-1.5 px-4 border-b border-white/10">
        <div className="max-w-[1140px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white/90 min-w-0 flex-1">
            <span className="truncate">
              {lang === 'hi'
                ? '35+ वर्षों की उत्कृष्टता · 4PVM+FMV, निरंकारी भवन रोड, बैंक कॉलोनी, हिसार 125001 · पूरे हरियाणा में सेवा'
                : '35+ Years of Craftsmanship · 4PVM+FMV, Nirankari Bhawan Rd, Bank Colony, Urban Estate II, Hisar 125001'}
            </span>
            <a
              href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-0.5 text-[#16A6A1] hover:text-[#52D1CC] font-semibold tabular-nums shrink-0 transition-colors"
            >
              <span>{settings.phoneDisplay}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div
            role="group"
            aria-label="Language Switcher"
            className="inline-flex items-center bg-white/15 p-0.5 rounded-md shrink-0 border border-white/20"
          >
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-[#16A6A1] text-white shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('hi')}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                lang === 'hi'
                  ? 'bg-[#16A6A1] text-white shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Deep Navy Blue (#102A43) Header with Crisp White Text and Glass Teal CTAs */}
      <header className="sticky top-0 z-40 bg-[#102A43]/95 backdrop-blur-md border-b border-[#DCE4EA]/20 transition-all text-white shadow-md">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark with Logo */}
          <a
            href="#top"
            className="flex items-center gap-2.5 group focus:outline-none whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-white/20 p-0.5 flex items-center justify-center shrink-0 shadow-xs">
              {!logoError && settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={lang === 'hi' ? 'हरियाणा ग्लास फैब्रिकेटर' : 'Haryana Glass Fabricator'}
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-[10px] font-bold text-[#102A43]">HGF</span>
              )}
            </div>
            <span className="font-bold text-[15px] tracking-[-0.015em] text-white whitespace-nowrap shrink-0">
              {lang === 'hi'
                ? (!settings.brandNameHi || settings.brandNameHi.includes('विंडो')
                    ? 'हरियाणा ग्लास फैब्रिकेटर'
                    : settings.brandNameHi)
                : (!settings.brandNameEn || settings.brandNameEn.includes('Window')
                    ? 'Haryana Glass Fabricator'
                    : settings.brandNameEn)}
            </span>
          </a>

          {/* Zone 2: Global Nav Links with crisp white text */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-white/85 hover:text-[#16A6A1] transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Glass Teal (#16A6A1) Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#quotation"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#16A6A1] hover:bg-[#128A86] text-white text-[13px] font-semibold transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'कोटेशन लें' : 'Get Quote'}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-1.5 text-white/90 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Deep Navy Blue Mobile Flyout Menu with Crisp White text & Teal accents */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#102A43] border-b border-white/15 px-6 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-white hover:text-[#16A6A1] py-1.5 border-b border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#16A6A1]" />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs whitespace-nowrap transition-colors"
              >
                <Phone className="w-4 h-4 text-[#16A6A1]" />
                <span>{lang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
              </a>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white font-semibold text-xs whitespace-nowrap transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
