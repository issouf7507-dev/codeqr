import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    // Statistiques des utilisateurs
    const totalUsers = await prisma.user.count();
    const newUsersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    // Statistiques des plaques
    const totalPlaques = await prisma.qRCode.count();
    const activatedPlaques = await prisma.qRCode.count({
      where: { isActivated: true },
    });
    const pendingPlaques = await prisma.qRCode.count({
      where: { isActivated: false },
    });

    // Statistiques des livraisons
    const totalShipping = await prisma.shippingInfo.count();
    const pendingShipping = await prisma.shippingInfo.count({
      where: { status: "PENDING" },
    });

    // Revenus (estimation basée sur le nombre de plaques)
    const estimatedRevenue = totalPlaques * 29; // 29€ par plaque

    // Activité récente
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        createdAt: true,
        _count: {
          select: { qrCodes: true },
        },
      },
    });

    const recentPlaques = await prisma.qRCode.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true },
        },
        // shippingInfo: {
        //   select: { firstName: true, lastName: true, status: true },
        // },
      },
    });

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers,
          newThisMonth: newUsersThisMonth,
        },
        plaques: {
          total: totalPlaques,
          activated: activatedPlaques,
          pending: pendingPlaques,
        },
        shipping: {
          total: totalShipping,
          pending: pendingShipping,
        },
        revenue: {
          estimated: estimatedRevenue,
        },
      },
      recent: {
        users: recentUsers,
        plaques: recentPlaques,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
