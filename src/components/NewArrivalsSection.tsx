import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll,
}) => {
  return (
    <section id="new" className="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[34px] md:text-[48px] font-[800] tracking-[-0.02em] text-[#111]">
          New arrivals
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[13px] font-bold underline decoration-2 underline-offset-4 text-[#111] hover:text-black transition cursor-pointer"
        >
          View all new — {products.length} items
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((item, index) => {
          const isRowSpan = index % 3 === 0;
          const isShifted1 = index === 1;
          const isShifted2 = index === 2;

          return (
            <div
              key={item.id}
              className={`${isRowSpan ? 'row-span-2' : ''} ${
                isShifted1 ? 'mt-6 lg:mt-10' : ''
              } ${isShifted2 ? 'lg:mt-4' : ''}`}
            >
              <ProductCard
                product={item}
                wishlist={wishlist}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelect={onSelectProduct}
                size={isRowSpan ? 'tall' : 'default'}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
