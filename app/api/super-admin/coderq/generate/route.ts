import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import QRCode from "qrcode";

// Génère un code alphanumérique unique (5 caractères, uppercase)
function generateCode(length = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const { month, year, count } = await req.json();
    if (!month || !year || !count) {
      return NextResponse.json(
        { error: "month, year et count sont requis" },
        { status: 400 }
      );
    }

    const codes = [];
    for (let i = 0; i < count; i++) {
      let code;
      let exists = true;
      // S'assurer de l'unicité du code
      while (exists) {
        code = generateCode();

        exists = !!(await prisma.qRCode.findUnique({ where: { code } }));
      }

      // Générer l'URL complète pour le QR code
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://gdigitalgroup.com";
      const qrCodeUrl = `${baseUrl}/qr/${code}/activation`;

      // Générer l'image QR code (base64)
      const imageUrl = await QRCode.toDataURL(qrCodeUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      // Stocker en base
      const qr = await prisma.qRCode.create({
        data: {
          code: code as string,
          month,
          year,
          imageUrl,
          isActivated: false,
        },
      });
      codes.push(qr);
    }
    return NextResponse.json({ codes });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// https://maps.google.com/?q=test
