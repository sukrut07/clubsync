import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Zap, Mail, Lock, User, ArrowRight, Shield,
    Rocket, Briefcase, GraduationCap, Github
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-300 flex items-center justify-center p-6 relative selection:bg-indigo-500 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="w-full max-w-5xl flex flex-col lg:flex-row glass-card border-white/5 shadow-2xl overflow-hidden relative z-10 animate-fade-in shadow-indigo-600/5">

                {/* Right Side: Form First on Mobile */}
                <div className="lg:w-1/2 p-16 bg-[#0f172a]/50 backdrop-blur-3xl flex flex-col justify-center order-2 lg:order-1">
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Create Hub</h3>
                        <p className="text-sm font-normal text-slate-500">Initialize your presence in the network.</p>
                    </div>

                    <form className="space-y-6 mb-12" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Agent Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Neural Contact</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        placeholder="you@email.com"
                                        className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Secure Pass-Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Assign Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border-2 border-indigo-600 rounded-2xl flex items-center gap-3 cursor-pointer group hover:bg-indigo-600/10 transition-all">
                                    <GraduationCap size={20} className="text-indigo-400" />
                                    <span className="text-[10px] font-bold uppercase text-white">Student</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3 cursor-pointer group hover:bg-white/10 transition-all">
                                    <Briefcase size={20} className="text-slate-500" />
                                    <span className="text-[10px] font-bold uppercase text-slate-500">Leader</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full btn-primary py-5 shadow-indigo-600/20 shadow-2xl text-md">
                            Found Account <Rocket size={20} />
                        </button>
                    </form>

                    <div className="text-center text-sm font-medium border-t border-white/5 pt-10">
                        <span className="text-slate-500">Existing Hub? </span>
                        <Link to="/login" className="text-indigo-400 font-bold hover:text-white transition-colors underline-offset-4 hover:underline">Initiate Login</Link>
                    </div>
                </div>

                {/* Left Side: Illustration & Branding (Order 2 means it stays last on mobile) */}
                <div className="lg:w-1/2 bg-indigo-600/10 p-16 flex flex-col justify-between border-l border-white/5 relative group order-1 lg:order-2">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>
                    <div>
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Zap size={26} color="white" fill="white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">ClubSync</span>
                        </div>
                        <h2 className="text-5xl font-bold text-white leading-[1.1] tracking-tight mb-8">ELEVATE <br />YOUR <span className="gradient-text">POTENTIAL.</span></h2>
                        <p className="text-lg font-normal text-slate-400 mb-12 leading-relaxed">Join the decentralized campus network. Orchestrate events, climb leaderboards, and unify your student performance metrics.</p>

                        <div className="glass-card p-8 bg-black/20 border-white/5 backdrop-blur-3xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Live Adoption</span>
                            </div>
                            <div className="text-3xl font-bold text-white">142+ <span className="text-lg font-semibold text-slate-500">Clubs Synced</span></div>
                        </div>
                    </div>

                    <div className="pt-12 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 flex items-center gap-6">
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Github size={16} /> Open Infrastructure</div>
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">v1.2.4-stable</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
