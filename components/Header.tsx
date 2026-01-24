"use client"

import { navItems } from "@/data/data";
import Link from "next/link";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap-util";



export default function Header() {

  useGSAP(() => {
    const showAnim = gsap
      .timeline({ paused: true })
      .fromTo(".header", {
        yPercent: 0, // Initial position
      },
        {
          yPercent: -100, // Final position
          duration: 0.3,
          ease: "power2.inOut"
        });

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === 1 ? showAnim.play() : showAnim.reverse();
      }
    })
  }, [])

  return (
    <header className="sticky top-0 left-0 bg-white/40 backfrop-blur-md w-full py-4 z-50 header">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl sm:text-3xl">
          Novak
        </Link>

        {/* Nav list */}
        <nav className="flex items-center gap-5">
          <ul className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="uppercase font-medium hover:opacity-75 transition-opacity">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className="bg-neutral-900 text-white uppercase px-5 py-3 rounded-lg hover:opacity-85 focus:opacity-85 transition-opacity hidden md:block">
            Watch tutorial
          </button>
        </nav>
      </div>
    </header>
  );
}
