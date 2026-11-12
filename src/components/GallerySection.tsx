import React, { useState } from 'react';
import { MapPin, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem, Language, SiteSettings } from '../types/cms';

interface GallerySectionProps {
  lang: Language;
  gallery: GalleryItem[];
  settings: SiteSettings;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  lang,
  gallery,
}) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const handlePrev = () => {
    if (lightboxIdx === null || gallery.length === 0) return;
    setLightboxIdx((lightboxIdx - 1 + gallery.length) % gallery.length);
  };

  const handleNext = () => {
    if (lightboxIdx === null || gallery.length === 0) return;
    setLightboxIdx((lightboxIdx + 1) % gallery.length);
  };

  const currentItem = lightboxIdx !== null ? gallery[lightboxIdx] : null;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 bg-[#FDFBF7] text-[#141311] border-b border-[#D6CFC2]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="border border-[#D6CFC2] bg-[#F6F3EC] p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#C2410C] font-semibold">
                {lang === 'hi'
                  ? 'प्रोजेक्ट और शोरूम पोर्टफोलियो · हिसार व संपूर्ण हरियाणा'
                  : 'ARCHITECTURAL PORTFOLIO · HISAR & PAN-HARYANA INSTALLATIONS'}
              </div>
              <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-5xl text-[#141311] leading-[1.08]">
                {lang === 'hi'
                  ? 'हमारे प्रमुख प्रोजेक्ट और शोरूम झलकियां'
                  : 'Completed Architectural Elevations & Showroom Highlights'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#57534E] max-w-xl">
              {lang === 'hi'
                ? 'किसी भी फोटो पर क्लिक करके उसे फुल-स्क्रीन में ज़ूम करके देखें।'
                : 'Click any photograph to inspect full-resolution architectural detailing.'}
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-x border-b border-[#D6CFC2] bg-[#D6CFC2] gap-px">
          {gallery.map((item, idx) => {
            const title = lang === 'hi' ? item.titleHi : item.titleEn;
            const city = lang === 'hi' ? item.cityHi : item.cityEn;

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className="bg-[#FDFBF7] hover:bg-white flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1917] border-b border-[#D6CFC2]">
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#141311]/85 text-white font-mono text-[11px] uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#FDFBF7] text-[#141311] font-mono text-[11px] inline-flex items-center gap-1 border border-[#D6CFC2]">
                    <ZoomIn className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>{lang === 'hi' ? 'ज़ूम' : 'Zoom'}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#C2410C]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{city}</span>
                  </div>
                  <h3 className="mt-1.5 font-architectural font-bold text-base sm:text-lg text-[#141311] group-hover:text-[#C2410C] transition-colors">
                    {title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#1C1917] border border-[#44403C] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 border-b border-[#2C2A26] flex items-center justify-between">
              <span className="text-xs font-mono text-[#FB923C]">
                {currentItem.category} ·{' '}
                {lang === 'hi' ? currentItem.cityHi : currentItem.cityEn}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="p-1 text-[#A8A29E] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative bg-black flex items-center justify-center max-h-[68vh]">
              <img
                src={currentItem.imageUrl}
                alt={lang === 'hi' ? currentItem.titleHi : currentItem.titleEn}
                className="max-h-[68vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#141311]/85 hover:bg-[#C2410C] text-white border border-white/20 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#141311]/85 hover:bg-[#C2410C] text-white border border-white/20 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-architectural font-bold text-lg">
                {lang === 'hi' ? currentItem.titleHi : currentItem.titleEn}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
