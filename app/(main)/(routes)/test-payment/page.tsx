"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestPayment() {
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const simulatePayment = async () => {
    if (!orderId) {
      alert("Veuillez entrer un ID de commande");
      return;
    }

    setIsProcessing(true);

    try {
      // Simuler un webhook de paiement réussi
      const response = await fetch("/api/test/simulate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        alert("Paiement simulé avec succès ! Vérifiez votre email.");
        window.location.href = `/success?order_id=${orderId}`;
      } else {
        const error = await response.json();
        alert(error.message || "Erreur lors de la simulation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la simulation");
    } finally {
      setIsProcessing(false);
    }
  };

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
            <div className="flex items-center space-x-4">
              <Link
                href="/checkout"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Retour au checkout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-8">
            <span className="text-yellow-600 text-4xl">🧪</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test de Paiement
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Cette page permet de simuler un paiement réussi pour tester le
            système sans configurer de webhook Mollie.
          </p>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Simuler un paiement
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID de la commande
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700"
                  placeholder="Entrez l'ID de la commande"
                />
              </div>

              <button
                onClick={simulatePayment}
                disabled={!orderId || isProcessing}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Simulation en cours...
                  </div>
                ) : (
                  "Simuler le paiement"
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Instructions :
              </h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Créez d'abord une commande via le checkout</li>
                <li>2. Copiez l'ID de la commande depuis l'URL</li>
                <li>3. Collez l'ID ici et cliquez sur "Simuler"</li>
                <li>4. Le système générera les codes QR et enverra l'email</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
