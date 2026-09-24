import React from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onSelect: (product: Product) => void;
  size?: 'default' | 'tall' | 'large';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelect,
  size = 'default',
}) => {
  const isTall = size === 'tall';
  const isLarge = size === 'large';
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group text-left rounded-[28px] md:rounded-[32px] bg-white border border-black/5 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer snap-start ${
        isLarge ? 'min-w-[300px] md:min-w-[360px]' : ''
      } ${isTall ? 'h-full flex flex-col justify-between' : ''}`}
    >
      <div
        className={`relative rounded-[20px] md:rounded-[24px] overflow-hidden bg-gradient-to-br ${
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
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
          {product.isNew && (
            <span className="bg-[#E8FF5A] text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest shadow-sm">
              BEST
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#6C5CFF] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest shadow-sm">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => onToggleWishlist(product.id, e)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-black/10 grid place-items-center shadow hover:scale-105 active:scale-95 transition z-10"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black text-black' : 'text-[#111]'}`} />
        </button>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
          <span className="bg-white/90 backdrop-blur text-[11px] font-bold px-2.5 py-1 rounded-full border border-black/10">
            {product.brand}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-9 h-9 rounded-full bg-[#111] text-white grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-105 active:scale-95 shadow-md"
            aria-label="Add to cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-2 pt-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-[14px] leading-[1.2] line-clamp-2 text-[#111]">
            {product.name}
          </p>
          <span className="text-[12px] text-black/40 flex items-center gap-1 whitespace-nowrap">
            <Star className="w-3 h-3 fill-black/20 text-transparent" />
            {product.rating}
          </span>
        </div>
        <p className="text-[12px] text-black/50 mt-1">
          {product.category} • {product.colors.length} colors
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-[15px] text-[#111]">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-black/40 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};