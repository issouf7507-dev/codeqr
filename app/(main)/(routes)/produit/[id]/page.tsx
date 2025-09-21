"use client";

import React, { use, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Star,
  Check,
  ArrowRight,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  QrCode,
  ChevronDown,
  Info,
} from "lucide-react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { useCart } from "../../../../contexts/CartContext";
// import { useToast } from "../../../../components/toast";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("1");
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  //   const { showToast } = useToast();

  // Charger le produit depuis la base de données
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);

        if (response.ok) {
          const productData = await response.json();

          // Adapter les données pour l'affichage avec les packages
          const adaptedProduct = {
            ...productData,
            subtitle:
              "Doublez votre nombre d'avis Google en 3 mois — ou nous vous remboursons !",
            rating: 4.8,
            reviewCount: 200,
            mainImage: productData.image,
            images: [
              productData.image,
              productData.image,
              productData.image,
              productData.image,
            ],
            // Utiliser les features de la base de données + features marketing
            features: [
              "Entreprise Française 🇫🇷",
              "Collectez des Avis en 3 Secondes !",
              "Paiement unique, 0 frais mensuels",
              "Soyez 1er dans les recherches Google",
              ...productData.features, // Features de la DB
            ],
            packages: [
              {
                id: "10",
                name: `10 ${productData.name}`,
                price: (productData.price * 10 * 0.7).toFixed(2), // 30% de réduction
                originalPrice: (productData.price * 10).toFixed(2),
                savings: "30%",
                badge: "Meilleure Offre",
                features: ["+ Guide Gratuit & Cadeau Mystère 🎁"],
                popular: true,
              },
              {
                id: "5",
                name: `5 ${productData.name}`,
                price: (productData.price * 5 * 0.8).toFixed(2), // 20% de réduction
                originalPrice: (productData.price * 5).toFixed(2),
                savings: "20%",
                features: ["+ Guide Gratuit 🎁"],
                popular: false,
              },
              {
                id: "3",
                name: `3 ${productData.name}`,
                price: (productData.price * 3 * 0.9).toFixed(2), // 10% de réduction
                originalPrice: (productData.price * 3).toFixed(2),
                savings: "10%",
                features: [],
                popular: false,
              },
              {
                id: "1",
                name: productData.name,
                price: productData.price.toFixed(2),
                originalPrice: null,
                savings: null,
                features: [],
                popular: false,
              },
            ],
            specifications: [
              "Matériau : PVC professionnel haute qualité",
              "QR Code haute résolution 300 DPI",
              "Résistant aux intempéries",
              "Configuration incluse",
              "Livraison gratuite",
              "Support client dédié",
            ],
          };

          setProduct(adaptedProduct);
        } else {
          console.error("Produit non trouvé");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center justify-center ">
          <img src="/load.svg" alt="Loading" className="w-32 h-32" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              Produit non trouvé
            </h2>
            <p className="text-black/70 mb-6">
              Ce produit n'existe pas ou n'est plus disponible.
            </p>
            <a
              href="/produits"
              className="inline-flex items-center gap-2 bg-[#019090] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#019090]/90 transition-colors"
            >
              Voir nos produits
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedPackageData = product.packages.find(
    (p: { id: string | number }) => p.id === selectedPackage
  );

  const addToCart = () => {
    if (!selectedPackageData) return;

    const cartItem = {
      id: `${id}-${selectedPackage}`,
      productId: id,
      packageId: selectedPackage,
      name: selectedPackageData.name,
      price: parseFloat(selectedPackageData.price.replace(",", ".")),
      originalPrice: selectedPackageData.originalPrice
        ? parseFloat(selectedPackageData.originalPrice.replace(",", "."))
        : undefined,
      image: product.mainImage,
      features: selectedPackageData.features,
      quantity: quantity,
    };

    addItem(cartItem);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-square bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </motion.div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image: string, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-lg border-2 overflow-hidden ${
                      activeImage === index
                        ? "border-[#019090]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-black">
                  {product.rating} | +{product.reviewCount} avis vérifiés
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-black/70">{product.subtitle}</p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#019090]" />
                    <span className="text-black/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Package Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-black">
                  Choisissez votre pack
                </h3>
                <div className="space-y-3">
                  {product.packages.map((pkg: any) => (
                    <motion.div
                      key={pkg.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? "border-[#019090] bg-[#019090]/5"
                          : "border-gray-200 hover:border-gray-300"
                      } ${pkg.popular ? "ring-2 ring-[#019090]/20" : ""}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.badge && (
                        <div className="absolute -top-3 left-4">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {pkg.badge}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPackage === pkg.id
                                ? "border-[#019090] bg-[#019090]"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedPackage === pkg.id && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-black">
                              {pkg.name}
                            </div>
                            {pkg.savings && (
                              <div className="text-sm text-[#019090]">
                                Économisez {pkg.savings}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#019090]">
                            {pkg.price} € HT
                          </div>
                          {pkg.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              {pkg.originalPrice} € HT
                            </div>
                          )}
                        </div>
                      </div>

                      {pkg.features.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {pkg.features.map(
                            (feature: string, index: number) => (
                              <div
                                key={index}
                                className="text-sm text-black/70 flex items-center gap-2"
                              >
                                <Plus className="w-3 h-3 text-[#019090]" />
                                {feature}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-black">
                    Quantité:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg text-black">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  AJOUTER AU PANIER
                </motion.button>

                <div className="text-center text-sm text-black/60">
                  Dès réception de vos produits Digifeel, vous pourrez les
                  configurer dans notre application.
                  <br />
                  <span className="font-semibold">
                    (Configuration en 20 secondes).
                  </span>
                </div>

                <div className="text-center">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Stock Limité — SPÉCIALE RENTRÉE
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-[#019090] mx-auto mb-2" />
                  <div className="text-sm font-semibold text-black">
                    Livraison gratuite
                  </div>
                  <div className="text-xs text-black/60">3-5 jours ouvrés</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-[#019090] mx-auto mb-2" />
                  <div className="text-sm font-semibold text-black">
                    Garantie qualité
                  </div>
                  <div className="text-xs text-black/60">100% satisfait</div>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-[#019090] mx-auto mb-2" />
                  <div className="text-sm font-semibold text-black">
                    Retour gratuit
                  </div>
                  <div className="text-xs text-black/60">30 jours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
