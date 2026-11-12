import {
  CMSStoreState,
  CustomerInquiry,
  GalleryItem,
  ProductCategory,
  ProductItem,
  ServiceItem,
  SiteSettings,
  WorkshopCategory,
  WorkshopItem,
} from '../types/cms';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandNameEn: 'Haryana Window Mart',
  brandNameHi: 'हरियाणा विंडो मार्ट',
  subtitleEn: 'Haryana Glass Fabricator',
  subtitleHi: 'हरियाणा ग्लास फैब्रिकेटर',
  logoUrl: '/assets/aistudio/IMG-20261112-WA0001_8a30db36.jpg',
  legacyYearsStat: '35+ Years',
  generationsStat: '2 Generations',
  heroBadgeEn: '35+ Years of Legacy · 2 Generations · Pan-Haryana Service',
  heroBadgeHi: '35+ वर्षों का विश्वास · 2 पीढ़ियों की विरासत · पूरे हरियाणा में सेवा',
  heroHeadingEn:
    'Complete Expertise in Craftsmanship for Aluminium, uPVC & Architectural Glass',
  heroHeadingHi:
    'एल्युमीनियम, uPVC और आर्किटेक्चरल ग्लास फैब्रिकेशन में बेजोड़ कारीगरी और पूर्ण विशेषज्ञता',
  heroSubheadingEn:
    'From our 3-storey showroom, bulk float-glass godown, and automated CNC fabrication plant at Nirankari Bhawan Road, Hisar — serving luxury residences and commercial landmarks across all 22 districts of Haryana.',
  heroSubheadingHi:
    'निरंकारी भवन रोड, हिसार स्थित हमारे 3-मंजिला शोरूम, विशाल ग्लास गोदाम और अत्याधुनिक CNC फैब्रिकेशन वर्कशॉप से पूरे हरियाणा के आलीशान घरों, कोठियों और शोरूम के लिए 35+ वर्षों का पारिवारिक भरोसा।',
  phoneDisplay: '+91 94676 87662',
  whatsappNumber: '919467687662',
  addressEn: 'Nirankari Bhawan Road, Opp. Bank Colony T-Point, Hisar, Haryana',
  addressHi: 'निरंकारी भवन रोड, बैंक कॉलोनी टी-पॉइंट के सामने, हिसार, हरियाणा',
  coverageEn: 'Based in Hisar · Providing Pan-Haryana Site Visit & Installation',
  coverageHi: 'हिसार में आधारित · पूरे हरियाणा में साइट विजिट और इंस्टॉलेशन सेवा उपलब्ध',
  instagramUrl: 'https://www.instagram.com/haryanawindow',
  instagramHandle: '@haryanawindow',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Nirankari%20Bhawan%20Road%20Bank%20Colony%20Hisar%20Haryana&t=&z=15&ie=UTF8&iwloc=&output=embed',
  adminPin: 'admin123',
  firebaseDbUrl: '',
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    categoryKey: 'Aluminium',
    titleEn: 'Aluminium Windows and Doors',
    titleHi: 'एल्युमीनियम खिड़कियां और दरवाजे',
    descriptionEn:
      'Heavy-duty anodized and matte-black powder-coated system aluminium windows, slide-and-fold villa doors, and precision 45° mitre-cut frames fabricated on our twin-head CNC line.',
    descriptionHi:
      'मजबूत पाउडर-कोटेड और एनोडाइज्ड सिस्टम एल्युमीनियम खिड़कियां, स्लाइड-एंड-फोल्ड दरवाजे और हमारी डबल-हेड CNC मशीन पर तैयार किए गए सटीक 45° जॉइंट फ्रेम।',
    specsEn: 'CNC Mitre Cut · System Profiles · Multi-Point Locking',
    specsHi: 'CNC कटिंग · सिस्टम प्रोफाइल · मल्टी-पॉइंट लॉक',
    iconName: 'DoorOpen',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0061_77655931.jpg',
  },
  {
    id: 'srv-2',
    number: '02',
    categoryKey: 'uPVC',
    titleEn: 'uPVC Windows and Doors',
    titleHi: 'uPVC खिड़कियां और दरवाजे',
    descriptionEn:
      'Multi-chamber acoustic and thermal-insulated ENcraft uPVC 2-track & 3-track sliding windows, casement doors, and stainless-steel mosquito mesh sashes welded on our automated thermal line.',
    descriptionHi:
      'ध्वनि-रोधी (साउंडप्रूफ), धूल और गर्मी से बचाव करने वाली ENcraft 2-ट्रैक व 3-ट्रैक uPVC स्लाइडिंग खिड़कियां और थर्मल वेल्डिंग मशीन से निर्मित मच्छर जाली वाले दरवाजे।',
    specsEn: 'ENcraft Profiles · 40dB Acoustic · Thermal Welded Corners',
    specsHi: 'ENcraft प्रोफाइल · साउंडप्रूफ · जाली ट्रैक सहित',
    iconName: 'Columns3',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0063_d86bc0b7.jpg',
  },
  {
    id: 'srv-3',
    number: '03',
    categoryKey: 'Toughened Glass',
    titleEn: 'Glass Fabrication and Installation',
    titleHi: 'ग्लास फैब्रिकेशन और इंस्टॉलेशन',
    descriptionEn:
      'Direct bulk float-glass sourcing from our Hisar Godown (Gold Plus Float Glass), green-felt table cutting, CNC edge polishing, DGU double-glazing, and laser-levelled site installation.',
    descriptionHi:
      'हमारे हिसार स्थित हरियाणा ग्लास गोदाम से सीधा जंबो फ्लोट ग्लास स्टॉक, ग्रीन-फेल्ट टेबल पर सटीक कटिंग, एज पॉलिशिंग, डबल-ग्लेजिंग (DGU) और पूरे हरियाणा में साइट इंस्टॉलेशन।',
    specsEn: 'In-House Glass Godown · Edge Polish · Pan-Haryana Site Team',
    specsHi: 'स्वयं का ग्लास गोदाम · CNC पॉलिशिंग · अनुभवी इंस्टॉलेशन टीम',
    iconName: 'Wrench',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0075_82012555.jpg',
  },
  {
    id: 'srv-4',
    number: '04',
    categoryKey: 'Toughened Glass',
    titleEn: 'Toughened Glass',
    titleHi: 'टफन्ड ग्लास (Toughened Glass)',
    descriptionEn:
      'ISI-certified 8mm, 10mm, and 12mm high-impact tempered safety glass, laminated security glass, and frosted/tinted architectural sheets for luxury kothis and showrooms.',
    descriptionHi:
      'ISI-प्रमाणित 8mm, 10mm और 12mm हाई-स्ट्रेंथ टफन्ड सेफ्टी ग्लास, लैमिनेटेड सिक्योरिटी ग्लास और शोरूम व कोठियों के लिए टिंटेड ग्लास।',
    specsEn: '8mm / 10mm / 12mm · ISI Tempered · 5x Impact Strength',
    specsHi: '8mm से 12mm मोटाई · ISI प्रमाणित · 5 गुना अधिक मजबूत',
    iconName: 'ShieldCheck',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0076_51ee043d.jpg',
  },
  {
    id: 'srv-5',
    number: '05',
    categoryKey: 'Partitions',
    titleEn: 'Glass Partitions',
    titleHi: 'ग्लास पार्टीशन (ऑफिस और होम)',
    descriptionEn:
      'Frameless acoustic office cabin enclosures, patch-fitting swing & sliding glass doors, and luxury bathroom shower cubicles with heavy-duty stainless steel & PVD hardware.',
    descriptionHi:
      'ऑफिस केबिन के लिए साउंडप्रूफ फ्रेमलेस ग्लास पार्टीशन, स्लाइडिंग दरवाजे और बाथरूम के लिए लग्जरी शॉवर एनक्लोजर।',
    specsEn: 'Frameless Patch Fittings · Acoustic Seals · Shower Cubicles',
    specsHi: 'फ्रेमलेस फिटिंग · साउंडप्रूफ सील · शॉवर क्यूबिकल',
    iconName: 'LayoutGrid',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0065_8c5d036b.jpg',
  },
  {
    id: 'srv-6',
    number: '06',
    categoryKey: 'Railings',
    titleEn: 'Railings and Facades',
    titleHi: 'ग्लास रेलिंग और कमर्शियल फसाड',
    descriptionEn:
      'Frameless balcony & staircase toughened glass railings with SS304/PVD gold spigots, continuous aluminium base profiles, ACP cladding, and structural commercial facades.',
    descriptionHi:
      'बालकनी और सीढ़ियों के लिए फ्रेमलेस टफन्ड ग्लास रेलिंग, स्टेनलेस स्टील/गोल्ड प्रोफाइल और शोरूम व बिल्डिंग के लिए स्ट्रक्चरल ग्लास फसाड।',
    specsEn: 'SS304 / PVD Gold · Aluminium U-Channel · Structural Glazing',
    specsHi: 'SS304 व गोल्ड प्रोफाइल · बालकनी रेलिंग · स्ट्रक्चरल फसाड',
    iconName: 'Building2',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0074_27377de3.jpg',
  },
  {
    id: 'srv-7',
    number: '07',
    categoryKey: 'Mirrors',
    titleEn: 'Mirrors and Other Glass Products',
    titleHi: 'एलईडी मिरर और अन्य ग्लास उत्पाद',
    descriptionEn:
      'In-house showroom display of custom Arch & Round backlit smart touch-sensor LED vanity mirrors, triple-line dressing mirrors, diamond bevelled wall mirrors, and glass tabletops.',
    descriptionHi:
      'हमारे हिसार शोरूम में उपलब्ध कस्टम आर्च और राउंड टच-सेंसर बैकलिट एलईडी मिरर, ट्रिपल-बॉर्डर ड्रेसिंग मिरर, डायमंड बेवल्ड वॉल मिरर और टेबल टॉप।',
    specsEn: 'Smart Touch Sensor · Arch & Round LED · Diamond Bevelled',
    specsHi: 'स्मार्ट टच सेंसर · आर्च व राउंड LED · डायमंड बेवल्ड मिरर',
    iconName: 'Sparkles',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0068_4d315855.jpg',
  },
  {
    id: 'srv-8',
    number: '08',
    categoryKey: 'Slim Profile',
    titleEn: 'Slim Profile (Ultra-Slim Frames & Partitions)',
    titleHi: 'स्लिम प्रोफाइल (अल्ट्रा-स्लिम फ्रेम व पार्टीशन)',
    descriptionEn:
      '16mm ultra-minimalist architectural aluminium frames in Matte Black, Champagne Gold, and Brushed Bronze fabricated in our workshop with fluted or clear toughened glass.',
    descriptionHi:
      'हमारी वर्कशॉप में तैयार 16mm अल्ट्रा-स्लिम मैट ब्लैक, शैम्पेन गोल्ड और ब्रॉन्ज फ्रेम के साथ फ्लूटेड और क्लियर ग्लास स्लाइडिंग पार्टीशन व वार्डरोब शटर।',
    specsEn: '16mm Ultra-Slim Sightline · Matte Black & Gold · Soft-Close',
    specsHi: '16mm अल्ट्रा-स्लिम फ्रेम · मैट ब्लैक व गोल्ड · सॉफ्ट-क्लोज',
    iconName: 'Maximize2',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0055_88ed8a36.jpg',
  },
];

