import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { generateResetToken } from "@/libs/auth";
import { sendPasswordResetEmail } from "@/libs/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Pour des raisons de sécurité, on ne révèle pas si l'email existe ou non
      return NextResponse.json(
        {
          message:
            "Si cet email existe dans notre base de données, vous recevrez un lien de réinitialisation.",
        },
        { status: 200 }
      );
    }

    // Générer un token de réinitialisation
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    // Sauvegarder le token dans la base de données
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Envoyer l'email de réinitialisation
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json(
      {
        message:
          "Si cet email existe dans notre base de données, vous recevrez un lien de réinitialisation.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
