import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

export const PLAQUE_PRICE_ID =
  process.env.STRIPE_PLACE_PRICE_ID || "price_placeholder";

export async function createCheckoutSession(metadata: Record<string, string>) {
  return stripe.checkout.sessions.create({
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
