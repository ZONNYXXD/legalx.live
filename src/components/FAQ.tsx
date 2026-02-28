"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Shield, Cpu, Zap, Search, Activity, Terminal } from "lucide-react"

const categories = [
    { id: 'security', label: 'Security Architecture', icon: Shield, color: '#A855F7' },
    { id: 'infrastructure', label: 'System Infrastructure', icon: Cpu, color: '#00ffff' },
    { id: 'automation', label: 'Tactical Automation', icon: Zap, color: '#ffaa00' },
]

const faqs = [
    {
        id: 1,
        cat: 'security',
        q: "What is your approach to Zero Trust?",
        a: "I implement identity-centric security where implicit trust is eliminated. Every request is verified, requiring robust authentication and least-privilege access across all network segments."
    },
    {
        id: 2,
        cat: 'security',
        q: "How do you handle zero-day threat response?",
        a: "Using automated heuristic engines and behavioral analysis to detect anomalies before signatures exist. I focus on reducing the 'blast radius' through proactive isolation."
    },
    {
        id: 3,
        cat: 'infrastructure',
        q: "Can you scale legacy environments?",
        a: "Yes. I specialize in 'Modernization through Hardening'. I bridge the gap between legacy stability and modern cloud-native security without disrupting mission-critical uptime."
    },
    {
        id: 4,
        cat: 'infrastructure',
        q: "Do you build custom internal monitoring?",
        a: "I engineer bespoke C#/.NET and Python-based monitoring utilities that provide deep-packet visibility and resource analytics specific to your proprietary hardware."
    },
    {
        id: 5,
        cat: 'automation',
        q: "How does AI fit into your security workflow?",
        a: "I deploy local LLMs and RAG-based agents to parse massive audit logs, identifying patterns human analysts might miss while automating 80% of routine reporting tasks."
    },
    {
        id: 6,
        cat: 'automation',
        q: "What is the typical deployment timeline?",
        a: "A standard system hardening sprint is 4-6 weeks. This includes initial discovery, architecture design, phased implementation, and final stress-testing."
    }
]

