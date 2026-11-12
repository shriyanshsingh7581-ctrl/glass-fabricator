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
    <section id="catalog" className="py-20 sm:py-28 bg-white text-[#263746]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A6A1]/10 text-xs sm:text-sm font-bold tracking-wide text-[#16A6A1]">
              {lang === 'hi'
                ? 'प्रोडक्ट लाइनअप · इन-हाउस CNC फैब्रिकेशन'
                : 'Explore the Lineup · Custom Fabricated in Hisar'}
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.032em] text-[#102A43] leading-[1.08]">
              {lang === 'hi' ? (
                <>
                  सिग्नेचर विंडो और ग्लास सिस्टम।{' '}
                  <span className="text-[#16A6A1]">हर स्पेस के लिए खास।</span>
                </>
              ) : (
                <>
                  Explore the lineup.{' '}
                  <span className="text-[#16A6A1]">
                    Built for modern architecture.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="text-sm font-semibold text-[#16A6A1] tabular-nums">
            {lang === 'hi'
              ? `${visibleProducts.length} सिस्टम उपलब्ध`
              : `Showing ${visibleProducts.length} architectural systems`}
          </div>
        </div>

        {/* Segmented Category Tabs */}
        <div className="mt-8 flex overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1 bg-[#F3F6F8] border border-[#DCE4EA] p-1.5 rounded-2xl">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'text-[#263746]/70 hover:text-[#102A43]'
                  }`}
                >
                  {lang === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lineup Product Cards */}
        {visibleProducts.length === 0 ? (
          <div className="mt-10 rounded-[28px] bg-[#F3F6F8] border border-[#DCE4EA] p-12 text-center">
            <p className="text-base text-[#263746]/70">
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
                  className="rounded-[28px] bg-[#F3F6F8] border border-[#DCE4EA] overflow-hidden flex flex-col justify-between architectural-card-hover group"
                >
                  <div>
                    {/* Product Image Showcase */}
                    <div className="p-3 pb-0">
                      <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-white border border-[#DCE4EA]">
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
                      <div className="text-xs font-semibold text-[#16A6A1] flex items-center gap-1.5">
                        <span className="font-bold">
                          {product.category}
                        </span>
                        {specLine && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{specLine}</span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] text-[#102A43] leading-snug">
                        {title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#263746]/80 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* CTA Footer with Glass Teal Button */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#DCE4EA] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onBookProductQuote(product)}
                      className="px-4 py-2 rounded-xl bg-[#16A6A1] hover:bg-[#128A86] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                    >
                      {lang === 'hi' ? 'कोटेशन लें' : 'Get Quote'}
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#102A43] hover:text-[#16A6A1] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#16A6A1]" />
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
