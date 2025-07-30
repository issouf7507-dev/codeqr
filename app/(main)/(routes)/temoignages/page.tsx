"use client";

import Link from "next/link";
import { useState } from "react";

export default function Temoignages() {
  const [activeFilter, setActiveFilter] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      business: "Restaurant Le Gourmet",
      location: "Paris",
      rating: 5,
      category: "restaurant",
      image: "marie",
      testimonial:
        "Depuis que nous avons installé la plaque QR Code de CodeQR, nos avis Google ont augmenté de 300% ! Les clients adorent la simplicité du système. C'est un vrai gain de temps pour nous et une excellente expérience pour nos clients.",
      results: "300% d'augmentation des avis",
    },
    {
      id: 2,
      name: "Pierre Martin",
      business: "Coiffeur Style & Co",
      location: "Lyon",
      rating: 5,
      category: "beauty",
      image: "pierre",
      testimonial:
        "Excellent produit ! La plaque QR Code est élégante et s'intègre parfaitement dans notre salon. Nos clients sont ravis de pouvoir laisser un avis si facilement. Le support client est également très réactif.",
      results: "150% d'augmentation des avis",
    },
    {
      id: 3,
      name: "Sophie Bernard",
      business: "Boulangerie du Centre",
      location: "Marseille",
      rating: 5,
      category: "food",
      image: "sophie",
      testimonial:
        "Nous avons commandé 3 plaques pour nos différents points de vente. Le résultat est impressionnant : nos avis Google ont doublé en seulement 2 mois. Le produit est de qualité et la livraison était rapide.",
      results: "100% d'augmentation des avis",
    },
    {
      id: 4,
      name: "Thomas Leroy",
      business: "Garage Auto Pro",
      location: "Toulouse",
      rating: 5,
      category: "automotive",
      image: "thomas",
      testimonial:
        "Parfait pour notre garage ! Les clients scannent le QR Code en attendant leur véhicule et laissent un avis. C'est beaucoup plus efficace que de demander oralement. Je recommande vivement !",
      results: "250% d'augmentation des avis",
    },
    {
      id: 5,
      name: "Julie Moreau",
      business: "Institut de Beauté Zen",
      location: "Bordeaux",
      rating: 5,
      category: "beauty",
      image: "julie",
      testimonial:
        "La plaque QR Code a transformé notre façon de collecter les avis. Nos clients sont plus enclins à laisser un commentaire grâce à la simplicité du processus. Un investissement qui en vaut vraiment la peine !",
      results: "180% d'augmentation des avis",
    },
    {
      id: 6,
      name: "Marc Durand",
      business: "Pharmacie du Quartier",
      location: "Nantes",
      rating: 5,
      category: "health",
      image: "marc",
      testimonial:
        "Service client exceptionnel et produit de qualité. La plaque QR Code nous a permis d'améliorer significativement notre visibilité en ligne. Les clients apprécient la démarche moderne.",
      results: "120% d'augmentation des avis",
    },
  ];

  const categories = [
    { id: "all", name: "Tous les secteurs" },
    { id: "restaurant", name: "Restauration" },
    { id: "beauty", name: "Beauté & Bien-être" },
    { id: "food", name: "Alimentation" },
    { id: "automotive", name: "Automobile" },
    { id: "health", name: "Santé" },
  ];

  const filteredTestimonials =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.category === activeFilter
        );

  const stats = [
    { number: "500+", label: "Clients satisfaits" },
    { number: "98%", label: "Taux de satisfaction" },
    { number: "200%", label: "Augmentation moyenne des avis" },
    { number: "4.9/5", label: "Note moyenne" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  CodeQR
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/produits"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Produits
              </Link>
              <Link href="/temoignages" className="text-purple-600 font-medium">
                Témoignages
              </Link>
              <Link
                href="/a-propos"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Témoignages{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              clients
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les retours d'expérience de nos clients qui ont transformé
            leur collecte d'avis Google avec CodeQR
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.business}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Results */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                <p className="text-sm font-semibold text-green-700">
                  📈 Résultat : {testimonial.results}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Témoignages vidéo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Restaurant Le Gourmet
              </h3>
              <p className="text-gray-600 mb-4">
                Marie Dubois témoigne de son expérience avec CodeQR
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                Regarder la vidéo
              </button>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Coiffeur Style & Co
              </h3>
              <p className="text-gray-600 mb-4">
                Pierre Martin partage ses résultats avec CodeQR
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                Regarder la vidéo
              </button>
            </div>
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Études de cas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">R</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Restaurant Le Gourmet
                  </h3>
                  <p className="text-gray-600">Secteur : Restauration</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avant CodeQR</span>
                  <span className="font-semibold text-gray-900">
                    15 avis/mois
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Après CodeQR</span>
                  <span className="font-semibold text-green-600">
                    45 avis/mois
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amélioration</span>
                  <span className="font-semibold text-purple-600">+300%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Coiffeur Style & Co
                  </h3>
                  <p className="text-gray-600">Secteur : Beauté</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avant CodeQR</span>
                  <span className="font-semibold text-gray-900">
                    8 avis/mois
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Après CodeQR</span>
                  <span className="font-semibold text-green-600">
                    20 avis/mois
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amélioration</span>
                  <span className="font-semibold text-purple-600">+150%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Commencez à collecter plus d'avis Google dès aujourd'hui
          </p>
          <Link
            href="/produits"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 inline-block"
          >
            Commander maintenant
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-md border-t border-gray-200 py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="ml-2 text-gray-900 font-semibold">CodeQR</span>
            </div>
            <p className="text-gray-600">
              &copy; 2024 CodeQR. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
