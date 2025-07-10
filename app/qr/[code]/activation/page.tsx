"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

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
        // Rediriger vers Google après activation réussie
        window.location.href = googleReviewUrl;
      } else {
        setSubmitError(data.error || "Erreur lors de l'activation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setSubmitError("Erreur lors de l'activation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (qrInfo?.isActivated == true) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-black" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Code QR déjà activé
          </h1>
          <p className="text-gray-600">Veilliez patienter...</p>
          <p className="text-gray-600">
            vous allez être redirigé vers votre page Google Avis
          </p>
        </div>
      </div>
    );
  }

  if (!qrInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Code QR non trouvé
          </h1>
          <p className="text-gray-600">
            Le code QR que vous avez scanné n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Activer votre Code QR
          </h1>
          <p className="text-gray-600">
            Code: <span className="font-mono font-medium">{code}</span>
          </p>
        </div>

        {/* Activation Form */}
        <form onSubmit={handleActivation} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Votre mot de passe"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Si vous n'avez pas de compte, un nouveau compte sera créé
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien Google Avis
            </label>
            <input
              type="url"
              value={googleReviewUrl}
              onChange={(e) => setGoogleReviewUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="https://g.page/r/..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Le lien vers votre page Google Avis
            </p>
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Activation..." : "Activer mon Code QR"}
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">
            Comment ça marche ?
          </h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Renseignez vos informations</li>
            <li>2. Ajoutez votre lien Google Avis</li>
            <li>3. Votre code QR sera activé</li>
            <li>4. Les visiteurs seront redirigés vers vos avis</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
