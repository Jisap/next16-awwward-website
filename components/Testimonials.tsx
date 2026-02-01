"use client"

import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/gsap-util"
import { useRef } from "react";
import { testimonialsItems } from "@/data/data";
import Image from "next/image";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";



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
    })
  },
    {
      scope: containerRef
    })

  return (
    <section className="section">
      <div className="container">
        {/* title */}
        <div className="sm:mx-auto">
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
        <div className="border mt-16 lg:mt-24">
          {testimonialsItems.map((item) => (
            <div key={item.id} className="divide-y">
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-center p-6">
                <div className="max-w-115 w-full h-80 mx-auto">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={640}
                    height={965}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="border-t lg:border-l lg:border-t-0 lg:pl-5">
                  <div className="flex flex-wrap py-5 px-2.5 gap-3 justify-between">
                    <p className="text-lg uppercase">
                      <span className="font-medium">name: </span>
                      {item.name}
                    </p>
                    <p className="text-lg uppercase">
                      <span className="font-medium">role: </span>
                      {item.role}
                    </p>
                    <p className="text-lg uppercase">
                      <span className="font-medium">company: </span>
                      {item.company}
                    </p>
                    <p className="text-lg uppercase">
                      <span className="font-medium">project: </span>
                      {item.project}
                    </p>
                  </div>

                  <p className="text-xl sm:text-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>


              <div className="flex justify-between items-center">
                <button>
                  <ArrowBigLeft size={40} className="text-neutral-900 hover:fill-neutral-900 transition-colors" />
                </button>

                <span>01/05</span>

                <button>
                  <ArrowBigRight size={40} className="text-neutral-900 hover:fill-neutral-900 transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
