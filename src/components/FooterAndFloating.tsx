import React from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface FooterAndFloatingProps {
  lang: Language;
  settings: SiteSettings;
  onOpenAdmin?: () => void;
}

export const FooterAndFloating: React.FC<FooterAndFloatingProps> = ({
  lang,
  settings,
}) => {
  const waUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा ग्लास फैब्रिकेटर, मुझे कोटेशन और जानकारी चाहिए।'
      : 'Hello Haryana Glass Fabricator, I would like to inquire about your services.'
  );

  return (
    <>
      {/* Deep Navy Blue (#102A43) Global Directory Footer with Crisp White Text */}
      <footer className="bg-[#102A43] text-white/80 text-[12px] border-t border-[#102A43] pb-20 md:pb-0">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-12">
          {/* Footnote / Legacy Note */}
          <div className="pb-6 border-b border-white/15 leading-relaxed text-white/70">
            {lang === 'hi'
              ? '1. हरियाणा ग्लास फैब्रिकेटर के सभी एल्युमीनियम, uPVC और टफन्ड ग्लास सिस्टम निरंकारी भवन रोड, हिसार स्थित हमारे इन-हाउस CNC प्लांट में कस्टम तैयार किए जाते हैं। पूरे हरियाणा के सभी 22 जिलों में साइट माप और डिलीवरी उपलब्ध है।'
              : '1. All Haryana Glass Fabricator Aluminium, uPVC, Slim Profile, and Toughened Glass systems are custom-fabricated in-house at our Nirankari Bhawan Road plant in Hisar. On-site laser measurement and delivery available across all 22 districts of Haryana.'}
          </div>

          {/* Multi-Column Directory */}
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/15">
            {/* Col 1: Brand & Address */}
            <div>
              <div className="font-bold text-white text-sm mb-2.5">
                {lang === 'hi' ? settings.brandNameHi : settings.brandNameEn}
              </div>
              <p className="text-white/80 leading-relaxed">
                {lang === 'hi' ? settings.subtitleHi : settings.subtitleEn}
                <br />
                {lang === 'hi' ? settings.addressHi : settings.addressEn}
              </p>
              <div className="mt-2 text-[11px] text-white/60 space-y-0.5 tabular-nums">
                <div>
                  Plus Code: {settings.googlePlusCode || '4PVM+FMV, Hisar 125001'}
                </div>
                <div>
                  GPS: {settings.googleCoordinates || '29.1436379° N, 75.7343497° E'}
                </div>
                <div>
                  {lang === 'hi'
                    ? settings.openingHoursHi ||
                      'प्रतिदिन खुला: सुबह 9:00 बजे – शाम 7:00 बजे तक'
                    : settings.openingHoursEn || 'Open Daily: 9:00 AM – 7:00 PM'}
                </div>
              </div>
              <a
                href={
                  settings.googleBusinessShareUrl ||
                  'https://share.google/l7dnUDTVvbTdwgCST'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[#16A6A1] hover:text-[#52D1CC] font-semibold"
              >
                {lang === 'hi'
                  ? 'Google Business Profile (share.google) ›'
                  : 'Official Google Business Profile ›'}
              </a>
            </div>

            {/* Col 2: Core Verticals */}
            <div>
              <div className="font-bold text-white text-sm mb-2.5">
                {lang === 'hi' ? 'प्रमुख सेवाएं' : 'Core Systems'}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    Aluminium Windows & Doors
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    uPVC Windows & Doors
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    ISI Toughened Glass & Facades
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    Slim Profile Partitions & LED Mirrors
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Explore */}
            <div>
              <div className="font-bold text-white text-sm mb-2.5">
                {lang === 'hi' ? 'एक्सप्लोर करें' : 'Explore'}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#workshop" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    {lang === 'hi'
                      ? 'प्रो CNC वर्कशॉप (29 फोटो)'
                      : 'Pro CNC Workshop (29 Photos)'}
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    {lang === 'hi' ? 'प्रोडक्ट लाइनअप' : 'Product Lineup'}
                  </a>
                </li>
                <li>
                  <a href="#legacy" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    {lang === 'hi' ? '35+ वर्षों की विरासत' : '35+ Years Legacy'}
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#16A6A1] text-white/80 transition-colors">
                    {lang === 'hi' ? 'प्रोजेक्ट पोर्टफोलियो' : 'Project Portfolio'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Direct Connect */}
            <div>
              <div className="font-bold text-white text-sm mb-2.5">
                {lang === 'hi' ? 'सीधा संपर्क' : 'Connect Directly'}
              </div>
              <div className="space-y-2.5">
                <a
                  href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-white font-bold hover:text-[#16A6A1] tabular-nums transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#16A6A1]" />
                  <span>{settings.phoneDisplay}</span>
                </a>

                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#E1306C]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>{settings.instagramHandle}</span>
                </a>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="#quotation"
                    className="px-4 py-2 rounded-lg bg-[#16A6A1] hover:bg-[#128A86] text-white font-semibold transition-colors shadow-xs"
                  >
                    {lang === 'hi' ? 'कोटेशन बुक करें' : 'Get Quotation'}
                  </a>
                  <a
                    href="#top"
                    aria-label="Back to Top"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Line */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/60">
            <div>
              Copyright © {new Date().getFullYear()} {settings.brandNameEn} (
              {settings.subtitleEn}). All rights reserved.
            </div>
            <div>Hisar, Haryana · Pan-Haryana Service</div>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp Concierge Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-5 py-3 rounded-2xl bg-[#102A43]/95 hover:bg-[#102A43] backdrop-blur-xl text-white font-semibold text-xs shadow-xl border border-white/20 transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="w-4 h-4 text-[#16A6A1]" />
        <span>
          {lang === 'hi' ? 'व्हाट्सएप डायरेक्ट' : 'WhatsApp Specialist'}
        </span>
      </a>

      {/* Mobile Sticky Bottom Action Bar with Deep Navy Blue & Glass Teal */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#102A43] border-t border-white/15 px-3 py-2 grid grid-cols-2 gap-2 shadow-2xl">
        <a
          href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs whitespace-nowrap transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#16A6A1]" />
          <span>{lang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white font-semibold text-xs whitespace-nowrap transition-colors shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Direct</span>
        </a>
      </div>
    </>
  );
};
