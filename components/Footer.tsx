"use client"

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [time, setTime] = useState("");

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Parallax Reveal of elements
    gsap.from(".footer-content", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      }
    });

    // Background text movement (subtle scale instead of horizontal shift)
    gsap.fromTo(".bg-outlined-text",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        }
      }
    );

    // Let's Chat animation
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = text.split("").map(char =>
        `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`
      ).join("");

      gsap.from(".char", {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
        }
      });
    }

    // Magnetic effect for links
    const magneticElements = gsap.utils.toArray<HTMLElement>(".magnetic", container.current);
    magneticElements.forEach((el) => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(el, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, { scope: container });

  return (
    <footer
      ref={container}
      className="bg-neutral-900 text-white min-h-[80vh] md:h-[70vh] relative md:fixed md:bottom-0 w-full overflow-hidden z-0"
    >
      {/* Background Outlined Text - Strictly behind everything */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-50 z-[-1] px-[2vw]">
        <h2 className="bg-outlined-text text-[28vw] md:text-[22vw] font-bold uppercase footer-outlined-text tracking-tighter flex justify-between w-full leading-none">
          {"KANENOVAK".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h2>
      </div>

      <div className="container relative z-10 py-12 md:py-20 flex flex-col justify-between min-h-full">
        {/* Top Section */}
        <div className="footer-content flex flex-col items-center justify-center flex-1 text-center mb-16 md:mb-12">
          <div className="overflow-hidden">
            <h3
              ref={titleRef}
              className="text-[18vw] md:text-[12vw] leading-none font-medium uppercase tracking-tighter whitespace-nowrap"
            >
              Let's chat
            </h3>
          </div>

          <div className="mt-8 md:mt-12 magnetic cursor-pointer group">
            <a
              href="mailto:hello@Novak.com"
              className="px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/20 hover:border-white transition-colors text-lg md:text-xl uppercase tracking-widest inline-block overflow-hidden relative"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Get in touch</span>
              <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-white/20 mx-auto md:w-full md:bg-white/10" />

        {/* Bottom Section */}
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 items-center md:items-end pt-10 md:pt-8 bg-transparent">
          {/* Info */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex gap-12 md:gap-8">
              <div className="grid gap-2 md:gap-1 text-center md:text-left">
                <span className="text-[10px] uppercase opacity-40 mb-2 font-semibold tracking-wider">Navigation</span>
                {["home", "work", "contact"].map((label) => (
                  <a href="#" className="uppercase text-xs md:text-sm hover:opacity-100 opacity-60 transition-opacity" key={label}>{label}</a>
                ))}
              </div>
              <div className="grid gap-2 md:gap-1 text-center md:text-left">
                <span className="text-[10px] uppercase opacity-40 mb-2 font-semibold tracking-wider">Socials</span>
                {["instagram", "linkedin", "awwwards"].map((label) => (
                  <a href="#" className="uppercase text-xs md:text-sm hover:opacity-100 opacity-60 transition-opacity" key={label}>{label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Clock & Location */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[10px] uppercase opacity-40 font-semibold tracking-wider">Local Time</span>
            <div className="text-xl md:text-2xl font-light tracking-widest tabular-nums flex items-baseline">
              {time} <span className="text-[10px] ml-1 opacity-50 font-normal">GMT+1</span>
            </div>
            <p className="text-[10px] md:text-xs opacity-60 font-medium">Based worldwide — Working remotely</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end space-y-4">
            <p className="max-w-[200px] text-[10px] md:text-xs opacity-40 leading-relaxed hidden md:block">
              We design and build thoughtful digital experiences focused on clarity and impact.
            </p>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-xs opacity-60">
                &copy; Kane & Novak {new Date().getFullYear()}
              </p>
              <p className="text-[10px] uppercase opacity-40 tracking-widest mt-1">
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
