import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { verifyPassword, generateToken } from "@/libs/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Générer le token JWT
    const token = generateToken(user.id);

    // Créer la réponse avec le cookie
    const response = NextResponse.json(
      { message: "Connexion réussie", userId: user.id },
      { status: 200 }
    );

    // Définir le cookie JWT
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
