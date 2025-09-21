"use client";

import React from "react";

export default function ButtonUi() {
  return (
    <>
      <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
      <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
        <a
          href="/produits"
          className="px-8 text-sm py-3 text-white rounded-full font-medium bg-[#019090] backdrop-blur block text-center hover:bg-[#019090]/80 transition-colors"
        >
          DÉCOUVRIR NOS PRODUITS
        </a>
      </div>
    </>
  );
}
