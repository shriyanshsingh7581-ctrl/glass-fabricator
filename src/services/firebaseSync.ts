import { INITIAL_CMS_STATE } from '../data/initialData';
import {
  CMSStoreState,
  CustomerInquiry,
  GalleryItem,
  ProductItem,
  ServiceItem,
  SiteSettings,
  WorkshopItem,
} from '../types/cms';
import { normalizeFirebaseDbUrl } from '../utils/logic';

const STORAGE_KEY = 'hwm_cms_state_v2';

export function loadLocalCMSState(): CMSStoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_CMS_STATE;
    const parsed = JSON.parse(raw) as Partial<CMSStoreState>;
    const savedSettings: Partial<SiteSettings> = parsed.settings || {};
    const hasUpdatedGoogleLocation = String(
      savedSettings.addressEn || ''
    ).includes('4PVM+FMV');
    const isOldBrandName =
      savedSettings.brandNameEn === 'Haryana Window Mart' ||
      String(savedSettings.brandNameEn || '').includes('Window') ||
      String(savedSettings.brandNameHi || '').includes('विंडो') ||
      !savedSettings.brandNameEn;

    return {
      settings: {
        ...INITIAL_CMS_STATE.settings,
        ...savedSettings,
        ...(isOldBrandName
          ? {
              brandNameEn: 'Haryana Glass Fabricator',
              brandNameHi: 'हरियाणा ग्लास फैब्रिकेटर',
              subtitleEn: INITIAL_CMS_STATE.settings.subtitleEn,
              subtitleHi: INITIAL_CMS_STATE.settings.subtitleHi,
            }
          : {}),
        ...(hasUpdatedGoogleLocation
          ? {}
          : {
              addressEn: INITIAL_CMS_STATE.settings.addressEn,
              addressHi: INITIAL_CMS_STATE.settings.addressHi,
              coverageEn: INITIAL_CMS_STATE.settings.coverageEn,
              coverageHi: INITIAL_CMS_STATE.settings.coverageHi,
              googleMapsEmbedUrl: INITIAL_CMS_STATE.settings.googleMapsEmbedUrl,
              googleBusinessShareUrl:
                INITIAL_CMS_STATE.settings.googleBusinessShareUrl,
              googleMapsPlaceUrl: INITIAL_CMS_STATE.settings.googleMapsPlaceUrl,
              googlePlusCode: INITIAL_CMS_STATE.settings.googlePlusCode,
              googleCoordinates: INITIAL_CMS_STATE.settings.googleCoordinates,
              openingHoursEn: INITIAL_CMS_STATE.settings.openingHoursEn,
              openingHoursHi: INITIAL_CMS_STATE.settings.openingHoursHi,
              ownerNoteEn: INITIAL_CMS_STATE.settings.ownerNoteEn,
              ownerNoteHi: INITIAL_CMS_STATE.settings.ownerNoteHi,
            }),
      },
      services:
        Array.isArray(parsed.services) && parsed.services.length > 0
          ? parsed.services
          : INITIAL_CMS_STATE.services,
      products:
        Array.isArray(parsed.products) && parsed.products.length > 0
          ? parsed.products
          : INITIAL_CMS_STATE.products,
      workshop:
        Array.isArray(parsed.workshop) && parsed.workshop.length > 0
          ? parsed.workshop
          : INITIAL_CMS_STATE.workshop,
      gallery:
        Array.isArray(parsed.gallery) && parsed.gallery.length > 0
          ? parsed.gallery
          : INITIAL_CMS_STATE.gallery,
      inquiries: Array.isArray(parsed.inquiries)
        ? parsed.inquiries
        : INITIAL_CMS_STATE.inquiries,
    };
  } catch {
    return INITIAL_CMS_STATE;
  }
}

