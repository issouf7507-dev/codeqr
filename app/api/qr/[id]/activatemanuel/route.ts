import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { hashPassword, verifyPassword, generateToken } from "@/libs/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { googleReviewUrl } = await request.json();
    const resolvedParams = await params;

    // Validation des données d'entrée

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

    // Vérifier que le QR code existe et n'est pas déjà activé
    const qrCode = await prisma.qRCode.findUnique({
      where: { code: resolvedParams.id },
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

    // Vérifier si l'utilisateur existe déjà
    const user = await prisma.user.findUnique({
      where: { email: "admin@qr.com" },
    });

    if (!user) {
      // L'utilisateur n'existe pas, retourner une erreur 403
      return NextResponse.json(
        {
          error:
            "Compte non trouvé. Veuillez d'abord vous inscrire sur notre plateforme.",
        },
        { status: 403 }
      );
    }

    // L'utilisateur existe, vérifier le mot de passe (LOGIN)
    const isPasswordValid = await verifyPassword("09901432", user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Mot de passe incorrect pour cet email" },
        { status: 401 }
      );
    }

    // console.log(`Utilisateur existant connecté: admin`);

    // Vérifier si l'utilisateur a déjà un lien Google
    // Pour éviter les conflits de contrainte unique, on crée toujours un nouveau lien
    // car un lien ne peut être associé qu'à un seul QR code
    const link = await prisma.link.create({
      data: {
        userId: user.id,
        googleReviewUrl,
      },
    });

    // console.log(`Nouveau lien Google créé pour l'utilisateur: `);

    // Activer le QR code avec les relations
    await prisma.qRCode.update({
      where: { id: qrCode.id },
      data: {
        isActivated: true,
        activatedAt: new Date(),
        activatedBy: user.id,
        linkId: link.id,
      },
    });

    // Générer le token JWT pour connecter l'utilisateur
    const token = generateToken(user.id);

    // Créer la réponse avec le cookie
    const response = NextResponse.json({
      message: "Connexion réussie et code QR activé",
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    // Définir le cookie JWT pour connecter l'utilisateur
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    return response;
  } catch (error: any) {
    console.error("Erreur lors de l'activation:", error);

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
