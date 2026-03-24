import { useState, useEffect } from 'react';
import {
    Plus, Calendar, MapPin, Clock, Users,
    CheckCircle, ArrowLeft, ArrowRight, Zap, Info
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, clubAPI } from '../services/api';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        club: user?.club || '',
        createdBy: user?.name || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventsAPI.create(formData);
            navigate(user?.role === 'admin' ? '/admin' : '/member');
        } catch (err) { console.error(err); }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto pb-20">
            <div className="mb-12 flex items-center justify-between">
                <div>
                    <Link to="/events" className="text-xs font-bold text-indigo-400 flex items-center gap-2 mb-4 hover:text-white transition-colors uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Fleet
                    </Link>
                    <h2 className="text-4xl font-bold tracking-tight mb-2 text-white">Project <span className="gradient-text">Initialization.</span></h2>
                    <p className="text-slate-500 font-normal tracking-tight">Deploy a new high-impact mission to the campus network.</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner">
                    <Plus size={32} />
                </div>
            </div>

            <div className="glass-card p-10 border-white/5 relative overflow-hidden group shadow-indigo-600/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] rounded-full"></div>

                <form onSubmit={handleSubmit} className="space-y-10 relative">
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] border-b border-white/5 pb-4 flex items-center gap-3">
                            <Info size={18} className="text-indigo-400" /> Core Intelligence
                        </h3>
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Mission Identifier</label>
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    required
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Briefing Description</label>
                                <textarea
                                    placeholder="What is this mission about?"
                                    required
                                    rows="4"
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all resize-none"
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] border-b border-white/5 pb-4 flex items-center gap-3">
                            <MapPin size={18} className="text-indigo-400" /> Deployment Logistics
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Coordinated Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all [color-scheme:dark]"
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Time Sync</label>
                                <input
                                    type="time"
                                    required
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all [color-scheme:dark]"
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Sector (Venue)</label>
                                <input
                                    type="text"
                                    placeholder="Building B, Room 402"
                                    required
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Sponsoring Hub</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0b1120] border border-white/5 rounded-2xl py-4 px-6 text-white font-bold text-sm outline-none focus:border-indigo-500/30 focus:bg-[#0f172a] transition-all"
                                    value={formData.club}
                                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary h-16 shadow-indigo-600/20 shadow-2xl">
                        Deploy Project To Network <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
