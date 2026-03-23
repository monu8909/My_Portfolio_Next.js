"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 pointer-events-none"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true, area: 900 } },
          color: { value: ["#00d4ff", "#7c3aed", "#a8e8ff"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.12,
            random: true,
            animation: { enable: true, speed: 0.5, minimumValue: 0.05, sync: false },
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#00d4ff",
            opacity: 0.05,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
