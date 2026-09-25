import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface BestSellersSectionProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onSelectProduct: (product: Product) => void;
  isVariantInCart: (productId: string, colorName: string) => boolean;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isVariantInCart,
}) => {
  return (
    <section id="best-sellers" className="py-10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 flex items-end justify-between">
        <h2 className="text-[34px] md:text-[48px] font-[800] tracking-[-0.02em] leading-[1.05] text-[#111]">
          Best selling
          <br />
          <span className="text-black/30 font-bold">— lab favorites</span>
        </h2>
        <div className="hidden md:flex items-center gap-2 text-[13px] text-black/50 font-medium">
          <span>Drag to explore</span>
          <span className="w-10 h-[1px] bg-black/20" />
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 md:px-10 pr-10 snap-x snap-mandatory">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onSelect={onSelectProduct}
              isInCart={isVariantInCart(item.id, item.colors[0]?.name || '')}
              size="large"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
