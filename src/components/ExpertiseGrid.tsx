"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { Code2, Cpu, Globe2, Brain, Database, Terminal, ShieldAlert, Zap, Monitor, Activity, Lock, Search, Network, Radio, Wifi, Signal, Layout, Wrench, Binary, ChevronRight, Hash, Layers } from "lucide-react"
import { LucideIcon } from "lucide-react"
import { TextDecrypt } from "./TextDecrypt"
import { VideoShowcase } from "./VideoShowcase"

const PeekText = ({ text, className, delay = 0, once = true }: { text: string, className?: string, delay?: number, once?: boolean }) => {
    return (
        <span className={`${className} inline-block overflow-hidden py-2 -my-2`}>
            <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once, margin: "-10px" }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
            >
                {text}
            </motion.span>
        </span>
    )
}

interface Skill {
    name: string
    icon: LucideIcon
    level: string
    tags: string[]
    id: string
}

interface TechnicalLanguage {
    name: string
    level: number
    code: string
}

interface SpokenLanguage {
    name: string
    level: number
    origin: string
}

const skills = [
    { name: "Cybersecurity Architecture", icon: ShieldAlert, level: "Elite", tags: ["Zero Trust", "EDR", "SOC"], id: "SEC_ARCH_01" },
    { name: "IT System Management", icon: Cpu, level: "Advanced", tags: ["Automation", "Hardening", "Scale"], id: "SYS_MGMT_02" },
    { name: "UI/UX & Front-End Arch", icon: Layout, level: "High-Fidelity", tags: ["React", "Next.js", "Figma", "Tailwind"], id: "UIUX_FE_03" },
    { name: "Python Tool Engineering", icon: Wrench, level: "Advanced", tags: ["Security Tools", "Automation", "CLI"], id: "PY_TOOL_04" },
    { name: "OS Hardening & Engineering", icon: Terminal, level: "Specialist", tags: ["Kali Linux", "Arch", "Aimer OS", "Custom Os"], id: "OS_ENG_05" },
    { name: "C++/Java UI/UX Engineering", icon: Binary, level: "Specialist", tags: ["Desktop UI", "Cross-Platform", "Systems"], id: "CPP_JAVA_06" },
    { name: "WinForms & Desktop", icon: Monitor, level: "Specialist", tags: ["C#", ".NET", "Desktop UI"], id: "WF_DESK_07" },
    { name: "AI Tool Integration", icon: Brain, level: "Cutting Edge", tags: ["LLMs", "RAG", "Workflows"], id: "AI_INT_08" },
]

const knowledge = [
    { name: "Enterprise Network Hardening", code: "NET_HARD_X1" },
    { name: "Automated Threat Mitigation", code: "AUTO_THREAT_Z4" },
    { name: "System Orchestration", code: "SYS_ORCH_B0" },
    { name: "Security Compliance (ISO/NIST)", code: "COMP_GOV_S2" },
    { name: "Identity & Access Management", code: "IAM_AUTH_V8" },
    { name: "Aimer OS Kernel Hardened", code: "KERN_MOD_Z2" },
    { name: "Custom OS Architecture", code: "ARCH_SPEC_X9" }
]

const languages = {
    technical: [
        { name: "C# / .NET", level: 95, code: "SYNTX_CS_01" },
        { name: "Python", level: 90, code: "SYNTX_PY_02" },
        { name: "BASH", level: 85, code: "SYNTX_SH_03" },
        { name: "PowerShell", level: 92, code: "SYNTX_PS_04" },
    ],
    spoken: [
        { name: "English", level: 100, origin: "NATIVE_OS" },
        { name: "Hindi", level: 90, origin: "ASIAN_SEC_ZONE" },
        { name: "Malayalam", level: 100, origin: "CORE_ORIGIN" },
        { name: "Tamil", level: 85, origin: "SOUTHERN_NODE" },
        { name: "Technical Speak", level: 100, origin: "CORE_BINARY" },
    ]
}

