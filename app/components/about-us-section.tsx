"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  Variants,
} from "framer-motion";

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <Pen className="w-6 h-6" />,
      secondaryIcon: (
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#019090]" />
      ),
      title: "Conception",
      description:
        "Nous concevons des plaques QR Code personnalisées adaptées à votre identité visuelle et à vos besoins spécifiques pour maximiser l'impact sur vos clients.",
      position: "left",
    },
    {
      icon: <Home className="w-6 h-6" />,
      secondaryIcon: (
        <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#019090]" />
      ),
      title: "Fabrication",
      description:
        "Nos plaques sont fabriquées avec des matériaux premium (PVC professionnel) garantissant une durabilité exceptionnelle même en extérieur.",
      position: "left",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      secondaryIcon: (
        <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#019090]" />
      ),
      title: "Configuration",
      description:
        "Notre équipe configure votre QR Code avec votre lien Google Avis et vous accompagne dans l'activation pour une utilisation immédiate.",
      position: "left",
    },
    {
      icon: <PaintBucket className="w-6 h-6" />,
      secondaryIcon: (
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#019090]" />
      ),
      title: "Livraison",
      description:
        "Livraison gratuite en France métropolitaine sous 3-5 jours ouvrés avec suivi de votre commande et emballage soigné.",
      position: "right",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      secondaryIcon: (
        <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#019090]" />
      ),
      title: "Support",
      description:
        "Support client dédié pour vous accompagner dans l'installation, la configuration et l'optimisation de votre collecte d'avis Google.",
      position: "right",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: (
        <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#019090]" />
      ),
      title: "Suivi",
      description:
        "Tableau de bord personnalisé pour suivre les performances de vos QR Codes et analyser l'efficacité de votre collecte d'avis.",
      position: "right",
    },
  ];

  const stats = [
    {
      icon: <Award />,
      value: 500,
      label: "Commerçants Satisfaits",
      suffix: "+",
    },
    { icon: <Users />, value: 15000, label: "Avis Collectés", suffix: "+" },
    { icon: <Calendar />, value: 3, label: "Années d'Expérience", suffix: "" },
    {
      icon: <TrendingUp />,
      value: 98,
      label: "Taux de Satisfaction",
      suffix: "%",
    },
  ];

  return (
    <>
      <section
        id="about-section"
        ref={sectionRef}
        className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8  bg-white text-black overflow-hidden relative"
      >
        {/* Decorative background elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#019090]/5 blur-3xl"
          style={{ y: y1, rotate: rotate1 }}
          // variants={itemVariants}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#019090]/5 blur-3xl"
          style={{ y: y2, rotate: rotate2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#019090]/30"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#019090]/30"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="container mx-auto max-w-6xl relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col items-center mb-6"
            variants={itemVariants as Variants}
          >
            <motion.span
              className="text-[#019090] font-medium mb-2 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              DÉCOUVREZ NOTRE HISTOIRE
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">
              À Propos de CodeQR
            </h2>
            <motion.div
              className="w-24 h-1 bg-[#019090]"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </motion.div>

          <motion.p
            className="text-center max-w-2xl mx-auto mb-16 text-black/80"
            variants={itemVariants as Variants}
          >
            CodeQR est née de la volonté de simplifier la collecte d'avis Google
            pour les commerçants. Nous concevons et fabriquons des solutions QR
            Code innovantes qui transforment l'expérience client et boostent la
            réputation en ligne des entreprises avec élégance et efficacité.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Left Column */}
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {services
                .filter((service) => service.position === "left")
                .map((service, index) => (
                  <ServiceItem
                    key={`left-${index}`}
                    icon={service.icon}
                    secondaryIcon={service.secondaryIcon}
                    title={service.title}
                    description={service.description}
                    variants={itemVariants}
                    delay={index * 0.2}
                    direction="left"
                  />
                ))}
            </div>

            {/* Center Image */}
            <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
              <motion.div
                className="relative w-full max-w-xs"
                variants={itemVariants as Variants}
              >
                <motion.div
                  className="rounded-md overflow-hidden shadow-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <img
                    src="/imgs/Plaque google descriptif 2.png"
                    alt="Plaque QR Code CodeQR"
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#202e44]/50 to-transparent flex items-end justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <motion.a
                      href="/plaque-avis-google-nfc/produits"
                      className="bg-[#019090] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[#019090]/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Nos Produits <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 border-4 border-[#A9BBC8] rounded-md -m-3 z-[-1]"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                ></motion.div>

                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#019090]/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  style={{ y: y1 }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#019090]/15"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  style={{ y: y2 }}
                ></motion.div>

                {/* Additional decorative elements */}
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#019090]"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#019090]"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                ></motion.div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {services
                .filter((service) => service.position === "right")
                .map((service, index) => (
                  <ServiceItem
                    key={`right-${index}`}
                    icon={service.icon}
                    secondaryIcon={service.secondaryIcon}
                    title={service.title}
                    description={service.description}
                    variants={itemVariants}
                    delay={index * 0.2}
                    direction="right"
                  />
                ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-12 sm:mt-16 lg:mt-20 bg-[#019090] text-white p-6 sm:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-medium mb-2">
                Prêt à booster vos avis clients ?
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                Découvrez nos solutions QR Code personnalisées dès aujourd'hui.
              </p>
            </div>
            <motion.a
              href="/plaque-avis-google-nfc/produits"
              className="bg-white text-[#019090] hover:bg-gray-100 px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: {
    hidden: { opacity: number; y?: number };
    visible: {
      opacity: number;
      y?: number;
      transition: { duration: number; ease: string };
    };
  };
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  variants,
  delay,
  direction,
}: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants as Variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#019090] bg-[#019090]/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-[#019090]/20 relative"
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-black group-hover:text-[#019090] transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-black/80 leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-[#019090] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  return (
    <motion.div
      className="bg-white/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4 text-[#019090] group-hover:bg-[#019090]/10 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="text-3xl font-bold text-black flex items-center"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-black/70 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#019090] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}
