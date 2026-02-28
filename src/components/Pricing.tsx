"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Settings, Zap, Check, ChevronRight, Activity, Cpu, Lock, BarChart3, Terminal } from "lucide-react"

const tiers = [
    {
        id: 'audit',
        name: "Security Audit Node",
        price: "2,500",
        desc: "Deep-ecosystem diagnostic and risk mapping.",
        metrics: { velocity: "Fast", immunity: "High", scalability: "Static" },
        icon: Shield,
        popular: false,
        specs: [
            { label: "Vulnerability Scan", detail: "Heuristic/Manual blend" },
            { label: "Risk Matrix", detail: "ISO 27001 standard" },
            { label: "Architecture Review", detail: "Zero Trust Gap Analysis" },
            { label: "Action Roadmap", detail: "Priority 1-5 categorization" }
        ]
    },
    {
        id: 'engineering',
        name: "System Engineering Hub",
        price: "5,000",
        desc: "Active build and automation transformation.",
        metrics: { velocity: "Elite", immunity: "Ultra", scalability: "Dynamic" },
        icon: Settings,
        popular: true,
        specs: [
            { label: "Custom EDR Tools", detail: "Proprietary C#/.NET" },
            { label: "SOC Automation", detail: "70% Manual Reduction" },
            { label: "Hardening Logic", detail: "Kernel-level protection" },
            { label: "Monitoring RAG", detail: "AI-driven log analysis" }
        ]
    },
    {
        id: 'enterprise',
        name: "Impact Architecture",
        price: "Custom",
        desc: "Dedicated infrastructure and threat response.",
        metrics: { velocity: "Continuous", immunity: "Absolute", scalability: "Infinite" },
        icon: Zap,
        popular: false,
        specs: [
            { label: "Management", detail: "24/7 Active Oversight" },
            { label: "Growth Strategy", detail: "Scale-out orchestration" },
            { label: "Intelligent Agents", detail: "Autonomous Defense" },
            { label: "Direct Consult", detail: "Priority L1 Response" }
        ]
    }
]

export const Pricing = () => {
    const [selectedId, setSelectedId] = useState<string | null>('engineering')

    return (
        <section id="projects" className="py-32 relative overflow-hidden bg-black">
            {/* HUD Elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-black uppercase tracking-widest mb-6"
                    >
                        <BarChart3 className="w-3 h-3" /> Mission Economics v4.2
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-crenzo text-white mb-6 leading-none">
                        Impact <span className="text-neon-purple">Architecture</span>
                    </h2>
                    <p className="text-gray-500 font-ui font-medium max-w-2xl mx-auto uppercase text-[10px] tracking-[0.3em] leading-relaxed">
                        Quantified value modules engineered for high-stake infrastructure and elite security operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {tiers.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, rotateX: -2, rotateY: 2 }}
                            onClick={() => setSelectedId(plan.id)}
                            className={`p-10 rounded-2xl glass border-2 transition-all duration-500 cursor-pointer relative group perspective-1000 ${selectedId === plan.id
                                ? "border-neon-purple bg-gradient-to-br from-neon-purple/[0.08] to-cyan-400/[0.03] glow-neon-blend shadow-[0_0_50px_rgba(168,85,247,0.1)]"
                                : "border-white/5 hover:border-white/10"
                                }`}
                        >
                            {/* Scanning Animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                <motion.div
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[1px] bg-neon-purple/30 shadow-[0_0_15px_#A855F7]"
                                />
                            </div>

                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-purple text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_#A855F7]">
                                    Active Priority
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-10">
                                <div className={`p-4 rounded-xl ${selectedId === plan.id ? "bg-neon-purple/20 text-neon-purple" : "bg-white/5 text-gray-400"} transition-colors`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">MSRP_START</div>
                                    <div className="text-3xl font-header font-black text-white italic">
                                        <span className="text-sm align-top leading-none mr-1 opacity-50">$</span>
                                        {plan.price}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-header font-black text-white uppercase tracking-tight mb-2 group-hover:text-neon-purple transition-colors">
                                    {plan.name}
                                </h3>
                                <p className="text-gray-400 text-xs font-ui leading-relaxed italic opacity-70">
                                    "{plan.desc}"
                                </p>
                            </div>

                            {/* Impact HUD */}
                            <div className="grid grid-cols-3 gap-2 mb-10 py-6 border-y border-white/5">
                                {Object.entries(plan.metrics).map(([key, val]) => (
                                    <div key={key} className="text-center">
                                        <div className="text-[8px] text-gray-600 uppercase font-black tracking-widest mb-1">{key}</div>
                                        <div className="text-[10px] text-white font-header uppercase tracking-tighter">{val}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 mb-10">
                                {plan.specs.map((spec, idx) => (
                                    <div key={idx} className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-neon-purple" />
                                            <span className="text-[10px] text-white font-black uppercase tracking-widest">{spec.label}</span>
                                        </div>
                                        <div className="text-[9px] text-gray-500 font-ui font-medium pl-3 italic">{spec.detail}</div>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-5 rounded-lg font-header font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${selectedId === plan.id
                                ? "bg-gradient-to-r from-neon-purple to-purple-600 text-black hover:glow-neon-blend"
                                : "bg-white/5 text-white hover:bg-white/10"
                                }`}>
                                <Terminal className="w-4 h-4" /> Activate Module
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Tactical Footer Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01, borderColor: 'rgba(168, 85, 247, 0.3)' }}
                    transition={{ duration: 0.5 }}
                    className="mt-20 p-8 glass border border-white/5 border-t-neon-purple/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group/footer"
                >
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-700" />

                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-14 h-14 rounded-2xl border border-neon-purple/20 flex items-center justify-center bg-neon-purple/5 group-hover/footer:border-neon-purple/40 transition-all duration-500">
                            <Activity className="w-7 h-7 text-neon-purple animate-pulse" />
                        </div>
                        <div>
                            <div className="text-sm font-header font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                System_Diagnostics_Live
                            </div>
                            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1 opacity-70">
                                Node_Status: <span className="text-emerald-500">Active</span> // Latency: 4ms // Encryption: AES-256
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <div className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-neon-purple/30 hover:text-white transition-all">
                            ISO 27001 Ready
                        </div>
                        <div className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-neon-purple/30 hover:text-white transition-all">
                            SOC 2 Compliance
                        </div>
                    </div>

                    {/* Scanning Beam */}
                    <motion.div
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent skew-x-12 pointer-events-none"
                    />
                </motion.div>
            </div>
        </section>
    )
}
