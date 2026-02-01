"use client"

import { awards } from "@/data/data"
import Image from "next/image"
import { gsap, useGSAP, SplitText } from "@/lib/gsap-util"
import { useRef } from "react";

export default function Awards() {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const textSplit = SplitText.create(".text", { // elementos a animar
      type: "words,lines",
      linesClass: "overflow-hidden"
    });

    const tl = gsap.timeline({ // Disparador de animación
      scrollTrigger: {
        trigger: ".awards-wrapper",
        start: "top center"
      }
    });

    tl.from(textSplit.words, { // animacion de entrada
      yPercent: 100,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.03,
    })

    // Staggered entrance for award containers
    tl.from(".award-column", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.8")

    // Fluid floating animation for images
    gsap.to(".award-item", {
      y: (index) => index % 2 === 0 ? 15 : -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "start"
      }
    });

  },
    {
      scope: containerRef
    })

  return (
    <section className="section" ref={containerRef}>
      <div className="">
        {/* Title */}
        <div className="container awards-wrapper">
          <h2 className="section-title text">Awards &</h2>
          <h2 className="section-title text">Recognition</h2>
        </div>

        {/* Wrapper */}
        <div className="flex items-center gap-7 overflow-hidden mt-16 py-16 justify-center">
          {awards.map((award) => (
            <div
              key={award.id}
              className="shrink-0 odd:-mt-8 lg:odd:-mt-18 award-column"
            >
              <div className="award-item transition-transform duration-500 hover:scale-110 cursor-pointer">
                <Image
                  src={award.img}
                  alt={award.id.toString()}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
