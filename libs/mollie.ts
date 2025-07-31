import { createMollieClient } from "@mollie/api-client";

// Ne créer le client que si la clé API est disponible
const getMollieClient = () => {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    throw new Error("MOLLIE_API_KEY is not configured");
  }
  return createMollieClient({ apiKey });
};

export interface CreatePaymentData {
  amount: number;
  currency: string;
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  metadata: {
    orderId: string;
    email: string;
  };
}

export async function createPayment(data: CreatePaymentData) {
  try {
    const mollieClient = getMollieClient();

    const paymentData: any = {
      amount: {
        currency: data.currency,
        value: data.amount.toFixed(2),
      },
      description: data.description,
      redirectUrl: data.redirectUrl,
      metadata: data.metadata,
    };

    if (data.webhookUrl) {
      paymentData.webhookUrl = data.webhookUrl;
    }

    const payment = await mollieClient.payments.create(paymentData);

    return payment;
  } catch (error) {
    console.error("Erreur lors de la création du paiement Mollie:", error);
    throw error;
  }
}

export async function getPayment(paymentId: string) {
  try {
    const mollieClient = getMollieClient();
    const payment = await mollieClient.payments.get(paymentId);
    return payment;
  } catch (error) {
    console.error("Erreur lors de la récupération du paiement:", error);
    throw error;
  }
}

export async function cancelPayment(paymentId: string) {
  try {
    const mollieClient = getMollieClient();
    const payment = await mollieClient.payments.cancel(paymentId);
    return payment;
  } catch (error) {
    console.error("Erreur lors de l'annulation du paiement:", error);
    throw error;
  }
}
