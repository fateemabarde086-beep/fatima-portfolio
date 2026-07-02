"use client";

import { useState } from "react";
import { Globe, Sun, Moon, X } from "lucide-react";
import TestCanvas from "./components/3d/TestCanvas";
import TechStack from "./components/ui/TechStack";
import Projects from "./components/ui/Projects";
import Contact from "./components/ui/Contact";
import AdminPortal from "./components/ui/AdminPortal";

// COMPREHENSIVE MULTI-LANGUAGE TRANSLATION MATRIX
const GLOBAL_DICTIONS = {
  en: {
    navHome: "Home", navAbout: "About", navTech: "Tech Stack", navProj: "Projects", navContact: "Contact",
    connectBtn: "Let's Connect ↗", status: "Available for opportunities", greeting: "Hi, I'm",
    heroTitlePre: "Software Engineer ", heroTitlePost: "| Cloud & Security Enthusiast",
    heroDesc: "I build secure, scalable, and user-focused applications and cloud solutions that solve real-world problems.",
    viewWork: "View My Work", downloadCv: "Download CV",
    statProj: "GitHub Projects", statExp: "Years Experience", statTech: "Technologies", statExec: "Execution Matrix",
    aboutPrefix: "01 // Identity Matrix", aboutTitle: "About Me",
    aboutP1: "I am a Computer Science graduate specialized in engineering enterprise-grade software infrastructure, secure cloud deployment models, and high-performance full-stack architectures.",
    aboutP2: "Throughout my professional journey, I have focused on engineering robust applications using Django, Flask, and Next.js, backed by secure, reliable relational and non-relational database models.",
    aboutP3: "My expertise extends across automating deployment pipelines on cloud infrastructures like AWS and Microsoft Azure, always delivering optimized sub-second performance while maintaining a rigorous focus on data privacy and application parameters.",
    techPrefix: "02 // Core Arsenal", techTitle: "Tech Stack",
    projPrefix: "03 // Case Studies", projTitle: "Featured Projects",
    connectPrefix: "04 // Handshake Protocol", connectTitle: "Let's Connect",
    connectDesc: "I am open to talking about software engineering opportunities, cloud setups, and secure product builds. Reach out directly using the secure transmission line or via standard communication indexes!",
    dir: "ltr"
  },
  fr: {
    navHome: "Accueil", navAbout: "À Propos", navTech: "Technologies", navProj: "Projets", navContact: "Contact",
    connectBtn: "Contactez-moi ↗", status: "Disponible pour des opportunités", greeting: "Salut, je suis",
    heroTitlePre: "Ingénieur Logiciel ", heroTitlePost: "| Passionné Cloud & Sécurité",
    heroDesc: "Je construis des applications sécurisées, évolutives et centrées sur l'utilisateur ainsi que des solutions cloud qui résolvent des problèmes réels.",
    viewWork: "Voir Mon Travail", downloadCv: "Télécharger le CV",
    statProj: "Projets GitHub", statExp: "Années d'Expérience", statTech: "Technologies", statExec: "Matrice d'Exécution",
    aboutPrefix: "01 // Matrice d'Identité", aboutTitle: "À Propos de Moi",
    aboutP1: "Je suis un diplômé en informatique spécialisé dans l'ingénierie d'infrastructures logicielles d'entreprise, de modèles de déploiement cloud sécurisés et d'architectures full-stack de haute performance.",
    aboutP2: "Tout au long de mon parcours professionnel, je me suis concentré sur le développement d'applications robustes utilisant Django, Flask et Next.js, soutenues par des modèles de bases de données fiables.",
    aboutP3: "Mon expertise s'étend à l'automatisation des pipelines de déploiement sur AWS et Microsoft Azure, garantissant une latence minimale tout en maintenant un accent rigoureux sur la confidentialité des données.",
    techPrefix: "02 // Arsenal Central", techTitle: "Technologies",
    projPrefix: "03 // Études de Cas", projTitle: "Projets En Vedette",
    connectPrefix: "04 // Protocole de Liaison", connectTitle: "Connectons-nous",
    connectDesc: "Je suis ouvert aux opportunités d'ingénierie logicielle, de configurations cloud et de versions de produits sécurisés. Contactez-moi directement !",
    dir: "ltr"
  },
  es: {
    navHome: "Inicio", navAbout: "Sobre Mí", navTech: "Tecnologías", navProj: "Proyectos", navContact: "Contacto",
    connectBtn: "Conectemos ↗", status: "Disponible para oportunidades", greeting: "Hola, soy",
    heroTitlePre: "Ingeniera de Software ", heroTitlePost: "| Entusiasta de Cloud y Seguridad",
    heroDesc: "Construyo aplicaciones seguras, escalables y centradas en el usuario y soluciones en la nube que resuelven problemas del mundo real.",
    viewWork: "Ver Mi Trabajo", downloadCv: "Descargar CV",
    statProj: "Proyectos GitHub", statExp: "Años de Experiencia", statTech: "Tecnologías", statExec: "Matriz de Ejecución",
    aboutPrefix: "01 // Matriz de Identidad", aboutTitle: "Sobre Mí",
    aboutP1: "Soy graduada en Ciencias de la Computación especializada en ingeniería de infraestructura de software empresarial, modelos seguros de despliegue en la nube y arquitecturas full-stack.",
    aboutP2: "A lo largo de mi trayectoria, me he enfocado en diseñar aplicaciones robustas utilizando Django, Flask y Next.js, respaldadas por motores de bases de datos relacionales y no relacionales.",
    aboutP3: "Mi experiencia se extiende a la automatización de canalizaciones de implementación en AWS y Microsoft Azure, garantizando un rendimiento optimizado con estrictos parámetros de seguridad.",
    techPrefix: "02 // Arsenal Central", techTitle: "Tecnologías",
    projPrefix: "03 // Estudios de Caso", projTitle: "Proyectos Destacados",
    connectPrefix: "04 // Protocolo de Saludo", connectTitle: "Conectemos",
    connectDesc: "Estoy abierta a hablar sobre oportunidades de ingeniería de software, configuraciones en la nube y compilaciones de productos seguros. ¡Contáctame directamente!",
    dir: "ltr"
  },
  ar: {
    navHome: "الرئيسية", navAbout: "حول", navTech: "التقنيات", navProj: "المشاريع", navContact: "اتصل بنا",
    connectBtn: "لنبدأ الاتصال ↗", status: "متاحة للفرص المهنية", greeting: "مرحباً، أنا",
    heroTitlePre: "مهندسة برمجيات ", heroTitlePost: "| مهتمة بالسحاب والأمن الرقمي",
    heroDesc: "أقوم ببناء تطبيقات وحلول سحابية آمنة وقابلة للتطوير وموجهة للمستخدم تحل مشاكل العالم الحقيقي.",
    viewWork: "عرض أعمالي", downloadCv: "تحميل السيرة الذاتية",
    statProj: "مشاريع GitHub", statExp: "سنوات الخبرة", statTech: "التقنيات المستخدمة", statExec: "مصفوفة التنفيذ",
    aboutPrefix: "01 // مصفوفة الهوية", aboutTitle: "معلومات عني",
    aboutP1: "أنا خريجة علوم حاسب آلي متخصصة في هندسة البنية التحتية للبرمجيات، ونماذج النشر السحابي الآمنة، وهندسة البنيات الكاملة (Full-Stack).",
    aboutP2: "خلال مسيرتي، ركزت على بناء تطبيقات قوية باستخدام Django و Flask و Next.js، مدعومة بقواعد بيانات موثوقة.",
    aboutP3: "تمتد خبرتي لتشمل أتمتة خطوط النشر السحابي على AWS و Microsoft Azure، مع تقديم أداء سريع ومحسّن مع التركيز الصارم على حماية خصوصية البيانات.",
    techPrefix: "02 // الترسانة الأساسية", techTitle: "التقنيات",
    projPrefix: "03 // دراسات الحالة", projTitle: "المشاريع المميزة",
    connectPrefix: "04 // بروتوكول الاتصال", connectTitle: "لنبدأ الاتصال",
    connectDesc: "أنا منفتحة للتحدث عن فرص هندسة البرمجيات، والإعدادات السحابية، وبناء المنتجات الآمنة. تواصل معي مباشرة!",
    dir: "rtl"
  }
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "fr" | "es" | "ar">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSecretAdmin, setShowSecretAdmin] = useState(false);
  const d = GLOBAL_DICTIONS[lang];

  return (
    <main 
      dir={d.dir} 
      className={`relative min-h-screen overflow-x-hidden selection:bg-purple-500/30 scroll-smooth transition-colors duration-1000 ${
        theme === "dark" ? "bg-transparent text-white" : "bg-[#f5f7fa] text-[#1c1e22]"
      }`}
    >
      
      {/* 3D INFINITE MOVING CANVAS BACKGROUND - PREMIUM DARK MODE */}
      {theme === "dark" && <TestCanvas />}

      {/* AMBIENT LIGHT MOTION ENGINE OVERLAY - RUNS ONLY IN LIGHT MODE */}
      {theme === "light" && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-blue-200/40 to-indigo-200/40 blur-[120px] animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-purple-200/30 to-pink-200/40 blur-[140px] animate-bounce duration-[12000ms]" />
          <div className="absolute top-[35%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-blue-100/30 blur-[100px] animate-pulse duration-[6000ms]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] opacity-45" />
        </div>
      )}

      {/* FIXED LUXURY HEADER BAR */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md px-6 lg:px-16 py-4 flex justify-between items-center transition-all duration-500 ${
        theme === "dark" ? "border-white/5 bg-[#03050c]/80" : "border-slate-200/60 bg-white/70"
      }`}>
        
        {/* LOGO INITIALS WITH HIDDEN DOUBLE-CLICK EVENT LISTENER */}
        <div 
          onDoubleClick={() => setShowSecretAdmin(true)}
          className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer select-none active:scale-95 transition-transform duration-300"
          title="FA Matrix"
        >
          FA
        </div>
        
        <nav className={`hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          <a href="#" className={`border-b border-purple-500 pb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{d.navHome}</a>
          <a href="#about" className="hover:text-purple-500 transition duration-300 transform hover:-translate-y-0.5">{d.navAbout}</a>
          <a href="#tech" className="hover:text-purple-500 transition duration-300 transform hover:-translate-y-0.5">{d.navTech}</a>
          <a href="#projects" className="hover:text-purple-500 transition duration-300 transform hover:-translate-y-0.5">{d.navProj}</a>
          <a href="#contact" className="hover:text-purple-500 transition duration-300 transform hover:-translate-y-0.5">{d.navContact}</a>
        </nav>

        {/* CONTROLS HUB */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-xl border hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm ${
              theme === "dark" ? "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {theme === "dark" ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} className="text-indigo-600" />}
          </button>

          <div className={`flex items-center gap-1.5 border px-2.5 py-1.5 rounded-xl shadow-sm transition-all duration-300 ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <Globe size={13} className="text-purple-500" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as "en" | "fr" | "es" | "ar")}
              className={`bg-transparent text-[11px] font-mono focus:outline-none cursor-pointer border-none p-0 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}
            >
              <option value="en" className={theme === 'dark' ? 'bg-[#03050c] text-white' : 'bg-white text-slate-900'}>English</option>
              <option value="fr" className={theme === 'dark' ? 'bg-[#03050c] text-white' : 'bg-white text-slate-900'}>Français</option>
              <option value="es" className={theme === 'dark' ? 'bg-[#03050c] text-white' : 'bg-white text-slate-900'}>Español</option>
              <option value="ar" className={theme === 'dark' ? 'bg-[#03050c] text-white' : 'bg-white text-slate-900'}>العربية</option>
            </select>
          </div>
          
          <a 
            href="#contact"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:scale-105 active:scale-95 shadow-md transition-all duration-300 text-center"
          >
            {d.connectBtn}
          </a>
        </div>
      </header>

      {/* CONTENT ARCHITECTURE FRAMEWORK */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col gap-36 pt-8 pb-24">
        
        {/* --- DUAL COLUMN HERO SECTION --- */}
        <section className="min-h-[80vh] flex flex-col lg:flex-row justify-center items-center gap-12">
          <div className="flex-[1.2] flex flex-col justify-center items-start text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-medium mb-6 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {d.status}
            </div>
            <p className={theme === 'dark' ? 'text-lg text-slate-400 font-light mb-1' : 'text-lg text-slate-500 font-light mb-1'}>{d.greeting}</p>
            <h1 className={`text-6xl sm:text-7xl font-black tracking-tight mb-4 transform hover:scale-[1.01] transition-transform duration-500 ${
              theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400' : 'text-slate-800'
            }`}>
              Fatima Abdulhadi
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-purple-600 tracking-wide mb-6">
              {d.heroTitlePre}<span className={theme === 'dark' ? 'text-slate-500 font-normal' : 'text-slate-400 font-normal'}>{d.heroTitlePost}</span>
            </h2>
            <p className={`max-w-xl text-base leading-relaxed mb-8 font-light ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {d.heroDesc}
            </p>
            <div className="flex gap-4">
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:opacity-90 transform hover:scale-[1.04] hover:-translate-y-0.5 active:scale-98 transition-all duration-300 shadow-lg shadow-purple-500/20 text-center"
              >
                {d.viewWork}
              </a>
              <a 
                href="/assets/Fatima_Abdulhadi_CV.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`px-6 py-3 rounded-xl border font-medium text-sm transform hover:scale-[1.04] hover:-translate-y-0.5 active:scale-98 transition-all duration-300 text-center ${
                  theme === 'dark' ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                {d.downloadCv}
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center items-center">
            <div className={`relative w-full aspect-square max-w-[400px] rounded-3xl border p-2 overflow-hidden shadow-2xl transition-all duration-500 ${
              theme === 'dark' ? 'border-white/10 bg-slate-900/10 shadow-purple-500/5 hover:border-purple-500/30' : 'border-slate-200 bg-white shadow-slate-100 hover:border-purple-400'
            }`}>
              <div 
                className="w-full h-full rounded-2xl bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/hero-profile.png')" }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-blue-400 border border-white/5">
                CORE_ENGINE_ACTIVE
              </div>
            </div>
          </div>
        </section>

        {/* STATS SUMMARY BAR */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border transition-all duration-500 ${
          theme === "dark" ? "border-white/5 bg-[#080c16]/50 backdrop-blur-md shadow-2xl" : "border-slate-200/60 bg-white/80 shadow-sm"
        }`}>
          <div className="flex flex-col items-center group cursor-default">
            <span className={`text-2xl font-black transform group-hover:scale-110 group-hover:text-purple-500 transition duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>50+</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 text-center font-mono">{d.statProj}</span>
          </div>
          <div className="flex flex-col items-center border-l border-slate-200/30 group cursor-default">
            <span className="text-2xl font-black text-pink-500 tracking-tight drop-shadow-[0_0_15px_rgba(236,72,153,0.15)] animate-pulse transform group-hover:scale-110 transition duration-300">3+</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 text-center font-mono">{d.statExp}</span>
          </div>
          <div className="flex flex-col items-center border-l border-slate-200/30 group cursor-default">
            <span className="text-2xl font-black text-blue-500 transform group-hover:scale-110 group-hover:text-blue-600 transition duration-300">10+</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 text-center font-mono">{d.statTech}</span>
          </div>
          <div className="flex flex-col items-center border-l border-slate-200/30 group cursor-default">
            <span className="text-2xl font-black text-emerald-500 transform group-hover:scale-110 group-hover:text-emerald-600 transition duration-300">100%</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 text-center font-mono">{d.statExec}</span>
          </div>
        </div>

        {/* --- SECTION 2: ABOUT ME --- */}
        <section id="about" className="scroll-mt-24 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-start">
            <h3 className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold mb-3 font-mono">{d.aboutPrefix}</h3>
            <h2 className="text-3xl font-black mb-6">{d.aboutTitle}</h2>
            <div className={`p-6 rounded-2xl border transition-all duration-500 hover:border-purple-500/20 shadow-xl ${
              theme === "dark" ? "border-white/5 bg-[#080c16]/30 backdrop-blur-xl" : "border-slate-200/60 bg-white/90"
            }`}>
              <div className={`space-y-4 font-light text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                <p>{d.aboutP1}</p>
                <p>{d.aboutP2}</p>
                <p>{d.aboutP3}</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-xs flex justify-center">
            <div className={`relative w-full aspect-square rounded-3xl border p-2 overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all duration-500 ${
              theme === 'dark' ? 'border-white/10 bg-slate-900/10' : 'border-slate-200 bg-white'
            }`}>
              <div 
                className="w-full h-full rounded-2xl bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/assets/about-workspace.png')" }}
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TECH STACK --- */}
        <section id="tech" className="scroll-mt-24 text-start">
          <h3 className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold mb-3 font-mono">{d.techPrefix}</h3>
          <h2 className="text-3xl font-black mb-8">{d.techTitle}</h2>
          <TechStack />
        </section>

        {/* --- SECTION 4: FEATURED PROJECTS --- */}
        <section id="projects" className="scroll-mt-24 text-start">
          <h3 className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold mb-3 font-mono">{d.projPrefix}</h3>
          <h2 className="text-3xl font-black mb-8">{d.projTitle}</h2>
          <Projects />
        </section>

        {/* --- SECTION 5: CONTACT & FOOTER --- */}
        <section id="contact" className={`border-t pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-start ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold mb-3 font-mono">{d.connectPrefix}</h3>
            <h2 className="text-3xl font-black mb-6">{d.connectTitle}</h2>
            <p className={`text-sm leading-relaxed font-light ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {d.connectDesc}
            </p>
            <div className={`mt-8 p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-3 font-mono text-xs justify-center hover:border-purple-500/20 shadow-2xl ${
              theme === "dark" ? "border-white/5 bg-[#080c16]/40 backdrop-blur-md" : "border-slate-200/60 bg-white/90 text-slate-700"
            }`}>
              <p className="hover:translate-x-1.5 transition-transform duration-300">📩 <a href="mailto:Fateemabarde086@gmail.com" className="hover:text-blue-500 transition">Fateemabarde086@gmail.com</a></p>
              <p className="hover:translate-x-1.5 transition-transform duration-300">🐙 <a href="https://github.com/fateemabarde086" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">github.com/fateemabarde086</a></p>
              <p className="hover:translate-x-1.5 transition-transform duration-300">💼 <a href="https://linkedin.com/in/fatima-abdulhadi-77a833393" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">linkedin.com/in/fatima-abdulhadi-77a833393</a></p>
            </div>
          </div>

          <Contact currentLang={lang} />
        </section>

      </div>

      {/* --- SECRET FLOATING SUPERUSER MODAL TERMINAL OVERLAY --- */}
      {showSecretAdmin && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-10 transition-all duration-300">
          <div className="relative w-full max-w-2xl bg-[#03050c] border border-white/10 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setShowSecretAdmin(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-rose-600 text-slate-400 hover:text-white transition-all duration-200"
            >
              <X size={18} />
            </button>
            <AdminPortal />
          </div>
        </div>
      )}

    </main>
  );
}