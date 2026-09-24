import React from 'react';
import { SlidersHorizontal, ArrowUpRight, X } from 'lucide-react';
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
}) => {
  const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Computing'];

  return (
    <section id="catalog" className="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
      <div className="rounded-[32px] bg-white border border-black/10 p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
        {/* Explorer Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#111] text-white grid place-items-center text-xl shadow-sm">
              ◑
            </div>
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
            <button
              type="button"
              onClick={onOpenFilterDrawer}
              className="h-12 px-5 rounded-full bg-[#FAF9F6] border border-black/10 flex items-center gap-2 text-[13px] font-bold hover:bg-black/5 transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#111] text-white w-5 h-5 rounded-full grid place-items-center text-[11px] font-bold ml-1">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleOpen}
              className={`h-12 px-7 rounded-full font-bold text-[13px] transition flex items-center gap-2 ${
                isOpen ? 'bg-[#111] text-white' : 'bg-[#6C5CFF] text-white hover:bg-[#5b4be8]'
              } shadow-sm`}
            >
              {isOpen ? 'HIDE INVENTORY' : 'VIEW ALL INVENTORY'}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Catalog Body when open */}
        {isOpen && (
          <div className="mt-10">
            {/* Category Buttons & Sorting bar */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`h-10 px-5 rounded-full border text-[13px] font-bold transition cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'bg-[#FAF9F6] border-black/10 hover:bg-white text-[#111]'
                  }`}
                >
                  {cat}
                </button>
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
            {activeFilterCount > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 items-center">
                {filters.categories.map((c) => (
                  <span
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
                  </span>
                ))}

                {filters.brands.map((b) => (
                  <span
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
                  </span>
                ))}

                {filters.colors.map((col) => (
                  <span
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
                  </span>
                ))}

                {filters.rating > 0 && (
                  <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold">
                    {filters.rating}+ stars
                    <button
                      type="button"
                      onClick={() => onClearFilter('rating')}
                      className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {(filters.price[0] > 0 || filters.price[1] < 3500) && (
                  <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#111] text-white text-[12px] font-bold">
                    ${filters.price[0]} - ${filters.price[1]}
                    <button
                      type="button"
                      onClick={() => onClearFilter('price')}
                      className="w-4 h-4 rounded-full bg-white/20 grid place-items-center hover:bg-white/30"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-[12px] font-bold underline text-black/60 hover:text-black ml-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  wishlist={wishlist}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelect={onSelectProduct}
                  size="default"
                />
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="mt-16 text-center py-20 rounded-[32px] bg-[#FAF9F6] border border-dashed border-black/10">
                <p className="text-[26px] font-[800] tracking-tight text-[#111]">
                  No artifacts match.
                </p>
                <p className="text-[14px] text-black/50 mt-2">
                  Try clearing filters or search for "Sony", "Apple", or "Audio".
                </p>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="mt-4 h-10 px-5 rounded-full bg-[#111] text-white text-[13px] font-bold hover:bg-black transition"
                >
                  Reset lab
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
