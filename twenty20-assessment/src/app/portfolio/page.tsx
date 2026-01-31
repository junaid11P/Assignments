'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
    LogOut,
    Mail,
    MapPin,
    Github,
    Linkedin,
    Globe,
    Code,
    Cpu,
    Award,
    Briefcase,
    BookOpen
} from 'lucide-react';

interface User {
    name: string;
    email: string;
}

export default function PortfolioPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (!res.ok) throw new Error('Not authenticated');
                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                router.push('/');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            toast.success('Logged out successfully');
            router.push('/');
        } catch (err) {
            toast.error('Logout failed');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen pb-20">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 p-4">
                <div className="max-w-6xl mx-auto glass-container px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold text-xl">
                            J
                        </div>
                        <div>
                            <p className="font-bold leading-none">{user.name}</p>
                            <p className="text-xs text-text-secondary">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 text-red-400 transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Profile Sidebar */}
                <aside className="md:col-span-1 space-y-10">
                    <div className="glass-container p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-2xl font-bold mb-4 text-gradient">Juned</h2>
                        <p className="text-secondary mb-6">GenAI Engineer | Full Stack | AI Systems</p>

                        <ul className="space-y-4 text-text-secondary">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />
                                <span>{user.email}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-primary" />
                                <span>Bengaluru, India</span>
                            </li>
                        </ul>

                        <div className="flex gap-4 mt-8">
                            <a href="https://github.com/junaid11P" target="_blank" className="p-2 glass-container hover:bg-white/10">
                                <Github size={20} />
                            </a>
                            <a href="https://linkedin.com/in/juned11" target="_blank" className="p-2 glass-container hover:bg-white/10">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-2 glass-container hover:bg-white/10">
                                <Globe size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="glass-container p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Cpu size={20} className="text-primary" /> Skills
                        </h3>
                        <div className="space-y-5">
                            {[
                                { category: 'Frontend', skills: ['React.js', 'Next.js', 'HTML', 'CSS', 'JavaScript'] },
                                { category: 'Backend', skills: ['Node.js', 'Express.js', 'FastAPI', 'MongoDB', 'MySQL'] },
                                { category: 'GenAI & ML', skills: ['Python', 'Vector DBs', 'LLMs', 'Prompt Eng', 'RAG', 'LangChain', 'TensorFlow', 'Pandas', 'NLP'] },
                                { category: 'DevOps & Tools', skills: ['Docker', 'Git', 'GitHub', 'AWS', 'Postman'] },
                                { category: 'CS Fundamentals', skills: ['OOP', 'DSA', 'AI System Design', 'AI/ML'] }
                            ].map(group => (
                                <div key={group.category} className="mb-4 last:mb-0">
                                    <p className="text-[10px] uppercase tracking-widest text-primary mb-2 opacity-80 font-bold border-b border-primary/20 pb-1 w-fit">
                                        {group.category}
                                    </p>
                                    <div className="flex flex-wrap gap-x-2 gap-y-3">
                                        {group.skills.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-white/10 border border-white/10 rounded-lg text-[11px] hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 whitespace-nowrap">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-container p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Award size={20} className="text-primary" /> Certifications
                        </h3>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Generative AI for Software Developers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>NoSQL, Big Data & Spark Foundations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Modern Web Apps with MERN</span>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="md:col-span-2 space-y-10">
                    {/* Experience */}
                    <div className="glass-container p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Briefcase size={22} className="text-primary" /> Experience
                        </h3>
                        <div className="space-y-8">
                            <div className="relative pl-6 border-l border-white/10">
                                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
                                <h4 className="font-bold">Full Stack Web Development Intern</h4>
                                <p className="text-sm text-secondary">Edunet Foundation (EY GDS & AICTE) | Feb 2025 – Present</p>
                                <p className="mt-2 text-text-secondary text-sm">Built an online auction platform using the MERN stack. Optimized MongoDB queries for performance.</p>
                            </div>
                            <div className="relative pl-6 border-l border-white/10">
                                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_var(--secondary)]" />
                                <h4 className="font-bold">AI & Robotics Master Trainer</h4>
                                <p className="text-sm text-secondary">Agilo Research (STEMpedia) | Aug 2022 – Jul 2023</p>
                                <p className="mt-2 text-text-secondary text-sm">Mentored teams for CODEAVOUR International AI Competition. Delivered hands-on training in AI/ML.</p>
                            </div>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="glass-container p-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Code size={22} className="text-primary" /> Featured Projects
                        </h3>
                        <div className="space-y-6">
                            <div className="glass-container bg-white/5 p-6 hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-primary text-lg">AI Guru J – Intelligent 3D Python Tutor</h4>
                                </div>
                                <p className="text-xs text-secondary mb-3">React, Three.js, FastAPI, Groq, MongoDB, Render</p>
                                <ul className="text-sm text-text-secondary space-y-2 list-disc pl-4 leading-relaxed">
                                    <li>Built a 3D AI tutor with speech-based Q&A and real-time lip-synced avatar.</li>
                                    <li>Integrated LLM-powered NLP, TTS, and FastAPI backend services.</li>
                                </ul>
                            </div>

                            <div className="glass-container bg-white/5 p-6 hover:border-secondary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-secondary text-lg">Face Emotion Recognition System</h4>
                                </div>
                                <p className="text-xs text-secondary mb-3">TensorFlow, Keras, OpenCV</p>
                                <ul className="text-sm text-text-secondary space-y-1 list-disc pl-4">
                                    <li>Trained CNN on FER-2013 dataset for real-time emotion detection.</li>
                                </ul>
                            </div>

                            <div className="glass-container bg-white/5 p-6 hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-primary text-lg">Online Auction Platform</h4>
                                </div>
                                <p className="text-xs text-secondary mb-3">MERN Stack (MongoDB, Express.js, React, Node.js)</p>
                                <ul className="text-sm text-text-secondary space-y-1 list-disc pl-4">
                                    <li>Developed a full-stack auction system with real-time bidding.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="glass-container p-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <BookOpen size={22} className="text-primary" /> Education
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold">B.Tech in Computer Science & Engineering</h4>
                                <p className="text-sm text-text-secondary">M. S. Ramaiah University of Applied Sciences | 2023 – 2026</p>
                                <p className="text-xs text-primary">CGPA: 8.41</p>
                            </div>
                            <div>
                                <h4 className="font-bold">Diploma in Computer Science & Engineering</h4>
                                <p className="text-sm text-text-secondary">Dr. T. M. A. Pai Polytechnic | 2018 – 2022</p>
                                <p className="text-xs text-primary">63.25%</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
