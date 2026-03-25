"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), { ssr: false });

/* ─── Project data ──────────────────────────────────────────────────────────── */
const showcase3DProjects = [
  {
    id: 1,
    title: "Character Rigging",
    description:
      "A fully-rigged humanoid character with inverse kinematics, facial blend-shapes, and real-time cloth simulation.",
    emoji: "🧍",
    accent: "#00d4ff",
    accentDim: "rgba(0,212,255,0.12)",
    glowColor: "rgba(0,212,255,0.35)",
    tags: ["Blender", "IK Rigging", "Cloth Sim"],
    depth: "220px",
  },
  {
    id: 2,
    title: "Product Visualisation",
    description:
      "Photorealistic product rendering with PBR materials, HDR environment lighting, and ray-traced reflections.",
    emoji: "📦",
    accent: "#7c3aed",
    accentDim: "rgba(124,58,237,0.12)",
    glowColor: "rgba(124,58,237,0.35)",
    tags: ["Cycles", "PBR", "Ray-Tracing"],
    depth: "180px",
  },
  {
    id: 3,
    title: "Environment Design",
    description:
      "Atmospheric sci-fi environment featuring volumetric fog, dynamic lighting, procedural terrain, and world-building details.",
    emoji: "🌌",
    accent: "#06b6d4",
    accentDim: "rgba(6,182,212,0.12)",
    glowColor: "rgba(6,182,212,0.35)",
    tags: ["Unreal Engine", "VFX", "World-Building"],
    depth: "260px",
  },
  {
    id: 4,
    title: "Motion Graphics",
    description:
      "Kinetic typography and abstract 3D motion sequences crafted for broadcast intros and social media branding.",
    emoji: "🎞️",
    accent: "#f59e0b",
    accentDim: "rgba(245,158,11,0.12)",
    glowColor: "rgba(245,158,11,0.35)",
    tags: ["After Effects", "Cinema 4D", "Broadcast"],
    depth: "200px",
  },
  {
    id: 5,
    title: "Architectural Render",
    description:
      "High-fidelity interior & exterior architectural visualisations with accurate shadows, GI and material precision.",
    emoji: "🏛️",
    accent: "#10b981",
    accentDim: "rgba(16,185,129,0.12)",
    glowColor: "rgba(16,185,129,0.35)",
    tags: ["V-Ray", "SketchUp", "Lumion"],
    depth: "240px",
  },
];

/* ─── Single animated card ──────────────────────────────────────────────────── */
function ShowcaseCard({
  project,
  index,
}: {
  project: (typeof showcase3DProjects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 40 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      {/* Glow halo on hover */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: project.accentDim }}
      />

      <div
        className="relative rounded-3xl border border-white/[0.08] overflow-hidden backdrop-blur-md transition-all duration-500
                   group-hover:border-white/20 group-hover:scale-[1.025] group-hover:shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow: "inset 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-0`}>
          {/* Visual panel */}
          <div
            className="md:w-2/5 h-56 md:h-auto relative flex-shrink-0 overflow-hidden flex items-center justify-center"
            style={{ background: project.accentDim }}
          >
            {/* Depth floor */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 120%, ${project.accentDim} 0%, transparent 70%)`,
              }}
            />
            {/* Big emoji as placeholder 3D icon */}
            <motion.div
              className="relative z-10 text-8xl md:text-9xl select-none"
              animate={{ y: [0, -10, 0], rotateY: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: `drop-shadow(0 0 40px ${project.accent}99)` }}
            >
              {project.emoji}
            </motion.div>

            {/* Corner badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}40`,
                    background: `${project.accent}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center gap-5">
            {/* Index */}
            <span
              className="font-mono text-xs font-bold tracking-[0.3em]"
              style={{ color: project.accent }}
            >
              {String(index + 1).padStart(2, "0")} / SHOWCASE
            </span>

            <h3 className="text-2xl md:text-3xl font-bold font-display text-[#dee1f7] leading-tight">
              {project.title}
            </h3>

            <p className="text-[#bbc9cf] leading-relaxed">{project.description}</p>

            {/* Animated underline button */}
            <div className="mt-2">
              <button
                className="relative group/btn text-sm font-semibold tracking-wide"
                style={{ color: project.accent }}
              >
                View Project
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover/btn:w-full transition-all duration-300 rounded-full"
                  style={{ background: project.accent }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Sticky 3D viewer panel ────────────────────────────────────────────────── */
function StickyViewer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), {
    stiffness: 60,
    damping: 20,
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]), {
    stiffness: 60,
    damping: 20,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[220vh] hidden lg:block">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ y, scale, opacity }}
          className="w-[480px] h-[480px] rounded-full relative"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-[#00d4ff]/20"
            style={{ borderStyle: "dashed" }}
          />
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-[#7c3aed]/20"
            style={{ borderStyle: "dotted" }}
          />

          {/* Glow core */}
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_70%)]" />

          {/* 3D Canvas */}
          <div className="absolute inset-12 rounded-full overflow-hidden pointer-events-auto">
            <Scene3D />
          </div>

          {/* Orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.8)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/80" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Parallax floating elements ───────────────────────────────────────────── */
function ParallaxOrb({
  y: yRange,
  className,
  style,
}: {
  y: [number, number];
  className: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className} />
  );
}

/* ─── Section header ────────────────────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center mb-20"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={inView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-[#00d4ff] text-sm uppercase font-display font-semibold mb-4"
      >
        Creative Works
      </motion.p>

      <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">
        <span className="text-[#dee1f7]">3D Animation</span>
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)",
          }}
        >
          Showcase
        </span>
      </h2>

      <div className="mt-6 mx-auto w-24 h-0.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />

      <p className="mt-6 text-[#bbc9cf] text-lg max-w-xl mx-auto leading-relaxed">
        Explore my 3D modelling, rendering, and animation projects — a journey through form, light,
        and motion.
      </p>
    </motion.div>
  );
}

/* ─── Main exported component ───────────────────────────────────────────────── */
export default function AnimationShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the section title text
  const titleY = useTransform(sectionProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-32 bg-transparent overflow-hidden"
    >
      {/* ── Parallax ambient orbs ── */}
      <ParallaxOrb
        y={[-60, 60]}
        className="absolute -top-20 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        } as React.CSSProperties}
      />
      <ParallaxOrb
        y={[40, -40]}
        className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        } as React.CSSProperties}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div style={{ y: titleY }}>
          <SectionHeader />
        </motion.div>

        {/* ── Two-column layout: sticky viewer (desktop) + card stack ── */}
        <div className="flex gap-12 xl:gap-20">
          {/* Left sticky column (desktop only) */}
          <div className="hidden lg:block w-[480px] flex-shrink-0 -mt-32">
            <StickyViewer />
          </div>

          {/* Right scrolling card column */}
          <div className="flex-1 flex flex-col gap-8 py-4">
            {showcase3DProjects.map((project, i) => (
              <ShowcaseCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-24 text-center"
        >
          <p className="text-[#bbc9cf] mb-6">
            Interested in a custom 3D project or collaboration?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide text-white"
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
              boxShadow: "0 0 40px rgba(0,212,255,0.25)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Let&apos;s Collaborate
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
