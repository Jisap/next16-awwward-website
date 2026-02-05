"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";
import { testimonialsItems } from "@/data/data";
import Image from "next/image";



export default function Testimonials() {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Refresh ScrollTrigger when everything is loaded to avoid calculation errors
    const refreshScrollers = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScrollers);

    // Animación del título
    const titles = gsap.utils.toArray(".section-title");
    titles.forEach((title: any) => {
      const textSplit = new SplitText(title, {
        type: "words,lines",
        linesClass: "overflow-hidden"
      });

      gsap.from(textSplit.words, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });
    });

    // Array de todas las tarjetas de testimonios
    const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.2,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 60%",
            end: "top 20%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    // For producción: doble refresh con retardos para asegurar que el DOM y fuentes estén listos
    const timer1 = setTimeout(refreshScrollers, 100);
    const timer2 = setTimeout(refreshScrollers, 1500);

    return () => {
      window.removeEventListener("load", refreshScrollers);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, { scope: containerRef });

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
