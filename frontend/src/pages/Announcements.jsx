import { useState, useEffect } from 'react';
import {
    Megaphone, Bell, Calendar, Search, Filter,
    ArrowRight, Info, AlertCircle, Clock
} from 'lucide-react';
import { announcementAPI } from '../services/api';

const AnnouncementCard = ({ item, delay }) => (
    <div className={`glass-card p-10 group border-white/5 hover:border-indigo-500/30 transition-all duration-500 animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
        <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                    <Megaphone size={24} />
                </div>
                <div>
                    <h4 className="text-xl font-semibold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-2">
                        <Clock size={12} /> {new Date(item.date).toDateString()} • {item.clubId?.clubName || 'Global'}
                    </div>
                </div>
            </div>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Priority: High
            </div>
        </div>

        <p className="text-slate-400 leading-relaxed font-normal italic border-l-4 border-indigo-500/20 pl-6 group-hover:border-indigo-500 transition-all">
            "{item.description}"
        </p>

        <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                <AlertCircle size={14} /> Verified Source
            </div>
            <button className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                Secure Details <ArrowRight size={14} />
            </button>
        </div>
    </div>
);

const Announcements = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await announcementAPI.getAll();
                setData(data);
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
        <div className="animate-fade-in space-y-12 max-w-5xl mx-auto pb-20">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Bell size={14} /> Intelligence Feed
                </div>
                <h2 className="text-5xl font-bold tracking-tight text-white leading-none mb-4">Ecosystem <span className="gradient-text">Directives.</span></h2>
                <p className="text-slate-500 font-normal tracking-tight">Real-time updates and strategic announcements from the campus network.</p>
            </div>

            <div className="relative mt-20">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block"></div>
                <div className="space-y-12">
                    {data.length > 0 ? data.map((item, i) => (
                        <AnnouncementCard key={i} item={item} delay={i * 150} />
                    )) : (
                        <div className="text-center py-40 glass-card bg-white/[0.01] border-dashed border-white/10 opacity-50">
                            <Megaphone size={48} className="text-slate-700 mx-auto mb-6" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No signals detected at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
