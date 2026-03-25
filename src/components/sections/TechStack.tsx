"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { techStack } from "@/lib/data";

function TechCard({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: x * 12, y: y * 12 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d", perspective: 600 }}
        className="glass-card p-6 flex flex-col items-center gap-3 cursor-default group"
      >
        <div
          className="text-4xl transition-transform duration-300 group-hover:scale-110"
          style={{ color: tech.color, filter: `drop-shadow(0 0 12px ${tech.color}60)` }}
        >
          <tech.icon />
        </div>
        <h3 className="font-bold font-display text-[#dee1f7] group-hover:text-[#00d4ff] transition-colors">
          {tech.name}
        </h3>
        <p className="text-xs text-[#bbc9cf] text-center">{tech.description}</p>
        <div
          className="mt-1 w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
          style={{ background: tech.color }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="stack" className="relative py-32 bg-transparent">
      <div className="orb orb-cyan w-[500px] h-[500px] -top-20 left-1/4 opacity-8" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm uppercase tracking-[0.3em] font-display font-semibold mb-3">
            What I work with
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text">Tech Stack</h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
          <p className="mt-6 text-[#bbc9cf] max-w-lg mx-auto">
            Tools and technologies I use to craft scalable, performant full-stack applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
