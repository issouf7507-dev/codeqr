import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { googleReviewUrl } = await request.json();
    const resolvedParams = await params;

    // Validation des données d'entrée
    if (!googleReviewUrl || typeof googleReviewUrl !== "string") {
      return NextResponse.json(
        { error: "L'URL Google Review est requise" },
        { status: 400 }
      );
    }

    // Validation du format de l'URL Google
    if (
      !googleReviewUrl.startsWith("https://g.page/r/") &&
      !googleReviewUrl.startsWith("https://maps.app.goo.gl/")
    ) {
      return NextResponse.json(
        { error: "Le lien Google Avis doit être un lien Google Maps valide" },
        { status: 400 }
      );
    }

    // Vérifier que le QR code existe et est activé
    const qrCode = await prisma.qRCode.findUnique({
      where: { code: resolvedParams.id },
      include: {
        link: true,
      },
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: "Code QR non trouvé" },
        { status: 404 }
      );
    }

    if (!qrCode.isActivated) {
      return NextResponse.json(
        { error: "Ce code QR n'est pas activé" },
        { status: 400 }
      );
    }

    if (!qrCode.link) {
      return NextResponse.json(
        { error: "Aucun lien associé à ce code QR" },
        { status: 400 }
      );
    }

    // Vérifier si cette URL est déjà utilisée par un autre QR code
    const existingLink = await prisma.link.findFirst({
      where: {
        googleReviewUrl,
        NOT: {
          id: qrCode.link.id,
        },
      },
    });

    if (existingLink) {
      return NextResponse.json(
        { error: "Ce lien Google est déjà utilisé par un autre QR code" },
        { status: 400 }
      );
    }

    // Mettre à jour le lien Google
    const updatedLink = await prisma.link.update({
      where: { id: qrCode.link.id },
      data: {
        googleReviewUrl,
      },
    });

    return NextResponse.json({
      message: "Lien Google mis à jour avec succès",
      success: true,
      link: {
        id: updatedLink.id,
        googleReviewUrl: updatedLink.googleReviewUrl,
      },
    });
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du lien:", error);

    // Gérer les erreurs spécifiques de Prisma
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Ce lien Google est déjà utilisé par un autre QR code" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
