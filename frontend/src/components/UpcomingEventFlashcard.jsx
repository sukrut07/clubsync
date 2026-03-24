import { useState, useEffect } from 'react';
import { Calendar, Zap, ArrowRight, X } from 'lucide-react';
import { eventsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const UpcomingEventFlashcard = () => {
    const [event, setEvent] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await eventsAPI.getAll();
                // Get the closest future event
                const now = new Date();
                const upcoming = data
                    .filter(e => new Date(e.date) >= now)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

                if (upcoming) setEvent(upcoming);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvent();
    }, []);

    if (!event || !isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 w-72 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="glass-card p-5 relative overflow-hidden group border-indigo-500/40 glow-sm">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                    <X size={14} className="text-slate-400" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Zap size={16} className="text-indigo-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Upcoming Now</span>
                </div>

                <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-indigo-300 transition-colors">
                    {event.eventName}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar size={12} />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                        By <span className="text-indigo-300 font-medium">{event.organizer}</span>
                    </div>
                </div>

                <Link to={`/events/register?id=${event._id}`}>
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-lg shadow-indigo-600/20">
                        Register Now <ArrowRight size={12} />
                    </button>
                </Link>

                {/* Decorative corner glow */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none group-hover:bg-indigo-600/40 transition-all duration-700"></div>
            </div>

            <style jsx>{`
        .glow-sm {
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
        }
      `}</style>
        </div>
    );
};

export default UpcomingEventFlashcard;
