"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, Activity, Cpu, ShieldCheck, Lock, Terminal } from "lucide-react"

const oldWay = [
    { text: "Manual security audits", code: "SEC_ERR_01" },
    { text: "Unoptimized systems", code: "PERF_LAG_X4" },
    { text: "Weak automation", code: "AUTO_FAIL_Z0" },
    { text: "Reactive threat handling", code: "TRT_DLY_B2" },
    { text: "Generic IT support", code: "SVC_MSK_Q3" },
]

const newWay = [
    { text: "Hardened architecture", status: "STABLE" },
    { text: "Custom-built automation", status: "OPTIMIZED" },
    { text: "AI-assisted monitoring", status: "INTELLIGENT" },
    { text: "Scalable infrastructure", status: "ELASTIC" },
    { text: "Proactive threat detection", status: "PREEMPTIVE" },
]

const ContrastModule = ({ type, items, title, icon: Icon, index }: { type: 'legacy' | 'secure', items: any[], title: string, icon: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse Parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 60, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 60, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
        setIsHovered(false)
    }

    const isLegacy = type === 'legacy'

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            className="perspective-1000 h-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={`glass p-10 rounded-xl border relative overflow-hidden h-full flex flex-col transition-all duration-700 ${isLegacy
                    ? "border-red-500/10 bg-red-500/[0.02] hover:bg-red-500/[0.05] hover:border-red-500/30"
                    : "border-neon-purple/10 bg-neon-purple/[0.02] hover:bg-neon-purple/[0.05] hover:border-neon-purple/40 glow-neon-blend"
                    }`}
            >
                {/* Visual Artifacts */}
                {isLegacy ? (
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute inset-0 bg-scanline animate-scan opacity-10" />
                        {isHovered && <div className="absolute inset-0 bg-red-500/5 glitch-overlay animate-pulse" />}
                    </div>
                ) : (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ top: "-100%" }}
                            animate={{ top: "200%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-neon-purple/30 blur-sm"
                        />
                    </div>
                )}

                {/* HUD Header */}
                <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-lg border transition-all duration-500 ${isLegacy
                            ? "bg-red-500/10 border-red-500/20 text-red-500 group-hover:glow-red"
                            : "bg-neon-purple/10 border-neon-purple/20 text-neon-purple group-hover:glow-neon-blend"
                            }`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className={`text-[8px] font-mono font-black uppercase tracking-[0.4em] mb-1 block ${isLegacy ? "text-red-500/60" : "text-neon-purple/60"}`}>
                                {isLegacy ? "DEP_LEGACY_01" : "PROT_SECURE_02"}
                            </span>
                            <h3 className={`text-2xl font-header font-black uppercase tracking-tighter italic ${isLegacy ? "text-red-400" : "text-white"}`}>
                                {title}
                            </h3>
                        </div>
                    </div>

                    <div className={`px-2 py-1 rounded border text-[8px] font-mono font-black tracking-widest ${isLegacy ? "border-red-500/20 text-red-500 animate-pulse" : "border-emerald-500/20 text-emerald-500"
                        }`}>
                        {isLegacy ? "VULNERABLE" : "OPTIMAL"}
                    </div>
                </div>

                {/* Data Logs */}
                <div className="space-y-4 relative z-10 flex-grow">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className={`flex items-center justify-between p-4 rounded-md border text-[11px] font-ui font-black uppercase tracking-wider transition-all duration-300 ${isLegacy
                                ? "bg-red-500/5 border-red-500/5 text-gray-400 hover:border-red-500/20 hover:text-red-300"
                                : "bg-white/5 border-white/5 text-white hover:border-neon-purple/30"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {isLegacy ? (
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                ) : (
                                    <ShieldCheck className="w-4 h-4 text-neon-purple" />
                                )}
                                <span>{item.text}</span>
                            </div>
                            <span className="text-[7px] font-mono opacity-40">
                                {isLegacy ? item.code : `[ ${item.status} ]`}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Footer Decoration */}
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                    {!isLegacy ? (
                        <button className="flex items-center gap-3 text-neon-purple font-mono font-black text-[9px] uppercase tracking-[0.4em] group/btn">
                            <Activity className="w-4 h-4" /> Hardening_Protocol_Initialize
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 text-red-500/40 font-mono text-[8px] uppercase tracking-[0.4em]">
                            <ShieldAlert className="w-4 h-4" /> ERROR_SEC_OVERHEAD_DETECTED
                        </div>
                    )}
                </div>

                {/* Corner Details */}
                <div className={`absolute top-2 left-2 w-4 h-4 border-t border-l opacity-20 ${isLegacy ? "border-red-500" : "border-neon-purple"}`} />
                <div className={`absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-20 ${isLegacy ? "border-red-500" : "border-neon-purple"}`} />
            </motion.div>
        </motion.div>
    )
}

export const ProblemSolution = () => {
    return (
        <section id="solutions" className="py-32 relative bg-black/80 backdrop-blur-[2px] overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-5 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-black uppercase tracking-widest mb-6"
                    >
                        <Cpu className="w-3 h-3" /> System Architecture Evolution
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-crenzo text-white mb-6 leading-none">
                        Legacy IT Is a <span className="text-red-500 text-glow-red">Liability.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-ui font-bold uppercase text-[10px] tracking-[0.4em] leading-relaxed italic">
                        "Traditional management is no longer enough. You need systems engineered for the modern threat landscape."
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    <ContrastModule
                        type="legacy"
                        items={oldWay}
                        title="The Old Way"
                        icon={AlertTriangle}
                        index={0}
                    />
                    <ContrastModule
                        type="secure"
                        items={newWay}
                        title="Engineered Way"
                        icon={ShieldCheck}
                        index={1}
                    />
                </div>
            </div>
        </section>
    )
}
