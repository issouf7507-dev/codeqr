import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { verifyToken } from "@/libs/auth";

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 });
    }

    // Vérifier le token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    // Récupérer les informations de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur:",
      error
    );
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
