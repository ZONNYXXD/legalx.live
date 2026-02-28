"use client"

import React, { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, PenTool, ShieldAlert, Activity, Zap, Box, ArrowRight, ShieldCheck, Database, Terminal, Layers, Network } from "lucide-react"

const PeekText = ({ text, className, delay = 0, once = true }: { text: string, className?: string, delay?: number, once?: boolean }) => {
    return (
        <span className={`${className} inline-block overflow-hidden`}>
            <motion.span
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block pr-12"
            >
                {text}
            </motion.span>
        </span>
    )
}

const steps = [
    {
        id: "AUDIT",
        title: "Audit & Analysis",
        subtitle: "VULN_SCAN_V04",
        description: "Deep infrastructure scanning, vulnerability mapping, and system review to identify potential weak points in the digital perimeter.",
        icon: Search,
        accent: "#A855F7",
        metrics: [
            { label: "Scan_Depth", value: "100%", level: 100, status: "COMPLETE" },
            { label: "Ports_Audited", value: "65535", level: 100, status: "SECURE" },
            { label: "Risk_Index", value: "0.02", level: 15, status: "MINIMAL" }
        ],
        details: ["Automated Pentesting", "Heuristic Analysis", "Asset Reconnaissance"]
    },
    {
        id: "ARCH",
        title: "Architecture & Automation",
        subtitle: "ENG_CORE_X1",
        description: "Design secure frameworks, build custom tools, and implement AI orchestration for high-level resilience against unknown threats.",
        icon: PenTool,
        accent: "#3B82F6",
        metrics: [
            { label: "Logic_Layers", value: "03", level: 75, status: "OPTIMIZED" },
            { label: "Auto_Sync", value: "Active", level: 100, status: "LIVE" },
            { label: "Uptime_Target", value: "99.9%", level: 99, status: "READY" }
        ],
        details: ["Zero Trust Design", "Edge Logic Nodes", "Custom Orchestrators"]
    },
    {
        id: "HARDEN",
        title: "Hardening & Monitoring",
        subtitle: "DEF_ACTIVE_Z1",
        description: "Deploy hardened systems with active monitoring and performance tuning for continuous protection and automated mitigation.",
        icon: ShieldAlert,
        accent: "#10B981",
        metrics: [
            { label: "Lat_Target", value: "12ms", level: 90, status: "LOW" },
            { label: "TPS_Capacity", value: "50k+", level: 85, status: "NOMINAL" },
            { label: "State_Hardening", value: "Tier_1", level: 100, status: "HARDENED" }
        ],
        details: ["Kernel Level Protection", "Real-time Telemetry", "Automated Mitigation"]
    },
]

