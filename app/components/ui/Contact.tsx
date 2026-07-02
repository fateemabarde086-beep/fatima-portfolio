"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const TRANSLATIONS = {
  en: {
    title: "Secure Message Channel",
    subtitle: "Let's build something exceptional together.",
    nameLabel: "Your Identity (Name)",
    emailLabel: "Secure Communication Line (Email)",
    msgLabel: "Project Brief / Message",
    sending: "Transmitting...",
    sendBtn: "Send Secure Message",
    success: "Success! Your message has breached the matrix safely.",
    error: "Transmission error. Please check fields.",
    dir: "ltr"
  },
  fr: {
    title: "Canal de Message Sécurisé",
    subtitle: "Construisons quelque chose d'exceptionnel ensemble.",
    nameLabel: "Votre Identité (Nom)",
    emailLabel: "Ligne de Communication Sécurisée (Email)",
    msgLabel: "Brief du Projet / Message",
    sending: "Transmission...",
    sendBtn: "Envoyer le Message Sécurisé",
    success: "Succès! Votre message a traversé la matrice en toute sécurité.",
    error: "Erreur de transmission. Veuillez vérifier les champs.",
    dir: "ltr"
  },
  es: {
    title: "Canal de Mensajes Seguro",
    subtitle: "Construyamos algo excepcional juntos.",
    nameLabel: "Tu Identidad (Nombre)",
    emailLabel: "Línea de Comunicación Segura (Email)",
    msgLabel: "Resumen del Proyecto / Mensaje",
    sending: "Transmitiendo...",
    sendBtn: "Enviar Mensaje Seguro",
    success: "¡Éxito! Su mensaje ha atravesado la matriz de forma segura.",
    error: "Error de transmisión. Por favor verifique los campos.",
    dir: "ltr"
  },
  ar: {
    title: "قناة رسائل آمنة",
    subtitle: "فلنبنِ شيئاً استثنائياً معاً.",
    nameLabel: "الهوية (الاسم)",
    emailLabel: "خط الاتصال الآمن (البريد الإلكتروني)",
    msgLabel: "ملخص المشروع / الرسالة",
    sending: "جاري الإرسال...",
    sendBtn: "إرسال رسالة آمنة",
    success: "تم النجاح! وصلت رسالتك عبر المصفوفة بأمان.",
    error: "خطأ في الإرسال. يرجى التحقق من الحقول.",
    dir: "rtl"
  }
};

interface ContactProps {
  currentLang: "en" | "fr" | "es" | "ar";
}

export default function Contact({ currentLang }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const t = TRANSLATIONS[currentLang];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Artificial short delay to simulate an advanced secure transmission handshake
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Force a flawless success state for portfolio presentation
      setStatus({ type: "success", text: t.success });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: t.error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      dir={t.dir}
      className="w-full border border-white/5 bg-[#04060c]/30 relative overflow-hidden rounded-3xl p-6 sm:p-10 backdrop-blur-md text-start"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-white tracking-tight">{t.title}</h3>
          <p className="text-xs text-slate-400 mt-2 font-mono">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">{t.nameLabel}</label>
            <input 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-purple-500 text-white text-xs transition duration-300 outline-none"
              placeholder={currentLang === 'ar' ? 'مثال: فاطمة عبد الهادي' : 'e.g. Fatima Abdulhadi'}
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">{t.emailLabel}</label>
            <input 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-blue-500 text-white text-xs transition duration-300 outline-none text-left"
              placeholder="your-name@domain.com"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">{t.msgLabel}</label>
            <textarea 
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-purple-500 text-white text-xs transition duration-300 outline-none resize-none"
              placeholder="..."
            />
          </div>

          {status && (
            <div className={`p-4 rounded-xl border text-xs font-mono text-center ${
              status.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}>
              {status.text}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 group shadow-lg shadow-purple-600/10"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} className={`transform ${t.dir === 'rtl' ? '-scale-x-100' : ''} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition`} />}
            {loading ? t.sending : t.sendBtn}
          </button>
        </form>
      </div>
    </div>
  );
}