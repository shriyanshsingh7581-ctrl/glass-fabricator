import React, { useState, useEffect } from 'react';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  Ruler,
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
      className="py-16 sm:py-24 bg-[#F6F3EC] text-[#141311] border-b border-[#D6CFC2] atelier-grid-light"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6CFC2] bg-[#FDFBF7]">
          {/* Left Column: Consultation Process & Direct Hisar Contact (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 bg-[#141311] text-[#F6F3EC] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2C2A26]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#FB923C] font-semibold">
                <Ruler className="w-4 h-4" />
                <span>
                  {lang === 'hi'
                    ? 'निःशुल्क कोटेशन और साइट माप'
                    : 'SITE MEASUREMENT & QUOTATION DESK'}
                </span>
              </div>

              <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-4xl text-white leading-[1.1]">
                {lang === 'hi'
                  ? 'अपने घर, कोठी या शोरूम के लिए सीधा फैक्ट्री कोटेशन प्राप्त करें'
                  : 'Request Direct Hisar Factory Quotation & Site Measurement'}
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {lang === 'hi'
                  ? 'नीचे अपना विवरण भरें। आपकी पूछताछ तुरंत हमारे एडमिन पैनल (Firebase) में दर्ज हो जाएगी और आप एक क्लिक में व्हाट्सएप पर भी सीधा संदेश भेज सकते हैं।'
                  : 'Submit your project specifications below. Your inquiry is saved in real time to our Admin Desk and prepared for instant WhatsApp consultation.'}
              </p>

              {/* 3-Step Workflow */}
              <div className="mt-8 space-y-4 border-t border-[#2C2A26] pt-6">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-[#FB923C] px-2 py-1 bg-[#1C1917] border border-[#2C2A26]">
                    01
                  </span>
                  <div>
                    <h3 className="font-architectural font-bold text-sm text-white">
                      {lang === 'hi'
                        ? 'आवश्यकता और अनुमानित माप बताएं'
                        : 'Share Window / Glass Requirements'}
                    </h3>
                    <p className="text-xs text-[#A8A29E] mt-0.5">
                      {lang === 'hi'
                        ? 'uPVC, एल्युमीनियम, टफन्ड ग्लास या एलईडी मिरर चुनें।'
                        : 'Select uPVC, Aluminium, Toughened Glass, Slim Profile, or LED Mirrors.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-[#FB923C] px-2 py-1 bg-[#1C1917] border border-[#2C2A26]">
                    02
                  </span>
                  <div>
                    <h3 className="font-architectural font-bold text-sm text-white">
                      {lang === 'hi'
                        ? 'लेजर साइट माप और सैंपल प्रदर्शन'
                        : 'On-Site Laser Measurement Across Haryana'}
                    </h3>
                    <p className="text-xs text-[#A8A29E] mt-0.5">
                      {lang === 'hi'
                        ? 'हमारी टीम आपके शहर/साइट पर आकर सटीक माप लेती है।'
                        : 'Our engineering team visits your site or hosts you at our Hisar showroom.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-[#FB923C] px-2 py-1 bg-[#1C1917] border border-[#2C2A26]">
                    03
                  </span>
                  <div>
                    <h3 className="font-architectural font-bold text-sm text-white">
                      {lang === 'hi'
                        ? 'हिसार CNC वर्कशॉप में निर्माण और इंस्टॉलेशन'
                        : 'CNC Fabrication & Precision Installation'}
                    </h3>
                    <p className="text-xs text-[#A8A29E] mt-0.5">
                      {lang === 'hi'
                        ? 'डबल-हेड CNC और थर्मल वेल्डिंग मशीन पर तैयार होकर समय पर फिटिंग।'
                        : 'Fabricated in our automated Hisar plant and installed on schedule.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2C2A26]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#A8A29E]">
                {lang === 'hi' ? 'सीधा फोन / व्हाट्सएप नंबर' : 'DIRECT HOTLINE'}
              </div>
              <a
                href={`tel:${settings.phoneDisplay.replace(/\s+/g, '')}`}
                className="mt-1 inline-flex items-center gap-2 font-mono font-bold text-xl text-[#FB923C] hover:text-white tabular-nums"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
            {submittedLead ? (
              <div className="border border-[#15803D] bg-[#F0FDF4] p-6 sm:p-8">
                <div className="flex items-center gap-3 text-[#15803D]">
                  <CheckCircle2 className="w-7 h-7 shrink-0" />
                  <h3 className="font-architectural font-bold text-xl">
                    {lang === 'hi'
                      ? 'आपका कोटेशन अनुरोध सफलतापूर्वक दर्ज हो गया है!'
                      : 'Quotation Request Logged Successfully!'}
                  </h3>
                </div>

                <p className="mt-3 text-sm text-[#166534] leading-relaxed">
                  {lang === 'hi'
                    ? `धन्यवाद ${submittedLead.fullName}! आपका विवरण हमारे एडमिन पैनल में सेव हो चुका है। तुरंत बातचीत के लिए नीचे दिए गए बटन से व्हाट्सएप पर भी विवरण भेजें:`
                    : `Thank you, ${submittedLead.fullName}! Your inquiry for "${submittedLead.service}" in ${submittedLead.city} has been saved to our Admin Panel. Click below to also send this directly on WhatsApp:`}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white font-architectural font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {lang === 'hi'
                        ? 'व्हाट्सएप पर तुरंत भेजें'
                        : 'Send Details on WhatsApp Now'}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedLead(null)}
                    className="px-5 py-3.5 bg-white hover:bg-[#F6F3EC] text-[#141311] border border-[#D6CFC2] font-architectural font-bold text-xs uppercase tracking-wider cursor-pointer"
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
                      className="block text-xs font-mono uppercase tracking-wider text-[#44403C] font-semibold mb-2"
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
                          ? 'उदा. राजेश कुमार / आर्किटेक्ट शर्मा'
                          : 'e.g., Rajesh Beniwal'
                      }
                      className="w-full px-4 py-3 bg-white border border-[#D6CFC2] focus:border-[#141311] text-sm text-[#141311] focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-[#DC2626] font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-mono uppercase tracking-wider text-[#44403C] font-semibold mb-2"
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
                      className="w-full px-4 py-3 bg-white border border-[#D6CFC2] focus:border-[#141311] text-sm text-[#141311] focus:outline-none tabular-nums"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#DC2626] font-medium">
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
                      className="block text-xs font-mono uppercase tracking-wider text-[#44403C] font-semibold mb-2"
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
                      className="w-full px-4 py-3 bg-white border border-[#D6CFC2] focus:border-[#141311] text-sm text-[#141311] focus:outline-none"
                    />
                    <datalist id="haryana-cities-list">
                      {HARYANA_CITIES_SUGGESTIONS.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    {errors.city && (
                      <p className="mt-1 text-xs text-[#DC2626] font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label
                      htmlFor="quote-service"
                      className="block text-xs font-mono uppercase tracking-wider text-[#44403C] font-semibold mb-2"
                    >
                      {lang === 'hi'
                        ? 'सेवा / प्रोडक्ट चुनें *'
                        : 'Select Service / Product *'}
                    </label>
                    <select
                      id="quote-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#D6CFC2] focus:border-[#141311] text-sm text-[#141311] focus:outline-none"
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
                      <p className="mt-1 text-xs text-[#DC2626] font-medium">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* Measurements / Project Note */}
                <div>
                  <label
                    htmlFor="quote-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#44403C] font-semibold mb-2"
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
                    className="w-full px-4 py-3 bg-white border border-[#D6CFC2] focus:border-[#141311] text-sm text-[#141311] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#141311] hover:bg-[#C2410C] text-[#FDFBF7] font-architectural font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#15803D] hover:bg-[#166534] text-white font-architectural font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {lang === 'hi'
                        ? 'सीधा व्हाट्सएप पर भेजें'
                        : 'Direct WhatsApp Quote'}
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
