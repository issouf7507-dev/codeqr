"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Users,
  QrCode,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  Shield,
  LogOut,
  BarChart3,
  Activity,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Stats {
  users: {
    total: number;
    newThisMonth: number;
  };
  plaques: {
    total: number;
    activated: number;
    pending: number;
  };
  shipping: {
    total: number;
    pending: number;
  };
  orders: {
    total: number;
    paid: number;
  };
  revenue: {
    estimated: number;
  };
}

interface RecentUser {
  id: string;
  email: string;
  createdAt: string;
  _count: {
    plaques: number;
  };
}

interface RecentPlaque {
  id: string;
  codeId: string;
  isActivated: boolean;
  createdAt: string;
  user: {
    email: string;
  };
  shippingInfo: {
    firstName: string;
    lastName: string;
    status: string;
  };
}

interface DashboardData {
  stats: Stats;
  recent: {
    users: RecentUser[];
    plaques: RecentPlaque[];
    orders: RecentOrder[];
  };
}

interface RecentOrder {
  id: string;
  email: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  mollieId?: string;
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
  }>;
  qrCodes?: Array<{
    id: string;
    code: string;
    isActivated: boolean;
  }>;
}

export default function SuperAdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, loading } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/super-admin/overview");
      if (response.ok) {
        const dashboardData = await response.json();
        setData(dashboardData);
        console.log(dashboardData);
      } else {
        setError("Erreur lors du chargement des données");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/super-admin/auth/logout", {
      method: "POST",
    });
    // router.push("/super-admin/login");
    window.location.href = "/super-admin/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#019090] mx-auto mb-4" />
          <p className="text-black/70">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
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

  const statsCards = [
    {
      title: "Utilisateurs",
      value: data.stats.users.total,
      subtitle: `+${data.stats.users.newThisMonth} ce mois`,
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      trend: "up",
    },
    {
      title: "Codes QR",
      value: data.stats.plaques.total,
      subtitle: `${data.stats.plaques.activated} activés`,
      icon: <QrCode className="w-8 h-8" />,
      color: "bg-[#019090]/10 text-[#019090]",
      trend: "up",
    },
    {
      title: "Commandes",
      value: data.stats.orders.total,
      subtitle: `${data.stats.orders.paid} payées`,
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      trend: "up",
    },
    {
      title: "Revenus",
      value: `${data.stats.revenue.estimated}€`,
      subtitle: "Total payé",
      icon: <DollarSign className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      trend: "up",
    },
  ];

  const quickActions = [
    {
      title: "Gérer les Utilisateurs",
      description: "Voir tous les clients",
      href: "/super-admin/users",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-50 hover:bg-blue-100 text-blue-600",
    },
    {
      title: "Gérer les Codes QR",
      description: "Suivre les commandes",
      href: "/super-admin/coderq",
      icon: <QrCode className="w-6 h-6" />,
      color: "bg-[#019090]/10 hover:bg-[#019090]/20 text-[#019090]",
    },
    {
      title: "Gérer les Livraisons",
      description: "Suivre les expéditions",
      href: "/super-admin/shipping",
      icon: <Package className="w-6 h-6" />,
      color: "bg-orange-50 hover:bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#019090] rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="ml-4 text-3xl font-bold text-black">
                Super Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/super-admin/dashboard"
                className="bg-[#019090] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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
            Bienvenue, {user?.email || "Admin"}
          </h2>
          <p className="text-black/70">
            Voici un aperçu de l'activité de votre plateforme CodeQR
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-black mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600">{stat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-black">
                  Utilisateurs Récents
                </h2>
              </div>
              <Link
                href="/super-admin/users"
                className="flex items-center gap-1 text-[#019090] hover:text-[#019090]/80 text-sm font-medium transition-colors"
              >
                Voir tout
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {data.recent.users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-black">{user.email}</p>
                    <p className="text-sm text-black/60">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#019090]">
                      {user._count.plaques} plaques
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-black">
                  Commandes Récentes
                </h2>
              </div>
              <Link
                href="/super-admin/orders"
                className="flex items-center gap-1 text-[#019090] hover:text-[#019090]/80 text-sm font-medium transition-colors"
              >
                Voir tout
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {data.recent.orders &&
                data.recent.orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-black">{order.email}</p>
                      <div className="text-right">
                        <p className="font-bold text-[#019090]">
                          {order.totalAmount}€
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "PAID"
                              ? "bg-[#019090]/10 text-[#019090]"
                              : order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status === "PAID"
                            ? "Payé"
                            : order.status === "PENDING"
                            ? "En attente"
                            : order.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-black/60">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-black/50">
                        {order.items
                          .map(
                            (item) => `${item.product.name} x${item.quantity}`
                          )
                          .join(", ")}
                      </p>
                      {order.qrCodes && order.qrCodes.length > 0 && (
                        <p className="text-xs text-[#019090]">
                          {order.qrCodes.length} QR code
                          {order.qrCodes.length > 1 ? "s" : ""} généré
                          {order.qrCodes.length > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#019090]/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#019090]" />
            </div>
            <h2 className="text-xl font-bold text-black">Actions Rapides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <Link
                  href={action.href}
                  className={`flex items-center p-4 ${action.color} rounded-xl transition-all duration-200 hover:scale-105 group`}
                >
                  <div className="mr-4">{action.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-black mb-1">
                      {action.title}
                    </p>
                    <p className="text-sm text-black/60">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
