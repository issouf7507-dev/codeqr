"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-purple-600 hover:text-gray-900 transition-colors"
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
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  À propos
                </Link>
                <Link
                  href="/contact"
                  className="text-purple-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Buttons u? */}
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
              Contactez{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              nous
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes là pour vous aider à maximiser vos avis Google avec nos
            plaques QR Code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Envoyez-nous un message
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✅ Votre message a été envoyé avec succès ! Nous vous répondrons
                dans les plus brefs délais.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ❌ Une erreur s'est produite. Veuillez réessayer ou nous
                contacter directement.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="commande">Question sur une commande</option>
                  <option value="produit">Information sur nos produits</option>
                  <option value="support">Support technique</option>
                  <option value="partenariat">Partenariat commercial</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@codeqr.fr</p>
                    <p className="text-gray-600">support@codeqr.fr</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                    <p className="text-sm text-gray-500">Lun-Ven: 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">
                      CodeQR
                      <br />
                      123 Rue de l'Innovation
                      <br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ⚡ Temps de réponse
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Email : <strong>24h maximum</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Téléphone : <strong>Immédiat</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Support technique : <strong>2h maximum</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h3>
              <div className="space-y-3">
                <Link
                  href="/produits"
                  className="block text-purple-600 hover:text-purple-700 transition-colors"
                >
                  → Comment fonctionnent nos plaques QR Code ?
                </Link>
                <Link
                  href="/produits"
                  className="block text-purple-600 hover:text-purple-700 transition-colors"
                >
                  → Quels sont les délais de livraison ?
                </Link>
                <Link
                  href="/produits"
                  className="block text-purple-600 hover:text-purple-700 transition-colors"
                >
                  → Comment configurer mon lien Google Reviews ?
                </Link>
                <Link
                  href="/produits"
                  className="block text-purple-600 hover:text-purple-700 transition-colors"
                >
                  → Puis-je personnaliser le design ?
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Notre localisation
          </h2>
          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-600">Carte interactive à venir</p>
              <p className="text-sm text-gray-500">
                123 Rue de l'Innovation, 75001 Paris
              </p>
            </div>
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
