import { useState, useEffect } from 'react';
import {
    Shield, UserCheck, Calendar, Search,
    Filter, CheckCircle2, XCircle, Clock,
    Zap, ArrowRight, UserPlus, Info,
    AlertCircle, Check
} from 'lucide-react';
import { participationAPI, eventsAPI, registrationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Participation = () => {
    const { user, isMember } = useAuth();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marking, setMarking] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [scanTerm, setScanTerm] = useState('');
    const [xpAmount, setXpAmount] = useState(50);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch events for the admin's club
                const { data } = isMember
                    ? await eventsAPI.getByClub(user?.club)
                    : await eventsAPI.getAll();
                setEvents(data);
                if (data.length > 0) {
                    setSelectedEvent(data[0]);
                }
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [user, isMember]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            if (!selectedEvent) return;
            try {
                // For now, we use a mock or fetch all registrations and filter
                // In a real app, there would be an endpoint like getRegistrationsByEvent
                // Here we'll simulate it with the mock data from Registrations.jsx logic
                // but since it's a real API call, let's assume registrationAPI has it or use dummy
                const dummyStudents = [
                    { _id: 's1', name: 'Aditi Sharma', email: 'aditi@example.com', dept: 'Computer', year: 'TE', attendance: false },
                    { _id: 's2', name: 'Rohan Patil', email: 'rohan@example.com', dept: 'IT', year: 'BE', attendance: false },
                    { _id: 's3', name: 'Sneha Kulkarni', email: 'sneha@example.com', dept: 'Mechanical', year: 'SE', attendance: true },
                    { _id: 's4', name: 'Omkar Jadhav', email: 'omkar@example.com', dept: 'EnTC', year: 'TE', attendance: false },
                    { _id: 's5', name: 'Pratik Deshmukh', email: 'pratik@example.com', dept: 'Civil', year: 'BE', attendance: false },
                ];
                setRegistrations(dummyStudents);
            } catch (err) {
                console.error('Error fetching registrations:', err);
            }
        };
        fetchRegistrations();
    }, [selectedEvent]);

    const handleMarkAttendance = async (studentId, currentStatus) => {
        setMarking(true);
        try {
            const status = !currentStatus;
            await participationAPI.mark({
                studentId,
                eventId: selectedEvent._id,
                attendance: status,
                pointsEarned: status ? xpAmount : 0,
                clubId: user?.clubId || selectedEvent.club
            });

            setRegistrations(prev =>
                prev.map(reg => reg._id === studentId ? { ...reg, attendance: status } : reg)
            );

            setNotification({
                type: 'success',
                message: `Marked ${status ? 'Present' : 'Absent'} successfully! ${status ? `+${xpAmount} XP awarded.` : ''}`
            });
            setTimeout(() => setNotification(null), 3000);
        } catch (err) {
            setNotification({ type: 'error', message: 'Failed to mark attendance.' });
            setTimeout(() => setNotification(null), 3000);
        } finally {
            setMarking(false);
        }
    };

    const handleScan = (e) => {
        e.preventDefault();
        const student = registrations.find(r =>
            r.email.toLowerCase() === scanTerm.toLowerCase() ||
            r._id === scanTerm
        );

        if (student) {
            if (!student.attendance) {
                handleMarkAttendance(student._id, false);
                setScanTerm('');
            } else {
                setNotification({ type: 'info', message: 'Student already marked present.' });
                setTimeout(() => setNotification(null), 3000);
            }
        } else {
            setNotification({ type: 'error', message: 'Student not found in registrations.' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const filteredStudents = registrations.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-8 pb-20">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-10 right-10 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl animate-slide-in ${notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' :
                        notification.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400' :
                            'bg-blue-500/10 border-blue-500/50 text-blue-400'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle2 size={20} /> :
                        notification.type === 'error' ? <AlertCircle size={20} /> : <Info size={20} />}
                    <span className="font-bold text-sm tracking-tight">{notification.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Participation <span className="gradient-text">Tracking.</span></h2>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Operational Unit & Real-time Attendance Console</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/5 border border-white/5 p-1 rounded-xl flex items-center">
                        <span className="px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">XP Reward</span>
                        <input
                            type="number"
                            value={xpAmount}
                            onChange={(e) => setXpAmount(e.target.value)}
                            className="w-16 bg-indigo-600/20 border border-indigo-500/30 rounded-lg px-2 py-1.5 text-indigo-400 font-black text-sm outline-none text-center"
                        />
                    </div>
                </div>
            </div>

            {/* Dashboard Actions */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Event Selector */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-8 border-white/5">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Calendar size={18} className="text-indigo-400" /> Select Event
                        </h3>
                        <div className="space-y-3">
                            {events.map(event => (
                                <button
                                    key={event._id}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${selectedEvent?._id === event._id
                                            ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20 text-white'
                                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:border-white/10'
                                        }`}
                                >
                                    <div className="font-bold text-sm tracking-tight mb-1">{event.title}</div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedEvent?._id === event._id ? 'text-indigo-200' : 'text-slate-600'}`}>
                                        {new Date(event.date).toLocaleDateString()} • {event.venue}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* QR Simulator */}
                    <div className="glass-card p-8 border-indigo-500/20 bg-indigo-500/[0.02]">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Zap size={18} className="text-amber-400" /> Quick Scan (Simulation)
                        </h3>
                        <form onSubmit={handleScan} className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter Email or Student ID..."
                                    value={scanTerm}
                                    onChange={(e) => setScanTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-indigo-500/50 transition-all font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group"
                            >
                                Mark Attendance <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                        <p className="mt-4 text-[10px] text-slate-500 font-medium italic">
                            Tip: In production, this would be a QR scanner. For now, enter a student's email to mark them present instantly.
                        </p>
                    </div>
                </div>

                {/* Student Attendance List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                                    <UserCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Guest List</h3>
                                    <p className="text-[10px] font-bold text-slate-500 tracking-widest mt-0.5">{selectedEvent?.title || 'No Event Selected'}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-2.5 text-sm outline-none focus:border-indigo-500/30 transition-all w-full md:w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.02] border-b border-white/5">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Student</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Dept/Year</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                                        <tr key={student._id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${student.attendance ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400'
                                                        }`}>
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white tracking-tight">{student.name}</div>
                                                        <div className="text-[10px] text-slate-500 font-medium">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-xs font-bold text-slate-400 tracking-wider mb-1">{student.dept}</div>
                                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{student.year} Year</div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${student.attendance
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-slate-500/10 text-slate-500 border border-white/5'
                                                    }`}>
                                                    {student.attendance ? <Check size={10} /> : <Clock size={10} />}
                                                    {student.attendance ? 'Present' : 'Absent'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => handleMarkAttendance(student._id, student.attendance)}
                                                    disabled={marking}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${student.attendance
                                                            ? 'bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20'
                                                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                                        } disabled:opacity-50`}
                                                >
                                                    {student.attendance ? 'Mark Absent' : 'Mark Present'}
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4 text-slate-600">
                                                    <AlertCircle size={40} strokeWidth={1} />
                                                    <div className="text-xs font-bold uppercase tracking-[0.2em]">No students found for this context</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Participation;
