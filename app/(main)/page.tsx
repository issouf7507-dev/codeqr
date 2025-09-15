"use client";

import { useState, useEffect } from "react";
import Component from "../components/hero-scroll-animation";
import AboutUsSection from "../components/about-us-section";
import { TestimonialsColumn } from "../components/testimonials-columns";
import { motion } from "motion/react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const testimonials = [
    {
      text: "Depuis que j'ai installé ma plaque CodeQR, j'ai triplé le nombre d'avis Google pour mon restaurant. Mes clients adorent la simplicité !",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Marie Dubois",
      role: "Restaurant Le Petit Gourmet",
    },
    {
      text: "Installation super facile et résultats immédiats ! La qualité de la plaque est excellente, même après 6 mois en extérieur.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Pierre Martin",
      role: "Garage Auto Plus",
    },
    {
      text: "Le support client est exceptionnel. Ils m'ont guidé pour la configuration et j'ai eu mes premiers avis en 24h !",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Sophie Laurent",
      role: "Salon de Coiffure Élégance",
    },
    {
      text: "CodeQR a transformé notre collecte d'avis. Nous sommes passés de 10 à 150 avis Google en 3 mois. Incroyable !",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Thomas Rousseau",
      role: "Boulangerie Artisanale",
    },
    {
      text: "Les cartes QR Code sont parfaites pour mes interventions à domicile. Mes clients laissent des avis directement après le service.",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Camille Moreau",
      role: "Plombier Indépendant",
    },
    {
      text: "Commande de 50 plaques pour mes magasins. Livraison rapide, qualité au top et tarif dégressif très avantageux.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Isabelle Leroy",
      role: "Chaîne de Magasins Bio",
    },
    {
      text: "Notre réputation en ligne s'est considérablement améliorée. Nous sommes maintenant premiers dans les recherches locales !",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Julien Petit",
      role: "Agence Immobilière",
    },
    {
      text: "Service professionnel et produit de qualité. La personnalisation avec notre logo rend nos plaques très professionnelles.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Nathalie Dubois",
      role: "Cabinet Dentaire",
    },
    {
      text: "CodeQR nous a aidés à digitaliser notre collecte d'avis. Interface simple et efficace, je recommande vivement !",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Alexandre Roux",
      role: "Hôtel 3 Étoiles",
    },
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // setLoading(false);
  }, []);

  const Testimonials = () => {
    return (
      <section className="bg-background my-20 relative">
        <div className="container z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <div className="flex justify-center">
              <div className="border border-[#40C49A] text-[#40C49A] py-1 px-4 rounded-lg">
                Témoignages
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
              Ce que disent nos clients
            </h2>
            <p className="text-center mt-5 opacity-75">
              Découvrez les retours de nos commerçants satisfaits.
            </p>
          </motion.div>

          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] sm:max-h-[740px] overflow-hidden px-4 sm:px-0">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden sm:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <img src="/load.svg" alt="Loading" className="w-32 h-32" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Component />
      <AboutUsSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
