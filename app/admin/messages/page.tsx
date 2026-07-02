"use client";

import { useState } from "react";
import { 
  ShieldAlert, Loader2, Mail, User, Clock, Terminal, Reply, 
  LayoutDashboard, Eye, Users, Download, Layers, Radio, 
  RefreshCw, LogOut, MessageSquare, ArrowUpRight
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Metrics {
  totalViews: number;
  uniqueVisitors: number;
  cvDownloads: number;
  githubClicks: number;
  linkedinClicks: number;
  liveVisitors: number;
}

export default function AdminPortal() {
  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "messages">("dashboard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await fetchData();
  }

  async function fetchData() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setMessages(data.messages || []);
        setMetrics(data.metrics || null);
      } else {
        setError(data.error || "Clearance failed.");
      }
    } catch (err) {
      setError("Failed to link with secure data vault.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-mono">
        <div className="w-full max-w-md p-8 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-xl text-start">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="text-indigo-600" size={26} />
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Control Center Gate</h3>
              <p className="text-[10px] text-slate-400">SECURE ADMINISTRATIVE HANDSHAKE</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider">Administrative Passkey</label>
              <input 
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 text-slate-900 text-xs outline-none transition duration-200 tracking-widest text-center"
                placeholder="•••••••••••••••••"
              />
            </div>

            {error && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-[11px] text-center font-bold">{error}</div>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2 transition duration-200 shadow-md active:scale-[0.99]"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : <Terminal size={14} />}
              Authenticate Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Structural Glassmorphism Header */}
      <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 shadow-sm">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                Portfolio Control Center
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-mono tracking-tight">FATIMA // SECURE MASTER INTERFACE</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin text-indigo-600" : ""} />
            </button>
            <button 
              onClick={() => { setIsAuthenticated(false); setPasskey(""); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-xs font-bold text-rose-600 transition shadow-sm"
            >
              <LogOut size={14} /> Disconnect
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Navigation Tab Switching Rails */}
        <div className="flex border-b border-slate-200 gap-6 font-mono text-xs">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`pb-3 font-bold uppercase tracking-wider transition ${activeTab === "dashboard" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
          >
            📊 Dashboard Matrix
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`pb-3 font-bold uppercase tracking-wider transition relative ${activeTab === "messages" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
          >
            💬 Client Inbox
            {messages.length > 0 && (
              <span className="ml-1.5 bg-indigo-600 text-white px-1.5 py-0.5 rounded-full text-[9px] font-sans">
                {messages.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "dashboard" ? (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Live Monitoring Banner */}
            <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Radio size={16} className="text-blue-600 animate-pulse" />
                <p className="text-xs font-mono text-blue-800 font-bold">
                  LIVE TRACKER: <span className="text-sm ml-1 bg-white px-2 py-0.5 rounded-md border border-blue-200 shadow-sm">{metrics?.liveVisitors || 0}</span> sessions currently evaluating assets.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-blue-500 font-extrabold hidden sm:inline">Active Synchronous Channel</span>
            </div>

            {/* Glassmorphism Metric Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 hover:border-indigo-300 transition duration-300 group">
                <div className="flex justify-between items-center text-indigo-600">
                  <Eye size={20} className="group-hover:scale-110 transition" />
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{metrics?.totalViews || 0}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">Total Portfolio Views</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 hover:border-purple-300 transition duration-300 group">
                <div className="flex justify-between items-center text-purple-600">
                  <Users size={20} className="group-hover:scale-110 transition" />
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-purple-400 transition" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{metrics?.uniqueVisitors || 0}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">Unique Visitors</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 hover:border-emerald-300 transition duration-300 group">
                <div className="flex justify-between items-center text-emerald-600">
                  <MessageSquare size={19} className="group-hover:scale-110 transition" />
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-emerald-400 transition" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{messages.length}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">New Inbound Messages</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 hover:border-rose-300 transition duration-300 group">
                <div className="flex justify-between items-center text-rose-600">
                  <Download size={19} className="group-hover:scale-110 transition" />
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-rose-400 transition" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{metrics?.cvDownloads || 0}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">CV Downloads</p>
                </div>
              </div>

              {/* GitHub Metric Card - Hand-coded SVG integration */}
              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 hover:border-slate-400 transition duration-300 group">
                <div className="flex justify-between items-center text-slate-700">
                  <svg className="w-5 h-5 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-500 transition" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{metrics?.githubClicks || 0}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">GitHub Clicks</p>
                </div>
              </div>

              {/* LinkedIn Metric Card - Hand-coded SVG integration */}
              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 hover:border-blue-400 transition duration-300 group">
                <div className="flex justify-between items-center text-blue-600">
                  <svg className="w-5 h-5 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500 transition" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{metrics?.linkedinClicks || 0}</h3>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">LinkedIn Clicks</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-3 md:col-span-1 lg:col-span-2 hover:border-amber-400 transition duration-300 group flex flex-col justify-center">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <Layers size={18} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Project Deploy System</span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800">Dynamic Asset Synchronization</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Module infrastructure operational.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Structured Inbox View */
          <div className="space-y-4 animate-in fade-in duration-200">
            {messages.length === 0 ? (
              <div className="p-16 text-center border border-dashed border-slate-200 rounded-3xl bg-white/60 text-slate-400 font-mono text-xs">
                No transmission records found inside this matrix sync step.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-6 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm space-y-4 hover:border-indigo-200 transition duration-300 flex flex-col justify-between text-start group">
                    <div className="space-y-3">
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-3">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <User size={14} className="text-indigo-500" /> {msg.name}
                          </h4>
                          <a href={`mailto:${msg.email}`} className="text-xs text-slate-400 font-mono hover:text-indigo-600 block transition select-all">
                            {msg.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                          <Clock size={11} /> {msg.timestamp}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal antialiased whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <a 
                        href={`mailto:${msg.email}?subject=RE: Professional Engagement Inquiry`}
                        className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white px-4 py-2 rounded-xl transition duration-200 border border-indigo-100/30"
                      >
                        <Reply size={12} /> Dispatch Reply
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}