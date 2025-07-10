import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // Construire la requête avec recherche
    const whereClause = search
      ? {
          OR: [{ email: { contains: search, mode: "insensitive" } }],
        }
      : {};

    // Récupérer les utilisateurs avec leurs plaques
    const users = await prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            plaques: true,
            links: true,
          },
        },
        plaques: {
          take: 3,
          orderBy: { createdAt: "desc" },
          include: {
            shippingInfo: {
              select: {
                firstName: true,
                lastName: true,
                status: true,
              },
            },
          },
        },
      },
    });

    // Compter le total pour la pagination
    const total = await prisma.user.count({ where: whereClause });

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
