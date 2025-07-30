import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getPayment } from "@/libs/mollie";
import { sendPurchaseConfirmationEmail } from "@/libs/email";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        qrCodes: {
          select: {
            id: true,
            code: true,
            isActivated: true,
          },
        },
      },
    });

    // Vérifier si des codes QR sont déjà associés à cette commande
    const existingQRCodes = await prisma.qRCode.findMany({
      where: {
        orderId: order?.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    let qrCodes = existingQRCodes;

    // Si aucun code QR n'est associé et que la commande est payée, en associer de nouveaux
    if (order && existingQRCodes.length === 0 && order.status === "PAID") {
      qrCodes = [];
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
      if (qrCodes.length > 0 && order) {
        await sendPurchaseConfirmationEmail(
          order.email,
          qrCodes[0].code,
          qrCodes[0].id,
          qrCodes[0].imageUrl
        );
      }
    }

    // console.log("order", qrCodes);

    if (!order) {
      return NextResponse.json(
        { error: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Si la commande a un ID Mollie, vérifier le statut
    let mollieStatus = null;
    let statusChanged = false;
    if (order.mollieId) {
      try {
        const payment = await getPayment(order.mollieId);
        mollieStatus = payment.status;

        // Si le paiement est payé mais la commande ne l'est pas, mettre à jour
        if (payment.status === "paid" && order.status !== "PAID") {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "PAID" },
          });
          order.status = "PAID";
          statusChanged = true;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification Mollie:", error);
      }
    }

    // Si le statut vient de changer vers PAID et qu'il y a des codes QR, envoyer l'email
    if (statusChanged && order.status === "PAID" && qrCodes.length > 0) {
      await sendPurchaseConfirmationEmail(
        order.email,
        qrCodes[0].code,
        qrCodes[0].id,
        qrCodes[0].imageUrl
      );
    }

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        mollieStatus,
        totalAmount: order.totalAmount,
        email: order.email,
        mollieId: order.mollieId,
        createdAt: order.createdAt,
        items: order.items,
        qrCodes: qrCodes.map((qr) => ({
          id: qr.id,
          code: qr.code,
          isActivated: qr.isActivated,
        })),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification du statut" },
      { status: 500 }
    );
  }
}
