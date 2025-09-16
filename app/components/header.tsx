import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, QrCode } from "lucide-react";
import CartDropdown from "./cart-dropdown";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/plaque-avis-google-nfc/produits", label: "Nos Produits" },
    { href: "/configuration", label: "Configuration" },
    { href: "/achat-en-gros", label: "Achat en lot" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#40C49A] shadow-lg">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <QrCode className="w-6 h-6 text-[#40C49A]" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              CodeQR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <CartDropdown />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/20 overflow-hidden"
            >
              <nav className="py-4">
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
