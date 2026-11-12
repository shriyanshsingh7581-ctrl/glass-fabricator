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
      className="py-20 sm:py-28 bg-[#F5F5F7] text-[#1D1D1F]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Apple Two-Tone Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0071E3]">
            {lang === 'hi'
              ? '08 विशेषज्ञ आर्किटेक्चरल वर्टिकल्स'
              : '08 Core Architectural Verticals'}
          </p>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#1D1D1F] leading-[1.08]">
            {lang === 'hi' ? (
              <>
                आठ विशेषज्ञ सेवाएं।{' '}
                <span className="text-[#86868B]">
                  हिसार की एक अत्याधुनिक फैक्ट्री में।
                </span>
              </>
            ) : (
              <>
                Eight specialized verticals.{' '}
                <span className="text-[#86868B]">
                  One Hisar powerhouse.
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
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
                className="rounded-[28px] bg-white overflow-hidden flex flex-col justify-between apple-card-shadow apple-card-hover group"
              >
                <div>
                  {/* Clean Apple Card Top Copy */}
                  <div className="p-6 sm:p-7 pb-4">
                    <div className="text-xs font-medium text-[#86868B] flex items-center gap-1.5">
                      <span className="tabular-nums">{num}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{specs}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-[#1D1D1F] leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6E6E73] leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Clean Apple Rounded Media Frame */}
                  <div className="px-4">
                    <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#F5F5F7]">
                      <img
                        src={service.imageUrl}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Apple Minimal Action Bar */}
                <div className="p-6 sm:p-7 pt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.titleEn)}
                    className="inline-flex items-center gap-0.5 text-sm font-medium text-[#0066CC] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    <span>{lang === 'hi' ? 'कोटेशन लें' : 'Book Quote'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-xs font-medium transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
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
