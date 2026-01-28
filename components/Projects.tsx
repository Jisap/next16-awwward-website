"use client"

import { projectItems } from "@/data/data";
import Image from "next/image";

export default function Projects() {
  return (
    <section className="section">
      <div className="container space-y-14 lg:space-y-20">
        {/* Title */}
        <div>
          <p className="uppercase font-medium">Recent Projects</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium max-w-2xl lg:max-w-4xl mt-2">
            Selected works that demonstrate our approach to digital craft.
          </h2>
        </div>

        {/* Wrapper */}
        <div className="divide-y divide-neutral-300 border-t border-neutral border-neutral-300 flex-1 max-w-[80%]">
          {projectItems.map((item) => (
            <div key={item.id} className="p-8 hover:bg-neutral-50 focus:bg-neutral-50 transition-all hover:pl-12 cursor-pointer relative">

              <h3 className="text-3xl font-medium sm:text-4xl lg:text-7xl relative z-10">
                {item.title}
              </h3>

              <div className="absolute top-0 left-0 pointer-events-none opacity-0 scale-50 z-20 max-w-60 w-full h-40">
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
