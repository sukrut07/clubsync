import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Users, Calendar, FileText, Activity, TrendingUp, BarChart2, PieChart as PieChartIcon } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="glass-card p-6 border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-indigo-500/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-indigo-400 group-hover:scale-110 transition-transform" style={{ color }}>
                <Icon size={24} />
            </div>
            {change && (
                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/10">
                    {change}
                </div>
            )}
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</div>
        <div className="text-3xl font-black text-white tracking-tight">{value}</div>
    </div>
);

const participationData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 55 },
    { name: 'Mar', value: 80 },
    { name: 'Apr', value: 60 },
    { name: 'May', value: 95 },
];

const eventsData = [
    { name: 'Jan', events: 3 },
    { name: 'Feb', events: 5 },
    { name: 'Mar', events: 6 },
    { name: 'Apr', events: 4 },
    { name: 'May', events: 8 },
];

const clubActivityData = [
    { name: 'Robotics', value: 20 },
    { name: 'Coding', value: 30 },
    { name: 'Cultural', value: 15 },
    { name: 'Dance', value: 10 },
    { name: 'Music', value: 12 },
    { name: 'Sports', value: 13 },
];

const COLORS = ['#6366f1', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e'];

const Analytics = () => {
    return (
        <div className="animate-fade-in space-y-10 pb-20">
            {/* Header */}
            <div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Analytics <span className="gradient-text">Dashboard.</span></h2>
                <p className="text-slate-500 font-normal tracking-tight">Real-time intelligence and campus engagement metrics.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Total Members" value="1,240" change="+12%" icon={Users} color="#6366f1" />
                <StatCard title="Total Events" value="48" change="+4" icon={Calendar} color="#06b6d4" />
                <StatCard title="Total Registrations" value="2,890" change="+28%" icon={FileText} color="#f59e0b" />
                <StatCard title="Participation Rate" value="94%" change="+5%" icon={Activity} color="#10b981" />
            </div>

            {/* Middle Section: Bar & Line Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
                <div className="glass-card p-8 border-white/5 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <BarChart2 className="text-indigo-400" size={20} />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Participation Overview</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={participationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-8 border-white/5 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="text-cyan-400" size={20} />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Events Created Per Month</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={eventsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Line type="monotone" dataKey="events" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Pie Chart */}
            <div className="glass-card p-10 border-white/5">
                <div className="flex items-center gap-3 mb-10">
                    <PieChartIcon className="text-purple-400" size={24} />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">Club Activity Distribution</h3>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around gap-10">
                    <div className="h-[350px] w-full md:w-1/2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={clubActivityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {clubActivityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" formatter={(value) => <span className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-1/3">
                        {clubActivityData.map((item, index) => (
                            <div key={index} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.name}</div>
                                <div className="text-xl font-black text-white">{item.value}%</div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: COLORS[index % COLORS.length] }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
