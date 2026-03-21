require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const bcrypt = require("bcryptjs");

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
const admin = {
  username: "admin",
  firstName: "Admin",
  lastName: "Admin",
};

async function initAdmin() {
  try {
    console.log("Initialisation des produits...");

    const existingAdmin = await prisma.superAdmin.findFirst({
      where: { username: admin.username },
    });

    const hashedPassword = await bcrypt.hash("09901432", 12);

    if (!existingAdmin) {
      await prisma.superAdmin.create({
        data: {
          ...admin,
          passwordHash: hashedPassword,
        },
      });
      console.log(`Admin créé: ${admin.username}`);
    } else {
      console.log(`Admin déjà existant: ${admin.username}`);
    }

    console.log("Initialisation terminée !");
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

initAdmin();
