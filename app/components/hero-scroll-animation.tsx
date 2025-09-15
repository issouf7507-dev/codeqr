// component.tsx
"use client";

import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import React, { useRef, forwardRef } from "react";
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
          <div className="h-full sm:h-80 lg:h-full w-full relative group cursor-pointer ">
            <img
              src="/imgs/Photos_new_produits_47.png"
              alt="Plaque QR Code Google Avis"
              className="object-contain sm:object-cover w-full h-full rounded-md p-4 sm:p-0"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 rounded-md transition-all duration-500 flex items-center justify-center">
              <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 px-4 sm:px-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  Plaque QR Code
                </h3>
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">
                  Plaque professionnelle en PVC pour collecter vos avis Google
                  facilement
                </p>
                <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#40C49A]">
                  34,90€
                </p>
                <a
                  href="/produits"
                  className="inline-block bg-[#40C49A] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#40C49A]/80 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Acheter maintenant
                </a>
              </div>
            </div>
          </div>

          <div className="h-full sm:h-80 lg:h-full w-full relative group cursor-pointer">
            <img
              src="/imgs/16_1 (1).png"
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
                <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#40C49A]">
                  49,90€
                </p>
                <a
                  href="/produits"
                  className="inline-block bg-[#40C49A] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#40C49A]/80 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Acheter maintenant
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </motion.section>
  );
};

// const Section3: React.FC<SectionProps> = ({ scrollYProgress }) => {
//   return (
//     <motion.section className="min-h-screen bg-white text-black">
//       <div className="container mx-auto px-8">
//         {/* Statistiques */}
//         <div className="pt-20 pb-16">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
//               <p className="text-gray-600">Commerçants satisfaits</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-purple-600 mb-2">
//                 15k+
//               </div>
//               <p className="text-gray-600">Avis collectés</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
//               <p className="text-gray-600">Taux de satisfaction</p>
//             </div>
//           </div>
//         </div>

//         {/* Avantages */}
//         <div className="pb-16">
//           <h2 className="text-5xl leading-[100%] font-semibold tracking-tight text-black mb-16 text-center">
//             Pourquoi choisir CodeQR ?
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
//             <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg
//                   className="w-8 h-8 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-gray-900">
//                 Installation Rapide
//               </h3>
//               <p className="text-gray-600">
//                 Collez votre plaque QR Code et commencez à collecter des avis en
//                 quelques minutes seulement.
//               </p>
//             </div>

//             <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-lg transition-all duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg
//                   className="w-8 h-8 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-gray-900">
//                 Qualité Professionnelle
//               </h3>
//               <p className="text-gray-600">
//                 Plaques en PVC résistantes aux intempéries avec QR Code haute
//                 résolution pour une durabilité maximale.
//               </p>
//             </div>

//             <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg
//                   className="w-8 h-8 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-gray-900">
//                 Support Inclus
//               </h3>
//               <p className="text-gray-600">
//                 Configuration complète incluse avec support personnalisé pour
//                 optimiser votre collecte d'avis.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Témoignages */}
//         <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl mb-20">
//           <h2 className="text-4xl font-semibold text-center mb-12 text-gray-900">
//             Ils nous font confiance
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
//             <div className="bg-white p-8 rounded-2xl shadow-sm">
//               <div className="flex items-center mb-4">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className="w-5 h-5 fill-current"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "Depuis que j'ai installé ma plaque CodeQR, j'ai triplé le
//                 nombre d'avis Google pour mon restaurant. Mes clients adorent la
//                 simplicité !"
//               </p>
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                   M
//                 </div>
//                 <div className="ml-3">
//                   <p className="font-semibold text-gray-900">Marie Dubois</p>
//                   <p className="text-sm text-gray-500">
//                     Restaurant Le Petit Gourmet
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-sm">
//               <div className="flex items-center mb-4">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className="w-5 h-5 fill-current"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "Installation super facile et résultats immédiats ! La qualité
//                 de la plaque est excellente, même après 6 mois en extérieur."
//               </p>
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//                   P
//                 </div>
//                 <div className="ml-3">
//                   <p className="font-semibold text-gray-900">Pierre Martin</p>
//                   <p className="text-sm text-gray-500">Garage Auto Plus</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FAQ */}
//         <div className="py-16">
//           <h2 className="text-4xl font-semibold text-center mb-12 text-gray-900">
//             Questions Fréquentes
//           </h2>

//           <div className="max-w-3xl mx-auto space-y-6">
//             <div className="bg-gray-50 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                 Comment fonctionne le QR Code ?
//               </h3>
//               <p className="text-gray-600">
//                 Vos clients scannent simplement le QR Code avec leur smartphone,
//                 ils sont automatiquement redirigés vers votre page d'avis Google
//                 pour laisser leur commentaire en quelques secondes.
//               </p>
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                 La plaque résiste-t-elle aux intempéries ?
//               </h3>
//               <p className="text-gray-600">
//                 Oui ! Nos plaques sont fabriquées en PVC professionnel,
//                 résistantes à la pluie, au soleil et aux variations de
//                 température. Elles conservent leur qualité pendant des années.
//               </p>
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                 Combien de temps pour recevoir ma plaque ?
//               </h3>
//               <p className="text-gray-600">
//                 Après votre commande et configuration, vous recevez votre plaque
//                 sous 3-5 jours ouvrés avec la livraison gratuite en France
//                 métropolitaine.
//               </p>
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                 Puis-je modifier mon lien Google après ?
//               </h3>
//               <p className="text-gray-600">
//                 Absolument ! Vous pouvez modifier votre lien Google à tout
//                 moment depuis votre tableau de bord. Le QR Code s'adapte
//                 automatiquement.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* CTA Final */}
//         <div className="text-center py-20">
//           <h2 className="text-4xl font-bold text-gray-900 mb-6">
//             Prêt à booster vos avis clients ?
//           </h2>
//           <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
//             Rejoignez des centaines de commerçants qui utilisent déjà CodeQR
//             pour améliorer leur réputation en ligne.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <a
//               href="/produits"
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               Voir nos produits
//             </a>
//             <a
//               href="/a-propos"
//               className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
//             >
//               En savoir plus
//             </a>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

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
