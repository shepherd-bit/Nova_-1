import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, X, ArrowUpRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen?: boolean; // Optional prop if you control visibility from outside, or manage via conditional rendering
  cartItems: CartItem[];
  cartTotal: number;
  shipping: number;
  onClose: () => void;
  onUpdateQty: (productId: string, color: string, delta: number) => void;
  onRemove: (productId: string, color: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cartItems,
  cartTotal,
  shipping,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}) => {
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const finalTotal = cartTotal + shipping;
  const freeShippingThreshold = 299;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Container Slide Animation */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full sm:w-[420px] sm:max-w-[92vw] bg-white h-full flex flex-col border-l border-black/10 shadow-[-20px_0_80px_rgba(0,0,0,0.15)] z-10"
      >
        {/* Header */}
        <div className="h-14 sm:h-[72px] px-4 sm:px-6 flex items-center justify-between border-b border-black/5">
          <h3 className="text-[17px] sm:text-[20px] font-[800] tracking-tight text-[#111]">
            Cart • {totalItemsCount} items
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-black/10 grid place-items-center hover:bg-black/5 transition shrink-0"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {cartItems.length > 0 && (
          <div className="px-4 sm:px-6 py-2.5 bg-[#FAF9F6] border-b border-black/5 text-[11px] sm:text-[12px]">
            {remainingForFreeShipping > 0 ? (
              <p className="text-black/70">
                Add <span className="font-bold text-[#111]">${remainingForFreeShipping}</span> more for{' '}
                <span className="font-bold text-[#111]">Free Express Shipping</span>
              </p>
            ) : (
              <p className="text-black/80 font-bold flex items-center gap-1 text-[#107C10]">
                ✓ You have unlocked Free Express Shipping!
              </p>
            )}
            <div className="w-full bg-black/10 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#111] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3">
          {cartItems.length === 0 ? (
            <div className="py-12 sm:py-20 text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#FAF9F6] grid place-items-center text-2xl sm:text-3xl shadow-inner">
                🛒
              </div>
              <p className="mt-3.5 sm:mt-4 font-bold text-[#111] text-[15px] sm:text-[16px]">Your lab is empty</p>
              <p className="text-[12px] sm:text-[13px] text-black/50 mt-1">
                Add artifacts — shipping is free over $299
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 h-10 px-4 sm:px-5 rounded-full bg-[#111] text-white text-[12px] sm:text-[13px] font-bold hover:bg-black transition shadow-sm"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const currentImage = item.product.images[0];
              
              return (
                <div
                  key={`${item.id}-${item.color}`}
                  className="rounded-[16px] sm:rounded-[20px] border border-black/5 p-2.5 sm:p-3 flex gap-2.5 sm:gap-3 bg-[#FAF9F6]/60 shadow-sm items-center"
                >
                  {/* Product thumbnail uses the same image source as the product card. */}
                  <div
                    className={`w-16 h-16 sm:w-[84px] sm:h-[84px] rounded-[14px] sm:rounded-[16px] bg-gradient-to-br ${currentImage?.gradient || 'from-gray-100 to-gray-200'} overflow-hidden relative grid place-items-center shrink-0 border border-black/5`}
                  >
                    {currentImage?.src ? (
                      <img
                        src={currentImage.src}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl">{currentImage?.emoji || '📦'}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[12px] sm:text-[13px] leading-[1.2] truncate text-[#111]">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-black/50 mt-0.5 sm:mt-1 truncate">
                      {item.color} • {item.product.brand}
                    </p>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 bg-white border border-black/10 rounded-full px-1 shadow-inner">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.color, -1)}
                          className="w-8 h-8 sm:w-6 sm:h-6 rounded-full hover:bg-black/5 grid place-items-center transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                        </button>
                        <span className="w-5 sm:w-6 text-center text-[12px] font-bold text-[#111]">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, item.color, 1)}
                          className="w-8 h-8 sm:w-6 sm:h-6 rounded-full hover:bg-black/5 grid place-items-center transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-[12px] sm:text-[13px] text-[#111]">
                        ${(item.product.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(item.id, item.color)}
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white border border-black/10 grid place-items-center self-start hover:bg-red-50 hover:border-red-200 transition text-black/60 hover:text-red-600 shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-black/5 bg-white">
            <div className="space-y-2 text-[12px] sm:text-[13px]">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal</span>
                <span className="font-bold text-[#111]">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Shipping</span>
                <span className="font-bold text-[#111]">
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-[15px] sm:text-[16px] pt-2 border-t border-black/10">
                <span className="font-bold text-[#111]">Total</span>
                <span className="font-[800] text-[#111]">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="mt-4 sm:mt-5 w-full h-12 sm:h-[52px] rounded-full bg-[#111] text-white font-bold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 hover:bg-black transition shadow-sm hover:scale-[1.01] active:scale-[0.99]"
            >
              CHECKOUT <ArrowUpRight className="w-4 h-4" />
            </button>

            <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-center text-black/40">
              2-year warranty • 30-day returns • Secure Stripe checkout
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};