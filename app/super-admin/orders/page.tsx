"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ShoppingCart,
  Shield,
  Search,
  Eye,
  Mail,
  Calendar,
  Hash,
  Package,
  TrendingUp,
  LogOut,
  Loader2,
  AlertCircle,
  ArrowRight,
  QrCode,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  Euro,
  MapPin,
  Phone,
  Building,
  Download,
  ExternalLink,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Order {
  id: string;
  email: string;
  totalAmount: number;
  status: string;
  currency: string;
  createdAt: string;
  mollieId?: string;
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }>;
  qrCodes?: Array<{
    id: string;
    code: string;
    isActivated: boolean;
  }>;
  shippingInfo: {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    status: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { user, loading } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/super-admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError("Erreur lors du chargement des commandes");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des commandes");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-[#019090]/10 text-[#019090] border-[#019090]/20";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      case "FAILED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PAID":
        return "Payé";
      case "PENDING":
        return "En attente";
      case "CANCELLED":
        return "Annulé";
      case "FAILED":
        return "Échoué";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      case "FAILED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getShippingStatusColor = (status: string) => {
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingInfo.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.shippingInfo.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "amount":
        comparison = a.totalAmount - b.totalAmount;
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "email":
        comparison = a.email.localeCompare(b.email);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleLogout = async () => {
    await fetch("/api/super-admin/auth/logout", {
      method: "POST",
    });
    window.location.href = "/super-admin/login";
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    alert("Fonctionnalité d'export à implémenter");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#019090] mx-auto mb-4" />
          <p className="text-black/70">Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-4">Erreur</h2>
          <p className="text-black/70 mb-6">{error}</p>
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 bg-[#019090] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#019090]/90 transition-colors"
          >
            <Loader2 className="w-4 h-4" />
            Réessayer
          </button>
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
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-4 text-3xl font-bold text-black">
                Gestion des Commandes
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
                className="text-black/70 hover:text-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Utilisateurs
              </Link>
              <Link
                href="/super-admin/orders"
                className="bg-[#019090] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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
            Gestion des Commandes
          </h2>
          <p className="text-black/70">
            Suivez et gérez toutes les commandes de votre plateforme
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#019090]/10 rounded-xl flex items-center justify-center text-[#019090]">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/70">
                    Total Commandes
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {orders.length}
                  </p>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#019090]/10 rounded-xl flex items-center justify-center text-[#019090]">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/70">Payées</p>
                  <p className="text-3xl font-bold text-black">
                    {orders.filter((o) => o.status === "PAID").length}
                  </p>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/70">
                    En Attente
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {orders.filter((o) => o.status === "PENDING").length}
                  </p>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Euro className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/70">CA Total</p>
                  <p className="text-3xl font-bold text-black">
                    {orders
                      .filter((o) => o.status === "PAID")
                      .reduce((sum, o) => sum + o.totalAmount, 0)
                      .toFixed(0)}
                    €
                  </p>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher par email, nom, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
              >
                <option value="all">Tous les statuts</option>
                <option value="PAID">Payé</option>
                <option value="PENDING">En attente</option>
                <option value="CANCELLED">Annulé</option>
                <option value="FAILED">Échoué</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent text-black"
              >
                <option value="date">Trier par date</option>
                <option value="amount">Trier par montant</option>
                <option value="status">Trier par statut</option>
                <option value="email">Trier par email</option>
              </select>

              <motion.button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </motion.button>

              <motion.button
                onClick={handleExport}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-[#019090] text-white rounded-lg font-semibold hover:bg-[#019090]/90 transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exporter
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#019090]/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[#019090]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">
                  Liste des Commandes
                </h2>
                <p className="text-sm text-black/60">
                  {sortedOrders.length} commande
                  {sortedOrders.length > 1 ? "s" : ""} trouvée
                  {sortedOrders.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {sortedOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Aucune commande trouvée
              </h3>
              <p className="text-black/60">
                {searchTerm || statusFilter !== "all"
                  ? "Aucune commande ne correspond à vos critères"
                  : "Les commandes apparaîtront ici une fois que les clients auront effectué des achats"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#019090]/10 rounded-xl flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-[#019090]" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-black">
                              Commande #{order.id.slice(0, 8)}...
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-black/60" />
                              <div>
                                <p className="text-sm text-black/60">Client</p>
                                <p className="text-sm font-medium text-black">
                                  {order.shippingInfo.firstName}{" "}
                                  {order.shippingInfo.lastName}
                                </p>
                                <p className="text-xs text-black/60">
                                  {order.email}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Euro className="w-4 h-4 text-black/60" />
                              <div>
                                <p className="text-sm text-black/60">Montant</p>
                                <p className="text-sm font-semibold text-black">
                                  {order.totalAmount}€
                                </p>
                                <p className="text-xs text-black/60">
                                  {order.currency}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-black/60" />
                              <div>
                                <p className="text-sm text-black/60">
                                  Produits
                                </p>
                                <p className="text-sm font-medium text-black">
                                  {order.items.length} article
                                  {order.items.length > 1 ? "s" : ""}
                                </p>
                                <p className="text-xs text-black/60">
                                  {order.items.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                  )}{" "}
                                  unité
                                  {order.items.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                  ) > 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <QrCode className="w-4 h-4 text-black/60" />
                              <div>
                                <p className="text-sm text-black/60">
                                  Codes QR
                                </p>
                                <p className="text-sm font-medium text-black">
                                  {order.qrCodes ? order.qrCodes.length : 0}{" "}
                                  généré
                                  {order.qrCodes && order.qrCodes.length > 1
                                    ? "s"
                                    : ""}
                                </p>
                                <p className="text-xs text-black/60">
                                  {order.qrCodes
                                    ? `${
                                        order.qrCodes.filter(
                                          (qr) => qr.isActivated
                                        ).length
                                      } activé${
                                        order.qrCodes.filter(
                                          (qr) => qr.isActivated
                                        ).length > 1
                                          ? "s"
                                          : ""
                                      }`
                                    : "En attente"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Products List */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-black/70 mb-2">
                              Produits commandés :
                            </h4>
                            <div className="space-y-1">
                              {order.items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
                                >
                                  <span className="font-medium text-black">
                                    {item.product.name}
                                  </span>
                                  <div className="flex items-center gap-2 text-black/70">
                                    <span>x{item.quantity}</span>
                                    <span className="font-medium">
                                      {item.price}€
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-black/60" />
                              <span className="text-black/70">
                                {order.shippingInfo.city},{" "}
                                {order.shippingInfo.country}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-black/60" />
                              <span className="text-black/70">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "fr-FR"
                                )}
                              </span>
                            </div>
                            {order.shippingInfo.status && (
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getShippingStatusColor(
                                  order.shippingInfo.status
                                )}`}
                              >
                                {order.shippingInfo.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#019090] bg-[#019090]/10 rounded-lg hover:bg-[#019090]/20 transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        Voir détails
                      </motion.button>

                      {order.status === "PAID" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            alert(
                              `Marquer la commande ${order.id} comme expédiée`
                            );
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200"
                        >
                          <Truck className="w-4 h-4" />
                          Expédier
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
