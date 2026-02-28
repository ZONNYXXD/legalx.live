"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ShieldCheck, Monitor, Code, Activity, Cpu, Search, Terminal, Lock, ChevronUp, Layers, Zap } from "lucide-react"

const layers = [
    {
        id: 'hardening',
        title: "Kernel Hardening",
        icon: ShieldCheck,
        color: "#A855F7",
        status: "ENFORCED",
        terminal: [
            "> Initializing Secure_Boot_v2...",
            "> Patching kernel (CVE-2024-X)",
            "> Hardware isolation: ENABLED",
            "> System integrity: 100%"
        ],
        desc: "Low-level security optimizations for mission-critical systems and remote infrastructures."
    },
    {
        id: 'automation',
        title: "AI Orchestration",
        icon: Cpu,
        color: "#00ffff",
        status: "ACTIVE",
        terminal: [
            "> Loading RAG_Neural_Engine...",
            "> Monitoring anomaly vectors...",
            "> Mitigating escalation attempt",
            "> Response time: 12ms [OPTIMAL]"
        ],
        desc: "Self-healing infrastructures that adapt to threat vectors using custom-trained models."
    },
    {
        id: 'tooling',
        title: "Rapid Deployment",
        icon: Code,
        color: "#ffaa00",
        status: "OPERATIONAL",
        terminal: [
            "> Compiling C#/.NET suite",
            "> Synchronizing global nodes",
            "> Tactical monitoring stack",
            "> Orchestration: READY"
        ],
        desc: "Bespoke desktop applications for complex system orchestration and IT management."
    }
]

