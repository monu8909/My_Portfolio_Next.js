"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const ParticleBackground = dynamic(() => import("@/components/3d/ParticleBackground"), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0e1322]"
    >
      {/* Ambient Orbs */}
      <div className="orb orb-cyan w-[600px] h-[600px] -top-32 -left-32" />
      <div className="orb orb-purple w-[400px] h-[400px] bottom-0 right-0" />

      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid lg:grid-cols-2 gap-12 items-center py-28">
        {/* Left — Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="tech-chip text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <p className="text-[#bbc9cf] font-medium uppercase tracking-[0.2em] text-sm font-display">
              Hello, I&apos;m Monu Rajput
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] font-display">
              <span className="gradient-text">Full Stack</span>
              <br />
              <span className="text-[#dee1f7]">MERN</span>
              <br />
              <span className="gradient-text-static">Developer</span>
            </h1>
          </motion.div>

          {/* Typing Animation */}
          <motion.div variants={itemVariants} className="text-xl md:text-2xl text-[#bbc9cf] font-display">
            I build{" "}
            <span className="text-[#00d4ff] font-semibold">
              <TypeAnimation
                sequence={[
                  "Scalable Web Apps", 2000,
                  "REST & GraphQL APIs", 2000,
                  "Real-Time Systems", 2000,
                  "MongoDB Solutions", 2000,
                  "Modern Dashboards", 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={itemVariants} className="text-[#bbc9cf] text-lg leading-relaxed max-w-lg">
            Passionate MERN stack developer with 3+ years of experience crafting high-performance,
            scalable full-stack applications. I turn complex problems into elegant digital solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              View Projects
            </motion.a>
            <motion.a
              href="/MonuRajput_ReactJS_3+_Years.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex gap-8 mt-4 pt-6 border-t border-[rgba(0,212,255,0.1)]">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "10+", label: "Projects Built" },
              { value: "3+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold font-display gradient-text-static">{stat.value}</span>
                <span className="text-[#bbc9cf] text-sm mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[600px] hidden md:block"
        >
          {/* Glowing backdrop */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
          <Scene3D />

          {/* Floating labels */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-4 glass rounded-xl px-4 py-3"
          >
            <p className="text-xs text-[#bbc9cf] uppercase tracking-wider">Stack</p>
            <p className="font-bold font-display text-[#00d4ff]">MERN</p>
          </motion.div>
        

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-4 glass rounded-xl px-4 py-3"
          >
            <p className="text-xs text-[#bbc9cf] uppercase tracking-wider">Projects</p>
            <p className="font-bold font-display text-[#7c3aed]">10+</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#bbc9cf] text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-[#00d4ff] rounded-full flex justify-center pt-1.5 opacity-60"
        >
          <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
