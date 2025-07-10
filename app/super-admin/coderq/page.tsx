"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface QRCode {
  id: string;
  code: string;
  month: number;
  year: number;
  imageUrl: string;
  createdAt: string;
  isActivated: boolean;
}

interface QRCodeData {
  qrCodes: QRCode[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: {
    totalCodes: number;
    byMonth: Array<{
      month: number;
      year: number;
      _count: {
        id: number;
      };
    }>;
  };
}

type TabType = "all" | "active" | "inactive";

export default function SuperAdminCodeQR() {
  const [data, setData] = useState<QRCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedQRCode, setSelectedQRCode] = useState<QRCode | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  // Modal states
  const [month, setMonth] = useState("");
  const [count, setCount] = useState(1);
  const [generated, setGenerated] = useState<QRCode[]>([]);
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");

  useEffect(() => {
    fetchQRCodes();
  }, [currentPage, searchTerm]);

  const fetchQRCodes = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchTerm,
      });

      const response = await fetch(`/api/super-admin/coderq?${params}`);
      if (response.ok) {
        const qrData = await response.json();
        setData(qrData);
      } else {
        setError("Erreur lors du chargement des codes QR");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des codes QR");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenLoading(true);
    setGenError("");
    setGenerated([]);

    try {
      const currentYear = new Date().getFullYear();
      const res = await fetch("/api/super-admin/coderq/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: Number(month),
          year: currentYear,
          count: Number(count),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setGenerated(data.codes);
        // Refresh the main list
        fetchQRCodes();
      } else {
        setGenError(data.error || "Erreur lors de la génération");
      }
    } catch (err) {
      setGenError("Erreur lors de la génération");
    } finally {
      setGenLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchQRCodes();
  };

  const handleRowClick = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode);
    setShowQRModal(true);
  };

  const handleDownloadQR = (e: React.MouseEvent, qrCode: QRCode) => {
    e.stopPropagation(); // Empêche l'ouverture du modal
    if (qrCode.imageUrl) {
      const link = document.createElement("a");
      link.href = qrCode.imageUrl;
      link.download = `qr-${qrCode.code}.png`;
      link.click();
    }
  };

  // Filter QR codes based on active tab
  const getFilteredQRCodes = () => {
    if (!data) return [];

    switch (activeTab) {
      case "active":
        return data.qrCodes.filter((qr) => qr.isActivated);
      case "inactive":
        return data.qrCodes.filter((qr) => !qr.isActivated);
      default:
        return data.qrCodes;
    }
  };

  // Get counts for each tab
  const getTabCounts = () => {
    if (!data) return { all: 0, active: 0, inactive: 0 };

    const active = data.qrCodes.filter((qr) => qr.isActivated).length;
    const inactive = data.qrCodes.filter((qr) => !qr.isActivated).length;

    return {
      all: data.qrCodes.length,
      active,
      inactive,
    };
  };

  const tabCounts = getTabCounts();
  const filteredQRCodes = getFilteredQRCodes();

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">📱</span>
              </div>
              <h1 className="ml-4 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Gestion des Codes QR
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
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-600"
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
        {/* Stats Cards */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Codes QR
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {data.stats.totalCodes}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <span className="text-2xl">📱</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Codes Actifs
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {tabCounts.active}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Codes Inactifs
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {tabCounts.inactive}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions & Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </form>

            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-200 flex items-center gap-2"
            >
              <span>➕</span>
              Générer des codes QR
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "all"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Tous les codes
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.all}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "active"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Codes actifs
                <span className="ml-2 bg-green-100 text-green-800 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.active}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("inactive")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "inactive"
                    ? "border-yellow-500 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Codes inactifs
                <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.inactive}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* QR Codes List */}
        {data && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {activeTab === "all" && "Tous les codes QR"}
                {activeTab === "active" && "Codes QR actifs"}
                {activeTab === "inactive" && "Codes QR inactifs"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredQRCodes.length} code
                {filteredQRCodes.length !== 1 ? "s" : ""} trouvé
                {filteredQRCodes.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredQRCodes.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">
                  {activeTab === "all" && "📱"}
                  {activeTab === "active" && "✅"}
                  {activeTab === "inactive" && "⏳"}
                </div>
                <p className="text-gray-500 text-lg">
                  {activeTab === "all" && "Aucun code QR trouvé"}
                  {activeTab === "active" && "Aucun code QR actif"}
                  {activeTab === "inactive" && "Aucun code QR inactif"}
                </p>
                <p className="text-gray-400 mt-2">
                  {activeTab === "all" &&
                    "Commencez par générer vos premiers codes QR"}
                  {activeTab === "active" &&
                    "Aucun code n'a été activé pour le moment"}
                  {activeTab === "inactive" &&
                    "Tous les codes sont actuellement actifs"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Période
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        État
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QR Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Créé le
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQRCodes.map((qrCode) => (
                      <tr
                        key={qrCode.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        onClick={() => handleRowClick(qrCode)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-mono text-sm font-medium text-gray-900">
                              {qrCode.code}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {String(qrCode.month).padStart(2, "0")}/{qrCode.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              qrCode.isActivated
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {qrCode.isActivated ? "✅ Activé" : "⏳ Inactif"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {qrCode.imageUrl && (
                            <img
                              src={qrCode.imageUrl}
                              alt={qrCode.code}
                              className="w-12 h-12 border border-gray-200 rounded"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(qrCode.createdAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={(e) => handleDownloadQR(e, qrCode)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            📥 Télécharger
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Affichage de {(currentPage - 1) * data.pagination.limit + 1}{" "}
                    à{" "}
                    {Math.min(
                      currentPage * data.pagination.limit,
                      data.pagination.total
                    )}{" "}
                    sur {data.pagination.total} résultats
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Précédent
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} sur {data.pagination.pages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(data.pagination.pages, prev + 1)
                        )
                      }
                      disabled={currentPage === data.pagination.pages}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal for QR Code Generation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Générer des codes QR
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setGenerated([]);
                    setGenError("");
                    setMonth("");
                    setCount(1);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleGenerateQR} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mois
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner un mois</option>
                    <option value="1">Janvier</option>
                    <option value="2">Février</option>
                    <option value="3">Mars</option>
                    <option value="4">Avril</option>
                    <option value="5">Mai</option>
                    <option value="6">Juin</option>
                    <option value="7">Juillet</option>
                    <option value="8">Août</option>
                    <option value="9">Septembre</option>
                    <option value="10">Octobre</option>
                    <option value="11">Novembre</option>
                    <option value="12">Décembre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                    {new Date().getFullYear()} (année courante)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de codes
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={genLoading}
                >
                  {genLoading ? "Génération..." : "Générer"}
                </button>

                {genError && (
                  <div className="text-red-500 text-sm mt-2">{genError}</div>
                )}
              </form>

              {generated.length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Codes générés avec succès ({generated.length})
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {generated.map((qr) => (
                      <div
                        key={qr.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-sm font-medium">
                            {qr.code}
                          </span>
                          {qr.imageUrl && (
                            <img
                              src={qr.imageUrl}
                              alt={qr.code}
                              className="w-8 h-8 border border-gray-200 rounded"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for QR Code Display */}
      {showQRModal && selectedQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Code QR - {selectedQRCode.code}
                </h2>
                <button
                  onClick={() => {
                    setShowQRModal(false);
                    setSelectedQRCode(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="text-center">
                {/* QR Code Image */}
                {selectedQRCode.imageUrl && (
                  <div className="mb-6">
                    <img
                      src={selectedQRCode.imageUrl}
                      alt={selectedQRCode.code}
                      className="mx-auto w-64 h-64 border-4 border-gray-200 rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* QR Code Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Code</p>
                      <p className="text-lg font-mono font-bold text-gray-900">
                        {selectedQRCode.code}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Période
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {String(selectedQRCode.month).padStart(2, "0")}/
                        {selectedQRCode.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">État</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedQRCode.isActivated
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedQRCode.isActivated
                          ? "✅ Activé"
                          : "⏳ Inactif"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Créé le
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {new Date(selectedQRCode.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      if (selectedQRCode.imageUrl) {
                        const link = document.createElement("a");
                        link.href = selectedQRCode.imageUrl;
                        link.download = `qr-${selectedQRCode.code}.png`;
                        link.click();
                      }
                    }}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>📥</span>
                    Télécharger le QR Code
                  </button>
                  <button
                    onClick={() => {
                      setShowQRModal(false);
                      setSelectedQRCode(null);
                    }}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                  >
                    Fermer
                  </button>
                </div>

                {/* Scan Instructions */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">💡 Conseil :</span> Utilisez
                    l'application caméra de votre téléphone ou une application
                    de scan QR pour scanner ce code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
