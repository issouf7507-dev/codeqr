# CodeQR - Plaques QR Code pour Avis Google

Une solution complète pour permettre aux commerçants d'acheter des plaques physiques personnalisées contenant un QR Code qui redirige vers leur lien Google d'avis.

## 🎯 Fonctionnalités

- **Achat de plaques** via Stripe Checkout
- **Génération automatique** de codes uniques après paiement
- **Activation de plaques** avec code unique et lien Google
- **Tableau de bord** pour gérer les plaques et liens
- **Redirection QR Code** vers les liens Google d'avis
- **Interface moderne** et responsive

## 🛠️ Stack Technique

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Base de données**: PostgreSQL avec Prisma
- **Paiements**: Stripe Checkout
- **Authentification**: JWT avec cookies httpOnly
- **Génération QR Code**: qrcode.js
- **Styling**: Tailwind CSS

## 📦 Installation

### 1. Cloner le projet

```bash
git clone <repository-url>
cd codeqr
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/codeqr"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PLACE_PRICE_ID="price_your_stripe_price_id"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer et migrer la base de données
npx prisma db push

# (Optionnel) Ouvrir Prisma Studio
npx prisma studio
```

### 5. Configuration Stripe

1. Créer un compte Stripe
2. Créer un produit avec un prix (ex: 29€)
3. Récupérer les clés API et l'ID du prix
4. Configurer le webhook pour `/api/webhooks/stripe`
<!-- 5.ee -->

### 6. Lancer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🚀 Utilisation

### Pour les clients

1. **Acheter une plaque** : Remplir le formulaire sur la page d'accueil
2. **Recevoir le code** : Le code unique est envoyé par email après paiement
3. **Créer un compte** : S'inscrire sur la plateforme
4. **Activer la plaque** : Utiliser le code et configurer le lien Google
5. **Recevoir la plaque** : La plaque physique est envoyée par courrier

### Pour les administrateurs

- Gestion des stocks de plaques
- Suivi des activations
- Support client

## 📁 Structure du Projet

```
codeqr/
├── app/
│   ├── (main)/           # Pages publiques
│   ├── api/              # Routes API
│   ├── dashboard/        # Tableau de bord
│   ├── login/           # Page de connexion
│   ├── register/        # Page d'inscription
│   ├── activate/        # Activation de plaque
│   └── success/         # Page de succès
├── libs/                # Utilitaires
├── prisma/              # Schéma de base de données
└── public/              # Assets statiques
```

## 🔐 Sécurité

- Mots de passe hashés avec bcrypt
- Authentification JWT avec cookies httpOnly
- Validation des entrées utilisateur
- Protection CSRF
- Variables d'environnement sécurisées

## 📊 Base de Données

### Modèles principaux

- **User** : Utilisateurs de la plateforme
- **Plaque** : Plaques QR Code
- **Code** : Codes d'activation uniques
- **Link** : Liens Google d'avis
- **Admin** : Administrateurs (optionnel)

## 🔄 Workflow

1. **Achat** → Génération automatique du code unique
2. **Paiement** → Webhook Stripe marque le code comme payé
3. **Activation** → Utilisateur active avec code + lien Google
4. **Utilisation** → QR Code redirige vers le lien Google

## 🛠️ Développement

### Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Production
npm run start        # Démarrer en production
npm run lint         # Linter
```

### Variables d'environnement de développement

```env
# Mode développement
NODE_ENV=development

# Base de données locale
DATABASE_URL="postgresql://localhost:5432/codeqr_dev"

# Stripe test
STRIPE_SECRET_KEY="sk_test_..."
```

## 📈 Déploiement

### Vercel (Recommandé)

1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes

- Netlify
- Railway
- Heroku
- AWS

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🆘 Support

Pour toute question ou problème :

- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**CodeQR** - Simplifiez la collecte d'avis clients avec des plaques QR Code intelligentes.

Numéro : 4242 4242 4242 4242
Date : N'importe quelle date future (ex: 12/25)
CVC : N'importe quels 3 chiffres (ex: 123)
Code postal : N'importe quoi (ex: 12345)

<!-- https://g.page/r/CT-HdDt9cRsaEBM/review -->
