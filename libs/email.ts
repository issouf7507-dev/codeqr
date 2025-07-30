// require("dotenv").config({ path: ".env" });
import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

// Configuration du transporteur email avec options de sécurité
const createTransporter = () => {
  // Option 1: Gmail avec App Password (recommandé)
  if (process.env.NEXT_APP_EMAIL_USER && process.env.NEXT_APP_EMAIL_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_APP_EMAIL_USER,
        pass: process.env.NEXT_APP_EMAIL_PASS, // Doit être un App Password, pas le mot de passe normal
      },
      secure: true, // Utilise SSL/TLS
      port: 465,
    });
  }

  // Option 2: Configuration SMTP générique (fallback)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true pour 465, false pour les autres ports
    auth: {
      user: process.env.SMTP_USER || process.env.NEXT_APP_EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.NEXT_APP_EMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

// Fonction pour tester la connexion email
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log("✅ Connexion email réussie");
    return true;
  } catch (error) {
    console.error("❌ Erreur de connexion email:", error);
    return false;
  }
}

// Template pour l'email de confirmation d'achat
export async function sendPurchaseConfirmationEmail(
  email: string,
  code: string,
  plaqueId: string,
  qrCodeImage: string | null
) {
  try {
    // Générer le QR code du lien d'activation
    const activationUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/qr/${code}/activation`;

    const mailOptions = {
      from: process.env.NEXT_APP_EMAIL_USER || "ouattaraissouf7507@gmail.com",
      to: email,
      subject: "🎉 Confirmation d'achat - Votre plaque QR Code CodeQR",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation d'achat - CodeQR</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: #fff; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
          .code { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Merci pour votre achat !</h1>
            <p>Votre plaque QR Code CodeQR a été commandée avec succès</p>
          </div>
          
          <div class="content">
            <h2>Bonjour !</h2>
            <p>Nous vous confirmons la réception de votre commande de plaque QR Code.</p>
            
            <h3>📋 Détails de votre commande :</h3>
            <ul>
              <li><strong>Numéro de commande :</strong> ${plaqueId}</li>
              <li><strong>Produit :</strong> Plaque QR Code personnalisée</li>
              <li><strong>Statut :</strong> Paiement confirmé</li>
              <li><strong>Code d'activation :</strong> ${code}</li>
            </ul>
            
            <h3>🔑 Votre code d'activation :</h3>
            <div class="code-box">
              <div class="code">${code}</div>
              <p><em>Conservez précieusement ce code - il vous sera nécessaire pour activer votre plaque</em></p>
            </div>
            
            <h3>📝 Prochaines étapes :</h3>
            <ol>
              <li><strong>Cliquez sur "Activer ma plaque"</strong> ci-dessous ou utilisez le lien direct</li>
              <li><strong>Créez votre compte</strong> (ou connectez-vous si vous en avez déjà un)</li>
              <li><strong>Configurez votre lien Google Avis</strong> (https://g.page/r/...)</li>
              <li><strong>Votre QR Code sera immédiatement actif</strong> et redirigera vers vos avis</li>
              <li><strong>Recevez votre plaque physique</strong> par courrier (délai : 5-7 jours ouvrés)</li>
            </ol>
            
            <h3>🔗 Lien direct d'activation :</h3>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace;">
              ${activationUrl}
            </p>
            
            <h3>📱 QR Code d'activation :</h3>
            <div style="text-align: center; margin: 20px 0;">
              <img src="${qrCodeImage}" alt="QR Code d'activation" style="max-width: 200px; border: 2px solid #667eea; border-radius: 10px;" />
              <p style="margin-top: 10px; font-size: 12px; color: #666;">
                Scannez ce QR code pour accéder directement à la page d'activation
              </p>
            </div>
            
            <div style="text-align: center;">
              <a href="${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
              }/register" class="button">Créer mon compte</a>
              <br>
              <a href="${activationUrl}" class="button">Activer ma plaque</a>
            </div>
            
            <h3>💡 Comment obtenir votre lien Google Avis ?</h3>
            <ol>
              <li>Allez sur <a href="https://maps.google.com" style="color: #667eea;">Google Maps</a></li>
              <li>Recherchez votre établissement</li>
              <li>Cliquez sur votre établissement dans les résultats</li>
              <li>Cliquez sur "Avis" dans le panneau de gauche</li>
              <li>Copiez l'URL de la page (elle doit commencer par https://g.page/r/)</li>
            </ol>
            
            <h3>❓ Besoin d'aide ?</h3>
            <p>Notre équipe support est là pour vous accompagner :</p>
            <ul>
              <li>📧 Email : support@codeqr.com</li>
              <li>📞 Téléphone : +33 1 23 45 67 89</li>
              <li>💬 Chat en ligne : Disponible sur notre site</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2024 CodeQR - Tous droits réservés</p>
            <p>Cet email a été envoyé à ${email}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de confirmation envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email:", error);
    return false;
  }

  // const mailOptions = {
  //   from: process.env.NEXT_APP_EMAIL_USER,
  //   to: email,
  //   subject: "🎉 Confirmation d'achat - Votre plaque QR Code CodeQR",
  //   html: `
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <meta charset="utf-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Confirmation d'achat - CodeQR</title>
  //       <style>
  //         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  //         .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  //         .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
  //         .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
  //         .code-box { background: #fff; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
  //         .code { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; }
  //         .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
  //         .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="container">
  //         <div class="header">
  //           <h1>🎉 Merci pour votre achat !</h1>
  //           <p>Votre plaque QR Code CodeQR a été commandée avec succès</p>
  //         </div>

  //         <div class="content">
  //           <h2>Bonjour !</h2>
  //           <p>Nous vous confirmons la réception de votre commande de plaque QR Code.</p>

  //           <h3>📋 Détails de votre commande :</h3>
  //           <ul>
  //             <li><strong>Numéro de commande :</strong> ${plaqueId}</li>
  //             <li><strong>Produit :</strong> Plaque QR Code personnalisée</li>
  //             <li><strong>Statut :</strong> Paiement confirmé</li>
  //             <li><strong>Code d'activation :</strong> ${code}</li>
  //           </ul>

  //           <h3>🔑 Votre code d'activation :</h3>
  //           <div class="code-box">
  //             <div class="code">${code}</div>
  //             <p><em>Conservez précieusement ce code - il vous sera nécessaire pour activer votre plaque</em></p>
  //           </div>

  //           <h3>📝 Prochaines étapes :</h3>
  //           <ol>
  //             <li><strong>Créez votre compte</strong> sur notre plateforme</li>
  //             <li><strong>Activez votre plaque</strong> avec le code ci-dessus</li>
  //             <li><strong>Configurez votre lien Google</strong> d'avis</li>
  //             <li><strong>Recevez votre plaque</strong> par courrier (délai : 5-7 jours ouvrés)</li>
  //           </ol>

  //           <div style="text-align: center;">
  //             <a href="${process.env.NEXT_PUBLIC_BASE_URL}/register" class="button">Créer mon compte</a>
  //             <br>
  //             <a href="${process.env.NEXT_PUBLIC_BASE_URL}/activate" class="button">Activer ma plaque</a>
  //           </div>

  //           <h3>❓ Besoin d'aide ?</h3>
  //           <p>Notre équipe support est là pour vous accompagner :</p>
  //           <ul>
  //             <li>📧 Email : support@codeqr.com</li>
  //             <li>📞 Téléphone : +33 1 23 45 67 89</li>
  //             <li>💬 Chat en ligne : Disponible sur notre site</li>
  //           </ul>
  //         </div>

  //         <div class="footer">
  //           <p>© 2024 CodeQR - Tous droits réservés</p>
  //           <p>Cet email a été envoyé à ${email}</p>
  //         </div>
  //       </div>
  //     </body>
  //     </html>
  //   `,
  // };

  // try {
  //   await transporter.sendMail(mailOptions);
  //   console.log(`Email de confirmation envoyé à ${email}`);
  //   return true;
  // } catch (error) {
  //   console.error("Erreur lors de l'envoi de l'email:", error);
  //   return false;
  // }
}

// Template pour l'email de confirmation d'activation
export async function sendActivationConfirmationEmail(
  email: string,
  plaqueId: string,
  googleReviewUrl: string
) {
  const mailOptions = {
    from: process.env.NEXT_APP_EMAIL_USER,
    to: email,
    subject: "✅ Votre plaque QR Code a été activée - CodeQR",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Activation confirmée - CodeQR</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Activation réussie !</h1>
            <p>Votre plaque QR Code est maintenant opérationnelle</p>
          </div>
          
          <div class="content">
            <div class="success-box">
              <h3>🎉 Félicitations !</h3>
              <p>Votre plaque QR Code a été activée avec succès et redirige maintenant vers votre lien Google d'avis.</p>
            </div>
            
            <h3>📋 Détails de l'activation :</h3>
            <ul>
              <li><strong>Plaque ID :</strong> ${plaqueId}</li>
              <li><strong>Lien configuré :</strong> <a href="${googleReviewUrl}">${googleReviewUrl}</a></li>
              <li><strong>Statut :</strong> ✅ Activée et opérationnelle</li>
            </ul>
            
            <h3>📦 Livraison de votre plaque :</h3>
            <p>Votre plaque physique sera expédiée dans les 24-48h et vous la recevrez sous 5-7 jours ouvrés.</p>
            
            <h3>📱 Test de votre QR Code :</h3>
            <p>Vous pouvez tester votre QR Code en scannant l'image ci-dessous (si disponible) ou en attendant la réception de votre plaque physique.</p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" class="button">Accéder à mon tableau de bord</a>
            </div>
            
            <h3>💡 Conseils d'utilisation :</h3>
            <ul>
              <li>Placez votre plaque dans un endroit visible de votre établissement</li>
              <li>Encouragez vos clients à scanner le QR Code après leur visite</li>
              <li>Surveillez vos avis Google depuis votre tableau de bord</li>
              <li>Partagez vos avis positifs sur vos réseaux sociaux</li>
            </ul>
            
            <h3>❓ Besoin d'aide ?</h3>
            <p>Notre équipe support reste à votre disposition :</p>
            <ul>
              <li>📧 Email : support@codeqr.com</li>
              <li>📞 Téléphone : +33 1 23 45 67 89</li>
              <li>💬 Chat en ligne : Disponible sur notre site</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2024 CodeQR - Tous droits réservés</p>
            <p>Cet email a été envoyé à ${email}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email d'activation envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email d'activation:", error);
    return false;
  }
}

// Template pour l'email de notification d'expédition
export async function sendShippingNotificationEmail(
  email: string,
  plaqueId: string,
  trackingNumber?: string
) {
  const mailOptions = {
    from: process.env.NEXT_APP_EMAIL_USER,
    to: email,
    subject: "📦 Votre plaque QR Code a été expédiée - CodeQR",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Expédition - CodeQR</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .shipping-box { background: #cce7ff; border: 1px solid #99d6ff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Votre plaque est en route !</h1>
            <p>Votre plaque QR Code CodeQR a été expédiée</p>
          </div>
          
          <div class="content">
            <div class="shipping-box">
              <h3>🚚 Expédition confirmée</h3>
              <p>Votre plaque QR Code a été expédiée et devrait arriver sous 3-5 jours ouvrés.</p>
              ${
                trackingNumber
                  ? `<p><strong>Numéro de suivi :</strong> ${trackingNumber}</p>`
                  : ""
              }
            </div>
            
            <h3>📋 Détails de l'expédition :</h3>
            <ul>
              <li><strong>Plaque ID :</strong> ${plaqueId}</li>
              <li><strong>Date d'expédition :</strong> ${new Date().toLocaleDateString(
                "fr-FR"
              )}</li>
              <li><strong>Délai de livraison estimé :</strong> 3-5 jours ouvrés</li>
            </ul>
            
            <h3>📱 Votre QR Code est déjà actif !</h3>
            <p>N'oubliez pas que votre QR Code est déjà opérationnel. Vous pouvez commencer à l'utiliser dès maintenant en affichant l'image QR Code depuis votre tableau de bord.</p>
            
            <h3>💡 À la réception :</h3>
            <ul>
              <li>Vérifiez que la plaque correspond à votre commande</li>
              <li>Testez le QR Code en le scannant</li>
              <li>Placez la plaque dans un endroit visible</li>
              <li>Encouragez vos clients à l'utiliser</li>
            </ul>
            
            <h3>❓ Questions ?</h3>
            <p>Notre équipe support est là pour vous aider :</p>
            <ul>
              <li>📧 Email : support@codeqr.com</li>
              <li>📞 Téléphone : +33 1 23 45 67 89</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2024 CodeQR - Tous droits réservés</p>
            <p>Cet email a été envoyé à ${email}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email d'expédition envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email d'expédition:", error);
    return false;
  }
}

