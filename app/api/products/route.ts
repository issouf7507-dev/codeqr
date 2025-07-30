import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        price: "asc",
      },
    });

    // Convertir les features JSON en tableau
    const productsWithFeatures = products.map((product) => ({
      ...product,
      features: JSON.parse(product.features),
    }));

    return NextResponse.json(productsWithFeatures);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}