export function saveLocalCMSState(state: CMSStoreState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

/**
 * Converts Firebase object map or array into a typed array.
 */
function normalizeCollection<T extends { id: string }>(
  raw: unknown,
  fallback: T[]
): T[] {
  if (!raw) return fallback;
  if (Array.isArray(raw)) {
    return raw.filter(Boolean) as T[];
  }
  if (typeof raw === 'object') {
    return Object.entries(raw as Record<string, T>).map(([key, val]) => ({
      ...val,
      id: val?.id || key,
    }));
  }
  return fallback;
}

/**
 * Pushes a specific path to Firebase Realtime Database if a URL is configured.
 */
export async function pushToFirebasePath(
  firebaseDbUrl: string,
  path: 'inquiries' | 'products' | 'workshop' | 'gallery' | 'services' | 'settings',
  data: unknown
): Promise<boolean> {
  const baseUrl = normalizeFirebaseDbUrl(firebaseDbUrl);
  if (!baseUrl) return false;

  try {
    const res = await fetch(`${baseUrl}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Saves a single new inquiry directly under `/inquiries/<id>.json` in Firebase Realtime Database.
 */
export async function saveInquiryToFirebase(
  firebaseDbUrl: string,
  inquiry: CustomerInquiry
): Promise<boolean> {
  const baseUrl = normalizeFirebaseDbUrl(firebaseDbUrl);
  if (!baseUrl) return false;

  try {
    const res = await fetch(`${baseUrl}/inquiries/${inquiry.id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetches full state snapshot from Firebase Realtime Database URL and merges with defaults.
 */
export async function fetchFromFirebaseDatabase(
  firebaseDbUrl: string,
  currentState: CMSStoreState
): Promise<{ ok: boolean; state?: CMSStoreState; error?: string }> {
  const baseUrl = normalizeFirebaseDbUrl(firebaseDbUrl);
  if (!baseUrl) {
    return { ok: false, error: 'No Firebase Realtime Database URL provided' };
  }

  try {
    const res = await fetch(`${baseUrl}/.json`);
    if (!res.ok) {
      return { ok: false, error: `Firebase returned HTTP ${res.status}` };
    }
    const data = await res.json();
    if (!data || typeof data !== 'object') {
      await fetch(`${baseUrl}/.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: { ...currentState.settings, firebaseDbUrl: baseUrl },
          services: currentState.services,
          products: currentState.products,
          workshop: currentState.workshop,
          gallery: currentState.gallery,
          inquiries: currentState.inquiries,
        }),
      });
      return {
        ok: true,
        state: {
          ...currentState,
          settings: { ...currentState.settings, firebaseDbUrl: baseUrl },
        },
      };
    }

    const remoteSettings = (data.settings || {}) as Partial<SiteSettings>;
    if (
      !remoteSettings.brandNameEn ||
      String(remoteSettings.brandNameEn).includes('Window')
    ) {
      remoteSettings.brandNameEn = 'Haryana Glass Fabricator';
    }
    if (
      !remoteSettings.brandNameHi ||
      String(remoteSettings.brandNameHi).includes('विंडो')
    ) {
      remoteSettings.brandNameHi = 'हरियाणा ग्लास फैब्रिकेटर';
    }

    const mergedState: CMSStoreState = {
      settings: {
        ...currentState.settings,
        ...remoteSettings,
        firebaseDbUrl: baseUrl,
      } as SiteSettings,
      services: normalizeCollection<ServiceItem>(
        data.services,
        currentState.services
      ),
      products: normalizeCollection<ProductItem>(
        data.products,
        currentState.products
      ),
      workshop: normalizeCollection<WorkshopItem>(
        data.workshop,
        currentState.workshop
      ),
      gallery: normalizeCollection<GalleryItem>(
        data.gallery,
        currentState.gallery
      ),
      inquiries: normalizeCollection<CustomerInquiry>(
        data.inquiries,
        currentState.inquiries
      ),
    };

    return { ok: true, state: mergedState };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Connection failed',
    };
  }
}
