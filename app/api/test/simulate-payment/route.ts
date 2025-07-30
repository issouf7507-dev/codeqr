import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { sendPurchaseConfirmationEmail } from "@/libs/email";

// Fonction pour générer un code unique
function generateUniqueCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  // Vérifier que nous sommes en mode développement
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Cette fonctionnalité n'est disponible qu'en développement" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "ID de commande manquant" },
        { status: 400 }
      );
    }

    // Récupérer la commande
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingInfo: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Mettre à jour le statut de la commande
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "PAID" },
    });

    // Prendre des codes QR inactifs existants pour chaque item de la commande
    const qrCodes = [];
    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        // Chercher un code QR inactif disponible
        const availableQRCode = await prisma.qRCode.findFirst({
          where: {
            isActivated: false,
            orderId: null, // Pas encore associé à une commande
          },
          orderBy: {
            createdAt: "asc", // Prendre le plus ancien d'abord
          },
        });

        if (!availableQRCode) {
          console.error(
            "Aucun code QR inactif disponible pour la commande",
            order.id
          );
          return NextResponse.json(
            { error: "Aucun code QR disponible" },
            { status: 500 }
          );
        }

        // Associer le code QR à la commande
        const updatedQRCode = await prisma.qRCode.update({
          where: { id: availableQRCode.id },
          data: {
            orderId: order.id,
          },
        });

        qrCodes.push(updatedQRCode);
      }
    }

    // Envoyer l'email de confirmation avec le premier code
    if (qrCodes.length > 0) {
      await sendPurchaseConfirmationEmail(
        order.email,
        qrCodes[0].code,
        qrCodes[0].id
      );
    }

    return NextResponse.json({
      success: true,
      message: "Paiement simulé avec succès",
      qrCodesGenerated: qrCodes.length,
    });
  } catch (error) {
    console.error("Erreur lors de la simulation du paiement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la simulation du paiement" },
      { status: 500 }
    );
  }
}
