#!/bin/bash

# Script de déploiement pour CodeQR
# Ce script doit être exécuté depuis le répertoire du projet

set -e  # Arrêter en cas d'erreur

echo "🚀 Début du déploiement de CodeQR..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json non trouvé. Exécutez ce script depuis le répertoire du projet.${NC}"
    exit 1
fi

# Créer les répertoires nécessaires
echo -e "${YELLOW}📁 Création des répertoires...${NC}"
mkdir -p logs backups

# Vérifier que le fichier .env existe
if [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
    echo -e "${RED}❌ Erreur: Fichier .env.local ou .env non trouvé!${NC}"
    echo -e "${YELLOW}⚠️  Veuillez créer un fichier .env.local avec les variables d'environnement nécessaires.${NC}"
    exit 1
fi

# Backup de la version actuelle si elle existe
if [ -d ".next" ]; then
    echo -e "${YELLOW}💾 Création d'une sauvegarde...${NC}"
    BACKUP_DIR="backups/backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r .next "$BACKUP_DIR/" 2>/dev/null || true
    echo -e "${GREEN}✅ Sauvegarde créée dans $BACKUP_DIR${NC}"
fi

# Mettre à jour le code depuis Git (si on est dans un repo git)
if [ -d ".git" ]; then
    echo -e "${YELLOW}📥 Mise à jour du code depuis Git...${NC}"
    git pull origin main || echo -e "${YELLOW}⚠️  Impossible de faire git pull (peut-être pas configuré)${NC}"
fi

# Installer les dépendances avec npm
echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
npm install --production=false

# Générer le client Prisma
echo -e "${YELLOW}🔧 Génération du client Prisma...${NC}"
# Temporairement renommer prisma.config.ts s'il existe car il peut interférer avec la génération
if [ -f "prisma.config.ts" ]; then
    mv prisma.config.ts prisma.config.ts.bak
fi
npx prisma generate
# Remettre le fichier en place
if [ -f "prisma.config.ts.bak" ]; then
    mv prisma.config.ts.bak prisma.config.ts
fi

# Migrer la base de données (optionnel, commenté par défaut pour éviter les migrations accidentelles)
# echo -e "${YELLOW}🗄️  Migration de la base de données...${NC}"
# npx prisma db push

# Builder l'application Next.js
echo -e "${YELLOW}🏗️  Build de l'application Next.js...${NC}"
npm run build

# Redémarrer l'application avec PM2
echo -e "${YELLOW}🔄 Redémarrage de l'application avec PM2...${NC}"
if pm2 list | grep -q "codeqr"; then
    pm2 restart codeqr
    echo -e "${GREEN}✅ Application redémarrée${NC}"
else
    pm2 start ecosystem.config.js
    pm2 save
    echo -e "${GREEN}✅ Application démarrée avec PM2${NC}"
fi

# Afficher le statut
echo -e "${GREEN}📊 Statut de l'application:${NC}"
pm2 status codeqr

echo -e "${GREEN}✅ Déploiement terminé avec succès!${NC}"
echo -e "${YELLOW}💡 Pour voir les logs: pm2 logs codeqr${NC}"
echo -e "${YELLOW}💡 Pour voir le statut: pm2 status${NC}"

