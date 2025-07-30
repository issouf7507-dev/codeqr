import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { verifyToken } from "@/libs/auth";

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification de l'admin
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    // Vérifier si l'utilisateur est admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { admin: true },
    });

    if (!user || !user.admin) {
      return NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    // Récupérer tous les QR codes avec les informations d'activation
    const qrCodes = await prisma.qRCode.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        },
        link: {
          select: {
            googleReviewUrl: true,
          },
        },
        order: {
          select: {
            id: true,
            email: true,
            status: true,
            totalAmount: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      qrCodes: qrCodes.map((qr) => ({
        id: qr.id,
        code: qr.code,
        isActivated: qr.isActivated,
        activatedAt: qr.activatedAt,
        createdAt: qr.createdAt,
        month: qr.month,
        year: qr.year,
        activatedBy: qr.user
          ? {
              id: qr.user.id,
              email: qr.user.email,
              userCreatedAt: qr.user.createdAt,
            }
          : null,
        googleReviewUrl: qr.link?.googleReviewUrl || null,
        order: qr.order
          ? {
              id: qr.order.id,
              email: qr.order.email,
              status: qr.order.status,
              totalAmount: qr.order.totalAmount,
              orderCreatedAt: qr.order.createdAt,
            }
          : null,
      })),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des QR codes:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
