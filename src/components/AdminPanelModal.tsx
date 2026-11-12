import React, { useState } from 'react';
import {
  X,
  Lock,
  Users,
  Package,
  Image as ImageIcon,
  Wrench,
  Settings,
  Search,
  Download,
  Trash2,
  PhoneCall,
  MessageCircle,
  Plus,
  Edit3,
  Database,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import {
  CMSStoreState,
  CustomerInquiry,
  GalleryItem,
  Language,
  LeadStatus,
  ProductCategory,
  ProductItem,
  ServiceItem,
  SiteSettings,
  WorkshopCategory,
  WorkshopItem,
} from '../types/cms';
import {
  buildWhatsAppUrl,
  exportInquiriesToCSV,
  filterAndSearchInquiries,
} from '../utils/logic';
import { CloudinaryUploader } from './CloudinaryUploader';
import { ResilientImage } from './ResilientImage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  cmsState: CMSStoreState;
  isAuthenticated: boolean;
  onAuthenticate: (pin: string) => boolean;
  onLogout: () => void;
  onUpdateLeadStatus: (id: string, status: LeadStatus) => void;
  onDeleteLead: (id: string) => void;
  onSaveProduct: (product: ProductItem) => void;
  onDeleteProduct: (id: string) => void;
  onSaveWorkshopItem?: (item: WorkshopItem) => void;
  onDeleteWorkshopItem?: (id: string) => void;
  onSaveGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onSaveService: (service: ServiceItem) => void;
  onDeleteService: (id: string) => void;
  onSaveSettings: (settings: SiteSettings) => void;
  onConnectFirebaseUrl: (url: string) => Promise<{ ok: boolean; error?: string }>;
  onResetDefaults: () => void;
  firebaseConnected: boolean;
}

type AdminTab =
  | 'leads'
  | 'workshop'
  | 'products'
  | 'gallery'
  | 'services'
  | 'settings';

