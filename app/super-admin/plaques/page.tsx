"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Plaque {
  id: string;
  codeId: string;
  isActivated: boolean;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
  shippingInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    status: string;
    trackingNumber?: string;
    shippedAt?: string;
    deliveredAt?: string;
  };
  link?: {
    googleReviewUrl: string;
    updatedAt: string;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface PlaquesData {
  plaques: Plaque[];
  pagination: Pagination;
}

export default function SuperAdminPlaques() {
  const [data, setData] = useState<PlaquesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlaque, setSelectedPlaque] = useState<Plaque | null>(null);

  useEffect(() => {
    fetchPlaques();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchPlaques = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
      });
      const response = await fetch(`/api/super-admin/plaques?${params}`);
      if (response.ok) {
        const plaquesData = await response.json();
        setData(plaquesData);
      } else {
        setError("Erreur lors du chargement des plaques");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des plaques");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPlaques();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PROCESSING":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/super-admin/dashboard" className="mr-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestion des Plaques
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/super-admin/dashboard"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/super-admin/coderq"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Code QR
              </Link>
              <Link
                href="/super-admin/users"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Utilisateurs
              </Link>
              <Link
                href="/super-admin/plaques"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Plaques
              </Link>
              <Link
                href="/super-admin/shipping"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Livraisons
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-4 md:items-center">
          <form onSubmit={handleSearch} className="flex flex-1 gap-4">
            <input
              type="text"
              placeholder="Rechercher par code ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
            >
              Rechercher
            </button>
          </form>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setStatusFilter("")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === ""
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setStatusFilter("activated")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === "activated"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Activées
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === "pending"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              En attente
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Plaques List */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Plaques ({data?.pagination.total || 0})
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
            </div>
          ) : data?.plaques.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Aucune plaque trouvée</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {data?.plaques.map((plaque) => (
                <div
                  key={plaque.id}
                  className="p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <span className="text-purple-600 text-xl">🏷️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {plaque.codeId}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Créée le{" "}
                            {new Date(plaque.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Utilisateur : {plaque.user?.email || "-"}
                          </p>
                        </div>
                      </div>

                      {/* Shipping Info */}
                      {plaque.shippingInfo && (
                        <div className="mt-4 ml-16">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Livraison :
                          </h4>
                          <div className="flex items-center space-x-2 text-xs">
                            <span>
                              {plaque.shippingInfo.firstName}{" "}
                              {plaque.shippingInfo.lastName}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                plaque.shippingInfo.status
                              )}`}
                            >
                              {plaque.shippingInfo.status}
                            </span>
                            {plaque.shippingInfo.trackingNumber && (
                              <span className="text-gray-500">
                                • Suivi : {plaque.shippingInfo.trackingNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Google Review Link */}
                      {plaque.link && (
                        <div className="mt-4 ml-16">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Lien Google Review :
                          </h4>
                          <a
                            href={plaque.link.googleReviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 break-all transition-colors duration-200 text-xs"
                          >
                            {plaque.link.googleReviewUrl}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setSelectedPlaque(
                            selectedPlaque?.id === plaque.id ? null : plaque
                          )
                        }
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                      >
                        {selectedPlaque?.id === plaque.id
                          ? "Masquer"
                          : "Détails"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedPlaque?.id === plaque.id && (
                    <div className="mt-4 ml-16 bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Informations détaillées
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">ID:</span> {plaque.id}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Code:</span>{" "}
                            {plaque.codeId}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">
                              Date de création:
                            </span>{" "}
                            {new Date(plaque.createdAt).toLocaleString()}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Utilisateur:</span>{" "}
                            {plaque.user?.email || "-"}
                          </p>
                        </div>
                        <div>
                          {plaque.shippingInfo && (
                            <>
                              <p className="text-gray-600">
                                <span className="font-medium">Livraison:</span>{" "}
                                {plaque.shippingInfo.firstName}{" "}
                                {plaque.shippingInfo.lastName} (
                                {plaque.shippingInfo.status})
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Adresse:</span>{" "}
                                {plaque.shippingInfo.address},{" "}
                                {plaque.shippingInfo.city}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Contact:</span>{" "}
                                {plaque.shippingInfo.email} •{" "}
                                {plaque.shippingInfo.phone}
                              </p>
                              {plaque.shippingInfo.trackingNumber && (
                                <p className="text-gray-600">
                                  <span className="font-medium">
                                    Numéro de suivi:
                                  </span>{" "}
                                  {plaque.shippingInfo.trackingNumber}
                                </p>
                              )}
                            </>
                          )}
                          {plaque.link && (
                            <p className="text-gray-600">
                              <span className="font-medium">
                                Lien Google Review:
                              </span>{" "}
                              {plaque.link.googleReviewUrl}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {data.pagination.page} sur {data.pagination.pages} (
                  {data.pagination.total} plaques)
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Précédent
                  </button>
                  <span className="px-3 py-2 text-sm font-medium text-gray-900">
                    {currentPage}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.pagination.pages}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
