import React, { useState, useEffect } from 'react';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import {
  CustomerInquiry,
  Language,
  ServiceItem,
  SiteSettings,
} from '../types/cms';
import { HARYANA_CITIES_SUGGESTIONS } from '../data/initialData';
import {
  buildInquiryWhatsAppMessage,
  buildWhatsAppUrl,
  validateInquiryForm,
} from '../utils/logic';

interface QuotationFormSectionProps {
  lang: Language;
  services: ServiceItem[];
  settings: SiteSettings;
  preselectedService: string;
  prefilledNote: string;
  onSubmitInquiry: (inquiry: CustomerInquiry) => void;
}

export const QuotationFormSection: React.FC<QuotationFormSectionProps> = ({
  lang,
  services,
  settings,
  preselectedService,
  prefilledNote,
  onSubmitInquiry,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Hisar');
  const [service, setService] = useState(
    preselectedService || services[0]?.titleEn || 'uPVC Windows and Doors'
  );
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedLead, setSubmittedLead] = useState<CustomerInquiry | null>(
    null
  );

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (prefilledNote) {
      setMessage(prefilledNote);
    }
  }, [prefilledNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm(
      { fullName, phone, city, service, message },
      lang
    );

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const now = new Date();
    const formattedDate = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newInquiry: CustomerInquiry = {
      id: `lead-${Date.now()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      service,
      message: message.trim(),
      status: 'New',
      createdAt: formattedDate,
      timestamp: Date.now(),
    };

    onSubmitInquiry(newInquiry);
    setSubmittedLead(newInquiry);
    setFullName('');
    setPhone('');
    setMessage('');
  };

  const submittedWhatsAppUrl = submittedLead
    ? buildWhatsAppUrl(
        settings.whatsappNumber,
        buildInquiryWhatsAppMessage(submittedLead, lang)
      )
    : buildWhatsAppUrl(settings.whatsappNumber);

  return (
    <section
      id="quotation"
      className="py-20 sm:py-28 bg-[#F3F6F8] text-[#263746] border-y border-[#DCE4EA]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Specialist Consultation Container */}
        <div className="rounded-[32px] bg-white border border-[#DCE4EA] architectural-card-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Deep Navy Blue Sidebar (5 Cols) */}
          <div className="lg:col-span-5 p-8 sm:p-11 bg-[#102A43] text-white flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-wide uppercase text-[#16A6A1]">
                {lang === 'hi'
                  ? 'निःशुल्क कोटेशन और साइट माप'
                  : 'Haryana Glass Fabricator Specialist Desk'}
              </p>

              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-white leading-[1.1]">
                {lang === 'hi'
                  ? 'अपने प्रोजेक्ट के लिए सीधा फैक्ट्री कोटेशन बुक करें।'
                  : 'Request factory-direct quotation & site measurement.'}
              </h2>

              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                {lang === 'hi'
                  ? 'अपना विवरण भरें। आपकी पूछताछ तुरंत हमारे क्लाउड डेटाबेस में सेव हो जाएगी और आप एक क्लिक में व्हाट्सएप पर भी सीधा संदेश भेज सकते हैं।'
                  : 'Submit your project specifications below. Your inquiry syncs instantly to our Hisar specialist desk and prepares a direct WhatsApp brief.'}
              </p>

              {/* 3-Step Numbered List */}
              <div className="mt-8 space-y-5 border-t border-white/15 pt-6">
                <div>
                  <div className="text-xs font-bold text-[#16A6A1]">
                    01. {lang === 'hi' ? 'आवश्यकता चुनें' : 'Select Your System'}
                  </div>
                  <p className="text-xs text-white/75 mt-1">
                    {lang === 'hi'
                      ? 'uPVC, एल्युमीनियम, टफन्ड ग्लास, स्लिम पार्टीशन या एलईडी मिरर चुनें।'
                      : 'Choose uPVC, Aluminium, Toughened Glass, Slim Profile, or LED Mirrors.'}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#16A6A1]">
                    02. {lang === 'hi' ? 'लेजर साइट माप' : 'On-Site Laser Measurement'}
                  </div>
                  <p className="text-xs text-white/75 mt-1">
                    {lang === 'hi'
                      ? 'हमारी टीम आपके शहर/साइट पर आकर सटीक माप लेती है।'
                      : 'Our engineering team visits your site anywhere in Haryana.'}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#2997FF]">
                    03. {lang === 'hi' ? 'CNC निर्माण और फिटिंग' : 'CNC Fabrication & Fitting'}
                  </div>
                  <p className="text-xs text-[#A1A1A6] mt-1">
                    {lang === 'hi'
                      ? 'हिसार CNC वर्कशॉप में तैयार होकर समय पर इंस्टॉलेशन।'
                      : 'Precision-built in our Hisar CNC plant and installed on schedule.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-xs text-[#86868B]">
                {lang === 'hi' ? 'सीधा फोन / व्हाट्सएप हॉटलाइन' : 'Direct Specialist Hotline'}
              </div>
              <a
                href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                className="mt-1 inline-flex items-center gap-2 font-bold text-xl text-white hover:text-[#2997FF] transition-colors tabular-nums"
              >
                <PhoneCall className="w-5 h-5 text-[#2997FF]" />
                <span>{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Apple Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-11">
            {submittedLead ? (
              <div className="rounded-2xl bg-[#F5F5F7] p-7 sm:p-9">
                <div className="flex items-center gap-3 text-[#1D1D1F]">
                  <CheckCircle2 className="w-7 h-7 text-[#0071E3] shrink-0" />
                  <h3 className="font-bold text-2xl tracking-[-0.02em]">
                    {lang === 'hi'
                      ? 'आपका कोटेशन अनुरोध दर्ज हो गया है।'
                      : 'Quotation request received.'}
                  </h3>
                </div>

                <p className="mt-3 text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                  {lang === 'hi'
                    ? `धन्यवाद ${submittedLead.fullName}! आपका विवरण सुरक्षित सेव हो चुका है। तुरंत बातचीत के लिए नीचे दिए गए बटन से व्हाट्सएप पर भी विवरण भेजें:`
                    : `Thank you, ${submittedLead.fullName}. Your inquiry for "${submittedLead.service}" in ${submittedLead.city} has been logged. Connect immediately on WhatsApp below:`}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {lang === 'hi'
                        ? 'व्हाट्सएप पर तुरंत भेजें'
                        : 'Send Details on WhatsApp'}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedLead(null)}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#E8E8ED] text-[#1D1D1F] border border-black/10 font-medium text-sm cursor-pointer transition-colors"
                  >
                    {lang === 'hi'
                      ? 'नया फॉर्म भरें'
                      : 'Submit Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="quote-fullname"
                      className="block text-xs font-semibold text-[#1D1D1F] mb-2"
                    >
                      {lang === 'hi' ? 'आपका पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      id="quote-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={
                        lang === 'hi'
                          ? 'उदा. राजेश कुमार'
                          : 'e.g., Rajesh Beniwal'
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.08] focus:border-[#0071E3] focus:bg-white text-sm text-[#1D1D1F] focus:outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-[#E30000] font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-[#1D1D1F] mb-2"
                    >
                      {lang === 'hi'
                        ? 'मोबाइल / व्हाट्सएप नंबर *'
                        : 'Phone / WhatsApp Number *'}
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98120 XXXXX"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.08] focus:border-[#0071E3] focus:bg-white text-sm text-[#1D1D1F] focus:outline-none transition-colors tabular-nums"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-[#E30000] font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* City / Location in Haryana */}
                  <div>
                    <label
                      htmlFor="quote-city"
                      className="block text-xs font-semibold text-[#1D1D1F] mb-2"
                    >
                      {lang === 'hi'
                        ? 'शहर / स्थान (हरियाणा) *'
                        : 'City / Location in Haryana *'}
                    </label>
                    <input
                      id="quote-city"
                      type="text"
                      list="haryana-cities-list"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={
                        lang === 'hi'
                          ? 'हिसार, रोहतक, गुरुग्राम, करनाल...'
                          : 'Hisar, Rohtak, Gurugram, Karnal...'
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.08] focus:border-[#0071E3] focus:bg-white text-sm text-[#1D1D1F] focus:outline-none transition-colors"
                    />
                    <datalist id="haryana-cities-list">
                      {HARYANA_CITIES_SUGGESTIONS.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    {errors.city && (
                      <p className="mt-1.5 text-xs text-[#E30000] font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label
                      htmlFor="quote-service"
                      className="block text-xs font-semibold text-[#1D1D1F] mb-2"
                    >
                      {lang === 'hi'
                        ? 'सेवा / प्रोडक्ट चुनें *'
                        : 'Select Service / Product *'}
                    </label>
                    <select
                      id="quote-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.08] focus:border-[#0071E3] focus:bg-white text-sm text-[#1D1D1F] focus:outline-none transition-colors"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.titleEn}>
                          {lang === 'hi'
                            ? `${s.titleHi} (${s.titleEn})`
                            : s.titleEn}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-[#E30000] font-medium">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* Measurements / Project Note */}
                <div>
                  <label
                    htmlFor="quote-message"
                    className="block text-xs font-semibold text-[#102A43] mb-2"
                  >
                    {lang === 'hi'
                      ? 'अनुमानित माप या प्रोजेक्ट विवरण (वैकल्पिक)'
                      : 'Approximate Measurements or Project Details'}
                  </label>
                  <textarea
                    id="quote-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'hi'
                        ? 'उदा. नई कोठी के लिए 6 खिड़कियां (uPVC 3-ट्रैक), बालकनी के लिए 12mm टफन्ड ग्लास रेलिंग और 2 आर्च एलईडी मिरर...'
                        : 'e.g., Need 6 sets of 3-track uPVC windows with mesh, 16mm slim partition for drawing room, and 2 Arch LED mirrors...'
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#DCE4EA] focus:border-[#16A6A1] focus:ring-1 focus:ring-[#16A6A1] text-sm text-[#263746] focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {lang === 'hi'
                        ? 'कोटेशन अनुरोध सबमिट करें'
                        : 'Submit Quotation Request'}
                    </span>
                  </button>

                  <a
                    href={buildWhatsAppUrl(
                      settings.whatsappNumber,
                      buildInquiryWhatsAppMessage(
                        {
                          fullName: fullName || 'Customer',
                          phone: phone || 'Not provided',
                          city: city || 'Hisar',
                          service,
                          message,
                        },
                        lang
                      )
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F3F6F8] hover:bg-[#DCE4EA] border border-[#DCE4EA] text-[#102A43] font-semibold text-sm transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#16A6A1]" />
                    <span>
                      {lang === 'hi'
                        ? 'सीधा व्हाट्सएप पर भेजें'
                        : 'Get Quotation on WhatsApp'}
                    </span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
