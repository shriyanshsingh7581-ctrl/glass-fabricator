import {
  CustomerInquiry,
  Language,
  LeadStatus,
  ProductCategory,
  ProductItem,
  ServiceItem,
  WorkshopCategory,
  WorkshopItem,
} from '../types/cms';

/**
 * Normalizes any phone string into digits suitable for wa.me links.
 * Defaults 10-digit Indian numbers to prefix '91'.
 */
export function sanitizeWhatsAppNumber(rawPhone: string): string {
  const digits = (rawPhone || '').replace(/\D+/g, '');
  if (!digits) return '919467687662';
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Builds an official https://wa.me/<number>?text=<encoded> URL.
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = sanitizeWhatsAppNumber(phone);
  if (!message || !message.trim()) {
    return `https://wa.me/${cleanPhone}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Builds a pre-filled WhatsApp inquiry message for a specific core service.
 */
export function buildServiceWhatsAppMessage(
  service: Pick<ServiceItem, 'titleEn' | 'titleHi'>,
  lang: Language
): string {
  if (lang === 'hi') {
    return `नमस्ते हरियाणा ग्लास फैब्रिकेटर, मुझे "${service.titleHi}" (${service.titleEn}) के लिए कोटेशन और जानकारी चाहिए। कृपया संपर्क करें।`;
  }
  return `Hello Haryana Glass Fabricator, I would like to request a quotation and consultation for "${service.titleEn}". Please share details.`;
}

/**
 * Builds a pre-filled WhatsApp inquiry message for a specific product card.
 */
export function buildProductWhatsAppMessage(
  product: Pick<ProductItem, 'titleEn' | 'titleHi' | 'category'>,
  lang: Language
): string {
  if (lang === 'hi') {
    return `नमस्ते हरियाणा ग्लास फैब्रिकेटर, मुझे आपके प्रोडक्ट "${product.titleHi}" (श्रेणी: ${product.category}) के लिए कोटेशन चाहिए।`;
  }
  return `Hello Haryana Glass Fabricator, I am interested in "${product.titleEn}" (Category: ${product.category}). Please share quotation details.`;
}

/**
 * Builds a pre-filled WhatsApp message containing customer inquiry form details.
 */
export function buildInquiryWhatsAppMessage(
  inquiry: Pick<CustomerInquiry, 'fullName' | 'phone' | 'city' | 'service' | 'message'>,
  lang: Language
): string {
  const details = inquiry.message?.trim()
    ? inquiry.message.trim()
    : lang === 'hi'
      ? 'कोई अतिरिक्त माप नहीं लिखा गया'
      : 'Standard site measurement requested';

  if (lang === 'hi') {
    return [
      `नमस्ते हरियाणा ग्लास फैब्रिकेटर, नया कोटेशन अनुरोध:`,
      `• नाम: ${inquiry.fullName}`,
      `• मोबाइल: ${inquiry.phone}`,
      `• शहर/स्थान: ${inquiry.city}`,
      `• सेवा/प्रोडक्ट: ${inquiry.service}`,
      `• माप / विवरण: ${details}`,
    ].join('\n');
  }

  return [
    `Hello Haryana Glass Fabricator, New Quotation Request:`,
    `• Name: ${inquiry.fullName}`,
    `• Mobile: ${inquiry.phone}`,
    `• City/Location: ${inquiry.city}`,
    `• Service/Category: ${inquiry.service}`,
    `• Measurements/Details: ${details}`,
  ].join('\n');
}

export interface InquiryValidationInput {
  fullName: string;
  phone: string;
  city: string;
  service: string;
  message?: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: {
    fullName?: string;
    phone?: string;
    city?: string;
    service?: string;
  };
}

/**
 * Validates customer quotation inquiry form inputs.
 */
export function validateInquiryForm(
  input: InquiryValidationInput,
  lang: Language = 'en'
): InquiryValidationResult {
  const errors: InquiryValidationResult['errors'] = {};
  const trimmedName = (input.fullName || '').trim();
  const digits = (input.phone || '').replace(/\D+/g, '');
  const trimmedCity = (input.city || '').trim();
  const trimmedService = (input.service || '').trim();

  if (trimmedName.length < 2) {
    errors.fullName =
      lang === 'hi'
        ? 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)'
        : 'Please enter your full name (at least 2 characters)';
  }

  // Accept 10-digit Indian numbers or 12-digit with 91 prefix
  const isValidPhone =
    (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) ||
    (digits.length === 12 && /^91[6-9]\d{9}$/.test(digits)) ||
    (digits.length >= 10 && digits.length <= 13);

  if (!isValidPhone) {
    errors.phone =
      lang === 'hi'
        ? 'कृपया सही 10-अंकों का मोबाइल/व्हाट्सएप नंबर दर्ज करें'
        : 'Please enter a valid 10-digit mobile / WhatsApp number';
  }

  if (trimmedCity.length < 2) {
    errors.city =
      lang === 'hi'
        ? 'कृपया अपना शहर या स्थान दर्ज करें (जैसे हिसार, रोहतक)'
        : 'Please enter your city or location in Haryana';
  }

  if (!trimmedService) {
    errors.service =
      lang === 'hi'
        ? 'कृपया एक सेवा या श्रेणी चुनें'
        : 'Please select a service or product category';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Filters products by category and active visibility flag.
 */
export function filterProducts(
  products: ProductItem[],
  category: ProductCategory,
  onlyActive = true
): ProductItem[] {
  return products.filter((item) => {
    if (onlyActive && !item.active) return false;
    if (category === 'All') return true;
    return item.category === category;
  });
}

/**
 * Filters and searches customer leads in the Admin Panel.
 */
export function filterAndSearchInquiries(
  inquiries: CustomerInquiry[],
  statusFilter: 'All' | LeadStatus,
  searchQuery: string
): CustomerInquiry[] {
  const q = (searchQuery || '').trim().toLowerCase();
  return [...inquiries]
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter((lead) => {
      if (statusFilter !== 'All' && lead.status !== statusFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        lead.fullName,
        lead.phone,
        lead.city,
        lead.service,
        lead.message,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
}

/**
 * Escapes a single CSV cell value per RFC 4180.
 */
function escapeCsvCell(value: string | number | undefined | null): string {
  const str = String(value ?? '');
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Converts customer inquiries array into a downloadable CSV string.
 */
export function exportInquiriesToCSV(inquiries: CustomerInquiry[]): string {
  const headers = [
    'ID',
    'Customer Name',
    'Phone / WhatsApp',
    'City / Location',
    'Service / Category',
    'Measurements / Message',
    'Status',
    'Submitted At',
  ];
  const rows = inquiries.map((lead) =>
    [
      escapeCsvCell(lead.id),
      escapeCsvCell(lead.fullName),
      escapeCsvCell(lead.phone),
      escapeCsvCell(lead.city),
      escapeCsvCell(lead.service),
      escapeCsvCell(lead.message),
      escapeCsvCell(lead.status),
      escapeCsvCell(lead.createdAt),
    ].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

/**
 * Normalizes a Firebase Realtime Database URL (removes trailing slash and .json suffix).
 */
export function normalizeFirebaseDbUrl(rawUrl: string): string {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return '';
  return trimmed.replace(/\/+\.json$/i, '').replace(/\/+$/, '');
}

/**
 * Filters workshop items by category and optional search query.
 */
export function filterWorkshopItems(
  items: WorkshopItem[],
  category: WorkshopCategory,
  searchQuery = ''
): WorkshopItem[] {
  const q = (searchQuery || '').trim().toLowerCase();
  return items.filter((item) => {
    if (category !== 'All' && item.category !== category) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      item.bayCode,
      item.titleEn,
      item.titleHi,
      item.machineSpecEn,
      item.machineSpecHi,
      item.descriptionEn,
      item.descriptionHi,
      item.category,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

/**
 * Builds a pre-filled WhatsApp inquiry message for a specific workshop facility / machine card.
 */
export function buildWorkshopWhatsAppMessage(
  item: Pick<WorkshopItem, 'titleEn' | 'titleHi' | 'bayCode'>,
  lang: Language
): string {
  if (lang === 'hi') {
    return `नमस्ते हरियाणा ग्लास फैब्रिकेटर, मैंने आपकी वेबसाइट पर वर्कशॉप सेक्शन में "${item.titleHi}" (${item.bayCode}) देखा। मुझे अपने प्रोजेक्ट के लिए फैब्रिकेशन और कोटेशन की जानकारी चाहिए।`;
  }
  return `Hello Haryana Glass Fabricator, I saw "${item.titleEn}" (${item.bayCode}) in your Hisar Workshop section. I would like to discuss fabrication and quotation details for my project.`;
}

