import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeQR - Plaques QR Code pour Avis Google",
  description:
    "Solution complète pour permettre aux commerçants d'acheter des plaques physiques personnalisées contenant un QR Code qui redirige vers leur lien Google d'avis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
