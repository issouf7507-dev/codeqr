import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { verifyPassword, hashPassword } from "@/libs/auth";
import { verifyToken } from "@/libs/auth";

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Mot de passe actuel et nouveau mot de passe requis" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier le mot de passe actuel
    const isCurrentPasswordValid = await verifyPassword(
      currentPassword,
      user.passwordHash
    );
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Mot de passe actuel incorrect" },
        { status: 400 }
      );
    }

    // Hasher le nouveau mot de passe
    const hashedNewPassword = await hashPassword(newPassword);

    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedNewPassword,
      },
    });

    return NextResponse.json(
      { message: "Mot de passe modifié avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
