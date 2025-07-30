# CodeQR - Plaques QR Code pour Avis Google

Une solution complète pour permettre aux commerçants d'acheter des plaques physiques personnalisées contenant un QR Code qui redirige vers leur lien Google d'avis.

## 🎯 Fonctionnalités

- **Achat de plaques** avec choix de modèle (Standard, Premium, Pack Multi)
- **Paiement sécurisé** via Mollie (cartes, virements, etc.)
- **Génération automatique** de codes uniques après paiement
- **Activation de plaques** avec code unique et lien Google
- **Tableau de bord** pour gérer les plaques, commandes et liens
- **Espace super admin** pour gérer les utilisateurs, commandes et codes QR
- **Redirection QR Code** vers les liens Google d'avis
- **Interface moderne** et responsive

## 🛠️ Stack Technique

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Base de données**: MySQL avec Prisma
- **Paiements**: Mollie (cartes, virements, etc.)
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
DATABASE_URL="mysql://username:password@localhost:3306/codeqr"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Mollie Configuration
MOLLIE_API_KEY="test_your_mollie_api_key_here"

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

### 5. Configuration Mollie

1. Créer un compte Mollie (https://www.mollie.com)
2. Récupérer votre clé API de test
3. Configurer le webhook pour `/api/webhooks/mollie`
4. Initialiser les produits dans la base de données :
   ```bash
   npx tsx scripts/init-products.ts
   ```

### 6. Lancer l'application

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🚀 Utilisation

### Pour les clients

1. **Choisir un modèle** : Sélectionner entre Standard (29€), Premium (49€) ou Pack Multi (79€)
2. **Remplir les informations** : Adresse de livraison et coordonnées
3. **Payer** : Paiement sécurisé via Mollie (cartes, virements, etc.)
4. **Recevoir le code** : Le code unique est envoyé par email après paiement
5. **Créer un compte** : S'inscrire sur la plateforme
6. **Activer la plaque** : Utiliser le code et configurer le lien Google
7. **Recevoir la plaque** : La plaque physique est envoyée par courrier

### Pour les administrateurs

- Gestion des commandes et suivi des paiements
- Gestion des utilisateurs et codes QR
- Suivi des livraisons et expéditions
- Support client
- Tableau de bord avec statistiques

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
- **Product** : Produits disponibles (Standard, Premium, Pack Multi)
- **Order** : Commandes des clients
- **OrderItem** : Items de commande
- **QRCode** : Codes QR générés
- **Link** : Liens Google d'avis
- **ShippingInfo** : Informations de livraison
- **Admin** : Administrateurs
- **SuperAdmin** : Super administrateurs

## 🔄 Workflow

1. **Sélection produit** → Client choisit un modèle de plaque
2. **Commande** → Remplissage des informations de livraison
3. **Paiement** → Paiement sécurisé via Mollie
4. **Webhook** → Génération automatique des codes QR après paiement
5. **Email** → Envoi du code d'activation au client
6. **Inscription** → Client crée un compte sur la plateforme
7. **Activation** → Client active sa plaque avec le code + lien Google
8. **Livraison** → Expédition de la plaque physique
9. **Utilisation** → QR Code redirige vers le lien Google

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