/**
 * All 29 real workshop, building, godown, CNC machinery & showroom photos uploaded by the user,
 * carefully analyzed and paired with exact bilingual descriptions underneath each photo.
 */
export const INITIAL_WORKSHOP_ITEMS: WorkshopItem[] = [
  {
    id: 'ws-01',
    bayCode: 'FACILITY · 01',
    category: 'Building & Godown',
    titleEn: 'Haryana Glass Fabricator — 3-Storey Headquarters & Showroom Elevation (Hisar)',
    titleHi: 'हरियाणा ग्लास फैब्रीकेटर — 3-मंजिला मुख्य शोरूम और हेडक्वार्टर (हिसार)',
    machineSpecEn: 'Nirankari Bhawan Road, Hisar · Timber Louver & Toughened Glass Elevation · HGF Rooftop Emblem',
    machineSpecHi: 'निरंकारी भवन रोड, हिसार · वुडन लूवर व टफन्ड ग्लास एलिवेशन · HGF हरियाणा मैप लोगो',
    descriptionEn:
      'Front architectural elevation of the 3-storey Haryana Glass Fabricator headquarters in Hisar. The facade showcases warm wooden vertical louvers, expansive toughened glass windows, illuminated Hindi lettering ("हरियाणा ग्लास फैब्रीकेटर"), custom laser-cut CNC wall art of Radha-Krishna on the left and Lord Hanuman on the right, and the signature Haryana state map emblem with "HGF" crowned on the rooftop.',
    descriptionHi:
      'हिसार के निरंकारी भवन रोड पर स्थित "हरियाणा ग्लास फैब्रीकेटर" की 3-मंजिला मुख्य बिल्डिंग का भव्य फ्रंट एलिवेशन। इसमें वुडन वर्टिकल लूवर्स, बड़े टफन्ड ग्लास पैनल, बाईं ओर राधा-कृष्ण और दाईं ओर वीर हनुमान जी की कस्टम CNC कलाकृति तथा छत के ऊपर हरियाणा के नक्शे में "HGF" का विशेष चिन्ह स्पष्ट दिखाई दे रहा है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0076_51ee043d.jpg',
    createdAt: 1730100001000,
  },
  {
    id: 'ws-02',
    bayCode: 'FACILITY · 02',
    category: 'Building & Godown',
    titleEn: 'Haryana Glass Godown (हरियाणा ग्लास गोदाम) — Bulk Float Glass Warehouse',
    titleHi: 'हरियाणा ग्लास गोदाम — जंबो फ्लोट और टफन्ड ग्लास स्टॉक वेयरहाउस',
    machineSpecEn: 'Dedicated Glass Storage Unit · Gold Plus Float Glass Stock · Heavy A-Frame Racks',
    machineSpecHi: 'विशाल ग्लास गोदाम · Gold Plus Float Glass स्टॉक · हैवी ग्लास रैक और क्रेन हैंडलिंग',
    descriptionEn:
      'Street-level view of our dedicated "हरियाणा ग्लास गोदाम" (Haryana Glass Godown) featuring modern vertical facade fins and traditional flute artwork on the upper parapet. Inside the high-clearance left bay, heavy-duty wooden and steel A-frame racks hold bulk jumbo sheets of clear, tinted, and mirror glass, while the right shutter displays official Gold Plus Float Glass branding with cut-to-size sheets stacked outside.',
    descriptionHi:
      'हमारा समर्पित "हरियाणा ग्लास गोदाम" जहां भारी मात्रा में जंबो ग्लास शीट्स का स्टॉक रखा जाता है। ऊपरी हिस्से में आधुनिक वर्टिकल फसाड फिन्स हैं, बाईं ओर खुले गोदाम के भीतर बड़े ग्लास रैक और कटिंग टेबल दिख रहे हैं, और दाईं ओर Gold Plus Float Glass के शटर के बाहर तैयार ग्लास शीट्स रखी हुई हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0075_82012555.jpg',
    createdAt: 1730100002000,
  },
  {
    id: 'ws-03',
    bayCode: 'FACILITY · 03',
    category: 'Building & Godown',
    titleEn: 'Full 3-Storey Building & Ground-Floor Showroom Entrance',
    titleHi: 'मुख्य 3-मंजिला बिल्डिंग और ग्राउंड-फ्लोर शोरूम प्रवेश द्वार',
    machineSpecEn: 'Ground Floor Display & Dispatch · Vertical Pillar Signage · Street Access for Glass Trucks',
    machineSpecHi: 'ग्राउंड फ्लोर शोरूम व डिस्पैच · पिलर पर हिंदी ब्रांडिंग · लोडिंग वाहनों के लिए चौड़ा रास्ता',
    descriptionEn:
      'Complete top-to-bottom view of the Haryana Glass Fabricator building from ground level to rooftop. The ground floor features vertical Hindi signage ("हरियाणा ग्लास फैब्रीकेटर") on the left brick-clad column, an open toughened-glass showroom entrance, and direct street access for loading finished window frames and glass consignments across Haryana.',
    descriptionHi:
      'ग्राउंड फ्लोर से लेकर छत तक "हरियाणा ग्लास फैब्रीकेटर" की पूरी 3-मंजिला इमारत का दृश्य। नीचे पिलर पर हिंदी में ब्रांड का नाम अंकित है और मुख्य ग्लास शोरूम का प्रवेश द्वार दिखाई दे रहा है जहां से पूरे हरियाणा के लिए माल डिस्पैच होता है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0074_27377de3.jpg',
    createdAt: 1730100003000,
  },
  {
    id: 'ws-04',
    bayCode: 'FACILITY · 04',
    category: 'Building & Godown',
    titleEn: 'Headquarters Showroom Frontage & Client Visit Parking Bay',
    titleHi: 'शोरूम का मुख्य द्वार और क्लाइंट विजिट पार्किंग एरिया',
    machineSpecEn: 'Nirankari Bhawan Road, Opp. Bank Colony T-Point · Client Consultation Hub',
    machineSpecHi: 'निरंकारी भवन रोड, हिसार · क्लाइंट मीटिंग और लाइव सैंपल अवलोकन केंद्र',
    descriptionEn:
      'Exterior view of the Haryana Glass Fabricator showroom entrance with the owner’s black Mahindra Scorpio (HR 20 AY 6403) parked right outside. Architects, builders, and homeowners from Hisar and nearby districts visit this ground-floor experience center daily to inspect live window profiles, hardware, and mirror samples.',
    descriptionHi:
      'हरियाणा ग्लास फैब्रीकेटर शोरूम के मुख्य द्वार का दृश्य, जहां बाहर ब्लैक महिंद्रा स्कॉर्पियो (HR 20 AY 6403) खड़ी है। यहां प्रतिदिन हिसार और आसपास के शहरों से ग्राहक, आर्किटेक्ट और बिल्डर लाइव सैंपल देखने और कोटेशन फाइनल करने आते हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0052_53d999c7.jpg',
    createdAt: 1730100004000,
  },
  {
    id: 'ws-05',
    bayCode: 'FACILITY · 05',
    category: 'Building & Godown',
    titleEn: 'Haryana Glass Godown — Active Sheet Handling & Cutting Bay View',
    titleHi: 'हरियाणा ग्लास गोदाम — ग्लास शीट हैंडलिंग और इनडोर रैक व्यू',
    machineSpecEn: 'Bulk Float Glass Unloading · Heavy Wooden Cutting Table · Raw Sheet Inventory',
    machineSpecHi: 'फ्लोट ग्लास अनलोडिंग · भारी लकड़ी की कटिंग टेबल · रॉ ग्लास शीट स्टॉक',
    descriptionEn:
      'Alternate wide view of the Haryana Glass Godown showing a technician working near the entrance, the heavy wooden glass-cutting table just inside the bay, upright glass storage racks in the deep interior, and beveled/tinted glass panels leaning against the central brick pillar.',
    descriptionHi:
      'हरियाणा ग्लास गोदाम का एक और दृश्य जिसमें गोदाम के अंदर रखी भारी ग्लास कटिंग टेबल, पीछे खड़े बड़े ग्लास स्टोरेज रैक और पिलर के पास रखे तैयार ग्लास पैनल साफ देखे जा सकते हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0057_f0f465fb.jpg',
    createdAt: 1730100005000,
  },
  {
    id: 'ws-06',
    bayCode: 'CNC BAY · 06',
    category: 'CNC Cutting & Milling',
    titleEn: 'Industrial Double-Head 45°/90° Precision Mitre Cutting Saw Machine',
    titleHi: 'इंडस्ट्रियल डबल-हेड 45°/90° सटीक प्रोफाइल कटिंग मशीन (Double-Head Cutting Saw)',
    machineSpecEn: 'Dual Red Pneumatic Safety Hoods · Horizontal Pneumatic Clamps · Front Control Console',
    machineSpecHi: 'ड्यूल रेड सेफ्टी शील्ड · न्यूमैटिक प्रोफाइल क्लैंप · डिजिटल कंट्रोल पैनल',
    descriptionEn:
      'Close-up inspection of our heavy-duty Double-Head CNC Mitre Cutting Saw Machine. Equipped with dual red-trimmed protective blade guards, horizontal pneumatic clamping cylinders to lock profiles with zero vibration, a central hanging digital operator console, and a precision linear guide rail for simultaneous 45° or 90° cuts on both ends of aluminium and uPVC profiles.',
    descriptionHi:
      'हमारी हैवी-ड्यूटी डबल-हेड (Double-Head) प्रोफाइल कटिंग मशीन का क्लोज-अप फोटो। इसमें लाल बॉर्डर वाले दो सेफ्टी कवर, प्रोफाइल को बिना हिले पकड़ने के लिए न्यूमैटिक क्लैंप और सामने डिजिटल कंट्रोल कंसोल लगा है, जिससे एल्युमीनियम और uPVC प्रोफाइल के दोनों सिरे एक साथ बिल्कुल सटीक 45° या 90° एंगल पर कटते हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0062_f31341d7.jpg',
    createdAt: 1730100006000,
  },
  {
    id: 'ws-07',
    bayCode: 'CNC BAY · 07',
    category: 'CNC Cutting & Milling',
    titleEn: 'Twin-Head CNC Aluminium & uPVC Profile Cutting Line with Calibration Rail',
    titleHi: 'ट्विन-हेड CNC एल्युमीनियम व uPVC प्रोफाइल कटिंग लाइन और मेजरमेंट रेल',
    machineSpecEn: 'Motorized Right Cutting Head · Pressure Regulators · Matte Black Aluminium Stock',
    machineSpecHi: 'मोटराइज्ड कटिंग हेड · प्रेशर गेज रेगुलेटर · मैट ब्लैक एल्युमीनियम सेक्शन',
    descriptionEn:
      'Detailed angle of the Twin-Head Profile Cutting Machine showing the movable right-hand saw head mounted on a heavy linear bearing track, dual air-pressure gauges on the left chassis, and long matte-black powder-coated aluminium window profiles resting alongside the machine ready for batch cutting.',
    descriptionHi:
      'ट्विन-हेड कटिंग मशीन की लंबी लीनियर रेल और मोटराइज्ड कटिंग हेड का विस्तृत दृश्य। मशीन पर एयर-प्रेशर गेज लगे हैं और पास ही कटिंग के लिए तैयार मैट-ब्लैक पाउडर-कोटेड एल्युमीनियम प्रोफाइल रखे हुए हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0078_38d44dc0.jpg',
    createdAt: 1730100007000,
  },
  {
    id: 'ws-08',
    bayCode: 'CNC BAY · 08',
    category: 'CNC Cutting & Milling',
    titleEn: 'Double-Head Saw Calibration Track & Pneumatic Clamping Assembly',
    titleHi: 'डबल-हेड सॉ कैलिब्रेशन ट्रैक और न्यूमैटिक क्लैंपिंग सिस्टम',
    machineSpecEn: 'Millimeter-Accurate Scale · Dual Saw Units · Zero-Gap Corner Joinery Prep',
    machineSpecHi: 'मिलीमीटर-सटीक स्केल · ड्यूल सॉ यूनिट · जीरो-गैप कॉर्नर जॉइंट की तैयारी',
    descriptionEn:
      'Full-length view of the Double-Head Cutting Saw bed highlighting the stainless millimeter scale strip along the beam, profile support rollers, and pneumatic hold-down pistons that ensure hairline-tight corner joints on architectural casement and sliding frames.',
    descriptionHi:
      'डबल-हेड कटिंग मशीन के पूरे बेड का दृश्य, जिसमें बीम पर लगा मिलीमीटर स्केल, प्रोफाइल सपोर्ट रोलर और न्यूमैटिक पिस्टन दिख रहे हैं। इसी सटीक कटिंग की वजह से खिड़कियों के कोनों में बाल बराबर भी गैप नहीं रहता।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0051_56a9bed3.jpg',
    createdAt: 1730100008000,
  },
  {
    id: 'ws-09',
    bayCode: 'CNC BAY · 09',
    category: 'CNC Cutting & Milling',
    titleEn: 'Active Matte-Black Aluminium Frame Cutting on Double-Head Line',
    titleHi: 'डबल-हेड मशीन पर मैट-ब्लैक एल्युमीनियम विंडो फ्रेम की लाइव कटिंग',
    machineSpecEn: 'Anodized & Powder-Coated Black Profiles · Finished Window Frames on Workshop Carpet',
    machineSpecHi: 'मैट-ब्लैक एल्युमीनियम सेक्शन · वर्कशॉप फ्लोर पर तैयार विंडो फ्रेम',
    descriptionEn:
      'Side perspective of the Double-Head Profile Cutting Line with freshly mitre-cut matte black aluminium window frames and assembled sashes placed on the green protective workshop floor mat in the foreground, preventing any scratches on the premium powder-coated finish.',
    descriptionHi:
      'डबल-हेड कटिंग मशीन के पास हरे रंग के सुरक्षात्मक मैट पर रखे हुए ताजा कटे मैट-ब्लैक एल्युमीनियम विंडो फ्रेम। हरे मैट का उपयोग इसलिए किया जाता है ताकि महंगे पाउडर-कोटेड फ्रेम पर कोई खरोंच न आए।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0061_77655931.jpg',
    createdAt: 1730100009000,
  },
  {
    id: 'ws-10',
    bayCode: 'CNC BAY · 10',
    category: 'CNC Cutting & Milling',
    titleEn: 'Long-Bed Profile Cutting Track & Vertical Aluminium Extrusion Racks',
    titleHi: 'लॉन्ग-बेड प्रोफाइल कटिंग ट्रैक और वर्टिकल एल्युमीनियम प्रोफाइल रैक',
    machineSpecEn: '6-Meter Extrusion Capacity · Vertical Profile Storage · Assembled Black Sashes',
    machineSpecHi: '6-मीटर प्रोफाइल क्षमता · वर्टिकल स्टोरेज रैक · तैयार ब्लैक विंडो पल्ले',
    descriptionEn:
      'View along the 6-meter bed of the cutting machine looking toward the rear vertical storage racks loaded with upright black aluminium extrusions, white uPVC sections, and completed multi-panel window frames queued for glazing.',
    descriptionHi:
      'कटिंग मशीन के 6-मीटर लंबे ट्रैक के साथ पीछे की ओर खड़े वर्टिकल रैक का दृश्य, जिनमें काले एल्युमीनियम सेक्शन, सफेद uPVC प्रोफाइल और ग्लेजिंग के लिए तैयार खिड़कियों के फ्रेम व्यवस्थित रूप से रखे हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0072_b265889c.jpg',
    createdAt: 1730100010000,
  },
  {
    id: 'ws-11',
    bayCode: 'CNC BAY · 11',
    category: 'CNC Cutting & Milling',
    titleEn: 'Vertical CNC Copy Router & Lock-Hole Milling Machine (X-Z Axis)',
    titleHi: 'वर्टिकल CNC कॉपी राउटर और लॉक-होल मिलिंग मशीन (X-Z Axis)',
    machineSpecEn: 'Digital HMI Touchscreen · High-RPM Milling Spindle · Espagnolette Lock & Water Slot Routing',
    machineSpecHi: 'डिजिटल टचस्क्रीन पैनल · हाई-स्पीड स्पिंडल · मल्टी-पॉइंट लॉक व ड्रेनेज स्लॉट मिलिंग',
    descriptionEn:
      'Our specialized Vertical Copy Router & Lock-Hole Drilling Machine featuring precision X and Z axis slides, pneumatic vertical clamps, and a top-mounted digital HMI control screen. This machine mills exact slots for multi-point espagnolette locks, concealed handles, hinges, and rainwater drainage channels in both uPVC and system aluminium profiles.',
    descriptionHi:
      'हमारी विशेष वर्टिकल CNC कॉपी राउटर और लॉक-होल ड्रिलिंग मशीन, जिसमें X और Z एक्सिस हेड व ऊपर डिजिटल कंट्रोल स्क्रीन लगी है। यह मशीन uPVC और सिस्टम एल्युमीनियम खिड़कियों में मल्टी-पॉइंट लॉक, हैंडल और बारिश के पानी की निकासी (ड्रेनेज स्लॉट) के लिए बिल्कुल सटीक जगह बनाती है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0060_5c715483.jpg',
    createdAt: 1730100011000,
  },
  {
    id: 'ws-12',
    bayCode: 'CNC BAY · 12',
    category: 'CNC Cutting & Milling',
    titleEn: 'Mullion End-Milling Machine & CNC Routing Station',
    titleHi: 'मुलियन एंड-मिलिंग (End-Milling) मशीन और CNC राउटिंग स्टेशन',
    machineSpecEn: 'T-Joint Mullion Profiling · Rotary Cutter Block · Surrounded by uPVC & Aluminium Stock',
    machineSpecHi: 'T-जॉइंट मुलियन प्रोफाइलिंग · रोटरी कटर · uPVC व एल्युमीनियम स्टॉक',
    descriptionEn:
      'Foreground view of the Mullion End-Milling Machine (with red/green pushbutton switch box and pneumatic clamping block) used to step-mill transom and mullion ends for watertight T-joints, with the vertical CNC copy router and tall racks of white and black window profiles in the background.',
    descriptionHi:
      'सामने दिखाई दे रही एंड-मिलिंग (End-Milling) मशीन खिड़कियों के बीच के डिवाइडर (Mullion/T-joint) को सटीक आकार देने के काम आती है, और इसके ठीक पीछे वर्टिकल कॉपी राउटर मशीन तथा सफेद uPVC व ब्लैक एल्युमीनियम प्रोफाइल का स्टॉक रखा है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0069_f744c36a.jpg',
    createdAt: 1730100012000,
  },
  {
    id: 'ws-13',
    bayCode: 'CNC BAY · 13',
    category: 'CNC Cutting & Milling',
    titleEn: 'V-Notch Corner Cutting & uPVC Profile Preparation Zone',
    titleHi: 'V-नॉच कॉर्नर कटिंग मशीन और uPVC प्रोफाइल तैयारी ज़ोन',
    machineSpecEn: 'Protective-Taped White uPVC Extrusions · V-Cleaning Saw · CNC Router Bay',
    machineSpecHi: 'प्रोटेक्टिव टेप लगे सफेद uPVC प्रोफाइल · V-नॉच कटर · CNC राउटर बे',
    descriptionEn:
      'Profile preparation bay packed with factory-wrapped white uPVC window extrusions in the foreground, the V-notch mullion cutting machine on the left, and the vertical lock-hole copy router at the rear — ensuring rapid workflow from raw extrusion to milled frame.',
    descriptionHi:
      'प्रोफाइल तैयारी ज़ोन जहां सामने प्रोटेक्टिव टेप में लिपटे सफेद uPVC प्रोफाइल के बंडल रखे हैं, बाईं ओर V-नॉच कटिंग मशीन है और पीछे लॉक-होल राउटर मशीन लगी हुई है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0054_00f5556f.jpg',
    createdAt: 1730100013000,
  },
  {
    id: 'ws-14',
    bayCode: 'WELDING BAY · 14',
    category: 'uPVC Thermal Welding',
    titleEn: 'Double-Head Seamless uPVC Thermal Corner Welding Machine (Close-Up)',
    titleHi: 'डबल-हेड सीमलेस uPVC थर्मल कॉर्नर वेल्डिंग मशीन (क्लोज-अप)',
    machineSpecEn: 'Dual Temperature PID Controllers · Analog Pressure Gauges · 90° Thermal Fusion Plates',
    machineSpecHi: 'डिजिटल तापमान कंट्रोलर · ड्यूल प्रेशर गेज · 90° थर्मल फ्यूजन प्लेट',
    descriptionEn:
      'Detailed close-up of our Double-Head uPVC Thermal Welding Machine showing the heated Teflon fusion plates, dual analog pneumatic pressure gauges, digital PID temperature controllers, and folding aluminum support arms. This machine thermally fuses uPVC window corners at ~250°C for permanently leak-proof, high-strength joints.',
    descriptionHi:
      'हमारी डबल-हेड uPVC थर्मल वेल्डिंग मशीन का नजदीकी फोटो, जिसमें डिजिटल तापमान कंट्रोलर, दो प्रेशर गेज, हीटेड टेफ्लॉन प्लेट और प्रोफाइल सपोर्ट आर्म साफ दिख रहे हैं। यह मशीन ~250°C तापमान पर uPVC खिड़कियों के कोनों को पिघलाकर हमेशा के लिए लीक-प्रूफ और मजबूत जोड़ बनाती है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0058_ff86d780.jpg',
    createdAt: 1730100014000,
  },
  {
    id: 'ws-15',
    bayCode: 'WELDING BAY · 15',
    category: 'uPVC Thermal Welding',
    titleEn: 'Long-Bed uPVC Welding Line, Twin-Cylinder Air Compressor & ENcraft Profiles',
    titleHi: 'लॉन्ग-बेड uPVC वेल्डिंग लाइन, हैवी एयर कंप्रेसर और ENcraft प्रोफाइल स्टॉक',
    machineSpecEn: 'ENcraft "Art of Precision" uPVC Profiles · Industrial Air Compressor · Twin Welding Heads',
    machineSpecHi: 'ENcraft ओरिजिनल uPVC प्रोफाइल · इंडस्ट्रियल एयर कंप्रेसर · ट्विन वेल्डिंग हेड',
    descriptionEn:
      'Full view of the uPVC Thermal Welding station flanked by genuine factory-taped ENcraft uPVC Door & Window Profiles ("Art of Precision") on the left and a heavy-duty green twin-cylinder industrial air compressor in the center background that powers all pneumatic clamps across the plant.',
    descriptionHi:
      'uPVC थर्मल वेल्डिंग स्टेशन का पूरा दृश्य, जहां बाईं ओर ओरिजिनल "ENcraft - Art of Precision" ब्रांड के टेप लगे uPVC प्रोफाइल रखे हैं और पीछे हरे रंग का हैवी-ड्यूटी ट्विन-सिलेंडर एयर कंप्रेसर लगा है जो पूरी वर्कशॉप की न्यूमैटिक मशीनों को प्रेशर सप्लाई करता है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0063_d86bc0b7.jpg',
    createdAt: 1730100015000,
  },
  {
    id: 'ws-16',
    bayCode: 'WELDING BAY · 16',
    category: 'uPVC Thermal Welding',
    titleEn: 'Twin-Head uPVC Welding Machine & Pneumatic Power Supply Unit',
    titleHi: 'ट्विन-हेड uPVC वेल्डिंग मशीन और न्यूमैटिक पावर सप्लाई यूनिट',
    machineSpecEn: 'Linear Rail Right Welding Head · Foot Pedal Actuation · Wrapped uPVC Bundles',
    machineSpecHi: 'लीनियर रेल वेल्डिंग हेड · फुट पेडल कंट्रोल · पैक्ड uPVC प्रोफाइल बंडल',
    descriptionEn:
      'Wide angle of the Twin-Head uPVC Welding Line illustrating the movable right welding head on its guide rails, operator foot pedal at the base, wrapped white uPVC profile bundles stacked in front, and electrical distribution switchboards on the workshop wall.',
    descriptionHi:
      'ट्विन-हेड uPVC वेल्डिंग लाइन का चौड़ा दृश्य, जिसमें गाइड रेल पर चलने वाला दायां वेल्डिंग हेड, नीचे ऑपरेटर फुट-पेडल, सामने रखे सफेद uPVC प्रोफाइल के बंडल और दीवार पर लगे मेन इलेक्ट्रिक कंट्रोल पैनल दिख रहे हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0071_1accc4db.jpg',
    createdAt: 1730100016000,
  },
  {
    id: 'ws-17',
    bayCode: 'WELDING BAY · 17',
    category: 'uPVC Thermal Welding',
    titleEn: 'uPVC Corner Welding Station with Completed Mosquito-Mesh Window Sashes',
    titleHi: 'uPVC कॉर्नर वेल्डिंग स्टेशन और तैयार मच्छर-जाली (Mosquito Mesh) विंडो पल्ले',
    machineSpecEn: 'Black Anodized Mesh Sashes · Stainless Steel Pleated/Wire Mesh · uPVC Welding Line',
    machineSpecHi: 'ब्लैक मच्छर-जाली पल्ले · स्टेनलेस स्टील वायर मेश · uPVC वेल्डिंग लाइन',
    descriptionEn:
      'View of the uPVC welding bay with completed black powder-coated window sashes fitted with stainless-steel mosquito mesh resting on the green floor mat in the foreground, alongside stacked white uPVC extrusions ready for thermal fusion.',
    descriptionHi:
      'uPVC वेल्डिंग बे के सामने हरे मैट पर रखे हुए तैयार ब्लैक विंडो पल्ले जिनमें स्टेनलेस स्टील मच्छर जाली (Mosquito Mesh) फिट की जा चुकी है, और पास ही वेल्डिंग के लिए तैयार सफेद uPVC प्रोफाइल रखे हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0079_1f7d65fa.jpg',
    createdAt: 1730100017000,
  },
  {
    id: 'ws-18',
    bayCode: 'ASSEMBLY · 18',
    category: 'Active Fabrication',
    titleEn: 'Active Slim-Profile Aluminium Frame Assembly & Hardware Fitting Workbench',
    titleHi: 'स्लिम-प्रोफाइल एल्युमीनियम फ्रेम असेंबली और हार्डवेयर फिटिंग वर्कबेंच',
    machineSpecEn: 'Matte Black Slim Extrusions · Circular Saw Blade · Weather Silicone Gun · Mezzanine Stock',
    machineSpecHi: 'मैट-ब्लैक स्लिम प्रोफाइल · सर्कुलर सॉ ब्लेड · सिलिकॉन सीलेंट गन · मेज़ानाइन स्टोरेज',
    descriptionEn:
      'Inside view of our active frame assembly workbench showing matte-black architectural aluminium profiles being joined, a precision TCT circular saw blade, structural weather-sealant silicone gun, yellow hardware fastener tray, and the upper mezzanine floor stocked with wrapped raw profile bundles.',
    descriptionHi:
      'हमारी एक्टिव फ्रेम असेंबली टेबल का लाइव दृश्य, जहां मैट-ब्लैक एल्युमीनियम प्रोफाइल जोड़े जा रहे हैं। टेबल पर सर्कुलर सॉ ब्लेड, वेदर-सीलेंट सिलिकॉन गन, हार्डवेयर टूल बॉक्स और ऊपर मेज़ानाइन फ्लोर पर रखा कच्चे माल का भारी स्टॉक साफ दिखाई दे रहा है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0055_88ed8a36.jpg',
    createdAt: 1730100018000,
  },
  {
    id: 'ws-19',
    bayCode: 'ASSEMBLY · 19',
    category: 'Active Fabrication',
    titleEn: 'Green-Felt Glass Glazing, EPDM Gasket Sealing & Finishing Table',
    titleHi: 'ग्रीन-फेल्ट ग्लास ग्लेजिंग, EPDM रबर गास्केट और फिनिशिंग टेबल',
    machineSpecEn: 'Scratch-Free Green Felt Table · EPDM Weather Gaskets · Silicone Applicator · Profile Racks',
    machineSpecHi: 'स्क्रैच-फ्री ग्रीन फेल्ट टेबल · EPDM रबर गास्केट · सिलिकॉन गन · वर्टिकल प्रोफाइल रैक',
    descriptionEn:
      'Our dedicated central glazing and finishing table padded with thick green industrial felt to protect glass and coated frames. On the table are EPDM rubber gasket rolls, silicone sealant applicators, mallets, and measuring tools, flanked by the Double-Head CNC Saw on the left and vertical profile racks at the rear.',
    descriptionHi:
      'वर्कशॉप के बीच में स्थित हमारी मुख्य ग्लेजिंग और फिनिशिंग टेबल, जिस पर कांच और फ्रेम को खरोंच से बचाने के लिए मोटा हरा फेल्ट (कपड़ा) बिछाया गया है। टेबल पर EPDM रबर गास्केट, सिलिकॉन गन और फिटिंग टूल्स रखे हैं, तथा बाईं ओर डबल-हेड कटिंग मशीन दिख रही है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0065_8c5d036b.jpg',
    createdAt: 1730100019000,
  },
  {
    id: 'ws-20',
    bayCode: 'FACTORY FLOOR · 20',
    category: 'Active Fabrication',
    titleEn: 'Wide-Angle Panorama of the Complete Automated Hisar Fabrication Floor',
    titleHi: 'हिसार ऑटोमेटेड फैब्रिकेशन वर्कशॉप फ्लोर का पूर्ण पैनोरमा दृश्य',
    machineSpecEn: 'Left: Double-Head CNC Cutting Line · Center: Glazing Table & Mesh Sashes · Right: uPVC Welding Line',
    machineSpecHi: 'बाएं: डबल-हेड CNC कटिंग लाइन · मध्य: ग्लेजिंग टेबल व तैयार पल्ले · दाएं: uPVC वेल्डिंग लाइन',
    descriptionEn:
      'Comprehensive floor-to-ceiling panorama of our Hisar manufacturing plant showing the parallel industrial workflow: the Double-Head CNC Profile Cutting Line on the left, the central green-felt glazing bench and finished mosquito-mesh sashes in the middle, and the Twin-Head uPVC Thermal Welding Line on the right.',
    descriptionHi:
      'हमारी हिसार वर्कशॉप के पूरे फ्लोर का चौड़ा (Panorama) दृश्य, जिसमें एक साथ पूरी प्रोडक्शन लाइन दिखती है — बाईं तरफ डबल-हेड CNC कटिंग मशीन, बीच में ग्रीन ग्लेजिंग टेबल व तैयार जाली वाले पल्ले, और दाईं तरफ ट्विन-हेड uPVC थर्मल वेल्डिंग मशीन।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0067_74b8e69d.jpg',
    createdAt: 1730100020000,
  },
  {
    id: 'ws-21',
    bayCode: 'FACTORY FLOOR · 21',
    category: 'Active Fabrication',
    titleEn: 'Parallel Production Bays — Batch Window Sash & Frame Staging Area',
    titleHi: 'पैरेलल प्रोडक्शन बे — बैच विंडो फ्रेम और पल्लों का स्टेजिंग एरिया',
    machineSpecEn: 'High-Volume Kothi & Project Orders · Green Carpet Staging · Multi-Machine Layout',
    machineSpecHi: 'कोठी व प्रोजेक्ट ऑर्डर · ग्रीन कार्पेट स्टेजिंग · मल्टी-मशीन लेआउट',
    descriptionEn:
      'Production staging view across the green-carpeted workshop floor where multiple black aluminium and white uPVC window sashes are queued after cutting and welding, awaiting toughened glass insertion and multi-point lock testing.',
    descriptionHi:
      'वर्कशॉप के हरे मैट वाले फ्लोर का दृश्य जहां कटिंग और वेल्डिंग के बाद कई ब्लैक एल्युमीनियम और सफेद uPVC विंडो पल्ले ग्लास फिटिंग और लॉक टेस्टिंग के लिए कतार में रखे गए हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0064_ad6f5108.jpg',
    createdAt: 1730100021000,
  },
  {
    id: 'ws-22',
    bayCode: 'FACTORY FLOOR · 22',
    category: 'Active Fabrication',
    titleEn: 'End-to-End Fenestration Plant Layout & Overhead Mezzanine Storage',
    titleHi: 'एंड-टू-एंड विंडो फैब्रिकेशन प्लांट लेआउट और ओवरहेड स्टोरेज',
    machineSpecEn: 'Integrated Cutting, Milling, Welding & Glazing under One Roof in Hisar',
    machineSpecHi: 'हिसार में एक ही छत के नीचे कटिंग, मिलिंग, वेल्डिंग और ग्लेजिंग की संपूर्ण सुविधा',
    descriptionEn:
      'Another wide perspective of the Haryana Window Mart factory floor demonstrating how raw 20-foot aluminium and uPVC profiles enter from the storage racks, pass through CNC cutting, routing, and thermal welding, and arrive at the central glazing station with zero outsourcing.',
    descriptionHi:
      'हरियाणा विंडो मार्ट की फैक्ट्री का एक और विहंगम दृश्य, जो दर्शाता है कि कैसे एक ही छत के नीचे कच्चे प्रोफाइल से लेकर CNC कटिंग, राउटिंग, वेल्डिंग और ग्लास ग्लेजिंग तक का सारा काम बिना किसी बाहरी निर्भरता के इन-हाउस किया जाता है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0070_08db398f.jpg',
    createdAt: 1730100022000,
  },
  {
    id: 'ws-23',
    bayCode: 'SHOWROOM · 23',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Live Showroom Display — Full-Length Arch & Warm-Gold Backlit LED Mirrors',
    titleHi: 'लाइव शोरूम डिस्प्ले — फुल-लेंथ आर्च (Arch) और गोल्ड बैकलिट एलईडी मिरर',
    machineSpecEn: 'Triple-Line & Single-Line Frosted Arch Mirrors · Blue Smart Touch Sensor · Warm Gold Round Mirror',
    machineSpecHi: 'ट्रिपल-लाइन व सिंगल-लाइन आर्च LED मिरर · स्मार्ट टच सेंसर · वार्म-गोल्ड राउंड मिरर',
    descriptionEn:
      'Inside our Hisar showroom gallery: a textured brick display wall featuring illuminated full-length Arch LED Dressing Mirrors (both triple-border and single-border sandblasted light strips with glowing blue smart touch-sensor switches), a rectangular backlit mirror, and a warm-gold round vanity mirror.',
    descriptionHi:
      'हमारे हिसार शोरूम के अंदर की डिस्प्ले दीवार, जहां फुल-लेंथ आर्च (Arch) शेप के बैकलिट एलईडी ड्रेसिंग मिरर (ट्रिपल-लाइन और सिंगल-लाइन लाइट बॉर्डर व नीले टच-सेंसर बटन के साथ), आयताकार LED मिरर और सुनहरी रोशनी वाला राउंड मिरर लाइव देखे जा सकते हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0068_4d315855.jpg',
    createdAt: 1730100023000,
  },
  {
    id: 'ws-24',
    bayCode: 'SHOWROOM · 24',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Custom Round Warm-Gold Backlit LED Vanity Mirror with Perimeter Dots',
    titleHi: 'कस्टम राउंड वार्म-गोल्ड बैकलिट एलईडी वैनिटी मिरर (स्मार्ट टच सेंसर सहित)',
    machineSpecEn: '3000K Warm Gold Halo + Sandblasted Dot Pattern · Touch Dimmer & Defogger · Digital Clock Above',
    machineSpecHi: '3000K वार्म गोल्ड लाइट + डॉट पैटर्न · टच डिमर व डिफॉगर · ऊपर डिजिटल क्लॉक',
    descriptionEn:
      'Close-up of a custom-fabricated circular LED vanity mirror mounted in our showroom, featuring an etched outer ring with illuminated perimeter dots, warm 3000K golden halo backlighting, an integrated touch-sensor switch at the bottom, and a digital LED wall clock/thermometer mounted above.',
    descriptionHi:
      'हमारे शोरूम में लगे कस्टम राउंड एलईडी वैनिटी मिरर का क्लोज-अप, जिसमें चारों तरफ चमकते डॉट पैटर्न, 3000K वार्म-गोल्ड बैकलाइट, नीचे स्मार्ट टच-सेंसर स्विच और ऊपर डिजिटल घड़ी व तापमान मीटर लगा हुआ है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0056_520e7fd4.jpg',
    createdAt: 1730100024000,
  },
  {
    id: 'ws-25',
    bayCode: 'SHOWROOM · 25',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Triple-Border Warm-White Arch LED Mirror & Hardware Inventory Reflection',
    titleHi: 'ट्रिपल-बॉर्डर वार्म-व्हाइट आर्च एलईडी मिरर और हार्डवेयर स्टॉक रैक',
    machineSpecEn: '3-Line Sandblasted Arch Mirror · Touch Switch · Showroom Hardware Shelves & uPVC Sample',
    machineSpecHi: '3-लाइन आर्च LED ड्रेसिंग मिरर · टच स्विच · शोरूम हार्डवेयर रैक व uPVC सैंपल',
    descriptionEn:
      'Showroom display of our signature Triple-Border Warm-White Arch LED Dressing Mirror. In the mirror’s HD reflection, you can see our floor-to-ceiling showroom inventory shelves stocked with architectural door locks, hinges, rollers, and sealants, while a white uPVC sliding window sample and ACP shade chart stand right beside it.',
    descriptionHi:
      'हमारे सिग्नेचर ट्रिपल-बॉर्डर वार्म-व्हाइट आर्च (Arch) एलईडी ड्रेसिंग मिरर का फोटो। इस HD मिरर के प्रतिबिंब में हमारे शोरूम के रैक दिख रहे हैं जो ओरिजिनल लॉक, हिंज, रोलर और हार्डवेयर बॉक्स से भरे हैं, और पास ही सफेद uPVC विंडो सैंपल व ACP कलर चार्ट रखा है।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0053_7f4c65f2.jpg',
    createdAt: 1730100025000,
  },
  {
    id: 'ws-26',
    bayCode: 'SHOWROOM · 26',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Daylight Showroom Corner — Diamond Bevelled Wall Mirror & Arch LED Collection',
    titleHi: 'शोरूम डिस्प्ले कॉर्नर — डायमंड बेवल्ड वॉल मिरर और आर्च एलईडी कलेक्शन',
    machineSpecEn: 'Faceted Diamond-Grid Bevelled Mirror · Arch LED Mirrors · Sample Window Frames',
    machineSpecHi: 'डायमंड-ग्रिड बेवल्ड डेकोरेटिव मिरर · आर्च LED मिरर · सैंपल विंडो फ्रेम',
    descriptionEn:
      'Daylight view of our showroom corner displaying a custom Venetian/diamond-grid bevelled decorative wall mirror on the left brick wall, flanked by twin Arch LED mirrors, a round backlit mirror, and sample uPVC & black aluminium window frames resting at the base.',
    descriptionHi:
      'दिन की रोशनी में हमारे शोरूम के डिस्प्ले कॉर्नर का दृश्य, जहां बाईं दीवार पर कस्टम डायमंड-कट बेवल्ड डेकोरेटिव मिरर लगा है, साथ में दो आर्च LED मिरर, राउंड मिरर और नीचे सैंपल uPVC व ब्लैक एल्युमीनियम विंडो फ्रेम रखे हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0073_6d869338.jpg',
    createdAt: 1730100026000,
  },
  {
    id: 'ws-27',
    bayCode: 'SHOWROOM · 27',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Evening Illuminated Mirror Gallery & Office Glass Samples Table',
    titleHi: 'शाम के समय जगमगाती एलईडी मिरर गैलरी और ग्लास सैंपल टेबल',
    machineSpecEn: '6000K Cool White & 3000K Warm Gold LED Mirrors · Bevelled Glass Samples Reflected Inside',
    machineSpecHi: '6000K कूल व्हाइट व 3000K वार्म गोल्ड LED मिरर · अंदर दिखती ग्लास सैंपल टेबल',
    descriptionEn:
      'Evening view of the illuminated mirror gallery looking toward the street entrance. Through the crystal-clear reflection of the tall Arch LED mirror, our showroom consultation desk and rack of bevelled/frosted glass samples are clearly visible.',
    descriptionHi:
      'शाम के समय रोशनी से जगमगाती हमारी मिरर गैलरी का दृश्य। बड़े आर्च LED मिरर के अंदर शोरूम की कंसल्टेशन टेबल और उस पर रखे विभिन्न बेवल्ड व फ्रॉस्टेड ग्लास सैंपल साफ दिखाई दे रहे हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0077_ed3ee886.jpg',
    createdAt: 1730100027000,
  },
  {
    id: 'ws-28',
    bayCode: 'SHOWROOM · 28',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Full-Height Triple-Line Arch Dressing Mirror & Composite Panel Chart',
    titleHi: 'फुल-हाइट ट्रिपल-लाइन आर्च ड्रेसिंग मिरर और ACP पैनल शेड चार्ट',
    machineSpecEn: 'Custom Height Dressing Mirror · Dual-Tone LED · ACP Cladding & uPVC Corner Samples',
    machineSpecHi: 'फुल-हाइट ड्रेसिंग मिरर · ड्यूल-टोन LED · ACP क्लैडिंग व uPVC सैंपल',
    descriptionEn:
      'Full vertical view of the triple-strip Arch LED Dressing Mirror switched on in warm-white mode, positioned next to our Aluminum Composite Panel (ACP) specification board and white uPVC window sash samples.',
    descriptionHi:
      'वार्म-व्हाइट मोड में ऑन किए गए फुल-हाइट ट्रिपल-लाइन आर्च ड्रेसिंग मिरर का पूरा वर्टिकल फोटो, जिसके पास ACP क्लैडिंग पैनल का बोर्ड और सफेद uPVC विंडो के सैंपल रखे हैं।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0066_c1f5f4bb.jpg',
    createdAt: 1730100028000,
  },
  {
    id: 'ws-29',
    bayCode: 'SHOWROOM · 29',
    category: 'Showroom & LED Mirrors',
    titleEn: 'Showroom Display Wall — Unlit Mirror Craftsmanship & Bevelled Glass Detailing',
    titleHi: 'शोरूम डिस्प्ले वॉल — मिरर पॉलिशिंग और डायमंड बेवलिंग की बारीक कारीगरी',
    machineSpecEn: 'Precision Sandblasted Frosted Strips · Diamond-Cut Bevelled Tiles · Copper-Free Silver Mirror',
    machineSpecHi: 'सटीक सैंडब्लास्टेड फ्रॉस्टेड पट्टियां · डायमंड-कट बेवल्ड टाइल्स · कॉपर-फ्री मिरर',
    descriptionEn:
      'Daytime inspection of our mirror display wall with the LED backlights turned off so customers can examine the raw glass craftsmanship — showing the razor-sharp sandblasted frosting lines, diamond-polished edges, and faceted bevelled mirror tiles.',
    descriptionHi:
      'दिन के समय बिना लाइट ऑन किए हमारे मिरर डिस्प्ले वॉल का फोटो, जिससे ग्राहक कांच की असली कारीगरी, सैंडब्लास्टेड फ्रॉस्टिंग की सफाई, डायमंड-पॉलिश किनारों और बेवल्ड मिरर की फिनिशिंग को करीब से परख सकें।',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0059_736d0535.jpg',
    createdAt: 1730100029000,
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    titleEn: '3-Track Soundproof ENcraft uPVC Sliding Window with SS Mesh',
    titleHi: '3-ट्रैक साउंडप्रूफ ENcraft uPVC स्लाइडिंग विंडो (SS जाली सहित)',
    descriptionEn:
      'Fabricated on our Hisar Twin-Head Thermal Welding Line using genuine ENcraft multi-chamber UV-resistant uPVC profiles, galvanized steel reinforcement, DGU toughened glass, and stainless-steel mosquito mesh.',
    descriptionHi:
      'हमारी हिसार वर्कशॉप की थर्मल वेल्डिंग मशीन पर ओरिजिनल ENcraft मल्टी-चैम्बर uPVC प्रोफाइल, स्टील रिइंफोर्समेंट, डबल-ग्लेज्ड टफन्ड ग्लास और स्टेनलेस स्टील मच्छर जाली के साथ निर्मित प्रीमियम विंडो।',
    category: 'uPVC',
    badgeEn: 'ENcraft Profile · Acoustic 40dB',
    badgeHi: 'ENcraft प्रोफाइल · 40dB साउंडप्रूफ',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0079_1f7d65fa.jpg',
    active: true,
    createdAt: 1730000100000,
  },
  {
    id: 'prod-2',
    titleEn: '16mm Matte-Black & Gold Ultra-Slim Fluted Glass Partition',
    titleHi: '16mm मैट-ब्लैक व गोल्ड अल्ट्रा-स्लिम फ्लूटेड ग्लास पार्टीशन',
    descriptionEn:
      'Zero-bottom-track synchronized sliding partition in Matte Black & Champagne Gold slim aluminium profile with 8mm fluted & clear tempered glass, precision cut on our Double-Head CNC Mitre Saw.',
    descriptionHi:
      'बिना नीचे के ट्रैक वाला सिंक्रोनाइज्ड स्लाइडिंग पार्टीशन — हमारी CNC मशीन पर तैयार मैट ब्लैक और शैम्पेन गोल्ड स्लिम फ्रेम व फ्लूटेड टफन्ड ग्लास के साथ।',
    category: 'Slim Profile',
    badgeEn: 'Signature Luxury · 16mm Frame',
    badgeHi: 'लग्जरी पसंद · 16mm स्लिम फ्रेम',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0055_88ed8a36.jpg',
    active: true,
    createdAt: 1730000200000,
  },
  {
    id: 'prod-3',
    titleEn: 'Triple-Border Arch & Round Smart Touch-Sensor Backlit LED Mirror',
    titleHi: 'ट्रिपल-बॉर्डर आर्च और राउंड स्मार्ट टच-सेंसर बैकलिट एलईडी मिरर',
    descriptionEn:
      '5mm copper-free HD mirror crafted in our Hisar plant with triple/single sandblasted light borders, 3-color touch dimmer (Warm 3000K / Natural / Cool 6000K), anti-fog heater pad, and diamond-polished edges.',
    descriptionHi:
      'हमारे हिसार शोरूम में तैयार 5mm कॉपर-फ्री HD आर्च व राउंड मिरर — 3-कलर टच डिमर लाइट (वार्म गोल्ड/नेचुरल/व्हाइट), एंटी-फॉग हीटर पैड और डायमंड-पॉलिश एज फिनिश के साथ।',
    category: 'Mirrors',
    badgeEn: 'In-House Showroom · Smart Touch HD',
    badgeHi: 'लाइव शोरूम उपलब्ध · स्मार्ट टच मिरर',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0068_4d315855.jpg',
    active: true,
    createdAt: 1730000300000,
  },
  {
    id: 'prod-4',
    titleEn: 'Matte-Black Powder-Coated System Aluminium Casement & Villa Doors',
    titleHi: 'मैट-ब्लैक पाउडर-कोटेड सिस्टम एल्युमीनियम विंडो और विला डोर',
    descriptionEn:
      'Wide-span multi-leaf bi-folding and sliding aluminium door systems cut on our 6-meter CNC Double-Head Saw and routed on our Vertical Copy Router for multi-point espagnolette locking.',
    descriptionHi:
      'हमारी 6-मीटर डबल-हेड CNC मशीन और कॉपी राउटर पर तैयार किए गए हैवी-ड्यूटी मैट-ब्लैक सिस्टम एल्युमीनियम दरवाजे और खिड़कियां — मल्टी-पॉइंट लॉक और DGU ग्लास के साथ।',
    category: 'Aluminium',
    badgeEn: 'CNC Mitre Cut · Villa Series',
    badgeHi: 'CNC निर्मित · विला सीरीज',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0061_77655931.jpg',
    active: true,
    createdAt: 1730000400000,
  },
  {
    id: 'prod-5',
    titleEn: '12mm Frameless Toughened Glass Balcony & Staircase Railing',
    titleHi: '12mm फ्रेमलेस टफन्ड ग्लास बालकनी और सीढ़ी रेलिंग',
    descriptionEn:
      'Architectural clear or sentry-laminated 12mm Gold Plus toughened safety glass mounted on heavy-duty SS304 spigots or continuous concealed aluminium U-channels with PVD Gold handrail.',
    descriptionHi:
      'हैवी-ड्यूटी SS304 स्पिगोट या कंटीन्यूअस एल्युमीनियम यू-चैनल और PVD गोल्ड हैंडरेल के साथ 12mm फ्रेमलेस टफन्ड सेफ्टी ग्लास रेलिंग।',
    category: 'Railings',
    badgeEn: 'ISI 12mm Tempered · SS304',
    badgeHi: 'ISI 12mm टफन्ड · SS304 ग्रेड',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0076_51ee043d.jpg',
    active: true,
    createdAt: 1730000500000,
  },
  {
    id: 'prod-6',
    titleEn: 'Venetian Diamond-Grid Bevelled Decorative Wall Mirror',
    titleHi: 'डायमंड-ग्रिड बेवल्ड डेकोरेटिव ड्राइंग रूम वॉल मिरर',
    descriptionEn:
      'Hand-crafted faceted diamond-cut bevelled mirror panels custom-sized for luxury drawing rooms, dining lobbies, and hotel receptions across Haryana.',
    descriptionHi:
      'आलीशान ड्राइंग रूम, लॉबी और होटल रिसेप्शन की दीवारों के लिए कस्टम साइज में तैयार डायमंड-कट बेवल्ड डेकोरेटिव मिरर पैनल।',
    category: 'Mirrors',
    badgeEn: 'Custom Bevelled · Luxury Decor',
    badgeHi: 'डायमंड बेवल्ड · लग्जरी इंटीरियर',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0073_6d869338.jpg',
    active: true,
    createdAt: 1730000600000,
  },
  {
    id: 'prod-7',
    titleEn: 'Bulk Gold Plus Float & ISI Toughened Architectural Glass Supply',
    titleHi: 'Gold Plus फ्लोट ग्लास और ISI टफन्ड ग्लास (होलसेल व प्रोजेक्ट सप्लाई)',
    descriptionEn:
      'Direct supply and custom CNC fabrication of 5mm to 12mm Gold Plus clear float glass, tinted glass, reflective facade glass, and DGU insulated units from our Hisar Glass Godown.',
    descriptionHi:
      'हमारे हिसार स्थित हरियाणा ग्लास गोदाम से 5mm से 12mm Gold Plus क्लियर फ्लोट ग्लास, टिंटेड ग्लास, रिफ्लेक्टिव ग्लास और टफन्ड ग्लास की सीधी प्रोजेक्ट सप्लाई।',
    category: 'Toughened Glass',
    badgeEn: 'Direct Godown Stock · Gold Plus',
    badgeHi: 'सीधा गोदाम स्टॉक · Gold Plus ग्लास',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0075_82012555.jpg',
    active: true,
    createdAt: 1730000700000,
  },
  {
    id: 'prod-8',
    titleEn: 'Acoustic Frameless Office Cabin & Shower Glass Partition System',
    titleHi: 'साउंडप्रूफ फ्रेमलेस ऑफिस केबिन और बाथरूम शॉवर ग्लास पार्टीशन',
    descriptionEn:
      '10mm / 12mm toughened glass corporate cabin enclosures and L-shape wet/dry bathroom shower cubicles with Dorma/Ozone hydraulic patch fittings and PVD Gold / Black hardware.',
    descriptionHi:
      'ऑफिस केबिन और बाथरूम शॉवर क्यूबिकल के लिए 10mm/12mm टफन्ड ग्लास पार्टीशन — प्रीमियम हाइड्रोलिक पैच फिटिंग और PVD गोल्ड/ब्लैक हार्डवेयर सहित।',
    category: 'Partitions',
    badgeEn: 'Commercial & Villa · 10mm/12mm',
    badgeHi: 'कमर्शियल व विला · 10mm/12mm',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0053_7f4c65f2.jpg',
    active: true,
    createdAt: 1730000800000,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    titleEn: 'Haryana Glass Fabricator 3-Storey Showroom & Timber-Glass Facade',
    titleHi: 'हरियाणा ग्लास फैब्रीकेटर 3-मंजिला शोरूम और वुडन-ग्लास फसाड',
    cityEn: 'Nirankari Bhawan Road, Hisar',
    cityHi: 'निरंकारी भवन रोड, हिसार',
    category: 'Commercial Elevation & Toughened Glass',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0076_51ee043d.jpg',
    createdAt: 1730001000000,
  },
  {
    id: 'gal-2',
    titleEn: 'Custom Arch & Warm-Gold Backlit LED Vanity Mirror Wall Installation',
    titleHi: 'कस्टम आर्च और वार्म-गोल्ड बैकलिट एलईडी मिरर वॉल इंस्टॉलेशन',
    cityEn: 'Showroom Gallery, Hisar',
    cityHi: 'शोरूम गैलरी, हिसार',
    category: 'LED Mirrors & Decorative Glass',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0068_4d315855.jpg',
    createdAt: 1730002000000,
  },
  {
    id: 'gal-3',
    titleEn: 'Matte-Black System Aluminium Windows & Mosquito-Mesh Sash Batch',
    titleHi: 'मैट-ब्लैक सिस्टम एल्युमीनियम विंडो और मच्छर-जाली पल्लों का प्रोजेक्ट बैच',
    cityEn: 'Sector 14 & PLA Sector, Hisar',
    cityHi: 'सेक्टर 14 व पीएलए, हिसार',
    category: 'Aluminium Systems',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0061_77655931.jpg',
    createdAt: 1730003000000,
  },
  {
    id: 'gal-4',
    titleEn: 'ENcraft Soundproof uPVC Villa Windows & Doors Fabrication',
    titleHi: 'ENcraft साउंडप्रूफ uPVC विला विंडो और डोर प्रोजेक्ट',
    cityEn: 'Model Town, Rohtak & Hisar',
    cityHi: 'मॉडल टाउन, रोहतक व हिसार',
    category: 'uPVC Windows & Doors',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0063_d86bc0b7.jpg',
    createdAt: 1730004000000,
  },
  {
    id: 'gal-5',
    titleEn: 'Haryana Glass Godown — Vertical Fin Cladding & Bulk Float Storage',
    titleHi: 'हरियाणा ग्लास गोदाम — वर्टिकल फिन फसाड और बल्क ग्लास स्टोरेज',
    cityEn: 'Hisar Hub (Pan-Haryana Supply)',
    cityHi: 'हिसार हब (पूरे हरियाणा में सप्लाई)',
    category: 'Glass Godown & Facade',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0075_82012555.jpg',
    createdAt: 1730005000000,
  },
  {
    id: 'gal-6',
    titleEn: 'Diamond-Grid Bevelled Mirror & Triple-Border Arch Dressing Mirror',
    titleHi: 'डायमंड-ग्रिड बेवल्ड मिरर और ट्रिपल-बॉर्डर आर्च ड्रेसिंग मिरर',
    cityEn: 'Sector 15, Hisar',
    cityHi: 'सेक्टर 15, हिसार',
    category: 'Mirrors & Toughened Glass',
    imageUrl: '/assets/aistudio/IMG-20261112-WA0073_6d869338.jpg',
    createdAt: 1730006000000,
  },
];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'lead-101',
    fullName: 'Vikramjeet Sangwan',
    phone: '+91 98124 55320',
    city: 'Sector 14, Hisar',
    service: 'uPVC Windows and Doors',
    message:
      'Need 8 sets of 3-track ENcraft uPVC sliding windows with SS mesh for new kothi construction (approx 6x5 ft each).',
    status: 'New',
    createdAt: '11 Nov 2026, 10:15 AM',
    timestamp: 1762884900000,
  },
  {
    id: 'lead-102',
    fullName: 'CA Rohit Garg',
    phone: '+91 94162 88901',
    city: 'Model Town, Rohtak',
    service: 'Slim Profile (Ultra-slim architectural frames & partitions)',
    message:
      'Looking for 16mm Matte Black & Champagne Gold fluted glass sliding partition between lobby and drawing room (10ft x 9ft).',
    status: 'Contacted',
    createdAt: '10 Nov 2026, 04:40 PM',
    timestamp: 1762821600000,
  },
  {
    id: 'lead-103',
    fullName: 'Dr. Meenakshi Beniwal',
    phone: '+91 99911 43210',
    city: 'Karnal',
    service: 'Mirrors and Other Glass Products',
    message:
      'Saw your showroom Arch LED mirrors and Round Gold backlit mirror. Need 4 custom Arch mirrors + 12mm balcony toughened glass railing.',
    status: 'Completed',
    createdAt: '08 Nov 2026, 01:20 PM',
    timestamp: 1762636800000,
  },
];

