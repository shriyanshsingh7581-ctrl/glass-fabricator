import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeWhatsAppNumber,
  buildWhatsAppUrl,
  buildServiceWhatsAppMessage,
  buildProductWhatsAppMessage,
  buildInquiryWhatsAppMessage,
  validateInquiryForm,
  filterProducts,
  filterAndSearchInquiries,
  exportInquiriesToCSV,
  normalizeFirebaseDbUrl,
  filterWorkshopItems,
  buildWorkshopWhatsAppMessage,
} from './logic';
import { INITIAL_WORKSHOP_ITEMS } from '../data/initialData';
import { CustomerInquiry, ProductItem } from '../types/cms';

test('sanitizeWhatsAppNumber normalizes Indian phone numbers to 919467687662 format', () => {
  assert.equal(sanitizeWhatsAppNumber('+91 94676 87662'), '919467687662');
  assert.equal(sanitizeWhatsAppNumber('9467687662'), '919467687662');
  assert.equal(sanitizeWhatsAppNumber('09467687662'), '919467687662');
  assert.equal(sanitizeWhatsAppNumber(''), '919467687662');
});

test('buildWhatsAppUrl constructs valid https://wa.me URLs with and without prefilled text', () => {
  assert.equal(buildWhatsAppUrl('+91 94676 87662'), 'https://wa.me/919467687662');
  const withText = buildWhatsAppUrl('+91 94676 87662', 'Hello Hisar');
  assert.equal(withText, 'https://wa.me/919467687662?text=Hello%20Hisar');
});

test('buildServiceWhatsAppMessage and buildProductWhatsAppMessage support English and Hindi', () => {
  const serviceMsgEn = buildServiceWhatsAppMessage(
    { titleEn: 'Toughened Glass', titleHi: 'टफन्ड ग्लास' },
    'en'
  );
  const serviceMsgHi = buildServiceWhatsAppMessage(
    { titleEn: 'Toughened Glass', titleHi: 'टफन्ड ग्लास' },
    'hi'
  );
  assert.ok(serviceMsgEn.includes('Toughened Glass'));
  assert.ok(serviceMsgHi.includes('टफन्ड ग्लास'));

  const prodMsgHi = buildProductWhatsAppMessage(
    {
      titleEn: '3-Track uPVC Window',
      titleHi: '3-ट्रैक uPVC स्लाइडिंग विंडो',
      category: 'uPVC',
    },
    'hi'
  );
  assert.ok(prodMsgHi.includes('3-ट्रैक uPVC स्लाइडिंग विंडो'));
});

