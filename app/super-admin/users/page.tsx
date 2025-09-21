"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Users,
  Shield,
  Search,
  Eye,
  Mail,
  Calendar,
  Hash,
  Link2,
  Package,
  TrendingUp,
  LogOut,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  QrCode,
  Activity,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface User {
  id: string;
  email: string;
  createdAt: string;
  _count: {
    plaques: number;
    links: number;
  };
  plaques: Array<{
    id: string;
    codeId: string;
    isActivated: boolean;
    createdAt: string;
    shippingInfo: {
      firstName: string;
      lastName: string;
      status: string;
    };
  }>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface UsersData {
  users: User[];
  pagination: Pagination;
}

export default function SuperAdminUsers() {
  const [data, setData] = useState<UsersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/super-admin/users?${params}`);
      if (response.ok) {
        const usersData = await response.json();
        setData(usersData);
      } else {
        setError("Erreur lors du chargement des utilisateurs");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des utilisateurs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "PROCESSING":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "DELIVERED":
        return "bg-[#019090]/10 text-[#019090] border-[#019090]/20";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleLogout = async () => {
    await fetch("/api/super-admin/auth/logout", {
      method: "POST",
    });
    window.location.href = "/super-admin/login";
  };

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#019090] mx-auto mb-4" />
          <p className="text-black/70">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#019090] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-4">
            Non authentifié
          </h2>
          <p className="text-black/70 mb-6">
            Veuillez vous connecter pour accéder à cette page
          </p>
          <Link
            href="/super-admin/login"
            className="inline-flex items-center gap-2 bg-[#019090] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#019090]/90 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#019090] rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-4 text-3xl font-bold text-black">
                Gestion des Utilisateurs
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/super-admin/dashboard"
                className="text-black/70 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/super-admin/coderq"
                className="text-black/70 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Code QR
              </Link>
              <Link
                href="/super-admin/users"
                className="bg-[#019090] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Utilisateurs
              </Link>
              <Link
                href="/super-admin/orders"
                className="text-black/70 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Commandes
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-black mb-2">
            Gestion des Utilisateurs
          </h2>
          <p className="text-black/70">
            Visualisez et gérez tous les utilisateurs de votre plateforme
          </p>
        </motion.div>

        {/* Stats Card */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#019090]/10 rounded-xl flex items-center justify-center text-[#019090]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/70">
                    Total Utilisateurs
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {data.pagination.total}
                  </p>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher par email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#019090] text-white rounded-lg font-semibold hover:bg-[#019090]/90 transition-all duration-200 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </motion.button>
          </form>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#019090]/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#019090]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">
                  Liste des Utilisateurs
                </h2>
                <p className="text-sm text-black/60">
                  {data?.pagination.total || 0} utilisateur
                  {(data?.pagination.total || 0) > 1 ? "s" : ""} au total
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#019090] mx-auto mb-4" />
              <p className="text-black/70">Chargement...</p>
            </div>
          ) : data?.users.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-black/60">
                {searchTerm
                  ? "Aucun utilisateur ne correspond à votre recherche"
                  : "Aucun utilisateur inscrit pour le moment"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {data?.users.map((userData, index) => (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#019090]/10 rounded-xl flex items-center justify-center">
                          <Mail className="w-6 h-6 text-[#019090]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black">
                            {userData.email}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4 text-black/60" />
                            <p className="text-sm text-black/60">
                              Membre depuis le{" "}
                              {new Date(userData.createdAt).toLocaleDateString(
                                "fr-FR"
                              )}
                            </p>
                          </div>
                          <div className="flex items-center space-x-6 mt-2">
                            <div className="flex items-center gap-1">
                              <QrCode className="w-4 h-4 text-[#019090]" />
                              <span className="text-sm text-black/70">
                                {userData._count.plaques} plaque
                                {userData._count.plaques > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Link2 className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-black/70">
                                {userData._count.links} lien
                                {userData._count.links > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex items-center space-x-2">
                      <motion.button
                        onClick={() =>
                          setSelectedUser(
                            selectedUser?.id === userData.id ? null : userData
                          )
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#019090] bg-[#019090]/10 rounded-lg hover:bg-[#019090]/20 transition-all duration-200"
                      >
                        {selectedUser?.id === userData.id ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Masquer
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Détails
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedUser?.id === userData.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 bg-gray-50 rounded-xl p-6 overflow-hidden"
                    >
                      <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                        <Hash className="w-4 h-4 text-[#019090]" />
                        Informations détaillées
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Hash className="w-4 h-4 text-black/60" />
                            <div>
                              <p className="text-sm text-black/60">
                                ID Utilisateur
                              </p>
                              <p className="font-mono text-sm text-black">
                                {userData.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-black/60" />
                            <div>
                              <p className="text-sm text-black/60">Email</p>
                              <p className="text-sm text-black">
                                {userData.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-black/60" />
                            <div>
                              <p className="text-sm text-black/60">
                                Date d'inscription
                              </p>
                              <p className="text-sm text-black">
                                {new Date(userData.createdAt).toLocaleString(
                                  "fr-FR"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <QrCode className="w-4 h-4 text-[#019090]" />
                            <div>
                              <p className="text-sm text-black/60">
                                Plaques possédées
                              </p>
                              <p className="text-sm font-semibold text-[#019090]">
                                {userData._count.plaques} plaque
                                {userData._count.plaques > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Link2 className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-sm text-black/60">
                                Liens configurés
                              </p>
                              <p className="text-sm font-semibold text-blue-600">
                                {userData._count.links} lien
                                {userData._count.links > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Plaques Details */}
                      {userData.plaques && userData.plaques.length > 0 && (
                        <div>
                          <h5 className="text-base font-semibold text-black mb-3 flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#019090]" />
                            Plaques ({userData.plaques.length})
                          </h5>
                          <div className="space-y-2">
                            {userData.plaques.map((plaque) => (
                              <div
                                key={plaque.id}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                      plaque.isActivated
                                        ? "bg-[#019090]/10 text-[#019090]"
                                        : "bg-yellow-50 text-yellow-600"
                                    }`}
                                  >
                                    {plaque.isActivated ? (
                                      <QrCode className="w-4 h-4" />
                                    ) : (
                                      <Activity className="w-4 h-4" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-mono text-sm text-black">
                                      {plaque.codeId}
                                    </p>
                                    <p className="text-xs text-black/60">
                                      {new Date(
                                        plaque.createdAt
                                      ).toLocaleDateString("fr-FR")}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                                      plaque.isActivated
                                        ? "bg-[#019090]/10 text-[#019090] border-[#019090]/20"
                                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    }`}
                                  >
                                    {plaque.isActivated ? "Activé" : "Inactif"}
                                  </span>
                                  {plaque.shippingInfo && (
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                        plaque.shippingInfo.status
                                      )}`}
                                    >
                                      {plaque.shippingInfo.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-black/70">
                  Page {data.pagination.page} sur {data.pagination.pages} (
                  {data.pagination.total} utilisateurs)
                </p>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    className="px-4 py-2 text-sm bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Précédent
                  </motion.button>
                  <span className="px-3 py-2 text-sm font-medium text-black">
                    {currentPage}
                  </span>
                  <motion.button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.pagination.pages}
                    whileHover={{
                      scale: currentPage === data.pagination.pages ? 1 : 1.05,
                    }}
                    whileTap={{
                      scale: currentPage === data.pagination.pages ? 1 : 0.95,
                    }}
                    className="px-4 py-2 text-sm bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Suivant
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