export const INITIAL_CMS_STATE: CMSStoreState = {
  settings: DEFAULT_SITE_SETTINGS,
  services: INITIAL_SERVICES,
  products: INITIAL_PRODUCTS,
  workshop: INITIAL_WORKSHOP_ITEMS,
  gallery: INITIAL_GALLERY,
  inquiries: INITIAL_INQUIRIES,
};

export const PRODUCT_CATEGORIES: {
  key: ProductCategory;
  labelEn: string;
  labelHi: string;
}[] = [
  { key: 'All', labelEn: 'All Products', labelHi: 'सभी उत्पाद' },
  { key: 'uPVC', labelEn: 'uPVC Windows/Doors', labelHi: 'uPVC खिड़की/दरवाजे' },
  { key: 'Aluminium', labelEn: 'Aluminium Systems', labelHi: 'एल्युमीनियम सिस्टम' },
  { key: 'Slim Profile', labelEn: 'Slim Profile', labelHi: 'स्लिम प्रोफाइल' },
  { key: 'Toughened Glass', labelEn: 'Toughened Glass', labelHi: 'टफन्ड ग्लास' },
  { key: 'Partitions', labelEn: 'Partitions', labelHi: 'ग्लास पार्टीशन' },
  { key: 'Railings', labelEn: 'Railings & Facades', labelHi: 'रेलिंग और फसाड' },
  { key: 'Mirrors', labelEn: 'LED Mirrors', labelHi: 'एलईडी मिरर' },
];

