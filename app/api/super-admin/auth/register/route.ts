import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/libs/auth";
import prisma from "@/libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const { username, password, firstName, lastName } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username et mot de passe requis" },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    // Vérifier si le username existe déjà
    const existingSuperAdmin = await prisma.superAdmin.findUnique({
      where: { username },
    });

    if (existingSuperAdmin) {
      return NextResponse.json(
        { error: "Ce nom d'utilisateur existe déjà" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer le super admin
    const superAdmin = await prisma.superAdmin.create({
      data: {
        username,
        passwordHash: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
      },
    });

    return NextResponse.json({
      message: "Super Admin créé avec succès",
      superAdmin: {
        id: superAdmin.id,
        username: superAdmin.username,
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création du super admin:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
