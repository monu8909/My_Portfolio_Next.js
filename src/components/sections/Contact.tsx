"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  SiGithub, 
 
} from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";
export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section id="contact" className="relative py-32 bg-[#1a1f2f] min-h-screen flex items-center">
      <div className="orb orb-cyan w-[500px] h-[500px] bottom-0 left-0 opacity-10" />
      <div className="orb orb-purple w-[300px] h-[300px] top-20 right-20 opacity-10" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#00d4ff] text-sm uppercase tracking-[0.3em] font-display font-semibold">
              Get in touch
            </p>
            <h2 className="text-5xl md:text-6xl font-bold font-display text-[#dee1f7] leading-tight flex flex-col gap-2">
              <span>Let&apos;s build</span>
              <span className="gradient-text italic pr-4">something</span>
              <span>extraordinary.</span>
            </h2>
            <p className="text-[#bbc9cf] text-lg leading-relaxed max-w-lg mt-4">
              Whether you have a project in mind, need a full-stack developer for your team,
              or just want to chat about the latest web tech, I&apos;d love to hear from you.
            </p>

            <div className="flex gap-6 mt-8">
              {[
                { name: "GitHub", url: "https://github.com/monu8909", icon: SiGithub},
                { name: "LinkedIn", url: "https://www.linkedin.com/in/monu-rajput-2b3b55150/", icon: CiLinkedin },
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, color: "#00d4ff" }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#bbc9cf] hover:border-[#00d4ff]/40 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <span className="text-xl">    
                    <a href={social.url}   >
                     <social.icon />
                    </a>  
</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden">
              {/* Internal glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4ff]/5 blur-[100px] pointer-events-none" />

              <h3 className="text-2xl font-display font-bold text-[#dee1f7] mb-2">Send me a message</h3>

              <div className="flex flex-col gap-8">
                <div className="relative group">
                  <input type="text" required id="name" className="neo-input peer" placeholder=" " />
                  <label htmlFor="name" className="absolute left-0 top-3 text-[#bbc9cf] text-sm transition-all pointer-events-none peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#00d4ff] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs">
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input type="email" required id="email" className="neo-input peer" placeholder=" " />
                  <label htmlFor="email" className="absolute left-0 top-3 text-[#bbc9cf] text-sm transition-all pointer-events-none peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#00d4ff] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs">
                    Email Address
                  </label>
                </div>

                <div className="relative group h-32">
                  <textarea required id="message" className="neo-input h-full resize-none peer" placeholder=" " />
                  <label htmlFor="message" className="absolute left-0 top-3 text-[#bbc9cf] text-sm transition-all pointer-events-none peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#00d4ff] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-xs">
                    Message
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status !== "idle"}
                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className={`btn-primary w-full justify-center py-4 mt-4 ${
                  status === "success" ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" : ""
                }`}
              >
                {status === "idle" && "Send Message"}
                {status === "submitting" && (
                  <div className="w-5 h-5 border-2 border-[#003642] border-t-transparent rounded-full animate-spin" />
                )}
                {status === "success" && "Message Sent ✓"}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
