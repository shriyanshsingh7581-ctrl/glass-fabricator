import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  Navigation,
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
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#FDFBF7] text-[#141311] border-b border-[#D6CFC2]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6CFC2] bg-[#F6F3EC]">
          {/* Left Column: Address, Hours & Direct Links (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D6CFC2]">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#C2410C] font-semibold">
                {lang === 'hi'
                  ? 'हिसार हेडक्वार्टर, शोरूम और ग्लास गोदाम'
                  : 'HISAR HEADQUARTERS, SHOWROOM & GLASS GODOWN'}
              </div>

              <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-4xl text-[#141311] leading-[1.1]">
                {lang === 'hi'
                  ? 'हमारे हिसार शोरूम और वर्कशॉप में पधारें'
                  : 'Visit Our Showroom & CNC Fabrication Plant in Hisar'}
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#141311] text-[#FDFBF7] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FB923C]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
                      {lang === 'hi'
                        ? 'मुख्य शोरूम और वर्कशॉप पता'
                        : 'SHOWROOM & PLANT ADDRESS'}
                    </div>
                    <p className="mt-1 font-architectural font-bold text-base text-[#141311]">
                      {lang === 'hi' ? settings.addressHi : settings.addressEn}
                    </p>
                    <p className="mt-1 text-xs text-[#C2410C] font-medium">
                      {lang === 'hi'
                        ? settings.coverageHi
                        : settings.coverageEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#141311] text-[#FDFBF7] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#FB923C]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
                      {lang === 'hi'
                        ? 'आधिकारिक कॉल और व्हाट्सएप'
                        : 'OFFICIAL CALLING & WHATSAPP'}
                    </div>
                    <a
                      href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                      className="mt-1 block font-mono font-bold text-xl text-[#141311] hover:text-[#C2410C] tabular-nums"
                    >
                      {settings.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#141311] text-[#FDFBF7] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FB923C]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
                      {lang === 'hi' ? 'कार्य समय' : 'WORKING HOURS'}
                    </div>
                    <p className="mt-1 font-architectural font-semibold text-sm text-[#141311]">
                      {lang === 'hi'
                        ? 'सोमवार – शनिवार: सुबह 9:00 से शाम 8:00 बजे तक'
                        : 'Monday – Saturday: 9:00 AM to 8:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D6CFC2] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-[#15803D] hover:bg-[#166534] text-white font-architectural font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-[#141311] hover:bg-[#C2410C] text-white font-architectural font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>{settings.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Google Map of Nirankari Bhawan Road, Hisar (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white">
            <div className="px-6 py-3.5 bg-[#141311] text-[#F6F3EC] flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-[#FB923C]" />
                {lang === 'hi'
                  ? 'निरंकारी भवन रोड, बैंक कॉलोनी टी-पॉइंट के सामने, हिसार'
                  : 'NIRANKARI BHAWAN ROAD, OPP. BANK COLONY T-POINT, HISAR'}
              </span>
              <a
                href="https://maps.google.com/?q=Nirankari+Bhawan+Road+Bank+Colony+Hisar+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FB923C] hover:text-white underline"
              >
                {lang === 'hi' ? 'गूगल मैप्स में खोलें ↗' : 'Open Maps ↗'}
              </a>
            </div>

            <div className="w-full h-[380px] lg:h-full min-h-[380px]">
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
    </section>
  );
};
