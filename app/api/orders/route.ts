import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { createPayment } from "@/libs/mollie";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      quantity,
      email,
      firstName,
      lastName,
      company,
      address,
      address2,
      city,
      postalCode,
      country,
      phone,
    } = body;

    // Récupérer le produit
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Calculer le total
    const totalAmount = product.price * quantity;

    // Créer les informations de livraison
    const shippingInfo = await prisma.shippingInfo.create({
      data: {
        firstName,
        lastName,
        company,
        address,
        address2,
        city,
        postalCode,
        country,
        phone,
        email,
      },
    });

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        email,
        totalAmount,
        currency: "EUR",
        shippingInfoId: shippingInfo.id,
        items: {
          create: {
            productId,
            quantity,
            price: product.price,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingInfo: true,
      },
    });

    // Créer le paiement Mollie
    const webhookUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/webhook`
        : undefined;

    const payment = await createPayment({
      amount: totalAmount,
      currency: "EUR",
      description: `Commande ${order.id} - ${product.name}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order/${order.id}`,
      webhookUrl,
      metadata: {
        orderId: order.id,
        email,
      },
    });

    // Mettre à jour la commande avec l'ID Mollie
    await prisma.order.update({
      where: { id: order.id },
      data: { mollieId: payment.id },
    });

    return NextResponse.json({
      orderId: order.id,
      checkoutUrl: payment.getCheckoutUrl(),
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
