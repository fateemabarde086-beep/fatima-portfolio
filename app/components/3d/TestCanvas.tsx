"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function TestCanvas() {
  // Setup mouse positions for interactive cinematic parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse tracking values so the movement is elegant and soft
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x * 35);
      mouseY.set(y * 35);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-20 bg-[#02040a] overflow-hidden pointer-events-none w-full h-full min-h-screen">
      
      {/* LAYER 1 & 7: VOLUMETRIC LIGHT RAYS & NEBULA BLOOM */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[160px] rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/5 blur-[130px] rounded-full animate-pulse" />

      {/* PARALLAX INTERACTIVE WRAPPER (Reacts to Mouse Position) */}
      <motion.div 
        style={{ x: springX, y: springY }} 
        className="absolute inset-0 w-[105%] h-[105%] top-[-2.5%] left-[-2.5%]"
      >
        {/* LAYER 2: INFINITE TUNNEL SYSTEM GRID LOOP (DRIVEN DIRECTLY BY FRAMER MOTION) */}
        <motion.div 
          className="absolute inset-0 opacity-45"
          animate={{
            backgroundPosition: ["0px 0px", "80px 160px"]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 15%, #02040a 85%), 
                              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%233b82f6' fill-opacity='0.12'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='%233b82f6' stroke-opacity='0.04' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* LAYER 3: CINEMATIC CYBER NEON ORBITAL PATHS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-blue-500/5 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-purple-500/5 animate-[spin_35s_linear_infinite_reverse]" />

        {/* LAYER 4: FLOATING GEOMETRIC NODE MATRICES */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] left-[15%] w-4 h-4 border border-blue-400/20 rounded-sm"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [360, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[35%] right-[20%] w-5 h-5 border border-purple-400/20 rotate-45"
        />
      </motion.div>
    </div>
  );
}