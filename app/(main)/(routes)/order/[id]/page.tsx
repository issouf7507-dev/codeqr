"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  email: string;
  mollieId?: string;
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }>;
  qrCodes: Array<{
    id: string;
    code: string;
    isActivated: boolean;
  }>;
}

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const hasReloadedRef = useRef(false);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  useEffect(() => {
    if (!hasReloadedRef.current) {
      hasReloadedRef.current = true;
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Vérifier automatiquement le statut si le paiement est en cours
  useEffect(() => {
    if (order && order.status === "PENDING") {
      const interval = setInterval(() => {
        fetchOrder();
      }, 2000); // Vérifier toutes les 5 secondes

      return () => clearInterval(interval);
    }
  }, [order?.status]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
      } else {
        setError("Commande non trouvée");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande:", error);
      setError("Erreur lors de la récupération de la commande");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStatus = async () => {
    setIsLoading(true);
    await fetchOrder();
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
          <Link
            href="/"
            className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Retour à l'accueil
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
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  CodeQR
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Status Icon */}
          <div
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
              order.status === "PAID"
                ? "bg-green-100"
                : order.status === "PENDING"
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            {order.status === "PAID" ? (
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : order.status === "PENDING" ? (
              <svg
                className="w-12 h-12 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {order.status === "PAID"
              ? "Paiement confirmé !"
              : order.status === "PENDING"
              ? "Paiement en cours..."
              : "Paiement échoué"}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {order.status === "PAID"
              ? "Votre commande a été traitée avec succès. Vous allez recevoir un email de confirmation avec votre code d'activation."
              : order.status === "PENDING"
              ? "Votre paiement est en cours de traitement. Nous vérifions automatiquement le statut..."
              : "Le paiement n'a pas pu être traité. Veuillez réessayer."}
          </p>

          {order.status === "PENDING" && (
            <div className="flex items-center justify-center mb-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
              <span className="text-blue-600">
                Vérification automatique en cours...
              </span>
            </div>
          )}

          {/* Order Details */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Détails de votre commande
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Numéro de commande :</span>
                <span className="font-medium text-gray-900">{order.id}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email :</span>
                <span className="font-medium text-gray-900">{order.email}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Statut :</span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status === "PAID"
                    ? "Payé"
                    : order.status === "PENDING"
                    ? "En attente"
                    : order.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total :</span>
                <span className="text-xl font-bold text-red-600">
                  {order.totalAmount}€
                </span>
              </div>

              {order.mollieId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ID Paiement :</span>
                  <span className="font-mono text-sm text-gray-500">
                    {order.mollieId}
                  </span>
                </div>
              )}

              {order.qrCodes && order.qrCodes.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Codes QR générés :
                  </h3>
                  <div className="space-y-2">
                    {order.qrCodes.map((qrCode) => (
                      <div
                        key={qrCode.id}
                        className="flex justify-between items-center"
                      >
                        <span className="font-mono text-green-700">
                          {qrCode.code}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            qrCode.isActivated
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {qrCode.isActivated ? "Activé" : "En attente"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Produits commandés
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantité : {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          {order.status === "PAID" && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Prochaines étapes
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">1.</span>
                  <p className="text-blue-800">
                    Vous allez recevoir un email avec votre code d'activation
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">2.</span>
                  <p className="text-blue-800">
                    Créez votre compte sur notre plateforme
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">3.</span>
                  <p className="text-blue-800">
                    Activez votre plaque avec le code reçu
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">4.</span>
                  <p className="text-blue-800">
                    Recevez votre plaque physique sous 5-7 jours
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {order.status === "PENDING" && (
              <button
                onClick={refreshStatus}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200"
              >
                Vérifier le statut
              </button>
            )}
            {order.status === "PAID" ? (
              <>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                >
                  Créer mon compte
                </Link>
                <Link
                  href="/"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Retour à l'accueil
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/checkout"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                >
                  Réessayer
                </Link>
                <Link
                  href="/"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Retour à l'accueil
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
