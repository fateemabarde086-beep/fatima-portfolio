"use client";

import { useEffect, useState } from "react";
import { Shield, Activity, Heart, ShoppingBag, Landmark, Loader2, ArrowUpRight, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  tech: string[];
  impact: string;
  category: string;
  type: string;
  focus: string;
  buttonText: string;
  githubUrl: string;
  uiScreenshots: string[];
}

const ICON_MAP: Record<string, any> = {
  "Hospital Management System": Landmark,
  "Period Tracker & Ovulation App": Activity,
  "Girls Safety & Awareness Platform": Shield,
  "Charity Platform for Girls": Heart,
  "Social Commerce Marketplace": ShoppingBag,
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State to manage active modal viewing parameters
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-24 text-purple-400">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {projects.map((project, index) => {
          const IconComponent = ICON_MAP[project.title] || Shield;
          
          return (
            <div 
              key={project.id} 
              className="p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-[#080c16]/40 backdrop-blur-xl flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(147,51,234,0.08)] shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* HERO ICON EMBED WITH HOVER SCALE INTERACTION */}
                  <div className="p-3 rounded-2xl bg-slate-950/5 dark:bg-white/5 text-purple-600 dark:text-purple-400 group-hover:text-white group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-mono tracking-widest text-purple-600 dark:text-purple-400 font-bold uppercase transition-colors duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-300">{project.category}</span>
                    <span className="block text-[9px] font-mono tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">{project.type}</span>
                  </div>
                </div>

                <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{project.title}</h4>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-300/90 tracking-wide mb-3">{project.tagline}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-light">{project.description}</p>

                <div className="mb-6 space-y-1.5 border-t border-b border-slate-100 dark:border-white/5 py-4">
                  {project.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 font-medium transition-transform duration-300 group-hover:translate-x-1">
                      <span className="text-purple-500 dark:text-purple-400 text-xs animate-pulse">✦</span> {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-slate-700 dark:text-slate-300 text-[10px] font-mono transition-all duration-300 group-hover:border-purple-500/20 group-hover:bg-purple-500/5">{t}</span>
                  ))}
                </div>

                {/* INTERACTIVE CTA EXPAND BUTTON */}
                <button 
                  onClick={() => setActiveProjectModal(project)}
                  className="w-full py-3 px-4 rounded-xl border border-purple-500/20 bg-gradient-to-r from-blue-600/5 to-purple-600/5 hover:from-blue-600 hover:to-purple-600 text-purple-600 dark:text-purple-300 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-2 group/btn shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                >
                  {project.buttonText}
                  <ArrowUpRight size={14} className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- PREMIUM CINEMATIC UI SCREENSHOT POPUP LIGHTBOX MODAL --- */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-10 transition-all duration-300 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#03050c] border border-white/10 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-500/10">
            
            {/* Close Button Trigger */}
            <button 
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-rose-600 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <X size={20} />
            </button>

            {/* Modal Heading Details */}
            <div className="mb-6">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">{activeProjectModal.category}</span>
              <h3 className="text-2xl font-black text-white mt-1">{activeProjectModal.title}</h3>
              <p className="text-xs text-slate-400 mt-2 font-mono"><span className="text-slate-500 font-bold">Tech Stack Architecture:</span> {activeProjectModal.tech.join(" • ")}</p>
            </div>

            {/* UI SCREENSHOT DISPLAY PANEL WINDOWS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {activeProjectModal.uiScreenshots.map((screenshot, sIdx) => (
                <div key={sIdx} className="relative aspect-video rounded-xl bg-slate-900 border border-white/5 overflow-hidden group/img shadow-lg">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover/img:scale-105"
                    style={{ backgroundImage: `url('${screenshot}')` }}
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 text-[9px] font-mono text-blue-400 border border-white/5 tracking-wider shadow-inner">
                    INTERFACE_SAMPLE_0{sIdx + 1}.PNG
                  </div>
                </div>
              ))}
            </div>

            {/* Action Redirection Link Context */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-white/5 pt-6 mt-6">
              <p className="text-xs text-slate-400 italic max-w-md text-center sm:text-left font-light">{activeProjectModal.impact}</p>
              <a 
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-600/20 flex items-center gap-2 hover:scale-105 hover:shadow-purple-600/40 active:scale-98"
              >
                Inspect Source Code ↗
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}