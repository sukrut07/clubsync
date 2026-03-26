import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Zap, ArrowRight, Shield, Calendar, Users, Trophy,
    Star, Sparkles, Play, Layout, TrendingUp, Layers
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveLeaderboard from '../components/InteractiveLeaderboard';

// --- Sub-components ---

const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const targetValue = parseInt(end.toString().replace(/[^0-9]/g, '')) || 0;
        if (targetValue === 0) {
            setCount(end);
            return;
        }
        const increment = targetValue / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
                setCount(targetValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration]);
    return count;
};

const FeatureCard = ({ icon: Icon, title, desc, delay, color = "indigo" }) => (
    <div className={`glass-card p-10 group hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-${color}-500/30 hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] animate-fade-in flex flex-col h-full`} style={{ animationDelay: `${delay}ms` }}>
        <div className={`w-16 h-16 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-${color}-500/20 transition-all shadow-inner border border-white/5`}>
            <Icon size={32} className={`text-${color}-400 group-hover:text-${color}-300 transition-colors`} />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white tracking-tight group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-medium flex-grow">{desc}</p>
    </div>
);

const StatCard = ({ title, value, subtitle, icon: Icon, delay }) => {
    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, '')) || 0;
    const suffix = value.toString().replace(/[0-9]/g, '');
    const animatedValue = useCounter(numericValue);

    return (
        <div className="glass-card p-8 border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full -translate-y-12 translate-x-12 group-hover:bg-indigo-500/10 transition-colors"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{title}</span>
                </div>
                <div className="text-4xl font-black mb-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                    {animatedValue}{suffix}
                </div>
                <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
            </div>
        </div>
    );
};

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
                    <div className="absolute inset-0 z-0 text-white">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src="https://cdn.pixabay.com/video/2024/04/22/209019_large.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-[#020617]/95 backdrop-blur-[1px]"></div>
                    </div>

                    <div className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                                <Sparkles size={16} fill="currentColor" /> The Next-Gen Campus OS
                            </div>

                            <div className="mb-10">
                                <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter text-white transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(56,189,241,0.6)]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    MITAOE ClubSync
                                </h1>
                                <p className="gradient-text text-xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Hackathon 2026</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">CSI Club — 24 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20 uppercase tracking-tight">Hackathon</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Robotics Workshop</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Robotics Club — 26 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 uppercase tracking-tight">Workshop</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Cultural Fest Meeting</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Cultural Club — 28 Mar</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-tight">Meeting</span>
                                            </div>
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

                {/* College Stats Section */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        <StatCard title="Total Clubs" value="20+" subtitle="Active clubs in MITAOE" icon={Users} delay={100} />
                        <StatCard title="Events Conducted" value="100+" subtitle="Events organized till now" icon={Calendar} delay={200} />
                        <StatCard title="Active Students" value="2000+" subtitle="Participating students" icon={Sparkles} delay={300} />
                        <StatCard title="Campus Ranking" value="#1" subtitle="Club activity score" icon={Trophy} delay={400} />
                    </div>
                </section>

                {/* Leaderboards Section */}
                <section className="py-24 px-6 border-t border-white/5 relative">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Top Clubs */}
                        <InteractiveLeaderboard
                            title="Top Clubs at MITAOE"
                            items={[
                                { name: 'Girlscript MITAOE', score: '98 PTS' },
                                { name: 'Vertex', score: '94 PTS' },
                                { name: 'E-Cell', score: '89 PTS' },
                                { name: 'CSI', score: '85 PTS' },
                                { name: 'Robotics Club', score: '82 PTS' }
                            ]}
                            icon={Trophy}
                            iconColor="#fbbf24"
                        />

                        {/* Top Participants */}
                        <InteractiveLeaderboard
                            title="Top Active Participants"
                            items={[
                                { name: 'Aditi Sharma', score: '240 XP' },
                                { name: 'Rohan Patil', score: '210 XP' },
                                { name: 'Sneha Kulkarni', score: '195 XP' },
                                { name: 'Omkar Jadhav', score: '180 XP' },
                                { name: 'Pratik Deshmukh', score: '165 XP' }
                            ]}
                            icon={Star}
                            iconColor="#22d3ee"
                        />
                    </div>
                </section>

                {/* Explore Clubs CTA Section */}
                <section id="clubs" className="py-40 px-6 relative overflow-hidden bg-gradient-to-b from-transparent to-indigo-900/5 transition-colors">
                    <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 shadow-inner">
                            Campus Ecosystem
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                            Discover Your <span className="gradient-text">Community.</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join over 20+ specialized clubs and associations at MITAOE. Whether you're into tech, arts, or leadership, find your perfect fit today.
                        </p>

                        <div className="flex justify-center">
                            <Link to="/clubs">
                                <button className="btn-primary group text-xl px-14 py-6 shadow-[0_0_50px_rgba(99,102,241,0.3)] hover:shadow-[0_0_80px_rgba(99,102,241,0.5)] transition-all transform hover:scale-105 active:scale-95">
                                    Explore All Clubs <ArrowRight size={24} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[160px] rounded-full -z-10"></div>
                </section>

                {/* Features Section */}
                <section id="about" className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl font-bold mb-6 tracking-tight text-white uppercase italic">POWERING CAMPUS <br /><span className="gradient-text">EXCELLENCE.</span></h2>
                            <p className="text-slate-400 max-w-3xl mx-auto text-lg font-medium leading-relaxed">The unified digital hub for managing, organizing, and tracking club activities across the MITAOE ecosystem.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={Layers}
                                color="indigo"
                                title="Club Management"
                                desc="Create, manage, and monitor all MITAOE clubs in one place. Admins can add clubs, assign roles, track members, and manage activities easily."
                                delay={100}
                            />
                            <FeatureCard
                                icon={Calendar}
                                color="cyan"
                                title="Event & Registration"
                                desc="Organize college events, manage registrations, and track participation in real time. Students can join events, and admins can view registration statistics instantly."
                                delay={200}
                            />
                            <FeatureCard
                                icon={TrendingUp}
                                color="violet"
                                title="Leaderboard & Analytics"
                                desc="Track top clubs, active students, and event participation across MITAOE. View leaderboards, statistics, and performance insights from the dashboard."
                                delay={300}
                            />
                        </div>
                    </div>
                </section>

                {/* Footer is handled outside main */}
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
