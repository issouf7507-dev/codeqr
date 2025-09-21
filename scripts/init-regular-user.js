const { PrismaClient } = require("../app/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const user = {
  email: "admin@qr.com",
  password: "09901432",
};

async function initRegularUser() {
  try {
    console.log("Initialisation de l'utilisateur régulier...");

    const existingUser = await prisma.user.findFirst({
      where: { email: user.email },
    });

    const hashedPassword = await bcrypt.hash(user.password, 12);

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email,
          passwordHash: hashedPassword,
        },
      });
      console.log(`Utilisateur créé: ${user.email}`);
    } else {
      console.log(`Utilisateur déjà existant: ${user.email}`);
    }

    console.log("Initialisation terminée !");
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

initRegularUser();