// Template pour l'email de réinitialisation de mot de passe
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const mailOptions = {
    from: process.env.NEXT_APP_EMAIL_USER,
    to: email,
    subject: "🔐 Réinitialisation de votre mot de passe - CodeQR",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation de mot de passe - CodeQR</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .reset-box { background: #fff; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Réinitialisation de mot de passe</h1>
            <p>CodeQR - Sécurisez votre compte</p>
          </div>
          
          <div class="content">
            <h2>Bonjour !</h2>
            <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte CodeQR.</p>
            
            <div class="reset-box">
              <h3>🔑 Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :</h3>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
              </div>
              <p><em>Ce lien est valable pendant 1 heure pour des raisons de sécurité.</em></p>
            </div>
            
            <h3>⚠️ Important :</h3>
            <ul>
              <li>Ce lien est personnel et ne doit pas être partagé</li>
              <li>Il expire automatiquement dans 1 heure</li>
              <li>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email</li>
              <li>Votre mot de passe actuel reste valide jusqu'à la réinitialisation</li>
            </ul>
            
            <h3>🔒 Sécurité :</h3>
            <p>Pour protéger votre compte, nous vous recommandons de :</p>
            <ul>
              <li>Choisir un mot de passe fort (lettres, chiffres, caractères spéciaux)</li>
              <li>Ne pas utiliser le même mot de passe sur d'autres sites</li>
              <li>Activer l'authentification à deux facteurs si disponible</li>
            </ul>
            
            <h3>❓ Besoin d'aide ?</h3>
            <p>Notre équipe support est là pour vous accompagner :</p>
            <ul>
              <li>📧 Email : support@codeqr.com</li>
              <li>📞 Téléphone : +33 1 23 45 67 89</li>
              <li>💬 Chat en ligne : Disponible sur notre site</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2024 CodeQR - Tous droits réservés</p>
            <p>Cet email a été envoyé à ${email}</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de réinitialisation envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation:",
      error
    );
    return false;
  }
}
