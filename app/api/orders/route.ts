import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { createPayment } from "@/libs/mollie";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(
      "Données reçues pour la commande:",
      JSON.stringify(body, null, 2)
    );

    const {
      items, // Nouveau format: [{productId, packageId, quantity, name, price}]
      productId, // Ancien format pour compatibilité
      quantity, // Ancien format pour compatibilité
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

    // Support des deux formats: nouveau (panier) et ancien (checkout direct)
    let orderItems = [];
    let totalAmount = 0;

    if (items && Array.isArray(items)) {
      // Nouveau format: commande depuis le panier
      for (const item of items) {
        // Pour les commandes du panier, on fait confiance aux données du panier
        // car elles viennent des pages de détail produit

        // Créer un productId virtuel basé sur le nom pour la compatibilité
        let actualProductId = item.productId;

        // Si c'est un ID numérique (ancien système), on trouve le vrai produit
        if (item.productId === "1" || item.productId === "2") {
          const productName =
            item.productId === "1"
              ? "Plaque QR Code Google Avis"
              : "Carte QR Code Google Avis";

          const product = await prisma.product.findFirst({
            where: { name: productName },
          });

          if (product) {
            actualProductId = product.id;
          } else {
            return NextResponse.json(
              { error: `Produit "${productName}" non trouvé en base` },
              { status: 404 }
            );
          }
        }

        orderItems.push({
          productId: actualProductId,
          quantity: item.quantity,
          price: item.price,
          packageId: item.packageId,
          name: item.name,
        });

        totalAmount += item.price * item.quantity;
      }
    } else if (productId && quantity) {
      // Ancien format: checkout direct
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Produit non trouvé" },
          { status: 404 }
        );
      }

      orderItems.push({
        productId,
        quantity,
        price: product.price,
        packageId: "1",
        name: product.name,
      });

      totalAmount = product.price * quantity;
    } else {
      return NextResponse.json(
        { error: "Aucun produit spécifié" },
        { status: 400 }
      );
    }

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

    // Calculer le nombre total de codes QR nécessaires
    const totalQRCodesNeeded = orderItems.reduce((sum, item) => {
      // Chaque article correspond à un nombre de codes QR basé sur son packageId
      const qrCount = parseInt(item.packageId) || 1;
      return sum + qrCount * item.quantity;
    }, 0);

    // Vérifier qu'il y a assez de codes QR disponibles
    const availableQRCodes = await prisma.qRCode.count({
      where: {
        isActivated: false,
        orderId: null,
      },
    });

    if (availableQRCodes < totalQRCodesNeeded) {
      return NextResponse.json(
        {
          error: `Stock insuffisant. ${totalQRCodesNeeded} codes QR nécessaires, ${availableQRCodes} disponibles.`,
          needsGeneration: true,
        },
        { status: 400 }
      );
    }

    // Créer la commande avec tous les articles
    const order = await prisma.order.create({
      data: {
        email,
        totalAmount,
        currency: "EUR",
        shippingInfoId: shippingInfo.id,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
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

    // Attribuer les codes QR à la commande
    const qrCodesToAssign = await prisma.qRCode.findMany({
      where: {
        isActivated: false,
        orderId: null,
      },
      take: totalQRCodesNeeded,
    });

    // Mettre à jour les codes QR pour les associer à la commande
    await prisma.qRCode.updateMany({
      where: {
        id: {
          in: qrCodesToAssign.map((qr) => qr.id),
        },
      },
      data: {
        orderId: order.id,
      },
    });

    // Créer le paiement Mollie
    const webhookUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/webhook`
        : undefined;

    // Créer la description de la commande
    const description =
      orderItems.length === 1
        ? `Commande ${order.id} - ${orderItems[0].name}`
        : `Commande ${order.id} - ${orderItems.length} articles`;

    const payment = await createPayment({
      amount: totalAmount,
      currency: "EUR",
      description,
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
