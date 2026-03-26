import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, User, LogOut, LayoutDashboard, Shield, Users, Calendar, Megaphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAdmin, isMember } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? 'rgba(10, 10, 26, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.15)' : 'none',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center p-glow"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                    >
                        <Zap size={18} color="white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        Club<span className="gradient-text">Sync</span>
                    </span>
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#footer" className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-all">Contact</a>
                    <Link to="/clubs" className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-all">Clubs</Link>
                    <Link to="/events" className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-all">Events</Link>
                    <a href="#about" className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-all">About</a>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 cursor-default">MITAOE</span>
                    {user && (
                        <Link to={isAdmin ? "/admin" : (isMember ? "/member" : "/events")} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-400 hover:text-indigo-300 transition-all ml-4">
                            <LayoutDashboard size={12} /> Dashboard
                        </Link>
                    )}
                </div>

                {/* Auth buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 group">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:border-indigo-500/60 transition-colors">
                                    <User size={16} className="text-indigo-400" />
                                </div>
                                <span className="text-sm font-medium hidden lg:block text-slate-200">{(user.name || user.email || 'User').split(' ')[0]}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="hidden sm:block">
                                <button className="btn-outline text-sm py-2 px-5">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn-primary text-sm py-2 px-5">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
