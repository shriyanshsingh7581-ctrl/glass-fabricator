import React from 'react';
import {
  DoorOpen,
  Columns3,
  Wrench,
  ShieldCheck,
  LayoutGrid,
  Building2,
  Sparkles,
  Maximize2,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';
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

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  DoorOpen,
  Columns3,
  Wrench,
  ShieldCheck,
  LayoutGrid,
  Building2,
  Sparkles,
  Maximize2,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  services,
  settings,
  onSelectServiceForQuote,
}) => {
  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#F6F3EC] text-[#141311] border-b border-[#D6CFC2] atelier-grid-light"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Editorial Header */}
        <div className="border border-[#D6CFC2] bg-[#FDFBF7] p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#C2410C] font-semibold">
                {lang === 'hi'
                  ? '08 मुख्य आर्किटेक्चरल सेवाएं · इन-हाउस फैब्रिकेशन और साइट इंस्टॉलेशन'
                  : '08 ARCHITECTURAL VERTICALS · IN-HOUSE FABRICATION & SITE INSTALLATION'}
              </div>
              <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-5xl text-[#141311] leading-[1.08]">
                {lang === 'hi'
                  ? 'हमारी 8 विशेषज्ञ ग्लास, uPVC और एल्युमीनियम सेवाएं'
                  : 'Eight Core Fenestration & Glass Fabrication Verticals'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#57534E] max-w-xl leading-relaxed">
              {lang === 'hi'
                ? 'हर प्रोजेक्ट को हमारी हिसार वर्कशॉप में कस्टम माप के अनुसार तैयार किया जाता है और अनुभवी टीम द्वारा पूरे हरियाणा में साइट पर फिट किया जाता है।'
                : 'Every frame and glass panel is custom-engineered at our Nirankari Bhawan Road plant in Hisar and installed across Haryana by our specialist crew.'}
            </p>
          </div>
        </div>

        {/* 8 Core Services Architectural Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-x border-b border-[#D6CFC2] bg-[#D6CFC2] gap-px">
          {services.map((service, idx) => {
            const IconComponent = ICON_MAP[service.iconName] || LayersFallback;
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
                className="bg-[#FDFBF7] hover:bg-white flex flex-col justify-between transition-colors group"
              >
                <div>
                  {/* Service Photograph + Index Stamp */}
                  <div className="relative h-48 overflow-hidden bg-[#1C1917] border-b border-[#D6CFC2]">
                    <img
                      src={service.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-[#141311]/90 text-[#FDFBF7] font-mono text-xs font-bold tabular-nums">
                        VERTICAL · {num}
                      </span>
                      <div className="w-8 h-8 bg-[#FDFBF7] text-[#C2410C] flex items-center justify-center border border-[#D6CFC2]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[11px] font-mono text-[#FDE68A] truncate">
                        {specs}
                      </div>
                    </div>
                  </div>

                  {/* Copy Block */}
                  <div className="p-6">
                    <h3 className="font-architectural font-bold text-lg text-[#141311] group-hover:text-[#C2410C] transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-[#ECE7DC] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.titleEn)}
                    className="inline-flex items-center gap-1 text-xs font-architectural font-bold uppercase tracking-wider text-[#141311] hover:text-[#C2410C] transition-colors cursor-pointer"
                  >
                    <span>{lang === 'hi' ? 'कोटेशन बुक करें' : 'Book Quote'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white text-[11px] font-architectural font-bold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'व्हाट्सएप' : 'Inquire'}</span>
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

function LayersFallback({ className }: { className?: string }) {
  return <LayoutGrid className={className} />;
}
