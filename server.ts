import express from "express";
import path from "path";
import dotenv from "dotenv";
import Stripe from "stripe";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Stripe client initialization
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2023-10-16" as any,
    });
  }
  return stripeClient;
}

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "NOVA• E-Commerce",
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 2. Stripe Config
app.get("/api/stripe/config", (_req, res) => {
  const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
  const isConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
  res.json({
    publishableKey,
    isConfigured,
    mode: isConfigured ? "live_or_test_key" : "simulation",
  });
});

// 3. Create Stripe Payment Intent
app.post("/api/stripe/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd", items, customer } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount provided" });
    }

    const stripe = getStripe();

    if (stripe) {
      // Real Stripe PaymentIntent with Stripe SDK
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert dollars to cents
        currency: currency.toLowerCase(),
        receipt_email: customer?.email || undefined,
        description: `NOVA• Order - ${items?.length || 1} artifact(s)`,
        metadata: {
          customerName: customer?.name || "Guest",
          itemsCount: String(items?.length || 0),
          customerCity: customer?.city || "",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        isSimulated: false,
        amount,
        currency,
      });
    } else {
      // Graceful fallback when STRIPE_SECRET_KEY is not yet populated
      const simulatedId = `pi_sim_${Math.random().toString(36).substring(2, 12)}`;
      const simulatedSecret = `${simulatedId}_secret_${Math.random().toString(36).substring(2, 16)}`;

      return res.json({
        clientSecret: simulatedSecret,
        paymentIntentId: simulatedId,
        isSimulated: true,
        amount,
        currency,
        message:
          "STRIPE_SECRET_KEY not detected in environment. Running in instant Stripe simulation test mode.",
      });
    }
  } catch (error: any) {
    console.error("Stripe payment intent creation error:", error);
    res.status(500).json({
      error: error.message || "Failed to create Stripe payment intent",
    });
  }
});

// 4. Confirm Order record
app.post("/api/orders/confirm", (req, res) => {
  const { orderId, items, customer, amount, paymentIntentId, isSimulated } = req.body;
  const orderRef = orderId || `NOVA-${Math.floor(10000 + Math.random() * 90000)}`;

  console.log(`[NOVA Order Received] ${orderRef}: $${amount} from ${customer?.email}`);

  res.json({
    success: true,
    orderRef,
    estimatedDelivery: "2-3 business days",
    status: "confirmed",
    trackingNumber: `NVTRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
    paymentIntentId,
    isSimulated,
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NOVA• Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
