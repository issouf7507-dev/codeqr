"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import {
  QrCode,
  Shield,
  Users,
  Search,
  Download,
  Plus,
  X,
  Calendar,
  Hash,
  TrendingUp,
  Activity,
  LogOut,
  FileSpreadsheet,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface QRCode {
  id: string;
  code: string;
  month: number;
  year: number;
  imageUrl: string;
  createdAt: string;
  isActivated: boolean;
  order: Order;
  user: User;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "PAID" | "PENDING" | "FAILED" | "CANCELLED"; // Adapter selon ton système
  totalAmount: number;
  currency: string;
  email: string;
  mollieId: string;
  shippingInfoId: string;
  items: QRCodeOrderItem[];
  userId: string | null;
}

export interface QRCodeOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

interface QRCodeData {
  qrCodes: QRCode[];
  orders: Order[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: {
    totalCodes: number;
    activeCodes: number;
    inactiveCodes: number;
    achetedCodes: number;
    byMonth: Array<{
      month: number;
      year: number;
      _count: {
        id: number;
      };
    }>;
  };
}

type TabType = "all" | "active" | "inactive" | "acheted";

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
  const { user, loading } = useAuth();
  // Modal states
  const [month, setMonth] = useState("");
  const [count, setCount] = useState(1);
  const [generated, setGenerated] = useState<QRCode[]>([]);
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [activationLoading, setActivationLoading] = useState(false);
  const [activationError, setActivationError] = useState("");
  const [showEditLinkModal, setShowEditLinkModal] = useState(false);
  const [editGoogleReviewUrl, setEditGoogleReviewUrl] = useState("");
  const [editLinkLoading, setEditLinkLoading] = useState(false);
  const [editLinkError, setEditLinkError] = useState("");

  useEffect(() => {
    fetchQRCodes();
  }, [currentPage, searchTerm, activeTab]);

