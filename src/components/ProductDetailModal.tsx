import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Heart, Minus, Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  relatedProducts: Product[];
  wishlist: string[];
  onBack: () => void;
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onBuyNow: (product: Product, colorIndex: number, qty: number) => void;
  onSelectRelated: (product: Product) => void;
  isVariantInCart: (productId: string, colorName: string) => boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  relatedProducts,
  wishlist,
  onBack,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectRelated,
  isVariantInCart,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.includes(product.id);
  const currentImage = product.images[activeImageIndex] || product.images[0];
  const currentColor = product.colors[activeColorIndex] || product.colors[0];
  const isAddedToCart = isVariantInCart(product.id, currentColor.name);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111] antialiased">
      {/* Detail Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#FAF9F6]/80 border-b border-black/5">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-[72px] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#111] text-white grid place-items-center font-bold text-[14px]">
              N
            </div>
            <span className="text-[20px] font-bold tracking-tight text-[#111]">
              NOVA•
            </span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-[13px] font-bold bg-white border border-black/10 px-4 py-2 rounded-full hover:bg-black/5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-black/50 mb-6 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-black flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <span>/</span>
          <span>{product.superCategory}</span>
          <span>/</span>
          <span className="text-black font-semibold">{product.name}</span>
        </div>

        {/* Product Showcase & Info Grid */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16">
          {/* Images Section */}
          <div className="flex gap-4">
            {/* Desktop Vertical Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-[88px]">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`rounded-[20px] aspect-square border-2 overflow-hidden transition-all ${
                    activeImageIndex === i ? 'border-[#111] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  } bg-gradient-to-br ${img.gradient} relative flex items-center justify-center shadow-sm cursor-pointer`}
                >
                  <img src={img.src} alt={`${product.name} ${i}`} className="w-full h-full object-cover select-none" />
                </button>
              ))}
            </div>

            {/* Main Stage */}
            <div className="flex-1">
              <div
                className={`rounded-[32px] bg-gradient-to-br ${currentImage.gradient} aspect-[4/3] md:aspect-square relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center`}
              >
                <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={currentImage.src}
                    alt={product.name}
                    className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-[11px] font-medium tracking-widest text-[#111] shadow-sm z-10">
                  0{activeImageIndex + 1} / 0{product.images.length} • {currentImage.label}
                </div>

                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {product.isNew && (
                    <span className="bg-[#E8FF5A] text-black text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      NEW
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-[#111] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile Horizontal Thumbnails */}
              <div className="flex md:hidden gap-2 mt-3 overflow-x-auto scrollbar-hide py-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className={`min-w-[72px] h-[72px] rounded-[18px] border-2 overflow-hidden ${
                      activeImageIndex === i ? 'border-black' : 'border-black/10'
                    } bg-gradient-to-br ${img.gradient} relative flex items-center justify-center`}
                  >
                    <img src={img.src} alt={`${product.name} ${i}`} className="w-full h-full object-cover select-none" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="pt-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] tracking-[0.2em] font-bold text-black/40 uppercase mb-2">
                  {product.brand} • {product.category}
                </p>
                <h1 className="text-[32px] md:text-[44px] leading-tight font-[800] tracking-[-0.02em] text-[#111]">
                  {product.name}
                </h1>
              </div>
              <button
                type="button"
                onClick={(e) => onToggleWishlist(product.id, e)}
                className="w-11 h-11 rounded-full bg-white border border-black/10 grid place-items-center shadow-sm hover:scale-105 active:scale-95 transition"
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-black text-black' : 'text-[#111]'}`} />
              </button>
            </div>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#111] text-[#111]'
                        : 'text-black/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[13px] font-medium text-black/70">
                {product.rating} • {product.reviewsCount.toLocaleString()} reviews
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  product.inStock ? 'bg-[#E8FF5A] text-black' : 'bg-black/10 text-black/60'
                }`}
              >
                {product.inStock ? 'IN STOCK • Ships today' : 'OUT OF STOCK'}
              </span>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-[36px] font-bold tracking-tight text-[#111]">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[18px] text-black/40 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div className="mt-8">
              <p className="text-[12px] font-bold tracking-widest mb-3 text-[#111]">
                COLOR • {currentColor.name.toUpperCase()}
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setActiveColorIndex(i)}
                    className={`w-10 h-10 rounded-full border-2 grid place-items-center transition ${
                      activeColorIndex === i ? 'border-[#111] scale-110' : 'border-black/15 hover:border-black/40'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner"
                      style={{
                        background: color.hex,
                        border: color.hex === '#FFFFFF' ? '1px solid #e0e0e0' : 'none',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-8 flex gap-3 flex-col sm:flex-row">
              <div className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-2 h-[56px] w-max">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-full hover:bg-black/5 grid place-items-center transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-[16px]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-full hover:bg-black/5 grid place-items-center transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product, activeColorIndex, quantity)}
                className={`flex-1 h-[56px] rounded-full font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                  isAddedToCart ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]' : 'bg-[#111] text-white hover:bg-black'
                }`}
                aria-pressed={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-4 h-4" /> ADDED TO CART
                  </>
                ) : (
                  <>
                    ADD TO CART <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => onBuyNow(product, activeColorIndex, quantity)}
              className="mt-3 w-full h-[56px] rounded-full bg-[#E8FF5A] text-black font-bold tracking-wide border border-black/10 hover:brightness-105 transition shadow-sm hover:scale-[1.01] active:scale-[0.99]"
            >
              BUY NOW — ${(product.price * quantity).toLocaleString()}
            </button>

            {/* Highlights cards */}
            <div className="mt-10 grid grid-cols-2 gap-3 text-[13px]">
              <div className="rounded-[20px] bg-white border border-black/5 p-4 shadow-sm">
                <p className="font-bold text-[#111]">Free shipping over $299</p>
                <p className="text-black/60 mt-1">2-3 days delivery. Tracked express.</p>
              </div>
              <div className="rounded-[20px] bg-white border border-black/5 p-4 shadow-sm">
                <p className="font-bold text-[#111]">2 year warranty</p>
                <p className="text-black/60 mt-1">Extended care and easy replacement.</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="font-bold tracking-tight text-[18px] text-[#111]">Description</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-black/70">
                {product.description} Crafted with precision, built for the future. Minimal seams, maximal intent.
              </p>
              <ul className="mt-4 space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex gap-2 text-[14px] text-black/80 font-medium">
                    <Check className="w-4 h-4 mt-0.5 text-[#111]" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mt-8 border-t border-black/10 pt-8">
              <h4 className="font-bold text-[13px] tracking-widest text-[#111]">SPECIFICATIONS</h4>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="border-b border-black/5 pb-3">
                    <p className="text-[11px] tracking-widest text-black/40 font-bold uppercase">
                      {key}
                    </p>
                    <p className="text-[14px] font-medium mt-1 text-[#111]">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's in the box */}
            <div className="mt-8 border-t border-black/10 pt-8">
              <h4 className="font-bold text-[13px] tracking-widest text-[#111]">WHAT'S IN THE BOX</h4>
              <p className="mt-3 text-[14px] text-black/70 font-medium">{product.box.join(' • ')}</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <h3 className="text-[24px] font-[800] tracking-tight text-[#111]">
            Related — same universe
          </h3>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => {
                  onSelectRelated(rel);
                  setActiveImageIndex(0);
                  setActiveColorIndex(0);
                  setQuantity(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left group cursor-pointer"
              >
                <div
                  className={`rounded-[24px] aspect-[4/3] bg-gradient-to-br ${rel.images[0].gradient} overflow-hidden relative flex items-center justify-center transition-transform group-hover:scale-[1.02] shadow-sm`}
                >
                  <img src={rel.images[0].src} alt={rel.name} className="w-full h-full object-cover select-none" />
                </div>
                <p className="mt-3 text-[13px] font-bold text-[#111] truncate">{rel.name}</p>
                <p className="text-[13px] text-black/60">${rel.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};