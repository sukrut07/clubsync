import { useState, useEffect } from 'react';
import { Trophy, Zap, Users, ArrowUp, Star, Medal, ChevronRight } from 'lucide-react';
import { participationAPI } from '../services/api';

const PodiumRank = ({ rank, name, points, dept, color, shadow, delay }) => (
    <div className={`glass-card p-10 flex flex-col items-center text-center relative overflow-hidden group border-white/5 animate-fade-in ${rank === 1 ? 'lg:scale-110 lg:-translate-y-6 z-10 border-indigo-500/20' : ''}`} style={{ animationDelay: `${delay}ms` }}>
        {rank === 1 && (
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 animate-pulse"></div>
        )}
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl ${shadow} group-hover:scale-110 transition-transform duration-500 relative`}>
            <Medal size={40} style={{ color }} />
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#0b1120] font-bold text-xs flex items-center justify-center border-4 border-[#0b1120]">
                {rank}
            </div>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight mb-2 truncate max-w-full">{name}</h3>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">{dept || 'Elite Division'}</div>
        <div className="px-6 py-2 rounded-xl bg-white/5 border border-white/5 text-xl font-bold text-white flex items-center gap-2">
            <Zap size={18} fill={color} style={{ color }} /> {points}
        </div>
    </div>
);

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await participationAPI.getLeaderboard();
                setData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 600);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    const top3 = data.slice(0, 3);
    const others = data.slice(3, 10);

    return (
        <div className="animate-fade-in space-y-16">
            <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Trophy size={14} /> Global Rankings
                </div>
                <h2 className="text-5xl font-bold tracking-tight text-white leading-none mb-4">The Hall of <span className="gradient-text">Legends.</span></h2>
                <p className="text-slate-500 font-normal tracking-tight">Recognizing the most active and high-performing members of the ClubSync ecosystem.</p>
            </div>

            {/* Podium */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end max-w-6xl mx-auto px-6">
                {top3.length >= 2 && (
                    <div className="order-2 lg:order-1">
                        <PodiumRank
                            rank={2}
                            name={top3[1].name}
                            points={top3[1].points}
                            dept={top3[1].department}
                            color="#94a3b8"
                            shadow="bg-slate-500/10 shadow-slate-500/20 border border-slate-500/30"
                            delay={200}
                        />
                    </div>
                )}
                {top3.length >= 1 && (
                    <div className="order-1 lg:order-2">
                        <PodiumRank
                            rank={1}
                            name={top3[0].name}
                            points={top3[0].points}
                            dept={top3[0].department}
                            color="#f59e0b"
                            shadow="bg-yellow-500/10 shadow-yellow-500/30 border border-yellow-500/40"
                            delay={100}
                        />
                    </div>
                )}
                {top3.length >= 3 && (
                    <div className="order-3 lg:order-3">
                        <PodiumRank
                            rank={3}
                            name={top3[2].name}
                            points={top3[2].points}
                            dept={top3[2].department}
                            color="#d97706"
                            shadow="bg-orange-500/10 shadow-orange-500/20 border border-orange-500/30"
                            delay={300}
                        />
                    </div>
                )}
            </div>

            {/* Remaining List */}
            <div className="max-w-4xl mx-auto glass-card overflow-hidden border-white/5 mt-10">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] flex items-center gap-3">
                        <ArrowUp size={16} className="text-indigo-400" /> Professional Division
                    </h3>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Players: {data.length}</div>
                </div>
                <div className="divide-y divide-white/5">
                    {others.map((player, i) => (
                        <div key={i} className="flex items-center justify-between p-6 hover:bg-white/5 transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 font-bold text-xs border border-white/5">
                                    #{i + 4}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center text-indigo-400 font-bold shadow-inner">
                                        {player.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-base font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{player.name}</div>
                                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">{player.department || 'Elite Student'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="hidden md:flex flex-col items-end">
                                    <div className="text-xs font-bold text-white">Level {Math.floor(player.points / 200) + 1}</div>
                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Master Class</div>
                                </div>
                                <div className="text-right min-w-[100px]">
                                    <div className="text-lg font-bold text-white flex items-center justify-end gap-2 group-hover:scale-110 transition-transform"><Zap size={16} className="text-indigo-400" /> {player.points}</div>
                                    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">Total XP</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-8 text-center bg-white/[0.01]">
                    <button className="px-10 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all">
                        Load More Rankings <ChevronRight size={14} className="inline ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
