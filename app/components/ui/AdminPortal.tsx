"use client";

import { useState } from "react";
import { ShieldAlert, Loader2, Mail, User, Clock, Terminal } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function AdminPortal() {
  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setMessages(data.messages);
      } else {
        setError(data.error || "Clearance failed.");
      }
    } catch (err) {
      setError("Failed to link with secure data vault.");
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto p-8 rounded-3xl border border-rose-500/10 bg-[#080104]/40 backdrop-blur-md text-start">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="text-rose-500 animate-pulse" size={24} />
          <div>
            <h3 className="text-lg font-black text-white font-mono">SUPERUSER GATEWAY</h3>
            <p className="text-[10px] text-slate-500 font-mono">RESTRICTED INTERFACE // CLEARANCE REQUIRED</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-rose-400 mb-2">Administrative Passkey</label>
            <input 
              type="password"
              required
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-rose-500 text-white font-mono text-xs outline-none transition"
              placeholder="•••••••••••••••••"
            />
          </div>

          {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-mono">{error}</div>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold uppercase font-mono tracking-wider flex justify-center items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : <Terminal size={14} />}
            Authenticate Clearance
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full text-start space-y-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Lead Acquisition Vault</h3>
          <p className="text-xs text-emerald-400 font-mono mt-1">● SECURITY_STATUS: ENCRYPTED_CHANNEL_ACTIVE</p>
        </div>
        <button 
          onClick={() => { setIsAuthenticated(false); setPasskey(""); }}
          className="px-4 py-1.5 rounded-xl border border-white/10 bg-white/5 text-[10px] font-mono text-slate-400 hover:text-white transition"
        >
          Disconnect Terminal
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono">No incoming payload leads received in this matrix cycle.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="p-6 rounded-2xl border border-white/5 bg-[#080c16]/40 backdrop-blur-md space-y-4 hover:border-emerald-500/20 transition duration-300">
              <div className="flex flex-wrap justify-between items-start gap-2 border-b border-white/5 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <User size={13} className="text-blue-400" /> {msg.name}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <Mail size={13} className="text-purple-400" /> {msg.email}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-md">
                  <Clock size={11} /> {msg.timestamp}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}