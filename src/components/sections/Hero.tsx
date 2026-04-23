"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { skills } from "@/lib/data";

const ForceFieldBackground = dynamic(() => import("@/components/ForceFieldBackground").then(mod => mod.ForceFieldBackground), {
  ssr: false,
});

function MiniSkillChart() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00d4ff]/20 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-4 rounded-full border border-[#00d4ff]/15" />
        <div className="absolute inset-8 rounded-full border border-[#7c3aed]/10" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass-card flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold font-display gradient-text-static">MERN</p>
              <p className="text-[8px] md:text-[10px] text-[#bbc9cf] uppercase tracking-wider">Stack</p>
            </div>
          </div>
        </div>

        {skills.slice(0, 6).map((skill, i) => {
          const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
          const radius = 110;
          const x = 128 + radius * Math.cos(angle);
          const y = 128 + radius * Math.sin(angle);
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className="absolute"
              style={{ 
                left: `${x}px`, 
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-14 h-14 md:w-100 md:h-100 rounded-full flex items-center justify-center glass-card cursor-pointer transition-all duration-300 hover:border-[#00d4ff]/50"
                style={{ 
                  boxShadow: `0 0 15px ${skill.color}30`,
                  borderColor: `${skill.color}50`
                }}
              >
                <div className="text-center">
                  <p className="text-[10px] md:text-xs font-bold font-display" style={{ color: skill.color }}>
                    {skill.level}%
                  </p>
                  <p className="text-[6px] md:text-[8px] text-[#bbc9cf] truncate max-w-[40px]">
                    {skill.name.split('.')[0]}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

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
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]"
    >
      {/* Dynamic Background Animation */}
      <div className="absolute inset-0 z-0">
        <ForceFieldBackground 
          hue={210}
          spacing={10}
          forceStrength={2}
          magnifierRadius={100}
          friction={0.92}
          restoreSpeed={0.04}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid lg:grid-cols-2 gap-12 items-center py-28 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={itemVariants}>
            <span className="tech-chip text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Available for work
            </span>
          </motion.div>

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
                style={{ display: 'inline-block' }}
              />
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[#bbc9cf] text-lg leading-relaxed max-w-lg">
            Passionate MERN stack developer with 3+ years of experience crafting high-performance,
            scalable full-stack applications. I turn complex problems into elegant digital solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg flex items-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
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
              className="px-8 py-3 border border-white/10 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </motion.a>
          </motion.div>

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

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative h-[400px] md:h-[500px] lg:h-[550px] hidden md:flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
          <MiniSkillChart />
        </motion.div>
      </div>
    </section>
  );
}
