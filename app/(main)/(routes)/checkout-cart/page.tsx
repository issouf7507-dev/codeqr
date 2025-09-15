"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";
import { useToast } from "../../../components/toastaa";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export default function CheckoutCart() {
  const router = useRouter();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stockStatus, setStockStatus] = useState<{
    available: boolean;
    needed: number;
    inStock: number;
    remaining: number;
  } | null>(null);
  const [formData, setFormData] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: "",
  });

  // Vérifier le stock quand le panier change
  useEffect(() => {
    // if (items.length === 0) {
    //   router.push("/produits");
    //   return;
    // }

    const checkStock = async () => {
      try {
        const response = await fetch("/api/stock/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.productId,
              packageId: item.packageId,
              quantity: item.quantity,
            })),
          }),
        });

        if (response.ok) {
          const stockData = await response.json();
          setStockStatus(stockData);

          if (!stockData.available) {
            showToast({
              type: "error",
              title: "Stock insuffisant",
              message: `${stockData.needed} codes QR nécessaires, ${stockData.inStock} disponibles`,
            });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du stock:", error);
      }
    };

    checkStock();
  }, [items, router, showToast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast({
        type: "error",
        title: "Panier vide",
        message: "Ajoutez des produits à votre panier avant de commander",
      });
      return;
    }

    if (stockStatus && !stockStatus.available) {
      showToast({
        type: "error",
        title: "Stock insuffisant",
        message: `${stockStatus.needed} codes QR nécessaires, ${stockStatus.inStock} disponibles`,
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            packageId: item.packageId,
            quantity: item.quantity,
            name: item.name,
            price: item.price,
          })),
          ...formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Vider le panier après commande réussie
        clearCart();

        // Rediriger vers la page de paiement Mollie
        window.location.href = data.checkoutUrl;
      } else {
        const error = await response.json();
        showToast({
          type: "error",
          title: "Erreur de commande",
          message: error.error || "Erreur lors de la création de la commande",
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      showToast({
        type: "error",
        title: "Erreur de commande",
        message: "Erreur lors de la création de la commande",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Panier vide</h2>
          <p className="text-black/70 mb-6">
            Ajoutez des produits pour continuer
          </p>
          <Link
            href="/produits"
            className="px-6 py-3 bg-[#40C49A] text-white rounded-lg font-semibold hover:bg-[#40C49A]/90 transition-colors"
          >
            Voir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/produits"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-black">
                Finaliser votre commande
              </h1>
              <p className="text-black/70">
                Vérifiez votre panier et remplissez vos informations de
                livraison
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cart Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Votre commande ({items.length} article
                  {items.length > 1 ? "s" : ""})
                </h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain bg-gray-50 rounded-lg border border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-sm">
                          {item.name}
                        </h3>
                        <p className="text-[#40C49A] font-semibold">
                          {formatPrice(item.price)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </p>
                        )}

                        {/* Features */}
                        {item.features.length > 0 && (
                          <div className="mt-2">
                            {item.features.slice(0, 2).map((feature, index) => (
                              <p key={index} className="text-xs text-black/60">
                                + {feature}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold text-black min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stock Status */}
                {stockStatus && (
                  <div
                    className={`p-3 rounded-lg mb-4 ${
                      stockStatus.available
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          stockStatus.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          stockStatus.available
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {stockStatus.available
                          ? `✓ Stock disponible (${stockStatus.inStock} codes QR)`
                          : `⚠️ Stock insuffisant (${stockStatus.inStock}/${stockStatus.needed})`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-black/70">Sous-total</span>
                    <span className="font-semibold text-black">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-black/70">Livraison</span>
                    <span className="font-semibold text-green-600">
                      Gratuite
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-black">Total</span>
                    <span className="text-[#40C49A]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Informations de livraison
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                      placeholder="Prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                      placeholder="Nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Entreprise (optionnel)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                    placeholder="Nom de l'entreprise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                    placeholder="123 Rue de la Paix"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Complément d'adresse (optionnel)
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                    placeholder="Appartement, bureau, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                      placeholder="Paris"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                      placeholder="75001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Pays *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40C49A] focus:border-transparent text-black"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={
                    isProcessing ||
                    (stockStatus && !stockStatus.available) ||
                    !stockStatus?.available
                  }
                  whileHover={{
                    scale: stockStatus?.available !== false ? 1.02 : 1,
                  }}
                  whileTap={{
                    scale: stockStatus?.available !== false ? 0.98 : 1,
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 mt-6 ${
                    stockStatus?.available === false
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#40C49A] text-white hover:bg-[#40C49A]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Traitement en cours...
                    </div>
                  ) : stockStatus?.available === false ? (
                    "Stock insuffisant - Commande impossible"
                  ) : (
                    `Payer ${formatPrice(total)} avec Mollie`
                  )}
                </motion.button>

                <p className="text-xs text-black/60 text-center mt-4">
                  Paiement sécurisé avec Mollie. Vos données sont protégées.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
