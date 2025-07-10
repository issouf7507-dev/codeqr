"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email");
      setIsLoading(false);
      return;
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Un email de réinitialisation a été envoyé à votre adresse email."
        );
        setEmail("");
      } else {
        setError(
          data.error || "Erreur lors de l'envoi de l'email de réinitialisation"
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de l'envoi de l'email de réinitialisation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CodeQR
              </h1>
            </Link>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Mot de passe oublié ?
            </h2>
            <p className="text-gray-600">
              Entrez votre adresse email pour recevoir un lien de
              réinitialisation
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 text-sm">{message}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="votre@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Envoi en cours...
                </div>
              ) : (
                "Envoyer le lien de réinitialisation"
              )}
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
              >
                ← Retour à la connexion
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link
                href="/register"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
