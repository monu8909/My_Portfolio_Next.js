"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxBackground() {
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame: number;
    let currentY = 0;
    let targetY = 0;

    const handleScroll = () => {
      targetY = window.scrollY;
    };

    const animate = () => {
      // Smooth lerp
      currentY += (targetY - currentY) * 0.07;

      if (imageRef.current) {
        // Character moves DOWN with scroll at 30% speed — stays visible throughout page
        // Positive = moves down, so character "follows" scroll slowly, always in view
        const parallaxY = currentY * 0.3;
        const scale = 1 + currentY * 0.00006;
        imageRef.current.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
      }

      if (glowRef.current) {
        const glowY = currentY * 0.2;
        glowRef.current.style.transform = `translateY(${glowY}px)`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Dark overlay — keeps text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1322]/75 via-[#0e1322]/55 to-[#0e1322]/80 z-10" />

      {/* Glow orb — behind character, moves slower */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[5] flex items-end justify-end will-change-transform"
        style={{ transition: "none" }}
      >
        <div
          style={{
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #00d4ff 0%, #7b5ea7 40%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.18,
            animation: "pulse-glow 6s ease-in-out infinite",
            marginBottom: "-100px",
            marginRight: "-100px",
          }}
        />
      </div>

      {/* 3D Character — anchored bottom-right, follows scroll downward */}
      <div
        ref={imageRef}
        className="absolute will-change-transform"
        style={{
          /* Start at bottom-right, offset so it's partially visible */
          bottom: "-40px",
          right: "-20px",
          width: "min(85vw, 780px)",
          height: "min(85vw, 780px)",
          transformOrigin: "bottom right",
          transition: "none",
          animation: "float-bob 8s ease-in-out infinite",
        }}
      >
        <Image
          src="/developer-3d.png"
          alt="3D Developer"
          fill
          style={{ objectFit: "contain", objectPosition: "bottom right" }}
          priority
          quality={95}
        />
      </div>

      {/* Radial vignette — darkens edges so character blends in */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 75% 80%, transparent 40%, #0e1322 100%)",
        }}
      />

      {/* Subtle scanlines */}
      <div
        className="absolute inset-0 z-20 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.06) 2px,
            rgba(255,255,255,0.06) 4px
          )`,
        }}
      />

      <style jsx>{`
        @keyframes float-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
