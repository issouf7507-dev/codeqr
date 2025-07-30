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

    // Statistiques des commandes
    const totalOrders = await prisma.order.count();
    const paidOrders = await prisma.order.count({
      where: { status: "PAID" },
    });

    // Revenus (basé sur les commandes payées)
    const paidOrdersData = await prisma.order.findMany({
      where: { status: "PAID" },
      select: { totalAmount: true },
    });
    const estimatedRevenue = paidOrdersData.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Activité récente
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            qrCodes: {
              where: { isActivated: true },
            },
          },
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
      },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        qrCodes: {
          select: {
            id: true,
            code: true,
            isActivated: true,
          },
        },
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
        orders: {
          total: totalOrders,
          paid: paidOrders,
        },
        revenue: {
          estimated: estimatedRevenue,
        },
      },
      recent: {
        users: recentUsers,
        plaques: recentPlaques,
        orders: recentOrders,
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
