"use client"

import { workSecItems } from "@/data/data";
import Image from "next/image";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

export default function Works() {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const textSplit = SplitText.create(".text", {
      type: "words,lines",
      linesClass: "overflow-hidden"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-wrapper",
        start: "top 60%"
      }
    });

    tl.from(textSplit.words, {
      yPercent: 100,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.03,
    });

    gsap.to(".section-img", {
      duration: 1,
      stagger: 1,
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      scrollTrigger: {
        trigger: ".work-section-wrapper",
        start: "top center",
        markers: true
      }
    })
  },
    {
      scope: containerRef
    })

  return (
    <section className="section" ref={containerRef}>
      <div className="container">
        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-6 works-wrapper">
          {/* Text wrapper */}
          <div>
            <h2 className="section-title text">selected</h2>
            <h2 className="section-title text">Work</h2>
          </div>

          {/* Text wrapper */}
          <div className="sm:text-2xl uppercase font-medium">
            <p className="text">selected</p>
            <p className="text">Works and Projects</p>
          </div>
        </div>

        {/* Wrapper */}
        <div className="space-y-32 lg:space-y-44 mt-24 lg:mt-36 work-section-wrapper">
          {workSecItems.map((item) => (
            <div key={item.id} className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-6 lg:gap-8 xl:gap-16 group">
              {/* Content */}
              <div className="space-y-1.5">
                <h3 className="text-4xl uppercase font-medium text">{item.title}</h3>
                <p className="max-w-md text">{item.text}</p>
              </div>

              {/* Image */}
              <div
                className="lg:group-nth-[2]:order-first section-img"
                style={{
                  clipPath: "polygon(0% 0%,0% 0%,0% 100%,0% 100%)"
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={583}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
