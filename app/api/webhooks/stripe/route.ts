import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../libs/stripe";
import { prisma } from "../../../../libs/db";
import { generateQRCode } from "../../../../libs/qrcode";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Erreur de signature webhook:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const { plaqueId, codeId, email } = session.metadata;

    try {
      // Mettre à jour la plaque avec l'email de l'acheteur
      await prisma.plaque.update({
        where: { id: plaqueId },
        data: {
          // Pour l'instant, on ne lie pas à un utilisateur spécifique
          // L'utilisateur devra s'inscrire et activer la plaque avec le code
        },
      });

      // Marquer le code comme réclamé
      await prisma.code.update({
        where: { value: codeId },
        data: { isClaimed: true },
      });

      // Ici, vous pourriez envoyer un email de confirmation
      // avec le code unique pour activer la plaque

      console.log(
        `Paiement réussi pour la plaque ${plaqueId} avec le code ${codeId}`
      );
    } catch (error) {
      console.error("Erreur lors du traitement du paiement:", error);
      return NextResponse.json(
        { error: "Erreur lors du traitement" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
