"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/lib/data";

function SkillOrb({ skill, index, total, centerX, centerY, radius }: { 
  skill: typeof skills[0]; 
  index: number; 
  total: number;
  centerX: number;
  centerY: number;
  radius: number;
}) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      className="absolute"
      style={{ 
        left: `${(x / 400) * 100}%`, 
        top: `${(y / 400) * 100}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2, zIndex: 50 }}
        className="relative group cursor-pointer"
      >
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center glass-card transition-all duration-300 group-hover:border-[#00d4ff]/50"
          style={{ 
            boxShadow: `0 0 20px ${skill.color}40, inset 0 0 15px ${skill.color}20`,
            borderColor: `${skill.color}60`
          }}
        >
          <div 
            className="text-2xl md:text-3xl font-bold font-display"
            style={{ color: skill.color }}
          >
            {skill.level}%
          </div>
        </div>
        
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs text-[#bbc9cf] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CircularProgress({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -90 }}
      animate={inView ? { opacity: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative w-28 h-28 md:w-32 md:h-32"
    >
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(0,212,255,0.1)"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={skill.color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, delay: 0.3 + index * 0.15, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${skill.color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg md:text-xl font-bold font-display" style={{ color: skill.color }}>
          {skill.level}%
        </span>
        <span className="text-[10px] text-[#bbc9cf] uppercase tracking-wider">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsRadarChart() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="skills" className="relative py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm uppercase tracking-[0.3em] font-display font-semibold mb-3">
            Technical Proficiency
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text">
            My Skills
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto aspect-square"
          >
            <div className="absolute inset-0 rounded-full border border-[#00d4ff]/10" />
            <div className="absolute inset-4 rounded-full border border-[#00d4ff]/08" />
            <div className="absolute inset-8 rounded-full border border-[#00d4ff]/06" />
            <div className="absolute inset-12 rounded-full border border-[#00d4ff]/04" />
            
            <div className="absolute inset-0 flex items-center justify-center" >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full glass-card flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold font-display gradient-text-static">3+</p>
                  <p className="text-[10px] text-[#bbc9cf] uppercase tracking-wider">Years Exp.</p>
                </div>
              </motion.div>
            </div>

            <div className="absolute inset-0"
              style={{top:"-90px",right:"0",left:"-75px"}}
            >
              {skills.map((skill, i) => (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  index={i}
                  total={skills.length}
                  centerX={200}
                  centerY={200}
                  radius={140}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {skills.map((skill, i) => (
              <CircularProgress key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "95%", label: "JavaScript", color: "#F7DF1E" },
            { value: "95%", label: "React.js", color: "#61DAFB" },
            { value: "88%", label: "Next.js", color: "#ffffff" },
            { value: "90%", label: "Node.js", color: "#339933" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              className="glass-card p-6 text-center hover:border-[#00d4ff]/30 transition-all duration-300"
            >
              <p className="text-3xl font-bold font-display mb-1" style={{ color: item.color }}>
                {item.value}
              </p>
              <p className="text-sm text-[#bbc9cf]">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
