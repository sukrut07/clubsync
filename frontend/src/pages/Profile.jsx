import { useState } from 'react';
import {
    User, Mail, Shield, Zap, Trophy, Settings,
    Bell, Lock, Globe, Camera, Edit2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="animate-fade-in space-y-10 max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Command <span className="gradient-text">Center.</span></h2>
                    <p className="text-slate-500 font-normal tracking-tight">Manage your global identity and security protocols.</p>
                </div>
                <button className="btn-primary h-12 px-6 flex items-center gap-2">
                    <Edit2 size={16} /> Update Profile
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                <div className="space-y-8">
                    <div className="glass-card p-10 border-white/5 text-center relative overflow-hidden group">
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-5xl font-bold text-white shadow-2xl mx-auto">
                                {user?.name?.charAt(0)}
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-2.5 bg-[#0b1120] border border-white/10 rounded-xl text-indigo-400 hover:text-white transition-all shadow-lg">
                                <Camera size={18} />
                            </button>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{user?.name}</h3>
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.15em] mb-8">{user?.role} • Division A</div>

                        <div className="flex justify-center gap-4 border-t border-white/5 pt-8">
                            <div className="text-center px-4">
                                <div className="text-xl font-bold text-white">{user?.points || 0}</div>
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total XP</div>
                            </div>
                            <div className="w-px bg-white/5"></div>
                            <div className="text-center px-4">
                                <div className="text-xl font-bold text-white">#12</div>
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Global Rank</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 border-white/5 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
                            >
                                <tab.icon size={18} /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-10 border-white/5">
                        <h3 className="text-xl font-bold text-white tracking-tight mb-10 flex items-center gap-3">
                            <Settings size={22} className="text-indigo-400" /> Account Protocols
                        </h3>

                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Signature Name</label>
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold text-sm backdrop-blur-md">
                                        {user?.name}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Neural Link (Email)</label>
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold text-sm backdrop-blur-md">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Infrastructure Access</label>
                                <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-indigo-500/30 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <Shield size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white tracking-tight">{user?.role} Level Credentials</div>
                                        <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em] mt-1">Status: Active & Verified</div>
                                    </div>
                                    <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Permits</button>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex gap-4">
                                <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                                    Export Intelligence Data
                                </button>
                                <button className="flex-1 py-4 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                                    Deactivate Protocol
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/5 blur-[50px] rounded-full"></div>
                        <h3 className="text-xl font-bold text-white tracking-tight mb-8">Ecosystem Connection</h3>
                        <div className="space-y-6">
                            {[
                                { label: "Regional Connectivity", status: "Optimal", color: "text-green-500" },
                                { label: "Notification Services", status: "Enabled", color: "text-indigo-400" },
                                { label: "Global Sync Status", status: "Verified", color: "text-green-500" }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="text-sm font-bold text-slate-300">{s.label}</div>
                                    <div className={`text-[10px] font-bold uppercase tracking-[0.15em] ${s.color}`}>{s.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
