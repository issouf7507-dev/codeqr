import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/libs/auth";
import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_ADMIN || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username et mot de passe requis" },
        { status: 400 }
      );
    }

    // Récupérer le super admin
    const superAdmin = await prisma.superAdmin.findUnique({
      where: { username },
    });

    if (!superAdmin || !superAdmin.isActive) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(
      password,
      superAdmin.passwordHash
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Mettre à jour la dernière connexion
    await prisma.superAdmin.update({
      where: { id: superAdmin.id },
      data: { lastLoginAt: new Date() },
    });

    // Générer le token
    const token = jwt.sign(
      {
        superAdminId: superAdmin.id,
        username: superAdmin.username,
        role: "SUPER_ADMIN",
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Créer la réponse avec le cookie
    const response = NextResponse.json({
      message: "Connexion réussie",
      superAdmin: {
        id: superAdmin.id,
        username: superAdmin.username,
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
      },
    });

    // Définir le cookie
    response.cookies.set("super-admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 heures
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion super admin:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
