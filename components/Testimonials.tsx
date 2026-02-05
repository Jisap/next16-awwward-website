"use client"

import { gsap, useGSAP, SplitText } from "@/lib/gsap-util"
import { useRef } from "react";
import { testimonialsItems } from "@/data/data";
import Image from "next/image";



export default function Testimonials() {

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
    });

    // Array de todas las tarjetas de testimonios
    const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

    cards.forEach((card, i) => {
      // Solo animamos si NO es la última tarjeta
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,                  // La tarjeta actual se reduce al 90%
          opacity: 0,                  // La tarjeta actual se vuelve invisible
          duration: 1,                 // Duración de la animación
          ease: "none",                // Tipo de easing
          scrollTrigger: {             // Configuración del Disparador de la animación
            trigger: cards[i + 1],     // El trigger es la siguiente tarjeta
            start: "top 80%",          // Empieza cuando la SIGUIENTE tarjeta está al 80% de la altura (entrando por abajo)
            end: "top 10%",            // Termina cuando la SIGUIENTE tarjeta llega al 10% de la altura (cerca de arriba)
            scrub: true,               // Vincula la animación al scroll (true = sincronización suave)
          }
        });
      }
    });

  },
    {
      scope: containerRef
    })

  return (
    <section className="section overflow-visible" ref={containerRef}>
      <div className="container testimonials-container">
        {/* title */}
        <div className="sm:mx-auto mb-16 lg:mb-24">
          <div className="flex gap-5 items-end">
            <h2 className="section-title">What</h2>

            <p className="max-w-60 uppercase font-medium hidden md:block">
              Over time, some of them have become friends
            </p>
          </div>

          <h2 className="section-title">People Say</h2>

          <p className="maxw-w96 uppercase font-medium mt-2 md:hidden">
            Over time, some of them have become friends
          </p>
        </div>

        {/* wrapper */}
        <div className="flex flex-col gap-0">
          {testimonialsItems.map((item, index) => (
            <div
              key={item.id}
              className="testimonial-card sticky top-0 md:top-[10%] w-full bg-white border-b border-x first:border-t will-change-transform transform-gpu"
            >
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-center p-6 lg:p-12 min-h-[60vh]">
                <div className="max-w-115 w-full h-[300px] lg:h-[500px] mx-auto overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={640}
                    height={965}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:pl-10">
                  <div className="grid grid-cols-2 py-5 gap-y-6 gap-x-4 border-b border-neutral-200 mb-8">
                    <p className="text-sm uppercase text-neutral-500">
                      <span className="font-bold text-neutral-900 block">name: </span>
                      {item.name}
                    </p>
                    <p className="text-sm uppercase text-neutral-500">
                      <span className="font-bold text-neutral-900 block">role: </span>
                      {item.role}
                    </p>
                    <p className="text-sm uppercase text-neutral-500">
                      <span className="font-bold text-neutral-900 block">company: </span>
                      {item.company}
                    </p>
                    <p className="text-sm uppercase text-neutral-500">
                      <span className="font-bold text-neutral-900 block">project: </span>
                      {item.project}
                    </p>
                  </div>

                  <p className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-light italic">
                    "{item.desc}"
                  </p>
                </div>
              </div>

              {/* Counter and Navigation */}
              <div className="flex justify-end items-center p-6 border-t border-neutral-100 bg-neutral-50/50">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">0{index + 1} / 0{testimonialsItems.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
