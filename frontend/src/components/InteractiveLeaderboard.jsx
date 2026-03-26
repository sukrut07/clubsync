import React from 'react';
import { Trophy, Star, Zap } from 'lucide-react';

const InteractiveLeaderboard = ({ title, items, icon: Icon = Trophy, iconColor = "#fbbf24" }) => {
    return (
        <div className="glass-card p-10 border-white/5 group relative overflow-hidden h-full flex flex-col">
            {/* Background Decorative Orb */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-x-12 -translate-y-12 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

            <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                    <Icon size={28} style={{ color: iconColor }} /> {title}
                </h3>

                <div className="space-y-4 flex-grow">
                    {items.map((item, i) => {
                        const rank = item.rank || i + 1;
                        // Width decreases by 8% for each index, starting from 100%
                        // We use 'i' instead of 'rank' for width to ensure the first item in the list is always 100%
                        const barWidth = Math.max(60, 100 - i * 8);

                        return (
                            <div
                                key={i}
                                className="relative group/item"
                                style={{ width: `${barWidth}%` }}
                            >
                                {/* Horizontal Bar Container */}
                                <div className={`
                  relative flex items-center justify-between p-4 rounded-2xl 
                  transition-all duration-300 cursor-default
                  ${rank === 1
                                        ? 'bg-gradient-to-r from-amber-400/20 to-indigo-600/10 border border-amber-400/30'
                                        : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-indigo-500/30'
                                    }
                  hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,241,0.2)]
                  hover:brightness-110
                `}>

                                    {/* Left: Rank */}
                                    <div className="flex items-center gap-4 z-10">
                                        <span className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black
                      ${rank === 1
                                                ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                                                : 'bg-white/10 text-white group-hover/item:bg-indigo-500/30'
                                            }
                    `}>
                                            {rank}
                                        </span>

                                        {/* Center: Name */}
                                        <span className="font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] md:max-w-[200px]">
                                            {item.name}
                                        </span>
                                    </div>

                                    {/* Right: Score */}
                                    <div className="flex items-center gap-2 z-10">
                                        <span className={`
                      text-xs font-black uppercase tracking-widest
                      ${rank === 1 ? 'text-amber-400' : 'text-slate-400 group-hover/item:text-indigo-300'}
                    `}>
                                            {item.score || item.points || 0}
                                        </span>
                                        {rank === 1 ? (
                                            <Star size={14} className="text-amber-400 animate-pulse" fill="currentColor" />
                                        ) : (
                                            <Zap size={14} className="text-slate-600 group-hover/item:text-indigo-400 transition-colors" />
                                        )}
                                    </div>
                                </div>

                                {/* Hover Glow Halo (using absolute pseudo-element for smoother transition) */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur-xl -z-10 bg-indigo-500/10"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InteractiveLeaderboard;
