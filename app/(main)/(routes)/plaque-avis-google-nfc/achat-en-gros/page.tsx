"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Package,
  Users,
  Star,
  ArrowRight,
  Check,
  Palette,
  Zap,
  Shield,
  Truck,
  Calculator,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";

interface ContactForm {
  company: string;
  name: string;
  email: string;
  phone: string;
  quantity: string;
  productType: string;
  customization: string;
  message: string;
}

export default function AchatEnGros() {
  const [formData, setFormData] = useState<ContactForm>({
    company: "",
    name: "",
    email: "",
    phone: "",
    quantity: "",
    productType: "plaque",
    customization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const wholesalePricing = [
    {
      quantity: "50-99",
      plaque: "29,90",
      carte: "39,90",
      savings: "15%",
      popular: false,
    },
    {
      quantity: "100-199",
      plaque: "24,90",
      carte: "34,90",
      savings: "30%",
      popular: true,
    },
    {
      quantity: "200-499",
      plaque: "19,90",
      carte: "29,90",
      savings: "45%",
      popular: false,
    },
    {
      quantity: "500+",
      plaque: "Sur devis",
      carte: "Sur devis",
      savings: "60%+",
      popular: false,
    },
  ];

  const customizationOptions = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Couleurs personnalisées",
      description: "Adaptation aux couleurs de votre marque",
      included: "À partir de 100 unités",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Logo de votre entreprise",
      description: "Intégration de votre logo sur la plaque",
      included: "À partir de 200 unités",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Message personnalisé",
      description: "Texte d'appel à l'action sur mesure",
      included: "À partir de 100 unités",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Formats spéciaux",
      description: "Dimensions et formes adaptées à vos besoins",
      included: "Sur devis",
    },
  ];

  const benefits = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Prix dégressifs",
      description: "Plus vous commandez, plus vous économisez",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Production rapide",
      description: "Délais de production optimisés pour les gros volumes",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Qualité garantie",
      description: "Même qualité premium pour tous les volumes",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Livraison gratuite",
      description: "Livraison offerte dès 50 unités",
    },
  ];

  const testimonials = [
    {
      name: "Laurent Dubois",
      company: "Chaîne de restaurants FastFood+",
      text: "CodeQR nous a fourni 500 plaques personnalisées avec notre logo. Le service client est exceptionnel et les délais respectés.",
      rating: 5,
      volume: "500 plaques",
    },
    {
      name: "Marie Schneider",
      company: "Réseau d'hôtels Comfort Stay",
      text: "Personnalisation parfaite avec nos couleurs corporate. Nos clients adorent la simplicité du processus d'avis.",
      rating: 5,
      volume: "200 cartes",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Ici vous pourriez ajouter l'appel API pour envoyer l'email
      console.log("Demande de devis:", formData);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="border border-[#019090] text-[#019090] py-2 px-4 rounded-lg text-sm font-medium">
                Achat en Gros & Personnalisation
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Solutions <span className="text-[#019090]">en volume</span> pour
              entreprises
            </h1>
            <p className="text-xl text-black/70 mb-8 leading-relaxed">
              Tarifs préférentiels, personnalisation complète et support dédié
              pour vos commandes en gros. Idéal pour chaînes, franchises et
              entreprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#pricing"
                className="px-8 py-4 bg-[#019090] text-white rounded-full font-semibold hover:bg-[#019090]/90 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir les tarifs
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 text-center border-[#019090] text-[#019090] rounded-full font-semibold hover:bg-[#019090] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un devis
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Pourquoi choisir nos solutions en gros ?
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Des avantages exclusifs pour les professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#019090]/50 transition-colors"
              >
                <div className="w-16 h-16 bg-[#019090]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#019090]">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="text-black/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Tarifs en gros
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Prix dégressifs selon les quantités commandées
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wholesalePricing.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-6 border-2 hover:shadow-lg transition-all ${
                  tier.popular
                    ? "border-[#019090] shadow-lg"
                    : "border-gray-200 hover:border-[#019090]/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#019090] text-white px-4 py-2 rounded-full text-sm font-medium">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {tier.quantity} unités
                  </h3>
                  <div className="mb-4">
                    <span className="text-sm text-[#019090] font-semibold">
                      Économies {tier.savings}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-black/70">
                        Plaque QR Code
                      </div>
                      <div className="text-2xl font-bold text-[#019090]">
                        {tier.plaque}€
                      </div>
                      <div className="text-xs text-black/60">par unité</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-black/70">Carte QR Code</div>
                      <div className="text-2xl font-bold text-[#019090]">
                        {tier.carte}€
                      </div>
                      <div className="text-xs text-black/60">par unité</div>
                    </div>
                  </div>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 inline-block text-center  ${
                      tier.popular
                        ? "bg-[#019090] text-white hover:bg-[#019090]/90"
                        : "bg-gray-100 text-black hover:bg-[#019090] hover:text-white"
                    }`}
                  >
                    Demander un devis
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Section */}
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
              Options de personnalisation
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Adaptez nos produits à votre identité visuelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customizationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#019090]/50 transition-colors"
              >
                <div className="w-16 h-16 bg-[#019090]/10 rounded-xl flex items-center justify-center text-[#019090] flex-shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {option.title}
                  </h3>
                  <p className="text-black/70 mb-3">{option.description}</p>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#019090]" />
                    <span className="text-sm text-[#019090] font-medium">
                      {option.included}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Ils nous font confiance pour leurs achats en gros
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Retours de nos clients entreprises
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-black/60">
                      {testimonial.company}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#019090] font-semibold">
                      {testimonial.volume}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Demandez votre devis personnalisé
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Notre équipe vous contactera sous 24h avec une offre sur mesure
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-[#019090]/10 border-2 border-[#019090] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#019090]" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Demande envoyée avec succès !
                </h3>
                <p className="text-xl text-black/70 mb-6">
                  Notre équipe vous contactera sous 24h pour discuter de votre
                  projet.
                </p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-[#019090] text-[#019090] rounded-xl font-semibold hover:bg-[#019090] hover:text-white transition-colors"
                >
                  Faire une nouvelle demande
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#019090]" />
                        Nom de l'entreprise *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                        placeholder="Votre entreprise"
                      />
                    </div>

                    <div>
                      <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#019090]" />
                        Nom du contact *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#019090]" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                        placeholder="contact@entreprise.com"
                      />
                    </div>

                    <div>
                      <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#019090]" />
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>

                    <div>
                      <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-[#019090]" />
                        Quantité souhaitée *
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                        placeholder="Ex: 100 unités"
                      />
                    </div>

                    <div>
                      <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#019090]" />
                        Type de produit *
                      </label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                      >
                        <option value="plaque">Plaques QR Code</option>
                        <option value="carte">Cartes QR Code</option>
                        <option value="mixte">Mix des deux</option>
                        <option value="personnalise">
                          Produit personnalisé
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[#019090]" />
                      Besoins de personnalisation
                    </label>
                    <input
                      type="text"
                      name="customization"
                      value={formData.customization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                      placeholder="Ex: Logo entreprise, couleurs spécifiques, format particulier..."
                    />
                  </div>

                  <div>
                    <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#019090]" />
                      Message complémentaire
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent resize-none"
                      placeholder="Décrivez votre projet, vos contraintes, délais souhaités..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#019090] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#019090]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer ma demande de devis
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-black/60 text-center">
                    Notre équipe vous contactera sous 24h avec une offre
                    personnalisée. Toutes vos données sont confidentielles.
                  </p>
                </form>
              </motion.div>
            )}
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
            <Package className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt pour un partenariat sur mesure ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Bénéficiez de tarifs préférentiels et d'un service personnalisé
              pour développer votre collecte d'avis à grande échelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-white text-[#019090] rounded-full font-semibold hover:bg-gray-100 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/plaque-avis-google-nfc/produits"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#019090] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir nos produits standards
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
