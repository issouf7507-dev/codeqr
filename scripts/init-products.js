require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Collectez facilement des avis Google et boostez votre réputation en ligne !",
    description:
      "Encouragez vos clients à partager leur expérience en un simple geste. Approchez leur téléphone ou scannez le QR code",
    price: 30,
    features: JSON.stringify([
      "Design professionnel en PVC",
      "QR Code haute résolution",
      "Adhésif double-face inclus",
      "Résistant aux intempéries",
      "Livraison gratuite",
      "Configuration incluse",
    ]),
    image: "/imgs/plaque-prod.jpeg",
    isActive: true,
  },
  {
    name: "Collectez facilement des avis Google et augmentez votre réputation en ligne !",
    description:
      "Encouragez vos clients à partager leur expérience en un simple geste. Approchez leur téléphone ou scannez le QR code",
    price: 20,
    features: JSON.stringify([
      "Format carte de visite",
      "QR Code haute résolution",
      "Design moderne et élégant",
      "Facile à transporter",
      "Livraison express",
      "Configuration + support personnalisé",
    ]),
    image: "/imgs/carte-prod.jpeg",
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
