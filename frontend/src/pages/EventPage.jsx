import { useState, useEffect } from 'react';
import {
    Calendar, MapPin, Clock, Users, ArrowRight, Star,
    Filter, Search, Map as MapIcon, Plus, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';

const EventCard = ({ event, delay }) => (
    <div className={`glass-card overflow-hidden group border-white/5 hover:border-indigo-500/40 transition-all duration-500 animate-fade-in hover:-translate-y-2`} style={{ animationDelay: `${delay}ms` }}>
        <div className="h-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar size={120} />
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-4 py-1.5 bg-[#0b1120]/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/30">
                    {event.club}
                </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-xs uppercase tracking-tight">
                    {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                </div>
                <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-xs">
                    <Star size={14} fill="currentColor" /> Featured
                </div>
            </div>
        </div>

        <div className="p-8">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-indigo-400 transition-colors leading-tight">{event.title}</h3>

            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500 font-semibold text-xs uppercase tracking-widest">
                    <Clock size={16} className="text-indigo-500/60" /> {event.time}
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-semibold text-xs uppercase tracking-widest">
                    <MapPin size={16} className="text-indigo-500/60" /> {event.venue}
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-semibold text-xs uppercase tracking-widest">
                    <Users size={16} className="text-indigo-500/60" /> {event.maxParticipants} Seats Max
                </div>
            </div>

            <button
                onClick={() => alert('Registered successfully')}
                className="w-full py-4 bg-white/5 group-hover:bg-indigo-600 border border-white/5 group-hover:border-indigo-500 text-[10px] font-bold uppercase tracking-[0.15em] text-white hover:text-white transition-all rounded-2xl flex items-center justify-center gap-2"
            >
                Secure Permit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
);

const EventPage = () => {
    const { isAdmin } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await eventsAPI.getAll();
                setEvents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 600);
            }
        };
        fetchEvents();
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
                    <h2 className="text-4xl font-bold tracking-tight mb-2">Command <span className="gradient-text">Operations.</span></h2>
                    <p className="text-slate-500 font-normal">Coordinate and execute high-impact campus events.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-2xl px-6 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest cursor-pointer hover:border-indigo-500/30 transition-all">
                        <Filter size={16} className="mr-3" /> Filter Ops
                    </div>
                    {isAdmin && (
                        <Link to="/events/create">
                            <button className="btn-primary h-14 px-8">
                                Launch Event <Plus size={20} />
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((e, i) => (
                    <EventCard key={e._id} event={e} delay={i * 100} />
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-40 glass-card bg-white/[0.01] border-dashed border-white/10">
                    <Calendar size={48} className="text-slate-700 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">No Active Missions</h3>
                    <p className="text-slate-500 font-normal">Wait for new orders or launch your own event hub.</p>
                </div>
            )}
        </div>
    );
};

export default EventPage;