export const WORKSHOP_CATEGORIES: {
  key: WorkshopCategory;
  labelEn: string;
  labelHi: string;
}[] = [
  { key: 'All', labelEn: 'All 29 Workshop Photos', labelHi: 'सभी 29 वर्कशॉप फोटो' },
  {
    key: 'Building & Godown',
    labelEn: '3-Storey Building & Glass Godown',
    labelHi: 'मुख्य बिल्डिंग और ग्लास गोदाम',
  },
  {
    key: 'CNC Cutting & Milling',
    labelEn: 'CNC Cutting & Milling Machines',
    labelHi: 'CNC कटिंग और राउटर मशीनें',
  },
  {
    key: 'uPVC Thermal Welding',
    labelEn: 'uPVC Thermal Welding Line',
    labelHi: 'uPVC थर्मल वेल्डिंग लाइन',
  },
  {
    key: 'Active Fabrication',
    labelEn: 'Glazing Table & Factory Floor',
    labelHi: 'ग्लेजिंग टेबल और फैक्ट्री फ्लोर',
  },
  {
    key: 'Showroom & LED Mirrors',
    labelEn: 'Showroom & LED Mirror Display',
    labelHi: 'शोरूम और एलईडी मिरर डिस्प्ले',
  },
];

export const HARYANA_CITIES_SUGGESTIONS = [
  'Hisar (हिसार)',
  'Gurugram (गुरुग्राम)',
  'Rohtak (रोहतक)',
  'Karnal (करनाल)',
  'Panipat (पानीपत)',
  'Ambala (अंबाला)',
  'Sirsa (सिरसा)',
  'Fatehabad (फतेहाबाद)',
  'Bhiwani (भिवानी)',
  'Jind (जींद)',
  'Sonipat (सोनीपत)',
  'Kurukshetra (कुरुक्षेत्र)',
  'Yamunanagar (यमुनानगर)',
  'Panchkula (पंचकूला)',
  'Rewari (रेवाड़ी)',
  'Jhajjar (झज्जर)',
  'Kaithal (कैथल)',
];
