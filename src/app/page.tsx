"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import SkillsRadarChart from "@/components/sections/SkillsRadarChart";
import CursorSmoke from "@/components/CursorSmoke";
import CodeRain from "@/components/CodeRain";
const ParallaxBackground = dynamic(
  () => import("@/components/ParallaxBackground"),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Run Lenis requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CodeRain />
      <CursorSmoke />
      <main className="bg-[#0e1322] min-h-screen text-[#dee1f7] font-sans selection:bg-[#00d4ff]/30 selection:text-[#00d4ff] relative ">
       <div
        className="absolute inset-[-10px] z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Parallax 3D developer character background */}
      <ParallaxBackground />

      {/* Subtle particle / 3D canvas layer on top of character */}
      {/* <div className="fixed inset-0 z-[1] pointer-events-none opacity-30 block md:block">
        <Scene3D />
      </div> */}
      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <About />
        <SkillsRadarChart />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
    </>
  );
}
