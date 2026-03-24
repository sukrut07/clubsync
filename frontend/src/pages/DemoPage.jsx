import { useState, useEffect } from 'react';
import {
    Shield, Zap, TrendingUp, Trophy, Calendar, Users,
    Star, BarChart3, Globe, ArrowRight, Play, Server,
    Activity, Database, Cloud, Cpu
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DemoPage = () => {
    const projectionData = [
        { month: 'Jan', students: 1200, activity: 40 },
        { month: 'Feb', students: 2400, activity: 65 },
        { month: 'Mar', students: 4800, activity: 45 },
        { month: 'Apr', students: 8600, activity: 80 },
        { month: 'May', students: 12500, activity: 95 },
    ];

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-300 relative selection:bg-indigo-500 overflow-x-hidden pt-32 pb-20 px-6">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/5 blur-[150px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <Play size={14} fill="currentColor" /> Executive Presentation Mode
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tight text-white uppercase">
                        The Future of <br /><span className="gradient-text">Engagement.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-normal leading-relaxed italic">A high-fidelity snapshot of the ClubSync infrastructure, growth curves, and global campus adoption metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: "Active Nodes", value: "142", icon: Server, color: "#6366f1" },
                        { label: "Synced Users", value: "24.8k", icon: Users, color: "#06b6d4" },
                        { label: "Project Deployments", value: "2,148", icon: Cpu, color: "#8b5cf6" },
                        { label: "Platform Health", value: "99.9%", icon: Activity, color: "#10b981" }
                    ].map((s, i) => (
                        <div key={i} className="glass-card p-8 border-white/5 hover:border-indigo-500/30 transition-all duration-500 group relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl"></div>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                                <s.icon size={28} style={{ color: s.color }} />
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                            <div className="text-4xl font-bold text-white tracking-tight">{s.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2 glass-card p-12 border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full"></div>
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight mb-2 leading-none">Exponential Growth Curve</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global student adoption (MoM)</p>
                            </div>
                            <div className="flex items-center gap-2 text-green-500 text-sm font-bold bg-green-500/10 px-4 py-2 rounded-xl">
                                <TrendingUp size={18} /> +240% Annualized
                            </div>
                        </div>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={projectionData}>
                                    <defs>
                                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }} />
                                    <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-card p-12 border-white/5 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight mb-10 flex items-center gap-3">
                                <Database size={24} className="text-cyan-400" /> Infrastructure
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { label: "Core API", status: "Optimal", color: "text-green-500" },
                                    { label: "Real-time Sync", status: "94ms Latency", color: "text-indigo-400" },
                                    { label: "CDN Global Edge", status: "Verified", color: "text-green-500" },
                                    { label: "Auto-Scale Group", status: "Standby", color: "text-slate-500" }
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-tight">{s.label}</div>
                                        <div className={`text-[9px] font-bold uppercase tracking-[0.15em] ${s.color}`}>{s.status}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Cloud size={20} className="text-indigo-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">AWS Integration</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed font-normal italic">"ClubSync scaled from 100 to 24,000 users without a single incident of downtime."</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button onClick={() => window.location.href = '/login'} className="btn-primary px-16 py-6 text-xl group shadow-indigo-600/30 shadow-2xl font-bold">
                        Initialize Main Environment <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DemoPage;
