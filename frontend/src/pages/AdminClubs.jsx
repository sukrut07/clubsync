import React, { useState } from 'react';
import {
    Users, UserPlus, UserMinus, Shield,
    Search, Filter, Plus, ChevronDown,
    Activity, Star, Globe, TrendingUp,
    MoreVertical, Edit, Trash2, X,
    CheckCircle2, AlertCircle, Award
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

// --- Mock Data ---

const clubs = {
    'sukrut.dusane@gmail.com': { id: 'vertex', name: 'Vertex GDNA', category: 'Game Dev', members: 85, leads: 3, xp: 3800, color: 'violet' },
    'default': { id: 'girlscript', name: 'Girlscript MITAOE', category: 'Technical', members: 120, leads: 5, xp: 4500, color: 'indigo' }
};

const initialMembers = [
    { id: 1, name: 'Sukrut Dusane', role: 'Lead', dept: 'Computer', email: 'sukrut@example.com', joined: 'Jan 2024' },
    { id: 2, name: 'Aditya Raj', role: 'Member', dept: 'IT', email: 'aditya@example.com', joined: 'Feb 2024' },
    { id: 3, name: 'Neha Sharma', role: 'Member', dept: 'EnTC', email: 'neha@example.com', joined: 'Mar 2024' },
    { id: 4, name: 'Prathamesh K.', role: 'Lead', dept: 'Computer', email: 'prathamesh@example.com', joined: 'Dec 2023' },
    { id: 5, name: 'Ishani Patil', role: 'Member', dept: 'Mechanical', email: 'ishani@example.com', joined: 'Apr 2024' },
];

// --- Components ---

const StatItem = ({ label, value, icon: Icon, color }) => (
    <div className="glass-card p-6 border-white/5 flex items-center gap-5 group hover:border-indigo-500/30 transition-all">
        <div className={`p-4 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:bg-${color}-500 group-hover:text-white transition-all`}>
            <Icon size={24} />
        </div>
        <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</div>
            <div className="text-2xl font-black text-white">{value}</div>
        </div>
    </div>
);

const AdminClubs = () => {
    const { user } = useAuth();
    const selectedClub = clubs[user?.email] || clubs['default'];

    const [members, setMembers] = useState(initialMembers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', email: '', dept: '', role: 'Member' });

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddMember = (e) => {
        e.preventDefault();
        const member = {
            ...newMember,
            id: Date.now(),
            joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };
        setMembers([member, ...members]);
        setIsAddModalOpen(false);
        setNewMember({ name: '', email: '', dept: '', role: 'Member' });
    };

    const handleRemoveMember = (id) => {
        if (window.confirm('Are you sure you want to remove this member?')) {
            setMembers(members.filter(m => m.id !== id));
        }
    };

    return (
        <div className="animate-fade-in space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-2">Club <span className="gradient-text">Management.</span></h2>
                    <p className="text-slate-500 font-medium max-w-xl">You are managing <span className="text-white font-bold">{selectedClub.name}</span>. Oversee your roster and track performance metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-sm font-bold text-white transition-all flex items-center gap-2 group">
                        <Edit size={18} /> Edit Club Info
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 rounded-2xl text-sm font-bold text-white transition-all flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Member
                    </button>
                </div>
            </div>

            {/* Club Profile & Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Profile Summary */}
                <div className="lg:col-span-1 glass-card p-8 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full translate-x-10 -translate-y-10"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className={`w-20 h-20 rounded-2xl bg-${selectedClub.color}-500/10 flex items-center justify-center text-${selectedClub.color}-400 mb-4 shadow-inner ring-1 ring-white/10`}>
                            <Shield size={40} />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight leading-tight">{selectedClub.name}</h3>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mt-2">{selectedClub.category} Organization</div>
                    </div>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatItem label="Total Members" value={selectedClub.members} icon={Users} color="indigo" />
                    <StatItem label="Core Team" value={selectedClub.leads} icon={Award} color="amber" />
                    <StatItem label="Participation XP" value={selectedClub.xp} icon={Star} color="cyan" />
                </div>
            </div>

            {/* Members Table */}
            <div className="glass-card border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400"><Users size={18} /></div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Member Roster</h3>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-indigo-500/30 transition-all w-64"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.01] border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-white group-hover:text-indigo-400 transition-colors">{member.name}</div>
                                        <div className="text-[10px] text-slate-500 font-medium">{member.email}</div>
                                    </td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-400">{member.dept}</td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${member.role === 'Lead' ? 'bg-amber-500/10 text-amber-400 outline outline-1 outline-amber-500/20' : 'bg-indigo-500/10 text-indigo-400'
                                            }`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500 italic">{member.joined}</td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-all">
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                                            >
                                                <UserMinus size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Member Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute inset-0 bg-[#0b1120]/80 backdrop-blur-md animate-fade-in" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative w-full max-w-md glass-card border-indigo-500/30 shadow-2xl overflow-hidden animate-slide-up bg-[#0f172a]">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Add New Member</h3>
                                <p className="text-xs text-slate-500 font-medium mt-1">Add a student to {selectedClub.name}</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddMember} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2 px-1 italic">Full Name</label>
                                    <input
                                        type="text" required
                                        value={newMember.name}
                                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                        placeholder="e.g. Rahul Sharma"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2 px-1 italic">Email Address</label>
                                    <input
                                        type="email" required
                                        value={newMember.email}
                                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                        placeholder="rahul@example.com"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2 px-1 italic">Department</label>
                                        <input
                                            type="text" required
                                            value={newMember.dept}
                                            onChange={(e) => setNewMember({ ...newMember, dept: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                            placeholder="Computer"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2 px-1 italic">Role</label>
                                        <select
                                            value={newMember.role}
                                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Member">Member</option>
                                            <option value="Lead">Lead</option>
                                            <option value="Core Team">Core Team</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 rounded-xl text-sm font-bold text-white transition-all">
                                Add to Organization
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminClubs;
