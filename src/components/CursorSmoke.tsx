"use client";

import { useEffect, useRef, useState } from "react";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  targetSize: number;
  alpha: number;
  targetAlpha: number;
  r: number;
  g: number;
  b: number;
  life: number;
  maxLife: number;
}

interface SmokeCursorProps {
  color1?: string;
  color2?: string;
  particleCount?: number;
  enabled?: boolean;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }
  return { r: 0, g: 212, b: 255 };
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function SmokeCursor({
  color1 = "#00d4ff",
  color2 = "#7c3aed",
  particleCount = 150,
  enabled = true
}: SmokeCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile || !enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color1Rgb = hexToRgb(color1);
    const color2Rgb = hexToRgb(color2);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let lastX = 0;
    let lastY = 0;
    let velocity = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      velocity.x = (e.clientX - lastX) * 0.2;
      velocity.y = (e.clientY - lastY) * 0.2;
      lastX = e.clientX;
      lastY = e.clientY;
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);

    const createParticle = (x: number, y: number, vx: number, vy: number): SmokeParticle => {
      const useColor1 = Math.random() > 0.5;
      const rgb = useColor1 ? color1Rgb : color2Rgb;
      
      return {
        x: x + randomRange(-3, 3),
        y: y + randomRange(-3, 3),
        vx: vx * 0.3 + randomRange(-0.3, 0.3),
        vy: vy * 0.3 + randomRange(-0.3, 0.3),
        size: randomRange(8, 20),
        targetSize: randomRange(15, 35),
        alpha: 0,
        targetAlpha: randomRange(0.08, 0.18),
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        life: 0,
        maxLife: randomRange(40, 80),
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cursorRef.current.x = lerp(cursorRef.current.x, targetRef.current.x, 0.15);
      cursorRef.current.y = lerp(cursorRef.current.y, targetRef.current.y, 0.15);

      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      
      if (speed > 0.3 && particlesRef.current.length < particleCount) {
        const spawnCount = Math.min(3, Math.ceil(speed / 2));
        for (let i = 0; i < spawnCount; i++) {
          particlesRef.current.push(
            createParticle(
              cursorRef.current.x,
              cursorRef.current.y,
              velocity.x,
              velocity.y
            )
          );
        }
      }

      velocity.x *= 0.9;
      velocity.y *= 0.9;

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        
        p.life++;
        
        const lifeRatio = p.life / p.maxLife;
        
        if (lifeRatio < 0.2) {
          p.alpha = lerp(p.alpha, p.targetAlpha, 0.1);
          p.size = lerp(p.size, p.targetSize * 0.5, 0.08);
        } else if (lifeRatio > 0.6) {
          p.alpha = lerp(p.alpha, 0, 0.08);
        } else {
          p.alpha = lerp(p.alpha, p.targetAlpha, 0.05);
          p.size = lerp(p.size, p.targetSize, 0.03);
        }
        
        p.vx *= 0.96;
        p.vy *= 0.96;
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha < 0.005 || p.life > p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Small, subtle fog puff
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`);
        gradient.addColorStop(0.4, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, enabled, color1, color2, particleCount]);

  if (isMobile || !enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
