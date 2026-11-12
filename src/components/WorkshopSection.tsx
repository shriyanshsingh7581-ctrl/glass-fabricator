import React, { useState } from 'react';
import {
  Search,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
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
    <section id="workshop" className="py-20 sm:py-28 bg-[#0C2237] text-white border-t border-[#102A43]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Pro Manufacturing Header */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#16A6A1]/20 text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#16A6A1]">
            {lang === 'hi'
              ? 'वर्कशॉप और मशीनरी · हिसार मैन्युफैक्चरिंग प्लांट'
              : 'PRO MANUFACTURING PLANT · NIRANKARI BHAWAN ROAD, HISAR'}
          </p>

          <h2 className="mt-4 text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.032em] leading-[1.06] text-white">
            {lang === 'hi' ? (
              <>
                <span>हमारी वर्कशॉप और ग्लास गोदाम।</span>{' '}
                <span className="text-[#16A6A1]">
                  29 असली फोटोज़ और पूरी जानकारी।
                </span>
              </>
            ) : (
              <>
                <span>Inside our Hisar Workshop.</span>{' '}
                <span className="text-[#16A6A1]">
                  Powerhouse CNC machinery.
                </span>
              </>
            )}
          </h2>

          <p className="mt-5 text-sm sm:text-lg text-white/80 leading-relaxed">
            {lang === 'hi'
              ? 'हमारी 3-मंजिला मुख्य बिल्डिंग, हरियाणा ग्लास गोदाम, डबल-हेड CNC प्रोफाइल कटिंग मशीन, ट्विन-हेड uPVC थर्मल वेल्डिंग लाइन, कॉपी राउटर, ग्रीन-फेल्ट ग्लेजिंग टेबल और एलईडी मिरर शोरूम के हर फोटो के नीचे उसका पूरा विवरण पढ़ें।'
              : 'Every photograph below is captured inside our Hisar headquarters, bulk float-glass godown, automated CNC cutting and thermal welding bays, and LED mirror studio — with detailed process descriptions underneath each photo.'}
          </p>

          {/* Official Google Business Profile Owner Workshop Note */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 py-3 rounded-2xl bg-[#102A43] border border-white/15 text-xs sm:text-sm text-white">
            <span className="text-[#16A6A1] font-bold shrink-0">
              {lang === 'hi' ? 'ओनर का संदेश (Google):' : 'From the Owner (Google):'}
            </span>
            <span className="italic text-white/85">
              "
              {lang === 'hi'
                ? settings.ownerNoteHi ||
                  'हमारी वर्कशॉप की एक झलक! यहाँ कुशल कारीगरी, उच्च गुणवत्ता की सामग्री और बारीकियों पर विशेष ध्यान देकर आपके विचारों को आकार दिया जाता है।'
                : settings.ownerNoteEn ||
                  'A glimpse of our workshop! This is where ideas take shape through skilled workmanship, quality materials and attention to detail.'}
              "
            </span>
          </div>
        </div>

        {/* Segmented Filter Bar + Search */}
        <div className="mt-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#102A43] p-3 rounded-[24px] border border-white/15">
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#16A6A1] text-white shadow-xs'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
                  <span className="ml-1.5 opacity-80 tabular-nums">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[250px]">
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'hi'
                  ? 'मशीन, गोदाम, uPVC, मिरर खोजें...'
                  : 'Search CNC, Godown, uPVC, Mirror...'
              }
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0C2237] border border-white/20 focus:border-[#16A6A1] text-xs text-white placeholder-white/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Bento Grid of All 29 Workshop Photos + Detailed Descriptions Below Each Photo */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-[28px] bg-[#102A43] p-12 text-center border border-white/15">
            <p className="text-sm text-white/70">
              {lang === 'hi'
                ? 'इस श्रेणी में कोई वर्कशॉप फोटो नहीं मिला।'
                : 'No workshop photos matched your filter.'}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="rounded-[28px] bg-[#102A43] border border-white/15 overflow-hidden flex flex-col justify-between group hover:border-[#16A6A1] transition-colors shadow-lg"
                >
                  <div>
                    {/* High-Resolution Workshop Photograph */}
                    <div
                      onClick={() => setLightboxIndex(idx)}
                      className="relative aspect-[4/3] bg-[#0C2237] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-transparent to-black/30 opacity-70" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-medium">
                        <span className="text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 font-semibold text-[#16A6A1]">
                          {item.bayCode} · {item.category}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(idx);
                          }}
                          className="p-2 rounded-lg bg-black/70 hover:bg-[#16A6A1] text-white backdrop-blur-md border border-white/20 transition-colors cursor-pointer"
                          aria-label="Zoom Workshop Photo"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Detailed Information Box Directly Underneath the Photo */}
                    <div className="p-6 sm:p-7">
                      <p className="text-xs font-bold text-[#16A6A1] leading-snug uppercase tracking-wide">
                        {spec}
                      </p>

                      <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-[-0.015em] text-white leading-snug">
                        {title}
                      </h3>

                      <div className="mt-3.5 pt-3.5 border-t border-white/15">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                          {lang === 'hi'
                            ? 'फोटो का विस्तृत विवरण:'
                            : 'Workshop Process & Equipment Details:'}
                        </div>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions with Glass Teal CTA */}
                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>
                        {lang === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Ask on WhatsApp'}
                      </span>
                    </a>

                    {onSelectWorkshopForQuote && (
                      <button
                        type="button"
                        onClick={() => onSelectWorkshopForQuote(item.titleEn)}
                        className="text-xs text-white/70 hover:text-white font-medium cursor-pointer"
                      >
                        {lang === 'hi' ? '+ कोटेशन में जोड़ें' : '+ Add to Quote'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Apple-Style Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-5xl w-full rounded-[28px] bg-[#161617] border border-white/15 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="text-xs font-medium text-[#A1A1A6]">
                <span className="text-[#2997FF] font-semibold">
                  {activeLightboxItem.bayCode}
                </span>{' '}
                · {activeLightboxItem.category}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 bg-[#161617] border-t border-white/10">
              <div className="text-xs font-semibold text-[#2997FF]">
                {lang === 'hi'
                  ? activeLightboxItem.machineSpecHi
                  : activeLightboxItem.machineSpecEn}
              </div>
              <h3 className="mt-1 text-xl font-bold text-white">
                {lang === 'hi'
                  ? activeLightboxItem.titleHi
                  : activeLightboxItem.titleEn}
              </h3>
              <p className="mt-2.5 text-sm text-[#A1A1A6] leading-relaxed">
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
