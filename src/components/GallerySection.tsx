import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section id="gallery" className="py-20 sm:py-28 bg-white text-[#1D1D1F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Apple Two-Tone Header */}
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0071E3]">
            {lang === 'hi'
              ? 'प्रोजेक्ट और शोरूम पोर्टफोलियो · हिसार व हरियाणा'
              : 'Shot in Hisar & Across Haryana · Architectural Portfolio'}
          </p>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#1D1D1F] leading-[1.08]">
            {lang === 'hi' ? (
              <>
                हमारे प्रमुख प्रोजेक्ट।{' '}
                <span className="text-[#86868B]">
                  हिसार और पूरे हरियाणा में स्थापित।
                </span>
              </>
            ) : (
              <>
                Completed elevations.{' '}
                <span className="text-[#86868B]">
                  Crafted for homes and showrooms.
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6E73]">
            {lang === 'hi'
              ? 'किसी भी फोटो पर क्लिक करके उसे फुल-स्क्रीन में ज़ूम करके देखें।'
              : 'Select any photograph to inspect full-resolution architectural detailing.'}
          </p>
        </div>

        {/* Apple Bento Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, idx) => {
            const title = lang === 'hi' ? item.titleHi : item.titleEn;
            const city = lang === 'hi' ? item.cityHi : item.cityEn;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className="text-left rounded-[28px] bg-[#F5F5F7] overflow-hidden flex flex-col justify-between cursor-pointer apple-card-hover group focus:outline-none"
              >
                <div className="p-3 pb-0 w-full">
                  <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-black">
                    <img
                      src={item.imageUrl}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6 w-full">
                  <div className="text-xs font-medium text-[#86868B] flex items-center gap-1.5">
                    <span className="text-[#0071E3] font-semibold">
                      {item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{city}</span>
                  </div>
                  <h3 className="mt-1.5 font-bold text-base sm:text-lg tracking-[-0.015em] text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                    {title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Apple-Style Modal Lightbox */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="max-w-4xl w-full rounded-[28px] bg-[#161617] border border-white/10 text-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="text-xs font-medium text-[#86868B] flex items-center gap-1.5">
                <span className="text-[#2997FF] font-semibold">
                  {currentItem.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {lang === 'hi' ? currentItem.cityHi : currentItem.cityEn}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                aria-label="Close Lightbox"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative bg-black flex items-center justify-center max-h-[68vh]">
              <img
                src={currentItem.imageUrl}
                alt={lang === 'hi' ? currentItem.titleHi : currentItem.titleEn}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-white">
                {lang === 'hi' ? currentItem.titleHi : currentItem.titleEn}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
