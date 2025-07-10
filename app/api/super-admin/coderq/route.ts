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
          OR: [{ code: { contains: search, mode: "insensitive" } }],
        }
      : {};

    // Récupérer les codes QR
    const qrCodes = await prisma.qRCode.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Compter le total pour la pagination
    const total = await prisma.qRCode.count({ where: whereClause });

    // Statistiques supplémentaires
    const stats = {
      totalCodes: total,
      byMonth: await prisma.qRCode.groupBy({
        by: ["month", "year"],
        _count: {
          id: true,
        },
        orderBy: [{ year: "desc" }, { month: "desc" }],
      }),
    };

    return NextResponse.json({
      qrCodes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des codes QR:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
