import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const resolvedParams = await params;

    // Trouver le QR code par le code avec les relations
    const qrCode = await prisma.qRCode.findUnique({
      where: { code: resolvedParams.code },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        link: {
          select: {
            googleReviewUrl: true,
          },
        },
      },
    });

    console.log(qrCode);

    if (!qrCode) {
      return NextResponse.json(
        { error: "Code QR non trouvé" },
        { status: 404 }
      );
    }

    // // Si le QR code est activé et a un lien Google, rediriger
    // if (qrCode.isActivated && qrCode.link?.googleReviewUrl) {
    //   return NextResponse.redirect(qrCode.link.googleReviewUrl);
    // }

    // // Sinon, retourner les informations pour l'activation
    return NextResponse.json({
      id: qrCode.id,
      code: qrCode.code,
      isActivated: qrCode.isActivated,
      googleReviewUrl: qrCode.link?.googleReviewUrl || null,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du QR code:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
