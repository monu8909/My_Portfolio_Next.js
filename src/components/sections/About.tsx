"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/data";

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#dee1f7]">{skill.name}</span>
        <span className="text-xs text-[#bbc9cf]">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-[#1a1f2f] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${skill.color}, rgba(0,212,255,0.6))` }}
          className="h-full rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-32 bg-transparent">
      <div className="orb orb-purple w-[400px] h-[400px] top-0 right-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-[#00d4ff] text-sm uppercase tracking-[0.3em] font-display font-semibold mb-3">
            Get to know me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text">About Me</h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Avatar placeholder */}
            <div className="relative w-48 h-48 mx-auto lg:mx-0">
              <div className="w-full h-full rounded-2xl glass-card flex items-center justify-center text-7xl">
                👨‍💻
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#00d4ff] rounded-xl flex items-center justify-center text-[#003642] font-bold text-sm">
                10+
              </div>
              <div className="absolute inset-0 rounded-2xl border border-[#00d4ff] opacity-20 pointer-events-none" />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold font-display text-[#dee1f7]">
                Building modern, responsive, and user-friendly digital experiences with ReactJS, Next.js, Node.js and JavaScript
              </h3>
              <p className="text-[#bbc9cf] leading-relaxed">
                I&apos;m a passionate Full Stack MERN Developer with over 3+ years of experience building
                scalable, high-performance web applications. I specialize in designing robust backend
                architectures with Node.js and Express, paired with dynamic, responsive React frontends.
              </p>
              <p className="text-[#bbc9cf] leading-relaxed">
                My journey started with a curiosity for how things work on the web and grew into a full-blown
                passion for creating products that make a real difference. I&apos;m committed to clean code,
                agile collaboration, and continuous learning.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Problem Solver", "Team Player", "Clean Code Advocate", "API Designer"].map((tag) => (
                  <span key={tag} className="tech-chip">{tag}</span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-card p-6 flex flex-col gap-3">
              {[
                { icon: "📍", label: "Location", value: "New Ashok Nagar, New Delhi 110096, India" },
                { icon: "✉️", label: "Email", value: "monurajput89099@gmail.com" },
                { icon: "🌐", label: "Linkdin", value: "https://www.linkedin.com/in/monu-rajput-2b3b55150/" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs text-[#bbc9cf] uppercase tracking-wider">{item.label}</p>
                    <p className="text-[#dee1f7] font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <h3 className="text-2xl font-bold font-display text-[#dee1f7]">Technical Proficiency</h3>
            <div className="flex flex-col gap-5">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>

            {/* Extra metrics */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { icon: "⭐", value: "4.9", label: "Client Rating" },
                { icon: "🚀", value: "10+", label: "Projects" },
                // { icon: "☕", value: "∞", label: "Coffees" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="text-xl font-bold font-display gradient-text-static mt-1">{stat.value}</p>
                  <p className="text-xs text-[#bbc9cf] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