export const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section
            id="systems"
            className="pt-16 pb-32 relative overflow-hidden bg-[#020202]"
            ref={containerRef}
        >
            {/* Dark Energy Field */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1033_0%,transparent_70%)] opacity-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-neon-purple/5 border border-neon-purple/20 text-neon-purple text-[8px] font-black uppercase tracking-[0.3em] mb-6"
                    >
                        <Activity className="w-3 h-3" /> <PeekText text="System_Optimization_Module" />
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-venus text-white mb-6 leading-[0.85] italic">
                        <PeekText text="Kinetic Security" /> <span className="text-neon-purple drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"><PeekText text="Pipeline" delay={0.2} /></span>
                    </h2>
                    <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                        <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.5em] whitespace-nowrap">
                            End-To-End Security Engineering
                        </p>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                </div>

                {/* Cyber Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
                    {steps.map((step, i) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveTab(i)}
                            className="relative group outline-none"
                        >
                            <div
                                className={`px-6 py-4 transition-all duration-500 flex items-center gap-4 overflow-hidden relative ${activeTab === i
                                    ? "bg-white/[0.08] border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] scale-105"
                                    : "bg-black/60 border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                                    }`}
                                style={{ clipPath: 'polygon(0 15%, 12% 0, 100% 0, 100% 85%, 88% 100%, 0 100%)' }}
                            >
                                {/* Active State Background Pulse */}
                                {activeTab === i && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute inset-0 bg-neon-purple/20 pointer-events-none"
                                    />
                                )}

                                {/* Interactive Data-Stream Overlay (Hover) */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none overflow-hidden text-[6px] font-mono text-neon-purple leading-none select-none break-all">
                                    {"01011001011101010010110101011010110101011010".repeat(5)}
                                </div>

                                <div className={`relative z-10 p-2 rounded-md transition-all duration-500 ${activeTab === i ? "text-neon-purple bg-neon-purple/10 glow-purple" : "text-gray-600"}`}>
                                    <step.icon className="w-4 h-4" />
                                </div>

                                <div className="text-left relative z-10 flex flex-col justify-center">
                                    <div className={`text-[6px] font-mono font-black tracking-[0.3em] uppercase mb-0.5 transition-colors ${activeTab === i ? "text-neon-purple" : "text-gray-700"}`}>
                                        <PeekText text={`MOD_${step.id}`} />
                                    </div>
                                    <div className={`text-[11px] font-venus italic uppercase tracking-tighter transition-colors pr-8 leading-none ${activeTab === i ? "text-white" : "text-gray-500"}`}>
                                        {step.title.split(' & ')[0]}
                                    </div>
                                </div>

                                {/* Active Logic Status Bar */}
                                {activeTab === i && (
                                    <motion.div
                                        layoutId="tab-active-bar"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-purple"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}
                            </div>

                            {/* Decorative External Accent */}
                            {activeTab === i && (
                                <motion.div
                                    className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-neon-purple opacity-50"
                                    layoutId="tab-corner"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Main 3D Panel */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20, rotateY: 5 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -20, rotateY: -5 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full"
                            style={{ perspective: "2000px" }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-black/40 border border-white/5 backdrop-blur-xl rounded-sm p-12 relative overflow-hidden group">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
                                <div className="absolute top-4 left-4 font-mono text-[7px] text-white/10 uppercase tracking-[0.5em] vertical-text h-32">KINETIC_CORE_INTERFACE</div>

                                {/* Left Content (7 columns) */}
                                <div className="lg:col-span-7 space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-12 bg-neon-purple/40" />
                                            <span className="text-[10px] font-mono text-neon-purple font-black tracking-[0.4em] uppercase">{steps[activeTab].subtitle}</span>
                                        </div>
                                        <h3 className="text-5xl md:text-6xl font-venus text-white italic uppercase tracking-tighter leading-none overflow-hidden pr-8">
                                            <motion.span
                                                key={steps[activeTab].title}
                                                initial={{ y: "100%" }}
                                                animate={{ y: 0 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                className="inline-block pr-4"
                                            >
                                                {steps[activeTab].title}
                                            </motion.span>
                                        </h3>
                                        <div className="overflow-hidden">
                                            <motion.p
                                                key={steps[activeTab].description}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                                className="text-gray-400 font-ui font-medium leading-relaxed text-sm uppercase tracking-wider max-w-xl"
                                            >
                                                {steps[activeTab].description}
                                            </motion.p>
                                        </div>
                                    </div>

                                    {/* Action Points */}
                                    <div className="flex flex-wrap gap-4">
                                        {steps[activeTab].details.map((detail, idx) => (
                                            <div key={`${activeTab}-${idx}`} className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-sm group/item hover:border-neon-purple/30 transition-all overflow-hidden">
                                                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                                <motion.span
                                                    key={detail}
                                                    initial={{ y: "100%" }}
                                                    animate={{ y: 0 }}
                                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                                    className="text-[9px] font-mono font-black text-white/60 group-hover/item:text-white transition-colors uppercase tracking-widest inline-block"
                                                >
                                                    {detail}
                                                </motion.span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Data Visualization (5 columns) */}
                                <div className="lg:col-span-5 relative">
                                    <div className="h-full bg-white/[0.02] border border-white/5 p-8 rounded-sm relative overflow-hidden">
                                        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

                                        <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                                            <Terminal className="w-3 h-3" /> ANALYTICS_REALTIME_STREAM
                                        </div>

                                        <div className="space-y-8 mt-12">
                                            {steps[activeTab].metrics.map((metric, idx) => (
                                                <div key={idx} className="space-y-3">
                                                    <div className="flex justify-between items-end">
                                                        <span className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none overflow-hidden">
                                                            <motion.span
                                                                key={metric.label}
                                                                initial={{ y: "100%" }}
                                                                animate={{ y: 0 }}
                                                                className="inline-block"
                                                            >
                                                                {metric.label}
                                                            </motion.span>
                                                        </span>
                                                        <span className="text-xs font-header font-black text-white italic">{metric.value}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex items-center px-[2px]">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${metric.level}%` }}
                                                            transition={{ duration: 1.5, ease: "circOut" }}
                                                            className="h-[60%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.3)] bg-gradient-to-r from-neon-purple to-cyan-400"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[7px] font-mono font-bold text-gray-600 uppercase tracking-tighter">Diagnostic_State</span>
                                                        <span className="text-[8px] font-mono font-black text-emerald-500 uppercase tracking-widest">{metric.status}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom HUD info */}
                                        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-60">
                                            <div className="flex gap-1">
                                                {[...Array(8)].map((_, i) => (
                                                    <div key={i} className={`w-0.5 h-3 ${i % 3 === 0 ? "bg-neon-purple" : "bg-white/10"}`} />
                                                ))}
                                            </div>
                                            <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest animate-pulse">SYSTEM_STABLE_VERIFIED</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Micro Decorations */}
            <div className="absolute bottom-12 left-12 opacity-20 hidden md:block">
                <div className="flex gap-12 items-center rotate-90 origin-left">
                    <span className="text-[7px] font-mono font-black text-gray-500 uppercase tracking-[0.5em]">ZYN_PROTOCOLS_V4.0.1</span>
                    <div className="w-48 h-px bg-gradient-to-r from-white/20 to-transparent" />
                </div>
            </div>
        </section>
    )
}
