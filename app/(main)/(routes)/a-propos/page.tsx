"use client";

import Link from "next/link";
import { useState } from "react";

export default function APropos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const team = [
    {
      name: "Thomas Martin",
      role: "Fondateur & CEO",
      description:
        "Expert en marketing digital avec 10 ans d'expérience dans l'optimisation des avis clients.",
      image: "thomas",
    },
    {
      name: "Sarah Dubois",
      role: "Directrice Technique",
      description:
        "Spécialiste en développement web et technologies QR Code avec une passion pour l'innovation.",
      image: "sarah",
    },
    {
      name: "Marc Leroy",
      role: "Responsable Commercial",
      description:
        "Expert en relation client et développement commercial dans le secteur des solutions digitales.",
      image: "marc",
    },
  ];

  const stats = [
    { number: "1000+", label: "Plaques vendues" },
    { number: "500+", label: "Entreprises satisfaites" },
    { number: "98%", label: "Taux de satisfaction" },
    { number: "24h", label: "Support client" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Innovation",
      description:
        "Nous développons constamment de nouvelles solutions pour améliorer l'expérience de nos clients.",
    },
    {
      icon: "🤝",
      title: "Service client",
      description:
        "Notre équipe est disponible 24h/24 pour vous accompagner dans votre réussite.",
    },
    {
      icon: "💎",
      title: "Qualité",
      description:
        "Chaque produit est conçu avec des matériaux premium pour une durabilité maximale.",
    },
    {
      icon: "🚀",
      title: "Performance",
      description:
        "Nos solutions vous permettent d'augmenter significativement vos avis Google.",
    },
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
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <h1 className="ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CodeQR
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
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
              <Link
                href="/temoignages"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Témoignages
              </Link>
              <Link
                href="/a-propos"
                className="text-purple-600 hover:text-gray-900 transition-colors"
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

            {/* Desktop Buttons */}
            <div className="hidden lg:flex space-x-4">
              <Link
                href="/checkout"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                Acheter maintenant
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
              >
                Inscription
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  href="/produits"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link
                  href="/temoignages"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Témoignages
                </Link>
                <Link
                  href="/a-propos"
                  className="text-purple-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  À propos
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Buttons */}
              <div className="flex flex-col space-y-3 mt-6 px-4">
                <Link
                  href="/checkout"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acheter maintenant
                </Link>
                <Link
                  href="/register"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              À propos de{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              CodeQR
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous révolutionnons la collecte d'avis clients avec des solutions QR
            Code innovantes et efficaces
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre mission
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Chez CodeQR, nous croyons que chaque entreprise mérite d'être
              visible et recommandée par ses clients. Notre mission est de
              simplifier la collecte d'avis Google en proposant des solutions
              innovantes, élégantes et efficaces.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Nous aidons les entreprises de toutes tailles à augmenter leur
              visibilité en ligne, à améliorer leur réputation digitale et à
              générer plus de clients grâce à des avis positifs.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/produits"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Découvrir nos produits
              </Link>
              <Link
                href="/contact"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 flex items-center justify-center relative overflow-hidden">
                {/* QR Code Pattern */}
                <div className="grid grid-cols-12 gap-1 p-6">
                  {Array.from({ length: 144 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-sm ${
                        Math.random() > 0.6 ? "bg-gray-800" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                {/* Corner Markers */}
                <div className="absolute top-6 left-6 w-10 h-10 border-4 border-gray-800 rounded-lg"></div>
                <div className="absolute top-6 right-6 w-10 h-10 border-4 border-gray-800 rounded-lg"></div>
                <div className="absolute bottom-6 left-6 w-10 h-10 border-4 border-gray-800 rounded-lg"></div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl -z-10 blur-sm opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 mb-32">
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

        {/* History Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Notre histoire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2022</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Création</h3>
              <p className="text-gray-600">
                Fondation de CodeQR avec l'objectif de révolutionner la collecte
                d'avis clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2023</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expansion
              </h3>
              <p className="text-gray-600">
                Lancement de notre première gamme de plaques QR Code et
                acquisition de nos 100 premiers clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2024</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Développement de nouvelles solutions et expansion de notre
                équipe pour servir plus de 500 entreprises
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Notre équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à booster vos avis Google ?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Rejoignez les centaines d'entreprises qui font confiance à CodeQR
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
