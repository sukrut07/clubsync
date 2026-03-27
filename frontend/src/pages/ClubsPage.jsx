import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Zap, Users, Code, Cpu, Brain, Laptop,
    Palette, Music, Camera, Trophy, Rocket,
    Globe, Gamepad, PenTool, BookOpen, Mic2,
    Search, Filter, ArrowRight, Star, Instagram,
    TrendingUp, Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';

const ClubCard = ({ club, delay, onViewDetails }) => {
    const Icon = club.icon;
    return (
        <div
            className="glass-card p-8 group hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-indigo-500/30 animate-fade-in"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-${club.color}-500/10 flex items-center justify-center text-${club.color}-400 group-hover:bg-${club.color}-500 group-hover:text-white transition-all shadow-inner`}>
                    <Icon size={28} />
                </div>
                <div className="flex items-center gap-1 text-yellow-500/50 group-hover:text-yellow-500 transition-colors">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Active</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors tracking-tight">
                {club.name}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 line-clamp-2 italic">
                "{club.desc}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{club.category}</span>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onViewDetails(club)}
                        className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/btn"
                    >
                        View Club <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    {club.instagramUrl && (
                        <a
                            href={club.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-lg hover:bg-pink-500/40 transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"
                        >
                            <Instagram size={12} /> Instagram
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const ClubModal = ({ club, onClose }) => {
    if (!club) return null;
    const Icon = club.icon;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Body */}
            <div className="relative glass-card rounded-3xl bg-[#020617] border border-white/10 shadow-2xl max-w-2xl w-full p-8 md:p-12 animate-scale-up overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-${club.color}-500/10 blur-[100px] rounded-full`}></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                    <ArrowRight size={24} className="rotate-180" />
                </button>

                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                        <div className={`w-20 h-20 rounded-2xl bg-${club.color}-500/10 flex items-center justify-center text-${club.color}-400 shadow-inner`}>
                            <Icon size={40} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">{club.category}</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{club.name}</h2>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">About the Club</h4>
                            <p className="text-lg text-slate-300 leading-relaxed italic">
                                "{club.desc}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Members</div>
                                <div className="text-2xl font-bold text-white">{club.members}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Upcoming Event</div>
                                <div className="text-sm font-bold text-indigo-400">{club.upcomingEvent}</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {club.instagramUrl && (
                                <a
                                    href={club.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 min-w-[200px] py-4 bg-pink-500/20 text-pink-300 rounded-xl hover:bg-pink-500/30 transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-3 border border-pink-500/20"
                                >
                                    <Instagram size={20} /> Visit Instagram
                                </a>
                            )}
                            <button
                                onClick={onClose}
                                className="px-8 py-4 bg-white/5 text-slate-300 rounded-xl hover:bg-white/10 transition-all font-bold uppercase tracking-widest border border-white/10"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClubsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClub, setSelectedClub] = useState(null);

    const footerLinks = [
        { label: "Contact", href: "/#footer" },
        { label: "Support", href: "/#support" },
        { label: "About", href: "/#about" },
        { label: "MITAOE", href: "#" }
    ];

    const clubs = [
        { id: "aalekh", name: "MITAOE Aalekh", desc: "The official art and branding club of MITAOE, expressing creativity through diverse media.", category: "Arts", icon: Palette, color: "pink", instagramUrl: "https://www.instagram.com/mitaoe_aalekh", members: "45+", upcomingEvent: "Poster Design Workshop" },
        { id: "shutterbugs", name: "Shutterbugs", desc: "Capturing life's moments through the lens. The official photography and cinematography club.", category: "Arts", icon: Camera, color: "emerald", instagramUrl: "https://www.instagram.com/shutterbugs.mitaoe", members: "30+", upcomingEvent: "Campus Photowalk" },
        { id: "gdg", name: "GDG MITAOE", desc: "Google Developer Groups campus chapter, fostering a community of developers and innovators.", category: "Technical", icon: Globe, color: "blue", instagramUrl: "https://www.instagram.com/gdg.mitaoe", members: "120+", upcomingEvent: "Build with AI Session" },
        { id: "girlscript", name: "Girlscript MITAOE", desc: "Empowering diversity in tech through community-led education and open-source contributions.", category: "Technical", icon: Code, color: "rose", instagramUrl: "https://www.instagram.com/girlscriptmitaoe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", members: "100+", upcomingEvent: "Datathon 2026" },
        { id: "codechef", name: "CodeChef MITAOE Chapter", desc: "Elevating the competitive programming culture and problem-solving skills on campus.", category: "Technical", icon: Code, color: "indigo", instagramUrl: "https://www.instagram.com/codechef_mitaoe", members: "80+", upcomingEvent: "Starters 120 Contest" },
        { id: "vertex", name: "VERTEX GDNA Game Dev Club", desc: "A creative hub for game designers, developers, and enthusiasts to build interactive experiences.", category: "Technical", icon: Gamepad, color: "violet", instagramUrl: "https://www.instagram.com/vertex.gdna", members: "55+", upcomingEvent: "Unity Game Jam" },
        { id: "flc", name: "Foreign Language Club MITAOE", desc: "Promoting linguistic diversity and cultural exchange through language learning and events.", category: "Social", icon: BookOpen, color: "slate", instagramUrl: "https://www.instagram.com/foreignlanguageclub_mitaoe", members: "40+", upcomingEvent: "Japanese Language Meetup" },
        { id: "menace", name: "MENACE Dance Club", desc: "The official dance crew of MITAOE, bringing energy and rhythm to campus stages.", category: "Arts", icon: Zap, color: "yellow", instagramUrl: "https://www.instagram.com/menace_dance_club", members: "25+", upcomingEvent: "Annual Fest Performance" },
        { id: "aeromodelling", name: "AeroModelling Club", desc: "Exploring the skies by designing, building, and flying innovative RC aircraft and drones.", category: "Technical", icon: Rocket, color: "orange", instagramUrl: "https://www.instagram.com/mitaero", members: "20+", upcomingEvent: "Drone Racing League" },
        { id: "niyudrath", name: "Team Niyudrath Racing", desc: "MITAOE's official Formula Student team, engineering high-performance racing vehicles.", category: "Technical", icon: Cpu, color: "cyan", instagramUrl: "https://www.instagram.com/teamniyudrathracing", members: "15+", upcomingEvent: "Rollout 2026" },
        { id: "goonj", name: "Goonj Unplugged", desc: "The heartbeat of MITAOE's music scene, specializing in unplugged and acoustic performances.", category: "Arts", icon: Music, color: "red", instagramUrl: "https://www.instagram.com/goonj.unplugged", members: "35+", upcomingEvent: "Unplugged Night" },
        { id: "ignitedminds", name: "Ignited Minds Club", desc: "Dedicated to social welfare and community development through impactful student initiatives.", category: "Social", icon: Users, color: "rose", instagramUrl: "https://www.instagram.com/mit_ignited_minds_club", members: "60+", upcomingEvent: "Education for All Drive" },
        { id: "literary", name: "MITAOE Literary Circle", desc: "A platform for writers, poets, and speakers to express their literary and creative flair.", category: "Arts", icon: PenTool, color: "slate", instagramUrl: "https://www.instagram.com/mitaoe_literary_club", members: "45+", upcomingEvent: "Poetry Slam 2026" },
        { id: "mozilla", name: "Mozilla Club MITAOE", desc: "Advocating for the open web and teaching web development through interactive sessions.", category: "Technical", icon: Laptop, color: "blue", instagramUrl: "https://www.instagram.com/mozillamitaoe", members: "70+", upcomingEvent: "Rust Workshop" },
        { id: "invictus", name: "Team INVICTUS Robotics", desc: "Representing MITAOE in national robotics competitions with innovative robotic solutions.", category: "Technical", icon: Rocket, color: "orange", instagramUrl: "https://www.instagram.com/invictus_robotics", members: "25+", upcomingEvent: "RoboCon Nationals" },
        { id: "rotaract", name: "Rotaract Club MITAOE", desc: "Developing leadership and professional skills through community service and fellowship.", category: "Social", icon: Globe, color: "teal", instagramUrl: "https://www.instagram.com/rotaract.mitaoe", members: "90+", upcomingEvent: "Blood Donation Camp" },
        { id: "algovedas", name: "ALGOVEDAS MITAOE", desc: "Bridging mathematics and computer science through algorithmic research and modeling.", category: "Technical", icon: Brain, color: "purple", instagramUrl: "https://www.instagram.com/algovedas_mitaoe", members: "30+", upcomingEvent: "Logic Puzzle Night" },
        { id: "ecell", name: "E-CELL MITAOE", desc: "Nurturing the entrepreneurial spirit and supporting student startups and innovations.", category: "Business", icon: TrendingUp, color: "indigo", instagramUrl: "https://www.instagram.com/ecellmitaoe", members: "50+", upcomingEvent: "Shark Tank MITAOE" },
        { id: "axes", name: "AXES Maths Club", desc: "Exploring mathematical concepts and logical reasoning through fun and engaging events.", category: "Technical", icon: Cpu, color: "blue", instagramUrl: "https://www.instagram.com/mathsclub_mitaoe", members: "40+", upcomingEvent: "Math-O-Mania" },
        { id: "spark", name: "SPARK Club MITAOE", desc: "Empowering students with essential soft skills and career-focused personality development.", category: "Social", icon: Sparkles, color: "yellow", instagramUrl: "https://www.instagram.com/spark_.mitaoe", members: "50+", upcomingEvent: "Personality Workshop" }
    ];

    const filteredClubs = clubs.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 relative selection:bg-indigo-500 selection:text-white overflow-hidden">
            <Navbar />

            {/* Background Accents */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
            </div>

            <main className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Users size={14} /> The Collective Hub
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.9)] hover:drop-shadow-[0_0_40px_rgba(34,211,238,0.7)] hover:scale-105 cursor-default">
                        Student Clubs <br />
                        <span className="gradient-text">& Societies.</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-normal">
                        Explore the vibrant MITAOE campus ecosystem. From technical research wings to performing arts, find your circle and build your legacy.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-16">
                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search clubs, categories, or keywords..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-colors">
                        <Filter size={16} /> Filter By Category
                    </div>
                </div>

                {/* Grid */}
                {filteredClubs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredClubs.map((club, i) => (
                            <ClubCard
                                key={club.id}
                                club={club}
                                delay={i * 50}
                                onViewDetails={(c) => setSelectedClub(c)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center glass-card border-dashed">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={24} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No organizations found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                )}
            </main>

            {/* Club Modal */}
            <ClubModal
                club={selectedClub}
                onClose={() => setSelectedClub(null)}
            />

            {/* Sticky Footer */}
            <footer className="py-20 border-t border-white/5 bg-[#0b1120]/50 mt-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                            <Zap size={22} color="white" fill="white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">ClubSync</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        {footerLinks.map((link, i) => (
                            <Link key={i} to={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest italic">
                        © ClubSync Infrastructure Corp.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClubsPage;
