import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token requis" }, { status: 400 });
    }

    // Vérifier si le token existe et n'a pas expiré
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
