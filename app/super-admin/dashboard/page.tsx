"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Non authentifié
          </h2>
          <p className="text-gray-600">
            Veuillez vous connecter pour accéder à cette page
          </p>
          <Link
            href="/super-admin/login"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Se connecter
          </Link>
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
                <span className="text-white font-bold text-2xl">⚡</span>
              </div>
              <h1 className="ml-4 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Super Admin Dashboard
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
                href="/super-admin/orders"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Commandes
              </Link>
              <Link
                href="#"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Se déconnecter
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Utilisateurs
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.stats.users.total}
                </p>
                <p className="text-sm text-green-600">
                  +{data.stats.users.newThisMonth} ce mois
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </div>

          {/* Plaques Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Codes QR</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.stats.plaques.total}
                </p>
                <p className="text-sm text-blue-600">
                  {data.stats.plaques.activated} activées
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 text-xl">🏷️</span>
              </div>
            </div>
          </div>

          {/* Orders Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.stats.orders.total}
                </p>
                <p className="text-sm text-green-600">
                  {data.stats.orders.paid} payées
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {data.stats.orders.total - data.stats.orders.paid} en attente
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 text-xl">🛒</span>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-3xl font-bold text-gray-900">
                  {data.stats.revenue.estimated}€
                </p>
                <p className="text-sm text-green-600">Total payé</p>
                <p className="text-xs text-gray-500 mt-1">
                  {data.stats.orders.paid} commandes payées
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Utilisateurs Récents
              </h2>
              <Link
                href="/super-admin/users"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
            <div className="space-y-4">
              {data.recent.users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user._count.plaques} plaques
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Commandes Récentes
              </h2>
              <Link
                href="/super-admin/orders"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
            <div className="space-y-4">
              {data.recent.orders &&
                data.recent.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.email}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.items
                          .map(
                            (item) => `${item.product.name} x${item.quantity}`
                          )
                          .join(", ")}
                      </p>
                      {order.mollieId && (
                        <p className="text-xs text-blue-600 font-mono">
                          Mollie: {order.mollieId.slice(0, 8)}...
                        </p>
                      )}
                      {order.qrCodes && order.qrCodes.length > 0 && (
                        <p className="text-xs text-green-600">
                          {order.qrCodes.length} QR code
                          {order.qrCodes.length > 1 ? "s" : ""} généré
                          {order.qrCodes.length > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {order.totalAmount}€
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "PAID"
                            ? "bg-green-100 text-green-700"
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
                ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/super-admin/users"
              className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200"
            >
              <span className="text-2xl mr-3">👥</span>
              <div>
                <p className="font-medium text-gray-900">
                  Gérer les Utilisateurs
                </p>
                <p className="text-sm text-gray-600">Voir tous les clients</p>
              </div>
            </Link>
            <Link
              href="/super-admin/coderq"
              className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-200"
            >
              <span className="text-2xl mr-3">🏷️</span>
              <div>
                <p className="font-medium text-gray-900">Gérer les Codes QR</p>
                <p className="text-sm text-gray-600">Suivre les commandes</p>
              </div>
            </Link>
            <Link
              href="/super-admin/shipping"
              className="flex items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-200"
            >
              <span className="text-2xl mr-3">📦</span>
              <div>
                <p className="font-medium text-gray-900">
                  Gérer les Livraisons
                </p>
                <p className="text-sm text-gray-600">Suivre les expéditions</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
