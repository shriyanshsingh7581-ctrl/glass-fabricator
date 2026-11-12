import React from 'react';
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  SlidersHorizontal,
  ArrowUp,
} from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface FooterAndFloatingProps {
  lang: Language;
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const FooterAndFloating: React.FC<FooterAndFloatingProps> = ({
  lang,
  settings,
  onOpenAdmin,
}) => {
  const waUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा विंडो मार्ट, मुझे कोटेशन और जानकारी चाहिए।'
      : 'Hello Haryana Window Mart, I would like to inquire about your services.'
  );

  return (
    <>
      <footer className="bg-[#141311] text-[#F6F3EC] border-t border-[#2C2A26] pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C2A26]">
            {/* Col 1: Brand Identity */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-white p-1 border border-[#44403C] shrink-0">
                  <img
                    src={settings.logoUrl}
                    alt={settings.brandNameEn}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-architectural font-bold text-lg uppercase text-white">
                    {lang === 'hi'
                      ? settings.brandNameHi
                      : settings.brandNameEn}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#FB923C]">
                    {lang === 'hi' ? settings.subtitleHi : settings.subtitleEn}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-md">
                {lang === 'hi'
                  ? '35+ वर्षों का अनुभव और 2 पीढ़ियों की पारिवारिक विरासत। हिसार स्थित हमारे 3-मंजिला शोरूम, हरियाणा ग्लास गोदाम और ऑटोमेटेड CNC वर्कशॉप से पूरे हरियाणा में सेवा।'
                  : '35+ Years of Business Excellence & 2 Generations of Family Legacy. Complete expertise in Aluminium, uPVC, Toughened Glass, Slim Partitions & LED Mirrors across Haryana.'}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-[#D6D3CD]">
                <MapPin className="w-4 h-4 text-[#FB923C] shrink-0" />
                <span>
                  {lang === 'hi' ? settings.addressHi : settings.addressEn}
                </span>
              </div>
            </div>

            {/* Col 2: Quick Navigation */}
            <div className="lg:col-span-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FB923C] font-semibold mb-4">
                {lang === 'hi' ? 'प्रमुख सेक्शन' : 'ARCHITECTURAL SECTIONS'}
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D6D3CD]">
                <li>
                  <a
                    href="#workshop"
                    className="hover:text-[#FB923C] transition-colors font-semibold text-white"
                  >
                    {lang === 'hi'
                      ? '→ हमारी वर्कशॉप और मशीनरी (29 फोटो)'
                      : '→ Live Hisar Workshop (29 Photos)'}
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#FB923C] transition-colors"
                  >
                    {lang === 'hi' ? '→ 8 मुख्य सेवाएं' : '→ 8 Core Services'}
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    className="hover:text-[#FB923C] transition-colors"
                  >
                    {lang === 'hi'
                      ? '→ सिग्नेचर प्रोडक्ट कैटलॉग'
                      : '→ Signature Product Catalog'}
                  </a>
                </li>
                <li>
                  <a
                    href="#legacy"
                    className="hover:text-[#FB923C] transition-colors"
                  >
                    {lang === 'hi'
                      ? '→ 35+ वर्षों की विरासत'
                      : '→ 35+ Years Family Legacy'}
                  </a>
                </li>
                <li>
                  <a
                    href="#quotation"
                    className="hover:text-[#FB923C] transition-colors"
                  >
                    {lang === 'hi'
                      ? '→ कोटेशन और साइट माप फॉर्म'
                      : '→ Book Site Measurement'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Contact & Admin Access */}
            <div className="lg:col-span-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FB923C] font-semibold mb-4">
                {lang === 'hi'
                  ? 'सीधा संपर्क और एडमिन'
                  : 'DIRECT CONTACT & ADMIN'}
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 text-white hover:text-[#FB923C] font-mono font-bold text-base tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#FB923C]" />
                  <span>{settings.phoneDisplay}</span>
                </a>

                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#D6D3CD] hover:text-white"
                >
                  <Instagram className="w-4 h-4 text-[#FB923C]" />
                  <span>
                    Instagram: {settings.instagramHandle}
                  </span>
                </a>

                <div className="pt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1917] hover:bg-[#C2410C] text-[#F6F3EC] border border-[#44403C] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#FB923C]" />
                    <span>
                      {lang === 'hi'
                        ? 'एडमिन कंट्रोल पैनल (CMS)'
                        : 'Full-Control Admin Panel'}
                    </span>
                  </button>

                  <a
                    href="#top"
                    className="p-2.5 bg-[#1C1917] hover:bg-[#292524] text-[#D6D3CD] border border-[#44403C]"
                    aria-label="Back to Top"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#78716C]">
            <div>
              © {new Date().getFullYear()} {settings.brandNameEn} (
              {settings.subtitleEn}) · Hisar, Haryana.
            </div>
            <div>
              {lang === 'hi'
                ? '35+ वर्षों की उत्कृष्टता · पूरे हरियाणा में सेवा उपलब्ध'
                : '35+ Years of Craftsmanship · Pan-Haryana Service'}
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp Direct Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 px-5 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white font-architectural font-bold text-xs uppercase tracking-wider shadow-xl border border-white/20 transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="w-4 h-4" />
        <span>
          {lang === 'hi' ? 'व्हाट्सएप डायरेक्ट चैट' : 'WhatsApp Direct'}
        </span>
      </a>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#141311] border-t border-[#2C2A26] grid grid-cols-2 divide-x divide-[#2C2A26]">
        <a
          href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
          className="flex items-center justify-center gap-2 py-3.5 text-white font-architectural font-bold text-xs uppercase tracking-wider"
        >
          <Phone className="w-4 h-4 text-[#FB923C]" />
          <span>{lang === 'hi' ? 'अभी कॉल करें' : 'Call Now'}</span>
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 bg-[#15803D] text-white font-architectural font-bold text-xs uppercase tracking-wider"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{lang === 'hi' ? 'व्हाट्सएप डायरेक्ट' : 'WhatsApp Direct'}</span>
        </a>
      </div>
    </>
  );
};
