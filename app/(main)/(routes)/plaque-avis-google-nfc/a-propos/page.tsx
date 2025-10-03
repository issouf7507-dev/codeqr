"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Target,
  Heart,
  Users,
  Award,
  Calendar,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  QrCode,
  Lightbulb,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Building,
} from "lucide-react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
// import Header from "../../../components/header";
// import Footer from "../../../components/footer";

export default function APropos() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "500+",
      label: "Commerçants satisfaits",
      description: "Entreprises qui nous font confiance",
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      value: "15 000+",
      label: "Avis collectés",
      description: "Grâce à nos solutions QR Code",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      value: "3+",
      label: "Années d'expérience",
      description: "Dans la collecte d'avis digitale",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "98%",
      label: "Taux de satisfaction",
      description: "De nos clients entreprises",
    },
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Innovation",
      description:
        "Nous développons constamment de nouvelles solutions pour simplifier la collecte d'avis et améliorer la réputation en ligne de nos clients.",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Proximité",
      description:
        "Entreprise française basée à Paris, nous privilégions le contact humain et l'accompagnement personnalisé de chaque client.",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Qualité",
      description:
        "Nos produits sont fabriqués avec des matériaux premium pour garantir une durabilité exceptionnelle, même en utilisation intensive.",
    },
  ];

  const timeline = [
    {
      year: "2021",
      title: "Création de CodeQR",
      description:
        "Fondation de l'entreprise avec l'objectif de démocratiser la collecte d'avis Google pour tous les commerçants.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      year: "2022",
      title: "Premiers clients",
      description:
        "Lancement des premières plaques QR Code et conquête de 100 commerçants satisfaits en région parisienne.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Expansion nationale",
      description:
        "Déploiement dans toute la France avec plus de 300 clients et lancement des cartes QR Code nomades.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      year: "2024",
      title: "Solutions entreprises",
      description:
        "Lancement des offres B2B avec personnalisation complète et tarifs préférentiels pour les gros volumes.",
      icon: <Building className="w-6 h-6" />,
    },
  ];

  const team = [
    {
      name: "Thomas Martin",
      role: "Fondateur & CEO",
      description:
        "Expert en marketing digital et réputation en ligne, Thomas a créé CodeQR pour aider les commerçants à booster leurs avis clients.",
      avatar: "TM",
    },
    {
      name: "Sophie Dubois",
      role: "Directrice Technique",
      description:
        "Ingénieure spécialisée dans les solutions QR Code, Sophie supervise la qualité et l'innovation de nos produits.",
      avatar: "SD",
    },
    {
      name: "Pierre Leroy",
      role: "Responsable Commercial",
      description:
        "Ancien commercial dans la tech, Pierre accompagne nos clients entreprises dans leurs projets de grande envergure.",
      avatar: "PL",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="border border-[#019090] text-[#019090] py-2 px-4 rounded-lg text-sm font-medium">
                À Propos de CodeQR
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Révolutionner la{" "}
              <span className="text-[#019090]">collecte d'avis</span> pour tous
            </h1>
            <p className="text-xl text-black/70 mb-8 leading-relaxed">
              CodeQR est née de la volonté de simplifier la collecte d'avis
              Google pour tous les commerçants. Nous concevons et fabriquons des
              solutions QR Code innovantes qui transforment l'expérience client.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#mission"
                className="px-8 py-4 bg-[#019090] text-white rounded-full font-semibold hover:bg-[#019090]/90 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Notre mission
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#equipe"
                className="px-8 py-4 border-2 border-[#019090] text-[#019090] rounded-full font-semibold hover:bg-[#019090] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rencontrer l'équipe
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#019090]/50 transition-colors"
              >
                <div className="w-16 h-16 bg-[#019090]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#019090]">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-black mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-black/70">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Notre mission et nos valeurs
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Ce qui nous anime au quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-[#019090]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#019090]">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {value.title}
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Notre histoire
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              L'évolution de CodeQR depuis sa création
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#019090]/20 hidden md:block"></div>

              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex gap-8 items-start"
                  >
                    {/* Timeline Dot */}
                    <div className="w-16 h-16 bg-[#019090] rounded-full flex items-center justify-center text-white flex-shrink-0 relative z-10">
                      {event.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-black">
                          {event.title}
                        </h3>
                        <span className="bg-[#019090] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-black/70 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Rencontrez notre équipe
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Les experts qui rendent CodeQR possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-[#019090] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-black mb-1">
                  {member.name}
                </h3>
                <div className="text-[#019090] font-semibold mb-4">
                  {member.role}
                </div>
                <p className="text-black/70 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Notre mission
                </h2>
                <p className="text-xl text-black/70 mb-6 leading-relaxed">
                  Chez CodeQR, nous croyons que chaque commerçant mérite d'avoir
                  une excellente réputation en ligne. C'est pourquoi nous avons
                  développé des solutions simples, efficaces et accessibles pour
                  collecter des avis Google.
                </p>
                <div className="space-y-4">
                  {[
                    "Simplifier la collecte d'avis pour tous",
                    "Améliorer la visibilité des commerçants",
                    "Proposer des solutions durables et qualitatives",
                    "Accompagner nos clients dans leur réussite",
                  ].map((mission, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#019090]" />
                      <span className="text-black/80">{mission}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
                >
                  <img
                    src="/imgs/Photos_new_produits_47.png"
                    alt="Produits CodeQR"
                    className="w-full h-64 object-contain"
                  />
                </motion.div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#019090]/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#019090]/10 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Nous contacter
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe est là pour vous aider
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl border border-gray-200"
            >
              <div className="w-16 h-16 bg-[#019090]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#019090]">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Email</h3>
              <p className="text-black/70">contact@codeqr.fr</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl border border-gray-200"
            >
              <div className="w-16 h-16 bg-[#019090]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#019090]">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Téléphone
              </h3>
              <p className="text-black/70">+33 1 23 45 67 89</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl border border-gray-200"
            >
              <div className="w-16 h-16 bg-[#019090]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#019090]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Adresse</h3>
              <p className="text-black/70">Paris, France</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#019090]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <QrCode className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez l'aventure CodeQR
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez comment nos solutions peuvent transformer votre collecte
              d'avis et booster votre réputation en ligne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/plaque-avis-google-nfc/produits"
                className="px-8 py-4 bg-white text-[#019090] rounded-full font-semibold hover:bg-gray-100 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos produits
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/plaque-avis-google-nfc/achat-en-gros"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#019090] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solutions entreprises
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
