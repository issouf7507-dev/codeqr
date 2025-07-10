"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Plaque {
  id: string;
  codeId: string;
  isActivated: boolean;
  createdAt: string;
  qrCodeUrl?: string;
  link?: {
    googleReviewUrl: string;
    updatedAt: string;
  };
}

interface User {
  id: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("codeqr");
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);

  // États pour le changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Rediriger vers login si non connecté
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess("");

    // Validation du nouveau mot de passe
    if (newPassword.length < 8) {
      setPasswordError(
        "Le nouveau mot de passe doit contenir au moins 8 caractères"
      );
      setIsPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas");
      setIsPasswordLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess("Votre mot de passe a été modifié avec succès !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(
          data.error || "Erreur lors du changement de mot de passe"
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      setPasswordError("Erreur lors du changement de mot de passe");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
  //       {/* Animated Background */}
  //       <div className="absolute inset-0 overflow-hidden">
  //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
  //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
  //         <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
  //       </div>

  //       <div className="relative">
  //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
  //       </div>
  //     </div>
  //   );
  // }

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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CodeQR Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bonjour, {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Code QR
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {/* {plaques.length} */}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Code QR Actifs
                </p>
                <p className="text-2xl font-semibold text-gray-900"></p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Code QR En Attente
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {/* {plaques.filter((p) => !p.isActivated).length} */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Purchase Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Acheter un nouveau Code QR
              </h3>
              <p className="text-gray-600">
                Commandez directement depuis votre dashboard - 29€
              </p>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
              Acheter maintenant
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("plaques")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "plaques"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                Mes Plaques
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "settings"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                Paramètres
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "codeqr" && <div></div>}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Informations du compte
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Email:</span>{" "}
                      {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">
                        Membre depuis:
                      </span>{" "}
                      {user ? new Date().toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Changer le mot de passe
                  </h3>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    {passwordError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-red-700 text-sm">{passwordError}</p>
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-green-700 text-sm">
                          {passwordSuccess}
                        </p>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Votre mot de passe actuel"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Votre nouveau mot de passe"
                        required
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Minimum 8 caractères
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Confirmez votre nouveau mot de passe"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPasswordLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isPasswordLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Modification en cours...
                        </div>
                      ) : (
                        "Modifier le mot de passe"
                      )}
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3 flex gap-4">
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
