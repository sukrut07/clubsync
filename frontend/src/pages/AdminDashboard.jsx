import { useState, useEffect } from 'react';
import {
    Users, Calendar, FileText, Activity, ArrowUpRight,
    Plus, Shield, UserCheck, Layers, Star,
    ChevronRight, LogIn, Clock, Compass, Target,
    Layout, Settings, PieChart, BarChart2, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="glass-card p-6 group border-white/5 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-24 h-24 bg-${color ? 'indigo' : 'white'}-500/5 blur-[40px] rounded-full translate-x-8 -translate-y-8`}></div>
        <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner`} style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={24} style={{ color }} />
            </div>
            {change && (
                <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/10">
                    <ArrowUpRight size={12} /> {change}
                </div>
            )}
        </div>
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{title}</div>
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    </div>
);

const ProgressBar = ({ progress, color = "indigo" }) => (
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-4">
        <div
            className={`h-full bg-gradient-to-r from-${color}-500 to-cyan-400 transition-all duration-1000 ease-out`}
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

const ControlButton = ({ icon: Icon, label, color = "indigo", to }) => {
    const content = (
        <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-indigo-500/30 transition-all gap-3 hover:bg-white/[0.04] w-full h-full cursor-pointer">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner`} style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={22} style={{ color }} className="group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
        </div>
    );

    if (to) {
        return <Link to={to} className="block w-full h-full">{content}</Link>;
    }

    return content;
};

