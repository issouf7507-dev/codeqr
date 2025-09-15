"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Star,
  ArrowRight,
  Shield,
  Truck,
  Settings,
  Users,
  QrCode,
  ChevronDown,
} from "lucide-react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";

export default function Produits() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          // Adapter les données pour l'affichage
          const adaptedProducts = data.map((product: any, index: number) => ({
            ...product,
            price: `${product.price.toFixed(2).replace(".", ",")}€`,
            originalPrice: index === 0 ? "49,90€" : "69,90€", // Prix barrés pour l'affichage
            popular: index === 0, // Le premier produit est populaire
            badge: index === 0 ? "Le plus populaire" : "Premium",
          }));
          setProducts(adaptedProducts);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const testimonials = [
    {
      name: "Marie Dubois",
      business: "Restaurant Le Petit Gourmet",
      text: "Depuis que j'ai installé ma plaque CodeQR, j'ai triplé le nombre d'avis Google !",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      business: "Garage Auto Plus",
      text: "Installation super facile et résultats immédiats. La qualité est excellente.",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      business: "Salon de Coiffure Élégance",
      text: "Mes clientes adorent la simplicité du QR Code. Très professionnel !",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Quelle est la différence entre les modèles ?",
      answer:
        "La plaque QR Code (34,90€) est parfaite pour un affichage fixe dans votre établissement. La carte QR Code (49,90€) est idéale pour les professionnels nomades ou pour distribuer à vos clients. Les deux permettent de collecter facilement des avis Google.",
    },
    {
      question: "Puis-je personnaliser le design ?",
      answer:
        "Actuellement, nous proposons nos designs standards qui ont fait leurs preuves. Si vous avez des besoins spécifiques, contactez-nous pour discuter d'une personnalisation sur mesure.",
    },
    {
      question: "Y a-t-il des frais de livraison ?",
      answer:
        "La livraison est gratuite pour la plaque QR Code. La carte QR Code inclut une livraison express gratuite pour une réception plus rapide.",
    },
    {
      question: "Combien de temps pour recevoir ma commande ?",
      answer:
        "Après votre commande et configuration, vous recevez votre plaque sous 3-5 jours ouvrés avec la livraison gratuite en France métropolitaine.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center justify-center ">
          <img src="/load.svg" alt="Loading" className="w-32 h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50 ">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="border border-[#40C49A] text-[#40C49A] py-2 px-4 rounded-lg text-sm font-medium">
                Nos Produits
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Boostez vos avis clients avec nos{" "}
              <span className="text-[#40C49A]">plaques QR Code</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Choisissez votre solution
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Deux formats adaptés à tous vos besoins professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl border-2 p-8 hover:shadow-xl transition-all duration-300 ${
                  product.popular
                    ? "border-[#40C49A] shadow-lg"
                    : "border-gray-200 hover:border-[#40C49A]/50"
                }`}
              >
                {product.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#40C49A] text-white px-4 py-2 rounded-full text-sm font-medium">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div className="mb-6">
                  <div className="w-full h-64 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {product.name}
                  </h3>
                  <p className="text-black/70 mb-4">{product.description}</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-4xl font-bold text-[#40C49A]">
                      {product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xl text-gray-400 line-through">
                        {product.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={`/produit/${product.id}`}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 inline-block text-center ${
                    product.popular
                      ? "bg-[#40C49A] text-white hover:bg-[#40C49A]/90"
                      : "bg-gray-100 text-black hover:bg-[#40C49A] hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Voir les détails
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Pourquoi choisir CodeQR ?
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Des avantages qui font la différence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Qualité Premium",
                description: "Matériaux durables et résistants aux intempéries",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Livraison Rapide",
                description: "Livraison gratuite sous 3-5 jours ouvrés",
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Configuration Incluse",
                description: "Setup complet avec votre lien Google Avis",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Support Dédié",
                description: "Accompagnement personnalisé et suivi",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#40C49A]/50 transition-colors"
              >
                <div className="w-16 h-16 bg-[#40C49A]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#40C49A]">
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

      {/* Testimonials Section */}
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
              Ils nous font confiance
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto">
              Découvrez les retours de nos clients satisfaits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-black/80 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-black">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-black/60">
                    {testimonial.business}
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
              Questions fréquentes
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
                  <ChevronDown className="w-5 h-5 text-[#40C49A] group-open:rotate-180 transition-transform duration-200" />
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
            <QrCode className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à booster vos avis clients ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines de commerçants qui utilisent déjà CodeQR
              pour améliorer leur réputation en ligne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/checkout"
                className="px-8 py-4 bg-white text-[#40C49A] rounded-full font-semibold hover:bg-gray-100 transition-colors text-center flex justify-center items-center gap-2  md:inline-flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Commander maintenant
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#40C49A] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nous contacter
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
