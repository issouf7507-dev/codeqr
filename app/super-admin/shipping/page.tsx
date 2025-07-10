"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ShippingInfo {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  status: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  plaque: {
    id: string;
    codeId: string;
    isActivated: boolean;
    createdAt: string;
    user: {
      email: string;
    };
  };
}

interface StatusStats {
  status: string;
  _count: {
    status: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ShippingData {
  shipping: ShippingInfo[];
  pagination: Pagination;
  stats: StatusStats[];
}

export default function SuperAdminShipping() {
  const [data, setData] = useState<ShippingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingInfo | null>(
    null
  );

  useEffect(() => {
    fetchShipping();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchShipping = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
      });
      const response = await fetch(`/api/super-admin/shipping?${params}`);
      if (response.ok) {
        const shippingData = await response.json();
        setData(shippingData);
      } else {
        setError("Erreur lors du chargement des livraisons");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des livraisons");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchShipping();
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "En attente";
      case "PROCESSING":
        return "En traitement";
      case "SHIPPED":
        return "Expédiée";
      case "DELIVERED":
        return "Livrée";
      case "CANCELLED":
        return "Annulée";
      default:
        return status;
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
                Gestion des Livraisons
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
        {/* Stats Cards */}
        {data && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {data.stats.map((stat) => (
              <div
                key={stat.status}
                className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-4 text-center hover:border-gray-300 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(
                    stat.status
                  )}`}
                >
                  {getStatusLabel(stat.status)}
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat._count.status}
                </p>
                <p className="text-sm text-gray-600">livraisons</p>
              </div>
            ))}
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-4 md:items-center">
          <form onSubmit={handleSearch} className="flex flex-1 gap-4">
            <input
              type="text"
              placeholder="Rechercher par nom, email, adresse..."
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
              onClick={() => setStatusFilter("PENDING")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === "PENDING"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setStatusFilter("PROCESSING")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === "PROCESSING"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              En traitement
            </button>
            <button
              onClick={() => setStatusFilter("SHIPPED")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === "SHIPPED"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Expédiées
            </button>
            <button
              onClick={() => setStatusFilter("DELIVERED")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                statusFilter === "DELIVERED"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Livrées
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Shipping List */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Livraisons ({data?.pagination.total || 0})
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
            </div>
          ) : data?.shipping.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Aucune livraison trouvée</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {data?.shipping.map((shipping) => (
                <div
                  key={shipping.id}
                  className="p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <span className="text-orange-600 text-xl">📦</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {shipping.firstName} {shipping.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {shipping.address}, {shipping.postalCode}{" "}
                            {shipping.city}, {shipping.country}
                          </p>
                          <p className="text-sm text-gray-600">
                            {shipping.email} • {shipping.phone}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">
                              Plaque : {shipping.plaque.codeId}
                            </span>
                            <span className="text-sm text-gray-600">
                              Client : {shipping.plaque.user.email}
                            </span>
                            {shipping.trackingNumber && (
                              <span className="text-sm text-gray-600">
                                Suivi : {shipping.trackingNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <div className="mt-4 ml-16">
                        <div className="flex items-center space-x-4 text-sm">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              shipping.status
                            )}`}
                          >
                            {getStatusLabel(shipping.status)}
                          </span>
                          {shipping.shippedAt && (
                            <span className="text-gray-600">
                              Expédiée le{" "}
                              {new Date(
                                shipping.shippedAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                          {shipping.deliveredAt && (
                            <span className="text-gray-600">
                              Livrée le{" "}
                              {new Date(
                                shipping.deliveredAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setSelectedShipping(
                            selectedShipping?.id === shipping.id
                              ? null
                              : shipping
                          )
                        }
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                      >
                        {selectedShipping?.id === shipping.id
                          ? "Masquer"
                          : "Détails"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedShipping?.id === shipping.id && (
                    <div className="mt-4 ml-16 bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Informations détaillées
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">ID:</span>{" "}
                            {shipping.id}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Nom:</span>{" "}
                            {shipping.firstName} {shipping.lastName}
                          </p>
                          {shipping.company && (
                            <p className="text-gray-600">
                              <span className="font-medium">Entreprise:</span>{" "}
                              {shipping.company}
                            </p>
                          )}
                          <p className="text-gray-600">
                            <span className="font-medium">Email:</span>{" "}
                            {shipping.email}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Téléphone:</span>{" "}
                            {shipping.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">Adresse:</span>{" "}
                            {shipping.address}
                            {shipping.address2 && (
                              <span>, {shipping.address2}</span>
                            )}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Ville:</span>{" "}
                            {shipping.postalCode} {shipping.city},{" "}
                            {shipping.country}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Plaque:</span>{" "}
                            {shipping.plaque.codeId} (
                            {shipping.plaque.isActivated
                              ? "Active"
                              : "En attente"}
                            )
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Client:</span>{" "}
                            {shipping.plaque.user.email}
                          </p>
                          {shipping.trackingNumber && (
                            <p className="text-gray-600">
                              <span className="font-medium">
                                Numéro de suivi:
                              </span>{" "}
                              {shipping.trackingNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">
                              <span className="font-medium">Créée le:</span>{" "}
                              {new Date(shipping.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {shipping.shippedAt && (
                            <div>
                              <p className="text-gray-600">
                                <span className="font-medium">
                                  Expédiée le:
                                </span>{" "}
                                {new Date(shipping.shippedAt).toLocaleString()}
                              </p>
                            </div>
                          )}
                          {shipping.deliveredAt && (
                            <div>
                              <p className="text-gray-600">
                                <span className="font-medium">Livrée le:</span>{" "}
                                {new Date(
                                  shipping.deliveredAt
                                ).toLocaleString()}
                              </p>
                            </div>
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
                  {data.pagination.total} livraisons)
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
