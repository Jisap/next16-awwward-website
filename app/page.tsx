import { ReactLenis } from "lenis/react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Awards from "@/components/Awards";
import Testimonials from "@/components/Testimonials";
import WorkWith from "@/components/WorkWith";

export default function Home() {
  return (
    <ReactLenis root>
      <Hero />
      <About />
      <Works />
      <Projects />
      <Process />
      <Awards />
      <Testimonials />
      <WorkWith />
    </ReactLenis>
  );
}
