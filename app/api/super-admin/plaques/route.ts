import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const skip = (page - 1) * limit;

    // Construire la requête avec filtres
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { codeId: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (status) {
      whereClause.isActivated = status === "activated";
    }

    // Récupérer les plaques avec toutes les informations
    const plaques = await prisma.plaque.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        shippingInfo: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            status: true,
            trackingNumber: true,
            shippedAt: true,
            deliveredAt: true,
          },
        },
        link: {
          select: {
            googleReviewUrl: true,
            updatedAt: true,
          },
        },
      },
    });

    // Compter le total pour la pagination
    const total = await prisma.plaque.count({ where: whereClause });

    return NextResponse.json({
      plaques,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des plaques:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
