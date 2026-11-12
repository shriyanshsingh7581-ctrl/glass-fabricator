export type Language = 'en' | 'hi';

export type ProductCategory =
  | 'All'
  | 'UPVC'
  | 'uPVC'
  | 'Aluminium'
  | 'Toughened Glass'
  | 'Partitions'
  | 'Railings'
  | 'Mirrors'
  | 'Slim Profile';

export type WorkshopCategory =
  | 'All'
  | 'Building & Godown'
  | 'CNC Cutting & Milling'
  | 'UPVC Thermal Welding'
  | 'uPVC Thermal Welding'
  | 'Active Fabrication'
  | 'Showroom & LED Mirrors';

export type LeadStatus = 'New' | 'Contacted' | 'Completed';

export interface ServiceItem {
  id: string;
  number: string;
  categoryKey: Exclude<ProductCategory, 'All'>;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  specsEn: string;
  specsHi: string;
  iconName: string;
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category: Exclude<ProductCategory, 'All'>;
  badgeEn: string;
  badgeHi: string;
  imageUrl: string;
  active: boolean;
  createdAt: number;
}

export interface WorkshopItem {
  id: string;
  bayCode: string;
  category: Exclude<WorkshopCategory, 'All'>;
  titleEn: string;
  titleHi: string;
  machineSpecEn: string;
  machineSpecHi: string;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl: string;
  createdAt: number;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  cityEn: string;
  cityHi: string;
  category: string;
  imageUrl: string;
  createdAt: number;
}

export interface CustomerInquiry {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  service: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  timestamp: number;
}

export interface SiteSettings {
  brandNameEn: string;
  brandNameHi: string;
  subtitleEn: string;
  subtitleHi: string;
  logoUrl: string;
  legacyYearsStat: string;
  generationsStat: string;
  heroBadgeEn: string;
  heroBadgeHi: string;
  heroHeadingEn: string;
  heroHeadingHi: string;
  heroSubheadingEn: string;
  heroSubheadingHi: string;
  phoneDisplay: string;
  whatsappNumber: string;
  addressEn: string;
  addressHi: string;
  coverageEn: string;
  coverageHi: string;
  instagramUrl: string;
  instagramHandle: string;
  googleMapsEmbedUrl: string;
  googleBusinessShareUrl?: string;
  googleMapsPlaceUrl?: string;
  googlePlusCode?: string;
  googleCoordinates?: string;
  openingHoursEn?: string;
  openingHoursHi?: string;
  ownerNoteEn?: string;
  ownerNoteHi?: string;
  adminPin: string;
  firebaseDbUrl: string;
}

export interface CMSStoreState {
  settings: SiteSettings;
  services: ServiceItem[];
  products: ProductItem[];
  workshop: WorkshopItem[];
  gallery: GalleryItem[];
  inquiries: CustomerInquiry[];
}
