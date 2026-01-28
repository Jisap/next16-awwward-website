"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

import { projectItems } from "@/data/data";
import Image from "next/image";

export default function Projects() {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const textSplit = SplitText.create(".text", {
      type: "words,lines",
      linesClass: "overflow-hidden"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-wrapper",
        start: "top 60%"
      }
    });

    tl.from(textSplit.words, {
      yPercent: 100,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.03,
    });

    projectRef.current.forEach((item) => {
      if (!item) return;
      const imageWrapper = item.querySelector(".project-img");
      if (!imageWrapper) return;

      const xTo = gsap.quickTo(imageWrapper, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(imageWrapper, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const { left, top } = rect;
        const x = e.clientX - left - 150;
        const y = e.clientY - top - 125;
        xTo(x);
        yTo(y);
      }

      const onEnter = () => {
        gsap.to(imageWrapper, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3
        });
      }

      const onLeave = () => {
        gsap.to(imageWrapper, {
          autoAlpha: 0,
          scale: 0.5,
          duration: 0.3
        });
      }

      item.addEventListener("mousemove", onMove as EventListener);
      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);

      return () => {
        item.removeEventListener("mousemove", onMove as EventListener);
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      }
    })
  },
    {
      scope: containerRef
    })

  return (
    <section className="section" ref={containerRef}>
      <div className="container space-y-14 lg:space-y-20">
        {/* Title */}
        <div className="projects-wrapper">
          <p className="uppercase font-medium text">Recent Projects</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium max-w-2xl lg:max-w-4xl mt-2 text">
            Selected works that demonstrate our approach to digital craft.
          </h2>
        </div>

        {/* Wrapper */}
        <div className="divide-y divide-neutral-300 border-t border-neutral border-neutral-300 flex-1 max-w-[80%]">
          {projectItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                projectRef.current[item.id] = el;
              }}
              className="p-8 hover:bg-neutral-50 focus:bg-neutral-50 transition-all hover:pl-12 cursor-pointer relative"
            >

              <h3 className="text-3xl font-medium sm:text-4xl lg:text-7xl relative z-10">
                {item.title}
              </h3>

              <div className="absolute top-0 left-0 pointer-events-none opacity-0 scale-50 z-20 max-w-60 w-full h-40 project-img">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
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
