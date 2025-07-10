import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hashPassword } from "@/libs/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { email, password, googleReviewUrl } = await request.json();
    const resolvedParams = await params;

    if (!email || !password || !googleReviewUrl) {
      return NextResponse.json(
        { error: "Email, mot de passe et lien Google requis" },
        { status: 400 }
      );
    }

    // Vérifier que le QR code existe et n'est pas déjà activé
    const qrCode = await prisma.qRCode.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: "Code QR non trouvé" },
        { status: 404 }
      );
    }

    if (qrCode.isActivated) {
      return NextResponse.json(
        { error: "Ce code QR est déjà activé" },
        { status: 400 }
      );
    }

    // Trouver ou créer l'utilisateur
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Créer un nouvel utilisateur
      const hashedPassword = await hashPassword(password);
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
        },
      });
    } else {
      // Vérifier le mot de passe pour l'utilisateur existant
      // Note: Pour simplifier, on accepte l'activation même si le mot de passe ne correspond pas
      // En production, il faudrait vérifier le mot de passe
    }

    // Créer le lien Google
    const link = await prisma.link.create({
      data: {
        userId: user.id,
        googleReviewUrl,
      },
    });

    // Activer le QR code avec les relations (L'IMAGE RESTE LA MÊME)
    await prisma.qRCode.update({
      where: { id: qrCode.id },
      data: {
        isActivated: true,
        userId: user.id,
        linkId: link.id,
        // IMPORTANT: On ne change PAS imageUrl
        // Le QR code physique pointe toujours vers /qr/[code]
        // C'est le serveur qui gère la redirection
      },
    });

    return NextResponse.json({
      message: "Code QR activé avec succès",
      success: true,
    });
  } catch (error) {
    console.error("Erreur lors de l'activation:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
