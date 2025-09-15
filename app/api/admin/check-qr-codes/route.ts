import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    // Compter les codes QR disponibles (inactifs et non associés)
    const availableCount = await prisma.qRCode.count({
      where: {
        isActivated: false,
        orderId: null,
      },
    });

    // Compter les codes QR activés
    const activatedCount = await prisma.qRCode.count({
      where: {
        isActivated: true,
      },
    });

    // Compter les codes QR associés à des commandes mais non activés
    const assignedCount = await prisma.qRCode.count({
      where: {
        isActivated: false,
        orderId: {
          not: null,
        },
      },
    });

    // Compter le total
    const totalCount = await prisma.qRCode.count();

    return NextResponse.json({
      available: availableCount,
      activated: activatedCount,
      assigned: assignedCount,
      total: totalCount,
      needsGeneration: availableCount < 50, // Générer si moins de 50 disponibles
    });
  } catch (error) {
    console.error("Erreur lors de la vérification des codes QR:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { count = 100 } = body;

    // Générer de nouveaux codes QR
    const generatedCodes = [];

    for (let i = 0; i < count; i++) {
      // Générer un code unique
      let code = "";
      let exists = true;

      while (exists) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        code = "";
        for (let j = 0; j < 8; j++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Vérifier si le code existe déjà
        const existingCode = await prisma.qRCode.findUnique({
          where: { code },
        });

        if (!existingCode) {
          exists = false;
        }
      }

      // Créer le code QR
      const now = new Date();
      const qrCode = await prisma.qRCode.create({
        data: {
          code,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          isActivated: false,
        },
      });

      generatedCodes.push(qrCode);
    }

    return NextResponse.json({
      success: true,
      message: `${count} codes QR générés avec succès`,
      generated: generatedCodes.length,
    });
  } catch (error) {
    console.error("Erreur lors de la génération des codes QR:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération" },
      { status: 500 }
    );
  }
}