  const fetchQRCodes = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchTerm,
        status: activeTab, // Ajouter le filtre de statut
      });

      const response = await fetch(`/api/super-admin/coderq?${params}`);
      if (response.ok) {
        const qrData = await response.json();
        // console.log("qrData", qrData);
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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset à la première page lors du changement de tab
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

  const handleExportExcel = async () => {
    if (!data || data.qrCodes.length === 0) {
      alert("Aucun code QR à exporter");
      return;
    }

    setExportLoading(true);
    try {
      // Récupérer tous les codes QR (pas seulement ceux de la page actuelle)
      const response = await fetch(
        `/api/super-admin/coderq?limit=1000&search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const allData = await response.json();
      let codesToExport = allData.qrCodes;

      // Filtrer selon l'onglet actif
      switch (activeTab) {
        case "active":
          codesToExport = codesToExport.filter((qr: QRCode) => qr.isActivated);
          break;
        case "inactive":
          codesToExport = codesToExport.filter((qr: QRCode) => !qr.isActivated);
          break;
        default:
          // Tous les codes
          break;
      }

      if (codesToExport.length === 0) {
        alert("Aucun code QR à exporter pour cette sélection");
        return;
      }

      // Préparer les données pour l'export
      const exportData = codesToExport.map((qrCode: QRCode) => ({
        Code: qrCode.code,
        Période: `${String(qrCode.month).padStart(2, "0")}/${qrCode.year}`,
        État: qrCode.isActivated ? "Activé" : "Inactif",
        "Fichier QR Code": qrCode.imageUrl
          ? `qr-${qrCode.code}.png`
          : "Non disponible",
        "Créé le": new Date(qrCode.createdAt).toLocaleDateString("fr-FR"),
      }));

      // Créer le workbook et worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Ajuster la largeur des colonnes
      const columnWidths = [
        { wch: 15 }, // Code
        { wch: 10 }, // Période
        { wch: 10 }, // État
        { wch: 25 }, // Fichier QR Code
        { wch: 15 }, // Créé le
      ];
      worksheet["!cols"] = columnWidths;

      // Ajouter le worksheet au workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Codes QR");

      // Générer le nom du fichier avec la date et le filtre
      const dateStr = new Date().toISOString().split("T")[0];
      const filterStr =
        activeTab === "all"
          ? "tous"
          : activeTab === "active"
          ? "actifs"
          : "inactifs";
      const fileName = `codes-qr-${filterStr}-${dateStr}.xlsx`;

      XLSX.writeFile(workbook, fileName);

      // Télécharger les images QR Code séparément
      const qrCodesWithImages = codesToExport.filter(
        (qr: QRCode) => qr.imageUrl
      );
      if (qrCodesWithImages.length > 0) {
        alert(
          `Export Excel terminé ! ${qrCodesWithImages.length} image(s) QR Code à télécharger.`
        );

        // Créer un ZIP avec toutes les images QR Code
        const zip = new JSZip();

        for (const qrCode of qrCodesWithImages) {
          if (qrCode.imageUrl && qrCode.imageUrl.startsWith("data:image")) {
            // Extraire les données base64
            const base64Data = qrCode.imageUrl.split(",")[1];
            const fileName = `qr-${qrCode.code}.png`;
            zip.file(fileName, base64Data, { base64: true });
          }
        }

        // Télécharger le ZIP
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement("a");
        link.href = zipUrl;
        link.download = `qr-codes-images-${filterStr}-${dateStr}.zip`;
        link.click();
        URL.revokeObjectURL(zipUrl);
      }
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      alert("Erreur lors de l'export Excel");
    } finally {
      setExportLoading(false);
    }
  };

  // Les données sont déjà filtrées par l'API, pas besoin de filtrer côté client
  const filteredQRCodes = data?.qrCodes || [];
  // console.log(
  //   "acheted",
  //   data?.orders?.filter((order) => order?.status === "PAID")
  // );

  // Pour les comptes des tabs, on utilise les stats globales
  const getTabCounts = () => {
    if (!data) return { all: 0, active: 0, inactive: 0, acheted: 0 };

    console.log("datasss", data);

    // Utiliser les stats globales de l'API
    if (data.stats) {
      return {
        all: data.stats.totalCodes || 0,
        active: data.stats.activeCodes || 0,
        inactive: data.stats.inactiveCodes || 0,
        acheted: data.stats.achetedCodes || 0,
      };
    }

    // Fallback: calculer basé sur les données actuelles
    const active = data.qrCodes.filter((qr) => qr.isActivated).length;
    const inactive = data.qrCodes.filter((qr) => !qr.isActivated).length;
    const acheted = data?.orders?.filter(
      (order) => order?.status === "PAID"
    ).length;

    return {
      all: data.qrCodes.length,
      active,
      inactive,
      acheted,
    };
  };

  const handleLogout = async () => {
    await fetch("/api/super-admin/auth/logout", {
      method: "POST",
    });
    window.location.href = "/super-admin/login";
  };

  const handleManualActivation = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode);
    setShowActivationModal(true);
    setGoogleReviewUrl("");
    setActivationError("");
  };

  const handleActivateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQRCode || !googleReviewUrl) return;

    setActivationLoading(true);
    setActivationError("");

    try {
      const response = await fetch(
        `/api/qr/${selectedQRCode.code}/activatemanuel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleReviewUrl: googleReviewUrl,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Succès - fermer le modal et rafraîchir la liste
        setShowActivationModal(false);
        setSelectedQRCode(null);
        setGoogleReviewUrl("");
        fetchQRCodes(); // Rafraîchir la liste
        alert("Code QR activé avec succès !");
      } else {
        setActivationError(data.error || "Erreur lors de l'activation");
      }
    } catch (error) {
      console.error("Erreur lors de l'activation:", error);
      setActivationError("Erreur lors de l'activation du code QR");
    } finally {
      setActivationLoading(false);
    }
  };

  const handleEditLink = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode);
    setShowEditLinkModal(true);
    setEditGoogleReviewUrl("");
    setEditLinkError("");
  };

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQRCode || !editGoogleReviewUrl) return;

    setEditLinkLoading(true);
    setEditLinkError("");

    try {
      const response = await fetch(
        `/api/qr/${selectedQRCode.code}/update-link`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleReviewUrl: editGoogleReviewUrl,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Succès - fermer le modal et rafraîchir la liste
        setShowEditLinkModal(false);
        setSelectedQRCode(null);
        setEditGoogleReviewUrl("");
        fetchQRCodes(); // Rafraîchir la liste
        alert("Lien Google mis à jour avec succès !");
      } else {
        setEditLinkError(data.error || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setEditLinkError("Erreur lors de la mise à jour du lien");
    } finally {
      setEditLinkLoading(false);
    }
  };

  const tabCounts = getTabCounts();

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#019090] mx-auto mb-4" />
          <p className="text-black/70">Chargement des codes QR...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-4">Erreur</h2>
          <p className="text-black/70">{error}</p>
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
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-4 text-3xl font-bold text-black">
                Gestion des Codes QR
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
                className="bg-[#019090] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Code QR
              </Link>
              <Link
                href="/super-admin/users"
                className="text-black/70 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
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
            Gestion des Codes QR
          </h2>
          <p className="text-black/70">
            Visualisez, gérez et exportez tous vos codes QR générés
          </p>
        </motion.div>

        {/* Stats Cards */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#019090]/10 rounded-xl flex items-center justify-center text-[#019090]">
                  <QrCode className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70 mb-1">
                  Total Codes QR
                </p>
                <p className="text-3xl font-bold text-black mb-2">
                  {data.stats.totalCodes}
                </p>
                <p className="text-sm text-[#019090]">Codes générés</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70 mb-1">
                  Codes Actifs
                </p>
                <p className="text-3xl font-bold text-black mb-2">
                  {data.stats.activeCodes}
                </p>
                <p className="text-sm text-green-600">
                  Activés par les clients
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                  <Activity className="w-6 h-6" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70 mb-1">
                  Codes Inactifs
                </p>
                <p className="text-3xl font-bold text-black mb-2">
                  {data.stats.inactiveCodes}
                </p>
                <p className="text-sm text-yellow-600">
                  En attente d'activation
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Actions & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </form>

            <div className="flex gap-3">
              <motion.button
                onClick={handleExportExcel}
                disabled={exportLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="w-4 h-4" />
                )}
                {exportLoading ? "Export en cours..." : "Exporter Excel"}
              </motion.button>
              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#019090] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#019090]/90 transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Générer des codes
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-200 mb-6"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => handleTabChange("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "all"
                    ? "border-[#019090] text-[#019090]"
                    : "border-transparent text-black/60 hover:text-black hover:border-gray-300"
                }`}
              >
                Tous les codes
                <span className="ml-2 bg-gray-100 text-black py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.all}
                </span>
              </button>
              <button
                onClick={() => handleTabChange("active")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "active"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-black/60 hover:text-black hover:border-gray-300"
                }`}
              >
                Codes actifs
                <span className="ml-2 bg-green-100 text-green-800 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.active}
                </span>
              </button>
              <button
                onClick={() => handleTabChange("inactive")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "inactive"
                    ? "border-yellow-500 text-yellow-600"
                    : "border-transparent text-black/60 hover:text-black hover:border-gray-300"
                }`}
              >
                Codes inactifs
                <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.inactive}
                </span>
              </button>

              <button
                onClick={() => handleTabChange("acheted")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === "acheted"
                    ? "border-yellow-500 text-yellow-600"
                    : "border-transparent text-black/60 hover:text-black hover:border-gray-300"
                }`}
              >
                Codes Achetés{" "}
                <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {tabCounts.acheted}
                </span>
              </button>
            </nav>
          </div>
        </motion.div>

        {/* QR Codes List */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#019090]/10 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-[#019090]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">
                    {activeTab === "all" && "Tous les codes QR"}
                    {activeTab === "active" && "Codes QR actifs"}
                    {activeTab === "inactive" && "Codes QR inactifs"}
                    {activeTab === "acheted" && "Codes QR achetés"}
                  </h2>
                  <p className="text-sm text-black/60 mt-1">
                    {filteredQRCodes.length} code
                    {filteredQRCodes.length !== 1 ? "s" : ""} trouvé
                    {filteredQRCodes.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            {filteredQRCodes.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  {activeTab === "all" && (
                    <QrCode className="w-10 h-10 text-gray-400" />
                  )}
                  {activeTab === "active" && (
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  )}
                  {activeTab === "inactive" && (
                    <Activity className="w-10 h-10 text-yellow-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {activeTab === "all" && "Aucun code QR trouvé"}
                  {activeTab === "active" && "Aucun code QR actif"}
                  {activeTab === "inactive" && "Aucun code QR inactif"}
                  {activeTab === "acheted" && "Aucun code QR acheté"}
                </h3>
                <p className="text-black/60 mb-6">
                  {activeTab === "all" &&
                    "Commencez par générer vos premiers codes QR"}
                  {activeTab === "active" &&
                    "Aucun code n'a été activé pour le moment"}
                  {activeTab === "inactive" &&
                    "Tous les codes sont actuellement actifs"}
                  {activeTab === "acheted" &&
                    "Aucun code n'a été acheté pour le moment"}
                </p>
                {activeTab === "all" && (
                  <motion.button
                    onClick={() => setShowModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#019090] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#019090]/90 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Générer des codes QR
                  </motion.button>
                )}
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
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              qrCode.isActivated
                                ? "bg-[#019090]/10 text-[#019090] border border-[#019090]/20"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            }`}
                          >
                            {qrCode.isActivated ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Activé
                              </>
                            ) : (
                              <>
                                <Activity className="w-3 h-3 mr-1" />
                                Inactif
                              </>
                            )}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={(e) => handleDownloadQR(e, qrCode)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1 text-[#019090] hover:text-[#019090]/80 font-medium transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Télécharger
                            </motion.button>
                            <motion.button
                              onClick={() => handleRowClick(qrCode)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              Voir
                            </motion.button>
                            {!qrCode.isActivated && (
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleManualActivation(qrCode);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Activer
                              </motion.button>
                            )}
                            {qrCode.isActivated && (
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditLink(qrCode);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                              >
                                <Hash className="w-4 h-4" />
                                Modifier le lien
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-black/70">
                    Affichage de {(currentPage - 1) * data.pagination.limit + 1}{" "}
                    à{" "}
                    {Math.min(
                      currentPage * data.pagination.limit,
                      data.pagination.total
                    )}{" "}
                    sur {data.pagination.total} résultats
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                      whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                      className="px-4 py-2 text-sm bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Précédent
                    </motion.button>
                    <span className="text-sm text-black/70 px-3">
                      Page {currentPage} sur {data.pagination.pages}
                    </span>
                    <motion.button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(data.pagination.pages, prev + 1)
                        )
                      }
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
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
                          <span className="font-mono text-sm font-medium text-black">
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
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Commande
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.order?.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Utilisateur
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.user?.email}
                      </p>

                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.user?.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Commande
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.order?.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Email client
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.order?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Product ID
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.order?.items[0].productId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Prix</p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedQRCode.order?.items[0].price} €
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

      {/* Modal for Manual QR Code Activation */}
      {showActivationModal && selectedQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Activer manuellement le code QR
                </h2>
                <button
                  onClick={() => {
                    setShowActivationModal(false);
                    setSelectedQRCode(null);
                    setGoogleReviewUrl("");
                    setActivationError("");
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Code QR :</strong> {selectedQRCode.code}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Période :</strong>{" "}
                  {String(selectedQRCode.month).padStart(2, "0")}/
                  {selectedQRCode.year}
                </p>
              </div>

              <form onSubmit={handleActivateQR} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Google Review *
                  </label>
                  <input
                    type="url"
                    value={googleReviewUrl}
                    onChange={(e) => setGoogleReviewUrl(e.target.value)}
                    placeholder="https://g.page/r/... ou https://maps.app.goo.gl/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Entrez l'URL de votre page Google Maps pour les avis
                  </p>
                </div>

                {activationError && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {activationError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowActivationModal(false);
                      setSelectedQRCode(null);
                      setGoogleReviewUrl("");
                      setActivationError("");
                    }}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={activationLoading || !googleReviewUrl}
                    className="flex-1 bg-[#019090] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#019090]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {activationLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Activation...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Activer le code QR
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing QR Code Link */}
      {showEditLinkModal && selectedQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Modifier le lien Google
                </h2>
                <button
                  onClick={() => {
                    setShowEditLinkModal(false);
                    setSelectedQRCode(null);
                    setEditGoogleReviewUrl("");
                    setEditLinkError("");
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Code QR :</strong> {selectedQRCode.code}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Période :</strong>{" "}
                  {String(selectedQRCode.month).padStart(2, "0")}/
                  {selectedQRCode.year}
                </p>
              </div>

              <form onSubmit={handleUpdateLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouvelle URL Google Review *
                  </label>
                  <input
                    type="url"
                    value={editGoogleReviewUrl}
                    onChange={(e) => setEditGoogleReviewUrl(e.target.value)}
                    placeholder="https://g.page/r/... ou https://maps.app.goo.gl/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Entrez la nouvelle URL de votre page Google Maps pour les
                    avis
                  </p>
                </div>

                {editLinkError && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {editLinkError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditLinkModal(false);
                      setSelectedQRCode(null);
                      setEditGoogleReviewUrl("");
                      setEditLinkError("");
                    }}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={editLinkLoading || !editGoogleReviewUrl}
                    className="flex-1 bg-[#019090] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#019090]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {editLinkLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <Hash className="w-4 h-4" />
                        Modifier le lien
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
