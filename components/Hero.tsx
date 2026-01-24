"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

export default function Hero() {

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const textsplit = SplitText.create(".text", { // Prepara el texto para animarlo
      type: "words",
      linesClass: "text-line"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-wrapper",
        start: "top center"        // Cuando la parte superior llegue al centro empieza la animacion
      }
    });

    tl.from(textsplit.words, {
      yPercent: 100,               // Al principio estan desplazadas un 100% abajo
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.03,
    })
  }, [containerRef]);

  return (
    <section className="py-20 lg:py-28" ref={containerRef}>
      <div className="container flex flex-col">
        {/* wrapper */}
        <div className="hero-wrapper">
          <h1 className="hero-title text">
            building
          </h1>

          <h2 className="hero-title text">
            impactful
          </h2>

          <div className="flex items-center gap-6">
            <h2 className="hero-title text">
              digital
            </h2>

            <div className="font-medium tracking-wider uppercase -space-y-1 sm:text-2xl text-neutral-800 hidden sm:block">
              <p className="hero-text text">freelancer</p>
              <p className="hero-text text">digital designer</p>
              <p className="hero-text text">webflow expert</p>
            </div>
          </div>

          {/* text */}
          <h2 className="hero-title text mb-2.5">
            presence
          </h2>

          {/* sm text */}
          <div className="font-medium tracking-wider uppercase -space-y-1 sm:text-2xl text-neutral-800  sm:hidden">
            <p className="hero-text text">freelancer</p>
            <p className="hero-text text">digital designer</p>
            <p className="hero-text text">webflow expert</p>
          </div>
        </div>
      </div>
    </section>
  );
}
