import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/5 bg-[#0b1120]/80 backdrop-blur-xl pt-16 pb-8 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                                <Zap size={22} color="white" fill="white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">ClubSync</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-xs">
                            ClubSync is the official club management portal for MITAOE.
                            Manage events, members, registrations, and participation using one unified platform.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 transparent-glass rounded-lg border border-white/5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                            Developed for Datathon 2026
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Clubs', 'Events', 'Contact', 'Datathon 2026', 'Login', 'Dashboard'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-xs text-slate-400 hover:text-indigo-400 hover:ml-1 transition-all flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-indigo-500/0 group-hover:bg-indigo-500 rounded-full transition-all"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Features */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">System Features</h4>
                        <ul className="space-y-3">
                            {[
                                'Admin Dashboard', 'Club Member Panel', 'Student Portal',
                                'Event Management', 'Participation Tracking', 'Registration System',
                                'Analytics', 'Announcements'
                            ].map((feature) => (
                                <li key={feature} className="text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-default flex items-center gap-2 group">
                                    <div className="w-1 h-1 bg-white/10 group-hover:bg-cyan-500 rounded-full"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Contact Ops</h4>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <MapPin size={18} className="text-indigo-400 shrink-0" />
                                <div className="text-xs text-slate-400 leading-relaxed">
                                    MIT Academy of Engineering<br />
                                    Alandi, Pune, Maharashtra
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Mail size={18} className="text-indigo-400 shrink-0" />
                                <div className="text-xs text-indigo-400 font-medium hover:text-white transition-colors cursor-pointer">
                                    clubsync@mitaoe.ac.in<br />
                                    admin@mitaoe.com
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Phone size={18} className="text-indigo-400 shrink-0" />
                                <div className="text-xs text-slate-300 font-bold">
                                    +91 00000 00000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] text-slate-500 font-medium text-center md:text-left">
                        © 2026 ClubSync — MITAOE Club Management System. <br className="md:hidden" />
                        <span className="text-indigo-400/60 font-bold ml-1 italic">Developed for Datathon 2026</span>
                    </div>
                    <div className="flex gap-6">
                        {[Github, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="text-slate-500 hover:text-white transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
