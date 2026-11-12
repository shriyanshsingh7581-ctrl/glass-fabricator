import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  CMSStoreState,
  CustomerInquiry,
  GalleryItem,
  ProductItem,
  ServiceItem,
  SiteSettings,
  WorkshopItem,
} from '../types/cms';
import { INITIAL_CMS_STATE } from '../data/initialData';

// Initialize Firebase App
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore using provisioned database ID
export const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
}

// Test initial connection to Cloud Firestore
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.warn('Firestore offline fallback active.');
    }
    return false;
  }
}

/**
 * Initializes Firestore documents with default seed data (including all 29 workshop photos)
 * if collections are empty or missing new workshop items.
 */
export async function seedFirestoreIfEmpty(): Promise<void> {
  try {
    // 1. Settings
    const settingsRef = doc(db, 'settings', 'site');
    const settingsSnap = await getDocs(collection(db, 'settings'));
    if (settingsSnap.empty) {
      await setDoc(settingsRef, INITIAL_CMS_STATE.settings);
    }

    // 2. Services (upgrade if empty or still referencing legacy .svg placeholders)
    const srvSnap = await getDocs(collection(db, 'services'));
    const hasLegacyServiceSvg = srvSnap.docs.some((d) =>
      String(d.data()?.imageUrl || '').endsWith('.svg')
    );
    if (srvSnap.empty || hasLegacyServiceSvg) {
      for (const srv of INITIAL_CMS_STATE.services) {
        await setDoc(doc(db, 'services', srv.id), srv);
      }
    }

    // 3. Products (upgrade if empty or still referencing legacy .svg placeholders)
    const prodSnap = await getDocs(collection(db, 'products'));
    const hasLegacyProductSvg = prodSnap.docs.some((d) =>
      String(d.data()?.imageUrl || '').endsWith('.svg')
    );
    if (prodSnap.empty || hasLegacyProductSvg) {
      for (const prod of INITIAL_CMS_STATE.products) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
    }

    // 4. Workshop (29 real photos with descriptions)
    const wsSnap = await getDocs(collection(db, 'workshop'));
    if (wsSnap.empty || wsSnap.size < INITIAL_CMS_STATE.workshop.length) {
      for (const ws of INITIAL_CMS_STATE.workshop) {
        await setDoc(doc(db, 'workshop', ws.id), ws);
      }
    }

    // 5. Gallery (upgrade if empty or still referencing legacy .svg placeholders)
    const galSnap = await getDocs(collection(db, 'gallery'));
    const hasLegacyGallerySvg = galSnap.docs.some((d) =>
      String(d.data()?.imageUrl || '').endsWith('.svg')
    );
    if (galSnap.empty || hasLegacyGallerySvg) {
      for (const gal of INITIAL_CMS_STATE.gallery) {
        await setDoc(doc(db, 'gallery', gal.id), gal);
      }
    }

    // 6. Inquiries
    const inqSnap = await getDocs(collection(db, 'inquiries'));
    if (inqSnap.empty) {
      for (const inq of INITIAL_CMS_STATE.inquiries) {
        await setDoc(doc(db, 'inquiries', inq.id), inq);
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'seedCollections');
  }
}

/**
 * Attaches real-time listeners (onSnapshot) to all Firestore collections
 * including /workshop, /services, /products, /gallery, /inquiries, and /settings.
 */
export function subscribeToFirestore(
  onUpdate: (updater: (prev: CMSStoreState) => CMSStoreState) => void,
  onSyncStatus?: (online: boolean) => void
): () => void {
  seedFirestoreIfEmpty().then(() => onSyncStatus?.(true));

  // 1. Site Settings Listener
  const unsubSettings = onSnapshot(
    doc(db, 'settings', 'site'),
    (snap) => {
      onSyncStatus?.(true);
      if (snap.exists()) {
        const data = snap.data() as SiteSettings;
        onUpdate((prev) => ({
          ...prev,
          settings: { ...prev.settings, ...data },
        }));
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, 'settings/site');
      onSyncStatus?.(false);
    }
  );

  // 2. Services Listener
  const unsubServices = onSnapshot(
    collection(db, 'services'),
    (snap) => {
      onSyncStatus?.(true);
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as ServiceItem);
        list.sort((a, b) => (a.number || '').localeCompare(b.number || ''));
        onUpdate((prev) => ({ ...prev, services: list }));
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'services')
  );

  // 3. Products Listener
  const unsubProducts = onSnapshot(
    collection(db, 'products'),
    (snap) => {
      onSyncStatus?.(true);
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as ProductItem);
        onUpdate((prev) => ({ ...prev, products: list }));
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'products')
  );

  // 4. Workshop Listener
  const unsubWorkshop = onSnapshot(
    collection(db, 'workshop'),
    (snap) => {
      onSyncStatus?.(true);
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as WorkshopItem);
        list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        onUpdate((prev) => ({ ...prev, workshop: list }));
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'workshop')
  );

  // 5. Gallery Listener
  const unsubGallery = onSnapshot(
    collection(db, 'gallery'),
    (snap) => {
      onSyncStatus?.(true);
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as GalleryItem);
        onUpdate((prev) => ({ ...prev, gallery: list }));
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'gallery')
  );

  // 6. Inquiries Listener
  const unsubInquiries = onSnapshot(
    collection(db, 'inquiries'),
    (snap) => {
      onSyncStatus?.(true);
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as CustomerInquiry);
        list.sort((a, b) => b.timestamp - a.timestamp);
        onUpdate((prev) => ({ ...prev, inquiries: list }));
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'inquiries')
  );

  return () => {
    unsubSettings();
    unsubServices();
    unsubProducts();
    unsubWorkshop();
    unsubGallery();
    unsubInquiries();
  };
}

// Cloud Firestore Mutation Functions (A to Z Control)

export async function firestoreSaveSettings(settings: SiteSettings): Promise<void> {
  try {
    await setDoc(doc(db, 'settings', 'site'), settings);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'settings/site');
  }
}

export async function firestoreSaveProduct(product: ProductItem): Promise<void> {
  try {
    await setDoc(doc(db, 'products', product.id), product);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `products/${product.id}`);
  }
}

export async function firestoreDeleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
  }
}

export async function firestoreSaveWorkshopItem(item: WorkshopItem): Promise<void> {
  try {
    await setDoc(doc(db, 'workshop', item.id), item);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `workshop/${item.id}`);
  }
}

export async function firestoreDeleteWorkshopItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'workshop', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `workshop/${id}`);
  }
}

export async function firestoreSaveService(service: ServiceItem): Promise<void> {
  try {
    await setDoc(doc(db, 'services', service.id), service);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `services/${service.id}`);
  }
}

export async function firestoreDeleteService(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'services', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `services/${id}`);
  }
}

export async function firestoreSaveGallery(item: GalleryItem): Promise<void> {
  try {
    await setDoc(doc(db, 'gallery', item.id), item);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `gallery/${item.id}`);
  }
}

export async function firestoreDeleteGallery(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `gallery/${id}`);
  }
}

export async function firestoreSaveInquiry(inquiry: CustomerInquiry): Promise<void> {
  try {
    await setDoc(doc(db, 'inquiries', inquiry.id), inquiry);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `inquiries/${inquiry.id}`);
  }
}

export async function firestoreDeleteInquiry(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'inquiries', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `inquiries/${id}`);
  }
}
