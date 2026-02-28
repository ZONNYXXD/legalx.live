"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ShieldAlert, ArrowRight, Linkedin, Github, Mail, Zap, Activity, Cpu, Shield, ExternalLink, Lock } from "lucide-react"

export const FinalCTA = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse Parallax Physics
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-500, 500], [20, -20]), { stiffness: 45, damping: 25 })
    const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-20, 20]), { stiffness: 45, damping: 25 })

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
        setIsHovered(false)
    }

    const [index, setIndex] = useState(0)
    const tags = ["SECURITY", "PROTECTION", "CYBER", "VIRUS", "DDOS", "PHISHING", "LEGAL X"]

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % tags.length)
        }, 2000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section
            className="py-80 relative overflow-hidden bg-[#010101]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* Massive Deep Space Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[1400px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,rgba(34,211,238,0.02)_50%,transparent_70%)] pointer-events-none" />

            {/* Cyber Grid Base */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* THE MONOLITH CLUSTER - MASSIVE 3D PRESENCE */}
                <div className="relative perspective-3000 mb-40 h-[600px] flex items-center justify-center cursor-default scale-110 lg:scale-135">
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                        className="relative w-[500px] h-[500px] flex items-center justify-center"
                        onMouseEnter={() => setIsHovered(true)}
                    >
                        {/* Recursive Atmospheric Spheres */}
                        {[...Array(2)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: isHovered ? [1.5 + i * 0.2, 1.8 + i * 0.2, 1.5 + i * 0.2] : 1.5 + i * 0.1,
                                    opacity: [0.05, 0.1, 0.05]
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute inset-0 bg-neon-purple/5 blur-[120px] rounded-full"
                            />
                        ))}

                        {/* CENTRAL MONOLITH SLABS */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    rotateY: [i * 120, i * 120 + 360],
                                    y: isHovered ? [0, -40, 0] : [0, -10, 0]
                                }}
                                transition={{
                                    rotateY: { duration: 30, repeat: Infinity, ease: "linear" },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }
                                }}
                                className="absolute w-32 h-[450px] border border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col items-center justify-between py-12 group/slab"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    rotateX: '5deg',
                                    transformOrigin: 'center center',
                                    boxShadow: '0 0 100px rgba(0,0,0,0.9)',
                                    backfaceVisibility: 'visible'
                                }}
                            >
                                <motion.div
                                    animate={{ top: ['0%', '100%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 w-full h-[1px] bg-cyan-400 opacity-0 group-hover/slab:opacity-40"
                                />
                                <div className="text-[10px] font-mono text-white/20 group-hover/slab:text-cyan-400/60 uppercase tracking-[0.5em] transition-colors [writing-mode:vertical-rl]">
                                    SECURE_PROTOCOL_v8.4
                                </div>
                                <Shield className="w-8 h-8 text-white/10 group-hover/slab:text-neon-purple transition-all duration-700" />
                                <div className="text-[10px] font-mono text-white/20 group-hover/slab:text-cyan-400/60 uppercase tracking-[0.5em] transition-colors [writing-mode:vertical-rl]">
                                    KERNEL_READY_{700 + i}
                                </div>
                            </motion.div>
                        ))}

                        {/* ORBITING DATA GLASS SHARDS */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    rotateZ: [0, 360],
                                    rotateY: [0, 180, 360],
                                    scale: isHovered ? 1.2 : 1
                                }}
                                transition={{
                                    rotateZ: { duration: 12 + i, repeat: Infinity, ease: "linear" },
                                    rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 0.8 }
                                }}
                                className="absolute w-6 h-16 bg-white/[0.03] border border-white/10 backdrop-blur-sm"
                                style={{
                                    transformOrigin: `${300 + (i % 2 === 0 ? 80 : -80)}px center`,
                                    rotate: `${i * 30}deg`,
                                    translateZ: i * 30,
                                }}
                            />
                        ))}

                        {/* HOLOGRAPHIC OVERLAY HUD */}
                        <motion.div
                            style={{ translateZ: 400 }}
                            className="absolute flex flex-col items-center gap-6 pointer-events-none"
                        >
                            <div className="glass px-10 py-5 border border-cyan-400/20 backdrop-blur-3xl rounded-none relative overflow-hidden group/hud">
                                <div className="flex items-center gap-4 mb-2">
                                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                                    <span className="text-[10px] font-mono text-cyan-400 font-black tracking-[0.8em] uppercase">SYSTEM_STATE</span>
                                </div>
                                <div className="h-12 flex items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={tags[index]}
                                            initial={{ y: 20, opacity: 0, skewX: 10 }}
                                            animate={{ y: 0, opacity: 1, skewX: 0 }}
                                            exit={{ y: -20, opacity: 0, skewX: -10 }}
                                            transition={{ duration: 0.4, ease: "circOut" }}
                                            className={`font-header font-black text-4xl italic tracking-tighter uppercase ${tags[index] === "LEGAL X" ? "text-neon-purple drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" : "text-white"
                                                }`}
                                        >
                                            {tags[index]}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="text-center w-full relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 px-8 py-2.5 bg-neon-purple/5 border border-neon-purple/20 text-neon-purple text-[11px] font-black uppercase tracking-[0.8em] mb-16 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                    >
                        <Zap className="w-5 h-5" /> Finalization_Protocol_Engaged
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-crenzo text-white mb-16 uppercase leading-none flex flex-col items-center gap-6 text-center">
                        <span className="opacity-70 font-ui not-italic tracking-[0.4em] text-xs md:text-sm mb-4">Finalizing Operations</span>
                        <span className="relative">
                            Ready to Engineer a
                            <div className="absolute -inset-2 bg-white/5 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-neon-purple drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] mt-2">
                            Secure Future?
                        </span>
                    </h2>

                    <p className="text-gray-400 max-w-4xl mx-auto font-ui font-bold uppercase text-[13px] tracking-[0.4em] leading-relaxed italic opacity-60 mb-28">
                        "Building Digital Fortresses That Transcend Traditional Defense."
                    </p>

                    {/* PHASE-SHIFT INTERACTIVE CORE BUTTON */}
                    <motion.button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/cta relative mx-auto px-20 py-10 perspective-1000 outline-none"
                    >
                        {/* Magnetic Glow Layer */}
                        <motion.div
                            style={{
                                x: useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), { stiffness: 200, damping: 30 }),
                                y: useSpring(useTransform(mouseY, [-500, 500], [-10, 10]), { stiffness: 200, damping: 30 })
                            }}
                            className="absolute inset-0 bg-cyan-400/20 blur-[60px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700"
                        />

                        {/* Button Outer Shell */}
                        <div className="absolute inset-0 border border-white/20 bg-black/60 backdrop-blur-3xl transition-all duration-700 group-hover/cta:border-cyan-400/50 group-hover/cta:bg-black/80 shadow-[0_40px_100px_rgba(0,0,0,0.8)]" />

                        {/* Interactive Data Stream */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{ x: ['100%', '-100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent skew-x-12 opacity-0 group-hover/cta:opacity-100"
                            />
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={isHovered ? {
                                        y: [40, -40],
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1, 0.5]
                                    } : {}}
                                    transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }}
                                    className="absolute w-[1px] h-8 bg-cyan-400/40"
                                    style={{ left: `${20 * i + 10}%` }}
                                />
                            ))}
                        </div>

                        {/* Content Wrap */}
                        <div className="relative z-10 flex items-center gap-10">
                            <div className="flex flex-col items-start text-left">
                                <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-[0.6em] mb-1">Authorization_Required</span>
                                <span className="text-white font-header font-black text-xl italic uppercase tracking-[0.3em] group-hover/cta:text-cyan-400 transition-colors duration-500">
                                    Initialize Core Upgrade
                                </span>
                            </div>

                            <div className="relative w-14 h-14 flex items-center justify-center border border-white/10 group-hover/cta:border-cyan-400 transition-colors duration-700">
                                <motion.div
                                    animate={isHovered ? { rotate: [0, 90, 180, 270, 360] } : {}}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-[0.5px] border-cyan-400/30 scale-125 opacity-0 group-hover/cta:opacity-100"
                                />
                                <ArrowRight className="w-8 h-8 text-white group-hover/cta:text-cyan-400 transition-all duration-700 group-hover/cta:translate-x-1" />
                            </div>
                        </div>

                        {/* Bottom Accent Line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-cyan-400 transition-all duration-700 group-hover/cta:w-full" />
                    </motion.button>
                </div>
            </div>
        </section>
    )
}

export const Footer = () => {
    const [hasMounted, setHasMounted] = useState(false)
    const [currentTime, setCurrentTime] = useState("")
    const [sessionId, setSessionId] = useState("")

    useEffect(() => {
        setHasMounted(true)
        setSessionId(Math.random().toString(16).substring(2, 10).toUpperCase())
        const updateTime = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString([], { hour12: false }))
        }
        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <footer className="relative pt-32 bg-black/80 backdrop-blur-[2px] overflow-hidden group/footer">
            {/* 3D Tactical Grid Floor */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[400px] perspective-1000 -z-10 opacity-30 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(168,85,247,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        transform: 'rotateX(60deg) translateY(0%)',
                        transformOrigin: 'bottom center'
                    }}
                >
                    {/* Scanning Beam Animation */}
                    <motion.div
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-2 bg-gradient-to-b from-transparent via-neon-purple/40 to-transparent blur-sm"
                    />
                </div>
            </div>

            <div id="contact" className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-20 border-b border-white/5 text-center md:text-left">

                    {/* Brand Meta */}
                    <div className="lg:col-span-2 flex flex-col items-center md:items-start">
                        <motion.div
                            whileHover={{ x: 10 }}
                            className="flex flex-col items-center md:items-start gap-6 cursor-default"
                        >
                            <div className="relative">
                                <h3 className="font-header font-black text-4xl text-white uppercase tracking-tighter italic">
                                    LEGAL <span className="text-neon-purple not-italic">X</span> SECURITY
                                </h3>
                                <div className="absolute -inset-1 bg-neon-purple/20 blur-xl opacity-0 group-hover/footer:opacity-50 transition-opacity" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-px bg-neon-purple/30 hidden md:block" />
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] font-ui">
                                    Cybersecurity Architect & IT Systems Specialist
                                </span>
                            </div>
                            <div className="flex gap-4 mt-4">
                                {[
                                    { name: "LinkedIn", icon: Linkedin, link: "https://www.linkedin.com/in/sony-silvera-zyncripta" },
                                    { name: "GitHub", icon: Github, link: "https://github.com/ZONNYXXD" },
                                    { name: "Email", icon: Mail, link: "mailto:zonnyxxd@gmail.com" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.link}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="w-12 h-12 rounded-md glass border border-white/5 flex items-center justify-center hover:border-neon-purple transition-all group/social"
                                    >
                                        <social.icon className="w-5 h-5 text-gray-500 group-hover:text-neon-purple transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Nodes */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-[10px] font-mono text-neon-purple font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
                            <Lock className="w-3 h-3" /> Access_Protocol
                        </div>
                        <ul className="space-y-6">
                            {[
                                { label: "Privacy Policy", icon: Shield },
                                { label: "Terms of Service", icon: Activity },
                                { label: "Security Contact", icon: ExternalLink }
                            ].map((item, i) => (
                                <motion.li key={i} whileHover={{ x: 8 }} className="group/nav">
                                    <a href="#" className="flex items-center gap-4 text-[11px] font-header font-black text-gray-500 uppercase tracking-widest group-hover/nav:text-white transition-colors">
                                        <item.icon className="w-4 h-4 text-white/10 group-hover/nav:text-neon-purple transition-colors" />
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Operational Logs HUD */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-[10px] font-mono text-neon-purple font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
                            <Cpu className="w-3 h-3 animate-pulse" /> Operational_Logs
                        </div>
                        <div className="w-full space-y-4">
                            {[
                                { label: "Sync_Core", val: "OPTIMAL", color: "emerald-500" },
                                { label: "Data_Throughput", val: "99.9%", color: "neon-purple" },
                                { label: "Security_State", val: "LOCKED", color: "gray-400" }
                            ].map((log, i) => (
                                <div key={i} className="group/log relative overflow-hidden">
                                    <div className="flex justify-between items-center p-3 rounded-md bg-white/[0.03] border border-white/5 group-hover/log:border-neon-purple/30 transition-all font-mono text-[9px]">
                                        <span className="text-gray-500 group-hover/log:text-gray-300 transition-colors">{log.label}</span>
                                        <span className={`text-${log.color} font-black tracking-widest`}>{log.val}</span>
                                    </div>
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neon-purple/40 scale-y-0 group-hover/log:scale-y-100 transition-transform origin-top" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technical Meta Feed */}
                <div className="py-12 flex flex-col lg:flex-row justify-between items-center gap-8 border-t border-white/5 font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em] text-center lg:text-left">
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse outline outline-emerald-500/20 outline-4" />
                            <span className="text-white/40">System_Uptime: <span className="text-emerald-500 font-black">99.98%</span></span>
                        </div>
                        <div className="text-white/20">|</div>
                        <div>Session: <span className="text-gray-400 font-bold">{hasMounted ? sessionId : "--------"}</span></div>
                        <div className="text-white/20">|</div>
                        <div>Ping: <span className="text-neon-purple font-bold">12ms</span></div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        {hasMounted && (
                            <div className="flex items-center gap-3 bg-neon-purple/10 px-4 py-2 rounded-md border border-neon-purple/20 text-neon-purple font-black">
                                <Activity className="w-4 h-4 animate-pulse" /> {currentTime} GMT
                            </div>
                        )}
                        <span className="italic font-bold text-gray-700">
                            &copy; {hasMounted ? new Date().getFullYear() : '2026'} LEGAL X SECURITY. All Rights Reserved.
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neon-purple/20 to-transparent opacity-40 pointer-events-none" />
        </footer>
    )
}
