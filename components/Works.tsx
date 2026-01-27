"use client"

import { workSecItems } from "@/data/data";
import Image from "next/image";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

export default function Works() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // 1. Animación del título principal de la sección
    const headerSplit = SplitText.create(".section-header-text", {
      type: "words,lines",
      linesClass: "overflow-hidden"
    });

    gsap.from(headerSplit.words, {
      yPercent: 100,
      ease: "power3.out",
      duration: 1,
      stagger: 0.02,
      scrollTrigger: {
        trigger: ".works-wrapper",
        start: "top 80%",
      }
    });

    // 2. Animación individual para cada item del portafolio
    const workItems = gsap.utils.toArray(".work-item") as HTMLElement[];

    workItems.forEach((item) => {
      const img = item.querySelector(".section-img");
      const texts = item.querySelectorAll(".text-reveal");

      // Creamos un timeline para cada item
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%", // Empieza cuando el item está cerca del fondo
          toggleActions: "play none none none"
        }
      });

      // Animación de la imagen (revelación con clipPath)
      tl.to(img, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power4.inOut"
      }, 0);

      // Efecto de levantamiento de la imagen
      tl.from(img, {
        y: 50,
        duration: 1.2,
        ease: "power4.out"
      }, 0);

      // Animación de los textos del item
      const itemSplit = SplitText.create(texts as any, {
        type: "words",
      });

      tl.from(itemSplit.words, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8");
    });

  }, { scope: containerRef });

  return (
    <section className="section overflow-hidden" ref={containerRef}>
      <div className="container">
        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-6 works-wrapper mb-24 lg:mb-36">
          <div>
            <h2 className="section-title section-header-text">selected</h2>
            <h2 className="section-title section-header-text">Work</h2>
          </div>

          <div className="sm:text-2xl uppercase font-medium section-header-text">
            <p>selected</p>
            <p>Works and Projects</p>
          </div>
        </div>

        {/* Proyectos */}
        <div className="space-y-32 lg:space-y-44 work-section-wrapper">
          {workSecItems.map((item) => (
            <div
              key={item.id}
              className="work-item flex flex-col lg:flex-row lg:justify-center lg:items-center gap-6 lg:gap-8 xl:gap-16 group"
            >
              {/* Content */}
              <div className="space-y-1.5 order-2 lg:order-0">
                <div className="overflow-hidden">
                  <h3 className="text-4xl uppercase font-medium text-reveal">{item.title}</h3>
                </div>
                <div className="overflow-hidden">
                  <p className="max-w-md text-reveal">{item.text}</p>
                </div>
              </div>

              {/* Image Container */}
              <div
                className="lg:group-nth-[2]:order-first section-img shrink-0"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Empieza cerrada
                  willChange: "clip-path, transform"
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={583}
                  height={260}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
