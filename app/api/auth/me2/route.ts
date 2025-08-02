import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    // Vérifier que JWT_SECRET est défini
    if (!process.env.JWT_SECRET_ADMIN) {
      console.error("JWT_SECRET_ADMIN is not defined");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Récupérer le token depuis les cookies
    const token = req.cookies.get("super-admin-token")?.value;
    // console.log(token);

    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Vérifier le token
    const decoded = verify(token, process.env.JWT_SECRET_ADMIN) as {
      superAdminId: string;
      username: string;
      role: string;
    };

    // Vérifier que l'utilisateur est un recruteur ou un collaborateur
    if (!decoded || decoded.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Récupérer l'utilisateur
    const user = await prisma.superAdmin.findUnique({
      where: { id: decoded.superAdminId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Retourner l'utilisateur sans le mot de passe
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des informations" },
      { status: 500 }
    );
  }
}
