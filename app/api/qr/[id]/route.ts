import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Trouver le QR code par le code avec les relations
    const qrCode = await prisma.qRCode.findUnique({
      where: { code: id },
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

    // console.log(qrCode);

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR code non trouvé" },
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
      activatedAt: qrCode.activatedAt,
      activatedBy: qrCode.user
        ? {
            id: qrCode.user.id,
            email: qrCode.user.email,
          }
        : null,
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
