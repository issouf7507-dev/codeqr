#!/bin/bash

# Script de configuration initiale du serveur pour CodeQR
# À exécuter une seule fois pour configurer l'environnement

set -e

echo "🔧 Configuration du serveur pour CodeQR..."

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifier si le script est exécuté en tant que root ou avec sudo
if [ "$EUID" -eq 0 ]; then 
    echo -e "${RED}❌ Ne pas exécuter ce script en tant que root. Utilisez votre utilisateur normal.${NC}"
    exit 1
fi

# Mettre à jour le système
echo -e "${YELLOW}📦 Mise à jour du système...${NC}"
sudo apt update && sudo apt upgrade -y

# Installer les dépendances de base
echo -e "${YELLOW}📦 Installation des dépendances système...${NC}"
sudo apt install -y curl wget git build-essential

# Installer Node.js (LTS)
echo -e "${YELLOW}📦 Installation de Node.js...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo -e "${GREEN}✅ Node.js est déjà installé: $(node --version)${NC}"
fi

# Installer pnpm (gestionnaire de paquets utilisé par le projet)
echo -e "${YELLOW}📦 Installation de pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
    # Utiliser npm avec sudo pour installation globale
    sudo npm install -g pnpm
    echo -e "${GREEN}✅ pnpm installé${NC}"
else
    echo -e "${GREEN}✅ pnpm est déjà installé${NC}"
fi

# Installer PM2 globalement
echo -e "${YELLOW}📦 Installation de PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    echo -e "${GREEN}✅ PM2 installé${NC}"
fi

# Configurer PM2 pour démarrer au boot (si pas déjà configuré)
echo -e "${YELLOW}⚙️  Configuration de PM2 pour le démarrage automatique...${NC}"
if [ ! -f "/etc/systemd/system/pm2-$USER.service" ]; then
    STARTUP_CMD=$(pm2 startup systemd -u $USER --hp $HOME | grep "sudo env" || true)
    if [ ! -z "$STARTUP_CMD" ]; then
        echo -e "${YELLOW}⚠️  Exécutez cette commande pour activer PM2 au démarrage:${NC}"
        echo -e "${STARTUP_CMD}"
        echo ""
        read -p "Voulez-vous l'exécuter maintenant? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            eval $STARTUP_CMD
            echo -e "${GREEN}✅ PM2 configuré pour démarrer au boot${NC}"
        fi
    fi
else
    echo -e "${GREEN}✅ PM2 est déjà configuré pour démarrer au boot${NC}"
fi

# Installer Nginx
echo -e "${YELLOW}📦 Installation de Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo -e "${GREEN}✅ Nginx installé et démarré${NC}"
else
    echo -e "${GREEN}✅ Nginx est déjà installé${NC}"
fi

# Installer MySQL (si nécessaire)
echo -e "${YELLOW}🗄️  Souhaitez-vous installer MySQL? (y/n)${NC}"
read -r install_mysql
if [ "$install_mysql" = "y" ] || [ "$install_mysql" = "Y" ]; then
    sudo apt install -y mysql-server
    sudo systemctl enable mysql
    sudo systemctl start mysql
    echo -e "${GREEN}✅ MySQL installé${NC}"
    echo -e "${YELLOW}⚠️  N'oubliez pas de configurer MySQL et de créer la base de données pour CodeQR${NC}"
fi

# Configurer le firewall
echo -e "${YELLOW}🔥 Configuration du firewall...${NC}"
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp    # SSH
    sudo ufw allow 80/tcp    # HTTP
    sudo ufw allow 443/tcp   # HTTPS
    sudo ufw --force enable
    echo -e "${GREEN}✅ Firewall configuré${NC}"
else
    echo -e "${YELLOW}⚠️  UFW n'est pas installé. Vous pouvez l'installer avec: sudo apt install ufw${NC}"
fi

# Créer les répertoires nécessaires
echo -e "${YELLOW}📁 Création des répertoires...${NC}"
mkdir -p ~/apps/codeqr/{logs,backups}

# Instructions pour la configuration Nginx
echo -e "${GREEN}✅ Configuration du serveur terminée!${NC}"
echo ""
echo -e "${YELLOW}📝 Prochaines étapes:${NC}"
echo -e "1. Clonez le repository: cd ~/apps && git clone https://github.com/issouf7507-dev/codeqr.git"
echo -e "2. Configurez les variables d'environnement: cd ~/apps/codeqr && cp .env.example .env.local"
echo -e "3. Configurez Nginx: sudo cp ~/apps/codeqr/nginx-codeqr.conf /etc/nginx/sites-available/codeqr"
echo -e "   Puis: sudo ln -s /etc/nginx/sites-available/codeqr /etc/nginx/sites-enabled/"
echo -e "   Éditez le fichier et remplacez 'votre-domaine.com' par votre domaine"
echo -e "   Testez: sudo nginx -t"
echo -e "   Redémarrez: sudo systemctl restart nginx"
echo -e "4. Déployez l'application: cd ~/apps/codeqr && chmod +x deploy.sh && ./deploy.sh"
echo ""
echo -e "${GREEN}🎉 Configuration terminée!${NC}"

