import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Format d'articles invalide" },
        { status: 400 }
      );
    }

    // Calculer le nombre total de codes QR nécessaires
    const totalQRCodesNeeded = items.reduce((sum: number, item: any) => {
      const qrCount = parseInt(item.packageId) || 1;
      return sum + qrCount * item.quantity;
    }, 0);

    // Vérifier le stock disponible
    const availableQRCodes = await prisma.qRCode.count({
      where: {
        isActivated: false,
        orderId: null,
      },
    });

    const isAvailable = availableQRCodes >= totalQRCodesNeeded;

    return NextResponse.json({
      available: isAvailable,
      needed: totalQRCodesNeeded,
      inStock: availableQRCodes,
      remaining: availableQRCodes - totalQRCodesNeeded,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du stock:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification du stock" },
      { status: 500 }
    );
  }
}
