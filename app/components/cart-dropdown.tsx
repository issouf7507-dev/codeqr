"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } =
    useCart();

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-white/80 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-white text-[#40C49A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Modal/Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/50 sm:bg-transparent"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Modal */}
            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-black">
                    Panier ({itemCount})
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Mobile Cart Content */}
                {items.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg mb-4">
                        Votre panier est vide
                      </p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 bg-[#40C49A] text-white rounded-lg font-semibold hover:bg-[#40C49A]/90 transition-colors"
                      >
                        Continuer les achats
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-200 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-black text-sm">
                                {item.name}
                              </h4>
                              <p className="text-[#40C49A] font-semibold text-sm">
                                {formatPrice(item.price)}
                              </p>
                              {item.originalPrice && (
                                <p className="text-xs text-gray-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </p>
                              )}

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="text-base font-semibold text-black min-w-[30px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg active:bg-red-100"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-black">
                          Total:
                        </span>
                        <span className="text-2xl font-bold text-[#40C49A]">
                          {formatPrice(total)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <motion.a
                          href="/checkout-cart"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-[#40C49A] text-white py-4 rounded-xl font-semibold hover:bg-[#40C49A]/90 transition-colors flex items-center justify-center gap-2 text-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          Commander
                          <ArrowRight className="w-5 h-5" />
                        </motion.a>

                        <button
                          onClick={() => {
                            clearCart();
                            setIsOpen(false);
                          }}
                          className="w-full text-gray-500 py-2 text-base hover:text-gray-700 transition-colors"
                        >
                          Vider le panier
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              /* Desktop Dropdown */
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
              >
                {/* Desktop Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-black">
                    Panier ({itemCount})
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Desktop Cart Items */}
                <div className="max-h-64 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Votre panier est vide</p>
                    </div>
                  ) : (
                    <div className="p-4 space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-black text-sm truncate">
                              {item.name}
                            </h4>
                            <p className="text-[#40C49A] font-semibold text-sm">
                              {formatPrice(item.price)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-xs text-gray-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </p>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
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
                                className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop Footer */}
                {items.length > 0 && (
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-black">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-[#40C49A]">
                        {formatPrice(total)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <motion.a
                        href="/checkout-cart"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#40C49A] text-white py-3 rounded-xl font-semibold hover:bg-[#40C49A]/90 transition-colors flex items-center justify-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Commander
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>

                      <button
                        onClick={() => {
                          clearCart();
                          setIsOpen(false);
                        }}
                        className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
                      >
                        Vider le panier
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
