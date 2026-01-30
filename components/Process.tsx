"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

import { processItems } from "@/data/data"

export default function Process() {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Animación existente del título
    const textSplit = SplitText.create(".text", {
      type: "words,lines",
      linesClass: "overflow-hidden"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".process-wrapper",
        start: "top center"
      }
    });

    tl.from(textSplit.words, {
      yPercent: 100,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.03,
    });

    // NUEVA: Animación de entrada escalonada para las cards
    gsap.from(".process-card", {
      scrollTrigger: {
        trigger: ".process-cards-container",
        start: "top 80%",
      },
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    // NUEVA: Animación de rotación 3D en los iconos
    gsap.from(".icon-wrapper", {
      scrollTrigger: {
        trigger: ".process-cards-container",
        start: "top 80%",
      },
      rotationY: -90,
      rotationX: 45,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.7)",
      transformPerspective: 1000
    });

    // NUEVA: Efecto reveal en las descripciones
    const descSplit = SplitText.create(".process-description", {
      type: "lines",
      linesClass: "overflow-hidden"
    });

    gsap.from(descSplit.lines, {
      scrollTrigger: {
        trigger: ".process-cards-container",
        start: "top 75%",
      },
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      stagger: {
        each: 0.05,
        from: "start"
      },
      ease: "power2.out"
    });

    // NUEVA: Efecto magnético en los iconos
    const listeners: { el: HTMLElement, move: EventListener, leave: EventListener }[] = [];

    iconRefs.current.forEach((icon) => {
      if (!icon) return;

      const xTo = gsap.quickTo(icon, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(icon, "y", { duration: 0.6, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) * 0.15;
        const y = (e.clientY - centerY) * 0.15;
        xTo(x);
        yTo(y);
      };

      const onLeave = () => {
        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      };

      icon.addEventListener("mousemove", onMove as EventListener);
      icon.addEventListener("mouseleave", onLeave as EventListener);
      listeners.push({ el: icon, move: onMove as EventListener, leave: onLeave as EventListener });
    });

    return () => {
      listeners.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  },
    {
      scope: containerRef
    })

  return (
    <section className="section" ref={containerRef}>
      <div className="container">
        <div className="process-wrapper">
          <h2 className="section-title text">
            thoughtfull
          </h2>

          <div className="flex items-center gap-5">
            <h2 className="section-title text">process</h2>
            <p className="uppercase font-medium text">i think a lot about the process</p>
          </div>
        </div>
      </div>

      {/* Card Wrapper */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-24 lg:mt-28 process-cards-container">
        {processItems.map((item, index) => (
          <div key={item.id} className="border p-6 process-card">
            <div
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className="text-[200px] outlined-text uppercase leading-tight relative max-w-max mx-auto group icon-wrapper"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span>{item.icon}</span>
              <span className="absolute -top-2 -left-2 group-hover:top-0 group-hover:left-0 transition-all duration-400">
                {item.icon}
              </span>
              <span className="absolute -top-4 -left-4 group-hover:top-0 group-hover:left-0 transition-all duration-400">
                {item.icon}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <p className="text-neutral-500">{item.id}/</p>
                <h3 className="card-title">{item.title}</h3>
              </div>

              <p className="process-description">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
