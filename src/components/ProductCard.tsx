import React from 'react';
import { Check, Heart, Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onSelect: (product: Product) => void;
  isInCart?: boolean;
  size?: 'default' | 'tall' | 'large';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelect,
  isInCart = false,
  size = 'default',
}) => {
  const isTall = size === 'tall';
  const isLarge = size === 'large';
  const isWishlisted = wishlist.includes(product.id);
  const isAddedToCart = isInCart;

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group text-left rounded-[20px] sm:rounded-[28px] md:rounded-[32px] bg-white border border-black/5 p-2 sm:p-3 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer snap-start ${
        isLarge ? 'min-w-[70vw] sm:min-w-[260px] md:min-w-[360px]' : ''
      } ${isTall ? 'h-full flex flex-col justify-between' : ''}`}
    >
      <div
        className={`relative rounded-[14px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden bg-gradient-to-br ${
          product.images[0].gradient
        } ${isTall ? 'aspect-[3/4]' : isLarge ? 'aspect-[4/3]' : 'aspect-[4/3]'} flex items-center justify-center`}
      >
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <img
            src={product.images[0].src}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 select-none"
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1 sm:gap-1.5 flex-wrap z-10">
          {product.isNew && (
            <span className="bg-[#E8FF5A] text-black text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wide sm:tracking-widest shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#111] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wide sm:tracking-widest shadow-sm">
              BEST
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#6C5CFF] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wide sm:tracking-widest shadow-sm">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => onToggleWishlist(product.id, e)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur border border-black/10 grid place-items-center shadow hover:scale-105 active:scale-95 transition z-10"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-black text-black' : 'text-[#111]'}`} />
        </button>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex justify-between items-center gap-1 z-10">
          <span className="bg-white/90 backdrop-blur text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-black/10 truncate">
            {product.brand}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full text-white grid place-items-center transition-all shadow-md cursor-pointer ${
              isAddedToCart
                ? 'bg-[#22C55E] opacity-100 translate-y-0 hover:scale-105 active:scale-95'
                : // Touch devices have no hover, so stay visible there and reveal on hover only from `up`.
                  'bg-[#111] opacity-100 translate-y-0 hover:scale-105 active:scale-95 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0'
            }`}
            aria-label={isAddedToCart ? 'Added to cart' : 'Add to cart'}
            aria-pressed={isAddedToCart}
          >
            {isAddedToCart ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-1 pt-2 pb-0.5 sm:px-2 sm:pt-3 sm:pb-1">
        <div className="flex items-start justify-between gap-1.5 sm:gap-2">
          <p className="font-bold text-[12px] sm:text-[14px] leading-[1.2] line-clamp-2 text-[#111] min-w-0">
            {product.name}
          </p>
          <span className="text-[10px] sm:text-[12px] text-black/40 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap shrink-0">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black/20 text-transparent" />
            {product.rating}
          </span>
        </div>
        <p className="text-[10px] sm:text-[12px] text-black/50 mt-0.5 sm:mt-1 truncate">
          {product.category} • {product.colors.length} colors
        </p>
        <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-bold text-[13px] sm:text-[15px] text-[#111]">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[12px] text-black/40 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};