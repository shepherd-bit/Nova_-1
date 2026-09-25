import React from 'react';
import { SlidersHorizontal, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface InventoryCatalogProps {
  products: Product[];
  wishlist: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  activeSort: string;
  onSelectSort: (sort: string) => void;
  filters: FilterState;
  onClearFilter: (key: keyof FilterState, value?: any) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  isOpen: boolean;
  onToggleOpen: () => void;
  onOpenFilterDrawer: () => void;
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onSelectProduct: (product: Product) => void;
  isVariantInCart: (productId: string, colorName: string) => boolean;
}

export const InventoryCatalog: React.FC<InventoryCatalogProps> = ({
  products,
  wishlist,
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
  filters,
  onClearFilter,
  onResetFilters,
  activeFilterCount,
  isOpen,
  onToggleOpen,
  onOpenFilterDrawer,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isVariantInCart,
}) => {
  const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Computing'];

  return (
    <section id="catalog" className="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
      <motion.div 
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="rounded-[32px] bg-white border border-black/10 p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)]"
      >
        {/* Explorer Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full bg-[#111] text-white grid place-items-center text-xl shadow-sm cursor-pointer"
            >
              ◑
            </motion.div>
            <div>
              <h2 className="text-[28px] md:text-[36px] font-[800] leading-tight tracking-[-0.02em] text-[#111]">
                Inventory Explorer
              </h2>
              <p className="text-[13px] text-black/50 mt-1">
                Asymmetrical catalog • 24 artifacts • edited for obsessives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              type="button"
              onClick={onOpenFilterDrawer}
              className="h-12 px-5 rounded-full bg-[#FAF9F6] border border-black/10 flex items-center gap-2 text-[13px] font-bold hover:bg-black/5 transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-[#111] text-white w-5 h-5 rounded-full grid place-items-center text-[11px] font-bold ml-1"
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              type="button"
              onClick={onToggleOpen}
              className={`h-12 px-7 rounded-full font-bold text-[13px] transition flex items-center gap-2 ${
                isOpen ? 'bg-[#111] text-white' : 'bg-[#6C5CFF] text-white hover:bg-[#5b4be8]'
              } shadow-sm`}
            >
              {isOpen ? 'HIDE INVENTORY' : 'VIEW ALL INVENTORY'}
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Catalog Body when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="catalog-body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="mt-10">
                {/* Category Buttons & Sorting bar */}
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      type="button"
                      onClick={() => onSelectCategory(cat)}
                      className={`h-10 px-5 rounded-full border text-[13px] font-bold transition cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-[#111] text-white border-[#111]'
                          : 'bg-[#FAF9F6] border-black/10 hover:bg-white text-[#111]'
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}

                  <div className="ml-auto flex items-center gap-2 mt-2 sm:mt-0">
                    <span className="text-[12px] text-black/40 font-bold tracking-widest">
                      SORT
                    </span>
                    <select
                      value={activeSort}
                      onChange={(e) => onSelectSort(e.target.value)}
                      className="h-10 px-4 rounded-full bg-[#FAF9F6] border border-black/10 text-[13px] font-medium outline-none cursor-pointer focus:border-black/30"
                    >
                      <option>Popular</option>
                      <option>Price Low-High</option>
                      <option>Price High-Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>

                {/* Active filter badges */}
                <AnimatePresence>
                  {activeFilterCount > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 flex flex-wrap gap-2 items-center"
                    >
                      {filters.categories.map((c) => (
                        <motion.span
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          key={c}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold"
                        >
                          {c}
                          <button
                            type="button"
                            onClick={() => onClearFilter('categories', c)}
                            className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}

                      {filters.brands.map((b) => (
                        <motion.span
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          key={b}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold"
                        >
                          {b}
                          <button
                            type="button"
                            onClick={() => onClearFilter('brands', b)}
                            className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}

                      {filters.colors.map((col) => (
                        <motion.span
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          key={col}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold"
                        >
                          {col}
                          <button
                            type="button"
                            onClick={() => onClearFilter('colors', col)}
                            className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}

                      {filters.rating > 0 && (
                        <motion.span 
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold"
                        >
                          {filters.rating}+ stars
                          <button
                            type="button"
                            onClick={() => onClearFilter('rating')}
                            className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}

                      {(filters.price[0] > 0 || filters.price[1] < 3500) && (
                        <motion.span 
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold"
                        >
                          ${filters.price[0]} -${filters.price[1]}
                          <button
                            type="button"
                            onClick={() => onClearFilter('price')}
                            className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}

                      <button
                        type="button"
                        onClick={onResetFilters}
                        className="text-[12px] font-bold underline text-black/60 hover:text-black ml-2 cursor-pointer"
                      >
                        Clear all
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Products Grid */}
                <motion.div 
                  layout
                  className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {products.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                      >
                        <ProductCard
                          product={item}
                          wishlist={wishlist}
                          onToggleWishlist={onToggleWishlist}
                          onAddToCart={onAddToCart}
                          onSelect={onSelectProduct}
                          isInCart={isVariantInCart(item.id, item.colors[0]?.name || '')}
                          size="default"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {products.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-16 text-center py-20 rounded-[32px] bg-[#FAF9F6] border border-dashed border-black/10"
                  >
                    <p className="text-[26px] font-[800] tracking-tight text-[#111]">
                      No artifacts match.
                    </p>
                    <p className="text-[14px] text-black/50 mt-2">
                      Try clearing filters or search for "Sony", "Apple", or "Audio".
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      type="button"
                      onClick={onResetFilters}
                      className="mt-4 h-10 px-5 rounded-full bg-[#111] text-white text-[13px] font-bold hover:bg-black transition"
                    >
                      Reset lab
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};