import React from 'react';
import { Minus, Plus, Trash2, X, ArrowUpRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
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
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Cart Container */}
      <div className="w-[420px] max-w-[92vw] bg-white h-full flex flex-col border-l border-black/10 shadow-[-20px_0_80px_rgba(0,0,0,0.15)] z-10">
        {/* Header */}
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-black/5">
          <h3 className="text-[20px] font-[800] tracking-tight text-[#111]">
            Cart • {totalItemsCount} items
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-black/10 grid place-items-center hover:bg-black/5 transition"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {cartItems.length > 0 && (
          <div className="px-6 py-2.5 bg-[#FAF9F6] border-b border-black/5 text-[12px]">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF9F6] grid place-items-center text-3xl shadow-inner">
                🛒
              </div>
              <p className="mt-4 font-bold text-[#111] text-[16px]">Your lab is empty</p>
              <p className="text-[13px] text-black/50 mt-1">
                Add artifacts — shipping is free over $299
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 h-10 px-5 rounded-full bg-[#111] text-white text-[13px] font-bold hover:bg-black transition shadow-sm"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="rounded-[20px] border border-black/5 p-3 flex gap-3 bg-[#FAF9F6]/60 shadow-sm"
              >
                <div
                  className={`w-[84px] h-[84px] rounded-[16px] bg-gradient-to-br ${item.product.images[0].gradient} grid place-items-center text-3xl shrink-0`}
                >
                  {item.product.images[0].emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[13px] leading-[1.2] truncate text-[#111]">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-black/50 mt-1">
                    {item.color} • {item.product.brand}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-white border border-black/10 rounded-full px-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.color, -1)}
                        className="w-6 h-6 rounded-full hover:bg-black/5 grid place-items-center transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-[12px] font-bold text-[#111]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.color, 1)}
                        className="w-6 h-6 rounded-full hover:bg-black/5 grid place-items-center transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-[13px] text-[#111]">
                      ${(item.product.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(item.id, item.color)}
                  className="w-8 h-8 rounded-full bg-white border border-black/10 grid place-items-center self-start hover:bg-red-50 hover:border-red-200 transition text-black/60 hover:text-red-600"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-black/5 bg-white">
            <div className="space-y-2 text-[13px]">
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
              <div className="flex justify-between text-[16px] pt-2 border-t border-black/10">
                <span className="font-bold text-[#111]">Total</span>
                <span className="font-[800] text-[#111]">${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="mt-5 w-full h-[52px] rounded-full bg-[#111] text-white font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-black transition shadow-sm hover:scale-[1.01] active:scale-[0.99]"
            >
              CHECKOUT <ArrowUpRight className="w-4 h-4" />
            </button>

            <p className="mt-3 text-[11px] text-center text-black/40">
              2-year warranty • 30-day returns • Secure Stripe checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
