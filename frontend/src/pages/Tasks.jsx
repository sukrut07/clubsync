import React, { useState } from 'react';
import {
    ClipboardList, CheckCircle2, Clock, AlertCircle,
    MoreVertical, Search, Filter, Calendar,
    MessageSquare, Tag, User, Star, Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
    const { isAdmin, isMember } = useAuth();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const tasks = [
        {
            id: 1,
            title: "Coordinate Datathon Registration",
            description: "Manage the entry flow for the Datathon 2026. Ensure all QR codes are scanned properly at the entrance.",
            status: "In Progress",
            priority: "High",
            dueDate: "2026-03-30",
            assignedBy: "Admin",
            team: "Management Team"
        },
        {
            id: 2,
            title: "Finalize Speaker Invitations",
            description: "Send invitation emails to the shortlisted speakers for the AI Summit. Follow up on responses within 48 hours.",
            status: "Pending",
            priority: "Medium",
            dueDate: "2026-04-05",
            assignedBy: "Admin",
            team: "Technical Team"
        },
        {
            id: 3,
            title: "Social Media Campaign",
            description: "Launch the teaser campaign for the upcoming Hackathon. Focus on Instagram and Twitter engagement.",
            status: "In Progress",
            priority: "High",
            dueDate: "2026-04-02",
            assignedBy: "Admin",
            team: "Marketing Team"
        },
        {
            id: 4,
            title: "Audit Club Attendance Records",
            description: "Review and verify the participation records for the month of February. Award XP points where necessary.",
            status: "Completed",
            priority: "Low",
            dueDate: "2026-03-25",
            assignedBy: "Admin",
            team: "Technical Team"
        },
        {
            id: 5,
            title: "Volunteer Coordinator For MITAOE Mela",
            description: "Assign volunteer slots for the upcoming campus festival. Ensure all zones are covered throughout the day.",
            status: "Pending",
            priority: "High",
            dueDate: "2026-04-10",
            assignedBy: "Admin",
            team: "Management Team"
        },
        {
            id: 6,
            title: "Prepare Budget Report",
            description: "Compile the expense report for the last quarter including venue bookings and refreshment costs.",
            status: "In Progress",
            priority: "Medium",
            dueDate: "2026-04-05",
            assignedBy: "Admin",
            team: "Management Team"
        },
        {
            id: 7,
            title: "Update Club Website",
            description: "Refresh the gallery section with photos from the Datathon 2026. Update the 'About Us' section with new team leads.",
            status: "Pending",
            priority: "Low",
            dueDate: "2026-04-08",
            assignedBy: "Admin",
            team: "Technical Team"
        },
        {
            id: 8,
            title: "Technical Workshop Preparation",
            description: "Setup the cloud environment and GitHub repository for the upcoming Azure workshop. Test all demo code.",
            status: "In Progress",
            priority: "High",
            dueDate: "2026-04-01",
            assignedBy: "Admin",
            team: "Technical Team"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'In Progress': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
            default: return 'text-slate-400 bg-white/5 border-white/10';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-rose-400';
            case 'Medium': return 'text-orange-400';
            case 'Low': return 'text-cyan-400';
            default: return 'text-slate-400';
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || task.status.toLowerCase().replace(' ', '') === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="animate-fade-in space-y-10 pb-12">
            {/* Header Section */}
            <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                <ClipboardList size={24} />
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Task <span className="gradient-text">Operations.</span></h2>
                        </div>
                        <p className="text-slate-400 max-w-2xl font-medium leading-relaxed">
                            Manage your assigned duties, track progress, and coordinate with club administrators to ensure seamless execution of missions.
                        </p>
                    </div>

                    {(isAdmin || isMember) && (
                        <button
                            onClick={() => alert('Assignment module initializing...')}
                            className="btn-primary h-14 px-8 flex items-center gap-3 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
                        >
                            <Plus size={20} /> Assign Task
                        </button>
                    )}
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search mission protocols..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-600"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Pending', 'In Progress', 'Completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f.toLowerCase().replace(' ', ''))}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap
                                ${filter === f.toLowerCase().replace(' ', '')
                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
                                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                    <div key={task.id} className="glass-card p-8 border-white/5 hover:border-indigo-500/30 transition-all duration-500 group flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusColor(task.status)}`}>
                                    {task.status}
                                </span>
                                <button className="text-slate-600 hover:text-white transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <Tag size={12} className="text-indigo-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.team}</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed mb-8 font-medium italic">
                                "{task.description}"
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                                        <Calendar size={14} />
                                    </div>
                                    <div>
                                        <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Due Date</div>
                                        <div className="text-[10px] font-bold text-white">{task.dueDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                                        <Star size={14} />
                                    </div>
                                    <div>
                                        <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Priority</div>
                                        <div className={`text-[10px] font-bold ${getPriorityColor(task.priority)}`}>{task.priority}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/5 flex items-center justify-center text-indigo-400 text-xs font-bold">
                                        {task.assignedBy.charAt(0)}
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400">
                                        Assigned by <span className="text-white">{task.assignedBy}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-all">
                                        <MessageSquare size={14} />
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-indigo-600/20">
                                        Open Mission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center glass-card border-white/5">
                        <AlertCircle className="text-slate-700 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-slate-500 uppercase tracking-widest">No Active Missions Found</h3>
                        <p className="text-slate-600 text-sm mt-2 font-medium">Clear your filters or contact your Admin for assignments.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;
