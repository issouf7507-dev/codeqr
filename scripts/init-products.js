const { PrismaClient } = require("../app/generated/prisma");

const prisma = new PrismaClient();

const products = [
  {
    name: "Plaque QR Code Google Avis",
    description:
      "Plaque professionnelle pour collecter des avis Google facilement",
    price: 34.9,
    features: JSON.stringify([
      "Design professionnel en PVC",
      "QR Code haute résolution",
      "Adhésif double-face inclus",
      "Résistant aux intempéries",
      "Livraison gratuite",
      "Configuration incluse",
    ]),
    image: "/imgs/Plaque google.png",
    isActive: true,
  },
  {
    name: "Carte QR Code Google Avis",
    description: "Carte compacte et pratique pour vos clients nomades",
    price: 49.9,
    features: JSON.stringify([
      "Format carte de visite",
      "QR Code haute résolution",
      "Design moderne et élégant",
      "Facile à transporter",
      "Livraison express",
      "Configuration + support personnalisé",
    ]),
    image: "/imgs/Carte Google_.png",
    isActive: true,
  },
];

async function initProducts() {
  try {
    console.log("Initialisation des produits...");

    for (const product of products) {
      const existingProduct = await prisma.product.findFirst({
        where: { name: product.name },
      });

      if (!existingProduct) {
        await prisma.product.create({
          data: product,
        });
        console.log(`Produit créé: ${product.name}`);
      } else {
        console.log(`Produit déjà existant: ${product.name}`);
      }
    }

    console.log("Initialisation terminée !");
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

initProducts();
