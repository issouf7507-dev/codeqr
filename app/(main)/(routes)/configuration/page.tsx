"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  QrCode,
  ArrowRight,
  Check,
  Play,
  Star,
  Clock,
  Shield,
  Settings,
  Users,
  Link2,
  Smartphone,
  Globe,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Upload,
} from "lucide-react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

export default function Configuration() {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const steps = [
    {
      id: 1,
      title: "Commande",
      description: "Choisissez votre produit",
      icon: <QrCode className="w-6 h-6" />,
      status: "completed",
    },
    {
      id: 2,
      title: "Configuration",
      description: "Paramétrage de votre QR Code",
      icon: <Settings className="w-6 h-6" />,
      status: "active",
    },
    {
      id: 3,
      title: "Production",
      description: "Fabrication de votre plaque",
      icon: <Users className="w-6 h-6" />,
      status: "pending",
    },
    {
      id: 4,
      title: "Livraison",
      description: "Réception sous 3-5 jours",
      icon: <Check className="w-6 h-6" />,
      status: "pending",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const configurationSteps = [
    {
      step: 1,
      title: "Récupération de votre lien Google Avis",
      description:
        "Nous vous guidons pour récupérer le lien direct vers votre page d'avis Google Business",
      icon: <Link2 className="w-8 h-8" />,
      details: [
        "Connexion à votre compte Google Business",
        "Génération du lien d'avis personnalisé",
        "Vérification de la validité du lien",
        "Optimisation pour mobile",
      ],
      duration: "5-10 minutes",
    },
    {
      step: 2,
      title: "Génération du QR Code",
      description:
        "Création d'un QR Code haute résolution optimisé pour votre usage",
      icon: <QrCode className="w-8 h-8" />,
      details: [
        "QR Code haute résolution (300 DPI)",
        "Test de fonctionnement multi-appareils",
        "Optimisation pour impression",
        "Format vectoriel disponible",
      ],
      duration: "2-3 minutes",
    },
    {
      step: 3,
      title: "Personnalisation du design",
      description:
        "Adaptation du design à votre identité visuelle et secteur d'activité",
      icon: <Settings className="w-8 h-8" />,
      details: [
        "Choix du template adapté à votre secteur",
        "Intégration de vos couleurs (optionnel)",
        "Ajout de votre logo (service premium)",
        "Prévisualisation du rendu final",
      ],
      duration: "10-15 minutes",
    },
    {
      step: 4,
      title: "Validation et finalisation",
      description: "Vérification finale et préparation pour la production",
      icon: <CheckCircle className="w-8 h-8" />,
      details: [
        "Test final du QR Code",
        "Validation du design",
        "Préparation des fichiers de production",
        "Confirmation de commande",
      ],
      duration: "3-5 minutes",
    },
  ];

  const faqs = [
    {
      question: "Combien de temps prend la configuration ?",
      answer:
        "La configuration complète prend généralement entre 20 et 30 minutes. Notre équipe vous accompagne à chaque étape pour que tout soit parfait.",
    },
    {
      question: "Puis-je modifier ma configuration après validation ?",
      answer:
        "Oui, vous pouvez modifier votre configuration jusqu'à ce que votre commande soit en production. Après, des frais peuvent s'appliquer selon les modifications.",
    },
    {
      question: "Le QR Code fonctionnera-t-il sur tous les smartphones ?",
      answer:
        "Absolument ! Nous testons nos QR Codes sur iOS, Android et tous les lecteurs populaires pour garantir une compatibilité maximale.",
    },
    {
      question: "Que se passe-t-il si mon lien Google change ?",
      answer:
        "Pas de problème ! Nous proposons un service de mise à jour gratuit pendant 6 mois après votre achat. Ensuite, c'est 9,90€ par modification.",
    },
  ];

  const testimonials = [
    {
      name: "Claire Moreau",
      business: "Boulangerie Artisanale",
      text: "La configuration s'est faite en 20 minutes avec un support exceptionnel. Très professionnel !",
      rating: 5,
      avatar: "CM",
    },
    {
      name: "Thomas Dubois",
      business: "Restaurant Le Gourmet",
      text: "Processus simple et efficace. L'équipe m'a accompagné jusqu'au bout.",
      rating: 5,
      avatar: "TD",
    },
  ];
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <img src="/load.svg" alt="Loading" className="w-32 h-32" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="border border-[#40C49A] text-[#40C49A] py-2 px-4 rounded-lg text-sm font-medium">
                Configuration
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Configuration{" "}
              <span className="text-[#40C49A]">simple et guidée</span>
            </h1>
            <p className="text-xl text-black/70 mb-8 leading-relaxed">
              Notre équipe vous accompagne pas à pas pour configurer votre QR
              Code et optimiser votre collecte d'avis Google
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#process"
                className="px-8 py-4 bg-[#40C49A] text-white rounded-full font-semibold hover:bg-[#40C49A]/90 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir le processus
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/produits"
                className="px-8 py-4 border-2 border-[#40C49A] text-[#40C49A] rounded-full font-semibold hover:bg-[#40C49A] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir nos produits
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
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
              Votre commande en 4 étapes
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Un processus simple et transparent du début à la fin
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200">
                <div className="h-full bg-[#40C49A] transition-all duration-500 w-1/4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10 ${
                        step.status === "completed"
                          ? "bg-[#40C49A] text-white"
                          : step.status === "active"
                          ? "bg-[#40C49A] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-black/70 text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Process */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Processus de configuration détaillé
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Découvrez comment nous configurons votre QR Code étape par étape
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {configurationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#40C49A]/10 rounded-xl flex items-center justify-center text-[#40C49A]">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-[#40C49A] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Étape {step.step}
                          </span>
                          <div className="flex items-center gap-2 text-black/60">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{step.duration}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">
                          {step.title}
                        </h3>
                        <p className="text-black/70 mb-4">{step.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center gap-3"
                        >
                          <Check className="w-4 h-4 text-[#40C49A] flex-shrink-0" />
                          <span className="text-black/80 text-sm">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Pourquoi notre configuration est unique
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Des avantages qui font la différence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Accompagnement personnalisé",
                description:
                  "Un expert dédié vous guide tout au long du processus",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Sécurité garantie",
                description: "Vos données sont protégées et jamais partagées",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Test multi-appareils",
                description: "Compatibilité vérifiée sur tous les smartphones",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Optimisation SEO",
                description:
                  "Lien optimisé pour améliorer votre référencement local",
                color: "bg-orange-50 text-orange-600",
              },
              {
                icon: <Download className="w-8 h-8" />,
                title: "Fichiers haute qualité",
                description:
                  "QR Code en haute résolution pour tous vos supports",
                color: "bg-red-50 text-red-600",
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Modifications gratuites",
                description: "6 mois de modifications gratuites incluses",
                color: "bg-indigo-50 text-indigo-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#40C49A]/50 transition-colors"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-black/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Retours sur notre service de configuration
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Ce que disent nos clients de l'expérience de configuration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-black/80 mb-6 italic text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#40C49A] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-black/60">
                      {testimonial.business}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Questions fréquentes sur la configuration
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-black">
                    {faq.question}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-[#40C49A] group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-black/70 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#40C49A]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Settings className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à configurer votre QR Code ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre équipe d'experts vous accompagne pour une configuration
              parfaite et optimisée
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/produits"
                className="px-8 py-4 bg-white text-[#40C49A] rounded-full font-semibold hover:bg-gray-100 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choisir mon produit
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#40C49A] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Poser une question
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
