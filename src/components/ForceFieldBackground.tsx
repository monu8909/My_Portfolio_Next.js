"use client";

import React, { useEffect, useRef } from "react";

interface ForceFieldBackgroundProps {
  hue?: number;
  spacing?: number;
  forceStrength?: number;
  magnifierRadius?: number;
  friction?: number;
  restoreSpeed?: number;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

export const ForceFieldBackground: React.FC<ForceFieldBackgroundProps> = ({
  hue = 210,
  spacing = 20,
  forceStrength = 12,
  magnifierRadius = 200,
  friction = 0.92,
  restoreSpeed = 0.04,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = [];

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          particles.current.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particleColor = `hsla(${hue}, 80%, 60%, 0.5)`;
      ctx.fillStyle = particleColor;

      particles.current.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < magnifierRadius) {
          const force = (magnifierRadius - dist) / magnifierRadius;
          const angle = Math.atan2(dy, dx);
          
          // Repulsion force
          p.vx -= Math.cos(angle) * force * forceStrength;
          p.vy -= Math.sin(angle) * force * forceStrength;
        }

        // Return force
        p.vx += (p.originX - p.x) * restoreSpeed;
        p.vy += (p.originY - p.y) * restoreSpeed;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Optional: draw lines between nearby particles for a "mesh" effect
        // However, the prompt implies "particle system background", so dots are fine.
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    init();
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hue, spacing, forceStrength, magnifierRadius, friction, restoreSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full bg-[#050505]"
      style={{ touchAction: "none" }}
    />
  );
};
