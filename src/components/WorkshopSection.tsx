import React, { useState } from 'react';
import {
  Factory,
  Search,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import {
  Language,
  SiteSettings,
  WorkshopCategory,
  WorkshopItem,
} from '../types/cms';
import { WORKSHOP_CATEGORIES } from '../data/initialData';
import {
  buildWhatsAppUrl,
  buildWorkshopWhatsAppMessage,
  filterWorkshopItems,
} from '../utils/logic';

interface WorkshopSectionProps {
  lang: Language;
  workshop: WorkshopItem[];
  settings: SiteSettings;
  onSelectWorkshopForQuote?: (title: string) => void;
}

export const WorkshopSection: React.FC<WorkshopSectionProps> = ({
  lang,
  workshop,
  settings,
  onSelectWorkshopForQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<WorkshopCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = filterWorkshopItems(
    workshop,
    activeCategory,
    searchQuery
  );

  const handlePrevLightbox = () => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="workshop"
      className="py-16 sm:py-24 bg-[#141311] text-[#F6F3EC] border-b border-[#2C2A26] atelier-grid-dark"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Editorial Header */}
        <div className="border border-[#2C2A26] bg-[#1C1917] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#FB923C] font-semibold">
                <Factory className="w-4 h-4" />
                <span>
                  {lang === 'hi'
                    ? 'वर्कशॉप (WORKSHOP) · निरंकारी भवन रोड, हिसार · 100% इन-हाउस फैब्रिकेशन'
                    : 'WORKSHOP & MACHINERY · NIRANKARI BHAWAN ROAD, HISAR · 100% IN-HOUSE PLANT'}
                </span>
              </div>

              <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-5xl text-white leading-[1.08]">
                {lang === 'hi'
                  ? 'हमारी वर्कशॉप, ग्लास गोदाम और ऑटोमेटेड CNC मशीनरी'
                  : 'Inside Our Hisar Workshop, Glass Godown & CNC Machinery'}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#D6D3CD] leading-relaxed max-w-3xl">
                {lang === 'hi'
                  ? 'नीचे हमारी हिसार स्थित 3-मंजिला मुख्य बिल्डिंग, हरियाणा ग्लास गोदाम, डबल-हेड CNC प्रोफाइल कटिंग मशीन, ट्विन-हेड uPVC थर्मल वेल्डिंग लाइन, वर्टिकल कॉपी राउटर, ग्रीन-फेल्ट ग्लेजिंग टेबल और एलईडी मिरर शोरूम के असली फोटो दिए गए हैं। हर फोटो के नीचे उस मशीन और काम का पूरा विवरण पढ़ा जा सकता है।'
                  : 'Explore authentic photographs from our Hisar headquarters, bulk float-glass godown, Double-Head CNC Mitre Cutting Saws, Twin-Head uPVC Thermal Welding Line, Vertical Copy Router, Green-Felt Glazing Bench, and LED Mirror Showroom — with detailed technical descriptions beneath every photograph.'}
              </p>
            </div>

            {/* Facility Summary Ledger Box */}
            <div className="lg:col-span-4 border border-[#2C2A26] bg-[#141311] p-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#FB923C]">
                {lang === 'hi'
                  ? 'वर्कशॉप क्षमता और उपकरण'
                  : 'PLANT INFRASTRUCTURE SUMMARY'}
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[#E7E5E4]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'hi'
                      ? '3-मंजिला मुख्य शोरूम + समर्पित हरियाणा ग्लास गोदाम'
                      : '3-Storey Main Showroom + Dedicated Haryana Glass Godown'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'hi'
                      ? 'डबल-हेड 45°/90° CNC कटिंग सॉ और वर्टिकल कॉपी राउटर'
                      : 'Double-Head 45°/90° CNC Mitre Saw & Vertical Copy Router'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'hi'
                      ? 'ट्विन-हेड uPVC थर्मल कॉर्नर वेल्डर और एंड-मिलिंग मशीन'
                      : 'Twin-Head uPVC Thermal Welder & Mullion End-Milling'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Category Filter Bar + Search Input */}
          <div className="mt-8 pt-6 border-t border-[#2C2A26] flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {WORKSHOP_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.key;
                const count =
                  cat.key === 'All'
                    ? workshop.length
                    : workshop.filter((w) => w.category === cat.key).length;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3.5 py-2.5 text-xs font-architectural font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#C2410C] text-white border-[#EA580C]'
                        : 'bg-[#141311] text-[#D6D3CD] border-[#2C2A26] hover:border-[#78716C] hover:text-white'
                    }`}
                  >
                    <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
                    <span className="ml-1.5 font-mono text-[11px] opacity-80 tabular-nums">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'hi'
                    ? 'मशीन, गोदाम, uPVC, मिरर खोजें...'
                    : 'Search CNC, Godown, uPVC, Mirror...'
                }
                className="w-full pl-10 pr-4 py-2.5 bg-[#141311] border border-[#2C2A26] focus:border-[#EA580C] text-xs text-white placeholder-[#78716C] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Workshop Cards Grid — Every Photo with Detailed Description Underneath */}
        {filteredItems.length === 0 ? (
          <div className="border-x border-b border-[#2C2A26] bg-[#1C1917] p-12 text-center">
            <p className="text-sm text-[#A8A29E]">
              {lang === 'hi'
                ? 'इस श्रेणी में कोई वर्कशॉप फोटो नहीं मिला।'
                : 'No workshop photos matched your filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredItems.map((item, idx) => {
              const title = lang === 'hi' ? item.titleHi : item.titleEn;
              const spec =
                lang === 'hi' ? item.machineSpecHi : item.machineSpecEn;
              const desc =
                lang === 'hi' ? item.descriptionHi : item.descriptionEn;
              const waUrl = buildWhatsAppUrl(
                settings.whatsappNumber,
                buildWorkshopWhatsAppMessage(item, lang)
              );

              return (
                <article
                  key={item.id}
                  className="flex flex-col bg-[#1C1917] border border-[#2C2A26] hover:border-[#C2410C] transition-colors group"
                >
                  {/* Top Technical Header Strip */}
                  <div className="px-4 py-2.5 bg-[#141311] border-b border-[#2C2A26] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#FB923C] font-semibold tracking-wider uppercase">
                      {item.bayCode}
                    </span>
                    <span className="text-[#A8A29E] truncate max-w-[200px]">
                      {item.category}
                    </span>
                  </div>

                  {/* High-Resolution Workshop Photograph */}
                  <div
                    onClick={() => setLightboxIndex(idx)}
                    className="relative aspect-[4/3] bg-[#0C0A09] overflow-hidden cursor-pointer border-b border-[#2C2A26]"
                  >
                    <img
                      src={item.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(idx);
                      }}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#141311]/90 hover:bg-[#C2410C] text-white text-[11px] font-mono uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'बड़ा देखें' : 'Inspect'}</span>
                    </button>
                  </div>

                  {/* Detailed Information & Analysis Box Directly Underneath Photo */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Machine / Process Specification Line */}
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FB923C] leading-snug">
                        <Wrench className="w-3.5 h-3.5 shrink-0" />
                        <span>{spec}</span>
                      </div>

                      {/* Photo Title */}
                      <h3 className="mt-2 font-architectural font-bold text-lg text-white leading-snug">
                        {title}
                      </h3>

                      {/* Detailed Photo-Specific Description */}
                      <div className="mt-3 pt-3 border-t border-[#2C2A26]">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#A8A29E] mb-1">
                          {lang === 'hi'
                            ? 'फोटो का विस्तृत विवरण (WORKSHOP DETAILS):'
                            : 'WHAT IS HAPPENING IN THIS PHOTO:'}
                        </div>
                        <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-5 pt-4 border-t border-[#2C2A26] flex items-center justify-between gap-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-architectural font-bold uppercase tracking-wider transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'hi' ? 'व्हाट्सएप पूछताछ' : 'Ask on WhatsApp'}
                        </span>
                      </a>

                      {onSelectWorkshopForQuote && (
                        <button
                          type="button"
                          onClick={() => onSelectWorkshopForQuote(item.titleEn)}
                          className="px-3 py-2 bg-[#292524] hover:bg-[#C2410C] text-[#F6F3EC] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {lang === 'hi' ? 'कोटेशन लें →' : 'Request Quote →'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-Screen Workshop Lightbox Modal with Complete Photo Description */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-5xl w-full bg-[#1C1917] border border-[#44403C] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-5 py-3.5 bg-[#141311] border-b border-[#2C2A26] flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#FB923C] font-bold">
                  {activeLightboxItem.bayCode}
                </span>
                <span className="text-[#57534E]">·</span>
                <span className="text-[#D6D3CD]">
                  {activeLightboxItem.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 text-[#A8A29E] hover:text-white border border-[#2C2A26] hover:border-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image + Navigation */}
            <div className="relative bg-black flex items-center justify-center max-h-[62vh]">
              <img
                src={activeLightboxItem.imageUrl}
                alt={
                  lang === 'hi'
                    ? activeLightboxItem.titleHi
                    : activeLightboxItem.titleEn
                }
                className="max-h-[62vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={handlePrevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#141311]/85 hover:bg-[#C2410C] text-white border border-white/20 cursor-pointer"
                aria-label="Previous Workshop Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#141311]/85 hover:bg-[#C2410C] text-white border border-white/20 cursor-pointer"
                aria-label="Next Workshop Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Description Panel Below Lightbox Image */}
            <div className="p-6 bg-[#1C1917] border-t border-[#2C2A26]">
              <div className="text-xs font-mono text-[#FB923C]">
                {lang === 'hi'
                  ? activeLightboxItem.machineSpecHi
                  : activeLightboxItem.machineSpecEn}
              </div>
              <h3 className="mt-1 font-architectural font-bold text-xl text-white">
                {lang === 'hi'
                  ? activeLightboxItem.titleHi
                  : activeLightboxItem.titleEn}
              </h3>
              <p className="mt-2.5 text-sm text-[#D6D3CD] leading-relaxed">
                {lang === 'hi'
                  ? activeLightboxItem.descriptionHi
                  : activeLightboxItem.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
