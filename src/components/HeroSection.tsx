import React, { useState } from 'react';
import {
  ArrowUpRight,
  MessageCircle,
  PhoneCall,
  MapPin,
  Factory,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface HeroSectionProps {
  lang: Language;
  settings: SiteSettings;
}

interface FacilityPreviewSlide {
  id: string;
  code: string;
  labelEn: string;
  labelHi: string;
  titleEn: string;
  titleHi: string;
  captionEn: string;
  captionHi: string;
  imageUrl: string;
}

const FACILITY_SLIDES: FacilityPreviewSlide[] = [
  {
    id: 'hq-building',
    code: 'HISAR HQ · 01',
    labelEn: '3-Storey Building',
    labelHi: '3-मंजिला मुख्य शोरूम',
    titleEn: 'Haryana Glass Fabricator — 3-Storey Showroom & Headquarters',
    titleHi: 'हरियाणा ग्लास फैब्रीकेटर — 3-मंजिला मुख्य बिल्डिंग और शोरूम (हिसार)',
    captionEn:
      'Located at Nirankari Bhawan Road, Opp. Bank Colony T-Point, Hisar — featuring custom wooden louver elevation, CNC Radha-Krishna & Hanuman ji wall art, and the Haryana state map HGF rooftop emblem.',
    captionHi:
      'निरंकारी भवन रोड, हिसार स्थित हमारी 3-मंजिला मुख्य बिल्डिंग — वुडन लूवर एलिवेशन, राधा-कृष्ण व हनुमान जी की CNC कलाकृति और छत पर HGF हरियाणा मैप चिन्ह के साथ।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0076_51ee043d.jpg',
  },
  {
    id: 'cnc-floor',
    code: 'CNC PLANT · 02',
    labelEn: 'CNC Factory Floor',
    labelHi: 'CNC फैक्ट्री फ्लोर',
    titleEn: 'Automated Double-Head Cutting, uPVC Welding & Glazing Plant',
    titleHi: 'ऑटोमेटेड डबल-हेड CNC कटिंग, uPVC वेल्डिंग और ग्लेजिंग प्लांट',
    captionEn:
      'Complete in-house fabrication plant in Hisar equipped with Double-Head 45°/90° CNC Mitre Saws, Twin-Head Thermal uPVC Welders, Vertical Copy Routers, and Green-Felt Glazing Tables.',
    captionHi:
      'हिसार में हमारी अपनी अत्याधुनिक वर्कशॉप — जहां डबल-हेड CNC कटिंग मशीन, uPVC थर्मल वेल्डिंग मशीन, कॉपी राउटर और ग्रीन-फेल्ट ग्लेजिंग टेबल पर सारा काम इन-हाउस होता है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0067_74b8e69d.jpg',
  },
  {
    id: 'glass-godown',
    code: 'GODOWN · 03',
    labelEn: 'Glass Godown',
    labelHi: 'हरियाणा ग्लास गोदाम',
    titleEn: 'Haryana Glass Godown (हरियाणा ग्लास गोदाम) — Bulk Float Stock',
    titleHi: 'हरियाणा ग्लास गोदाम — जंबो फ्लोट और टफन्ड ग्लास वेयरहाउस',
    captionEn:
      'Dedicated bulk float-glass warehouse stocking Gold Plus clear, tinted, frosted, and mirror jumbo sheets on heavy-duty interior A-frame racks for wholesale & project supply.',
    captionHi:
      'हमारा समर्पित "हरियाणा ग्लास गोदाम" जहां Gold Plus फ्लोट ग्लास, टिंटेड ग्लास और मिरर की बड़ी शीट्स का सीधा होलसेल व प्रोजेक्ट स्टॉक उपलब्ध रहता है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0075_82012555.jpg',
  },
  {
    id: 'mirror-showroom',
    code: 'SHOWROOM · 04',
    labelEn: 'LED Mirror Gallery',
    labelHi: 'LED मिरर शोरूम',
    titleEn: 'In-House Arch, Round Gold & Diamond Bevelled LED Mirror Showroom',
    titleHi: 'इन-हाउस आर्च, राउंड गोल्ड और डायमंड बेवल्ड एलईडी मिरर शोरूम',
    captionEn:
      'Experience live working samples of triple-border Arch dressing mirrors, smart touch-sensor vanity mirrors, diamond-cut bevelled wall mirrors, and architectural hardware.',
    captionHi:
      'हमारे शोरूम में ट्रिपल-बॉर्डर आर्च ड्रेसिंग मिरर, स्मार्ट टच-सेंसर बैकलिट मिरर, डायमंड-कट बेवल्ड मिरर और प्रीमियम विंडो हार्डवेयर के लाइव सैंपल देखें।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0068_4d315855.jpg',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, settings }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = FACILITY_SLIDES[activeSlideIndex];

  const whatsappHeroUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा विंडो मार्ट, मुझे अपने घर/प्रोजेक्ट के लिए एल्युमीनियम, uPVC या ग्लास फैब्रिकेशन का कोटेशन चाहिए।'
      : 'Hello Haryana Window Mart, I would like to book a consultation and quotation for my project.'
  );

  return (
    <section
      id="top"
      className="relative bg-[#F6F3EC] text-[#141311] border-b border-[#D6CFC2] atelier-grid-light"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Main Split-Screen Architectural Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-[#D6CFC2] bg-[#FDFBF7]/90">
          {/* Left Column: Editorial Typography & Direct Actions (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D6CFC2]">
            <div>
              {/* Unboxed Provenance Overline */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#C2410C] font-semibold pb-4 border-b border-[#E5DEC9]">
                <span>{lang === 'hi' ? settings.heroBadgeHi : settings.heroBadgeEn}</span>
              </div>

              {/* Monumental Editorial Display Headline */}
              <h1 className="mt-6 font-editorial font-bold text-4xl sm:text-5xl xl:text-[58px] text-[#141311] leading-[1.06] tracking-tight">
                {lang === 'hi' ? settings.heroHeadingHi : settings.heroHeadingEn}
              </h1>

              {/* Subtitle & Craftsmanship Statement */}
              <p className="mt-5 text-base sm:text-lg text-[#44403C] leading-relaxed max-w-2xl font-normal">
                {lang === 'hi' ? settings.heroSubheadingHi : settings.heroSubheadingEn}
              </p>

              {/* Architectural Specification Matrix */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#D6CFC2] border border-[#D6CFC2]">
                <div className="bg-[#FDFBF7] p-4">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                    {lang === 'hi' ? 'प्रोफाइल और ग्लास पार्टनर' : 'RAW MATERIAL STANDARD'}
                  </div>
                  <div className="mt-1 font-architectural font-bold text-sm text-[#141311]">
                    {lang === 'hi'
                      ? 'ENcraft uPVC · Gold Plus Float · ISI टफन्ड'
                      : 'ENcraft uPVC · Gold Plus Float · ISI Tempered'}
                  </div>
                </div>
                <div className="bg-[#FDFBF7] p-4">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                    {lang === 'hi' ? 'इन-हाउस मशीनरी प्लांट' : 'IN-HOUSE CNC PLANT'}
                  </div>
                  <div className="mt-1 font-architectural font-bold text-sm text-[#141311]">
                    {lang === 'hi'
                      ? 'डबल-हेड CNC कटर · थर्मल वेल्डर · कॉपी राउटर'
                      : 'Double-Head CNC Saw · Thermal Welder · Copy Router'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Triggers & Location Bar */}
            <div className="mt-8 pt-6 border-t border-[#E5DEC9]">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#quotation"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#141311] hover:bg-[#C2410C] text-[#FDFBF7] font-architectural font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                >
                  <span>
                    {lang === 'hi'
                      ? 'निःशुल्क साइट माप व कोटेशन बुक करें'
                      : 'Book Site Measurement & Quote'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#workshop"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74] font-architectural font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                >
                  <Factory className="w-4 h-4" />
                  <span>
                    {lang === 'hi'
                      ? 'हमारी वर्कशॉप के 29 असली फोटो देखें'
                      : 'Tour Our Hisar Workshop (29 Photos)'}
                  </span>
                </a>

                <a
                  href={whatsappHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#15803D] hover:bg-[#166534] text-white font-architectural font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#57534E]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C2410C] shrink-0" />
                  <span className="font-medium">
                    {lang === 'hi' ? settings.addressHi : settings.addressEn}
                  </span>
                </div>
                <a
                  href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 font-mono font-bold text-[#141311] hover:text-[#C2410C] tabular-nums"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>{settings.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Real Hisar Facility Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141311] text-[#F6F3EC]">
            {/* Interactive Facility Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#2C2A26]">
              {FACILITY_SLIDES.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-3 py-3 text-left border-r border-b sm:border-b-0 border-[#2C2A26] last:border-r-0 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#C2410C] text-white'
                        : 'bg-[#1C1917] text-[#A8A29E] hover:text-white hover:bg-[#292524]'
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                      0{idx + 1}
                    </div>
                    <div className="text-xs font-architectural font-bold truncate mt-0.5">
                      {lang === 'hi' ? slide.labelHi : slide.labelEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Real Photograph Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:flex-1 min-h-[320px] overflow-hidden bg-[#0C0A09]">
              <img
                src={currentSlide.imageUrl}
                alt={lang === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-black/30" />

              {/* Top Coordinate Stamp */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-white/90">
                <span className="bg-[#141311]/85 backdrop-blur-xs px-2.5 py-1 border border-white/15">
                  {currentSlide.code}
                </span>
                <span className="bg-[#C2410C] px-2.5 py-1 font-semibold">
                  {lang === 'hi' ? 'असली हिसार प्लांट फोटो' : 'REAL HISAR FACILITY'}
                </span>
              </div>
            </div>

            {/* Detailed Caption Underneath Active Photo */}
            <div className="p-6 bg-[#141311] border-t border-[#2C2A26]">
              <h2 className="font-architectural font-bold text-lg text-white leading-snug">
                {lang === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {lang === 'hi' ? currentSlide.captionHi : currentSlide.captionEn}
              </p>
              <div className="mt-4 pt-3 border-t border-[#2C2A26] flex items-center justify-between text-xs font-mono">
                <span className="text-[#A8A29E]">
                  {lang === 'hi'
                    ? `फोटो ${activeSlideIndex + 1} / ${FACILITY_SLIDES.length} · नीचे पूरे 29 वर्कशॉप फोटो देखें`
                    : `VIEW 0${activeSlideIndex + 1} / 0${FACILITY_SLIDES.length} · 29 WORKSHOP PHOTOS BELOW`}
                </span>
                <a
                  href="#workshop"
                  className="text-[#FB923C] hover:text-white font-semibold uppercase tracking-wider"
                >
                  {lang === 'hi' ? 'पूरी वर्कशॉप देखें →' : 'ALL 29 PHOTOS →'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Column Structural Metrics Ledger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-x border-b border-[#D6CFC2] bg-[#FDFBF7] divide-x divide-y lg:divide-y-0 divide-[#D6CFC2]">
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#78716C]">
              <span>01 · HERITAGE</span>
              <ShieldCheck className="w-4 h-4 text-[#C2410C]" />
            </div>
            <div className="mt-2 font-editorial font-bold text-3xl sm:text-4xl text-[#141311] tabular-nums">
              {settings.legacyYearsStat}
            </div>
            <p className="mt-1 text-xs text-[#57534E]">
              {lang === 'hi'
                ? '1990 से हिसार और पूरे हरियाणा में अटूट विश्वास'
                : 'Proven excellence in glass & fenestration since 1990'}
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#78716C]">
              <span>02 · LINEAGE</span>
              <Layers className="w-4 h-4 text-[#1E3A8A]" />
            </div>
            <div className="mt-2 font-editorial font-bold text-3xl sm:text-4xl text-[#141311] tabular-nums">
              {settings.generationsStat}
            </div>
            <p className="mt-1 text-xs text-[#57534E]">
              {lang === 'hi'
                ? 'दो पीढ़ियों का पारिवारिक अनुभव और सीधी देखरेख'
                : 'Family-led precision craftsmanship & direct supervision'}
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#78716C]">
              <span>03 · IN-HOUSE PLANT</span>
              <Factory className="w-4 h-4 text-[#C2410C]" />
            </div>
            <div className="mt-2 font-editorial font-bold text-3xl sm:text-4xl text-[#141311] tabular-nums">
              100% CNC
            </div>
            <p className="mt-1 text-xs text-[#57534E]">
              {lang === 'hi'
                ? 'डबल-हेड कटिंग, uPVC थर्मल वेल्डिंग और अपना ग्लास गोदाम'
                : 'Own 3-storey showroom, glass godown & automated CNC line'}
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#78716C]">
              <span>04 · COVERAGE</span>
              <Sparkles className="w-4 h-4 text-[#15803D]" />
            </div>
            <div className="mt-2 font-editorial font-bold text-3xl sm:text-4xl text-[#141311] tabular-nums">
              Pan-Haryana
            </div>
            <p className="mt-1 text-xs text-[#57534E]">
              {lang === 'hi'
                ? 'हिसार से गुरुग्राम, रोहतक, करनाल, सिरसा व पूरे हरियाणा में सेवा'
                : 'On-site laser measurement & installation across all 22 districts'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
