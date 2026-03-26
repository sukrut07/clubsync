import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
    FileText, Calendar, Users, Activity,
    Search, Filter, Eye, X, Download,
    CheckCircle2, Clock, CalendarDays,
    ArrowUpRight, ChevronRight
} from 'lucide-react';

// --- Mock Data ---

const stats = [
    { title: 'Total Events Created', value: '48', subtitle: 'Admin managed events', icon: Calendar, color: '#6366f1' },
    { title: 'Total Registrations', value: '2,890', subtitle: 'Across all events', icon: Users, color: '#06b6d4' },
    { title: 'Average per Event', value: '60', subtitle: 'Registration density', icon: FileText, color: '#f59e0b' },
    { title: 'Active Events', value: '12', subtitle: 'Currently open for reg', icon: Activity, color: '#10b981' },
];

const chartData = [
    { name: 'Hackathon', value: 320 },
    { name: 'Robotics', value: 180 },
    { name: 'Fest', value: 95 },
    { name: 'Bootcamp', value: 210 },
    { name: 'Seminar', value: 150 },
    { name: 'Workshop', value: 120 },
];

const eventsData = [
    { id: 1, name: 'Hackathon 2026', club: 'CSI', date: '24 Mar', count: 320, status: 'Completed' },
    { id: 2, name: 'Robotics Workshop', club: 'Robotics Club', date: '26 Mar', count: 180, status: 'Completed' },
    { id: 3, name: 'Cultural Fest Meeting', club: 'Cultural Club', date: '28 Mar', count: 95, status: 'Ongoing' },
    { id: 4, name: 'AI Bootcamp', club: 'AI Club', date: '30 Mar', count: 210, status: 'Upcoming' },
    { id: 5, name: 'Web Dev Seminar', club: 'Coding Club', date: '02 Apr', count: 150, status: 'Upcoming' },
];

const studentRegistrations = [
    { name: 'Aditi Sharma', email: 'aditi@example.com', dept: 'Computer', year: 'TE', status: 'Attended' },
    { name: 'Rohan Patil', email: 'rohan@example.com', dept: 'IT', year: 'BE', status: 'Registered' },
    { name: 'Sneha Kulkarni', email: 'sneha@example.com', dept: 'Mechanical', year: 'SE', status: 'Attended' },
    { name: 'Omkar Jadhav', email: 'omkar@example.com', dept: 'EnTC', year: 'TE', status: 'Cancelled' },
    { name: 'Pratik Deshmukh', email: 'pratik@example.com', dept: 'Civil', year: 'BE', status: 'Registered' },
];

const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#8b5cf6', '#f43f5e'];

// --- Components ---

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="glass-card p-6 border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 hover:scale-[1.02]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-indigo-500/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500" style={{ color }}>
                <Icon size={24} />
            </div>
            <ArrowUpRight size={18} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
        </div>
        <div className="relative z-10">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</div>
            <div className="text-3xl font-black text-white tracking-tight mb-1">{value}</div>
            <div className="text-[11px] font-medium text-slate-500">{subtitle}</div>
        </div>
    </div>
);

const Registrations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredEvents = eventsData.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="animate-fade-in space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-2">Registrations <span className="gradient-text">Overview.</span></h2>
                    <p className="text-slate-500 font-medium max-w-xl">Monitor real-time participation metrics and manage student registrations across all MITAOE club events.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-sm font-bold text-white transition-all flex items-center gap-2 group">
                        <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> Export Data
                    </button>
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 rounded-2xl text-sm font-bold text-white transition-all">
                        Bulk Attendance
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
            </div>

            {/* Graph Section */}
            <div className="glass-card p-8 border-white/5 group">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Registrations per Event</h3>
                        <p className="text-[10px] font-bold text-slate-500 tracking-widest mt-0.5">TOP PERFORMING EVENTS BY PARTICIPATION</p>
                    </div>
                </div>
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
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
                                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table Section */}
            <div className="glass-card border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                            <FileText size={20} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Event Registrations</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by event or club..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm outline-none focus:border-indigo-500/30 transition-all w-full md:w-80"
                            />
                        </div>
                        <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-slate-400">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Event Name</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Club</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Date</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Registrations</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-white group-hover:text-indigo-400 transition-colors">{event.name}</div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-400">{event.club}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                            <CalendarDays size={14} /> {event.date}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black">
                                            {event.count}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                event.status === 'Ongoing' ? 'bg-amber-500/10 text-amber-400' :
                                                    'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => openModal(event)}
                                            className="px-4 py-2 bg-white/5 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white transition-all inline-flex items-center gap-2 border border-white/5"
                                        >
                                            <Eye size={14} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-[#0b1120]/80 backdrop-blur-md animate-fade-in"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-4xl glass-card border-indigo-500/30 shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[85vh]">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-2xl font-black text-white tracking-tight">Event Registrations</h3>
                                    <span className="px-3 py-1 rounded-full bg-indigo-500 text-[10px] font-black text-white uppercase tracking-widest">
                                        {selectedEvent?.name}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Detailed list of students registered for this event</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.03] border-b border-white/5">
                                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Student Name</th>
                                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Department</th>
                                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Year</th>
                                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {studentRegistrations.map((student, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-white group-hover:text-indigo-400 transition-colors uppercase text-sm tracking-tight">{student.name}</div>
                                                <div className="text-[11px] font-medium text-slate-500 mt-0.5">{student.email}</div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-400">{student.dept}</td>
                                            <td className="px-8 py-5 text-center text-sm font-black text-slate-500">{student.year}</td>
                                            <td className="px-8 py-5 text-center">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${student.status === 'Attended' ? 'text-emerald-400 bg-emerald-400/10' :
                                                        student.status === 'Cancelled' ? 'text-red-400 bg-red-400/10' :
                                                            'text-blue-400 bg-blue-400/10'
                                                    }`}>
                                                    {student.status === 'Attended' ? <CheckCircle2 size={12} /> :
                                                        student.status === 'Registered' ? <Clock size={12} /> :
                                                            <X size={12} />}
                                                    {student.status}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="text-xs text-slate-500 font-bold">Showing {studentRegistrations.length} students</div>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm font-bold text-slate-200 transition-all">Previous</button>
                                <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-sm font-bold text-white transition-all">Next Page</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Registrations;
