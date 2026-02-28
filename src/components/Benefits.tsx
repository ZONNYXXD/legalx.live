"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Shield, Cpu, Activity, Zap, Lock, ArrowUpRight, ArrowRight, Eye, Layout, BrainCircuit, LineChart, Target, ShieldCheck, Box, Workflow, Network } from "lucide-react"
import { TextDecrypt } from "./TextDecrypt"

const benefits = [
    {
        title: "Enterprise-Grade Security",
        unit: "UNIT_SEC_01",
        desc: "Robust architectural frameworks designed to withstand high-level external attacks and internal vulnerabilities.",
        icon: Shield,
        metrics: [
            { label: "RESILIENCE", val: 98 },
            { label: "DEPTH", val: 92 },
            { label: "IMPACT", val: 95 }
        ]
    },
    {
        title: "Custom System Tools",
        unit: "UNIT_SYS_02",
        desc: "Bespoke desktop applications tailored for internal operations, performance management, and system control.",
        icon: Layout,
        metrics: [
            { label: "AUTOMATION", val: 90 },
            { label: "PRECISION", val: 96 },
            { label: "UTILITY", val: 88 }
        ]
    },
    {
        title: "AI Automation Core",
        unit: "UNIT_AIA_03",
        desc: "Integrating modern AI tools to automate repetitive tasks, analyze data patterns, and optimize complex workflows.",
        icon: BrainCircuit,
        metrics: [
            { label: "INTEL_SYNC", val: 94 },
            { label: "REACTION", val: 85 },
            { label: "OPTIMAL", val: 99 }
        ]
    },
    {
        title: "Infrastructure Tuning",
        unit: "UNIT_INF_04",
        desc: "Tuning system performance to its maximum potential while reducing overhead and operational waste.",
        icon: LineChart,
        metrics: [
            { label: "EFFICIENCY", val: 88 },
            { label: "CAPACITY", val: 93 },
            { label: "LOAD_BAL", val: 91 }
        ]
    },
    {
        title: "Cyber Strategy Intel",
        unit: "UNIT_STR_05",
        desc: "Combining blue-team resilience with red-team insight to proactively address future digital threats.",
        icon: Target,
        metrics: [
            { label: "STRATEGY", val: 97 },
            { label: "DEFENSE", val: 95 },
            { label: "THREAT_ID", val: 92 }
        ]
    },
    {
        title: "Zero Trust Governance",
        unit: "UNIT_GOV_06",
        desc: "Implementing strict identity verification and secure access protocols across the entire technical stack.",
        icon: Lock,
        metrics: [
            { label: "IDENTITY", val: 100 },
            { label: "VERIFY", val: 98 },
            { label: "TRUST", val: 5 }
        ]
    }
]

const BenefitCard = ({ benefit, index }: { benefit: any, index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-full flex flex-col bg-[#030303] border border-white/10 hover:border-neon-purple/50 transition-colors duration-500 overflow-hidden"
        >
            {/* Background Watermark Icon */}
            <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                <benefit.icon className="w-64 h-64 text-white" />
            </div>

            {/* Industrial Header Strip */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/[0.02] relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 border border-white/20 bg-black group-hover:border-neon-purple group-hover:glow-neon-blend transition-all">
                        <benefit.icon className="w-4 h-4 text-neon-purple" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50 group-hover:text-neon-purple uppercase tracking-[0.3em] font-black transition-colors">
                        {benefit.unit}
                    </span>
                </div>

                {/* Visual Status Indicator */}
                <div className="flex gap-1.5 opacity-50">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-sm" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-8 flex-grow flex flex-col justify-between relative z-10">
                <div>
                    <h3 className="text-2xl font-header font-black text-white mb-4 uppercase tracking-tighter italic origin-left">
                        {isHovered ? <TextDecrypt text={benefit.title} /> : benefit.title}
                    </h3>
                    <p className="text-gray-400 font-ui font-medium leading-relaxed text-[11px] uppercase tracking-wider line-clamp-3">
                        {benefit.desc}
                    </p>
                </div>

                {/* Vertical Equalizer Metrics */}
                <div className="mt-12 flex justify-between items-end h-24 gap-4 px-2">
                    {benefit.metrics.map((metric: any, i: number) => (
                        <div key={i} className="flex flex-col items-center justify-end h-full gap-2 relative group/metric w-full">
                            {/* Percentage Tag (Floats above bar) */}
                            <span className="text-[9px] font-mono font-bold text-white/80 opacity-0 group-hover/metric:opacity-100 transition-opacity absolute -top-6">
                                {metric.val}%
                            </span>

                            {/* Vertical Bar Container */}
                            <div className="w-full max-w-[12px] h-full bg-white/5 relative border-b border-white/20 overflow-hidden">
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${metric.val}%` }}
                                    transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                    className="absolute bottom-0 left-0 right-0 bg-white/20 group-hover/metric:bg-neon-purple group-hover/metric:glow-neon-blend transition-colors duration-300"
                                />
                            </div>

                            {/* Metric Label */}
                            <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 group-hover/metric:text-neon-purple transition-colors text-center mt-1">
                                {metric.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover Accent Line */}
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-neon-purple group-hover:w-full transition-all duration-700 ease-out glow-neon-blend z-20" />

            {/* Corner Micro-dots */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/20 rounded-full" />
        </motion.div>
    )
}

export const Benefits = () => {
    return (
        <section id="systems" className="pt-32 pb-12 relative overflow-hidden bg-black/80 backdrop-blur-[2px]">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none -rotate-12" />
            <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-black uppercase tracking-widest mb-6"
                    >
                        <Network className="w-3 h-3" /> System Strategic Overview
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-crenzo text-white mb-6 leading-none">
                        <TextDecrypt text="Strategic Tactical" />{' '}
                        <span className="text-neon-purple text-glow-purple"><TextDecrypt text="Capabilities." /></span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-ui font-bold uppercase text-[10px] tracking-[0.4em] leading-relaxed italic">
                        "I bridge the gap between infrastructure engineering and mission-critical intelligent software."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <BenefitCard key={i} benefit={benefit} index={i} />
                    ))}
                </div>

                {/* Section HUD Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-12 font-mono text-[9px] text-gray-600 uppercase tracking-[0.4em]"
                >
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-neon-purple" />
                        <span>Resilience_Authorized</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Workflow className="w-4 h-4 text-neon-purple" />
                        <span>Orchestration_Verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Box className="w-4 h-4 text-neon-purple" />
                        <span>Component_Integrity: 100%</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
