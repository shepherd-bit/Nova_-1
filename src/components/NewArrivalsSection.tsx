import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string, e?: React.MouseEvent) => void;
  onAddToCart: (product: Product, colorIndex?: number, qty?: number) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
  isVariantInCart: (productId: string, colorName: string) => boolean;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewAll,
  isVariantInCart,
}) => {
  return (
    <section id="new" className="mx-auto max-w-[1600px] px-6 md:px-10 py-14">
      <div className="flex items-baseline justify-between">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[34px] md:text-[48px] font-[800] tracking-[-0.02em] text-[#111]"
        >
          New arrivals
        </motion.h2>
        
        <motion.button
          type="button"
          onClick={onViewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[13px] font-bold underline decoration-2 underline-offset-4 text-[#111] hover:text-black transition cursor-pointer"
        >
          View all new — {products.length} items
        </motion.button>
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((item, index) => {
          const isRowSpan = index % 3 === 0;
          const isShifted1 = index === 1;
          const isShifted2 = index === 2;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -4 }}
              className={`${isRowSpan ? 'row-span-2' : ''} ${
                isShifted1 ? 'mt-6 lg:mt-10' : ''
              } ${isShifted2 ? 'lg:mt-4' : ''} transition-shadow duration-300`}
            >
              <ProductCard
                product={item}
                wishlist={wishlist}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelect={onSelectProduct}
                isInCart={isVariantInCart(item.id, item.colors[0]?.name || '')}
                size={isRowSpan ? 'tall' : 'default'}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};