const SkillUnit = ({ skill, index }: { skill: Skill, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-250, 250], [12, -12]), { stiffness: 60, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-12, 12]), { stiffness: 60, damping: 20 })
    const translateZ = useSpring(isHovered ? 40 : 0, { stiffness: 60, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.8, rotateX: 45, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false) }}
            onMouseEnter={() => setIsHovered(true)}
            style={{ rotateX, rotateY, translateZ, transformStyle: "preserve-3d" }}
            className="group relative"
        >
            <div
                className={`glass p-6 rounded-2xl border transition-all duration-500 h-full flex flex-col relative overflow-hidden ${isHovered
                        ? "border-neon-purple/40 bg-gradient-to-br from-neon-purple/[0.04] to-cyan-400/[0.02] shadow-[0_0_40px_rgba(168,85,247,0.1)]"
                        : "border-white/5 bg-white/[0.01]"
                    }`}
            >
                {/* HUD Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-all duration-700 pointer-events-none group-hover:scale-110">
                    <skill.icon className="w-16 h-16 text-neon-purple" />
                </div>

                {/* Module-Head Row */}
                <div className="flex items-center justify-between mb-6 relative z-10 px-3 py-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-neon-purple/20 transition-all">
                    <div className={`p-1.5 rounded-md transition-colors ${isHovered ? "text-neon-purple" : "text-neon-purple/40"}`}>
                        <skill.icon className="w-4 h-4" />
                    </div>
                    <div className="text-[6px] font-mono text-neon-purple/30 font-black uppercase tracking-[0.4em]">
                        {skill.id}
                    </div>
                </div>

                {/* Compact Title: Calibrated for Width */}
                <div className="mb-6 relative z-10 px-1">
                    <h3 className="text-lg md:text-xl font-venus italic text-white uppercase tracking-tighter group-hover:text-neon-purple transition-colors leading-tight pr-14">
                        <PeekText text={skill.name} />
                    </h3>
                </div>

                {/* Progress Indicators (Tag replacements for more technical look) */}
                <div className="mb-8 flex-grow relative z-10 px-1">
                    <div className="flex flex-wrap gap-1.5">
                        {skill.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 text-gray-500 text-[8px] font-bold uppercase tracking-widest group-hover:text-gray-300 transition-all">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Module Metadata */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-60">
                    <div className="flex flex-col">
                        <span className="text-[6px] font-mono text-gray-600 uppercase tracking-widest leading-none mb-1">UNIT_LEVEL</span>
                        <span className="text-[8px] font-black text-neon-purple uppercase tracking-widest">{skill.level}</span>
                    </div>
                    <div className="text-[7px] font-mono text-emerald-500/60 font-black group-hover:text-emerald-500 transition-colors">
                        READY_FOR_DEPLOYMENT
                    </div>
                </div>

                {/* Subtle Interactive Aura */}
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 via-transparent to-cyan-400/5 pointer-events-none"
                    />
                )}
            </div>
        </motion.div>
    )
}

