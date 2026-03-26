import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, Cell
} from 'recharts';
import {
    Users, Calendar, Activity, TrendingUp,
    Award, Star, Zap, GraduationCap,
    ArrowUpRight, Globe, Layers
} from 'lucide-react';

// --- Components ---

const MiniSparkline = ({ data, color }) => (
    <div className="h-8 w-16 opacity-50 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    fill={`url(#gradient-${color.replace('#', '')})`}
                    strokeWidth={2}
                />
                <defs>
                    <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const StatCard = ({ title, value, subtitle, icon: Icon, color, sparkData }) => (
    <div className="glass-card p-6 border-white/5 relative overflow-hidden group hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full translate-x-12 -translate-y-12 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg" style={{ color: color }}>
                <Icon size={24} />
            </div>
            {sparkData && <MiniSparkline data={sparkData} color={color} />}
        </div>

        <div className="relative z-10">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</div>
            <div className="flex items-baseline gap-2 mb-1">
                <div className="text-4xl font-black text-white tracking-tight animate-counter">{value}</div>
                {title === "Participation Rate" && <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5"><ArrowUpRight size={14} /> 5%</span>}
            </div>
            <div className="text-[11px] font-bold text-slate-500 tracking-tight">{subtitle}</div>
        </div>

        {/* Glowing border bottom */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent group-hover:w-full transition-all duration-700"></div>
    </div>
);

// --- Data ---

const sparklineData = Array(10).fill(0).map((_, i) => ({ value: Math.floor(Math.random() * 40) + 10 }));

const participationGrowthData = [
    { name: 'Jan', participation: 120 },
    { name: 'Feb', participation: 240 },
    { name: 'Mar', participation: 310 },
    { name: 'Apr', participation: 500 },
    { name: 'May', participation: 720 },
    { name: 'Jun', participation: 950 },
];

const activeClubs = [
    { rank: 1, name: 'Girlscript', score: 980, icon: Star },
    { rank: 2, name: 'Vertex', score: 850, icon: Zap },
    { rank: 3, name: 'E-Cell', score: 720, icon: Globe },
    { rank: 4, name: 'CSI', score: 640, icon: Layers },
    { rank: 5, name: 'Robotics Club', score: 590, icon: Activity },
];

const topStudents = [
    { name: 'Aditi Sharma', events: 18, xp: 240 },
    { name: 'Rohan Patil', events: 15, xp: 210 },
    { name: 'Sneha Kulkarni', events: 14, xp: 195 },
    { name: 'Omkar Jadhav', events: 12, xp: 170 },
    { name: 'Pratik Deshmukh', events: 11, xp: 155 },
];

// --- Page Component ---

const Analytics = () => {
    return (
        <div className="animate-fade-in space-y-10 pb-20">
            {/* Header */}
            <div>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Analytics <span className="gradient-text">Command Center.</span></h2>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Operational Intelligence & Student Engagement Index</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Total Clubs"
                    value="25+"
                    subtitle="Registered MITAOE clubs"
                    icon={GraduationCap}
                    color="#6366f1"
                    sparkData={sparklineData}
                />
                <StatCard
                    title="Total Events"
                    value="100+"
                    subtitle="Events conducted till now"
                    icon={Calendar}
                    color="#06b6d4"
                    sparkData={sparklineData}
                />
                <StatCard
                    title="Active Students"
                    value="2000+"
                    subtitle="Students using ClubSync"
                    icon={Users}
                    color="#8b5cf6"
                    sparkData={sparklineData}
                />
                <StatCard
                    title="Participation Rate"
                    value="78%"
                    subtitle="Average monthly engagement"
                    icon={Activity}
                    color="#10b981"
                    sparkData={sparklineData}
                />
            </div>

            {/* Second Row: Growth Graph */}
            <div className="glass-card p-10 border-white/5 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
                <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <TrendingUp size={22} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Participation Growth</h3>
                            <p className="text-[10px] font-bold text-slate-500">MONTHLY TRAFFIC & REGISTRATION ANALYSIS</p>
                        </div>
                    </div>
                </div>

                <div className="h-[400px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={participationGrowthData}>
                            <defs>
                                <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                                labelStyle={{ color: '#6366f1', marginBottom: '8px', fontWeight: '900', fontSize: '10px', letterSpacing: '0.1em' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="participation"
                                stroke="#6366f1"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorPart)"
                                animationDuration={2000}
                                animationEasing="ease-in-out"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Third Row: Leaderboards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Most Active Clubs */}
                <div className="glass-card p-10 border-white/5 relative group overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                            <Award size={22} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Most Active Clubs</h3>
                    </div>

                    <div className="space-y-4">
                        {activeClubs.map((club, idx) => (
                            <div
                                key={club.name}
                                className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group/item ${idx === 0
                                        ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/30 text-white'
                                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-white/20' : 'bg-white/5 text-indigo-400'}`}>
                                        #{club.rank}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-white/10' : 'bg-white/5'}`}>
                                            <club.icon size={16} />
                                        </div>
                                        <span className={`font-bold tracking-tight ${idx === 0 ? 'text-white' : 'text-slate-200'}`}>{club.name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`text-lg font-black ${idx === 0 ? 'text-white' : 'text-indigo-400'}`}>{club.score}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Activity Score</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Participating Students */}
                <div className="glass-card p-10 border-white/5 relative group overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Users size={22} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Top Participating Students</h3>
                    </div>

                    <div className="space-y-4">
                        {topStudents.map((student, idx) => (
                            <div key={student.name} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group/item">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xs group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                                        {student.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-white tracking-tight">{student.name}</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{student.events} Events Attended</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1.5">
                                        <Zap size={14} className="text-amber-400" />
                                        <span className="text-lg font-black text-white tracking-tight">{student.xp}</span>
                                        <span className="text-xs font-black text-indigo-400">XP</span>
                                    </div>
                                    <div className="h-1 w-24 bg-white/5 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                                            style={{ width: `${(student.xp / 250) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-4 bg-white/5 hover:bg-indigo-600 border border-white/5 rounded-2xl transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white">
                        View Detailed Rankings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
