"use client";

import { 
  Terminal, 
  Layers, 
  Cpu, 
  Cloud, 
  Box, 
  Database, 
  GitBranch, 
  FileCode 
} from "lucide-react";

const SKILLS = [
  { name: "Python", category: "Languages", icon: Terminal, color: "text-yellow-400", glow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:border-yellow-400/30" },
  { name: "JavaScript", category: "Languages", icon: FileCode, color: "text-amber-400", glow: "hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:border-amber-400/30" },
  { name: "TypeScript", category: "Languages", icon: FileCode, color: "text-blue-400", glow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.15)] hover:border-blue-400/30" },
  { name: "Java", category: "Languages", icon: Cpu, color: "text-orange-500", glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:border-orange-500/30" },
  { name: "React", category: "Frontend", icon: Layers, color: "text-cyan-400", glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:border-cyan-400/30" },
  { name: "Django", category: "Backend", icon: Box, color: "text-emerald-500", glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-500/30" },
  { name: "Flask", category: "Backend", icon: Box, color: "text-slate-400", glow: "hover:shadow-[0_0_20px_rgba(148,163,184,0.15)] hover:border-slate-400/30" },
  { name: "PostgreSQL", category: "Database", icon: Database, color: "text-blue-500", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-blue-500/30" },
  { name: "MongoDB", category: "Database", icon: Database, color: "text-green-500", glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:border-green-500/30" },
  { name: "AWS", category: "Cloud Matrix", icon: Cloud, color: "text-amber-500", glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-500/30" },
  { name: "Docker", category: "DevOps", icon: Box, color: "text-cyan-500", glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30" },
  { name: "Git & GitHub", category: "Version Control", icon: GitBranch, color: "text-purple-400", glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.15)] hover:border-purple-400/30" }
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {SKILLS.map((skill, index) => {
        const IconComponent = skill.icon;
        return (
          <div 
            key={index} 
            className={`p-4 rounded-xl border border-white/5 bg-[#0b0f19]/60 backdrop-blur-md flex items-center gap-4 transition-all duration-300 group cursor-default hover:-translate-y-1 ${skill.glow}`}
          >
            {/* BRAND SPECIFIC ICON CONTAINER WITH SCALE MICRO-ANIMATIONS */}
            <div className={`p-2 rounded-lg bg-white/5 ${skill.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
              <IconComponent size={20} />
            </div>

            {/* SKILL CONTENT ARCHITECTURE TEXTS */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-200 group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                {skill.name}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 font-mono">
                {skill.category}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}