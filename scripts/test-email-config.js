const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

console.log("🔍 Test de configuration email...\n");

// Afficher les variables d'environnement (masquées)
console.log("📧 Variables d'environnement:");
console.log(
  `NEXT_APP_EMAIL_USER: ${
    process.env.NEXT_APP_EMAIL_USER ? "✅ Défini" : "❌ Non défini"
  }`
);
console.log(
  `NEXT_APP_EMAIL_PASS: ${
    process.env.NEXT_APP_EMAIL_PASS ? "✅ Défini" : "❌ Non défini"
  }`
);
console.log(`SMTP_HOST: ${process.env.SMTP_HOST || "Non défini"}`);
console.log(`SMTP_PORT: ${process.env.SMTP_PORT || "Non défini"}`);
console.log("");

// Test de connexion Gmail
async function testGmailConnection() {
  console.log("🧪 Test de connexion Gmail...");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_APP_EMAIL_USER,
        pass: process.env.NEXT_APP_EMAIL_PASS,
      },
      secure: true,
      port: 465,
    });

    await transporter.verify();
    console.log("✅ Connexion Gmail réussie!");
    return true;
  } catch (error) {
    console.log("❌ Erreur de connexion Gmail:");
    console.log(`   Code: ${error.code}`);
    console.log(`   Message: ${error.message}`);

    if (error.code === "EAUTH") {
      console.log("\n🔧 Solutions possibles:");
      console.log(
        "1. Activez l'authentification à 2 facteurs sur votre compte Gmail"
      );
      console.log(
        '2. Générez un "App Password" dans les paramètres de sécurité Google'
      );
      console.log(
        "3. Utilisez l'App Password au lieu de votre mot de passe normal"
      );
      console.log(
        "4. Vérifiez que votre compte Gmail autorise les applications moins sécurisées"
      );
    }

    return false;
  }
}

// Test de configuration SMTP générique
async function testSMTPConnection() {
  console.log("\n🧪 Test de connexion SMTP générique...");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || process.env.NEXT_APP_EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.NEXT_APP_EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Connexion SMTP réussie!");
    return true;
  } catch (error) {
    console.log("❌ Erreur de connexion SMTP:");
    console.log(`   Code: ${error.code}`);
    console.log(`   Message: ${error.message}`);
    return false;
  }
}

// Test d'envoi d'email
async function testEmailSending() {
  console.log("\n📤 Test d'envoi d'email...");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_APP_EMAIL_USER,
        pass: process.env.NEXT_APP_EMAIL_PASS,
      },
      secure: true,
      port: 465,
    });

    const mailOptions = {
      from: process.env.NEXT_APP_EMAIL_USER,
      to: process.env.NEXT_APP_EMAIL_USER, // Envoi à soi-même pour le test
      subject: "🧪 Test de configuration email - CodeQR",
      html: `
        <h2>Test de configuration email</h2>
        <p>Si vous recevez cet email, votre configuration email fonctionne correctement!</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email de test envoyé avec succès!");
    console.log(`   Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.log("❌ Erreur lors de l'envoi de l'email de test:");
    console.log(`   Code: ${error.code}`);
    console.log(`   Message: ${error.message}`);
    return false;
  }
}

// Exécuter les tests
async function runTests() {
  console.log("🚀 Démarrage des tests de configuration email...\n");

  const gmailTest = await testGmailConnection();
  const smtpTest = await testSMTPConnection();

  if (gmailTest || smtpTest) {
    await testEmailSending();
  }

  console.log("\n📋 Résumé:");
  console.log(`Gmail: ${gmailTest ? "✅" : "❌"}`);
  console.log(`SMTP: ${smtpTest ? "✅" : "❌"}`);

  if (!gmailTest && !smtpTest) {
    console.log("\n🔧 Actions recommandées:");
    console.log(
      "1. Vérifiez vos variables d'environnement dans le fichier .env"
    );
    console.log("2. Pour Gmail: Activez 2FA et générez un App Password");
    console.log(
      "3. Pour SMTP: Configurez les variables SMTP_HOST, SMTP_PORT, etc."
    );
    console.log("4. Consultez la documentation de votre fournisseur email");
  }
}

runTests().catch(console.error);