const AdminDashboard = () => {
    const { user, loading: authLoading, isAdmin, isMember, isStudent } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = isMember
                    ? await eventsAPI.getByClub(user?.club)
                    : await eventsAPI.getAll();
                setEvents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (!authLoading && user) fetchEvents();
    }, [authLoading, user, isMember]);

    if (authLoading || loading) return (
        <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    // Safety Fallbacks
    const safeUser = user || { name: 'Student User', role: 'student' };
    const displayRole = isAdmin ? 'Super Admin' : (isMember ? 'Club Admin' : 'Student');
    const clubName = safeUser?.clubName || (isMember ? 'GDG MITAOE' : 'Global Ecosystem');

    // Dummy Data
    const dummyStats = {
        clubs: "12",
        members: isMember ? "124" : "1,240",
        events: "48",
        registrations: "2,890"
    };

    const upcomingEvents = [
        { id: 1, name: "Web Dev Workshop", date: "25 Mar", club: "GDG MITAOE", status: "Open" },
        { id: 2, name: "Design Sprint", date: "28 Mar", club: "Aalekh", status: "Full" },
        { id: 3, name: "AI Hackathon", date: "05 Apr", club: "Niyudrath", status: "Open" },
    ];

    const studentHistory = [
        { id: 101, event: "Python Basics", date: "15 Mar", status: "Attended", xp: "+50" },
        { id: 102, event: "UI/UX Seminar", date: "10 Mar", status: "Certified", xp: "+100" },
    ];

    return (
        <div className="animate-fade-in space-y-10 pb-12">
            {/* TOP HEADER */}
            <div className="glass-card p-8 border-indigo-500/20 bg-indigo-500/[0.02] shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-500/20">
                            {safeUser.name?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-1">Welcome back, {safeUser.name}</h2>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                                    <Shield size={12} /> {displayRole}
                                </span>
                                {(isAdmin || isMember) && (
                                    <span className="text-sm text-slate-500 font-medium italic">
                                        Managing: {clubName}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS CARDS - Only for Admin/Member */}
            {(isAdmin || isMember) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isAdmin && <StatCard title="Total Clubs" value={dummyStats.clubs} change="+2" icon={Layers} color="#6366f1" />}
                    <StatCard title="Total Members" value={dummyStats.members} change="+12%" icon={Users} color="#8b5cf6" />
                    <StatCard title="Total Events" value={dummyStats.events} change="+4" icon={Calendar} color="#06b6d4" />
                    <StatCard title="Registrations" value={dummyStats.registrations} change="+28%" icon={FileText} color="#f59e0b" />
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Role Specific Section: CLUB INFO (Admin/Member) or RECOMMENDATIONS (Student) */}
                    {(isAdmin || isMember) ? (
                        <div className="space-y-8">
                            <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight mb-2 font-bold uppercase tracking-tight flex items-center gap-3">
                                            <Target size={24} className="text-indigo-400" /> Club Progress
                                        </h3>
                                        <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-bold">Current Milestone Visibility</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-white leading-none">82%</div>
                                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1 text-[8px]">Growth Track</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                                    {[
                                        { label: "Members", value: dummyStats.members, icon: Users, color: "#8b5cf6" },
                                        { label: "Events", value: dummyStats.events, icon: Calendar, color: "#06b6d4" },
                                        { label: "Registrations", value: "2.8k", icon: FileText, color: "#f59e0b" },
                                        { label: "Participation", value: "94%", icon: Activity, color: "#10b981" }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <stat.icon size={14} style={{ color: stat.color }} />
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                            </div>
                                            <div className="text-lg font-bold text-white uppercase">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <ProgressBar progress={82} />
                            </div>

                            <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                                <h3 className="text-xl font-bold text-white tracking-tight mb-8 font-bold uppercase tracking-tight flex items-center gap-3">
                                    <Layout size={24} className="text-cyan-400" /> Club Overview
                                </h3>
                                <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-black text-white tracking-tight uppercase">{clubName}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {isMember
                                                ? "Your local hub for excellence and collaboration at MITAOE campus."
                                                : "The global command center for campus-wide club orchestration."}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="text-xl font-bold text-white">{dummyStats.members}</div>
                                            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-[8px]">Active Members</div>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="text-xl font-bold text-indigo-400">{dummyStats.events}</div>
                                            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-[8px]">Planned Events</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                            <h3 className="text-xl font-bold text-white tracking-tight mb-8 font-bold uppercase tracking-tight flex items-center gap-3">
                                <Compass size={24} className="text-indigo-400" /> Discover Clubs
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                {["GDG MITAOE", "Aalekh Art Club"].map(club => (
                                    <div key={club} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-indigo-400/30 transition-all cursor-pointer">
                                        <h4 className="text-white font-bold mb-2">{club}</h4>
                                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Join to Explore</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EVENT PANEL: Management (Admin/Member) or Discover (Student) */}
                    <div className="glass-card p-10 border-white/5">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3 font-bold uppercase tracking-tight">
                                <Calendar size={24} className="text-cyan-400" /> {isStudent ? 'Discover Events' : 'Upcoming Events'}
                            </h3>
                            {(isAdmin || isMember) && (
                                <Link to="/events/create" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">
                                    Launch Event
                                </Link>
                            )}
                        </div>
                        <div className="space-y-4">
                            {events.length > 0 ? events.map((event) => (
                                <div key={event._id} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-indigo-500/30 transition-all">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/5">
                                            <span className="text-[10px] font-bold text-indigo-400 uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                            <span className="text-lg font-black text-white leading-none">{new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 tracking-tight">{event.title}</h4>
                                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{event.club} • {event.venue}</div>
                                        </div>
                                    </div>
                                    {isStudent ? (
                                        <button
                                            onClick={() => alert('Registered successfully')}
                                            className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-indigo-600/20"
                                        >
                                            Register Now
                                        </button>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400`}>
                                            Active
                                        </span>
                                    )}
                                </div>
                            )) : (
                                <div className="text-center py-10 text-slate-500 font-bold uppercase tracking-widest text-xs">
                                    No events yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* REGISTRATION PANEL (Admin/Member) or PARTICIPATION HISTORY (Student) */}
                    <div className="glass-card p-10 border-white/5">
                        <h3 className="text-xl font-bold text-white tracking-tight mb-8 font-bold uppercase tracking-tight flex items-center gap-3">
                            <Activity size={24} className={isStudent ? "text-indigo-400" : "text-orange-400"} />
                            {isStudent ? 'Your Participation History' : 'Recent Activity'}
                        </h3>
                        <div className="space-y-4">
                            {(isStudent ? studentHistory : upcomingEvents).map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-indigo-500/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/5 flex items-center justify-center text-indigo-400">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white tracking-tight">{item.event || item.name}</div>
                                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.date} • {isStudent ? item.xp : item.club}</div>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.15em] px-3 py-1 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CLUB CONTROL SECTION (Admin/Member) */}
                    {(isAdmin || isMember) && (
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-white tracking-tight font-bold uppercase tracking-tight flex items-center gap-3">
                                <Settings size={24} className="text-indigo-400" /> Club Control
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <ControlButton icon={Calendar} label="Add Event" color="#6366f1" to="/events/create" />
                                <ControlButton icon={Users} label="Add Member" color="#8b5cf6" />
                                <ControlButton icon={FileText} label="Assign Task" color="#f59e0b" />
                                <ControlButton icon={Activity} label="Registrations" color="#06b6d4" to="/registrations" />
                                <ControlButton icon={Shield} label="Participation" color="#10b981" to="/admin/participation" />
                            </div>
                        </div>
                    )}

                    {/* ANALYTICS SECTION (Admin/Member) */}
                    {(isAdmin || isMember) && (
                        <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                            <h3 className="text-xl font-bold text-white tracking-tight mb-8 font-bold uppercase tracking-tight flex items-center gap-3 relative z-10">
                                <PieChart size={24} className="text-rose-400" /> Analytics
                            </h3>
                            <div className="grid md:grid-cols-3 gap-8 relative z-10">
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <TrendingUp size={20} className="text-emerald-400" />
                                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
                                    </div>
                                    <div className="text-2xl font-black text-white mb-1">94%</div>
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Participation Stats</div>
                                </div>
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <BarChart2 size={20} className="text-indigo-400" />
                                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full">Active</span>
                                    </div>
                                    <div className="text-2xl font-black text-white mb-1">48</div>
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Event Stats</div>
                                </div>
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <Users size={20} className="text-cyan-400" />
                                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full">Stable</span>
                                    </div>
                                    <div className="text-2xl font-black text-white mb-1">1,240</div>
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Member Stats</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side Column */}
                <div className="space-y-8">
                    {/* QUICK ACTIONS PANEL: Role Based */}
                    <div className="glass-card p-10 bg-indigo-600 border-indigo-500/20 text-white relative overflow-hidden group shadow-2xl shadow-indigo-600/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full"></div>
                        <h4 className="text-xl font-bold tracking-tight mb-4 leading-none uppercase">Quick Actions</h4>
                        <p className="text-sm font-normal text-white/70 mb-8 leading-relaxed">
                            {isStudent ? "Explore the ecosystem and level up." : "Direct command for priority tasks."}
                        </p>
                        <div className="space-y-3 relative z-10">
                            {isStudent ? (
                                <>
                                    <button className="w-full py-4 bg-white text-indigo-600 font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-xl hover:scale-[1.02] transition-colors">
                                        Explore Clubs
                                    </button>
                                    <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl backdrop-blur-md transition-all">
                                        View Your Events
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/events/create">
                                        <button className="w-full py-4 bg-white text-indigo-600 font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-xl hover:scale-[1.02] transition-colors mb-3">
                                            Add Event
                                        </button>
                                    </Link>
                                    <Link to="/admin/participation">
                                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl backdrop-blur-md transition-all">
                                            Participation
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Member Summary: Only for Admin/Member */}
                    {(isAdmin || isMember) && (
                        <div className="glass-card p-10 border-white/5">
                            <h3 className="text-xl font-bold text-white tracking-tight mb-6 font-bold uppercase tracking-tight flex items-center gap-3">
                                <UserCheck size={20} className="text-emerald-400" /> Member Summary
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: "Aman Gupta", role: "Lead" },
                                    { name: "Sneha Patil", role: "Member" }
                                ].map(member => (
                                    <div key={member.name} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-indigo-400">{member.name.charAt(0)}</div>
                                        <div>
                                            <div className="text-xs font-bold text-white leading-none">{member.name}</div>
                                            <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">{member.role}</div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-400 font-bold text-[9px] uppercase tracking-widest rounded-xl transition-all border border-white/5">
                                    Manage All members
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
