"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion"
import { Briefcase, Award, TrendingUp, ShieldCheck, Zap, Terminal, Activity, ChevronRight, Binary, Network, Database } from "lucide-react"
import { LucideIcon } from "lucide-react"
import { TextDecrypt } from "./TextDecrypt"

interface Experience {
    role: string
    company: string
    period: string
    unit: string
    description: string
    leadership: boolean
    skills: string[]
}

const experiences = [
    {
        role: "Senior Cybersecurity Architect",
        company: "Global Tech Systems",
        period: "2022 - PRESENT",
        unit: "ARCH_EXEC_NODE_01",
        description: "Leading enterprise-scale infrastructure hardening and automated threat response engineering. Managing a team of 12 security specialists.",
        leadership: true,
        skills: ["Infrastructure Hardening", "Leadership", "SOC Architecture", "Zero Trust"]
    },
    {
        role: "IT Systems Specialist",
        company: "Nexus Automation",
        period: "2020 - 2022",
        unit: "SYS_AUTOM_NODE_02",
        description: "Engineered custom automation tools for large-scale data center orchestration. Reduced manual security audits by 70% through C# /.NET automation.",
        leadership: false,
        skills: ["Automation/Ops", ".NET Core", "System Hardening", "PowerShell"]
    },
    {
        role: "Security Infrastructure Engineer",
        company: "SecureLink Solutions",
        period: "2018 - 2020",
        unit: "NET_DEFENSE_NODE_03",
        description: "Developed and implemented proactive threat detection systems. Orchestrated legacy system migrations to modern, secure architectures.",
        leadership: false,
        skills: ["Networking", "Cyber Security", "Linux Hardening", "Cloud Sec"]
    }
]

