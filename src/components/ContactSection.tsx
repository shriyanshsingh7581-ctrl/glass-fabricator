import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ChevronRight,
  Compass,
  ExternalLink,
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
      ? 'नमस्ते हरियाणा ग्लास फैब्रिकेटर, मुझे आपके हिसार शोरूम/वर्कशॉप (4PVM+FMV, निरंकारी भवन रोड, हिसार 125001) की लोकेशन और कोटेशन जानकारी चाहिए।'
      : 'Hello Haryana Glass Fabricator, I would like to visit your Hisar showroom (4PVM+FMV, Nirankari Bhawan Rd, Bank Colony, Urban Estate II, Hisar 125001) / discuss a project.'
  );

  const googleShareUrl =
    settings.googleBusinessShareUrl || 'https://share.google/l7dnUDTVvbTdwgCST';
  const googlePlaceUrl =
    settings.googleMapsPlaceUrl ||
    'https://www.google.com/maps/place/Haryana+Glass+Fabricator/@29.1436379,75.7343497,17z/data=!3m1!4b1!4m6!3m5!1s0x3912333c5559a69f:0xe48bc9649e717952!8m2!3d29.1436379!4d75.7343497!16s%2Fg%2F11ycgk8t81';
  const plusCode =
    settings.googlePlusCode ||
    '4PVM+FMV, Bank Colony, Urban Estate II, Hisar, Haryana 125001';
  const coordinates =
    settings.googleCoordinates || '29.1436379° N, 75.7343497° E';
  const hours =
    lang === 'hi'
      ? settings.openingHoursHi ||
        'प्रतिदिन खुला: सुबह 9:00 बजे से शाम 7:00 बजे तक'
      : settings.openingHoursEn || 'Open Daily: 9:00 AM – 7:00 PM';
  const ownerNote =
    lang === 'hi'
      ? settings.ownerNoteHi ||
        'हमारी वर्कशॉप की एक झलक! यहाँ कुशल कारीगरी, उच्च गुणवत्ता की सामग्री और बारीकियों पर विशेष ध्यान देकर आपके विचारों को आकार दिया जाता है।'
      : settings.ownerNoteEn ||
        'A glimpse of our workshop! This is where ideas take shape through skilled workmanship, quality materials and attention to detail.';

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white text-[#263746]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Store Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A6A1]/10 text-xs sm:text-sm font-bold tracking-wide text-[#16A6A1]">
              {lang === 'hi'
                ? 'वेरिफाइड गूगल बिज़नेस लोकेशन · 4PVM+FMV, हिसार 125001'
                : 'Verified Google Business Profile · 4PVM+FMV, Hisar 125001'}
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#102A43] leading-[1.08]">
              {lang === 'hi' ? (
                <>
                  हरियाणा ग्लास फैब्रिकेटर।{' '}
                  <span className="text-[#16A6A1]">
                    निरंकारी भवन रोड, बैंक कॉलोनी, अर्बन एस्टेट II, हिसार।
                  </span>
                </>
              ) : (
                <>
                  Visit Haryana Glass Fabricator.{' '}
                  <span className="text-[#16A6A1]">
                    Nirankari Bhawan Rd, Bank Colony, Urban Estate II, Hisar.
                  </span>
                </>
              )}
            </h2>
          </div>

          <a
            href={googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F3F6F8] hover:bg-[#DCE4EA] border border-[#DCE4EA] text-[#102A43] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {lang === 'hi'
                ? 'गूगल बिज़नेस प्रोफाइल देखें'
                : 'View Official Google Profile'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#16A6A1]" />
          </a>
        </div>

        {/* Showcase Card */}
        <div className="mt-10 rounded-[32px] bg-[#F3F6F8] border border-[#DCE4EA] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch architectural-card-shadow">
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Verified Google Address & Plus Code */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#DCE4EA] text-[#16A6A1] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#16A6A1]">
                    {lang === 'hi'
                      ? 'गूगल मैप्स पता (Glass & Mirror Shop · हरियाणा ग्लास)'
                      : 'Google Maps Address (Glass & Mirror Shop · हरियाणा ग्लास)'}
                  </div>
                  <p className="mt-1 font-bold text-sm sm:text-base text-[#102A43] leading-snug">
                    {lang === 'hi' ? settings.addressHi : settings.addressEn}
                  </p>
                  <p className="mt-1 text-xs text-[#263746]/80 font-medium">
                    {lang === 'hi' ? settings.coverageHi : settings.coverageEn}
                  </p>
                </div>
              </div>

              {/* Google Plus Code & Exact GPS Coordinates */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#DCE4EA] text-[#16A6A1] flex items-center justify-center shrink-0 shadow-xs">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#16A6A1]">
                    {lang === 'hi'
                      ? 'गूगल प्लस कोड और सटीक GPS लोकेशन'
                      : 'Google Plus Code & Exact GPS Coordinates'}
                  </div>
                  <p className="mt-1 font-bold text-sm text-[#102A43] tabular-nums">
                    {plusCode}
                  </p>
                  <p className="mt-0.5 text-xs text-[#263746]/70 font-mono tabular-nums">
                    GPS: {coordinates}
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#DCE4EA] text-[#16A6A1] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#16A6A1]">
                    {lang === 'hi'
                      ? 'आधिकारिक कॉल और व्हाट्सएप'
                      : 'Official Calling & WhatsApp'}
                  </div>
                  <a
                    href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                    className="mt-1 block font-bold text-xl text-[#102A43] hover:text-[#16A6A1] transition-colors tabular-nums"
                  >
                    {settings.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Google Business Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#DCE4EA] text-[#16A6A1] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#16A6A1]">
                    {lang === 'hi'
                      ? 'गूगल शोरूम और वर्कशॉप समय'
                      : 'Store & Workshop Hours (Google Verified)'}
                  </div>
                  <p className="mt-1 font-bold text-sm text-[#102A43]">
                    {hours}
                  </p>
                </div>
              </div>

              {/* Official Note From the Owner on Google Business Profile */}
              <div className="rounded-2xl bg-white p-4 border border-[#DCE4EA]">
                <div className="text-[11px] font-bold text-[#16A6A1] uppercase tracking-wider">
                  {lang === 'hi'
                    ? 'ओनर का संदेश (Google Business Profile)'
                    : 'From the Owner · Google Business Profile'}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-[#263746] leading-relaxed italic">
                  "{ownerNote}"
                </p>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-[#DCE4EA] flex flex-wrap items-center gap-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Quotation on WhatsApp</span>
              </a>

              <a
                href={googlePlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#102A43] hover:bg-[#0C2237] text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-xs"
              >
                <MapPin className="w-4 h-4 text-[#16A6A1]" />
                <span>{lang === 'hi' ? 'गूगल मैप्स डायरेक्शन' : 'Get Directions'}</span>
              </a>

              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white hover:bg-[#DCE4EA] border border-[#DCE4EA] text-[#102A43] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 text-[#E1306C]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>{settings.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Right Map Column (7 Cols) */}
          <div className="lg:col-span-7 p-3 sm:p-4 flex flex-col">
            <div className="rounded-[24px] overflow-hidden bg-white flex-1 flex flex-col border border-black/[0.06]">
              <div className="px-5 py-3 bg-white border-b border-black/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-[#1D1D1F] truncate">
                    4PVM+FMV, Nirankari Bhawan Rd, Bank Colony, Urban Estate II, Hisar 125001
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={googleShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[#0066CC] hover:underline font-medium"
                  >
                    <span>share.google</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={googlePlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[#0066CC] hover:underline font-medium"
                  >
                    <span>{lang === 'hi' ? 'मैप्स में खोलें' : 'Open in Maps'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="w-full h-[420px] lg:h-full min-h-[420px]">
                <iframe
                  title="Haryana Glass Fabricator — 4PVM+FMV, Nirankari Bhawan Rd, Bank Colony, Urban Estate II, Hisar, Haryana 125001"
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
