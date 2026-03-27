import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Zap, Mail, Lock, ArrowRight, Shield,
    CheckCircle, Globe, Layout, User, Chrome,
    Loader2, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const result = await login(email, password);
            if (result.success) {
                // Determine redirect based on role (decoded from token or from user state)
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser?.role === 'admin') navigate('/dashboard/admin');
                else if (storedUser?.role === 'member') navigate('/dashboard/leader');
                else navigate('/dashboard/student');
            } else {
                setError(result.message || 'Authentication failed.');
            }
        } catch (err) {
            setError('A system error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async (role) => {
        setLoading(true);
        setError('');
        const demoCreds = {
            admin: { email: 'sukrut.dusane@gmail.com', password: '202501110114TestPassword123' },
            member: { email: 'member@clubsync.com', password: 'password123' },
            student: { email: 'student@clubsync.com', password: 'password123' }
        };
        const { email: demoEmail, password: demoPassword } = demoCreds[role];
        try {
            await login(demoEmail, demoPassword);
            const path = role === 'admin' ? '/dashboard/admin' : (role === 'member' ? '/dashboard/leader' : '/dashboard/student');
            navigate(path);
        } catch (err) {
            setError('Demo login failed. Ensure database is seeded.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-300 flex items-center justify-center p-6 relative selection:bg-indigo-500 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="w-full max-w-5xl flex flex-col lg:flex-row glass-card border-white/5 shadow-2xl overflow-hidden relative z-10 animate-fade-in">
                {/* Left Side: Illustration & Branding */}
                <div className="lg:w-1/2 bg-indigo-600/10 p-16 flex flex-col justify-between border-r border-white/5 relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity w-fit group/logo">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover/logo:scale-105 transition-transform">
                                <Zap size={26} color="white" fill="white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Club<span className="gradient-text">Sync</span>
                            </span>
                        </Link>
                        <h2 className="text-5xl font-bold text-white leading-[1.1] tracking-tight mb-8">Initialize <br />Your <span className="gradient-text">Identity.</span></h2>
                        <p className="text-lg font-medium text-slate-400 mb-12 leading-relaxed">Access the elite campus infrastructure and take control of your student journey.</p>

                        <div className="space-y-6">
                            {[
                                { icon: Shield, text: "End-to-end identity encryption" },
                                { icon: Globe, text: "Global campus connectivity" },
                                { icon: Layout, text: "Unified leadership dashboard" }
                            ].map((f, i) => (
                                <div key={i} className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-indigo-400/80">
                                    <f.icon size={18} /> {f.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                        © 2026 CLUBSYNC SYSTEMS • DATATHON EDITION
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-1/2 p-16 bg-[#0f172a]/50 backdrop-blur-3xl flex flex-col justify-center">
                    <form className="space-y-6 mb-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold animate-shake uppercase tracking-widest flex items-center gap-3">
                                <Shield size={16} /> {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Email Interface</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Pass-Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 pl-14 pr-12 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-5 shadow-indigo-600/20 shadow-2xl text-md relative overflow-hidden group active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <Loader2 size={22} className="animate-spin" />
                            ) : (
                                <>Initiate Login <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <button
                        onClick={() => {/* Mock Google Login */ }}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest text-slate-300 mb-12 group"
                    >
                        <Chrome size={18} className="text-white group-hover:scale-110 transition-transform" /> Sign in with Google
                    </button>

                    <div className="relative mb-12">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-[#0f172a] px-4 text-slate-600">Quick Access</span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { role: 'admin', label: 'Admin', icon: Shield },
                            { role: 'member', label: 'Leader', icon: Zap },
                            { role: 'student', label: 'Elite', icon: User }
                        ].map((d, i) => (
                            <button
                                key={i}
                                onClick={() => handleDemoLogin(d.role)}
                                disabled={loading}
                                className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-indigo-600 border border-white/5 rounded-2xl transition-all duration-300 group hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95"
                            >
                                <d.icon size={22} className="text-indigo-400 group-hover:text-white" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">{d.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-sm font-normal">
                        <span className="text-slate-500">New Agent? </span>
                        <Link to="/signup" className="text-indigo-400 font-bold hover:text-white transition-colors underline-offset-4 hover:underline">Register Hub</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
