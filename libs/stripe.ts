import Stripe from "stripe";

// Only throw error if we're actually trying to use Stripe (not during build)
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-05-28.basil",
    });
  }

  return stripeInstance;
}

export { getStripe };

// For backward compatibility, export stripe as a getter
export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

export const PLAQUE_PRICE_ID =
  process.env.STRIPE_PLACE_PRICE_ID || "price_placeholder";

export async function createCheckoutSession(metadata: Record<string, string>) {
  return getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: PLAQUE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    metadata,
  });
}
