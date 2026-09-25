import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Search, ShoppingBag, Tag, LayoutGrid, X, CornerDownLeft, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '../types';
import {
  countMatchingProducts,
  getSearchSuggestions,
  splitHighlight,
} from '../utils/searchSuggestions';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  products: Product[];
  cartCount: number;
  onOpenCart: () => void;
  onResetToHome: () => void;
  // Kept optional for type compatibility with parent components
  wishlistCount?: number;
  isCategoriesOpen?: boolean;
  onToggleCategories?: () => void;
  onSelectCategory?: (cat: string) => void;
  onSelectSort?: (sort: string) => void;
  onToast?: (msg: string) => void;
}

/**
 * The header is two rows on phones (logo + cart, then a full-width search bar)
 * and a single row from `sm` up. The fixed header and the spacer that reserves
 * its height must always agree, so both share this one value.
 */
const HEADER_HEIGHT = 'h-[114px] sm:h-[72px]';

/** Emphasis for the part of a suggestion that the query actually hit. */
const Highlighted: React.FC<{ text: string; query: string }> = ({ text, query }) => (
  <>
    {splitHighlight(text, query).map((part, i) =>
      part.match ? (
        <mark key={i} className="bg-transparent text-[#6C5CFF] font-[800]">
          {part.text}
        </mark>
      ) : (
        <span key={i}>{part.text}</span>
      )
    )}
  </>
);

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  searchInputRef,
  products,
  cartCount,
  onOpenCart,
  onResetToHome,
}) => {
  const listboxId = useId();
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // The list widens as the query grows — see `suggestionLimit` in the util.
  const suggestions = useMemo(
    () => getSearchSuggestions(products, searchQuery),
    [products, searchQuery]
  );

  const matchCount = useMemo(
    () => countMatchingProducts(products, searchQuery),
    [products, searchQuery]
  );

  const isEmptyQuery = searchQuery.trim().length === 0;
  const showDropdown = isOpen && (suggestions.length > 0 || !isEmptyQuery);

  // A fresh query always re-targets the top row.
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(0, suggestions.length - 1)));
  }, [suggestions.length]);

  // Clicking anywhere else — including the catalog below — dismisses the menu.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const openSearch = useCallback(() => setIsOpen(true), []);

  const commit = useCallback(
    (value: string) => {
      onSearchChange(value);
      setIsOpen(false);
      setActiveIndex(0);
      // Selecting happens via mousedown, so pull focus back for further typing.
      searchInputRef.current?.focus();
    },
    [onSearchChange, searchInputRef]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          return;
        }
        if (suggestions.length) setActiveIndex((i) => (i + 1) % suggestions.length);
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          return;
        }
        if (suggestions.length) {
          setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        }
        break;

      case 'Enter': {
        if (!isOpen) return;
        e.preventDefault();
        const picked = suggestions[activeIndex];
        commit(picked ? picked.value : searchQuery);
        break;
      }

      case 'Escape':
        // Dismisses the menu only. Clearing the field is the X button's job, so
        // a stray Escape never throws away a query the shopper just typed.
        e.preventDefault();
        setIsOpen(false);
        break;

      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <>
      {/* Reserve the navbar height while the fixed header stays visible over the page. */}
      <div aria-hidden="true" className={HEADER_HEIGHT} />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-xl bg-[#FAF9F6]/95 border-b border-black/[0.06]"
      >
        <div
          className={`mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 ${HEADER_HEIGHT} grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2.5 sm:flex sm:items-center sm:justify-between sm:gap-6`}
        >
          {/* Left: Brand Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-start-1 row-start-1 flex items-center min-w-0"
          >
            <button
              type="button"
              onClick={onResetToHome}
              className="flex items-center gap-2 sm:gap-3 text-left group min-w-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111] text-white grid place-items-center font-bold text-[12px] sm:text-[14px] shadow-sm group-hover:scale-105 transition shrink-0">
                N
              </div>
              <span className="text-[18px] sm:text-[22px] font-[800] tracking-[-0.02em] text-[#111] truncate">
                NOVA•
              </span>
            </button>
          </motion.div>

          {/* Center: Search input — full width on its own row on phones */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-start-1 row-start-2 col-span-2 sm:col-span-1 w-full sm:w-auto sm:flex-1 sm:max-w-[520px]"
          >
            <div ref={searchWrapRef} className="relative">
              <div
                className={`w-full h-10 sm:h-11 rounded-full bg-white border flex items-center px-3 sm:px-4 gap-2 sm:gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition ${
                  isOpen ? 'border-black/30' : 'border-black/10 focus-within:border-black/30'
                }`}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-black/40" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    // Typing always revives the menu, even after an Escape.
                    setIsOpen(true);
                  }}
                  onFocus={openSearch}
                  onClick={openSearch}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, brands, categories..."
                  role="combobox"
                  aria-expanded={showDropdown}
                  aria-controls={listboxId}
                  aria-autocomplete="list"
                  aria-activedescendant={
                    showDropdown && suggestions[activeIndex]
                      ? `${listboxId}-${activeIndex}`
                      : undefined
                  }
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent outline-none text-[13px] sm:text-[14px] placeholder:text-black/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      onSearchChange('');
                      setIsOpen(true);
                      searchInputRef.current?.focus();
                    }}
                    className="shrink-0 grid place-items-center w-5 h-5 rounded-full bg-black/5 hover:bg-black/10 text-black/50 hover:text-black transition cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <span className="hidden lg:flex items-center gap-1 text-[11px] font-medium bg-black/5 px-2 py-1 rounded-full text-black/50 select-none">
                  ⌘ K
                </span>
              </div>

              {/* Suggestions are absolutely positioned so the reserved header
                  height (HEADER_HEIGHT) is unaffected by how many rows show. */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.985 }}
                    transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 origin-top overflow-hidden rounded-[18px] sm:rounded-[22px] bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
                  >
                    <div className="max-h-[min(58vh,420px)] overflow-y-auto overscroll-contain">
                      <p className="px-3 sm:px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black/35 select-none">
                        {isEmptyQuery ? 'Trending now' : 'Suggestions'}
                      </p>

                      <ul id={listboxId} role="listbox" aria-label="Search suggestions" className="pb-1">
                        {suggestions.length === 0 && (
                          <li className="px-3 sm:px-4 py-4 text-center">
                            <p className="text-[13px] sm:text-[14px] font-semibold text-[#111]">
                              No matches yet
                            </p>
                            <p className="text-[11px] sm:text-[12px] text-black/45 mt-1">
                              Try a brand, a category, or part of a product name.
                            </p>
                          </li>
                        )}

                        {suggestions.map((suggestion, index) => (
                          <li
                            key={suggestion.id}
                            id={`${listboxId}-${index}`}
                            role="option"
                            aria-selected={index === activeIndex}
                          >
                            <button
                              type="button"
                              // Keep focus on the field so the committed text stays editable.
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => commit(suggestion.value)}
                              onMouseEnter={() => setActiveIndex(index)}
                              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-left transition-colors cursor-pointer ${
                                index === activeIndex ? 'bg-[#6C5CFF]/[0.07]' : 'hover:bg-black/[0.03]'
                              }`}
                            >
                              <span className="shrink-0 grid place-items-center w-8 h-8 rounded-[10px] bg-black/[0.04] text-[13px]">
                                {suggestion.product?.images[0]?.emoji ??
                                  (suggestion.kind === 'brand' ? (
                                    <Tag className="w-3.5 h-3.5 text-black/50" />
                                  ) : (
                                    <LayoutGrid className="w-3.5 h-3.5 text-black/50" />
                                  ))}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[13px] sm:text-[14px] font-semibold text-[#111]">
                                  <Highlighted text={suggestion.label} query={searchQuery} />
                                </span>
                                <span className="block truncate text-[11px] sm:text-[12px] text-black/45">
                                  {suggestion.meta}
                                </span>
                              </span>

                              {index === activeIndex && (
                                <CornerDownLeft className="w-3.5 h-3.5 shrink-0 text-black/25" />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] px-3 sm:px-4 py-2.5">
                        <p className="min-w-0 truncate text-[11px] sm:text-[12px] text-black/45">
                          {isEmptyQuery ? (
                            <span className="inline-flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                              Start typing to narrow things down
                            </span>
                          ) : (
                            <>
                              <span className="font-bold text-black/70">{matchCount}</span>{' '}
                              {matchCount === 1 ? 'match' : 'matches'} for “{searchQuery.trim()}”
                            </>
                          )}
                        </p>
                        {!isEmptyQuery && (
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => commit(searchQuery.trim())}
                            className="shrink-0 text-[11px] sm:text-[12px] font-bold text-[#6C5CFF] hover:underline cursor-pointer"
                          >
                            See all
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Cart Action */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-start-2 row-start-1 justify-self-end flex items-center gap-2"
          >
            <button
              type="button"
              onClick={onOpenCart}
              className="h-9 px-3 sm:h-10 sm:px-4 rounded-full bg-[#111] text-white flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-bold hover:bg-black transition shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-black w-5 h-5 rounded-full grid place-items-center text-[11px] font-bold">
                {cartCount}
              </span>
            </button>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};
