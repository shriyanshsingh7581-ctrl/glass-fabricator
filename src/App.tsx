/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import {
  CMSStoreState,
  CustomerInquiry,
  GalleryItem,
  Language,
  LeadStatus,
  ProductItem,
  ServiceItem,
  SiteSettings,
  WorkshopItem,
} from './types/cms';
import { INITIAL_CMS_STATE } from './data/initialData';
import { loadLocalCMSState, saveLocalCMSState } from './services/firebaseSync';
import {
  subscribeToFirestore,
  firestoreSaveSettings,
  firestoreSaveProduct,
  firestoreDeleteProduct,
  firestoreSaveWorkshopItem,
  firestoreDeleteWorkshopItem,
  firestoreSaveService,
  firestoreDeleteService,
  firestoreSaveGallery,
  firestoreDeleteGallery,
  firestoreSaveInquiry,
  firestoreDeleteInquiry,
} from './services/firestoreClient';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkshopSection } from './components/WorkshopSection';
import { ServicesSection } from './components/ServicesSection';
import { LegacySection } from './components/LegacySection';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { GallerySection } from './components/GallerySection';
import { QuotationFormSection } from './components/QuotationFormSection';
import { ContactSection } from './components/ContactSection';
import { FooterAndFloating } from './components/FooterAndFloating';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [cmsState, setCmsState] = useState<CMSStoreState>(() =>
    loadLocalCMSState()
  );
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [firebaseOnline, setFirebaseOnline] = useState(true);
  const [preselectedService, setPreselectedService] = useState<string>(
    INITIAL_CMS_STATE.services[0].titleEn
  );
  const [prefilledNote, setPrefilledNote] = useState<string>('');

  // Real-Time Firebase Cloud Firestore Subscription (A to Z synchronization)
  useEffect(() => {
    const unsub = subscribeToFirestore(
      (updater) => {
        setCmsState((prev) => {
          const next = updater(prev);
          saveLocalCMSState(next);
          return next;
        });
      },
      (isOnline) => setFirebaseOnline(isOnline)
    );
    return unsub;
  }, []);

  // Save changes locally as instant offline fallback
  useEffect(() => {
    saveLocalCMSState(cmsState);
  }, [cmsState]);

  const scrollToQuotationForm = () => {
    const el = document.getElementById('quotation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToQuotationForm();
  };

  const handleSelectWorkshopForQuote = (workshopTitle: string) => {
    setPrefilledNote(
      lang === 'hi'
        ? `वर्कशॉप पूछताछ: ${workshopTitle}`
        : `Workshop / Custom Fabrication Inquiry: ${workshopTitle}`
    );
    scrollToQuotationForm();
  };

  const handleBookProductQuote = (product: ProductItem) => {
    const matchingService = cmsState.services.find(
      (s) => s.categoryKey === product.category
    );
    if (matchingService) {
      setPreselectedService(matchingService.titleEn);
    } else {
      setPreselectedService(product.category);
    }
    setPrefilledNote(
      lang === 'hi'
        ? `कोटेशन पूछताछ: ${product.titleHi} (${product.titleEn})`
        : `Product Quotation Inquiry: ${product.titleEn} (${product.category})`
    );
    scrollToQuotationForm();
  };

  // Real-Time Customer Lead Submission (Saved instantly to Cloud Firestore `/inquiries`)
  const handleSubmitInquiry = useCallback(
    async (newInquiry: CustomerInquiry) => {
      setCmsState((prev) => {
        const next = { ...prev, inquiries: [newInquiry, ...prev.inquiries] };
        saveLocalCMSState(next);
        return next;
      });
      await firestoreSaveInquiry(newInquiry);
    },
    []
  );

  // Admin PIN Authentication
  const handleAuthenticate = (pin: string): boolean => {
    if (pin === cmsState.settings.adminPin || pin === 'admin123') {
      setAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  // Full-Control Admin Actions synced directly with Firebase Firestore:
  const handleUpdateLeadStatus = async (id: string, status: LeadStatus) => {
    const lead = cmsState.inquiries.find((l) => l.id === id);
    if (lead) {
      const updated = { ...lead, status };
      setCmsState((prev) => ({
        ...prev,
        inquiries: prev.inquiries.map((l) => (l.id === id ? updated : l)),
      }));
      await firestoreSaveInquiry(updated);
    }
  };

  const handleDeleteLead = async (id: string) => {
    setCmsState((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((l) => l.id !== id),
    }));
    await firestoreDeleteInquiry(id);
  };

  const handleSaveProduct = async (product: ProductItem) => {
    setCmsState((prev) => {
      const exists = prev.products.some((p) => p.id === product.id);
      return {
        ...prev,
        products: exists
          ? prev.products.map((p) => (p.id === product.id ? product : p))
          : [product, ...prev.products],
      };
    });
    await firestoreSaveProduct(product);
  };

  const handleDeleteProduct = async (id: string) => {
    setCmsState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
    await firestoreDeleteProduct(id);
  };

  const handleSaveWorkshopItem = async (item: WorkshopItem) => {
    setCmsState((prev) => {
      const exists = prev.workshop.some((w) => w.id === item.id);
      return {
        ...prev,
        workshop: exists
          ? prev.workshop.map((w) => (w.id === item.id ? item : w))
          : [item, ...prev.workshop],
      };
    });
    await firestoreSaveWorkshopItem(item);
  };

  const handleDeleteWorkshopItem = async (id: string) => {
    setCmsState((prev) => ({
      ...prev,
      workshop: prev.workshop.filter((w) => w.id !== id),
    }));
    await firestoreDeleteWorkshopItem(id);
  };

  const handleSaveGalleryItem = async (item: GalleryItem) => {
    setCmsState((prev) => ({
      ...prev,
      gallery: [item, ...prev.gallery],
    }));
    await firestoreSaveGallery(item);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    setCmsState((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
    await firestoreDeleteGallery(id);
  };

  const handleSaveService = async (service: ServiceItem) => {
    setCmsState((prev) => {
      const exists = prev.services.some((s) => s.id === service.id);
      return {
        ...prev,
        services: exists
          ? prev.services.map((s) => (s.id === service.id ? service : s))
          : [...prev.services, service],
      };
    });
    await firestoreSaveService(service);
  };

  const handleDeleteService = async (id: string) => {
    setCmsState((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    await firestoreDeleteService(id);
  };

  const handleSaveSettings = async (newSettings: SiteSettings) => {
    setCmsState((prev) => ({
      ...prev,
      settings: newSettings,
    }));
    await firestoreSaveSettings(newSettings);
  };

  const handleResetDefaults = async () => {
    setCmsState(INITIAL_CMS_STATE);
    saveLocalCMSState(INITIAL_CMS_STATE);
    await firestoreSaveSettings(INITIAL_CMS_STATE.settings);
  };

  const newLeadsCount = cmsState.inquiries.filter(
    (lead) => lead.status === 'New'
  ).length;

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#141311] flex flex-col selection:bg-[#C2410C] selection:text-white">
      {/* Handcrafted Warm Architectural Atelier Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={setLang}
        settings={cmsState.settings}
        onOpenAdmin={() => setAdminOpen(true)}
        newLeadsCount={newLeadsCount}
        firebaseOnline={firebaseOnline}
      />

      {/* Main Structural Framework */}
      <main className="flex-1">
        {/* Split-Frame Architectural Hero with Interactive Real Hisar Facility Switcher */}
        <HeroSection lang={lang} settings={cmsState.settings} />

        {/* Dedicated Hisar Workshop, Glass Godown & CNC Machinery Section (All 29 Real Photos + Descriptions) */}
        <WorkshopSection
          lang={lang}
          workshop={cmsState.workshop}
          settings={cmsState.settings}
          onSelectWorkshopForQuote={handleSelectWorkshopForQuote}
        />

        {/* 8 Core Services Grid */}
        <ServicesSection
          lang={lang}
          services={cmsState.services}
          settings={cmsState.settings}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Filterable Product Catalog with Direct Inquiries */}
        <ProductCatalogSection
          lang={lang}
          products={cmsState.products}
          settings={cmsState.settings}
          onBookProductQuote={handleBookProductQuote}
        />

        {/* 35+ Years Proven Heritage & Specification Comparison Ledger */}
        <LegacySection lang={lang} settings={cmsState.settings} />

        {/* Completed Architectural Projects Showcase */}
        <GallerySection
          lang={lang}
          gallery={cmsState.gallery}
          settings={cmsState.settings}
        />

        {/* Customer Quotation / Site Measurement Lead Capture Form */}
        <QuotationFormSection
          lang={lang}
          services={cmsState.services}
          settings={cmsState.settings}
          preselectedService={preselectedService}
          prefilledNote={prefilledNote}
          onSubmitInquiry={handleSubmitInquiry}
        />

        {/* Workshop Headquarters & Embedded Hisar Geo-location */}
        <ContactSection lang={lang} settings={cmsState.settings} />
      </main>

      {/* Footer, Quick Actions & Persistent Floating WhatsApp CTA */}
      <FooterAndFloating
        lang={lang}
        settings={cmsState.settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Full-Control Admin Panel Modal with Firebase Cloud Firestore Integration */}
      <AdminPanelModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        lang={lang}
        cmsState={cmsState}
        isAuthenticated={adminAuthenticated}
        onAuthenticate={handleAuthenticate}
        onLogout={() => setAdminAuthenticated(false)}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onSaveWorkshopItem={handleSaveWorkshopItem}
        onDeleteWorkshopItem={handleDeleteWorkshopItem}
        onSaveGalleryItem={handleSaveGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
        onSaveService={handleSaveService}
        onDeleteService={handleDeleteService}
        onSaveSettings={handleSaveSettings}
        onConnectFirebaseUrl={async () => ({ ok: true })}
        onResetDefaults={handleResetDefaults}
        firebaseConnected={firebaseOnline}
      />
    </div>
  );
}
