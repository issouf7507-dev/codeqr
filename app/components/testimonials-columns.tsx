"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: any;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                ({ text, image, name, role }: any, i: any) => (
                  <div
                    className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border shadow-lg shadow-[#40C49A]/10 max-w-xs w-full"
                    key={i}
                  >
                    <div className="text-sm sm:text-base leading-relaxed">
                      {text}
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-5">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="font-medium tracking-tight leading-5 text-sm sm:text-base truncate">
                          {name}
                        </div>
                        <div className="leading-5 opacity-60 tracking-tight text-xs sm:text-sm truncate">
                          {role}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
