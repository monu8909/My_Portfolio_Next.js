"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: x * 6, y: y * 6 }); // Gentle tilt
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setIsHovered(false);
        }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        className="glass-card h-full flex flex-col group overflow-hidden relative"
      >
        {/* Animated border gradient on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ 
            background: `radial-gradient(800px circle at ${tilt.y * 10 + 50}% ${-tilt.x * 10 + 50}%, rgba(0,212,255,0.06), transparent 40%)` 
          }}
        />

        {/* Thumbnail Image */}
        <div className="relative h-48 w-full overflow-hidden shrink-0 bg-[#090e1c]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-2xl text-[#bbc9cf]/20">
              {project.title}
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2f] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold font-display text-[#dee1f7] group-hover:text-[#00d4ff] transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-[#bbc9cf] text-sm leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-chip text-[10px] py-1 px-2 pointer-events-none">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto">
            <a 
              href={project.live} 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary text-xs py-2 px-4 flex-1 justify-center whitespace-nowrap"
            >
              Visit Website
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="projects" className="relative py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm uppercase tracking-[0.3em] font-display font-semibold mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text">Featured Projects</h2>
          <div className="mt-4 mx-auto w-24 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
