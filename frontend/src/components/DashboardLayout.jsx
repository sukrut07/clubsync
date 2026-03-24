import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Calendar, Megaphone, Trophy, User,
    Settings, LogOut, Menu, X, Bell, Search, Zap, ChevronRight,
    UserCheck, FileText, Activity, BarChart2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <Link
        to={path}
        onClick={onClick}
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
        <div className="flex items-center gap-3">
            <Icon size={20} className={`${active ? 'text-white' : 'group-hover:text-indigo-400'} transition-colors`} />
            <span className="text-sm font-semibold">{label}</span>
        </div>
        {active && <ChevronRight size={14} />}
    </Link>
);

const DashboardLayout = ({ children }) => {
    const { user, logout, isAdmin, isMember } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: user?.role === 'admin' ? '/admin' : (user?.role === 'member' ? '/member' : '/events') },
        { label: 'Clubs', icon: Users, path: '/clubs' },
        { label: 'Events', icon: Calendar, path: '/events' },
        // Admin & Member Only Items
        ...((isAdmin || isMember) ? [
            { label: 'Members', icon: UserCheck, path: '/admin#members' },
            { label: 'Registrations', icon: FileText, path: '/admin#registrations' },
            { label: 'Participation', icon: Activity, path: '/admin#participation' },
            { label: 'Analytics', icon: BarChart2, path: '/analytics' },
        ] : []),
        { label: 'Announcements', icon: Megaphone, path: '/announcements' },
        { label: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-300 flex overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0f172a] border-r border-white/5 transition-all duration-500 flex flex-col z-50 fixed lg:static inset-y-0 left-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <Link to="/" className="p-6 flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 shrink-0">
                        <Zap size={22} color="white" fill="white" />
                    </div>
                    {isSidebarOpen && <span className="text-xl font-bold tracking-tight text-white">ClubSync</span>}
                </Link>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            {...item}
                            active={location.pathname === item.path}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
                    >
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                        {isSidebarOpen && <span className="text-sm font-semibold">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>

                {/* Top Navbar */}
                <header className="h-20 bg-[#0f172a]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-400"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="hidden md:flex items-center relative w-96">
                        <Search className="absolute left-4 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search resources, events..."
                            className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500/30 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f172a]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-semibold text-white leading-none">{user?.name}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mt-1">{user?.role}</div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {user?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {children}
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