const LanguageBlock = ({ lang }: { lang: TechnicalLanguage }) => {
    const [count, setCount] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { stiffness: 60, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), { stiffness: 60, damping: 20 })
    const translateZ = useSpring(isHovered ? 40 : 0, { stiffness: 60, damping: 20 })

    useEffect(() => {
        let startTime: number
        let animationFrame: number

        const animate = (time: number) => {
            if (!startTime) startTime = time
            const progress = (time - startTime) / 1500
            if (progress < 1) {
                setCount(Math.floor(lang.level * progress))
                animationFrame = requestAnimationFrame(animate)
            } else {
                setCount(lang.level)
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animationFrame = requestAnimationFrame(animate)
                observer.disconnect()
            }
        })

        if (cardRef.current) observer.observe(cardRef.current)
        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame)
            observer.disconnect()
        }
    }, [lang.level])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false) }}
            onMouseEnter={() => setIsHovered(true)}
            style={{ rotateX, rotateY, translateZ, transformStyle: "preserve-3d" }}
            className="group relative"
        >
            <div className="glass p-6 rounded-xl border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-neon-purple/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-end mb-4 relative z-10">
                    <div>
                        <div className="text-[8px] font-mono text-neon-purple/50 font-black uppercase tracking-[0.3em] mb-1">
                            {lang.code}
                        </div>
                        <h4 className="font-header font-black text-white uppercase text-sm tracking-tight italic group-hover:text-neon-purple transition-colors">
                            {lang.name}
                        </h4>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-venus text-white leading-none flex items-baseline justify-end gap-2 translate-y-1 pr-2">
                            {count}<span className="text-neon-purple text-[10px] not-italic opacity-80">%</span>
                        </div>
                    </div>
                </div>

                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex items-center px-[1px] relative z-10 shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-[60%] bg-gradient-to-r from-neon-purple via-purple-400 to-neon-purple glow-purple rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-scanline opacity-20" />
                    </motion.div>
                </div>

                <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`w-1 h-1 rounded-full ${i < 3 ? "bg-neon-purple" : "bg-white/10"}`} />
                        ))}
                    </div>
                    <div className="text-[7px] font-mono text-gray-500 font-bold uppercase tracking-widest">
                        STABLE_PROTOCOL_LINKED
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const SpeakingUplink = ({ lang }: { lang: SpokenLanguage }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
            className="glass p-5 rounded-xl border-white/5 flex items-center justify-between group hover:border-neon-purple/30 transition-all hover:bg-white/[0.04] relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center group-hover:border-neon-purple/40 group-hover:glow-purple transition-all duration-500">
                    <Radio className="w-4 h-4 text-neon-purple/70 group-hover:text-neon-purple" />
                </div>
                <div>
                    <div className="text-[7px] font-mono text-neon-purple/40 font-black uppercase tracking-[0.3em] mb-1">
                        {lang.origin}
                    </div>
                    <span className="font-header font-black text-white uppercase text-xs tracking-[0.2em] group-hover:text-neon-purple transition-colors">
                        {lang.name}
                    </span>
                </div>
            </div>
            <div className="flex gap-1.5 items-center relative z-10">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            height: i < (lang.level / 8) ? [4, 12, 4] : 4,
                            opacity: i < (lang.level / 8) ? [0.2, 1, 0.2] : 0.1
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "easeInOut"
                        }}
                        className={`w-[2px] rounded-full ${i < (lang.level / 8) ? "bg-neon-purple glow-purple" : "bg-white/20"}`}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export const ExpertiseGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <section id="expertise-dashboard" className="py-32 relative overflow-hidden bg-[#050505]" ref={containerRef}>
            {/* Background Atmosphere & Blueprint */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-black uppercase tracking-widest mb-6"
                    >
                        <Network className="w-3 h-3" /> Technical Intelligence Suite
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-venus italic text-white mb-6 leading-none pr-12">
                                <PeekText text="Technical" />{' '}
                                <span className="text-neon-purple text-glow-purple"><PeekText text="Arsenal." /></span>
                            </h2>
                            <p className="text-gray-500 font-ui font-bold max-w-2xl uppercase text-[10px] tracking-[0.5em] leading-relaxed italic opacity-80">
                                "DECRYPTING CORE COMPETENCIES ACROSS SECURITY, SYSTEMS, AND HIGH-END DESIGN ARCHITECTURE."
                            </p>
                        </div>

                        {/* Section HUD Info */}
                        <div className="hidden lg:flex flex-col text-right font-mono text-[9px] text-gray-600 gap-1 uppercase tracking-widest leading-tight">
                            <div>SEC_LEVEL: TOP_SECRET</div>
                            <div className="text-neon-purple/60">NODE_VERSION: 1.0.4.v1</div>
                            <div className="flex items-center justify-end gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM_ONLINE
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Skills Grid - Expanded & 3D */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {skills.map((skill, i) => (
                            <SkillUnit key={skill.id} skill={skill} index={i} />
                        ))}
                    </div>

                    {/* REDESIGNED: Tactical Knowledge Lattice */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-1 glass p-8 rounded-xl border-white/10 bg-gradient-to-b from-white/[0.05] to-black flex flex-col relative overflow-hidden group/lattice"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-neon-purple/5 blur-[80px] opacity-40 pointer-events-none" />

                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-xl font-venus italic text-white uppercase tracking-tight flex items-center gap-3">
                                <Brain className="w-6 h-6 text-neon-purple" /> TACTICAL KNOWLEDGE <span className="text-neon-purple">BASE</span>
                            </h3>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="p-2 rounded-full border border-neon-purple/20 bg-black/40"
                            >
                                <Zap className="w-3 h-3 text-neon-purple opacity-50" />
                            </motion.div>
                        </div>

                        <div className="space-y-6 flex-grow relative z-10">
                            {knowledge.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="relative flex items-center gap-5 group/node cursor-default"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-[11px] font-venus text-white/20 group-hover/node:border-neon-purple group-hover/node:text-neon-purple transition-all duration-300">
                                            0{i + 1}
                                        </div>
                                        {/* Connecting Line Component */}
                                        <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-white/5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-ui text-[10px] font-black leading-tight uppercase tracking-widest group-hover/node:text-white transition-colors">
                                            {item.name}
                                        </span>
                                        <span className="text-[8px] font-mono text-neon-purple/40 uppercase tracking-[0.2em] group-hover/node:text-neon-purple transition-colors">
                                            {item.code}
                                        </span>
                                    </div>
                                    {/* Progress Ring Visual */}
                                    <div className="flex-grow md:flex justify-end hidden opacity-20 group-hover/node:opacity-60 transition-opacity">
                                        <Hash className="w-3 h-3 text-neon-purple" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tactical Status HUD Panel */}
                        <div className="mt-12 p-6 rounded-xl border border-white/5 bg-black/[0.6] backdrop-blur-md relative group-hover/lattice:border-neon-purple/30 transition-all shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent animate-pulse" />
                            <div className="text-[8px] font-mono text-neon-purple font-black uppercase tracking-[0.4em] mb-5 flex items-center gap-2">
                                <Activity className="w-3 h-3 animate-pulse" /> Operations_Matrix
                            </div>
                            <div className="space-y-4 font-mono text-[9px] uppercase tracking-widest font-black">
                                <div className="flex justify-between items-center text-gray-500 group/status">
                                    <span className="group-hover/status:text-gray-300 transition-colors">OS_SYNC:</span>
                                    <span className="text-emerald-500 glow-emerald">STABLE</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 group/status">
                                    <span className="group-hover/status:text-gray-300 transition-colors">THREAT_DEPTH:</span>
                                    <span className="text-neon-purple">ZERO_TRACE</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 group/status">
                                    <span className="group-hover/status:text-gray-300 transition-colors">ENCRYPTION:</span>
                                    <span className="text-white/40">AES-XTS-512</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Technical Protocols: Language & Comms */}
                <div className="mt-32 pt-32 border-t border-white/5 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-neon-purple/[0.01] blur-[120px] rounded-full pointer-events-none" />

                    {/* Language Proficiencies */}
                    <div className="relative mb-24">
                        <div className="flex items-center justify-between mb-16">
                            <div>
                                <h3 className="text-2xl font-header font-black text-white uppercase tracking-tight flex items-center gap-4 italic mb-2">
                                    <Layers className="w-7 h-7 text-neon-purple" /> Language_Stack
                                </h3>
                                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest pl-11">SYNTACTIC_COMMAND_PROTOCOLS</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {languages.technical.map((lang) => (
                                <LanguageBlock key={lang.name} lang={lang} />
                            ))}
                        </div>

                        {/* Interactive Video Showcase & Spoken Languages Grid */}
                        <div className="mt-16 pt-16 border-t border-white/5 relative hidden xl:block w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
                                {/* Left: Video Showcase (3/4 width) */}
                                <div className="lg:col-span-3">
                                    <h3 className="text-xl font-header font-black text-white uppercase tracking-tight flex items-center gap-4 italic mb-8">
                                        <Monitor className="w-5 h-5 text-neon-purple" /> Intelligence_Replay
                                    </h3>
                                    <div className="relative w-full">
                                        <VideoShowcase src="/videos/playback/Intelligence_Replay.mp4" />
                                    </div>
                                </div>

                                {/* Right: Spoken Languages (1/4 width) */}
                                <div className="lg:col-span-1">
                                    <h3 className="text-xl font-header font-black text-white uppercase tracking-tight flex items-center gap-4 italic mb-8">
                                        <Radio className="w-5 h-5 text-neon-purple" /> Spoken_Uplinks
                                    </h3>
                                    <div className="space-y-4">
                                        {languages.spoken.map((lang) => (
                                            <SpeakingUplink key={lang.name} lang={lang} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vertical Mission Progress Conduit */}
            <div className="absolute right-8 top-1/4 bottom-1/4 w-[1px] bg-white/5 hidden xl:block">
                <motion.div
                    style={{ scaleY, originY: 0 }}
                    className="absolute inset-0 bg-gradient-to-b from-neon-purple via-white to-transparent opacity-40 glow-purple"
                />
                <div className="absolute top-0 right-4 text-[7px] font-mono text-neon-purple uppercase vertical-text tracking-[0.5em] opacity-30">MISSION_INTEL_PROGRESS</div>
            </div>
        </section>
    )
}
