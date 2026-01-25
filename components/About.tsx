"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

export default function About() {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const textSplit = SplitText.create(".text", {
      type: "words,lines",
      linesClass: "overflow-hidden"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-wrapper",
        start: "top center"
      }
    });

    tl.from(textSplit.words, {
      yPercent: 100,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.03,
    })
  },
    {
      scope: containerRef
    })


  return (
    <section className="pt-20 sm:pt-24" ref={containerRef}>
      <div className="container flex justify-end-safe">
        {/* wrapper */}
        <div className="max-w-5xl w-full about-wrapper">
          {/* text wrapper */}
          <div className="flex flex-col md:items-center md:flex-row">
            <p className="uppercase text-xl md:px-7 font-medium overflow-hidden text mb-2 sm:mb-0 text">
              About
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-5xl overflow-hidden text">
              Kai Novak is an independent
            </h2>
          </div>

          {/* text wrapper */}
          <div className="text-xl sm:text-2xl lg:text-5xl text">
            <p>
              designer focused on crafting immersive digital experiences.
              They believe every project is an opportunity to deliver a unique and
              memorable digital experience that deligghts users and build
              brand equity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )

}
