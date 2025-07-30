# 🔧 Guide de Configuration Email - CodeQR

## ❌ Problème Actuel

Vous rencontrez une erreur d'authentification Gmail :

```
535-5.7.8 Username and Password not accepted
```

## 🔍 Diagnostic

Cette erreur indique que Gmail n'accepte pas vos identifiants. Voici pourquoi et comment le résoudre :

## 🛠️ Solutions

### Option 1: Configuration Gmail avec App Password (Recommandé)

#### Étape 1: Activer l'authentification à 2 facteurs

1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Cliquez sur "Sécurité"
3. Activez "Validation en 2 étapes"

#### Étape 2: Générer un App Password

1. Dans "Sécurité", cliquez sur "Mots de passe d'application"
2. Sélectionnez "Autre (nom personnalisé)"
3. Entrez "CodeQR" comme nom
4. Copiez le mot de passe généré (16 caractères)

#### Étape 3: Mettre à jour votre fichier .env

```env
NEXT_APP_EMAIL_USER=ouattaraissouf7507@gmail.com
NEXT_APP_EMAIL_PASS=votre_app_password_ici
```

### Option 2: Utiliser un service email tiers

#### Gmail avec OAuth2 (Avancé)

```env
NEXT_APP_EMAIL_USER=ouattaraissouf7507@gmail.com
NEXT_APP_EMAIL_PASS=votre_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre_email@outlook.com
SMTP_PASS=votre_mot_de_passe
```

#### SendGrid (Recommandé pour production)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=votre_api_key_sendgrid
```

### Option 3: Service email dédié

#### Resend.com (Gratuit jusqu'à 100 emails/jour)

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASS=votre_api_key_resend
```

#### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@votre-domaine.mailgun.org
SMTP_PASS=votre_api_key_mailgun
```

## 🧪 Test de Configuration

### Exécuter le script de test

```bash
node scripts/test-email-config.js
```

### Test manuel

```bash
# Vérifier les variables d'environnement
echo $NEXT_APP_EMAIL_USER
echo $NEXT_APP_EMAIL_PASS

# Tester la connexion
npm run dev
# Puis tester l'envoi d'email depuis l'application
```

## 📋 Checklist de Vérification

- [ ] Authentification à 2 facteurs activée sur Gmail
- [ ] App Password généré et copié
- [ ] Variables d'environnement mises à jour
- [ ] Script de test exécuté avec succès
- [ ] Email de test reçu
- [ ] Application redémarrée après modification des variables

## 🚨 Erreurs Communes

### "Invalid login"

- Vérifiez que vous utilisez un App Password, pas votre mot de passe normal
- Assurez-vous que l'authentification à 2 facteurs est activée

### "Connection timeout"

- Vérifiez votre connexion internet
- Vérifiez les paramètres de pare-feu
- Essayez un port différent (587 au lieu de 465)

### "Authentication failed"

- Vérifiez que l'email et le mot de passe sont corrects
- Assurez-vous qu'il n'y a pas d'espaces en début/fin des valeurs

## 🔒 Sécurité

### Variables d'environnement

- Ne jamais commiter les mots de passe dans Git
- Utilisez toujours des variables d'environnement
- Utilisez des App Passwords pour Gmail

### Production

- Utilisez un service email dédié (SendGrid, Mailgun, etc.)
- Configurez SPF, DKIM, et DMARC
- Surveillez les taux de livraison

## 📞 Support

Si vous continuez à avoir des problèmes :

1. Vérifiez les logs de l'application
2. Exécutez le script de test
3. Consultez la documentation de votre fournisseur email
4. Contactez le support technique

## 🔄 Mise à jour du Code

Le code a été mis à jour pour :

- Supporter plusieurs configurations SMTP
- Améliorer la gestion d'erreurs
- Ajouter des options de fallback
- Inclure un système de test

Votre configuration email devrait maintenant fonctionner correctement !
