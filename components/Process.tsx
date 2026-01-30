"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";

import { processItems } from "@/data/data"

export default function Process() {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
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
    })
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-24 lg:mt-28">
        {processItems.map(item => (
          <div key={item.id} className="border p-6">
            <div className="text-[200px] outlined-text uppercase leading-tight relative max-w-max mx-auto group">
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

              <p>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
