import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
    CheckCircle, Shield, Zap, Calendar, MapPin,
    Clock, ArrowLeft, Send, Sparkles, Loader2
} from 'lucide-react';
import { eventsAPI, participationAPI } from '../services/api';

const RegisterEvent = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const eventId = searchParams.get('id');
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await eventsAPI.getById(eventId);
                setEvent(data);
            } catch (err) { console.error(err); }
            finally { setTimeout(() => setLoading(false), 500); }
        };
        if (eventId) fetchEvent();
    }, [eventId]);

    const handleRegister = async () => {
        setRegistering(true);
        try {
            await participationAPI.register({ eventId });
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    if (success) return (
        <div className="animate-fade-in flex flex-col items-center justify-center h-[70vh] text-center p-10">
            <div className="w-32 h-32 rounded-[40px] bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mb-8 p-glow shadow-green-500/20">
                <CheckCircle size={64} className="animate-bounce" />
            </div>
            <h2 className="text-5xl font-bold text-white tracking-tight mb-4">Permit <span className="text-green-500">Secured.</span></h2>
            <p className="text-slate-400 max-w-md font-normal">Your registration is verified. Mission status: Active. Redirecting to Command Center...</p>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-4xl mx-auto pb-20">
            <div className="mb-12">
                <Link to="/events" className="text-xs font-bold text-indigo-400 flex items-center gap-2 mb-4 hover:text-white transition-colors uppercase tracking-widest">
                    <ArrowLeft size={16} /> Abort Request
                </Link>
                <h2 className="text-4xl font-bold tracking-tight mb-2 text-white">Identity <span className="gradient-text">Verification.</span></h2>
                <p className="text-slate-500 font-normal">Verify your credentials to secure a slot in this operation.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 space-y-10">
                    <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[50px] rounded-full"></div>
                        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-8 w-fit">
                            <Shield size={14} /> Mission Briefing
                        </div>

                        <h3 className="text-3xl font-bold text-white tracking-tight mb-6 leading-tight">{event?.eventName}</h3>
                        <p className="text-slate-400 leading-relaxed font-normal mb-10 border-l-2 border-indigo-500/20 pl-6 group-hover:border-indigo-500 transition-colors">
                            "{event?.description}"
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/5">
                                    <Calendar size={22} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Date</div>
                                    <div className="text-sm font-bold text-white">{new Date(event?.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/5">
                                    <Clock size={22} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Time Sync</div>
                                    <div className="text-sm font-bold text-white">{event?.time}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-10 border-indigo-500/20 shadow-2xl shadow-indigo-600/10 bg-indigo-600/[0.02]">
                        <h3 className="text-xl font-bold text-white tracking-tight mb-8">Execute Access</h3>
                        <div className="space-y-6 mb-10 text-sm font-medium text-slate-400">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={18} className="text-green-500 shrink-0" />
                                <span>Individual Slot Allocation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={18} className="text-green-500 shrink-0" />
                                <span>Automatic XP Distribution (+50 XP)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={18} className="text-green-500 shrink-0" />
                                <span>Neural Ledger Receipt</span>
                            </div>
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={registering}
                            className="w-full btn-primary h-16 shadow-indigo-600/30 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {registering ? (
                                <Loader2 size={24} className="animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">Request Authorization <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                            )}
                        </button>

                        <p className="mt-8 text-center text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em] leading-relaxed">
                            BY AUTHORIZING, YOU AGREE TO MISSION PROTOCOLS AND CAMPUS CONDUCT CODES.
                        </p>
                    </div>

                    <div className="glass-card p-8 border-white/5 text-center">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                            <Sparkles size={24} fill="currentColor" />
                        </div>
                        <div className="text-xs font-bold text-white uppercase tracking-tight mb-2">Power Move</div>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Complete missions to unlock Elite Badges and hidden network sectors.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterEvent;
