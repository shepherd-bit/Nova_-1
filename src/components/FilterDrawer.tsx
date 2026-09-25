import React from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterDrawerProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  brands: string[];
  categories: string[];
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  filters,
  setFilters,
  brands,
  categories,
  onClose,
}) => {
  const toggleCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      price: [0, 3500],
      rating: 0,
      inStock: false,
      onSale: false,
      isNew: false,
      colors: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-full sm:w-[380px] sm:max-w-[88vw] bg-white h-full overflow-y-auto border-l border-black/10 shadow-[-20px_0_80px_rgba(0,0,0,0.12)] p-4 sm:p-6 flex flex-col z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[19px] sm:text-[22px] font-[800] tracking-tight text-[#111]">Filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 shrink-0 rounded-full bg-[#FAF9F6] border border-black/10 grid place-items-center hover:bg-black/5 transition"
            aria-label="Close filters"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 sm:mt-8 space-y-6 sm:space-y-8 flex-1">
          {/* Categories */}
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold tracking-widest mb-2.5 sm:mb-3 text-[#111]">CATEGORY</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = filters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`h-8 sm:h-9 px-3 sm:px-4 rounded-full border text-[12px] sm:text-[13px] font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#111] text-white border-[#111]'
                        : 'bg-[#FAF9F6] border-black/10 hover:bg-white text-[#111]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands */}
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold tracking-widest mb-2.5 sm:mb-3 text-[#111]">BRAND</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => {
                const isSelected = filters.brands.includes(brand);
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className={`h-8 sm:h-9 px-3 sm:px-4 rounded-full border text-[12px] sm:text-[13px] font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#111] text-white border-[#111]'
                        : 'bg-[#FAF9F6] border-black/10 hover:bg-white text-[#111]'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold tracking-widest mb-2.5 sm:mb-3 text-[#111]">
              PRICE RANGE • ${filters.price[0]} - ${filters.price[1]}
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={3500}
                step={50}
                value={filters.price[0]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price: [Number(e.target.value), prev.price[1]],
                  }))
                }
                className="min-w-0 flex-1 h-6 accent-[#111] cursor-pointer"
              />
              <input
                type="range"
                min={0}
                max={3500}
                step={50}
                value={filters.price[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price: [prev.price[0], Number(e.target.value)],
                  }))
                }
                className="min-w-0 flex-1 h-6 accent-[#6C5CFF] cursor-pointer"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold tracking-widest mb-2.5 sm:mb-3 text-[#111]">RATING</p>
            <div className="flex gap-2">
              {[0, 4, 4.5, 4.8].map((rat) => {
                const isSelected = filters.rating === rat;
                return (
                  <button
                    key={rat}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, rating: rat }))}
                    className={`h-8 sm:h-9 px-3 sm:px-4 rounded-full border text-[12px] sm:text-[13px] font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#111] text-white border-[#111]'
                        : 'bg-[#FAF9F6] border-black/10 hover:bg-white text-[#111]'
                    }`}
                  >
                    {rat === 0 ? 'Any' : `${rat}+`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold tracking-widest mb-2.5 sm:mb-3 text-[#111]">FEATURES</p>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { k: 'inStock' as const, label: 'In stock only' },
                { k: 'onSale' as const, label: 'On sale' },
                { k: 'isNew' as const, label: 'New arrivals' },
              ].map((item) => (
                <label
                  key={item.k}
                  className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-[14px] sm:rounded-[16px] bg-[#FAF9F6] border border-black/5 cursor-pointer hover:bg-black/5 transition"
                >
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#111]">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={filters[item.k]}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, [item.k]: e.target.checked }))
                    }
                    className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 accent-[#111] cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-6 sm:pt-8 flex gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 h-11 sm:h-12 rounded-full bg-[#FAF9F6] border border-black/10 font-bold text-[12px] sm:text-[13px] text-[#111] hover:bg-black/5 transition"
          >
            RESET
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 sm:h-12 rounded-full bg-[#111] text-white font-bold text-[12px] sm:text-[13px] hover:bg-black transition shadow-sm"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};