test('validateInquiryForm rejects invalid inputs and accepts valid Haryana customer inquiry', () => {
  const invalid = validateInquiryForm(
    { fullName: 'A', phone: '12345', city: '', service: '' },
    'en'
  );
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.service);

  const valid = validateInquiryForm(
    {
      fullName: 'Rajesh Bishnoi',
      phone: '9812345678',
      city: 'Hisar',
      service: 'uPVC Windows and Doors',
      message: '3 windows 6x5 ft',
    },
    'hi'
  );
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('filterProducts filters by category and active status', () => {
  const sampleProducts: ProductItem[] = [
    {
      id: '1',
      titleEn: 'uPVC Slider',
      titleHi: 'uPVC स्लाइडर',
      descriptionEn: 'Desc',
      descriptionHi: 'विवरण',
      category: 'uPVC',
      badgeEn: 'Best Seller',
      badgeHi: 'बेस्ट सेलर',
      imageUrl: '/assets/products/upvc-sliding-window.svg',
      active: true,
      createdAt: 100,
    },
    {
      id: '2',
      titleEn: 'Slim Partition',
      titleHi: 'स्लिम पार्टीशन',
      descriptionEn: 'Desc',
      descriptionHi: 'विवरण',
      category: 'Slim Profile',
      badgeEn: 'New',
      badgeHi: 'नया',
      imageUrl: '/assets/products/slim-profile-partition.svg',
      active: false,
      createdAt: 200,
    },
  ];

  assert.equal(filterProducts(sampleProducts, 'All', true).length, 1);
  assert.equal(filterProducts(sampleProducts, 'All', false).length, 2);
  assert.equal(filterProducts(sampleProducts, 'uPVC', true).length, 1);
  assert.equal(filterProducts(sampleProducts, 'Slim Profile', true).length, 0);
});

test('filterAndSearchInquiries and exportInquiriesToCSV process leads accurately', () => {
  const sampleLeads: CustomerInquiry[] = [
    {
      id: 'inq-1',
      fullName: 'Vikas Hooda',
      phone: '+91 98120 11223',
      city: 'Rohtak',
      service: 'Toughened Glass',
      message: '12mm balcony railing, 45 running feet',
      status: 'New',
      createdAt: '2026-11-11 10:00',
      timestamp: 1000,
    },
    {
      id: 'inq-2',
      fullName: 'Sandeep Jindal',
      phone: '+91 94160 99887',
      city: 'Hisar',
      service: 'Slim Profile',
      message: 'Drawing room fluted partition',
      status: 'Contacted',
      createdAt: '2026-11-11 11:30',
      timestamp: 2000,
    },
  ];

  const onlyNew = filterAndSearchInquiries(sampleLeads, 'New', '');
  assert.equal(onlyNew.length, 1);
  assert.equal(onlyNew[0].fullName, 'Vikas Hooda');

  const searchHisar = filterAndSearchInquiries(sampleLeads, 'All', 'hisar');
  assert.equal(searchHisar.length, 1);
  assert.equal(searchHisar[0].id, 'inq-2');

  const csv = exportInquiriesToCSV(sampleLeads);
  assert.ok(csv.includes('Customer Name'));
  assert.ok(csv.includes('"12mm balcony railing, 45 running feet"'));

  const waInquiryMsg = buildInquiryWhatsAppMessage(sampleLeads[0], 'en');
  assert.ok(waInquiryMsg.includes('Vikas Hooda'));
  assert.ok(waInquiryMsg.includes('Rohtak'));
});

test('normalizeFirebaseDbUrl strips trailing slashes and .json suffix', () => {
  assert.equal(
    normalizeFirebaseDbUrl('https://my-project-default-rtdb.firebaseio.com/.json'),
    'https://my-project-default-rtdb.firebaseio.com'
  );
  assert.equal(
    normalizeFirebaseDbUrl('https://my-project-default-rtdb.firebaseio.com///'),
    'https://my-project-default-rtdb.firebaseio.com'
  );
});

test('INITIAL_WORKSHOP_ITEMS contains all 29 analyzed workshop photos with bilingual descriptions and supports filtering', () => {
  assert.equal(INITIAL_WORKSHOP_ITEMS.length, 29);
  for (const item of INITIAL_WORKSHOP_ITEMS) {
    assert.ok(item.titleEn.length > 5);
    assert.ok(item.titleHi.length > 5);
    assert.ok(item.descriptionEn.length > 25);
    assert.ok(item.descriptionHi.length > 25);
    assert.ok(item.imageUrl.startsWith('/assets/aistudio/IMG-20261112-WA'));
  }

  const cncItems = filterWorkshopItems(
    INITIAL_WORKSHOP_ITEMS,
    'CNC Cutting & Milling'
  );
  assert.ok(cncItems.length >= 6);

  const searchGodown = filterWorkshopItems(
    INITIAL_WORKSHOP_ITEMS,
    'All',
    'गोदाम'
  );
  assert.ok(searchGodown.length >= 2);

  const waMsgHi = buildWorkshopWhatsAppMessage(INITIAL_WORKSHOP_ITEMS[0], 'hi');
  assert.ok(waMsgHi.includes(INITIAL_WORKSHOP_ITEMS[0].titleHi));
});