export const FAQ = () => {
    const [activeCat, setActiveCat] = useState('security')
    const [currentIndex, setCurrentIndex] = useState(0)

    const filteredFaqs = useMemo(() =>
        faqs.filter(f => f.cat === activeCat),
        [activeCat])

    // Reset index when category changes
    useMemo(() => setCurrentIndex(0), [activeCat])

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredFaqs.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredFaqs.length) % filteredFaqs.length)
    }

    return (
        <section id="faq" className="py-32 relative overflow-hidden bg-black min-h-screen flex flex-col justify-center">
            {/* High-tech Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #A855F7 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col xl:flex-row gap-16 lg:gap-32 items-center">

                    {/* Left: Control Panel */}
                    <div className="xl:w-1/3 w-full shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-black uppercase tracking-widest mb-6">
                                <Activity className="w-3 h-3" /> Intelligence Hub v2.0
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-crenzo text-white mb-8 leading-none">
                                Tactical <br /><span className="text-neon-purple text-glow-purple">Knowledge</span> Base
                            </h2>
                            <p className="text-gray-500 font-ui text-xs uppercase tracking-[0.2em] leading-relaxed mb-12 max-w-sm italic">
                                Query the knowledge mesh. Navigate operational procedures and architectural paradigms.
                            </p>

                            <div className="space-y-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCat(cat.id)}
                                        className={`w-full flex items-center justify-between p-5 rounded border transition-all duration-500 group relative overflow-hidden ${activeCat === cat.id
                                            ? "bg-black border-neon-purple/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                                            : "bg-black/40 border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className={`p-2 border transition-colors ${activeCat === cat.id ? 'border-neon-purple bg-neon-purple/10 text-neon-purple glow-neon-blend' : 'border-white/10 text-gray-500'}`}>
                                                <cat.icon className="w-4 h-4" />
                                            </div>
                                            <span className={`text-[10px] uppercase font-black tracking-[0.2em] transition-colors ${activeCat === cat.id ? "text-white" : "text-gray-500"}`}>
                                                {cat.label}
                                            </span>
                                        </div>
                                        {activeCat === cat.id && (
                                            <motion.div
                                                layoutId="cat-indicator"
                                                className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-transparent pointer-events-none"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: 3D Carousel UI */}
                    <div className="xl:w-2/3 w-full perspective-1000 h-[500px] relative flex items-center justify-center">
                        <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-center transform-gpu preserve-3d">
                            <AnimatePresence mode="popLayout">
                                {filteredFaqs.map((faq, index) => {
                                    // Calculate relative position based on current index
                                    // Allows for wrap-around math
                                    const relativeIndex = (index - currentIndex + filteredFaqs.length) % filteredFaqs.length;

                                    // Map [0, 1, 2, ...] to specific visual tiers in the 3D stack
                                    let zIndex = 0;
                                    let scale = 1;
                                    let yOffset = 0;
                                    let opacity = 1;
                                    let blur = 0;

                                    if (relativeIndex === 0) {
                                        // Active/Front card
                                        zIndex = 30;
                                        scale = 1;
                                        yOffset = 0;
                                        opacity = 1;
                                        blur = 0;
                                    } else if (relativeIndex === 1) {
                                        // Card behind (bottom)
                                        zIndex = 20;
                                        scale = 0.9;
                                        yOffset = 40;
                                        opacity = 0.5;
                                        blur = 2;
                                    } else if (relativeIndex === filteredFaqs.length - 1) {
                                        // Card behind (top)
                                        zIndex = 20;
                                        scale = 0.9;
                                        yOffset = -40;
                                        opacity = 0.5;
                                        blur = 2;
                                    } else {
                                        // Hidden cards
                                        zIndex = 0;
                                        scale = 0.8;
                                        yOffset = 0;
                                        opacity = 0;
                                        blur = 10;
                                    }

                                    return (
                                        <motion.div
                                            key={faq.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity,
                                                scale,
                                                y: yOffset,
                                                zIndex,
                                                filter: `blur(${blur}px)`
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.16, 1, 0.3, 1] // Apple-like spring
                                            }}
                                            className={`absolute w-full max-w-xl h-auto p-12 bg-black/90 border-2 backdrop-blur-md shadow-2xl flex flex-col justify-between ${relativeIndex === 0 ? 'border-neon-purple glow-neon-blend cursor-default' : 'border-white/10 cursor-pointer pointer-events-none'}`}
                                            onClick={() => {
                                                if (relativeIndex !== 0) {
                                                    relativeIndex === 1 ? nextSlide() : prevSlide()
                                                }
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-8 opacity-50">
                                                <div className="flex items-center gap-2">
                                                    <Terminal className="w-3 h-3 text-neon-purple" />
                                                    <span className="text-[10px] font-mono text-white uppercase tracking-widest font-black">
                                                        Entry_{faq.id.toString().padStart(3, '0')}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em]">
                                                    {faq.cat}_DATA
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-header font-black text-white uppercase tracking-tighter mb-8 leading-tight italic drop-shadow-lg">
                                                {faq.q}
                                            </h3>

                                            <p className="text-sm text-gray-400 font-ui leading-relaxed pt-8 border-t border-white/10 italic">
                                                {faq.a}
                                            </p>

                                            {/* Micro-accents for the active card */}
                                            {relativeIndex === 0 && (
                                                <>
                                                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                                                        <div className="absolute top-0 right-0 w-full h-[2px] bg-neon-purple shadow-[0_0_10px_#A855F7]" />
                                                        <div className="absolute top-0 right-0 w-[2px] h-full bg-neon-purple shadow-[0_0_10px_#A855F7]" />
                                                    </div>
                                                    <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-purple shadow-[0_0_10px_#A855F7]" />
                                                        <div className="absolute bottom-0 left-0 w-[2px] h-full bg-neon-purple shadow-[0_0_10px_#A855F7]" />
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Carousel Navigation Controls */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-auto">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 flex items-center justify-center border border-white/20 bg-black/50 hover:bg-neon-purple/20 hover:border-neon-purple/50 text-white hover:text-neon-purple transition-all -rotate-90 group"
                            >
                                <ChevronRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 flex items-center justify-center border border-white/20 bg-black/50 hover:bg-neon-purple/20 hover:border-neon-purple/50 text-white hover:text-neon-purple transition-all rotate-90 group"
                            >
                                <ChevronRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 p-4 border-t border-b border-white/5 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] font-black text-gray-500 uppercase bg-black/40 backdrop-blur-sm relative"
                >
                    <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-purple to-transparent" />
                    <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-purple to-transparent" />

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-sm bg-emerald-500 animate-pulse drop-shadow-[0_0_5px_#10B981]" /> DB_STATUS: SYNCHRONIZED
                        </div>
                        <div className="hidden md:block">QUERY_LATENCY: 14ms</div>
                    </div>
                    <div className="hidden md:flex gap-8 items-center">
                        <div>ENCRYPTION: AES-256-GCM</div>
                        <div className="flex gap-1">
                            <div className="w-1 h-3 bg-neon-purple/40" />
                            <div className="w-1 h-3 bg-neon-purple/60" />
                            <div className="w-1 h-3 bg-neon-purple" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
