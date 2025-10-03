import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const skip = (page - 1) * limit;

    // Construire la requête avec recherche et filtrage par statut
    let whereClause: any = {};

    // Ajouter la recherche si fournie
    if (search) {
      whereClause.OR = [{ code: { contains: search } }];
    }

    // Ajouter le filtrage par statut
    if (status === "active") {
      whereClause.isActivated = true;
    } else if (status === "inactive") {
      whereClause.isActivated = false;
    } else if (status === "acheted") {
      whereClause.order = {
        status: "PAID",
      };
    }
    // Pour "all", pas de filtre supplémentaire

    // Récupérer les codes QR
    const qrCodes = await prisma.qRCode.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        order: {
          include: {
            items: true,
          },
        },
      },
    });

    // Compter le total pour la pagination
    const total = await prisma.qRCode.count({ where: whereClause });

    // Statistiques supplémentaires
    const totalCodes = await prisma.qRCode.count();
    const activeCodes = await prisma.qRCode.count({
      where: { isActivated: true },
    });
    const inactiveCodes = await prisma.qRCode.count({
      where: { isActivated: false },
    });
    const achetedCodes = await prisma.qRCode.count({
      where: { order: { status: "PAID" } },
    });

    const stats = {
      totalCodes,
      activeCodes,
      inactiveCodes,
      achetedCodes,
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
      orders: qrCodes.map((qr) => qr.order),
      // qrCodes
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
