// component.tsx
"use client";

import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import React, { useRef, forwardRef, useState, useEffect } from "react";
import ButtonUi from "./button-ui";

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky  font-semibold top-0 h-screen bg-white flex flex-col items-center justify-center text-black"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0"></div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-4 sm:px-8 font-semibold text-center tracking-tight leading-[120%]">
        {/* An Hero section Animation <br /> Scroll Please 👇 */}
        Boostez vos avis clients <br />
        avec nos solutions QR Code
      </h1>

      <div className=" mt-10">
        <ButtonUi />
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          // Adapter les données pour l'affichage
          const adaptedProducts = data.map((product: any, index: number) => ({
            ...product,
            price: `${product.price.toFixed(2).replace(".", ",")}€`,
            originalPrice: index === 0 ? "49,90€" : "69,90€", // Prix barrés pour l'affichage
            popular: index === 0, // Le premier produit est populaire
            badge: index === 0 ? "Le plus populaire" : "Premium",
          }));
          setProducts(adaptedProducts);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative  h-screen bg-white text-black "
    >
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div> */}
      <article className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[100%] py-6 sm:py-10 font-semibold tracking-tight">
          Nos produits
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {products.map((product) => (
            <div
              className="h-full sm:h-80 lg:h-full w-full relative group cursor-pointer "
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-contain sm:object-cover w-full h-full rounded-md p-4 sm:p-0"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 rounded-md transition-all duration-500 flex items-center justify-center">
                <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 px-4 sm:px-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">
                    {product.description}
                  </p>
                  <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#019090]">
                    {product.price}
                  </p>
                  <a
                    href={`/produit/${product.id}`}
                    className="inline-block bg-[#019090] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#019090]/80 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    Voir les détails
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="h-full sm:h-80 lg:h-full w-full relative group cursor-pointer">
            <img
              src="/imgs/Carte Google_.png"
              alt="Carte QR Code Google Avis"
              className="object-contain sm:object-cover w-full rounded-md h-full p-4 sm:p-0"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 rounded-md transition-all duration-500 flex items-center justify-center">
              <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 px-4 sm:px-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  Carte QR Code
                </h3>
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">
                  Carte compacte et pratique pour vos clients nomades
                </p>
                <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#019090]">
                  49,90€
                </p>
                <a
                  href="/produits"
                  className="inline-block bg-[#019090] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#019090]/80 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Acheter maintenant
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </article>
    </motion.section>
  );
};

const Component = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <main ref={container} className="relative h-[200vh] bg-black">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />

        {/* <Section3 scrollYProgress={scrollYProgress} /> */}

        {/* Footer */}
      </main>
    </>
  );
});

Component.displayName = "Component";

export default Component;