const SERVICE_CATEGORIES: Exclude<ProductCategory, 'All'>[] = [
  'UPVC',
  'Aluminium',
  'Slim Profile',
  'Toughened Glass',
  'Partitions',
  'Railings',
  'Mirrors',
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  lang,
  cmsState,
  isAuthenticated,
  onAuthenticate,
  onLogout,
  onUpdateLeadStatus,
  onDeleteLead,
  onSaveProduct,
  onDeleteProduct,
  onSaveWorkshopItem,
  onDeleteWorkshopItem,
  onSaveGalleryItem,
  onDeleteGalleryItem,
  onSaveService,
  onDeleteService,
  onSaveSettings,
  onConnectFirebaseUrl,
  onResetDefaults,
  firebaseConnected,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');

  // Leads Manager Filter & Search State
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const [leadSearch, setLeadSearch] = useState('');

  // Workshop Manager Form State
  const [editingWorkshop, setEditingWorkshop] = useState<WorkshopItem | null>(
    null
  );
  const [wsBayCode, setWsBayCode] = useState('WORKSHOP · NEW');
  const [wsCategory, setWsCategory] = useState<
    Exclude<WorkshopCategory, 'All'>
  >('CNC Cutting & Milling');
  const [wsTitleEn, setWsTitleEn] = useState('');
  const [wsTitleHi, setWsTitleHi] = useState('');
  const [wsSpecEn, setWsSpecEn] = useState('');
  const [wsSpecHi, setWsSpecHi] = useState('');
  const [wsDescEn, setWsDescEn] = useState('');
  const [wsDescHi, setWsDescHi] = useState('');
  const [wsImage, setWsImage] = useState(
    '/assets/aistudio/IMG-20261112-WA0067_74b8e69d.jpg'
  );

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [prodTitleEn, setProdTitleEn] = useState('');
  const [prodTitleHi, setProdTitleHi] = useState('');
  const [prodDescEn, setProdDescEn] = useState('');
  const [prodDescHi, setProdDescHi] = useState('');
  const [prodCategory, setProdCategory] =
    useState<Exclude<ProductCategory, 'All'>>('UPVC');
  const [prodBadgeEn, setProdBadgeEn] = useState('Best Seller');
  const [prodBadgeHi, setProdBadgeHi] = useState('बेस्ट सेलर');
  const [prodImage, setProdImage] = useState(
    '/assets/products/upvc-sliding-window.svg'
  );
  const [prodActive, setProdActive] = useState(true);

  // Gallery Form State
  const [galTitleEn, setGalTitleEn] = useState('');
  const [galTitleHi, setGalTitleHi] = useState('');
  const [galCityEn, setGalCityEn] = useState('Hisar, Haryana');
  const [galCityHi, setGalCityHi] = useState('हिसार, हरियाणा');
  const [galCategory, setGalCategory] = useState('Toughened Glass');
  const [galImage, setGalImage] = useState('/assets/products/hero-showcase.svg');

  // Services Manager Form State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [srvTitleEn, setSrvTitleEn] = useState('');
  const [srvTitleHi, setSrvTitleHi] = useState('');
  const [srvDescEn, setSrvDescEn] = useState('');
  const [srvDescHi, setSrvDescHi] = useState('');
  const [srvSpecsEn, setSrvSpecsEn] = useState('');
  const [srvSpecsHi, setSrvSpecsHi] = useState('');
  const [srvCatKey, setSrvCatKey] =
    useState<Exclude<ProductCategory, 'All'>>('Aluminium');
  const [srvImage, setSrvImage] = useState(
    '/assets/products/aluminium-villa-door.svg'
  );

  // Site Settings Form State
  const [settingsDraft, setSettingsDraft] = useState<SiteSettings>(
    cmsState.settings
  );
  const [settingsSavedMsg, setSettingsSavedMsg] = useState('');
  const [firebaseSyncMsg, setFirebaseSyncMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onAuthenticate(pinInput.trim());
    if (!ok) {
      setPinError(
        lang === 'hi'
          ? 'गलत पिन! डिफ़ॉल्ट पिन admin123 है।'
          : 'Invalid PIN! Default PIN is admin123.'
      );
    } else {
      setPinError('');
      setPinInput('');
      setSettingsDraft(cmsState.settings);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = exportInquiriesToCSV(cmsState.inquiries);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `haryana-window-mart-leads-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const startEditProduct = (product: ProductItem) => {
    setEditingProduct(product);
    setProdTitleEn(product.titleEn);
    setProdTitleHi(product.titleHi);
    setProdDescEn(product.descriptionEn);
    setProdDescHi(product.descriptionHi);
    setProdCategory(product.category);
    setProdBadgeEn(product.badgeEn);
    setProdBadgeHi(product.badgeHi);
    setProdImage(product.imageUrl);
    setProdActive(product.active);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProdTitleEn('');
    setProdTitleHi('');
    setProdDescEn('');
    setProdDescHi('');
    setProdCategory('UPVC');
    setProdBadgeEn('Best Seller');
    setProdBadgeHi('बेस्ट सेलर');
    setProdImage('/assets/products/upvc-sliding-window.svg');
    setProdActive(true);
  };

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitleEn.trim()) return;

    const item: ProductItem = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      titleEn: prodTitleEn.trim(),
      titleHi: prodTitleHi.trim() || prodTitleEn.trim(),
      descriptionEn: prodDescEn.trim(),
      descriptionHi: prodDescHi.trim() || prodDescEn.trim(),
      category: prodCategory,
      badgeEn: prodBadgeEn.trim(),
      badgeHi: prodBadgeHi.trim() || prodBadgeEn.trim(),
      imageUrl: prodImage.trim() || '/assets/products/upvc-sliding-window.svg',
      active: prodActive,
      createdAt: editingProduct ? editingProduct.createdAt : Date.now(),
    };
    onSaveProduct(item);
    resetProductForm();
  };

  const handleGalleryFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitleEn.trim()) return;

    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      titleEn: galTitleEn.trim(),
      titleHi: galTitleHi.trim() || galTitleEn.trim(),
      cityEn: galCityEn.trim() || 'Hisar, Haryana',
      cityHi: galCityHi.trim() || galCityEn.trim() || 'हिसार, हरियाणा',
      category: galCategory.trim() || 'Architectural Glass',
      imageUrl: galImage.trim() || '/assets/products/hero-showcase.svg',
      createdAt: Date.now(),
    };
    onSaveGalleryItem(item);
    setGalTitleEn('');
    setGalTitleHi('');
  };

  const startEditService = (srv: ServiceItem) => {
    setEditingService(srv);
    setSrvTitleEn(srv.titleEn);
    setSrvTitleHi(srv.titleHi);
    setSrvDescEn(srv.descriptionEn);
    setSrvDescHi(srv.descriptionHi);
    setSrvSpecsEn(srv.specsEn);
    setSrvSpecsHi(srv.specsHi);
    setSrvCatKey(srv.categoryKey);
    setSrvImage(srv.imageUrl);
  };

  const resetServiceForm = () => {
    setEditingService(null);
    setSrvTitleEn('');
    setSrvTitleHi('');
    setSrvDescEn('');
    setSrvDescHi('');
    setSrvSpecsEn('');
    setSrvSpecsHi('');
  };

  const handleServiceFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvTitleEn.trim()) return;

    const item: ServiceItem = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      number: editingService
        ? editingService.number
        : String(cmsState.services.length + 1).padStart(2, '0'),
      categoryKey: srvCatKey,
      titleEn: srvTitleEn.trim(),
      titleHi: srvTitleHi.trim() || srvTitleEn.trim(),
      descriptionEn: srvDescEn.trim(),
      descriptionHi: srvDescHi.trim() || srvDescEn.trim(),
      specsEn: srvSpecsEn.trim() || 'Custom Architectural Specification',
      specsHi: srvSpecsHi.trim() || srvSpecsEn.trim() || 'कस्टम आर्किटेक्चरल फिटिंग',
      iconName: editingService ? editingService.iconName : 'ShieldCheck',
      imageUrl: srvImage.trim() || '/assets/products/aluminium-villa-door.svg',
    };
    onSaveService(item);
    resetServiceForm();
  };

  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(settingsDraft);
    setSettingsSavedMsg('All site settings & branding saved in real time!');
    setTimeout(() => setSettingsSavedMsg(''), 4000);
  };

  const handleTestFirebaseSync = async () => {
    setFirebaseSyncMsg('Connecting to Firebase Realtime Database...');
    const res = await onConnectFirebaseUrl(settingsDraft.firebaseDbUrl);
    if (res.ok) {
      setFirebaseSyncMsg(
        'Connected & synced with Firebase Realtime Database!'
      );
    } else {
      setFirebaseSyncMsg(
        `Local Realtime Storage active (${res.error || 'Provide valid Firebase RTDB URL to sync across cloud'})`
      );
    }
  };

  const filteredLeads = filterAndSearchInquiries(
    cmsState.inquiries,
    statusFilter,
    leadSearch
  );

  return (
    <div
      role="main"
      aria-label="Haryana Glass Fabricator Standalone Admin Portal"
      className="min-h-screen w-full bg-[#0C2237] text-white flex flex-col"
    >
      <div className="w-full max-w-[1440px] mx-auto bg-[#102A43] border-x border-[#DCE4EA]/20 flex-1 flex flex-col min-h-screen">
        {/* Top Portal Header */}
        <div className="px-5 py-4 bg-[#0C2237] border-b border-[#DCE4EA]/20 flex items-center justify-between gap-4 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white p-0.5 shrink-0 border border-white/20">
              <ResilientImage
                src={cmsState.settings.logoUrl}
                alt="Admin Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white">
                {lang === 'hi'
                  ? 'हरियाणा ग्लास फैब्रिकेटर — अलग एडमिन पोर्टल (/admin)'
                  : 'Haryana Glass Fabricator — Standalone Admin Portal (/admin)'}
              </h2>
              <p className="text-xs text-white/70">
                {firebaseConnected
                  ? 'Firebase Cloud Firestore + LocalStorage Real-Time Sync Active'
                  : 'Realtime LocalStorage Sync Active'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-2 rounded-lg bg-[#102A43] hover:bg-[#153452] border border-[#DCE4EA]/30 text-xs font-semibold text-white/90 cursor-pointer transition-colors"
              >
                {lang === 'hi' ? 'लॉग आउट' : 'Lock Portal'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to Public Website"
              className="px-3.5 py-2 rounded-lg bg-[#16A6A1] hover:bg-[#128A86] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>
                {lang === 'hi'
                  ? '← मुख्य वेबसाइट पर जाएं'
                  : '← Back to Website'}
              </span>
            </button>
          </div>
        </div>

        {/* Unauthenticated PIN Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-bold text-white">
                {lang === 'hi'
                  ? 'एडमिन लॉगिन (Admin Authentication)'
                  : 'Admin Panel Authentication'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {lang === 'hi'
                  ? 'ग्राहक लीड्स, प्रोडक्ट कैटलॉग, गैलरी और साइट सेटिंग्स प्रबंधित करने के लिए एडमिन पिन दर्ज करें (डिफ़ॉल्ट: admin123)।'
                  : 'Enter your Admin PIN/Password to manage customer inquiries, Cloudinary product uploads, gallery, and site settings (Default: admin123).'}
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div>
                <label htmlFor="admin-pin-input" className="sr-only">
                  Admin PIN
                </label>
                <input
                  id="admin-pin-input"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Admin PIN (e.g., admin123)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-center text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
                {pinError && (
                  <p className="mt-2 text-xs text-rose-400">{pinError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
              >
                {lang === 'hi'
                  ? 'एडमिन डैशबोर्ड खोलें'
                  : 'Unlock Admin Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Full Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="px-5 pt-3 bg-[#0C2237] border-b border-[#DCE4EA]/20 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'leads'
                    ? 'border-[#16A6A1] text-[#16A6A1]'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>
                  1. Customer Leads ({cmsState.inquiries.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('workshop')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'workshop'
                    ? 'border-[#16A6A1] text-[#16A6A1]'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>
                  2. Workshop Photos ({cmsState.workshop?.length || 0})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'products'
                    ? 'border-[#16A6A1] text-[#16A6A1]'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>
                  3. Product Catalog ({cmsState.products.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'border-[#16A6A1] text-[#16A6A1]'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>
                  4. Project Gallery ({cmsState.gallery.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'services'
                    ? 'border-[#16A6A1] text-[#16A6A1]'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>
                  5. 8 Core Services ({cmsState.services.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSettingsDraft(cmsState.settings);
                  setActiveTab('settings');
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-[#16A6A1] text-[#16A6A1]'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>6. Site Settings & Firebase DB</span>
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* TAB 1: CUSTOMER INQUIRIES / LEADS MANAGER */}
              {activeTab === 'leads' && (
                <div className="space-y-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {/* Status Filter Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(['All', 'New', 'Contacted', 'Completed'] as const).map(
                        (st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setStatusFilter(st)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              statusFilter === st
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-900 text-slate-300 hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}
                    </div>

                    {/* Search + Export CSV */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative flex-1 sm:w-64">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={leadSearch}
                          onChange={(e) => setLeadSearch(e.target.value)}
                          placeholder="Search name, city, phone..."
                          aria-label="Search customer inquiries"
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleDownloadCSV}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400 cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Leads to CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Leads List */}
                  {filteredLeads.length === 0 ? (
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-10 text-center text-sm text-slate-400">
                      No customer inquiries match the current filter.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredLeads.map((lead: CustomerInquiry) => {
                        const waReplyUrl = buildWhatsAppUrl(
                          lead.phone,
                          `Hello ${lead.fullName}, this is Haryana Glass Fabricator (Hisar) regarding your inquiry for ${lead.service} in ${lead.city}.`
                        );

                        return (
                          <div
                            key={lead.id}
                            className="rounded-xl bg-slate-950 border border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 max-w-2xl">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className="font-bold text-base text-white">
                                  {lead.fullName}
                                </span>
                                <span className="text-slate-600">·</span>
                                <span className="font-mono text-amber-400 font-semibold tabular-nums">
                                  {lead.phone}
                                </span>
                                <span className="text-slate-600">·</span>
                                <span className="text-slate-300 font-medium">
                                  {lead.city}
                                </span>
                                <span className="text-slate-600">·</span>
                                <span className="text-slate-400 font-mono tabular-nums">
                                  {lead.createdAt}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm font-semibold text-amber-300">
                                Service: {lead.service}
                              </p>

                              {lead.message && (
                                <p className="text-xs sm:text-sm text-slate-300">
                                  Measurements / Note: {lead.message}
                                </p>
                              )}
                            </div>

                            {/* Lead Actions */}
                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <select
                                aria-label={`Status for ${lead.fullName}`}
                                value={lead.status}
                                onChange={(e) =>
                                  onUpdateLeadStatus(
                                    lead.id,
                                    e.target.value as LeadStatus
                                  )
                                }
                                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                              >
                                <option value="New">Status: New</option>
                                <option value="Contacted">
                                  Status: Contacted
                                </option>
                                <option value="Completed">
                                  Status: Completed
                                </option>
                              </select>

                              <a
                                href={waReplyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Reply</span>
                              </a>

                              <a
                                href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs whitespace-nowrap"
                              >
                                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                                <span>Call</span>
                              </a>

                              <button
                                type="button"
                                onClick={() => onDeleteLead(lead.id)}
                                aria-label={`Delete inquiry from ${lead.fullName}`}
                                className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-700 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PRODUCT CATALOG MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleProductFormSubmit}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-white">
                        {editingProduct
                          ? `Edit Product: ${editingProduct.titleEn}`
                          : 'Add New Product to Catalog'}
                      </h3>
                      {editingProduct && (
                        <button
                          type="button"
                          onClick={resetProductForm}
                          className="text-xs text-amber-400 hover:underline cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Product Title (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={prodTitleEn}
                          onChange={(e) => setProdTitleEn(e.target.value)}
                          placeholder="e.g., 3-Track Acoustic UPVC Sliding Window"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Product Title (Hindi / हिन्दी)
                        </label>
                        <input
                          type="text"
                          value={prodTitleHi}
                          onChange={(e) => setProdTitleHi(e.target.value)}
                          placeholder="जैसे: 3-ट्रैक साउंडप्रूफ UPVC विंडो"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Category *
                        </label>
                        <select
                          value={prodCategory}
                          onChange={(e) =>
                            setProdCategory(
                              e.target.value as Exclude<ProductCategory, 'All'>
                            )
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        >
                          {SERVICE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Tag / Specification (English)
                        </label>
                        <input
                          type="text"
                          value={prodBadgeEn}
                          onChange={(e) => setProdBadgeEn(e.target.value)}
                          placeholder="e.g., Best Seller · 12mm ISI"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>

                      <div className="flex items-end pb-1">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={prodActive}
                            onChange={(e) => setProdActive(e.target.checked)}
                            className="rounded border-slate-700"
                          />
                          <span>Active & Visible in Public Catalog</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Description (English) *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={prodDescEn}
                          onChange={(e) => setProdDescEn(e.target.value)}
                          placeholder="Detailed architectural specification..."
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Description (Hindi / हिन्दी)
                        </label>
                        <textarea
                          rows={2}
                          value={prodDescHi}
                          onChange={(e) => setProdDescHi(e.target.value)}
                          placeholder="हिंदी में उत्पाद का विवरण..."
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <CloudinaryUploader
                      label="Product Photo"
                      value={prodImage}
                      onChange={setProdImage}
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {editingProduct ? 'Update Product' : 'Add Product to Catalog'}
                      </span>
                    </button>
                  </form>

                  {/* Existing Products List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cmsState.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                            <ResilientImage
                              src={prod.imageUrl}
                              alt={prod.titleEn}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-amber-400 font-medium">
                              {prod.category} · {prod.active ? 'Active' : 'Hidden'}
                            </p>
                            <p className="font-bold text-sm text-white truncate">
                              {prod.titleEn}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {prod.titleHi}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditProduct(prod)}
                            aria-label={`Edit ${prod.titleEn}`}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(prod.id)}
                            aria-label={`Delete ${prod.titleEn}`}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950 border border-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECT GALLERY MANAGER */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleGalleryFormSubmit}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4"
                  >
                    <h3 className="font-display text-base font-bold text-white">
                      Add Completed Site Project Photo
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Project Title (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={galTitleEn}
                          onChange={(e) => setGalTitleEn(e.target.value)}
                          placeholder="e.g., Toughened Glass Facade - Hisar"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Project Title (Hindi)
                        </label>
                        <input
                          type="text"
                          value={galTitleHi}
                          onChange={(e) => setGalTitleHi(e.target.value)}
                          placeholder="जैसे: टफन्ड ग्लास फसाड - हिसार"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          City / Location (English)
                        </label>
                        <input
                          type="text"
                          value={galCityEn}
                          onChange={(e) => setGalCityEn(e.target.value)}
                          placeholder="Sector 14, Hisar"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          City / Location (Hindi)
                        </label>
                        <input
                          type="text"
                          value={galCityHi}
                          onChange={(e) => setGalCityHi(e.target.value)}
                          placeholder="सेक्टर 14, हिसार"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Service Category
                        </label>
                        <input
                          type="text"
                          value={galCategory}
                          onChange={(e) => setGalCategory(e.target.value)}
                          placeholder="Slim Profile / Railings"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <CloudinaryUploader
                      label="Project Site Photo"
                      value={galImage}
                      onChange={setGalImage}
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project to Gallery</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cmsState.gallery.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between"
                      >
                        <div className="h-36 bg-slate-900">
                          <ResilientImage
                            src={item.imageUrl}
                            alt={item.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3.5 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs text-amber-400 truncate">
                              {item.cityEn}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.titleEn}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onDeleteGalleryItem(item.id)}
                            aria-label={`Delete gallery item ${item.titleEn}`}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: WORKSHOP & MACHINERY PHOTOS MANAGER */}
              {activeTab === 'workshop' && (
                <div className="space-y-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!wsTitleEn.trim() || !onSaveWorkshopItem) return;
                      const item: WorkshopItem = {
                        id: editingWorkshop
                          ? editingWorkshop.id
                          : `ws-${Date.now()}`,
                        bayCode: wsBayCode.trim() || 'WORKSHOP · BAY',
                        category: wsCategory,
                        titleEn: wsTitleEn.trim(),
                        titleHi: wsTitleHi.trim() || wsTitleEn.trim(),
                        machineSpecEn:
                          wsSpecEn.trim() || 'In-House Hisar CNC Plant',
                        machineSpecHi:
                          wsSpecHi.trim() ||
                          wsSpecEn.trim() ||
                          'हिसार इन-हाउस CNC वर्कशॉप',
                        descriptionEn: wsDescEn.trim(),
                        descriptionHi: wsDescHi.trim() || wsDescEn.trim(),
                        imageUrl: wsImage,
                        createdAt: editingWorkshop
                          ? editingWorkshop.createdAt
                          : Date.now(),
                      };
                      onSaveWorkshopItem(item);
                      setEditingWorkshop(null);
                      setWsTitleEn('');
                      setWsTitleHi('');
                      setWsSpecEn('');
                      setWsSpecHi('');
                      setWsDescEn('');
                      setWsDescHi('');
                    }}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-white">
                        {editingWorkshop
                          ? `Edit Workshop Photo: ${editingWorkshop.titleEn}`
                          : 'Add / Edit Workshop Photo & Description'}
                      </h3>
                      {editingWorkshop && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingWorkshop(null);
                            setWsTitleEn('');
                            setWsTitleHi('');
                            setWsSpecEn('');
                            setWsSpecHi('');
                            setWsDescEn('');
                            setWsDescHi('');
                          }}
                          className="text-xs text-amber-400 hover:underline cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Bay / Facility Code
                        </label>
                        <input
                          type="text"
                          value={wsBayCode}
                          onChange={(e) => setWsBayCode(e.target.value)}
                          placeholder="CNC BAY · 01"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Workshop Category
                        </label>
                        <select
                          value={wsCategory}
                          onChange={(e) =>
                            setWsCategory(
                              e.target.value as Exclude<WorkshopCategory, 'All'>
                            )
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        >
                          <option value="Building & Godown">
                            Building & Godown
                          </option>
                          <option value="CNC Cutting & Milling">
                            CNC Cutting & Milling
                          </option>
                          <option value="UPVC Thermal Welding">
                            UPVC Thermal Welding
                          </option>
                          <option value="Active Fabrication">
                            Active Fabrication
                          </option>
                          <option value="Showroom & LED Mirrors">
                            Showroom & LED Mirrors
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Machine / Process Spec (English & Hindi)
                        </label>
                        <input
                          type="text"
                          value={wsSpecEn}
                          onChange={(e) => {
                            setWsSpecEn(e.target.value);
                            if (!wsSpecHi) setWsSpecHi(e.target.value);
                          }}
                          placeholder="Double-Head 45°/90° CNC Saw"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Photo Title (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={wsTitleEn}
                          onChange={(e) => setWsTitleEn(e.target.value)}
                          placeholder="e.g., Double-Head CNC Mitre Cutting Machine"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Photo Title (Hindi)
                        </label>
                        <input
                          type="text"
                          value={wsTitleHi}
                          onChange={(e) => setWsTitleHi(e.target.value)}
                          placeholder="डबल-हेड CNC प्रोफाइल कटिंग मशीन"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Detailed Description Below Photo (English) *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={wsDescEn}
                          onChange={(e) => setWsDescEn(e.target.value)}
                          placeholder="Describe what machine/work is happening in this workshop photo..."
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Detailed Description Below Photo (Hindi)
                        </label>
                        <textarea
                          rows={3}
                          value={wsDescHi}
                          onChange={(e) => setWsDescHi(e.target.value)}
                          placeholder="इस फोटो में दिख रही मशीन और काम का पूरा विवरण हिंदी में लिखें..."
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <CloudinaryUploader
                      label="Workshop Photograph (Upload to Cloudinary or Paste URL)"
                      value={wsImage}
                      onChange={setWsImage}
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {editingWorkshop
                          ? 'Update Workshop Photo & Description'
                          : 'Save Workshop Photo to Website'}
                      </span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(cmsState.workshop || []).map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-40 bg-slate-900 relative">
                            <ResilientImage
                              src={item.imageUrl}
                              alt={item.titleEn}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/90 text-amber-400 text-[10px] font-mono">
                              {item.bayCode}
                            </span>
                          </div>
                          <div className="p-3.5">
                            <p className="text-[11px] font-mono text-amber-400">
                              {item.category}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                              {item.titleHi}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {item.descriptionHi}
                            </p>
                          </div>
                        </div>
                        <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-900 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingWorkshop(item);
                              setWsBayCode(item.bayCode);
                              setWsCategory(item.category);
                              setWsTitleEn(item.titleEn);
                              setWsTitleHi(item.titleHi);
                              setWsSpecEn(item.machineSpecEn);
                              setWsSpecHi(item.machineSpecHi);
                              setWsDescEn(item.descriptionEn);
                              setWsDescHi(item.descriptionHi);
                              setWsImage(item.imageUrl);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-amber-400 inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          {onDeleteWorkshopItem && (
                            <button
                              type="button"
                              onClick={() => onDeleteWorkshopItem(item.id)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: 8 CORE SERVICES MANAGER */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleServiceFormSubmit}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-white">
                        {editingService
                          ? `Edit Service: ${editingService.titleEn}`
                          : 'Add or Update Core Service'}
                      </h3>
                      {editingService && (
                        <button
                          type="button"
                          onClick={resetServiceForm}
                          className="text-xs text-amber-400 hover:underline cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Service Title (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={srvTitleEn}
                          onChange={(e) => setSrvTitleEn(e.target.value)}
                          placeholder="e.g., Aluminium Windows and Doors"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Service Title (Hindi)
                        </label>
                        <input
                          type="text"
                          value={srvTitleHi}
                          onChange={(e) => setSrvTitleHi(e.target.value)}
                          placeholder="एल्युमीनियम खिड़कियां और दरवाजे"
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Category Key
                        </label>
                        <select
                          value={srvCatKey}
                          onChange={(e) =>
                            setSrvCatKey(
                              e.target.value as Exclude<ProductCategory, 'All'>
                            )
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        >
                          {SERVICE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Description (English) *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={srvDescEn}
                          onChange={(e) => setSrvDescEn(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Description (Hindi)
                        </label>
                        <textarea
                          rows={2}
                          value={srvDescHi}
                          onChange={(e) => setSrvDescHi(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white"
                        />
                      </div>
                    </div>

                    <CloudinaryUploader
                      label="Service Card Image"
                      value={srvImage}
                      onChange={setSrvImage}
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {editingService ? 'Update Service' : 'Save Service'}
                      </span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cmsState.services.map((srv) => (
                      <div
                        key={srv.id}
                        className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-mono text-amber-400">
                            {srv.number}. {srv.categoryKey}
                          </p>
                          <p className="font-bold text-sm text-white truncate">
                            {srv.titleEn}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {srv.titleHi}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditService(srv)}
                            aria-label={`Edit service ${srv.titleEn}`}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteService(srv.id)}
                            aria-label={`Delete service ${srv.titleEn}`}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950 border border-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: COMPLETE SITE SETTINGS & FIREBASE REALTIME DB CMS */}
              {activeTab === 'settings' && (
                <form
                  onSubmit={handleSaveSettingsSubmit}
                  className="space-y-6 rounded-xl bg-slate-950 border border-slate-800 p-5"
                >
                  {/* Firebase Realtime Database Connection Panel */}
                  <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Database className="w-4 h-4" />
                      <h3 className="font-display text-sm font-bold text-white">
                        Firebase Realtime Database Live Sync Configuration
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300">
                      Paste your Firebase Realtime Database URL (e.g.,{' '}
                      <code className="text-amber-300">
                        https://your-project-default-rtdb.firebaseio.com
                      </code>
                      ) to synchronize `/inquiries`, `/products`, `/gallery`,
                      `/services`, and `/settings` across all devices in real
                      time. Automatic LocalStorage persistence is always active.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="url"
                        value={settingsDraft.firebaseDbUrl}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            firebaseDbUrl: e.target.value,
                          })
                        }
                        placeholder="https://haryana-window-mart-default-rtdb.firebaseio.com"
                        className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                      />
                      <button
                        type="button"
                        onClick={handleTestFirebaseSync}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-amber-400 cursor-pointer whitespace-nowrap"
                      >
                        Connect & Sync Firebase DB
                      </button>
                    </div>
                    {firebaseSyncMsg && (
                      <p className="text-xs text-emerald-400 font-medium">
                        {firebaseSyncMsg}
                      </p>
                    )}
                  </div>

                  {/* Brand Logo Uploader */}
                  <CloudinaryUploader
                    label="Website Brand Logo (Navbar, Hero & Footer)"
                    value={settingsDraft.logoUrl}
                    onChange={(newLogo) =>
                      setSettingsDraft({ ...settingsDraft, logoUrl: newLogo })
                    }
                  />

                  {/* Business Name, Subtitle & Legacy Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Brand Name (English)
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.brandNameEn}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            brandNameEn: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Brand Name (Hindi)
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.brandNameHi}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            brandNameHi: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Legacy Years Stat
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.legacyYearsStat}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            legacyYearsStat: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Generations Stat
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.generationsStat}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            generationsStat: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Hero Headings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Hero Headline (English)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsDraft.heroHeadingEn}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            heroHeadingEn: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Hero Headline (Hindi)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsDraft.heroHeadingHi}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            heroHeadingHi: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Contact, Address, Instagram, Admin PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Calling & WhatsApp Display Number
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.phoneDisplay}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            phoneDisplay: e.target.value,
                            whatsappNumber: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        value={settingsDraft.instagramUrl}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            instagramUrl: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Admin Panel PIN
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.adminPin}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            adminPin: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Workshop Address (English)
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.addressEn}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            addressEn: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Workshop Address (Hindi)
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.addressHi}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            addressHi: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Google Business Share URL
                      </label>
                      <input
                        type="url"
                        value={settingsDraft.googleBusinessShareUrl || ''}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            googleBusinessShareUrl: e.target.value,
                          })
                        }
                        placeholder="https://share.google/l7dnUDTVvbTdwgCST"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Google Plus Code
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.googlePlusCode || ''}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            googlePlusCode: e.target.value,
                          })
                        }
                        placeholder="4PVM+FMV, Bank Colony, Urban Estate II, Hisar 125001"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        GPS Coordinates
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.googleCoordinates || ''}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            googleCoordinates: e.target.value,
                          })
                        }
                        placeholder="29.1436379° N, 75.7343497° E"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Store & Workshop Hours (English)
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.openingHoursEn || ''}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            openingHoursEn: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Google Owner Workshop Note (English)
                      </label>
                      <input
                        type="text"
                        value={settingsDraft.ownerNoteEn || ''}
                        onChange={(e) =>
                          setSettingsDraft({
                            ...settingsDraft,
                            ownerNoteEn: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Google Maps Embed URL
                    </label>
                    <input
                      type="url"
                      value={settingsDraft.googleMapsEmbedUrl}
                      onChange={(e) =>
                        setSettingsDraft({
                          ...settingsDraft,
                          googleMapsEmbedUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-colors"
                      >
                        Save All Site Settings
                      </button>
                      {settingsSavedMsg && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{settingsSavedMsg}</span>
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={onResetDefaults}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Demo Defaults</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
