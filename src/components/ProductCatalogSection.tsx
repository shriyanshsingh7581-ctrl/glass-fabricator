import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowUpRight,
  Package,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Language,
  ProductCategory,
  ProductItem,
  SiteSettings,
} from '../types/cms';
import { PRODUCT_CATEGORIES } from '../data/initialData';
import {
  buildProductWhatsAppMessage,
  buildWhatsAppUrl,
  filterProducts,
} from '../utils/logic';

interface ProductCatalogSectionProps {
  lang: Language;
  products: ProductItem[];
  settings: SiteSettings;
  onBookProductQuote: (product: ProductItem) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  lang,
  products,
  settings,
  onBookProductQuote,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('All');

  const visibleProducts = filterProducts(products, selectedCategory, true);

  return (
    <section
      id="catalog"
      className="py-16 sm:py-24 bg-[#F6F3EC] text-[#141311] border-b border-[#D6CFC2] atelier-grid-light"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Editorial Header + Interactive Category Filter Bar */}
        <div className="border border-[#D6CFC2] bg-[#FDFBF7] p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#C2410C] font-semibold">
                <Package className="w-4 h-4" />
                <span>
                  {lang === 'hi'
                    ? 'प्रोडक्ट कैटलॉग · इन-हाउस फैब्रिकेटेड विंडो, डोर, ग्लास और एलईडी मिरर'
                    : 'ARCHITECTURAL PRODUCT CATALOG · CUSTOM FABRICATED IN HISAR'}
                </span>
              </div>
              <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-5xl text-[#141311] leading-[1.08]">
                {lang === 'hi'
                  ? 'सिग्नेचर प्रोडक्ट्स और लाइव शोरूम रेंज'
                  : 'Signature Fenestration, Glass & LED Mirror Systems'}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#57534E]">
              <SlidersHorizontal className="w-4 h-4 text-[#C2410C]" />
              <span>
                {lang === 'hi'
                  ? `कुल ${visibleProducts.length} उत्पाद उपलब्ध`
                  : `SHOWING ${visibleProducts.length} ARCHITECTURAL SYSTEMS`}
              </span>
            </div>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="mt-8 pt-6 border-t border-[#E5DEC9] flex flex-wrap items-center gap-1.5">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2.5 text-xs font-architectural font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#141311] text-[#FDFBF7] border-[#141311]'
                      : 'bg-white text-[#44403C] border-[#D6CFC2] hover:border-[#141311] hover:text-[#141311]'
                  }`}
                >
                  {lang === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Architectural Grid */}
        {visibleProducts.length === 0 ? (
          <div className="border-x border-b border-[#D6CFC2] bg-[#FDFBF7] p-12 text-center">
            <p className="text-sm text-[#57534E]">
              {lang === 'hi'
                ? 'इस श्रेणी में कोई उत्पाद नहीं मिला।'
                : 'No products found in this category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-x border-b border-[#D6CFC2] bg-[#D6CFC2] gap-px">
            {visibleProducts.map((product, index) => {
              const title = lang === 'hi' ? product.titleHi : product.titleEn;
              const desc =
                lang === 'hi' ? product.descriptionHi : product.descriptionEn;
              const specLine =
                lang === 'hi' ? product.badgeHi : product.badgeEn;
              const waUrl = buildWhatsAppUrl(
                settings.whatsappNumber,
                buildProductWhatsAppMessage(product, lang)
              );

              return (
                <article
                  key={product.id}
                  className="bg-[#FDFBF7] hover:bg-white flex flex-col justify-between transition-colors group"
                >
                  <div>
                    {/* Top Metadata Ledger */}
                    <div className="px-4 py-2.5 bg-[#F6F3EC] border-b border-[#D6CFC2] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#C2410C] font-bold uppercase">
                        {product.category}
                      </span>
                      <span className="text-[#78716C] tabular-nums">
                        SYS · 0{index + 1}
                      </span>
                    </div>

                    {/* Product Photograph */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1917] border-b border-[#D6CFC2]">
                      <img
                        src={product.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {specLine && (
                        <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-[#FDE68A] truncate">
                          {specLine}
                        </div>
                      )}
                    </div>

                    {/* Product Copy */}
                    <div className="p-6">
                      <h3 className="font-architectural font-bold text-lg text-[#141311] group-hover:text-[#C2410C] transition-colors leading-snug">
                        {title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Product Card Action Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#ECE7DC] grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onBookProductQuote(product)}
                      className="inline-flex items-center justify-center gap-1 py-2.5 px-3 bg-[#141311] hover:bg-[#C2410C] text-[#FDFBF7] text-xs font-architectural font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>{lang === 'hi' ? 'कोटेशन लें' : 'Get Quote'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-architectural font-bold uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
