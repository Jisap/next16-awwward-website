"use client"

import { useRef } from "react";
import { companyLogos } from "@/data/data";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkWith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Reveal text
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
      },
    });

    // Fade in marquees
    gsap.from(".marquee-row", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, { scope: containerRef });

  // Split logos for two rows or just use same for both
  const row1 = companyLogos;
  const row2 = [...companyLogos].reverse();

  return (
    <section
      ref={containerRef}
      className="py-20 mb-0 md:mb-[70vh] overflow-hidden"
    >
      <div className="container">
        <p
          ref={textRef}
          className="text-sm sm:text-base lg:text-lg font-medium text-center uppercase mb-16 tracking-[0.2em] text-neutral-700"
        >
          Worked with some of the best out there
        </p>

        {/* Marquee Wrapper with Mask */}
        <div className="relative">
          {/* Gradient Mask Overlay */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col gap-12 lg:gap-16">
            {/* Row 1: Moving Left */}
            <div className="marquee-row">
              <Marquee
                autoFill={true}
                speed={40}
                gradient={false}
              >
                {row1.map((logo) => (
                  <div className="px-10 lg:px-20 group transition-all duration-500" key={logo.id}>
                    <Image
                      src={logo.icon}
                      alt="company logo"
                      width={160}
                      height={45}
                      className="w-auto h-8 lg:h-10 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Row 2: Moving Right */}
            <div className="marquee-row">
              <Marquee
                autoFill={true}
                speed={35}
                direction="right"
                gradient={false}
              >
                {row2.map((logo) => (
                  <div className="px-10 lg:px-20 group transition-all duration-500" key={`row2-${logo.id}`}>
                    <Image
                      src={logo.icon}
                      alt="company logo"
                      width={160}
                      height={45}
                      className="w-auto h-8 lg:h-10 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
