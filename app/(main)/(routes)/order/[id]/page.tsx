"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";

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

  // useEffect(() => {
  //   if (!hasReloadedRef.current) {
  //     hasReloadedRef.current = true;
  //     const timer = setTimeout(() => {
  //       window.location.reload();
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#40C49A]"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Erreur</h2>
            <p className="text-black/70">{error}</p>
            <Link
              href="/"
              className="mt-4 inline-block bg-[#40C49A] text-white px-6 py-2 rounded-lg hover:bg-[#40C49A]/90 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Status Icon */}
            <div
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
                order.status === "PAID"
                  ? "bg-[#40C49A]/10 border-2 border-[#40C49A]"
                  : order.status === "PENDING"
                  ? "bg-yellow-50 border-2 border-yellow-300"
                  : "bg-red-50 border-2 border-red-300"
              }`}
            >
              {order.status === "PAID" ? (
                <svg
                  className="w-12 h-12 text-[#40C49A]"
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

            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {order.status === "PAID"
                ? "Paiement confirmé !"
                : order.status === "PENDING"
                ? "Paiement en cours..."
                : "Paiement échoué"}
            </h1>

            <p className="text-xl text-black/70 mb-8 leading-relaxed">
              {order.status === "PAID"
                ? "Votre commande a été traitée avec succès. Vous allez recevoir un email de confirmation avec votre code d'activation."
                : order.status === "PENDING"
                ? "Votre paiement est en cours de traitement. Nous vérifions automatiquement le statut..."
                : "Le paiement n'a pas pu être traité. Veuillez réessayer."}
            </p>

            {order.status === "PENDING" && (
              <div className="flex items-center justify-center mb-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#40C49A] mr-3"></div>
                <span className="text-[#40C49A]">
                  Vérification automatique en cours...
                </span>
              </div>
            )}

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-black mb-6">
                Détails de votre commande
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-black/70">Numéro de commande :</span>
                  <span className="font-medium text-black">{order.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-black/70">Email :</span>
                  <span className="font-medium text-black">{order.email}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-black/70">Statut :</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "PAID"
                        ? "bg-[#40C49A]/10 text-[#40C49A] border border-[#40C49A]/20"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-red-100 text-red-800 border border-red-200"
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
                  <span className="text-black/70">Total :</span>
                  <span className="text-xl font-bold text-[#40C49A]">
                    {order.totalAmount.toFixed(2).replace(".", ",")}€
                  </span>
                </div>

                {order.mollieId && (
                  <div className="flex justify-between items-center">
                    <span className="text-black/70">ID Paiement :</span>
                    <span className="font-mono text-sm text-black/60">
                      {order.mollieId}
                    </span>
                  </div>
                )}

                {order.qrCodes && order.qrCodes.length > 0 && (
                  <div className="mt-6 p-4 bg-[#40C49A]/5 border border-[#40C49A]/20 rounded-lg">
                    <h3 className="font-semibold text-[#40C49A] mb-2">
                      Codes QR générés :
                    </h3>
                    <div className="space-y-2">
                      {order.qrCodes.map((qrCode) => (
                        <div
                          key={qrCode.id}
                          className="flex justify-between items-center"
                        >
                          <span className="font-mono text-[#40C49A]">
                            {qrCode.code}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              qrCode.isActivated
                                ? "bg-[#40C49A]/20 text-[#40C49A]"
                                : "bg-yellow-100 text-yellow-800"
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
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-black mb-6">
                Produits commandés
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <div>
                      <h3 className="font-medium text-black">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-black/70">
                        Quantité : {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#40C49A]">
                        {(item.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                        €
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Next Steps */}
            {order.status === "PAID" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-[#40C49A]/5 border border-[#40C49A]/20 rounded-2xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-[#40C49A] mb-6">
                  Prochaines étapes
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#40C49A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <p className="text-black/80 pt-1">
                      Vous allez recevoir un email avec votre code d'activation
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#40C49A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <p className="text-black/80 pt-1">
                      Créez votre compte sur notre plateforme
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#40C49A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <p className="text-black/80 pt-1">
                      Activez votre plaque avec le code reçu
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#40C49A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <p className="text-black/80 pt-1">
                      Recevez votre plaque physique sous 5-7 jours
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {order.status === "PENDING" && (
                <motion.button
                  onClick={refreshStatus}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#40C49A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#40C49A]/90 transition-all duration-200"
                >
                  Vérifier le statut
                </motion.button>
              )}
              {order.status === "PAID" ? (
                <>
                  <motion.a
                    href="/register"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#40C49A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#40C49A]/90 transition-all duration-200"
                  >
                    Créer mon compte
                  </motion.a>
                  <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-[#40C49A] text-[#40C49A] px-8 py-3 rounded-xl font-semibold hover:bg-[#40C49A] hover:text-white transition-all duration-200"
                  >
                    Retour à l'accueil
                  </motion.a>
                </>
              ) : (
                <>
                  <motion.a
                    href="/checkout-cart"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#40C49A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#40C49A]/90 transition-all duration-200"
                  >
                    Réessayer
                  </motion.a>
                  <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-[#40C49A] text-[#40C49A] px-8 py-3 rounded-xl font-semibold hover:bg-[#40C49A] hover:text-white transition-all duration-200"
                  >
                    Retour à l'accueil
                  </motion.a>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
