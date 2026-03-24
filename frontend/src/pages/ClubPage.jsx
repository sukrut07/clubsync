import { useState, useEffect } from 'react';
import {
    Users, Shield, Zap, Star, Search, Filter,
    ChevronRight, Globe, ArrowUpRight, Plus
} from 'lucide-react';
import { clubAPI } from '../services/api';

const ClubCard = ({ club, delay }) => (
    <div className={`glass-card p-10 group border-white/5 hover:border-indigo-500/30 transition-all duration-500 animate-fade-in hover:-translate-y-2`} style={{ animationDelay: `${delay}ms` }}>
        <div className="flex justify-between items-start mb-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                <Zap size={32} />
            </div>
            <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-xs">
                <Star size={14} fill="currentColor" /> Tier 1
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-indigo-400 transition-colors leading-tight">{club.clubName}</h3>
        <p className="text-slate-400 leading-relaxed font-normal mb-10 line-clamp-2 italic border-l-2 border-indigo-500/20 pl-4 group-hover:border-indigo-500 transition-colors">
            "{club.description}"
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10 border-y border-white/5 py-6">
            <div>
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">XP Points</div>
                <div className="text-xl font-bold text-white flex items-center gap-2"><Zap size={16} className="text-indigo-400" /> {club.points || 0}</div>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Rank</div>
                <div className="text-xl font-bold text-white">#4</div>
            </div>
        </div>

        <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2">
            View Circle <ArrowUpRight size={14} />
        </button>
    </div>
);

const ClubPage = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await clubAPI.getAll();
                setClubs(data);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };
        fetch();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex-1">
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Campus <span className="gradient-text">Circles.</span></h2>
                    <p className="text-slate-500 font-normal">Join elite student associations and build your legacy hub.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-2xl px-6 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <Globe size={16} className="mr-3" /> Global Search
                    </div>
                    <button className="btn-primary h-14 px-8">
                        Found Club <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubs.map((c, i) => (
                    <ClubCard key={c._id} club={c} delay={i * 100} />
                ))}
            </div>
        </div>
    );
};

export default ClubPage;
