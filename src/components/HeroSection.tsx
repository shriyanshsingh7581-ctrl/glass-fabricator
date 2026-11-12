import React, { useState } from 'react';
import {
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Factory,
  Layers,
  MapPin,
} from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface HeroSectionProps {
  lang: Language;
  settings: SiteSettings;
}

interface FacilityPreviewSlide {
  id: string;
  labelEn: string;
  labelHi: string;
  eyebrowEn: string;
  eyebrowHi: string;
  titleEn: string;
  titleHi: string;
  captionEn: string;
  captionHi: string;
  imageUrl: string;
}

const FACILITY_SLIDES: FacilityPreviewSlide[] = [
  {
    id: 'hq-building',
    labelEn: '3-Storey Hisar HQ',
    labelHi: '3-मंजिला मुख्य शोरूम',
    eyebrowEn: 'HISAR HEADQUARTERS · NIRANKARI BHAWAN ROAD',
    eyebrowHi: 'हिसार हेडक्वार्टर · निरंकारी भवन रोड',
    titleEn: 'Haryana Glass Fabricator — 3-Storey Flagship Showroom.',
    titleHi: 'हरियाणा ग्लास फैब्रीकेटर — 3-मंजिला मुख्य बिल्डिंग और शोरूम।',
    captionEn:
      'Featuring warm architectural timber louvers, custom CNC Radha-Krishna & Lord Hanuman elevation artwork, expansive toughened glass glazing, and the signature HGF Haryana rooftop emblem.',
    captionHi:
      'वुडन वर्टिकल लूवर एलिवेशन, राधा-कृष्ण व हनुमान जी की कस्टम CNC कलाकृति, टफन्ड ग्लास फसाड और छत पर हरियाणा के नक्शे में HGF चिन्ह के साथ।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0076_51ee043d.jpg',
  },
  {
    id: 'cnc-floor',
    labelEn: 'Pro CNC Plant',
    labelHi: 'प्रो CNC प्लांट',
    eyebrowEn: 'AUTOMATED MANUFACTURING FLOOR · HISAR',
    eyebrowHi: 'ऑटोमेटेड मैन्युफैक्चरिंग फ्लोर · हिसार',
    titleEn: 'Double-Head CNC Cutting, uPVC Thermal Welding & Glazing.',
    titleHi: 'डबल-हेड CNC कटिंग, uPVC थर्मल वेल्डिंग और ग्लेजिंग प्लांट।',
    captionEn:
      '100% in-house precision manufacturing with Double-Head 45°/90° Mitre Saws, Twin-Head uPVC Thermal Welders, Vertical Copy Routers, and scratch-free Green-Felt Glazing Tables.',
    captionHi:
      'डबल-हेड 45°/90° CNC कटिंग मशीन, ट्विन-हेड uPVC थर्मल वेल्डर, कॉपी राउटर और ग्रीन-फेल्ट ग्लेजिंग टेबल से लैस हमारी अपनी अत्याधुनिक वर्कशॉप।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0067_74b8e69d.jpg',
  },
  {
    id: 'glass-godown',
    labelEn: 'Glass Godown',
    labelHi: 'ग्लास गोदाम',
    eyebrowEn: 'BULK FLOAT GLASS WAREHOUSE · GOLD PLUS STOCK',
    eyebrowHi: 'विशाल ग्लास वेयरहाउस · Gold Plus स्टॉक',
    titleEn: 'Haryana Glass Godown (हरियाणा ग्लास गोदाम).',
    titleHi: 'हरियाणा ग्लास गोदाम — जंबो फ्लोट और टफन्ड ग्लास स्टॉक।',
    captionEn:
      'Direct bulk inventory of Gold Plus clear float glass, tinted architectural sheets, and jumbo mirrors stored on heavy-duty interior A-frame racks.',
    captionHi:
      'Gold Plus क्लियर फ्लोट ग्लास, टिंटेड ग्लास और जंबो मिरर शीट्स के भारी स्टॉक वाला हमारा समर्पित हरियाणा ग्लास गोदाम।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0075_82012555.jpg',
  },
  {
    id: 'mirror-showroom',
    labelEn: 'LED Mirror Studio',
    labelHi: 'LED मिरर स्टूडियो',
    eyebrowEn: 'IN-HOUSE DISPLAY GALLERY · SMART TOUCH MIRRORS',
    eyebrowHi: 'इन-हाउस डिस्प्ले गैलरी · स्मार्ट टच मिरर',
    titleEn: 'Custom Arch, Warm-Gold Halo & Diamond Bevelled Mirrors.',
    titleHi: 'कस्टम आर्च, वार्म-गोल्ड और डायमंड बेवल्ड एलईडी मिरर।',
    captionEn:
      'Experience live working displays of triple-border Arch dressing mirrors, smart touch-sensor vanity mirrors, faceted diamond bevelled wall mirrors, and window hardware.',
    captionHi:
      'ट्रिपल-बॉर्डर आर्च ड्रेसिंग मिरर, स्मार्ट टच-सेंसर वैनिटी मिरर, डायमंड-कट बेवल्ड मिरर और ओरिजिनल हार्डवेयर के लाइव सैंपल।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0068_4d315855.jpg',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, settings }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = FACILITY_SLIDES[activeSlideIndex];

  const whatsappHeroUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा ग्लास फैब्रिकेटर, मुझे अपने प्रोजेक्ट के लिए एल्युमीनियम, uPVC या ग्लास फैब्रिकेशन का कोटेशन चाहिए।'
      : 'Hello Haryana Glass Fabricator, I would like to book a consultation and quotation for my project.'
  );

  return (
    <section id="top" className="bg-white text-[#263746] overflow-hidden">
      {/* Centered Hero Header */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 text-center">
        <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#16A6A1]/10 border border-[#16A6A1]/20 text-xs sm:text-sm font-bold tracking-wide uppercase text-[#16A6A1]">
          {lang === 'hi'
            ? 'हरियाणा ग्लास फैब्रिकेटर · 35+ वर्षों की विरासत · 2 पीढ़ियां'
            : 'Haryana Glass Fabricator · 35+ Years Legacy · 2 Generations'}
        </p>

        <h1 className="mt-4 text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-[-0.035em] text-[#102A43] leading-[1.04]">
          {lang === 'hi' ? (
            <>
              एल्युमीनियम, uPVC और ग्लास।{' '}
              <span className="text-[#16A6A1]">बेजोड़ प्रो-ग्रेड कारीगरी।</span>
            </>
          ) : (
            <>
              uPVC, Aluminium & Glass.{' '}
              <span className="text-[#16A6A1]">Engineered to perfection.</span>
            </>
          )}
        </h1>

        <p className="mt-5 text-base sm:text-xl text-[#263746]/85 max-w-3xl mx-auto leading-relaxed font-normal">
          {lang === 'hi'
            ? settings.heroSubheadingHi
            : settings.heroSubheadingEn}
        </p>

        {/* Action Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="#quotation"
            className="px-7 py-3.5 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {lang === 'hi'
              ? 'निःशुल्क कोटेशन और साइट माप बुक करें'
              : 'Book Free Site Measurement'}
          </a>

          <a
            href="#workshop"
            className="inline-flex items-center gap-1 text-[#102A43] hover:text-[#16A6A1] font-semibold text-sm sm:text-base transition-colors"
          >
            <span>
              {lang === 'hi'
                ? 'हमारी वर्कशॉप के 29 असली फोटो देखें'
                : 'Explore 29 Live Workshop Photos'}
            </span>
            <ChevronRight className="w-4 h-4 text-[#16A6A1]" />
          </a>

          <a
            href={whatsappHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F3F6F8] hover:bg-[#DCE4EA] text-[#102A43] font-semibold text-sm sm:text-base transition-colors border border-[#DCE4EA]"
          >
            <MessageCircle className="w-4 h-4 text-[#16A6A1]" />
            <span>Get Quotation on WhatsApp</span>
            <ChevronRight className="w-4 h-4 text-[#16A6A1]" />
          </a>
        </div>
      </div>

      {/* Showcase Cinema Frame */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* Segmented Control Bar */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-[#F3F6F8] p-1.5 rounded-2xl border border-[#DCE4EA]">
            {FACILITY_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'text-[#263746]/70 hover:text-[#102A43]'
                  }`}
                >
                  {lang === 'hi' ? slide.labelHi : slide.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Giant Cinema Showcase Card */}
        <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#102A43] text-white shadow-[0_24px_60px_rgba(16,42,67,0.18)] border border-[#102A43]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image Stage (7 Cols) */}
            <div className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto min-h-[320px] sm:min-h-[460px] bg-[#0C2237] overflow-hidden">
              <img
                src={currentSlide.imageUrl}
                alt={lang === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#102A43]/50" />
            </div>

            {/* Description Panel (5 Cols) */}
            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#0C2237]">
              <div>
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#16A6A1]">
                  {lang === 'hi'
                    ? currentSlide.eyebrowHi
                    : currentSlide.eyebrowEn}
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-white leading-tight">
                  {lang === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  {lang === 'hi'
                    ? currentSlide.captionHi
                    : currentSlide.captionEn}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-white/60">
                  {lang === 'hi'
                    ? `फोटो 0${activeSlideIndex + 1} / 0${FACILITY_SLIDES.length}`
                    : `Facility View 0${activeSlideIndex + 1} of 0${FACILITY_SLIDES.length}`}
                </span>
                <a
                  href="#workshop"
                  className="inline-flex items-center gap-1 text-[#16A6A1] hover:text-[#52D1CC] font-semibold transition-colors"
                >
                  <span>
                    {lang === 'hi'
                      ? 'सभी 29 वर्कशॉप फोटो देखें'
                      : 'See all 29 plant photos'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Bento Strip (#F3F6F8 with #DCE4EA borders and #16A6A1 icons) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-[24px] bg-[#F3F6F8] border border-[#DCE4EA] p-6 sm:p-7 architectural-card-hover">
            <ShieldCheck className="w-6 h-6 text-[#16A6A1]" />
            <div className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] tabular-nums">
              {settings.legacyYearsStat}
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[#102A43]">
              {lang === 'hi'
                ? '1990 से हिसार और पूरे हरियाणा में अटूट पारिवारिक विश्वास।'
                : 'Trusted architectural glass & window craftsmanship since 1990.'}
            </p>
            <p className="mt-2 text-xs text-[#263746]/80 leading-relaxed">
              {lang === 'hi'
                ? '35+ वर्षों की निरंतर सेवा, 2 पीढ़ियों की देखरेख और उच्च गुणवत्ता।'
                : '35+ Years of continuous craftsmanship & quality customer commitment.'}
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F3F6F8] border border-[#DCE4EA] p-6 sm:p-7 architectural-card-hover">
            <Layers className="w-6 h-6 text-[#16A6A1]" />
            <div className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] tabular-nums">
              {settings.generationsStat}
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[#102A43]">
              {lang === 'hi'
                ? 'दो पीढ़ियों का अनुभव और हर प्रोजेक्ट की सीधी देखरेख।'
                : 'Two generations of family leadership and precision finishing.'}
            </p>
            <p className="mt-2 text-xs text-[#263746]/80 leading-relaxed">
              {lang === 'hi'
                ? 'ईमानदार माप, प्रीमियम सामग्री और बेजोड़ कारीगरी।'
                : 'Integrity in gauge thickness, authentic materials, and zero cutting corners.'}
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F3F6F8] border border-[#DCE4EA] p-6 sm:p-7 architectural-card-hover">
            <Factory className="w-6 h-6 text-[#16A6A1]" />
            <div className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] tabular-nums">
              100% CNC
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[#102A43]">
              {lang === 'hi'
                ? 'डबल-हेड कटिंग, uPVC थर्मल वेल्डिंग और अपना ग्लास गोदाम।'
                : 'In-house Double-Head CNC Saws, uPVC Welders & Glass Godown.'}
            </p>
            <p className="mt-2 text-xs text-[#263746]/80 leading-relaxed">
              {lang === 'hi'
                ? 'बिना किसी बाहरी थर्ड पार्टी निर्भरता के शत-प्रतिशत इन-हाउस निर्माण।'
                : 'Zero outsourcing. Every frame cut and glazed under one roof in Hisar.'}
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F3F6F8] border border-[#DCE4EA] p-6 sm:p-7 architectural-card-hover">
            <MapPin className="w-6 h-6 text-[#16A6A1]" />
            <div className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43]">
              Pan-Haryana
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[#102A43]">
              {lang === 'hi'
                ? 'हिसार से गुरुग्राम, रोहतक, करनाल और पूरे हरियाणा में सेवा।'
                : 'Site measurement and delivery across all 22 districts of Haryana.'}
            </p>
            <p className="mt-2 text-xs text-[#263746]/80 leading-relaxed">
              {lang === 'hi'
                ? 'हिसार स्थित बेस से ऑन-साइट लेजर सर्वे और संपूर्ण इंस्टॉलेशन।'
                : 'Laser site survey, custom fabrication, and expert on-site installation.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