const ExperienceLog = ({ exp, index, isLast }: { exp: Experience, index: number, isLast: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse Parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 60, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 60, damping: 20 })

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

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, rotateY: index % 2 === 0 ? -15 : 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            className={`relative flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
        >
            {/* Mission Log Card */}
            <div className="w-full md:w-[48%] perspective-1000">
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className={`glass p-8 rounded-xl border relative group overflow-hidden transition-all duration-500 ${exp.leadership
                        ? "border-neon-purple/30 bg-gradient-to-br from-neon-purple/[0.04] to-cyan-400/[0.02] shadow-[0_0_30px_rgba(168,85,247,0.1)] glow-neon-blend"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                        }`}
                >
                    {/* Scanning Line */}
                    {isHovered && (
                        <motion.div
                            initial={{ top: "-100%" }}
                            animate={{ top: "200%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-neon-purple/30 blur-sm z-0 pointer-events-none"
                        />
                    )}

                    <div className="relative z-10">
                        {/* Card Header HUD */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-lg border transition-all duration-500 ${exp.leadership ? "bg-neon-purple/10 border-neon-purple/20 text-neon-purple glow-neon-blend" : "bg-white/5 border-white/5 text-white/40"
                                    }`}>
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[8px] font-mono text-neon-purple/50 font-black uppercase tracking-[0.4em] mb-1">
                                        {exp.unit}
                                    </div>
                                    <h3 className="text-xl font-header font-black text-white uppercase tracking-tighter italic leading-none">
                                        {exp.role}
                                    </h3>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <span className="px-3 py-1 rounded border border-white/5 text-[9px] text-gray-400 font-mono tracking-widest bg-black/40">
                                    {exp.period}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-neon-purple font-ui font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                [{exp.company}]
                            </p>
                            <p className="text-gray-400 font-ui text-[12px] leading-relaxed italic uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                "{exp.description}"
                            </p>
                        </div>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                            {exp.skills.map((skill: string) => (
                                <span key={skill} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] text-gray-500 font-black uppercase tracking-[0.2em] group-hover:border-neon-purple/20 group-hover:text-gray-300 transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/10" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/10" />
                </motion.div>
            </div>

            {/* Central Node Visual */}
            <div className="hidden md:flex absolute left-1/2 -bottom-2 -translate-x-1/2 flex-col items-center">
                <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all bg-black relative z-20 ${exp.leadership ? "border-neon-purple/50 text-neon-purple glow-neon-blend" : "border-white/10 text-white/20"
                        }`}
                >
                    {exp.leadership ? <Briefcase className="w-4 h-4" /> : <Binary className="w-4 h-4" />}
                </motion.div>
                {!isLast && (
                    <div className="w-[1px] h-32 bg-gradient-to-b from-white/10 to-neon-purple/40 opacity-20" />
                )}
            </div>

            {/* Symmetry Spacer */}
            <div className="w-full md:w-[48%] hidden md:block" />
        </motion.div>
    )
}

export const ExperienceTimeline = () => {
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

    const stats = [
        { title: "Team Leadership", value: "12+ Engineers", icon: Network, desc: "Managed technical squads in secure agile SOC cycles." },
        { title: "Hardened Systems", value: "50+ Enterprise", icon: Database, desc: "Delivered complex infrastructure migrations with zero bypasses." },
        { title: "Process Scaling", value: "3.5x Efficiency", icon: TrendingUp, desc: "Leveraged C# automation to scale deployment resilience." }
    ]

    return (
        <section id="journey" className="py-32 relative bg-black/80 backdrop-blur-[2px] overflow-hidden" ref={containerRef}>
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-black uppercase tracking-widest mb-6"
                    >
                        <Activity className="w-3 h-3" /> Operational Milestone Log
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-crenzo text-white mb-6 leading-none">
                        <TextDecrypt text="Command" />{' '}
                        <span className="text-neon-purple text-glow-purple"><TextDecrypt text="History." /></span>
                    </h2>
                    <p className="text-gray-400 font-ui font-medium max-w-2xl mx-auto uppercase text-[10px] tracking-[0.4em] leading-relaxed italic">
                        "Decrypted professional roadmap showcasing systemic evolution and tactical leadership."
                    </p>
                </div>

                <div className="relative pb-32">
                    {/* Pulsing Data Bus (Timeline Line) */}
                    <div className="absolute left-0 md:left-1/2 top-4 bottom-32 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block overflow-hidden rounded-full">
                        <motion.div
                            style={{ scaleY, originY: 0 }}
                            className="absolute inset-0 bg-gradient-to-b from-neon-purple via-white to-transparent opacity-60 glow-neon-blend"
                        />
                    </div>

                    <div className="space-y-32">
                        {experiences.map((exp, i) => (
                            <ExperienceLog
                                key={i}
                                exp={exp}
                                index={i}
                                isLast={i === experiences.length - 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Tactical Stats HUD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-8 border border-white/5 bg-black/40 backdrop-blur-sm group hover:border-neon-purple/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/0 via-neon-purple/0 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Decorative Top Left Corner */}
                            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-neon-purple/60 transition-colors" />
                                <div className="absolute top-0 left-0 w-[1px] h-full bg-white/20 group-hover:bg-neon-purple/60 transition-colors" />
                            </div>

                            {/* Decorative Bottom Right Corner */}
                            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/20 group-hover:bg-neon-purple/60 transition-colors" />
                                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white/20 group-hover:bg-neon-purple/60 transition-colors" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="p-3 bg-white/[0.03] border border-white/10 group-hover:border-neon-purple/30 group-hover:bg-neon-purple/10 text-gray-400 group-hover:text-neon-purple group-hover:glow-neon-blend transition-all rounded-[2px]">
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <div className="text-[8px] font-mono text-gray-600 uppercase tracking-[0.3em]">STAT_REF_0{i + 1}</div>
                                        <div className="flex gap-1 mt-1 opacity-40 group-hover:opacity-80 transition-opacity">
                                            {[...Array(5)].map((_, j) => (
                                                <div key={j} className={`w-1 h-1 rounded-sm ${j <= i ? 'bg-neon-purple' : 'bg-white/20'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-mono text-neon-purple uppercase tracking-[0.4em] mb-2 font-bold group-hover:text-white transition-colors">
                                        {stat.title}
                                    </h4>
                                    <div className="text-2xl lg:text-3xl font-venus text-white mb-4 uppercase leading-tight tracking-tight pr-6 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
                                        {stat.value}
                                    </div>

                                    <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent my-4 group-hover:from-neon-purple/40 transition-colors" />

                                    <p className="text-gray-500 text-[10px] font-ui font-medium uppercase tracking-widest leading-relaxed italic pr-4">
                                        {stat.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
