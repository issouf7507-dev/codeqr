"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface OrderDetail {
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
      description: string;
      price: number;
    };
    quantity: number;
    price: number;
  }>;
  qrCodes: Array<{
    id: string;
    code: string;
    isActivated: boolean;
    createdAt: string;
  }>;
  shippingInfo: {
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
  };
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      const response = await fetch(`/api/super-admin/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        setError("Erreur lors du chargement de la commande");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement de la commande");
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

  if (error || !order) {
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
                Détails de la Commande
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/super-admin/orders"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                ← Retour aux commandes
              </Link>
              <Link
                href="/super-admin/dashboard"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Commande #{order.id.slice(0, 8)}...
              </h2>
              <p className="text-gray-600">
                Créée le {new Date(order.createdAt).toLocaleDateString("fr-FR")}{" "}
                à {new Date(order.createdAt).toLocaleTimeString("fr-FR")}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {order.totalAmount}€
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Informations Client
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Email :
                </span>
                <p className="text-gray-900">{order.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Nom :</span>
                <p className="text-gray-900">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
              </div>
              {order.shippingInfo.company && (
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Entreprise :
                  </span>
                  <p className="text-gray-900">{order.shippingInfo.company}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Téléphone :
                </span>
                <p className="text-gray-900">{order.shippingInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Adresse de Livraison
            </h3>
            <div className="space-y-2">
              <p className="text-gray-900">
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              </p>
              <p className="text-gray-900">{order.shippingInfo.address}</p>
              {order.shippingInfo.address2 && (
                <p className="text-gray-900">{order.shippingInfo.address2}</p>
              )}
              <p className="text-gray-900">
                {order.shippingInfo.postalCode} {order.shippingInfo.city}
              </p>
              <p className="text-gray-900">{order.shippingInfo.country}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Produits Commandés
          </h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.product.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantité : {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {(item.price * item.quantity).toFixed(2)}€
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.price}€ l'unité
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Codes */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Codes QR Générés
          </h3>
          {order.qrCodes.length > 0 ? (
            <div className="space-y-3">
              {order.qrCodes.map((qrCode) => (
                <div
                  key={qrCode.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-mono text-lg font-bold text-gray-900">
                      {qrCode.code}
                    </div>
                    <p className="text-sm text-gray-600">
                      Généré le{" "}
                      {new Date(qrCode.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        qrCode.isActivated
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {qrCode.isActivated ? "Activé" : "En attente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Aucun code QR généré pour le moment.
            </p>
          )}
        </div>

        {/* Payment Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Informations de Paiement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">
                ID Mollie :
              </span>
              <p className="text-gray-900 font-mono">
                {order.mollieId
                  ? order.mollieId.slice(0, 8) + "..."
                  : "Non disponible"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Devise :
              </span>
              <p className="text-gray-900">{order.currency}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Statut :
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Total :</span>
              <p className="text-xl font-bold text-gray-900">
                {order.totalAmount}€
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
