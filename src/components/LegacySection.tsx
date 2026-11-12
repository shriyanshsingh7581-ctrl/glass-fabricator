import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';

interface LegacySectionProps {
  lang: Language;
  settings: SiteSettings;
}

export const LegacySection: React.FC<LegacySectionProps> = ({ lang }) => {
  const milestones = [
    {
      year: '1990',
      titleEn: '1st Generation Foundation in Hisar.',
      titleHi: 'हिसार में पहली पीढ़ी द्वारा नींव (1990)।',
      descEn:
        'Started custom architectural glass cutting, bevelling, and aluminium fabrication in Hisar with an uncompromising commitment to honest gauge and precision fitting.',
      descHi:
        'ईमानदार गेज, असली ग्लास और सटीक फिटिंग के संकल्प के साथ हिसार में ग्लास कटिंग और एल्युमीनियम फैब्रिकेशन की शुरुआत।',
    },
    {
      year: '2012',
      titleEn: 'Haryana Glass Godown & Toughened Glass.',
      titleHi: 'हरियाणा ग्लास गोदाम और टफन्ड ग्लास विस्तार।',
      descEn:
        'Established our dedicated Haryana Glass Godown stocking jumbo Gold Plus float glass, ISI toughened glass, and commercial structural glazing materials.',
      descHi:
        'जंबो Gold Plus फ्लोट ग्लास, ISI टफन्ड सेफ्टी ग्लास और कमर्शियल फसाड सप्लाई के लिए अपने विशाल "हरियाणा ग्लास गोदाम" की स्थापना।',
    },
    {
      year: '2026',
      titleEn: '2nd Generation Pro CNC Plant & LED Studio.',
      titleHi: 'दूसरी पीढ़ी का ऑटोमेटेड CNC प्लांट और शोरूम।',
      descEn:
        'Upgraded to a full 3-storey headquarters at Nirankari Bhawan Road with Double-Head CNC Mitre Saws, Twin-Head uPVC Thermal Welders, Copy Routers, and an LED Mirror studio.',
      descHi:
        'निरंकारी भवन रोड पर 3-मंजिला शोरूम, डबल-हेड CNC कटिंग मशीन, uPVC थर्मल वेल्डर, कॉपी राउटर और एलईडी मिरर गैलरी के साथ पूरे हरियाणा में सेवा।',
    },
  ];

  const comparisonRows = [
    {
      paramEn: 'Fabrication Technology',
      paramHi: 'फैब्रिकेशन तकनीक',
      hwmEn: 'In-House Double-Head CNC Saw & Thermal uPVC Welder',
      hwmHi: 'इन-हाउस डबल-हेड CNC मशीन और uPVC थर्मल वेल्डर',
      localEn: 'Manual hand-grinder cuts with visible corner gaps',
      localHi: 'हाथ के कटर से टेढ़ी कटिंग और कोनों में गैप',
    },
    {
      paramEn: 'Profile & Glass Authenticity',
      paramHi: 'प्रोफाइल और ग्लास गुणवत्ता',
      hwmEn: 'Genuine ENcraft uPVC, Gold Plus Float & ISI Tempered Glass',
      hwmHi: 'ओरिजिनल ENcraft uPVC, Gold Plus ग्लास व ISI टफन्ड',
      localEn: 'Unbranded thin-gauge profiles & non-certified glass',
      localHi: 'हल्के गेज के लोकल प्रोफाइल और साधारण कांच',
    },
    {
      paramEn: 'Locking & Hardware Milling',
      paramHi: 'लॉक और हार्डवेयर फिटिंग',
      hwmEn: 'Vertical CNC Copy Router for multi-point espagnolette locks',
      hwmHi: 'CNC कॉपी राउटर मशीन द्वारा सटीक मल्टी-पॉइंट लॉक स्लॉट',
      localEn: 'Loose manual drilling that weakens frame strength',
      localHi: 'मैनुअल ड्रिलिंग जिससे लॉक ढीले पड़ जाते हैं',
    },
    {
      paramEn: 'Glazing & Weather Sealing',
      paramHi: 'ग्लेजिंग और वेदर सीलिंग',
      hwmEn: 'Green-felt scratch-free table, EPDM gaskets & structural silicone',
      hwmHi: 'ग्रीन-फेल्ट स्क्रैच-फ्री टेबल, EPDM गास्केट और वेदर सिलिकॉन',
      localEn: 'Floor assembly causing scratches & water seepage',
      localHi: 'फर्श पर फिटिंग से स्क्रैच और बारिश का पानी रिसना',
    },
  ];

  return (
    <section
      id="legacy"
      className="py-20 sm:py-28 bg-[#F5F5F7] text-[#1D1D1F]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Apple Two-Tone Section Headline */}
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0071E3]">
            {lang === 'hi'
              ? '35+ वर्षों की विरासत · 2 पीढ़ियों का पारिवारिक विश्वास'
              : 'Why Haryana Window Mart · 35+ Years & 2 Generations'}
          </p>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#1D1D1F] leading-[1.08]">
            {lang === 'hi' ? (
              <>
                दो पीढ़ियों की कारीगरी।{' '}
                <span className="text-[#86868B]">
                  सीधा हमारे गोदाम और CNC प्लांट से आपके प्रोजेक्ट तक।
                </span>
              </>
            ) : (
              <>
                Two generations of mastery.{' '}
                <span className="text-[#86868B]">
                  Direct from our Hisar plant to your site.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Apple Multi-Span Bento Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Bento Card: 3-Generation Timeline (7 Cols) */}
          <div className="lg:col-span-7 rounded-[28px] bg-white p-7 sm:p-10 apple-card-shadow flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide text-[#86868B]">
                {lang === 'hi' ? 'हमारा सफर (1990 – 2026)' : 'Our Journey · 1990 to 2026'}
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1D1D1F]">
                {lang === 'hi'
                  ? 'हिसार से पूरे हरियाणा तक भरोसे की पहचान।'
                  : 'Built on generational trust and automated precision.'}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                {lang === 'hi'
                  ? 'हरियाणा विंडो मार्ट (हरियाणा ग्लास फैब्रीकेटर) केवल एक शोरूम नहीं, बल्कि 35+ वर्षों की मेहनत से खड़ा किया गया एक संपूर्ण इन-हाउस मैन्युफैक्चरिंग प्लांट और ग्लास गोदाम है।'
                  : 'Haryana Window Mart (Haryana Glass Fabricator) combines 35+ years of generational glass knowledge with an automated CNC manufacturing plant and dedicated float-glass godown in Hisar.'}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="rounded-2xl bg-[#F5F5F7] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-[#0071E3] tabular-nums">
                      {m.year}
                    </div>
                    <h4 className="mt-2 font-semibold text-sm text-[#1D1D1F]">
                      {lang === 'hi' ? m.titleHi : m.titleEn}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs text-[#6E6E73] leading-relaxed">
                    {lang === 'hi' ? m.descHi : m.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Bento Card: Real Hisar HQ & Godown Photography (5 Cols) */}
          <div className="lg:col-span-5 rounded-[28px] bg-[#1D1D1F] text-white p-7 sm:p-9 apple-card-shadow flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wide text-[#2997FF]">
                {lang === 'hi' ? 'फैक्ट्री-डायरेक्ट लाभ' : 'Factory-Direct Advantage'}
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-white">
                {lang === 'hi'
                  ? 'बिना किसी बिचौलिए के, 100% ओरिजिनल ग्लास और प्रोफाइल।'
                  : 'Zero middlemen. 100% genuine profiles and certified glass.'}
              </h3>
              <p className="mt-2.5 text-sm text-[#A1A1A6] leading-relaxed">
                {lang === 'hi'
                  ? 'अपना खुद का ग्लास गोदाम और ऑटोमेटेड विंडो प्लांट होने के कारण हम हर प्रोजेक्ट में सटीक गेज और समय पर डिलीवरी की गारंटी देते हैं।'
                  : 'Because we operate our own bulk float-glass warehouse and automated CNC window line in Hisar, we guarantee exact thickness, genuine hardware, and direct factory pricing.'}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden bg-black">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/aistudio/IMG-20261112-WA0074_27377de3.jpg"
                    alt="3-Storey Main HQ Hisar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2.5 text-[11px] font-medium text-[#F5F5F7] text-center">
                  {lang === 'hi' ? '3-मंजिला शोरूम (हिसार)' : '3-Storey Main HQ'}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-black">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/aistudio/IMG-20261112-WA0075_82012555.jpg"
                    alt="Haryana Glass Godown"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2.5 text-[11px] font-medium text-[#F5F5F7] text-center">
                  {lang === 'hi' ? 'हरियाणा ग्लास गोदाम' : 'Haryana Glass Godown'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apple Clean Specification Comparison Card */}
        <div className="mt-8 rounded-[28px] bg-white p-6 sm:p-10 apple-card-shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-black/[0.08]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#0071E3]" />
              <h3 className="text-lg sm:text-xl font-bold tracking-[-0.015em] text-[#1D1D1F]">
                {lang === 'hi'
                  ? 'गुणवत्ता तुलना: हरियाणा विंडो मार्ट Pro CNC बनाम साधारण लोकल काम'
                  : 'Haryana Window Mart Pro CNC vs. Conventional Manual Workshops'}
              </h3>
            </div>
            <span className="text-xs font-medium text-[#86868B]">
              {lang === 'hi' ? '100% पारदर्शी स्पेसिफिकेशन' : 'Verified Hisar Plant Standards'}
            </span>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.08] text-xs font-semibold text-[#86868B]">
                  <th className="py-4 pr-4">
                    {lang === 'hi' ? 'मापदंड (Parameter)' : 'Specification'}
                  </th>
                  <th className="py-4 px-4 text-[#1D1D1F]">
                    {lang === 'hi'
                      ? 'हरियाणा विंडो मार्ट (Pro CNC प्लांट)'
                      : 'Haryana Window Mart (Hisar CNC Plant)'}
                  </th>
                  <th className="py-4 pl-4 text-[#86868B]">
                    {lang === 'hi'
                      ? 'साधारण मैनुअल वर्कशॉप'
                      : 'Conventional Manual Workshops'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-xs sm:text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 pr-4 font-semibold text-[#1D1D1F]">
                      {lang === 'hi' ? row.paramHi : row.paramEn}
                    </td>
                    <td className="py-4 px-4 text-[#1D1D1F] font-medium">
                      <span className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                        <span>{lang === 'hi' ? row.hwmHi : row.hwmEn}</span>
                      </span>
                    </td>
                    <td className="py-4 pl-4 text-[#86868B]">
                      {lang === 'hi' ? row.localHi : row.localEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
