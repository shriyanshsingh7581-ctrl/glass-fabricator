import React from 'react';
import { Phone, MessageCircle, Instagram, ArrowUp } from 'lucide-react';
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
      ? 'नमस्ते हरियाणा विंडो मार्ट, मुझे कोटेशन और जानकारी चाहिए।'
      : 'Hello Haryana Window Mart, I would like to inquire about your services.'
  );

  return (
    <>
      {/* Authentic Apple.com Global Directory Footer */}
      <footer className="bg-[#F5F5F7] text-[#6E6E73] text-[12px] border-t border-black/[0.08] pb-20 md:pb-0">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-12">
          {/* Footnote / Legacy Note */}
          <div className="pb-6 border-b border-black/[0.08] leading-relaxed text-[#86868B]">
            {lang === 'hi'
              ? '1. हरियाणा विंडो मार्ट (हरियाणा ग्लास फैब्रीकेटर) के सभी एल्युमीनियम, uPVC और टफन्ड ग्लास सिस्टम निरंकारी भवन रोड, हिसार स्थित हमारे इन-हाउस CNC प्लांट में कस्टम तैयार किए जाते हैं। पूरे हरियाणा के सभी 22 जिलों में साइट माप और डिलीवरी उपलब्ध है।'
              : '1. All Haryana Window Mart (Haryana Glass Fabricator) Aluminium, uPVC, Slim Profile, and Toughened Glass systems are custom-fabricated in-house at our Nirankari Bhawan Road plant in Hisar. On-site laser measurement and delivery available across all 22 districts of Haryana.'}
          </div>

          {/* Multi-Column Apple Directory */}
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-black/[0.08]">
            {/* Col 1: Brand & Address */}
            <div>
              <div className="font-semibold text-[#1D1D1F] mb-2.5">
                {lang === 'hi' ? settings.brandNameHi : settings.brandNameEn}
              </div>
              <p className="text-[#6E6E73] leading-relaxed">
                {lang === 'hi' ? settings.subtitleHi : settings.subtitleEn}
                <br />
                {lang === 'hi' ? settings.addressHi : settings.addressEn}
              </p>
            </div>

            {/* Col 2: Core Verticals */}
            <div>
              <div className="font-semibold text-[#1D1D1F] mb-2.5">
                {lang === 'hi' ? 'प्रमुख सेवाएं' : 'Core Systems'}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:underline text-[#424245]">
                    Aluminium Windows & Doors
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:underline text-[#424245]">
                    uPVC Windows & Doors
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:underline text-[#424245]">
                    ISI Toughened Glass & Facades
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:underline text-[#424245]">
                    Slim Profile Partitions & LED Mirrors
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Explore */}
            <div>
              <div className="font-semibold text-[#1D1D1F] mb-2.5">
                {lang === 'hi' ? 'एक्सप्लोर करें' : 'Explore'}
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#workshop" className="hover:underline text-[#424245]">
                    {lang === 'hi'
                      ? 'प्रो CNC वर्कशॉप (29 फोटो)'
                      : 'Pro CNC Workshop (29 Photos)'}
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:underline text-[#424245]">
                    {lang === 'hi' ? 'प्रोडक्ट लाइनअप' : 'Product Lineup'}
                  </a>
                </li>
                <li>
                  <a href="#legacy" className="hover:underline text-[#424245]">
                    {lang === 'hi' ? '35+ वर्षों की विरासत' : '35+ Years Legacy'}
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:underline text-[#424245]">
                    {lang === 'hi' ? 'प्रोजेक्ट पोर्टफोलियो' : 'Project Portfolio'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Direct Connect */}
            <div>
              <div className="font-semibold text-[#1D1D1F] mb-2.5">
                {lang === 'hi' ? 'सीधा संपर्क' : 'Connect Directly'}
              </div>
              <div className="space-y-2.5">
                <a
                  href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-[#1D1D1F] font-semibold hover:text-[#0071E3] tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>{settings.phoneDisplay}</span>
                </a>

                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#424245] hover:underline"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>{settings.instagramHandle}</span>
                </a>

                <div className="pt-1 flex items-center gap-2">
                  <a
                    href="#quotation"
                    className="px-3.5 py-1.5 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium transition-colors"
                  >
                    {lang === 'hi' ? 'कोटेशन बुक करें' : 'Book Consultation'}
                  </a>
                  <a
                    href="#top"
                    aria-label="Back to Top"
                    className="p-1.5 rounded-lg bg-white border border-black/10 text-[#1D1D1F] hover:bg-[#E8E8ED]"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Line */}
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#86868B]">
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
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-5 py-3 rounded-2xl bg-[#1D1D1F]/90 hover:bg-[#000000] backdrop-blur-xl text-white font-medium text-xs shadow-xl border border-white/15 transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <span>
          {lang === 'hi' ? 'व्हाट्सएप डायरेक्ट' : 'WhatsApp Specialist'}
        </span>
      </a>

      {/* Mobile Sticky Bottom Action Bar (<= 15% viewport height) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 apple-glass-nav border-t border-black/[0.08] px-3 py-2 grid grid-cols-2 gap-2">
        <a
          href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1D1D1F] text-white font-medium text-xs whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-[#2997FF]" />
          <span>{lang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0071E3] text-white font-medium text-xs whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Direct</span>
        </a>
      </div>
    </>
  );
};
