import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        createdAt: true,
        // Ne pas retourner le passwordHash pour des raisons de sécurité
      },
    });

    if (user) {
      return NextResponse.json({
        exists: true,
        message: "Utilisateur trouvé",
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      return NextResponse.json({
        exists: false,
        message: "Utilisateur non trouvé",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
