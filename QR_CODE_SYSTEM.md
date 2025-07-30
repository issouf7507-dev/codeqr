# Système de Codes QR - CodeQR

## 🔄 Nouveau Flux d'Achat

### Avant (Génération à la demande)

1. Utilisateur achète → Génération d'un nouveau code QR → Envoi par email

### Maintenant (Codes pré-générés)

1. **Pré-génération** : Codes QR créés à l'avance et stockés inactifs
2. **Achat** : Prise d'un code inactif existant → Association à la commande → Envoi par email
3. **Activation** : Utilisateur active le code avec son lien Google

## 🎯 Avantages du Nouveau Système

### ✅ Avantages

- **Performance** : Pas de génération en temps réel lors de l'achat
- **Contrôle** : Gestion centralisée des codes QR
- **Monitoring** : Suivi des codes disponibles/activés
- **Sécurité** : Codes uniques pré-vérifiés
- **Scalabilité** : Possibilité de générer en masse

### 📊 Gestion des Stocks

- **Disponibles** : Codes inactifs et non associés
- **Associés** : Codes assignés à une commande mais non activés
- **Activés** : Codes utilisés par les clients

## 🔧 Configuration

### 1. Initialisation des Codes QR

```bash
# Générer 200 codes QR de base
npm run init:qr-codes
```

### 2. Vérification des Stocks

```bash
# API pour vérifier les statistiques
GET /api/admin/check-qr-codes
```

### 3. Génération de Nouveaux Codes

```bash
# API pour générer plus de codes
POST /api/admin/check-qr-codes
{
  "count": 100
}
```

## 📱 Interface d'Administration

### Page de Gestion

- **URL** : `/admin/qr-codes`
- **Fonctionnalités** :
  - Statistiques en temps réel
  - Génération de nouveaux codes
  - Alertes de stock faible

### Statistiques Affichées

- 📊 **Disponibles** : Codes prêts pour les achats
- 🔗 **Associés** : Codes assignés aux commandes
- ✅ **Activés** : Codes utilisés par les clients
- 📈 **Total** : Nombre total de codes

## 🔄 Flux Technique

### 1. Webhook Mollie (Paiement Réussi)

```typescript
// Chercher un code QR inactif disponible
const availableQRCode = await prisma.qRCode.findFirst({
  where: {
    isActivated: false,
    orderId: null,
  },
  orderBy: {
    createdAt: "asc", // FIFO
  },
});

// Associer à la commande
await prisma.qRCode.update({
  where: { id: availableQRCode.id },
  data: { orderId: order.id },
});
```

### 2. Envoi d'Email

- Code QR associé à la commande
- Lien d'activation : `/qr/{code}/activation`
- QR code scannable inclus

### 3. Activation par l'Utilisateur

- Vérification du code
- Création/connexion de compte
- Configuration du lien Google
- Activation du code QR

## 🚨 Gestion des Erreurs

### Codes Indisponibles

```typescript
if (!availableQRCode) {
  return NextResponse.json(
    { error: "Aucun code QR disponible" },
    { status: 500 }
  );
}
```

### Alertes Automatiques

- Génération recommandée si < 50 codes disponibles
- Monitoring en temps réel via l'interface admin

## 📋 Commandes Utiles

### Initialisation

```bash
# Générer les codes de base
npm run init:qr-codes

# Vérifier les statistiques
curl http://localhost:3000/api/admin/check-qr-codes
```

### Test

```bash
# Tester l'email avec un code existant
npm run test:email

# Simuler un paiement
# Aller sur http://localhost:3000/test-payment
```

### Production

```bash
# Générer plus de codes si nécessaire
curl -X POST http://localhost:3000/api/admin/check-qr-codes \
  -H "Content-Type: application/json" \
  -d '{"count": 100}'
```

## 🔒 Sécurité

### Validation des Codes

- Vérification de l'existence
- Contrôle du statut (inactif/activé)
- Association unique à une commande

### Protection contre les Doublons

- Génération de codes uniques
- Vérification avant création
- Gestion des conflits

## 📈 Monitoring

### Métriques à Surveiller

- **Taux d'utilisation** : Codes activés / Total
- **Stock disponible** : Codes prêts pour les achats
- **Temps d'activation** : Délai entre achat et activation
- **Taux de conversion** : Achats → Activations

### Alertes Recommandées

- Stock < 50 codes disponibles
- Taux d'activation < 80%
- Erreurs de génération

## 🚀 Déploiement

### Étapes de Mise en Production

1. **Initialisation** : `npm run init:qr-codes`
2. **Configuration** : Variables d'environnement
3. **Test** : Vérification du flux complet
4. **Monitoring** : Surveillance des stocks

### Maintenance

- Génération régulière de nouveaux codes
- Surveillance des statistiques
- Nettoyage des codes obsolètes (optionnel)

## ✅ Checklist de Mise en Place

- [ ] Initialisation des codes QR de base
- [ ] Configuration des variables d'environnement
- [ ] Test du flux d'achat complet
- [ ] Vérification de l'envoi d'email
- [ ] Test de l'activation des codes
- [ ] Configuration du monitoring
- [ ] Formation de l'équipe admin
