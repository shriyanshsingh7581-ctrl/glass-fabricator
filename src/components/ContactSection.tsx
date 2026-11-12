import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';
import { buildWhatsAppUrl } from '../utils/logic';

interface ContactSectionProps {
  lang: Language;
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  settings,
}) => {
  const waUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते हरियाणा विंडो मार्ट, मुझे आपके हिसार शोरूम/वर्कशॉप की लोकेशन और कोटेशन जानकारी चाहिए।'
      : 'Hello Haryana Window Mart, I would like to visit your Hisar showroom / discuss a project.'
  );

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white text-[#1D1D1F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Apple Retail Store Header */}
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0071E3]">
            {lang === 'hi'
              ? 'हिसार फ्लैगशिप स्टूडियो और ग्लास गोदाम'
              : 'Hisar Flagship Studio, CNC Plant & Glass Godown'}
          </p>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#1D1D1F] leading-[1.08]">
            {lang === 'hi' ? (
              <>
                हमारे हिसार शोरूम में पधारें।{' '}
                <span className="text-[#86868B]">
                  निरंकारी भवन रोड, हिसार।
                </span>
              </>
            ) : (
              <>
                Visit Haryana Window Mart.{' '}
                <span className="text-[#86868B]">
                  Nirankari Bhawan Road, Hisar.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Apple Store Showcase Card */}
        <div className="mt-12 rounded-[32px] bg-[#F5F5F7] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 p-8 sm:p-11 flex flex-col justify-between">
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#0071E3] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#86868B]">
                    {lang === 'hi'
                      ? 'मुख्य शोरूम और वर्कशॉप पता'
                      : 'Showroom & CNC Plant Address'}
                  </div>
                  <p className="mt-1 font-semibold text-base text-[#1D1D1F]">
                    {lang === 'hi' ? settings.addressHi : settings.addressEn}
                  </p>
                  <p className="mt-1 text-xs text-[#0071E3] font-medium">
                    {lang === 'hi' ? settings.coverageHi : settings.coverageEn}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#0071E3] flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#86868B]">
                    {lang === 'hi'
                      ? 'आधिकारिक कॉल और व्हाट्सएप'
                      : 'Official Calling & WhatsApp'}
                  </div>
                  <a
                    href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                    className="mt-1 block font-bold text-xl text-[#1D1D1F] hover:text-[#0071E3] transition-colors tabular-nums"
                  >
                    {settings.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#0071E3] flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#86868B]">
                    {lang === 'hi' ? 'कार्य समय' : 'Store & Workshop Hours'}
                  </div>
                  <p className="mt-1 font-medium text-sm text-[#1D1D1F]">
                    {lang === 'hi'
                      ? 'सोमवार – शनिवार: सुबह 9:00 से शाम 8:00 बजे तक'
                      : 'Monday – Saturday: 9:00 AM to 8:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.08] flex flex-wrap items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-[#E8E8ED] text-[#1D1D1F] font-medium text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>{settings.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Right Map Column (7 Cols) */}
          <div className="lg:col-span-7 p-3 sm:p-4 flex flex-col">
            <div className="rounded-[24px] overflow-hidden bg-white flex-1 flex flex-col border border-black/[0.06]">
              <div className="px-5 py-3 bg-white border-b border-black/[0.06] flex items-center justify-between text-xs">
                <span className="font-medium text-[#6E6E73] truncate">
                  {lang === 'hi'
                    ? 'निरंकारी भवन रोड, बैंक कॉलोनी टी-पॉइंट के सामने, हिसार'
                    : 'Nirankari Bhawan Road, Opp. Bank Colony T-Point, Hisar'}
                </span>
                <a
                  href="https://maps.google.com/?q=Nirankari+Bhawan+Road+Bank+Colony+Hisar+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-[#0066CC] hover:underline font-medium shrink-0"
                >
                  <span>{lang === 'hi' ? 'मैप्स में खोलें' : 'Open in Maps'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="w-full h-[360px] lg:h-full min-h-[360px]">
                <iframe
                  title="Haryana Window Mart Hisar Location"
                  src={settings.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
