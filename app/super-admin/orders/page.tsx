"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Toutes les Commandes
            </h2>
            <div className="text-sm text-gray-600">
              {orders.length} commande{orders.length > 1 ? "s" : ""}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    ID Commande
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Client
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Produits
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Statut
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Codes QR
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {order.id.slice(0, 8)}...
                      </div>
                      {order.mollieId && (
                        <div className="text-xs text-gray-500">
                          Mollie: {order.mollieId.slice(0, 8)}...
                        </div>
                      )}
                      <div className="text-xs text-blue-600 font-medium">
                        {order.status === "PAID" ? "✅ Payé" : "⏳ En attente"}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.shippingInfo.firstName}{" "}
                          {order.shippingInfo.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.shippingInfo.city},{" "}
                          {order.shippingInfo.country}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">
                              {item.product.name}
                            </span>
                            <span className="text-gray-600">
                              {" "}
                              x{item.quantity}
                            </span>
                            <span className="text-gray-500">
                              {" "}
                              ({item.price}€)
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900">
                        {order.totalAmount}€
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.currency}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        {order.qrCodes ? (
                          <span className="text-green-600 font-medium">
                            {order.qrCodes.length} généré
                            {order.qrCodes.length > 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span className="text-gray-500">En attente</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/super-admin/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Voir détails
                        </Link>
                        {order.status === "PAID" && (
                          <button
                            onClick={() => {
                              // Marquer comme expédié
                              alert(
                                `Marquer la commande ${order.id} comme expédiée`
                              );
                            }}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Expédier
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune commande
              </h3>
              <p className="text-gray-600">
                Les commandes apparaîtront ici une fois que les clients auront
                effectué des achats.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
