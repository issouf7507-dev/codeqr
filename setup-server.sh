#!/bin/bash

# Script de configuration du serveur VPS
# À exécuter une seule fois sur le serveur VPS

echo "🚀 Configuration du serveur VPS pour le déploiement automatique..."

# Mettre à jour le système
echo "📦 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# Installer Node.js et npm
echo "📦 Installation de Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 globalement
echo "📦 Installation de PM2..."
sudo npm install -g pm2

# Installer Git
echo "📦 Installation de Git..."
sudo apt install git -y

# Créer les répertoires nécessaires
echo "📁 Création des répertoires..."
sudo mkdir -p /var/www/webapp/codeqrapp/{current,backups,temp,logs}
sudo chown -R $USER:$USER /var/www/webapp/codeqrapp

# Rendre le script de déploiement exécutable
echo "🔧 Configuration des permissions..."
chmod +x /var/www/webapp/codeqrapp/deploy.sh

# Configurer PM2 pour démarrer au boot
echo "⚙️ Configuration de PM2..."
pm2 startup
pm2 save

# Installer Nginx (optionnel, pour le reverse proxy)
echo "📦 Installation de Nginx..."
sudo apt install nginx -y

# Configurer Nginx
echo "⚙️ Configuration de Nginx..."
sudo tee /etc/nginx/sites-available/codeqrapp << EOF
server {
    listen 80;
    server_name ci-cargo.com; # Remplacez par votre domaine

    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Activer le site
sudo ln -s /etc/nginx/sites-available/codeqrapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Configurer le firewall
echo "🔥 Configuration du firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ Configuration du serveur terminée!"
echo "📝 Prochaines étapes:"
echo "1. Configurez les secrets GitHub Actions"
echo "2. Configurez le webhook GitHub"
echo "3. Testez le déploiement" 