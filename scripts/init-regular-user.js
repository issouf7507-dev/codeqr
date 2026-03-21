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