export const SystemDemo = () => {
    const [activeLayer, setActiveLayer] = useState<string | null>('hardening')
    const containerRef = useRef<HTMLDivElement>(null)

    // Parallax Values - Refined for subtle, weighted movement
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Straighter base orientation with dampening (stiffness 40, damping 25)
    const rotateX = useSpring(useTransform(mouseY, [-400, 400], [12, -12]), { stiffness: 40, damping: 25 })
    const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-8, 8]), { stiffness: 40, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <section
            id="systems"
            className="py-32 relative overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-neon-purple/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-[9px] font-black mb-6 uppercase tracking-widest"
                    >
                        <Layers className="w-3 h-3" /> Architecture Stack v5.0
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-crenzo text-white mb-6 leading-none">
                        Engineered <span className="text-neon-purple">Logic Layers</span>
                    </h2>
                    <p className="text-gray-500 font-ui font-medium max-w-2xl mx-auto uppercase text-[10px] tracking-[0.3em] leading-relaxed">
                        A multi-layered interactive schematic of proprietary security and automation stacks.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Left: Exploded Schematic Visualization */}
                    <div className="lg:w-1/2 relative perspective-3000 py-32 w-full flex justify-center">
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                            className="relative w-full max-w-md h-[450px]"
                        >
                            {/* Tactical Pedestal - Straighter, cleaner look */}
                            <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[140%] h-[120px] bg-gradient-to-t from-neon-purple/10 to-transparent blur-3xl opacity-30 rounded-full" />
                            <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[60%] h-[12px] bg-neon-purple/25 border-t border-neon-purple/40 rounded-full blur-sm" />

                            {/* Fiber Optic Connectors (SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                                <defs>
                                    <linearGradient id="fiberGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {layers.map((_, i) => i < layers.length - 1 && (
                                    <motion.line
                                        key={`line-${i}`}
                                        x1="50%" y1={`${i * 120 + 90}px`}
                                        x2="50%" y2={`${(i + 1) * 120 + 90}px`}
                                        stroke="url(#fiberGlow)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: [0, -20] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                ))}
                            </svg>

                            {layers.map((layer, i) => (
                                <motion.div
                                    key={layer.id}
                                    initial={{ opacity: 0, y: 100, z: -200 }}
                                    whileInView={{ opacity: 1, y: 0, z: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, duration: 1 }}
                                    whileHover={{
                                        z: 80,
                                        scale: 1.05,
                                        transition: { duration: 0.3 }
                                    }}
                                    onClick={() => setActiveLayer(layer.id)}
                                    className={`absolute left-0 right-0 h-44 cursor-pointer group rounded-xl border-2 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${activeLayer === layer.id
                                        ? "z-40 border-neon-purple bg-[#0a0a0a]"
                                        : "z-10 border-white/10 bg-[#050505] opacity-90"
                                        }`}
                                    style={{
                                        top: `${i * 120}px`,
                                        x: i % 2 === 0 ? -6 : 6, // Subtle staggering for a straighter look
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Glass Refraction Glare */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30 rounded-xl pointer-events-none" />

                                    {/* Internal PCB-like Grid */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                        style={{ backgroundImage: 'radial-gradient(#A855F7 0.5px, transparent 0)', backgroundSize: '15px 15px' }} />

                                    <div className="p-8 flex items-center justify-between h-full relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className={`p-4 rounded-2xl transition-all duration-500 ${activeLayer === layer.id ? "bg-neon-purple text-black shadow-[0_0_25px_#A855F7]" : "bg-white/5 text-gray-500"}`}>
                                                <layer.icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Architecture_Node_0{i + 1}</div>
                                                <h3 className="text-xl font-header font-black text-white uppercase tracking-tight italic group-hover:text-neon-purple transition-colors">
                                                    {layer.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {activeLayer === layer.id && (
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="text-[8px] font-mono text-neon-purple font-black animate-pulse uppercase tracking-[0.2em]">Data_Inbound</div>
                                                <div className="flex gap-1">
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                                            transition={{ delay: i * 0.2, repeat: Infinity }}
                                                            className="w-1.5 h-1.5 rounded-full bg-neon-purple"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* 3D Depth Edges */}
                                    <div className="absolute -bottom-1 left-4 right-4 h-1 bg-black/40 blur-[2px] rounded-full" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Technical Diagnostic Terminal */}
                    <div className="lg:w-1/2 w-full">
                        <AnimatePresence mode="wait">
                            {activeLayer && (
                                <motion.div
                                    key={activeLayer}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="glass p-12 rounded-2xl border-white/10 relative overflow-hidden group/panel shadow-2xl"
                                >
                                    {/* Scan Pulse Background */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 blur-[80px] -mr-32 -mt-32" />

                                    <div className="flex items-center justify-between mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-px bg-neon-purple/40" />
                                            <span className="text-[10px] font-mono text-neon-purple uppercase tracking-[0.4em] font-bold">Diagnostics_Suite</span>
                                        </div>
                                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live_Sync
                                        </div>
                                    </div>

                                    <h3 className="text-4xl font-header font-black text-white mb-6 uppercase tracking-tight italic">
                                        {layers.find(l => l.id === activeLayer)?.title}
                                    </h3>

                                    <p className="text-gray-400 font-ui text-[11px] italic leading-relaxed mb-10 max-w-lg">
                                        "{layers.find(l => l.id === activeLayer)?.desc}"
                                    </p>

                                    {/* Advanced Terminal Feed */}
                                    <div className="bg-[#050505] rounded-xl p-8 font-mono border border-white/5 relative group/terminal">
                                        <div className="flex items-center justify-between mb-6 opacity-40">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                            </div>
                                            <span className="text-[8px] tracking-[0.3em]">SECURE_SESSION_v8.42</span>
                                        </div>

                                        <div className="space-y-3">
                                            {layers.find(l => l.id === activeLayer)?.terminal.map((line, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="text-[10px] flex gap-4"
                                                >
                                                    <span className="text-neon-purple/30 font-bold">{idx + 1}</span>
                                                    <span className={line.includes('100%') || line.includes('OPTIMAL') || line.includes('ENABLED') ? 'text-emerald-500 font-bold shadow-emerald-500/20 glow-sm' : 'text-gray-400 font-medium'}>
                                                        {line}
                                                    </span>
                                                </motion.div>
                                            ))}
                                            <motion.div
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                className="w-2.5 h-4 bg-neon-purple inline-block ml-1 align-bottom mb-0.5"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-10 flex items-center justify-between">
                                        <button className="flex items-center gap-4 text-[10px] font-black text-neon-purple uppercase tracking-[0.4em] group/btn">
                                            System Override <ChevronUp className="w-4 h-4 rotate-90 group-hover/btn:translate-x-2 transition-transform" />
                                        </button>
                                        <div className="text-[9px] font-mono text-gray-700 tracking-tighter uppercase select-none">Auth_Token: 84X-99P-K0L</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Global Logic Stats */}
                        <div className="flex gap-4 mt-8">
                            {[
                                { label: "Architecture_Load", val: "14.2%" },
                                { label: "System_Hardness", val: "Tier_01" },
                                { label: "Neural_Drift", val: "0.02ms" }
                            ].map((stat, i) => (
                                <div key={i} className="flex-1 p-6 glass border-white/5 rounded-xl text-center group hover:border-white/10 transition-all">
                                    <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-xs font-header text-white tracking-widest group-hover:text-neon-purple transition-colors">{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
