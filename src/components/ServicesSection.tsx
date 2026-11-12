import React from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { Language, ServiceItem, SiteSettings } from '../types/cms';
import {
  buildServiceWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/logic';

interface ServicesSectionProps {
  lang: Language;
  services: ServiceItem[];
  settings: SiteSettings;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  services,
  settings,
  onSelectServiceForQuote,
}) => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#F3F6F8] text-[#263746] border-y border-[#DCE4EA]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A6A1]/10 text-xs sm:text-sm font-bold tracking-wide text-[#16A6A1]">
            {lang === 'hi'
              ? '08 विशेषज्ञ आर्किटेक्चरल वर्टिकल्स'
              : '08 Core Architectural Verticals'}
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#102A43] leading-[1.08]">
            {lang === 'hi' ? (
              <>
                आठ विशेषज्ञ सेवाएं।{' '}
                <span className="text-[#16A6A1]">
                  हिसार की एक अत्याधुनिक फैक्ट्री में।
                </span>
              </>
            ) : (
              <>
                Eight specialized verticals.{' '}
                <span className="text-[#16A6A1]">
                  One Hisar powerhouse.
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#263746]/80 leading-relaxed">
            {lang === 'hi'
              ? 'एल्युमीनियम और uPVC विंडो से लेकर ISI टफन्ड ग्लास, स्लिम पार्टीशन और आर्च एलईडी मिरर तक — हर सिस्टम हमारी अपनी वर्कशॉप में कस्टम तैयार किया जाता है।'
              : 'From precision Aluminium and uPVC window systems to ISI toughened glass, slim partitions, and custom LED mirrors—engineered in-house and installed across Haryana.'}
          </p>
        </div>

        {/* Apple Bento Grid of 8 Core Services */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const title = lang === 'hi' ? service.titleHi : service.titleEn;
            const desc =
              lang === 'hi' ? service.descriptionHi : service.descriptionEn;
            const specs = lang === 'hi' ? service.specsHi : service.specsEn;
            const num = service.number || String(idx + 1).padStart(2, '0');

            const waMessage = buildServiceWhatsAppMessage(service, lang);
            const waUrl = buildWhatsAppUrl(settings.whatsappNumber, waMessage);

            return (
              <article
                key={service.id}
                className="rounded-[28px] bg-white border border-[#DCE4EA] overflow-hidden flex flex-col justify-between architectural-card-shadow architectural-card-hover group"
              >
                <div>
                  {/* Clean Card Top Copy */}
                  <div className="p-6 sm:p-7 pb-4">
                    <div className="text-xs font-semibold text-[#16A6A1] flex items-center gap-1.5">
                      <span className="tabular-nums">{num}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{specs}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-[#102A43] leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-[#263746]/80 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Clean Media Frame */}
                  <div className="px-4">
                    <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#F3F6F8] border border-[#DCE4EA]">
                      <img
                        src={service.imageUrl}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Minimal Action Bar with Glass Teal Buttons */}
                <div className="p-6 sm:p-7 pt-5 flex items-center justify-between gap-3 border-t border-[#DCE4EA]/60">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.titleEn)}
                    className="inline-flex items-center gap-0.5 text-sm font-semibold text-[#102A43] hover:text-[#16A6A1] cursor-pointer whitespace-nowrap transition-colors"
                  >
                    <span>{lang === 'hi' ? 'कोटेशन लें' : 'Book Quote'}</span>
                    <ChevronRight className="w-4 h-4 text-[#16A6A1]" />
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white text-xs font-semibold transition-colors whitespace-nowrap shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
