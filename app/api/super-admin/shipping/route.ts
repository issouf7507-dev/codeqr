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
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    // Récupérer les informations de livraison avec la plaque
    const shipping = await prisma.shippingInfo.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Compter le total pour la pagination
    const total = await prisma.shippingInfo.count({ where: whereClause });

    // Statistiques par statut
    const statusStats = await prisma.shippingInfo.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    return NextResponse.json({
      shipping,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: statusStats,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des livraisons:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
