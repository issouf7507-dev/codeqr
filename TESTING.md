# Guide de Test - Système d'Achat CodeQR

## 🧪 **Test du système complet**

### **Prérequis**

- Serveur de développement démarré (`npm run dev`)
- Base de données configurée et synchronisée
- Produits initialisés (`npx tsx scripts/init-products.ts`)

### **1. Test du processus d'achat complet**

#### **Étape 1 : Créer une commande**

1. Allez sur `http://localhost:3000/checkout`
2. Sélectionnez un modèle de plaque (Standard, Premium, ou Pack Multi)
3. Remplissez le formulaire de livraison avec des données de test :
   - Email : `test@example.com`
   - Prénom : `Jean`
   - Nom : `Dupont`
   - Adresse : `123 Rue de la Paix`
   - Ville : `Paris`
   - Code postal : `75001`
   - Téléphone : `+33 1 23 45 67 89`
4. Cliquez sur "Procéder au paiement"

#### **Étape 2 : Simuler le paiement (Développement)**

1. Après avoir créé la commande, vous serez redirigé vers Mollie
2. **En développement**, vous pouvez utiliser la page de test :
   - Allez sur `http://localhost:3000/test-payment`
   - Copiez l'ID de la commande depuis l'URL Mollie ou la console
   - Collez l'ID dans le champ et cliquez sur "Simuler le paiement"

#### **Étape 3 : Vérifier les résultats**

1. Vérifiez que vous recevez l'email de confirmation
2. Allez sur `http://localhost:3000/success?order_id=VOTRE_ID`
3. Vérifiez que la commande apparaît dans le super admin

### **2. Test de l'espace Super Admin**

#### **Accéder au Super Admin**

1. Allez sur `http://localhost:3000/super-admin/dashboard`
2. Connectez-vous avec vos identifiants super admin

#### **Vérifier les statistiques**

- Nombre total d'utilisateurs
- Nombre de commandes
- Revenus estimés
- Commandes récentes

#### **Gérer les commandes**

1. Allez sur `http://localhost:3000/super-admin/orders`
2. Vérifiez que votre commande de test apparaît
3. Vérifiez les détails : client, produits, statut

### **3. Test avec Mollie en production**

#### **Configuration ngrok (Développement)**

1. Installez ngrok : `npm install -g ngrok`
2. Démarrez ngrok : `ngrok http 3000`
3. Utilisez l'URL ngrok dans votre `.env.local` :
   ```env
   NEXT_PUBLIC_BASE_URL="https://votre-url-ngrok.ngrok.io"
   ```
4. Configurez le webhook Mollie avec l'URL ngrok

#### **Configuration Mollie**

1. Créez un compte sur [Mollie](https://www.mollie.com)
2. Récupérez votre clé API de test
3. Configurez le webhook vers : `https://votre-url-ngrok.ngrok.io/api/webhooks/mollie`

### **4. Test des emails**

#### **Configuration email (Optionnel)**

Pour tester l'envoi d'emails réels, configurez un service comme SendGrid :

```env
EMAIL_SERVICE_API_KEY="votre_clé_sendgrid"
EMAIL_FROM="noreply@codeqr.com"
```

#### **Test sans service email**

Les emails seront loggés dans la console en développement.

### **5. Données de test**

#### **Produits disponibles**

- **Standard** : 29€ - Plaque PVC
- **Premium** : 49€ - Plaque aluminium
- **Pack Multi** : 79€ - 3 plaques standard

#### **Données client de test**

```json
{
  "email": "test@example.com",
  "firstName": "Jean",
  "lastName": "Dupont",
  "company": "Entreprise Test",
  "address": "123 Rue de la Paix",
  "address2": "Bureau 456",
  "city": "Paris",
  "postalCode": "75001",
  "country": "France",
  "phone": "+33 1 23 45 67 89"
}
```

### **6. Dépannage**

#### **Erreur webhook Mollie**

- En développement : Utilisez la page de test `/test-payment`
- En production : Vérifiez que l'URL du webhook est accessible

#### **Erreur base de données**

```bash
npx prisma db push
npx prisma generate
```

#### **Erreur produits non trouvés**

```bash
npx tsx scripts/init-products.ts
```

#### **Erreur email**

- Vérifiez la configuration email dans `.env.local`
- Les emails sont loggés dans la console en développement

### **7. Vérification finale**

Après un achat réussi, vérifiez que :

1. ✅ La commande est créée avec le statut "PAID"
2. ✅ Les codes QR sont générés automatiquement
3. ✅ L'email de confirmation est envoyé
4. ✅ La commande apparaît dans le super admin
5. ✅ Les statistiques sont mises à jour

### **8. Test de l'activation**

1. Utilisez le code reçu par email
2. Créez un compte utilisateur
3. Activez la plaque avec le code et un lien Google
4. Vérifiez que le QR code redirige vers le bon lien

---

**Note** : Ce guide est pour le développement. En production, configurez correctement Mollie et les services email.
