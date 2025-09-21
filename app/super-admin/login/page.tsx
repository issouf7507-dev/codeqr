"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Shield, User, Lock, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SuperAdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/super-admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // router.push("/super-admin/dashboard");
        window.location.href = "/super-admin/dashboard";
      } else {
        setError(data.error || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#019090]/10 border-2 border-[#019090] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[#019090]" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Super Admin</h1>
            <p className="text-black/70">Accès à l'administration complète</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-[#019090]" />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#019090] focus:border-transparent transition-all duration-200"
                placeholder="Votre nom d'utilisateur"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#019090]" />
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#019090] focus:border-transparent transition-all duration-200"
                placeholder="Votre mot de passe"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#019090] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#019090]/90 focus:outline-none focus:ring-2 focus:ring-[#019090] focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Se connecter
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          {/* <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Nouveau Super Admin ?{" "}
              <Link
                href="/super-admin/register"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Créer un compte
              </Link>
            </p>
          </div> */}
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-black/60">
            <Shield className="w-3 h-3" />
            <span>Accès restreint - Zone d'administration sécurisée</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
