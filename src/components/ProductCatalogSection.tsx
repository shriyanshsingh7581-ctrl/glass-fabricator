import React, { useState } from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';
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
    <section id="catalog" className="py-20 sm:py-28 bg-white text-[#1D1D1F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Apple "Explore the lineup" Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0071E3]">
              {lang === 'hi'
                ? 'प्रोडक्ट लाइनअप · इन-हाउस CNC फैब्रिकेशन'
                : 'Explore the Lineup · Custom Fabricated in Hisar'}
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#1D1D1F] leading-[1.08]">
              {lang === 'hi' ? (
                <>
                  सिग्नेचर विंडो और ग्लास सिस्टम।{' '}
                  <span className="text-[#86868B]">हर स्पेस के लिए खास।</span>
                </>
              ) : (
                <>
                  Explore the lineup.{' '}
                  <span className="text-[#86868B]">
                    Built for modern architecture.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="text-sm text-[#86868B] tabular-nums">
            {lang === 'hi'
              ? `${visibleProducts.length} सिस्टम उपलब्ध`
              : `Showing ${visibleProducts.length} architectural systems`}
          </div>
        </div>

        {/* Apple Segmented Category Tabs */}
        <div className="mt-8 flex overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1 bg-[#F5F5F7] p-1.5 rounded-2xl">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#1D1D1F] text-white shadow-xs'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {lang === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apple Lineup Product Cards */}
        {visibleProducts.length === 0 ? (
          <div className="mt-10 rounded-[28px] bg-[#F5F5F7] p-12 text-center">
            <p className="text-base text-[#6E6E73]">
              {lang === 'hi'
                ? 'इस श्रेणी में कोई उत्पाद नहीं मिला।'
                : 'No products found in this category.'}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => {
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
                  className="rounded-[28px] bg-[#F5F5F7] overflow-hidden flex flex-col justify-between apple-card-hover group"
                >
                  <div>
                    {/* Product Image Showcase */}
                    <div className="p-3 pb-0">
                      <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-white">
                        <img
                          src={product.imageUrl}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Product Copy */}
                    <div className="p-6">
                      <div className="text-xs font-medium text-[#86868B] flex items-center gap-1.5">
                        <span className="text-[#BF4800] font-semibold">
                          {product.category}
                        </span>
                        {specLine && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{specLine}</span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] text-[#1D1D1F] leading-snug">
                        {title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Apple Lineup CTA Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onBookProductQuote(product)}
                      className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {lang === 'hi' ? 'कोटेशन लें' : 'Get Quote'}
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#0066CC] hover:underline whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
