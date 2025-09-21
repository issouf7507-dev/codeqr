"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Loader2,
  QrCode,
  Check,
  AlertCircle,
  Mail,
  Lock,
  Link2,
  ArrowRight,
  User,
  Shield,
  Code,
} from "lucide-react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

interface QRCodeInfo {
  id: string;
  code: string;
  isActivated: boolean;
  googleReviewUrl?: string;
}

export default function QRCodeActivationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const router = useRouter();
  const [qrInfo, setQrInfo] = useState<QRCodeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [code, setCode] = useState<string>("");
  const [codeActivation, setCodeActivation] = useState<string>("");
  const [codeActivationError, setCodeActivationError] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  // Validation states
  const [passwordError, setPasswordError] = useState("");
  const [urlError, setUrlError] = useState("");
  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setCode(resolvedParams.code);
      checkQRCode(resolvedParams.code);
    };
    loadParams();
  }, [params]);

  const checkQRCode = async (codeParam: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/qr/${codeParam}`);

      if (response.ok) {
        const data = await response.json();
        setQrInfo(data);

        // console.log(data);

        // Si le QR code est déjà activé, rediriger vers Google
        if (data.isActivated && data.googleReviewUrl) {
          window.location.href = data.googleReviewUrl;
          return;
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Code QR non trouvé");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de la vérification du code QR");
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserExists = async (emailToCheck: string) => {
    if (!emailToCheck || !emailToCheck.includes("@")) return;

    try {
      setIsCheckingUser(true);
      const response = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToCheck }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserExists(data.exists);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur:", error);
    } finally {
      setIsCheckingUser(false);
    }
  };

  // Vérifier l'utilisateur quand l'email change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (email) {
        checkUserExists(email);
      } else {
        setUserExists(null);
      }
    }, 500); // Attendre 500ms après que l'utilisateur arrête de taper

    return () => clearTimeout(timeoutId);
  }, [email]);

  // Validation en temps réel du mot de passe
  useEffect(() => {
    if (password.length > 0 && password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
    } else {
      setPasswordError("");
    }
  }, [password]);

  // Validation en temps réel de l'URL Google
  useEffect(() => {
    if (googleReviewUrl.length > 0) {
      if (
        !googleReviewUrl.startsWith("https://g.page/r/") &&
        !googleReviewUrl.startsWith("https://maps.app.goo.gl/")
      ) {
        setUrlError(
          "Le lien doit commencer par https://g.page/r/ ou https://maps.app.goo.gl/"
        );
      } else {
        setUrlError("");
      }
    } else {
      setUrlError("");
    }
  }, [googleReviewUrl]);

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validation côté client
    if (password.length < 6) {
      setSubmitError("Le mot de passe doit contenir au moins 6 caractères.");
      setIsSubmitting(false);
      return;
    }

    if (
      !googleReviewUrl.startsWith("https://g.page/r/") &&
      !googleReviewUrl.startsWith("https://maps.app.goo.gl/")
    ) {
      setSubmitError(
        "Le lien Google Avis doit être un lien Google Maps valide (commençant par https://g.page/r/ ou https://maps.app.goo.gl/)."
      );
      setIsSubmitting(false);
      return;
    }

    if (codeActivation !== code) {
      setSubmitError("Le code d'activation est incorrect.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/qr/${code}/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          googleReviewUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Afficher un message de succès avant la redirection
        setSubmitError(""); // Clear any previous errors

        const successMessage =
          "Connexion réussie et code QR activé ! Vous allez être redirigé vers votre page Google Avis.";

        alert(successMessage);

        // Rediriger vers Google après activation réussie
        window.location.href = googleReviewUrl;
      } else {
        // Gérer les différents types d'erreurs
        if (response.status === 401) {
          setSubmitError(
            "Mot de passe incorrect pour cet email. Veuillez vérifier vos informations."
          );
        } else if (response.status === 403) {
          // Utilisateur non enregistré - rediriger vers l'inscription
          setSubmitError(
            "Compte non trouvé. Veuillez d'abord vous inscrire sur notre plateforme."
          );
          setTimeout(() => {
            router.push(
              `/register?qrCode=${code}&email=${encodeURIComponent(
                email
              )}&googleReviewUrl=${encodeURIComponent(googleReviewUrl)}`
            );
          }, 2000);
        } else if (response.status === 400) {
          setSubmitError(
            data.error ||
              "Données invalides. Veuillez vérifier vos informations."
          );
        } else if (response.status === 404) {
          setSubmitError(
            "Code QR non trouvé. Veuillez vérifier le code scanné."
          );
        } else {
          setSubmitError(
            data.error || "Erreur lors de l'activation. Veuillez réessayer."
          );
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitError(
        "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#019090]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (qrInfo?.isActivated == true) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-2xl border border-gray-200 p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-[#019090]/10 border-2 border-[#019090] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#019090]" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Code QR déjà activé
            </h1>
            <p className="text-black/70 mb-4">Veuillez patienter...</p>
            <p className="text-black/70">
              Vous allez être redirigé vers votre page Google Avis
            </p>
            <div className="flex items-center justify-center mt-6">
              <Loader2 className="w-6 h-6 animate-spin text-[#019090] mr-2" />
              <span className="text-[#019090] text-sm">
                Redirection en cours...
              </span>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!qrInfo) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-2xl border border-gray-200 p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-red-50 border-2 border-red-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Code QR non trouvé
            </h1>
            <p className="text-black/70 mb-6">
              Le code QR que vous avez scanné n'existe pas.
            </p>
            <motion.a
              href="/produits"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#019090] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#019090]/90 transition-colors"
            >
              Voir nos produits
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <Header />

      <div className="pt-32 pb-20 ">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="border border-[#019090] text-[#019090] py-2 px-4 rounded-lg text-sm font-medium">
                  Activation QR Code
                </div>
              </div>
              <div className="w-20 h-20 bg-[#019090]/10 border-2 border-[#019090] rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-10 h-10 text-[#019090]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Activer votre <span className="text-[#019090]">Code QR</span>
              </h1>
              <p className="text-xl text-black/70 mb-2">
                Configurez votre plaque pour commencer à collecter des avis
              </p>
            </div>

            {/* Activation Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-black mb-6 text-center">
                Informations d'activation
              </h2>

              <form onSubmit={handleActivation} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#019090]" />
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                    {isCheckingUser && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#019090]" />
                      </div>
                    )}
                  </div>
                  {userExists !== null && !isCheckingUser && (
                    <div
                      className={`mt-2 p-3 rounded-lg border ${
                        userExists
                          ? "bg-[#019090]/5 border-[#019090]/20 text-[#019090]"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {userExists ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {userExists
                            ? "Compte existant détecté - Utilisez votre mot de passe"
                            : "Compte non trouvé - Vous devez d'abord vous inscrire"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#019090]" />
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent ${
                      passwordError ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Votre mot de passe"
                    required
                  />
                  {passwordError && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {passwordError}
                    </p>
                  )}
                  <p className="text-xs text-black/60 mt-2">
                    {userExists
                      ? "Utilisez le mot de passe de votre compte existant."
                      : "Vous devez d'abord créer un compte sur notre plateforme."}
                  </p>
                </div>

                <div>
                  <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#019090]" />
                    Code d'activation
                  </label>
                  <input
                    type="text"
                    value={codeActivation}
                    onChange={(e) => setCodeActivation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-[#019090] focus:border-transparent"
                    placeholder="Code d'activation"
                    // disabled
                    required
                  />
                  {codeActivationError && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {codeActivationError}
                    </p>
                  )}
                </div>

                <div>
                  <label className=" text-sm font-medium text-black mb-2 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-[#019090]" />
                    Lien Google Avis
                  </label>
                  <input
                    type="url"
                    value={googleReviewUrl}
                    onChange={(e) => setGoogleReviewUrl(e.target.value)}
                    className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-[#019090] focus:border-transparent ${
                      urlError ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="https://g.page/r/..."
                    required
                  />
                  {urlError && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {urlError}
                    </p>
                  )}
                  <p className="text-xs text-black/60 mt-2">
                    Le lien vers votre page Google Avis (doit commencer par
                    https://g.page/r/ ou https://maps.app.goo.gl/)
                  </p>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-red-600 text-sm font-medium">
                        {submitError}
                      </p>
                    </div>
                  </div>
                )}

                {userExists === false ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      router.push(
                        `/register?qrCode=${code}&email=${encodeURIComponent(
                          email
                        )}&googleReviewUrl=${encodeURIComponent(
                          googleReviewUrl
                        )}`
                      )
                    }
                    className="w-full bg-[#019090] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#019090]/90 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Créer un compte
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={
                      isSubmitting ||
                      !!passwordError ||
                      !!urlError ||
                      !email ||
                      !password ||
                      !googleReviewUrl
                    }
                    className="w-full bg-[#019090] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#019090]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Activation...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Activer mon Code QR
                      </>
                    )}
                  </motion.button>
                )}
              </form>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 bg-[#019090]/5 border border-[#019090]/20 rounded-2xl"
            >
              <h3 className="font-semibold text-[#019090] mb-4 text-center flex items-center justify-center gap-2">
                <QrCode className="w-5 h-5" />
                Comment ça marche ?
              </h3>
              <div className="space-y-3">
                {[
                  "Renseignez votre email et mot de passe",
                  "Vous devez avoir un compte existant sur notre plateforme",
                  'Si vous n\'avez pas de compte, cliquez sur "Créer un compte"',
                  "Ajoutez votre lien Google Avis",
                  "Votre code QR sera activé et lié à votre compte",
                  "Les visiteurs seront redirigés vers vos avis",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#019090] text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-black/80">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
