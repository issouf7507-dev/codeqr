"use client";

import Link from "next/link";
import { useState } from "react";
export default function Produits() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const products = [
    {
      id: 1,
      name: "Plaque QR Code Standard",
      description:
        "Notre plaque la plus populaire, parfaite pour la plupart des entreprises",
      price: "29€",
      features: [
        "Design professionnel en PVC",
        "QR Code haute résolution",
        "Adhésif double-face inclus",
        "Taille: 15x15 cm",
        "Livraison gratuite",
        "Configuration incluse",
      ],
      image: "standard",
      popular: true,
    },
    {
      id: 2,
      name: "Plaque QR Code Premium",
      description:
        "Pour les entreprises qui veulent se démarquer avec un design exclusif",
      price: "49€",
      features: [
        "Design premium en aluminium",
        "QR Code haute résolution",
        "Support mural inclus",
        "Taille: 20x20 cm",
        "Livraison express",
        "Configuration + support personnalisé",
      ],
      image: "premium",
      popular: false,
    },
    {
      id: 3,
      name: "Pack Multi-Plaques",
      description: "Idéal pour les entreprises avec plusieurs emplacements",
      price: "79€",
      features: [
        "3 plaques standard",
        "QR Code identique pour toutes",
        "Adhésifs inclus",
        "Taille: 15x15 cm chacune",
        "Livraison gratuite",
        "Configuration pour toutes",
      ],
      image: "pack",
      popular: false,
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
                className="text-purple-600 hover:text-gray-900 transition-colors"
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
                  className="text-purple-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
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
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
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

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Nos{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              produits
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme de plaques QR Code conçues pour maximiser la
            collecte d'avis Google de votre entreprise
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border-2 p-8 hover:transform hover:scale-105 transition-all duration-300 ${
                product.popular
                  ? "border-purple-500 shadow-xl"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}

              {/* Product Image */}
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center relative overflow-hidden">
                  {/* QR Code Pattern */}
                  <div className="grid grid-cols-8 gap-1 p-4">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${
                          Math.random() > 0.5 ? "bg-gray-800" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Corner Markers */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-3 border-gray-800 rounded-lg"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-3 border-gray-800 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-3 border-gray-800 rounded-lg"></div>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {product.price}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/checkout"
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 inline-block text-center ${
                  product.popular
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Commander maintenant
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Comparaison des produits
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Caractéristiques
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Standard
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Premium
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Pack Multi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Prix</td>
                  <td className="py-4 px-4 text-center font-semibold text-purple-600">
                    29€
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-purple-600">
                    49€
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-purple-600">
                    79€
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Matériau</td>
                  <td className="py-4 px-4 text-center text-gray-700">PVC</td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    Aluminium
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">PVC</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Taille</td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    15x15 cm
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    20x20 cm
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    15x15 cm (x3)
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Livraison</td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    Gratuite
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    Express
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    Gratuite
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Support</td>
                  <td className="py-4 px-4 text-center text-gray-700">Email</td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    Prioritaire
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quelle est la différence entre les modèles ?
                </h3>
                <svg
                  className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-gray-600 leading-relaxed">
                  Le modèle Standard est parfait pour la plupart des entreprises
                  avec un excellent rapport qualité-prix. Le Premium offre un
                  design plus luxueux en aluminium avec un support mural. Le
                  Pack Multi est idéal si vous avez plusieurs emplacements à
                  couvrir.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Puis-je personnaliser le design ?
                </h3>
                <svg
                  className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-gray-600 leading-relaxed">
                  Actuellement, nous proposons nos designs standards qui ont
                  fait leurs preuves. Si vous avez des besoins spécifiques,
                  contactez-nous pour discuter d'une personnalisation sur
                  mesure.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Y a-t-il des frais de livraison ?
                </h3>
                <svg
                  className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-gray-600 leading-relaxed">
                  La livraison est gratuite pour les modèles Standard et Pack
                  Multi. Le modèle Premium inclut une livraison express gratuite
                  pour une réception plus rapide.
                </p>
              </div>
            </details>
          </div>
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
