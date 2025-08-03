const { PrismaClient } = require("../app/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
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
