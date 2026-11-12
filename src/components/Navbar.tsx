import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  SlidersHorizontal,
  MapPin,
  Instagram,
  Factory,
} from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface NavbarProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  settings: SiteSettings;
  onOpenAdmin: () => void;
  newLeadsCount: number;
  firebaseOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  settings,
  onOpenAdmin,
  newLeadsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    {
      href: '#workshop',
      label: lang === 'hi' ? 'हमारी वर्कशॉप (29 फोटो)' : 'Live Workshop (29)',
      highlight: true,
    },
    {
      href: '#services',
      label: lang === 'hi' ? '8 मुख्य सेवाएं' : '8 Core Services',
    },
    {
      href: '#catalog',
      label: lang === 'hi' ? 'प्रोडक्ट कैटलॉग' : 'Product Catalog',
    },
    {
      href: '#legacy',
      label: lang === 'hi' ? '35+ वर्षों की विरासत' : '35-Yr Legacy',
    },
    {
      href: '#gallery',
      label: lang === 'hi' ? 'प्रोजेक्ट्स' : 'Projects',
    },
    {
      href: '#contact',
      label: lang === 'hi' ? 'संपर्क व पता' : 'Hisar Address',
    },
  ];

  const whatsappDirectUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा विंडो मार्ट, मुझे खिड़कियों और ग्लास वर्क के लिए जानकारी चाहिए।'
      : 'Hello Haryana Window Mart, I would like to inquire about architectural glass and window solutions.'
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#D6CFC2] text-[#141311]">
      {/* Top Architectural Specification Ribbon */}
      <div className="bg-[#141311] text-[#F6F3EC] border-b border-[#2C2A26]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 h-9 flex items-center justify-between gap-2 text-[11px] font-mono tracking-wider">
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <span className="text-[#EA580C] font-semibold uppercase truncate">
              {lang === 'hi'
                ? 'स्थापना 1990 · 35+ वर्षों का विश्वास'
                : 'EST. 1990 · 35+ YEARS LEGACY'}
            </span>
            <span className="hidden md:inline text-[#57534E] shrink-0">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-[#D6D3CD] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
              {lang === 'hi' ? settings.addressHi : settings.addressEn}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#D6D3CD] hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{settings.instagramHandle}</span>
            </a>
            <span className="hidden sm:inline text-[#57534E]">|</span>
            <a
              href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 text-[#F6F3EC] hover:text-[#EA580C] font-semibold transition-colors tabular-nums whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#EA580C] shrink-0" />
              <span>{settings.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Architectural Navigation Ledger */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2">
          {/* Brand Emblem & Typography */}
          <a
            href="#top"
            className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none min-w-0"
          >
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 bg-white border border-[#D6CFC2] p-1 flex items-center justify-center shrink-0 group-hover:border-[#C2410C] transition-colors shadow-xs">
              {!logoError && settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.brandNameEn}
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-[#1E3A8A] flex flex-col items-center justify-center text-white font-bold text-xs">
                  <span>HWM</span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-architectural font-bold text-sm sm:text-xl tracking-tight text-[#141311] uppercase leading-tight truncate">
                {lang === 'hi' ? settings.brandNameHi : settings.brandNameEn}
              </div>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.08em] sm:tracking-[0.14em] text-[#C2410C] font-semibold mt-0.5 truncate">
                {lang === 'hi' ? settings.subtitleHi : settings.subtitleEn}
              </p>
            </div>
          </a>

          {/* Desktop Structural Links */}
          <nav className="hidden xl:flex items-center border-x border-[#D6CFC2] h-20">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`h-full px-4 flex items-center text-xs font-architectural font-semibold uppercase tracking-wider border-r border-[#D6CFC2] last:border-r-0 transition-colors ${
                  item.highlight
                    ? 'bg-[#FFF7ED] text-[#C2410C] hover:bg-[#FFEDD5]'
                    : 'text-[#292524] hover:bg-[#F3EFE6] hover:text-[#141311]'
                }`}
              >
                {item.highlight && <Factory className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Language Switch + Admin + Direct Quote */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Switcher (EN | हिन्दी) */}
            <div
              role="group"
              aria-label="Language Switcher"
              className="inline-flex items-center bg-[#EDE8DD] p-0.5 border border-[#D6CFC2]"
            >
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2.5 py-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#141311] text-[#FDFBF7]'
                    : 'text-[#57534E] hover:text-[#141311]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('hi')}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  lang === 'hi'
                    ? 'bg-[#C2410C] text-white'
                    : 'text-[#57534E] hover:text-[#141311]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Admin Control Button */}
            <button
              type="button"
              onClick={onOpenAdmin}
              title={lang === 'hi' ? 'एडमिन पैनल (CMS)' : 'Full-Control Admin Panel'}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-[#141311] bg-white hover:bg-[#F3EFE6] border border-[#D6CFC2] hover:border-[#141311] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C2410C]" />
              <span className="hidden md:inline uppercase tracking-wider">
                {lang === 'hi' ? 'एडमिन' : 'Admin'}
              </span>
              {newLeadsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#C2410C] text-white text-[10px] font-mono font-bold tabular-nums">
                  {newLeadsCount}
                </span>
              )}
            </button>

            {/* Primary WhatsApp & Quote CTA */}
            <a
              href="#quotation"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-architectural font-bold uppercase tracking-wider bg-[#141311] hover:bg-[#C2410C] text-[#FDFBF7] transition-colors"
            >
              <span>{lang === 'hi' ? 'कोटेशन लें' : 'Get Quote'}</span>
            </a>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-architectural font-bold uppercase tracking-wider bg-[#15803D] hover:bg-[#166534] text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="xl:hidden p-2.5 text-[#141311] bg-white border border-[#D6CFC2] hover:border-[#141311]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FDFBF7] border-b border-[#D6CFC2] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 divide-y divide-[#E7E2D8] border border-[#D6CFC2] bg-white">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3.5 text-sm font-architectural font-semibold flex items-center justify-between ${
                  item.highlight ? 'bg-[#FFF7ED] text-[#C2410C]' : 'text-[#141311]'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#78716C]">→</span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <a
              href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#141311] text-white font-architectural font-bold text-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#EA580C]" />
              <span>{lang === 'hi' ? 'कॉल करें' : 'Call Hisar Hub'}</span>
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#15803D] text-white font-architectural font-bold text-xs uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
