import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, QrCode } from "lucide-react";
import CartDropdown from "./cart-dropdown";
import Image from "next/image";

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
    {
      href: "/plaque-avis-google-nfc/produits",
      label: "Nos Produits",
    },
    { href: "/plaque-avis-google-nfc/configuration", label: "Configuration" },
    { href: "/plaque-avis-google-nfc/achat-en-gros", label: "Achat en lot" },
    { href: "/plaque-avis-google-nfc/a-propos", label: "À propos" },
    { href: "/plaque-avis-google-nfc/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#019090] shadow-lg">
      <div className="container mx-auto px-4">
        {/* Main Header */}

        <div className="hidden lg:block">
          <div className="md:flex items-center justify-center h-20 border-b border-white/20 hidden">
            <Image src="/logo.svg" alt="CodeQR.ma" width={300} height={300} />
          </div>

          <div className="flex items-center justify-center h-20">
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
            </nav>

            {/* Right Side - Cart & Mobile Menu */}
          </div>
        </div>

        <div className="lg:hidden">
          {/* <div> */}
          <div className="flex items-center justify-between h-20 ">
            <Image
              src="/logo.svg"
              alt="CodeQR.ma"
              width={150}
              height={150}
              objectFit="contain"
              className=" block"
            />

            <div className="flex items-center gap-4">
              <CartDropdown />
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-white hover:text-white/80 transition-colors "
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* </div> */}
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
