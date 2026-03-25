"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/lib/data";

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full mb-12 lg:mb-24 flex lg:justify-center items-center">
      {/* Center Dot (Desktop only) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.6)] z-10"
      >
        <div className="absolute inset-0 rounded-full border-2 border-[#1a1f2f]" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full lg:w-[45%] ${isEven ? "lg:mr-auto lg:text-right lg:pr-12" : "lg:ml-auto lg:pl-12"}`}
      >
        <div className="glass-card p-8 group hover:border-[#7c3aed]/40 transition-colors">
          <div className={`flex flex-col gap-1 mb-4 ${isEven ? "lg:items-end" : "lg:items-start"}`}>
            <span className="text-[#00d4ff] font-mono text-sm mb-1 bg-[#00d4ff]/10 px-3 py-1 rounded-full w-fit">
              {exp.period}
            </span>
            <h3 className="text-2xl font-bold font-display text-[#dee1f7]">{exp.role}</h3>
            <p className="text-lg text-[#bbc9cf] font-medium">{exp.company}</p>
          </div>

          <p className={`text-[#bbc9cf] text-justify leading-relaxed mb-6`}>
            {exp.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
            {exp.tags.map((tag) => (
              <span key={tag} className="tech-chip text-[11px] border-[#7c3aed]/30 before:bg-[#7c3aed]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-32 bg-transparent">
      <div className="orb orb-cyan w-[600px] h-[600px] top-40 right-1/4 opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <p className="text-[#7c3aed] text-sm uppercase tracking-[0.3em] font-display font-semibold mb-3">
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[#dee1f7]">
            Work Experience
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          {/* Central Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#161b2b] -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00d4ff] to-[#7c3aed] origin-top"
              style={{ scaleY, height: "100%" }}
            />
          </div>

          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
