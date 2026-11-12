import React from 'react';
import { Award, Compass, ShieldCheck, Check, MapPin } from 'lucide-react';
import { Language, SiteSettings } from '../types/cms';

interface LegacySectionProps {
  lang: Language;
  settings: SiteSettings;
}

export const LegacySection: React.FC<LegacySectionProps> = ({
  lang,
  settings,
}) => {
  const milestones = [
    {
      year: '1990',
      titleEn: '1st Generation Foundation in Hisar',
      titleHi: 'हिसार में पहली पीढ़ी द्वारा नींव (1990)',
      descEn:
        'Started custom architectural glass cutting, bevelling, and aluminium fabrication in Hisar with an uncompromising commitment to honest gauge and precision fitting.',
      descHi:
        'ईमानदार गेज, असली ग्लास और सटीक फिटिंग के संकल्प के साथ हिसार में ग्लास कटिंग और एल्युमीनियम फैब्रिकेशन की शुरुआत।',
    },
    {
      year: '2012',
      titleEn: 'Expansion to Bulk Float Glass Godown & Toughened Glass',
      titleHi: 'हरियाणा ग्लास गोदाम और टफन्ड ग्लास विस्तार',
      descEn:
        'Established our dedicated Haryana Glass Godown stocking jumbo Gold Plus float glass, ISI toughened glass, and commercial structural glazing materials.',
      descHi:
        'जंबो Gold Plus फ्लोट ग्लास, ISI टफन्ड सेफ्टी ग्लास और कमर्शियल फसाड सप्लाई के लिए अपने विशाल "हरियाणा ग्लास गोदाम" की स्थापना।',
    },
    {
      year: '2026',
      titleEn: '2nd Generation Automated CNC Plant & LED Mirror Showroom',
      titleHi: 'दूसरी पीढ़ी का ऑटोमेटेड CNC प्लांट और आधुनिक शोरूम',
      descEn:
        'Upgraded to a full 3-storey headquarters at Nirankari Bhawan Road with Double-Head CNC Mitre Saws, Twin-Head uPVC Thermal Welders, Vertical Copy Routers, and an Arch LED Mirror gallery.',
      descHi:
        'निरंकारी भवन रोड पर 3-मंजिला शोरूम, डबल-हेड CNC कटिंग मशीन, uPVC थर्मल वेल्डर, कॉपी राउटर और एलईडी मिरर गैलरी के साथ पूरे हरियाणा में सेवा।',
    },
  ];

  const comparisonRows = [
    {
      paramEn: 'Fabrication Method',
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
      className="py-16 sm:py-24 bg-[#FDFBF7] text-[#141311] border-b border-[#D6CFC2]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Top Two-Column Heritage Story + Real Building Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6CFC2] bg-[#F6F3EC]">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#D6CFC2]">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#C2410C] font-semibold">
              {lang === 'hi'
                ? '35+ वर्षों की विरासत · 2 पीढ़ियों का पारिवारिक विश्वास'
                : '35+ YEARS OF EXCELLENCE · 2 GENERATIONS OF FAMILY TRUST'}
            </div>

            <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-5xl text-[#141311] leading-[1.08]">
              {lang === 'hi'
                ? 'दो पीढ़ियों की कारीगरी: हिसार से पूरे हरियाणा तक भरोसे की पहचान'
                : 'Two Generations of Architectural Glass & Fenestration Mastery'}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#44403C] leading-relaxed">
              {lang === 'hi'
                ? 'हरियाणा विंडो मार्ट (हरियाणा ग्लास फैब्रीकेटर) केवल एक दुकान नहीं, बल्कि 35+ वर्षों की मेहनत से खड़ा किया गया एक संपूर्ण इन-हाउस मैन्युफैक्चरिंग प्लांट और ग्लास गोदाम है। हमने पारंपरिक कारीगरी के अनुभव को आधुनिक ऑटोमेटेड CNC मशीनों के साथ जोड़ा है।'
                : 'Haryana Window Mart (Haryana Glass Fabricator) combines 35+ years of generational glass knowledge with a modern automated CNC manufacturing plant and dedicated float-glass godown in Hisar.'}
            </p>

            {/* 3-Step Generational Timeline */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D6CFC2] border border-[#D6CFC2]">
              {milestones.map((m) => (
                <div key={m.year} className="bg-[#FDFBF7] p-5">
                  <div className="font-mono font-bold text-xl text-[#C2410C] tabular-nums">
                    {m.year}
                  </div>
                  <h3 className="mt-1.5 font-architectural font-bold text-sm text-[#141311]">
                    {lang === 'hi' ? m.titleHi : m.titleEn}
                  </h3>
                  <p className="mt-2 text-xs text-[#57534E] leading-relaxed">
                    {lang === 'hi' ? m.descHi : m.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dual Real Building & Godown Photo Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#141311] text-[#F6F3EC]">
            <div className="grid grid-cols-2 gap-px bg-[#2C2A26] border-b border-[#2C2A26]">
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src="/assets/aistudio/IMG-20261112-WA0074_27377de3.jpg"
                  alt="Haryana Glass Fabricator 3-Storey Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/75 px-3 py-1.5 text-[11px] font-mono text-white">
                  {lang === 'hi'
                    ? 'मुख्य 3-मंजिला बिल्डिंग (हिसार)'
                    : '3-Storey Main HQ (Hisar)'}
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src="/assets/aistudio/IMG-20261112-WA0075_82012555.jpg"
                  alt="Haryana Glass Godown"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/75 px-3 py-1.5 text-[11px] font-mono text-white">
                  {lang === 'hi'
                    ? 'हरियाणा ग्लास गोदाम'
                    : 'Haryana Glass Godown'}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FB923C]">
                  <Award className="w-4 h-4" />
                  <span>
                    {lang === 'hi'
                      ? 'हमारी मुख्य विशेषता (CORE USP)'
                      : 'ARCHITECTURAL CRAFTSMANSHIP GUARANTEE'}
                  </span>
                </div>
                <h3 className="mt-2 font-architectural font-bold text-xl text-white">
                  {lang === 'hi'
                    ? 'सीधा फैक्ट्री और गोदाम से आपके प्रोजेक्ट तक — बिना किसी बिचौलिए के'
                    : 'Direct from Our Hisar Godown & CNC Factory to Your Site'}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                  {lang === 'hi'
                    ? 'क्योंकि हमारे पास अपना खुद का ग्लास गोदाम और ऑटोमेटेड विंडो प्लांट है, इसलिए आपको मिलता है 100% असली माल, समय पर डिलीवरी और फैक्ट्री-डायरेक्ट रेट।'
                    : 'Because we operate our own bulk float-glass warehouse and automated CNC window fabrication line, we eliminate middlemen and guarantee exact specifications.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2C2A26] flex items-center justify-between text-xs font-mono text-[#A8A29E]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FB923C]" />
                  {lang === 'hi' ? 'हिसार हेडक्वार्टर' : 'Hisar Headquarters'}
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <Compass className="w-3.5 h-3.5 text-[#FB923C]" />
                  {lang === 'hi'
                    ? 'पूरे हरियाणा में सेवा'
                    : 'All 22 Haryana Districts'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Quality Comparison Ledger Table */}
        <div className="mt-8 border border-[#D6CFC2] bg-[#FDFBF7] overflow-hidden">
          <div className="px-6 py-4 bg-[#141311] text-[#F6F3EC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-architectural font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#FB923C]" />
              <span>
                {lang === 'hi'
                  ? 'गुणवत्ता तुलना: हरियाणा विंडो मार्ट (CNC प्लांट) बनाम साधारण लोकल काम'
                  : 'CRAFT SPECIFICATION LEDGER: HARYANA WINDOW MART CNC PLANT VS. LOCAL FABRICATORS'}
              </span>
            </div>
            <span className="text-xs font-mono text-[#FB923C]">
              {lang === 'hi' ? '100% पारदर्शी स्पेसिफिकेशन' : 'VERIFIED PLANT STANDARDS'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D6CFC2] bg-[#F6F3EC] text-[11px] font-mono uppercase tracking-wider text-[#57534E]">
                  <th className="py-3.5 px-5 border-r border-[#D6CFC2]">
                    {lang === 'hi' ? 'मापदंड (Parameter)' : 'Specification Parameter'}
                  </th>
                  <th className="py-3.5 px-5 border-r border-[#D6CFC2] text-[#C2410C] font-bold">
                    {lang === 'hi'
                      ? 'हरियाणा विंडो मार्ट (हिसार CNC प्लांट)'
                      : 'Haryana Window Mart (Hisar CNC Plant)'}
                  </th>
                  <th className="py-3.5 px-5 text-[#78716C]">
                    {lang === 'hi'
                      ? 'साधारण मैनुअल वर्कशॉप'
                      : 'Conventional Manual Workshops'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DEC9] text-xs sm:text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F6F3EC]/60">
                    <td className="py-3.5 px-5 font-architectural font-bold text-[#141311] border-r border-[#D6CFC2]">
                      {lang === 'hi' ? row.paramHi : row.paramEn}
                    </td>
                    <td className="py-3.5 px-5 text-[#141311] font-medium border-r border-[#D6CFC2] bg-[#FFFBEB]/50">
                      <span className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                        <span>{lang === 'hi' ? row.hwmHi : row.hwmEn}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-[#78716C]">
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
