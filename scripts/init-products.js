const { PrismaClient } = require("../app/generated/prisma");

const prisma = new PrismaClient();

const products = [
  {
    name: "Plaque QR Code Standard",
    description:
      "Notre plaque la plus populaire, parfaite pour la plupart des entreprises",
    price: 29.0,
    features: JSON.stringify([
      "Design professionnel en PVC",
      "QR Code haute résolution",
      "Adhésif double-face inclus",
      "Taille: 15x15 cm",
      "Livraison gratuite",
      "Configuration incluse",
    ]),
    image: "standard",
    isActive: true,
  },
  {
    name: "Plaque QR Code Premium",
    description:
      "Pour les entreprises qui veulent se démarquer avec un design exclusif",
    price: 49.0,
    features: JSON.stringify([
      "Design premium en aluminium",
      "QR Code haute résolution",
      "Support mural inclus",
      "Taille: 20x20 cm",
      "Livraison express",
      "Configuration + support personnalisé",
    ]),
    image: "premium",
    isActive: true,
  },
  {
    name: "Pack Multi-Plaques",
    description: "Idéal pour les entreprises avec plusieurs emplacements",
    price: 79.0,
    features: JSON.stringify([
      "3 plaques standard",
      "QR Code identique pour toutes",
      "Adhésifs inclus",
      "Taille: 15x15 cm chacune",
      "Livraison gratuite",
      "Configuration pour toutes",
    ]),
    image: "pack",
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
