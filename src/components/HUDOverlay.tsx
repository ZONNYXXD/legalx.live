"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Activity, Globe, AlertTriangle, ArrowRight, Terminal } from 'lucide-react'
import { Magnetic } from './Magnetic'

const THREAT_MESSAGES = [
    { type: 'CRITICAL', msg: 'DDoS detected from Moscow → New York' },
    { type: 'HIGH', msg: 'Brute-force attempt from Beijing → London' },
    { type: 'MEDIUM', msg: 'Port scan from São Paulo → Dubai' },
    { type: 'HIGH', msg: 'Mitigating Phishing node in Frankfurt' },
    { type: 'CRITICAL', msg: 'Zero-day exploit blocked from Singapore' },
    { type: 'MEDIUM', msg: 'SSH Injection attempt from Tokyo' }
]

export const HUDOverlay = ({ onEnter, isConnecting = false }: { onEnter: () => void, isConnecting?: boolean }) => {
    const [counter, setCounter] = useState(128420)
    const [logs, setLogs] = useState(THREAT_MESSAGES.slice(0, 3))
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
        let isMounted = true

        const counterInt = setInterval(() => {
            if (!isMounted) return
            setCounter(c => c + Math.floor(Math.random() * 5) + 1)
        }, isConnecting ? 200 : 1000)

        const logInt = setInterval(() => {
            if (!isMounted) return
            const nextMsg = THREAT_MESSAGES[Math.floor(Math.random() * THREAT_MESSAGES.length)]
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            setLogs(l => [{ ...nextMsg, msg: `[${timestamp}] ${nextMsg.msg}` }, ...l.slice(0, 6)])
        }, isConnecting ? 500 : 3000)

        return () => {
            isMounted = false
            clearInterval(counterInt)
            clearInterval(logInt)
        }
    }, [isConnecting])

    const cornerBracket = (pos: 'tl' | 'tr' | 'bl' | 'br') => {
        const base = "absolute w-3 h-3 border-white/40"
        if (pos === 'tl') return `${base} top-0 left-0 border-t border-l`
        if (pos === 'tr') return `${base} top-0 right-0 border-t border-r`
        if (pos === 'bl') return `${base} bottom-0 left-0 border-b border-l`
        if (pos === 'br') return `${base} bottom-0 right-0 border-b border-r`
    }

    return (
        <div className={`absolute inset-0 z-10 pointer-events-none h-screen flex flex-col justify-between p-6 md:p-12 transition-all duration-1000 ${isConnecting ? 'scale-105 opacity-0' : 'opacity-100'}`}>

            {/* Top Panels */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative p-4 md:p-6 w-full md:w-72 backdrop-blur-md bg-white/[0.02] overflow-hidden"
                >
                    <div className={cornerBracket('tl')} />
                    <div className={cornerBracket('tr')} />
                    <div className={cornerBracket('bl')} />
                    <div className={cornerBracket('br')} />

                    <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-4 h-4 text-neon-purple animate-pulse" />
                        <span className="text-[9px] font-black text-neon-purple uppercase tracking-[0.3em]">Active Intelligence</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="text-[8px] text-gray-600 mb-1 uppercase tracking-widest">Attacks_Hardened</div>
                            <div className="text-3xl font-header font-black text-white italic tracking-tighter">
                                {hasMounted ? counter.toLocaleString() : "128,420"}
                            </div>
                        </div>
                        <div className="h-[1px] bg-white/5 relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-neon-purple glow-sm"
                                animate={{ width: ['20%', '80%', '40%'] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative p-4 md:p-6 w-full md:w-72 backdrop-blur-md bg-white/[0.02]"
                >
                    <div className={cornerBracket('tl')} />
                    <div className={cornerBracket('tr')} />
                    <div className={cornerBracket('bl')} />
                    <div className={cornerBracket('br')} />

                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Node_Metrics.obs</div>
                    <div className="space-y-3">
                        {[
                            { label: "Status", val: "Monitoring", color: "text-emerald-500" },
                            { label: "Active Nodes", val: "4,281", color: "text-white" },
                            { label: "Top Threat", val: "RSA_COLLISION", color: "text-red-500" }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/[0.03] pb-1">
                                <span className="text-gray-600">{item.label}</span>
                                <span className={`${item.color} font-black uppercase tracking-tighter text-[9px]`}>{item.val}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Center Content: Premium Heading & CTA */}
            <div className="flex flex-col items-center gap-12 text-center max-w-5xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-10 md:mt-20 px-4"
                >
                    <h1 className="text-3xl sm:text-5xl md:text-8xl font-header font-black text-white uppercase tracking-[0.15em] md:tracking-widest relative z-10 leading-none italic">
                        LEGAL&nbsp;&nbsp;<span className="text-neon-purple italic" style={{ WebkitTextStroke: '1px md:2px rgba(168, 85, 247, 0.4)' }}>X</span>&nbsp;&nbsp;SECURITY
                    </h1>

                    <div className="mt-4 text-[8px] md:text-xs font-ui font-medium text-gray-500 tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-40">
                        Classified Orbital Surveillance Interface
                    </div>
                </motion.div>

                <Magnetic>
                    <motion.button
                        onClick={onEnter}
                        whileHover={{ scale: 1.02 }}
                        className="pointer-events-auto relative px-16 py-8 group"
                    >
                        {/* Tactical Border */}
                        <div className="absolute inset-0 border border-neon-purple/30 group-hover:border-neon-purple transition-all bg-black/40 backdrop-blur-sm" />
                        <div className={cornerBracket('tl')} />
                        <div className={cornerBracket('tr')} />
                        <div className={cornerBracket('bl')} />
                        <div className={cornerBracket('br')} />

                        <div className="relative z-10 flex items-center gap-6">
                            <span className="text-white font-header font-black text-xs uppercase tracking-[0.6em] group-hover:text-neon-purple transition-colors">
                                {isConnecting ? "> INITIALIZING LINK..." : "[ ESTABLISH SECURE LINK ]"}
                            </span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="w-5 h-5 text-neon-purple" />
                            </motion.div>
                        </div>

                        {/* Subtle micro pulse */}
                        <motion.div
                            animate={{ opacity: [0, 0.2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-neon-purple blur-xl"
                        />
                    </motion.button>
                </Magnetic>
            </div>

            {/* Bottom Panels: Realistic Logs */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-6 md:p-8 w-full md:w-[450px] bg-black/60 backdrop-blur-xl border border-white/5 h-48 md:h-56 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                    <div className="text-[10px] font-mono font-black text-cyan-400 mb-6 tracking-[0.3em] uppercase flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-3 h-3" />
                            Live_Data_Stream.log
                        </div>
                        <span className="text-[8px] text-gray-600">v8.42_SECURE</span>
                    </div>

                    <div className="space-y-2 font-mono text-[9px] h-full overflow-hidden relative">
                        <AnimatePresence mode="popLayout">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={`${log.msg}-${i}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1 - i * 0.15, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex gap-4 group/log"
                                >
                                    <span className={
                                        log.type === 'CRITICAL' ? 'text-red-500' :
                                            log.type === 'HIGH' ? 'text-orange-500' : 'text-cyan-500'
                                    }>&gt;&gt;</span>
                                    <span className="text-gray-400 truncate group-hover/log:text-white transition-colors">{log.msg}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {/* Blinking Cursor */}
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-1.5 h-3 bg-cyan-400 inline-block align-middle ml-1"
                        />
                    </div>
                </motion.div>

                <div className="space-y-6 text-right">
                    <div className="space-y-1">
                        <div className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">Legal X Defense Systems</div>
                        <div className="text-[7px] font-mono text-gray-800 tracking-widest uppercase">Global Surveillance Layer Active</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
