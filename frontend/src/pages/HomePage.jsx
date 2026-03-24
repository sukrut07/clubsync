import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Zap, ArrowRight, Shield, Calendar, Users, Trophy,
    CheckCircle, Star, Globe, TrendingUp, Sparkles, Play, Hexagon
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <div className={`glass-card p-10 group hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-indigo-500/30 animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
            <Icon size={32} className="text-indigo-400 group-hover:text-indigo-300" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-normal">{desc}</p>
    </div>
);

const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-300 relative selection:bg-indigo-500 selection:text-white">
            <Navbar />

            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/5 blur-[150px] rounded-full"></div>
            </div>

            <main className="relative z-10">
                <section className="relative overflow-hidden border-b border-white/5">
                    {/* Video Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="https://cdn.pixabay.com/video/2024/04/22/209019_large.mp4" type="video/mp4" />
                        </video>
                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#020617] backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                                <Sparkles size={16} fill="currentColor" /> The Next-Gen Campus OS
                            </div>

                            <div className="mb-10">
                                <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter text-white transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.9)] hover:scale-105 cursor-default" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    MITAOE ClubSync
                                </h1>
                                <p className="gradient-text text-xl md:text-4xl font-bold tracking-tight transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105 cursor-default" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    Campus Club Management System
                                </p>
                            </div>

                            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                                ClubSync is the official MITAOE club management platform. Organize events, manage student clubs, track participation, and coordinate campus activities through one unified system.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                <Link to="/signup">
                                    <button className="btn-primary group text-lg px-12 py-5 shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)]">
                                        Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <Link to="/demo">
                                    <button className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-2xl text-lg font-bold text-white transition-all backdrop-blur-xl active:scale-95 group">
                                        <Play size={20} fill="white" /> View Demo
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 w-full lg:block hidden">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[32px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="glass-card aspect-auto w-full p-8 border-white/10 shadow-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                                <Calendar size={20} className="text-indigo-400" /> Upcoming Events
                                            </h3>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Hackathon */}
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Hackathon 2026</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">CSI Club — 24 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20 uppercase tracking-tight">Hackathon</span>
                                            </div>

                                            {/* Workshop */}
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Robotics Workshop</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Robotics Club — 26 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 uppercase tracking-tight">Workshop</span>
                                            </div>

                                            {/* Meeting */}
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Cultural Fest Meeting</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Cultural Club — 28 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-tight">Meeting</span>
                                            </div>

                                            {/* Competition */}
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">AI Bootcamp</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">AI Club — 30 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20 uppercase tracking-tight">Competition</span>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Campus Vibe</span>
                                                <span className="text-[10px] font-bold text-indigo-400">92%</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[92%] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-white/[0.01] border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: "Partner Clubs", value: "142+", color: "text-indigo-400" },
                            { label: "Daily Active", value: "8.4k", color: "text-cyan-400" },
                            { label: "Global Ranking", value: "#1", color: "text-purple-400" },
                            { label: "Points Earned", value: "1.2M", color: "text-pink-400" }
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className={`text-5xl font-bold mb-2 tracking-tight ${s.color}`}>{s.value}</div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section id="about" className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl font-bold mb-6 tracking-tight text-white">EVERYTHING YOU NEED TO <br /><span className="gradient-text">DOMINATE.</span></h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-normal">Built for ambitious clubs and high-performing students who want to stand out.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={Layout}
                                title="Smart CRM"
                                desc="Manage members, roles, and registrations with a specialized CRM built for campus life."
                                delay={100}
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Gamified Growth"
                                desc="Unlock badges, gain XP, and climb the leaderboard as you lead the campus movement."
                                delay={200}
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Ironclad Security"
                                desc="Enterprise-grade authentication and role-based access to keep your data protected."
                                delay={300}
                            />
                        </div>
                    </div>
                </section>

                {/* Dynamic CTA */}
                <section id="support" className="py-40 px-6">
                    <div className="max-w-6xl mx-auto glass-card p-20 text-center border-indigo-500/20 overflow-hidden relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                        <h2 className="text-6xl font-bold mb-8 leading-tight tracking-tight text-white">OWN YOUR <br /><span className="gradient-text">CAMPUS LIFE.</span></h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-normal">Join 8,000+ students and level up your leadership game today.</p>
                        <div className="flex justify-center gap-6">
                            <Link to="/signup">
                                <button className="btn-primary px-12 py-5 text-lg">Join the Network</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const Layout = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
    </svg>
);

export default HomePage;
