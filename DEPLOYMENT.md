# 🚀 Guide de Déploiement Automatique

Ce guide vous explique comment configurer un déploiement automatique de votre application Next.js sur votre serveur VPS.

## 📋 Prérequis

- Un serveur VPS Ubuntu/Debian
- Un compte GitHub
- Un domaine (optionnel)

## 🔧 Configuration du Serveur VPS

### 1. Connexion au serveur

```bash
ssh utilisateur@votre-serveur.com
```

### 2. Exécution du script de configuration

```bash
# Télécharger le script de configuration
wget https://raw.githubusercontent.com/votre-username/didbril/main/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

### 3. Configuration manuelle (si nécessaire)

```bash
# Créer les répertoires
sudo mkdir -p /var/www/didbril/{current,backups,temp,logs}
sudo chown -R $USER:$USER /var/www/didbril

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2
sudo npm install -g pm2
```

## 🔑 Configuration GitHub Actions

### 1. Créer les secrets GitHub

Allez dans votre repository GitHub → Settings → Secrets and variables → Actions

Ajoutez les secrets suivants :

- `VPS_HOST` : L'adresse IP de votre serveur VPS
- `VPS_USERNAME` : Votre nom d'utilisateur sur le VPS
- `VPS_SSH_KEY` : Votre clé SSH privée
- `VPS_PORT` : Le port SSH (généralement 22)

### 2. Générer une clé SSH

```bash
# Sur votre machine locale
ssh-keygen -t rsa -b 4096 -C "votre-email@example.com"

# Copier la clé publique sur le serveur
ssh-copy-id utilisateur@votre-serveur.com

# Copier la clé privée dans GitHub Secrets
cat ~/.ssh/id_rsa
```

## 🌐 Configuration du Webhook (Alternative)

### 1. Placer le webhook sur le serveur

```bash
# Copier webhook.php dans le répertoire web
sudo cp webhook.php /var/www/html/webhook.php
sudo chown www-data:www-data /var/www/html/webhook.php
```

### 2. Configurer le webhook dans GitHub

- Allez dans votre repository → Settings → Webhooks
- Cliquez sur "Add webhook"
- Payload URL : `https://votre-domaine.com/webhook.php`
- Content type : `application/json`
- Secret : `votre_secret_webhook` (changez dans webhook.php)

## 🚀 Premier Déploiement

### Option 1 : Via GitHub Actions

1. Poussez votre code sur la branche `main`
2. Le workflow se déclenche automatiquement
3. Vérifiez les logs dans l'onglet Actions de GitHub

### Option 2 : Manuel

```bash
# Sur le serveur VPS
cd /var/www/didbril
./deploy.sh
```

## 📊 Monitoring

### Vérifier le statut de l'application

```bash
pm2 status
pm2 logs didbril
```

### Vérifier les logs de déploiement

```bash
tail -f /var/www/didbril/deploy.log
```

## 🔄 Workflow de Développement

1. **Développement local**

   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   # Faites vos modifications
   npm run dev
   ```

2. **Test et commit**

   ```bash
   git add .
   git commit -m "Ajout de nouvelle fonctionnalité"
   git push origin feature/nouvelle-fonctionnalite
   ```

3. **Merge et déploiement**
   - Créez une Pull Request sur GitHub
   - Mergez sur la branche `main`
   - Le déploiement se déclenche automatiquement

## 🛠️ Commandes Utiles

### Redémarrer l'application

```bash
pm2 restart didbril
```

### Voir les logs

```bash
pm2 logs didbril --lines 100
```

### Rollback vers une version précédente

```bash
cd /var/www/didbril
ls backups/
cp -r backups/backup-YYYYMMDD-HHMMSS/* current/
pm2 restart didbril
```

### Mettre à jour le serveur

```bash
sudo apt update && sudo apt upgrade -y
```

## 🔒 Sécurité

### Firewall

```bash
sudo ufw status
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
```

### SSL/HTTPS (avec Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

## 📞 Support

En cas de problème :

1. Vérifiez les logs : `pm2 logs didbril`
2. Vérifiez le statut : `pm2 status`
3. Vérifiez les logs de déploiement : `tail -f /var/www/didbril/deploy.log`

## 🎯 Bonnes Pratiques

- ✅ Testez toujours en local avant de pousser
- ✅ Utilisez des branches pour les nouvelles fonctionnalités
- ✅ Vérifiez les logs après chaque déploiement
- ✅ Gardez des sauvegardes régulières
- ✅ Surveillez l'utilisation des ressources
  chmod +x deploy.sh setup-server.sh
