import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Check, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem, CheckoutFormData, OrderConfirmation } from '../types';
import { createPaymentIntent, confirmOrder, fetchStripeConfig, StripeConfigResponse } from '../services/stripe';

interface CheckoutModalProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  form: CheckoutFormData;
  setForm: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
  cartTotal: number;
  shipping: number;
  onClose: () => void;
  onConfirmSuccess: (order: OrderConfirmation) => void;
  cartItems: CartItem[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  step,
  setStep,
  form,
  setForm,
  cartTotal,
  shipping,
  onClose,
  onConfirmSuccess,
  cartItems,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeConfig, setStripeConfig] = useState<StripeConfigResponse | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Dynamic shipping cost based on selection
  const shippingCost =
    form.shipping === 'Overnight'
      ? 49
      : form.shipping === 'Express'
      ? 19
      : cartTotal > 299
      ? 0
      : shipping;

  const totalAmount = cartTotal + shippingCost;

  // Load Stripe config on mount
  useEffect(() => {
    fetchStripeConfig().then((cfg) => setStripeConfig(cfg));
  }, []);

  // Format card number with spaces (#### #### #### ####)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setForm((prev) => ({ ...prev, card: formatted }));
  };

  // Format expiry (MM / YY)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setForm((prev) => ({ ...prev, expiry: `${raw.slice(0, 2)} / ${raw.slice(2)}` }));
    } else {
      setForm((prev) => ({ ...prev, expiry: raw }));
    }
  };

  // Quick fill test card
  const fillStripeTestCard = () => {
    setForm((prev) => ({
      ...prev,
      card: '4242 4242 4242 4242',
      expiry: '12 / 28',
      cvc: '345',
    }));
    setErrorMessage(null);
  };

  // Form field validations
  const validateStep = (currentStep: number): boolean => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!form.email || !form.email.includes('@')) {
        setErrorMessage('Please provide a valid email address');
        return false;
      }
      if (!form.name.trim()) {
        setErrorMessage('Please enter your full name');
        return false;
      }
      if (!form.address.trim() || !form.city.trim() || !form.zip.trim()) {
        setErrorMessage('Please complete all shipping address fields');
        return false;
      }
    }
    if (currentStep === 3) {
      const cleanCard = form.card.replace(/\s+/g, '');
      if (cleanCard.length < 15) {
        setErrorMessage('Please enter a valid card number');
        return false;
      }
      if (!form.expiry || form.expiry.length < 5) {
        setErrorMessage('Please enter card expiry (MM / YY)');
        return false;
      }
      if (!form.cvc || form.cvc.length < 3) {
        setErrorMessage('Please enter a valid CVC');
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep(step)) return;

    if (step === 2) {
      // Create Stripe payment intent when transitioning to payment
      setIsProcessing(true);
      try {
        const intent = await createPaymentIntent(
          totalAmount,
          cartItems.map((i) => ({
            id: i.id,
            color: i.color,
            qty: i.qty,
            name: i.product.name,
            price: i.product.price,
          })),
          {
            name: form.name,
            email: form.email,
            address: form.address,
            city: form.city,
            zip: form.zip,
          }
        );
        setPaymentIntentId(intent.paymentIntentId);
      } catch (e: any) {
        console.warn('Payment intent notice:', e);
      } finally {
        setIsProcessing(false);
      }
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      // Step 4 -> Execute Payment and Order Confirmation
      await handleExecutePayment();
    }
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      // Call backend order confirmation & Stripe capture
      const result = await confirmOrder({
        amount: totalAmount,
        items: cartItems.map((i) => ({
          id: i.id,
          name: i.product.name,
          color: i.color,
          qty: i.qty,
          price: i.product.price,
        })),
        customer: form,
        paymentIntentId: paymentIntentId || `pi_${Date.now()}`,
        isSimulated: !stripeConfig?.isConfigured,
      });

      const orderData: OrderConfirmation = {
        orderRef: result.orderRef,
        estimatedDelivery: result.estimatedDelivery || '2-3 business days',
        trackingNumber: result.trackingNumber,
        total: totalAmount,
        items: [...cartItems],
        customer: { ...form },
        isSimulated: result.isSimulated,
      };

      setConfirmedOrder(orderData);
      onConfirmSuccess(orderData);
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // If order is completed, display Receipt View
  if (confirmedOrder) {
    return (
      <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-0 md:p-6">
        <div className="w-full md:max-w-[680px] bg-white rounded-t-[32px] md:rounded-[32px] border border-black/10 shadow-[0_30px_120px_rgba(0,0,0,0.25)] overflow-hidden p-6 md:p-10 text-left">
          <div className="flex items-center justify-between border-b border-black/5 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#107C10] text-white grid place-items-center text-xl font-bold shadow-md">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[24px] font-[800] tracking-tight text-[#111]">
                  Payment Confirmed
                </h3>
                <p className="text-[13px] text-black/50">
                  Order #{confirmedOrder.orderRef} • Receipt sent to {confirmedOrder.customer.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-black/10 grid place-items-center hover:bg-black/5 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-[20px] bg-[#FAF9F6] border border-black/5 p-4 flex justify-between items-center text-[13px]">
              <div>
                <p className="text-black/50 text-[11px] font-bold tracking-widest uppercase">
                  TRACKING NUMBER
                </p>
                <p className="font-bold text-[15px] text-[#111] mt-0.5">
                  {confirmedOrder.trackingNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-black/50 text-[11px] font-bold tracking-widest uppercase">
                  ESTIMATED ARRIVAL
                </p>
                <p className="font-bold text-[14px] text-[#111] mt-0.5">
                  {confirmedOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            <div className="rounded-[20px] bg-[#FAF9F6] border border-black/5 p-4 text-[13px]">
              <p className="text-black/50 text-[11px] font-bold tracking-widest uppercase mb-2">
                ITEMS ORDERED
              </p>
              <div className="space-y-2 max-h-[160px] overflow-y-auto">
                {confirmedOrder.items.map((it) => (
                  <div key={`${it.id}-${it.color}`} className="flex justify-between items-center">
                    <span className="font-medium text-[#111]">
                      {it.product.name} ({it.color}) × {it.qty}
                    </span>
                    <span className="font-bold text-[#111]">
                      ${(it.product.price * it.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/10 mt-3 pt-3 flex justify-between font-[800] text-[15px]">
                <span>Total Paid via Stripe</span>
                <span>${confirmedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-[16px] bg-[#E8FF5A]/40 border border-black/10 p-4 text-[12px] flex items-center gap-2 text-black/80">
              <ShieldCheck className="w-4 h-4 text-[#107C10] shrink-0" />
              <span>
                Includes 2-year complimentary hardware warranty, tracked courier delivery, and 30-day return guarantee.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 w-full h-[52px] rounded-full bg-[#111] text-white font-bold text-[14px] hover:bg-black transition shadow-sm"
          >
            DONE • BACK TO STORE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-0 md:p-6">
      <div className="w-full md:max-w-[880px] bg-[#FAF9F6] rounded-t-[32px] md:rounded-[32px] border border-black/10 shadow-[0_30px_120px_rgba(0,0,0,0.25)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="h-[72px] px-6 md:px-8 flex items-center justify-between border-b border-black/5 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#111] text-white grid place-items-center font-bold text-[12px]">
              N
            </div>
            <span className="font-bold text-[15px] text-[#111]">
              Checkout • Step {step} of 4
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Step bubbles */}
            <div className="hidden md:flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-1.5 rounded-full transition-all ${
                    s <= step ? 'bg-[#111]' : 'bg-black/10'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-black/10 grid place-items-center hover:bg-black/5 transition"
              aria-label="Close checkout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left form, right order summary */}
        <div className="flex-1 overflow-y-auto grid md:grid-cols-[1.2fr_0.8fr] gap-0">
          {/* Left: Wizard step */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {errorMessage && (
                <div className="mb-4 p-3 rounded-[14px] bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium">
                  {errorMessage}
                </div>
              )}

              {/* STEP 1: Information */}
              {step === 1 && (
                <div>
                  <h3 className="text-[24px] font-[800] tracking-tight text-[#111]">Information</h3>
                  <p className="text-[13px] text-black/50 mt-1">
                    Enter contact and destination details.
                  </p>

                  <div className="mt-6 grid gap-4">
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Email address (for receipt and tracking)"
                      type="email"
                      className="h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] focus:border-black/30"
                    />
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] focus:border-black/30"
                    />
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Delivery street address"
                      className="h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] focus:border-black/30"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="City"
                        className="h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] focus:border-black/30"
                      />
                      <input
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        placeholder="ZIP / Postal code"
                        className="h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] focus:border-black/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Shipping */}
              {step === 2 && (
                <div>
                  <h3 className="text-[24px] font-[800] tracking-tight text-[#111]">Shipping</h3>
                  <p className="text-[13px] text-black/50 mt-1">Select your preferred courier tier.</p>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        id: 'Standard',
                        price: cartTotal > 299 ? 0 : 19,
                        time: cartTotal > 299 ? '2-3 days • Free unlocked over $299' : '2-3 days delivery',
                      },
                      {
                        id: 'Express',
                        price: 19,
                        time: '1-2 days • Priority handling & tracking',
                      },
                      {
                        id: 'Overnight',
                        price: 49,
                        time: 'Next-day delivery by 12:00 PM',
                      },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setForm({ ...form, shipping: method.id })}
                        className={`w-full text-left p-4 rounded-[16px] border flex items-center justify-between transition cursor-pointer ${
                          form.shipping === method.id
                            ? 'border-[#111] bg-white shadow-sm'
                            : 'border-black/10 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-[14px] text-[#111]">{method.id}</p>
                          <p className="text-[12px] text-black/50">{method.time}</p>
                        </div>
                        <span className="font-bold text-[14px] text-[#111]">
                          {method.price === 0 ? 'Free' : `$${method.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Payment (Stripe Processing) */}
              {step === 3 && (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[24px] font-[800] tracking-tight text-[#111]">Payment</h3>
                      <p className="text-[13px] text-black/50 mt-1">
                        Integrated Stripe payment gateway.
                      </p>
                    </div>
                    {/* Stripe indicator badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#6C5CFF]/10 text-[#6C5CFF] rounded-full text-[11px] font-bold border border-[#6C5CFF]/20">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>STRIPE POWERED</span>
                    </div>
                  </div>

                  {/* Auto-fill helper for test card */}
                  <div className="mt-4 flex items-center justify-between p-3 rounded-[14px] bg-[#FAF9F6] border border-black/10 text-[12px]">
                    <span className="text-black/60">Test credentials available</span>
                    <button
                      type="button"
                      onClick={fillStripeTestCard}
                      className="px-3 py-1 bg-[#111] text-white rounded-full font-bold text-[11px] hover:bg-black transition flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-[#E8FF5A]" /> Autofill 4242 Test Card
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <div>
                      <label className="text-[11px] font-bold tracking-widest text-black/50 block mb-1 uppercase">
                        CARD NUMBER
                      </label>
                      <input
                        value={form.card}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] font-mono focus:border-black/30"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold tracking-widest text-black/50 block mb-1 uppercase">
                          EXPIRATION
                        </label>
                        <input
                          value={form.expiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] font-mono focus:border-black/30"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold tracking-widest text-black/50 block mb-1 uppercase">
                          SECURITY CODE (CVC)
                        </label>
                        <input
                          value={form.cvc}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              cvc: e.target.value.replace(/\D/g, '').slice(0, 4),
                            })
                          }
                          placeholder="CVC"
                          maxLength={4}
                          className="w-full h-12 px-4 rounded-[14px] border border-black/10 bg-white outline-none text-[14px] font-mono focus:border-black/30"
                        />
                      </div>
                    </div>

                    <div className="rounded-[16px] bg-[#E8FF5A]/40 border border-black/10 p-4 text-[12px] font-medium text-black/80 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#107C10] shrink-0" />
                      <span>
                        🔒 256-bit TLS encrypted transaction with Stripe. Funds captured securely.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Place Order */}
              {step === 4 && (
                <div>
                  <h3 className="text-[24px] font-[800] tracking-tight text-[#111]">
                    Review & Place Order
                  </h3>
                  <p className="text-[13px] text-black/50 mt-1">
                    Please verify your shipping and payment info.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-[16px] bg-white border border-black/10 p-4 text-[13px]">
                      <p className="font-bold text-[#111]">Ship to</p>
                      <p className="text-black/60 mt-1">
                        {form.name} • {form.address}, {form.city} {form.zip} • {form.email}
                      </p>
                    </div>

                    <div className="rounded-[16px] bg-white border border-black/10 p-4 text-[13px]">
                      <p className="font-bold text-[#111]">Shipping Method</p>
                      <p className="text-black/60 mt-1">
                        {form.shipping} • {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                      </p>
                    </div>

                    <div className="rounded-[16px] bg-white border border-black/10 p-4 text-[13px]">
                      <p className="font-bold text-[#111]">Stripe Payment Card</p>
                      <p className="text-black/60 mt-1">
                        •••• {form.card.replace(/\s+/g, '').slice(-4) || '4242'} • Exp{' '}
                        {form.expiry || '12/28'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Buttons */}
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setStep((prev) => prev - 1)}
                  className="h-12 px-6 rounded-full bg-white border border-black/10 font-bold text-[13px] hover:bg-black/5 transition disabled:opacity-50"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleNext}
                className="flex-1 h-12 rounded-full bg-[#111] text-white font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-black transition shadow-sm disabled:opacity-50"
              >
                {isProcessing
                  ? 'Processing Stripe Payment...'
                  : step < 4
                  ? 'Continue'
                  : `Pay $${totalAmount.toLocaleString()} with Stripe`}
                {!isProcessing && <ArrowUpRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white border-t md:border-t-0 md:border-l border-black/5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-[13px] tracking-widest text-[#111]">
                ORDER SUMMARY • {cartItems.length} ITEMS
              </h4>

              <div className="mt-4 space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-3 items-center">
                    <div
                      className={`w-14 h-14 rounded-[12px] bg-gradient-to-br ${item.product.images[0].gradient} grid place-items-center text-xl shrink-0`}
                    >
                      {item.product.images[0].emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold leading-[1.2] truncate text-[#111]">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-black/50">
                        {item.color} • Qty {item.qty}
                      </p>
                    </div>
                    <span className="text-[13px] font-bold text-[#111]">
                      ${(item.product.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-black/60">Subtotal</span>
                  <span className="font-bold text-[#111]">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Shipping</span>
                  <span className="font-bold text-[#111]">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-[16px] pt-2 border-t border-black/10 font-[800] text-[#111]">
                  <span>Total</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-black/40 leading-[1.4]">
              By placing this order you agree to NOVA Terms. 2-year warranty included. Free returns 30 days. Order protected by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
