export interface StripeConfigResponse {
  publishableKey: string;
  isConfigured: boolean;
  mode: 'live_or_test_key' | 'simulation';
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  isSimulated: boolean;
  amount: number;
  currency: string;
  message?: string;
}

export async function fetchStripeConfig(): Promise<StripeConfigResponse> {
  try {
    const res = await fetch('/api/stripe/config');
    if (!res.ok) throw new Error('Failed to fetch Stripe config');
    return await res.json();
  } catch (err) {
    console.warn('Could not reach backend Stripe config, using client fallback:', err);
    return {
      publishableKey: (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || '',
      isConfigured: false,
      mode: 'simulation',
    };
  }
}

export async function createPaymentIntent(
  amount: number,
  items: Array<{ id: string; color: string; qty: number; name: string; price: number }>,
  customer: { name: string; email: string; address?: string; city?: string; zip?: string }
): Promise<PaymentIntentResponse> {
  try {
    const res = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'usd',
        items,
        customer,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create payment intent');
    }

    return await res.json();
  } catch (err: any) {
    console.warn('Backend payment intent failed or unreachable, simulating payment intent client-side:', err);
    const simulatedId = `pi_sim_${Math.random().toString(36).substring(2, 10)}`;
    return {
      clientSecret: `${simulatedId}_secret_${Math.random().toString(36).substring(2, 16)}`,
      paymentIntentId: simulatedId,
      isSimulated: true,
      amount,
      currency: 'usd',
      message: err.message || 'Client-side fallback simulation',
    };
  }
}

export async function confirmOrder(data: {
  orderId?: string;
  items: any[];
  customer: any;
  amount: number;
  paymentIntentId?: string;
  isSimulated?: boolean;
}) {
  try {
    const res = await fetch('/api/orders/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to confirm order with backend');
    return await res.json();
  } catch (err) {
    console.warn('Backend order confirmation failed, generating client confirmation:', err);
    const orderRef = data.orderId || `NOVA-${Math.floor(10000 + Math.random() * 90000)}`;
    return {
      success: true,
      orderRef,
      estimatedDelivery: '2-3 business days',
      status: 'confirmed',
      trackingNumber: `NVTRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentIntentId: data.paymentIntentId,
      isSimulated: data.isSimulated ?? true,
    };
  }
}
