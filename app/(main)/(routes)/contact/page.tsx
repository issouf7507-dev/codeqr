"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  Building,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      details: ["contact@codeqr.fr", "support@codeqr.fr"],
      description: "Réponse sous 24h maximum",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Téléphone",
      details: ["+33 1 23 45 67 89"],
      description: "Lun-Ven: 9h-18h",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Adresse",
      details: ["123 Rue de l'Innovation", "75001 Paris, France"],
      description: "Siège social",
    },
  ];

  const responseTime = [
    {
      type: "Email",
      time: "24h maximum",
      color: "bg-[#40C49A]",
    },
    {
      type: "Téléphone",
      time: "Immédiat",
      color: "bg-blue-500",
    },
    {
      type: "Support technique",
      time: "2h maximum",
      color: "bg-purple-500",
    },
  ];

  const faqLinks = [
    {
      question: "Comment fonctionnent nos plaques QR Code ?",
      link: "/configuration",
    },
    {
      question: "Quels sont les délais de livraison ?",
      link: "/produits",
    },
    {
      question: "Comment configurer mon lien Google Reviews ?",
      link: "/configuration",
    },
    {
      question: "Puis-je personnaliser le design ?",
      link: "/achat-en-gros",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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
                Nous Contacter
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Une question ? <span className="text-[#40C49A]">Parlons-en</span>
            </h1>
            <p className="text-xl text-black/70 mb-8 leading-relaxed">
              Notre équipe est là pour vous accompagner dans votre projet de
              collecte d'avis Google. Contactez-nous pour toute question ou
              demande personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact-form"
                className="px-8 py-4 bg-[#40C49A] text-white rounded-full font-semibold hover:bg-[#40C49A]/90 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Envoyer un message
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="tel:+33123456789"
                className="px-8 py-4 border-2 border-[#40C49A] text-[#40C49A] rounded-full font-semibold hover:bg-[#40C49A] hover:text-white transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
                Nous appeler
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
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
              Nos coordonnées
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Plusieurs moyens de nous joindre selon vos préférences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#40C49A]/50 transition-colors"
              >
                <div className="w-16 h-16 bg-[#40C49A]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#40C49A]">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-black/80 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-black/60">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#40C49A]/5 border border-[#40C49A]/20 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#40C49A] mb-6 text-center flex items-center justify-center gap-2">
              <Clock className="w-6 h-6" />
              Temps de réponse
            </h3>
            <div className="space-y-4">
              {responseTime.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="text-black/80">{item.type}</span>
                  </div>
                  <span className="font-semibold text-black">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-8"
            >
              <h2 className="text-3xl font-bold text-black mb-6">
                Envoyez-nous un message
              </h2>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-[#40C49A]/5 border border-[#40C49A]/20 text-[#40C49A] rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Votre message a été envoyé avec succès ! Nous vous répondrons
                  dans les plus brefs délais.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  Une erreur s'est produite. Veuillez réessayer ou nous
                  contacter directement.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#40C49A]" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent transition-all duration-200"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#40C49A]" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent transition-all duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#40C49A]" />
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="produit">
                      Information sur nos produits
                    </option>
                    <option value="support">Support technique</option>
                    <option value="partenariat">Partenariat commercial</option>
                    <option value="gros">Achat en gros</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#40C49A] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#40C49A]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-6">
                  Contact rapide
                </h3>
                <div className="space-y-4">
                  <motion.a
                    href="mailto:contact@codeqr.fr"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-[#40C49A]/5 transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#40C49A]/10 rounded-lg flex items-center justify-center text-[#40C49A]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">Email</div>
                      <div className="text-black/70">contact@codeqr.fr</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+33123456789"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-[#40C49A]/5 transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#40C49A]/10 rounded-lg flex items-center justify-center text-[#40C49A]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">Téléphone</div>
                      <div className="text-black/70">+33 1 23 45 67 89</div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* FAQ Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <h3 className="text-2xl font-bold text-black mb-6">
                  Questions fréquentes
                </h3>
                <div className="space-y-3">
                  {faqLinks.map((faq, index) => (
                    <motion.a
                      key={index}
                      href={faq.link}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-[#40C49A] hover:text-[#40C49A]/80 transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{faq.question}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-[#40C49A]/5 border border-[#40C49A]/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-[#40C49A] mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Horaires d'ouverture
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-black/80">Lundi - Vendredi</span>
                    <span className="font-semibold text-black">
                      9h00 - 18h00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black/80">Samedi</span>
                    <span className="font-semibold text-black">
                      10h00 - 16h00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black/80">Dimanche</span>
                    <span className="font-semibold text-red-500">Fermé</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
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
              Nous trouver
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Notre siège social au cœur de Paris
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl border border-gray-200 p-8"
          >
            <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#40C49A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  CodeQR - Siège social
                </h3>
                <p className="text-black/70 mb-4">
                  123 Rue de l'Innovation
                  <br />
                  75001 Paris, France
                </p>
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-[#40C49A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#40C49A]/90 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Voir sur Google Maps
                </motion.a>
              </div>
            </div>
          </motion.div>
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
            <MessageSquare className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à booster vos avis clients ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez nos solutions QR Code et commencez à collecter des avis
              Google dès aujourd'hui
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/produits"
                className="px-8 py-4 bg-white text-[#40C49A] rounded-full font-semibold hover:bg-gray-100 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir nos produits
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/achat-en-gros"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#40C49A] transition-colors"
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
