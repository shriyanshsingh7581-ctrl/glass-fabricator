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
      ? 'नमस्ते हरियाणा विंडो मार्ट, मुझे खिड़कियों और ग्लास वर्क के लिए जानकारी चाहिए।'
      : 'Hello Haryana Window Mart, I would like to inquire about architectural glass and window solutions.'
  );

  return (
    <>
      {/* Apple-Style Top Ribbon with Bilingual Switcher */}
      <div className="bg-[#1D1D1F] text-[#F5F5F7] text-[12px] py-1.5 px-4">
        <div className="max-w-[1080px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#F5F5F7]/85 min-w-0 flex-1">
            <span className="truncate">
              {lang === 'hi'
                ? '35+ वर्षों की उत्कृष्टता · 4PVM+FMV, निरंकारी भवन रोड, बैंक कॉलोनी, हिसार 125001 · पूरे हरियाणा में सेवा'
                : '35+ Years of Craftsmanship · 4PVM+FMV, Nirankari Bhawan Rd, Bank Colony, Urban Estate II, Hisar 125001'}
            </span>
            <a
              href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-0.5 text-[#2997FF] hover:underline font-medium tabular-nums shrink-0"
            >
              <span>{settings.phoneDisplay}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div
            role="group"
            aria-label="Language Switcher"
            className="inline-flex items-center bg-white/10 p-0.5 rounded-md shrink-0"
          >
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-white text-[#1D1D1F]'
                  : 'text-[#F5F5F7]/75 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('hi')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                lang === 'hi'
                  ? 'bg-white text-[#1D1D1F]'
                  : 'text-[#F5F5F7]/75 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Apple.com 3-Zone Frosted Glass Global Navigation Bar */}
      <header className="sticky top-0 z-40 apple-glass-nav border-b border-black/[0.08] transition-all">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 group focus:outline-none whitespace-nowrap shrink-0"
          >
            <div className="w-7 h-7 rounded-md bg-white border border-black/[0.08] p-0.5 flex items-center justify-center shrink-0">
              {!logoError && settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.brandNameEn}
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-[10px] font-bold text-[#1D1D1F]">HWM</span>
              )}
            </div>
            <span className="font-semibold text-[14px] tracking-[-0.015em] text-[#1D1D1F] whitespace-nowrap shrink-0">
              {lang === 'hi' ? settings.brandNameHi : settings.brandNameEn}
            </span>
          </a>

          {/* Zone 2: Minimal Apple Global Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[12px] font-normal text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#quotation"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[12px] font-medium transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'कोटेशन लें' : 'Get Quote'}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-1.5 text-[#1D1D1F]/80 hover:text-[#1D1D1F]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Apple-Style Smooth Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#1D1D1F] hover:text-[#0071E3] py-1 border-b border-black/[0.05] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#86868B]" />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-xs whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#0071E3]" />
                <span>{lang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
              </a>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0071E3] text-white font-semibold text-xs whitespace-nowrap"
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
