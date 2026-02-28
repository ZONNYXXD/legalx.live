"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion"
import { ShieldCheck, Cpu, Code2, Users, Star, Activity, Lock, Terminal, Globe, ArrowUpRight } from "lucide-react"

const metrics = [
    { label: "Systems Hardened", value: 500, suffix: "+", icon: ShieldCheck, unit: "SEC_NODE_H" },
    { label: "Tools Developed", value: 100, suffix: "+", icon: Code2, unit: "DEV_UNIT_X" },
    { label: "Infrastructure Stability", value: 99.9, suffix: "%", icon: Cpu, unit: "UPTIME_V8" },
]

const testimonials = [
    {
        quote: "Legal X Security's architectural approach to security transformed our legacy infrastructure into a fortress. Truly elite work.",
        author: "CTO, Fintech Solutions",
        id: "VALID_TR_01",
        stamp: "CERTIFIED_ARCH"
    },
    {
        quote: "The custom automation tools developed by Legal X Security saved us hundreds of man-hours. A specialist in every sense.",
        author: "IT Director, Global Logistics",
        id: "VALID_TR_02",
        stamp: "SYSTEM_OPTIMIZED"
    },
]

const LogicUnit = ({ item, index }: { item: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Ultra-Responsive Magnetic Spring
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [20, -20]), { stiffness: 200, damping: 30 })
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-20, 20]), { stiffness: 200, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - (rect.left + rect.width / 2))
        mouseY.set(e.clientY - (rect.top + rect.height / 2))
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false) }}
            onMouseEnter={() => setIsHovered(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="perspective-2000 h-full group/logic"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={`relative w-full h-full p-10 rounded-none border transition-all duration-700 bg-black/40 backdrop-blur-3xl shadow-2xl ${isHovered ? "border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.1)]" : "border-white/5"
                    }`}
            >
                {/* CYBER SCANNING BEAM */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ top: ['-10%', '110%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover/logic:opacity-100"
                    />
                </div>

                {/* DIAGNOSTIC HUD CORNERS */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover/logic:border-cyan-400 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover/logic:border-cyan-400 transition-colors" />

                {/* MODULE HEADER */}
                <div className="flex justify-between items-start mb-12">
                    <div className="relative" style={{ transform: 'translateZ(40px)' }}>
                        <div className="p-3 bg-white/5 border border-white/10 text-cyan-400 group-hover/logic:bg-cyan-400/10 group-hover/logic:border-cyan-400/40 transition-all duration-500">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 opacity-0 group-hover/logic:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-right font-mono" style={{ transform: 'translateZ(30px)' }}>
                        <div className="text-[8px] text-gray-500 uppercase tracking-[0.4em] mb-1">Node_Address</div>
                        <div className="text-[10px] text-cyan-400/60 uppercase tracking-widest">{item.unit}:0XAF{index}</div>
                    </div>
                </div>

                {/* CORE METRIC */}
                <div className="mb-10" style={{ transform: 'translateZ(60px)' }}>
                    <div className="flex items-baseline gap-2 mb-2 pr-6">
                        <span className="text-6xl md:text-7xl font-venus text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform group-hover/logic:scale-105 duration-700 block">
                            {item.value}
                        </span>
                        <span className="text-2xl font-venus text-cyan-400 opacity-80">{item.suffix}</span>
                    </div>
                    <div className="text-[10px] font-header font-black text-gray-500 uppercase tracking-[0.5em] flex items-center gap-3">
                        <div className="w-8 h-px bg-white/10" />
                        {item.label}
                    </div>
                </div>

                {/* REAL-TIME SYSTEM TELEMETRY */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-8" style={{ transform: 'translateZ(20px)' }}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-mono text-gray-600 uppercase">
                                <span>Stability</span>
                                <span className="text-emerald-500">CRITICAL_OK</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "98%" }}
                                    className="h-full bg-emerald-500/40"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-mono text-gray-600 uppercase">
                                <span>Throughput</span>
                                <span className="text-cyan-400">OPTIMAL</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    className="h-full bg-cyan-400/40"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const IntelModule = ({ test, index }: { test: any, index: number }) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group/intel relative"
        >
            <div className={`relative p-10 bg-black/40 border transition-all duration-700 overflow-hidden ${isHovered ? "border-neon-purple shadow-[0_0_60px_rgba(168,85,247,0.15)] bg-black/60" : "border-white/5"
                }`}>
                {/* ENCRYPTION LAYER OVERLAY */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-0 group-hover/intel:opacity-100 transition-opacity" />

                <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                    {/* BIOMETRIC SIGNATURE BOX */}
                    <div className="relative shrink-0 w-24 h-24 border border-white/5 flex items-center justify-center bg-white/[0.02] group-hover/intel:border-neon-purple/40 transition-colors">
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-neon-purple opacity-0 group-hover/intel:opacity-100 transition-opacity" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-neon-purple opacity-0 group-hover/intel:opacity-100 transition-opacity" />

                        <div className="flex flex-col items-center gap-1">
                            <Lock className={`w-8 h-8 transition-colors duration-500 ${isHovered ? "text-neon-purple" : "text-white/10"}`} />
                            <span className="text-[8px] font-mono text-gray-600 uppercase tracking-tighter">SIG_VALID</span>
                        </div>

                        {/* Interactive Fingerprint/Scanline */}
                        <motion.div
                            animate={isHovered ? { top: ['0%', '100%', '0%'] } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 w-full h-[1px] bg-neon-purple/60 opacity-0 group-hover/intel:opacity-100"
                        />
                    </div>

                    <div className="flex-1 space-y-6">
                        {/* TRANSMISSION HEADER */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[8px] font-mono font-black uppercase tracking-[0.4em]">
                                {test.id} // DECRYPTED
                            </div>
                            <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest italic">
                                Timestamp: {new Date().toLocaleDateString()} // INTERNAL_SYNC
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-neon-purple animate-pulse" : "bg-white/10"}`} />
                                <span className={`text-[8px] font-mono uppercase tracking-[0.2em] ${isHovered ? "text-neon-purple" : "text-gray-700"}`}>
                                    {isHovered ? "SECURE_CONNECTION" : "ENCRYPTED"}
                                </span>
                            </div>
                        </div>

                        {/* KINETIC CHARACTER REVEAL QUOTE */}
                        <div className="text-xl md:text-2xl font-header font-black italic uppercase tracking-tight leading-tight flex flex-wrap gap-x-[0.2em]">
                            {test.quote.split(" ").map((word: string, wordIdx: number) => (
                                <span key={wordIdx} className="inline-flex overflow-hidden">
                                    {word.split("").map((char: string, charIdx: number) => (
                                        <motion.span
                                            key={charIdx}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 0.3 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: isHovered ? (wordIdx * 0.05 + charIdx * 0.02) : 0,
                                                ease: [0.215, 0.61, 0.355, 1]
                                            }}
                                            className="inline-block transition-colors group-hover/intel:text-white"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                    <span className="inline-block">&nbsp;</span>
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            <div className="font-header font-black text-sm text-neon-purple uppercase tracking-[0.3em]">
                                {test.author}
                            </div>
                            <div className="h-px w-12 bg-white/10" />
                            <div className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-3 h-3" /> VERIFIED_IDENTITY_CORE
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export const SocialProof = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const networkScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2])
    const networkOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.15])

    return (
        <section id="expertise" className="py-64 relative overflow-hidden bg-[#010101]" ref={containerRef}>
            {/* AMBIENT BACKGROUND SYSTEM */}
            <motion.div
                style={{ scale: networkScale, opacity: networkOpacity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] border border-cyan-400/20 rounded-full blur-[120px] pointer-events-none"
            />
            <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

            {/* DATA PULSE NODES */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0, 0.2, 0],
                            scale: [1, 1.5, 2]
                        }}
                        transition={{ duration: 10, repeat: Infinity, delay: i * 3.3 }}
                        className="absolute w-64 h-64 bg-neon-purple/5 blur-[80px] rounded-full"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* METRICS GRID - TACTICAL DATA MODULES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                    {metrics.map((item, index) => (
                        <LogicUnit key={item.label} item={item} index={index} />
                    ))}
                </div>

                {/* TESTIMONIALS & LEADERSHIP */}
                <div className="flex flex-col lg:flex-row gap-24 items-start">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-[0.6em] mb-10">
                                <Globe className="w-3 h-3 text-cyan-400" /> Global Validation Sync
                            </div>

                            <h2 className="text-4xl md:text-6xl font-crenzo text-white mb-10 leading-[1.1] pr-12">
                                Trusted by <br />
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-white drop-shadow-[0_0_20px_rgba(34,211,238,0.2)] pb-2 pr-10">Leaders</span> <br />
                                in Systems.
                            </h2>

                            <p className="text-gray-500 font-ui font-bold uppercase text-[11px] tracking-[0.3em] leading-relaxed italic max-w-sm ml-1 border-l-2 border-white/10 pl-6 opacity-60">
                                "Proven excellence in architecture stability and custom system development across diverse sectors."
                            </p>

                            <div className="mt-20 pt-12 border-t border-white/5 space-y-12">
                                <div className="text-[9px] font-mono text-gray-700 uppercase tracking-[0.6em] italic flex items-center gap-3">
                                    <Activity className="w-3 h-3 text-cyan-400/40 animate-pulse" />
                                    Active_Node_Network_v9.2
                                </div>
                                <div className="flex flex-wrap gap-10">
                                    {[
                                        { id: "NODE_ALPHA", icon: ShieldCheck },
                                        { id: "SEC_CORE", icon: Lock },
                                        { id: "INTEL_LINK", icon: Globe },
                                        { id: "SYS_VAULT", icon: Cpu },
                                    ].map((node, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.5, y: 20, filter: "blur(10px)" }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                filter: "blur(0px)"
                                            }}
                                            animate={{
                                                opacity: [0.6, 1, 0.6],
                                                scale: [1, 1.03, 1],
                                            }}
                                            transition={{
                                                opacity: {
                                                    duration: 0.8,
                                                    delay: 0.3 + i * 0.15,
                                                    times: [0, 0.5, 1],
                                                    repeat: Infinity,
                                                    repeatDelay: 2
                                                },
                                                scale: {
                                                    duration: 0.8,
                                                    delay: 0.3 + i * 0.15,
                                                    repeat: Infinity,
                                                    repeatDelay: 2
                                                },
                                                y: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
                                                filter: { duration: 0.8, delay: i * 0.15 }
                                            }}
                                            viewport={{ once: false, amount: 0.4 }}
                                            className="group/node relative cursor-crosshair"
                                        >
                                            {/* Advanced Node Base */}
                                            <div className="relative w-16 h-16 bg-white/[0.05] border border-white/10 transition-all duration-700 group-hover/node:bg-cyan-400/10 group-hover/node:border-cyan-400/50 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                                                {/* Hover Scanline */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent -translate-y-full group-hover/node:animate-scanline pointer-events-none" />

                                                {/* Corner Accents */}
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20 group-hover/node:border-cyan-400" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20 group-hover/node:border-cyan-400" />

                                                <node.icon className="w-8 h-8 text-white/40 group-hover/node:text-cyan-400 transition-all duration-700 group-hover/node:scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover/node:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                                            </div>

                                            {/* Data Label HUD (Appears on Hover) */}
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-all duration-500 translate-y-2 group-hover/node:translate-y-0 pointer-events-none">
                                                <div className="text-[7px] font-mono text-cyan-400 uppercase tracking-[0.4em] bg-cyan-400/5 px-2 py-1 border border-cyan-400/20 backdrop-blur-md">
                                                    {node.id}_0{i + 1} // OK
                                                </div>
                                            </div>

                                            {/* Holographic Pulse */}
                                            <div className="absolute inset-0 border border-cyan-400/30 opacity-0 group-hover/node:animate-ping-once transition-all rounded-sm" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-2/3 space-y-12">
                        {testimonials.map((t, i) => (
                            <IntelModule key={i} test={t} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* TACTICAL FOOTER SCANLINE */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </section>
    )
}
