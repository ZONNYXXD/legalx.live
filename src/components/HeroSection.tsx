"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CyberGlobe } from "@/components/CyberGlobe"
import { HUDOverlay } from "@/components/HUDOverlay"
import { VideoPreviewPanel } from "@/components/VideoPreviewPanel"
import { CyberCore } from "@/components/CyberCore"
import { Shield, Lock, Database, Terminal, ChevronRight, Cpu, Activity, Zap, Play, CheckCircle2, AlertCircle } from "lucide-react"
import { useModal } from "./ModalContext"

export const HeroSection = () => {
    const { openContactModal } = useModal()
    const [isEntered, setIsEntered] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)

    const handleEnter = () => {
        setIsConnecting(true)
        setTimeout(() => {
            setIsEntered(true)
        }, 1500)
    }

    // Auto-dismiss after 7 seconds
    useEffect(() => {
        const autoTimer = setTimeout(() => {
            handleEnter()
        }, 7000)
        return () => clearTimeout(autoTimer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Force scroll to top on refresh
    useEffect(() => {
        window.history.scrollRestoration = 'manual'
        window.scrollTo(0, 0)
    }, [])

    // Auto-enter if navbar links are clicked
    useEffect(() => {
        const handleNavClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a[href^="#"]')) {
                if (!isEntered) {
                    setIsEntered(true)
                }
            }
        }

        window.addEventListener('click', handleNavClick)
        return () => window.removeEventListener('click', handleNavClick)
    }, [isEntered])

    return (
        <section className="relative min-h-[100svh] bg-black overflow-hidden select-none flex flex-col justify-center">
            <AnimatePresence>
                {!isEntered && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                        className="absolute inset-0 z-50 bg-black fixed"
                    >
                        <CyberGlobe isConnecting={isConnecting} />
                        <HUDOverlay onEnter={handleEnter} isConnecting={isConnecting} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static Content (Visible after enter) */}
            <div className="relative flex-1 flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 z-10 w-full min-h-max">
                {/* 3D Core WebGL Layer */}
                <CyberCore />

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] items-center xl:items-start relative z-20 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Text Content & Call to Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10 max-w-3xl text-left flex flex-col items-start xl:mt-12"
                    >
                        {/* Mission Status Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-md border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-[11px] font-black uppercase tracking-[0.3em] font-ui">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-neon-purple animate-pulse shadow-[0_0_10px_#A855F7]" />
                            Unified Security Hub / 2026
                        </div>

                        <h1 className="text-fluid-h1 font-header font-black tracking-tighter leading-[0.85] text-white">
                            LEGAL <motion.span
                                animate={{
                                    color: ["#A855F7", "#00FFFF", "#A855F7"],
                                    textShadow: [
                                        "0 0 30px rgba(168,85,247,0.8)",
                                        "0 0 30px rgba(0,255,255,0.8)",
                                        "0 0 30px rgba(168,85,247,0.8)"
                                    ]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-block italic"
                            >X</motion.span>
                            <br />
                            <span className="text-white/95 uppercase">SYSTEMS.</span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-2xl text-gray-400 max-w-2xl leading-relaxed font-ui font-medium uppercase tracking-widest italic opacity-70">
                            "Enterprise threat intelligence engineered for total immunity. We build systems that fight back."
                        </p>

                        {/* Tactical Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-start gap-6 relative z-30 pt-4 w-full">
                            {/* SCI-FI Button: Initialize */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openContactModal}
                                className="group relative px-10 py-5 overflow-hidden transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-purple-600 group-hover:glow-neon-blend transition-all" />

                                {/* Corner Brackets */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/40" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/40" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40" />

                                {/* Scanning Line */}
                                <motion.div
                                    animate={{ top: ['-10%', '110%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-white/30 blur-[2px] z-10"
                                />

                                <div className="relative z-20 flex items-center gap-3">
                                    <span className="text-black font-header font-black text-xs uppercase tracking-[0.3em]">Initialize hire_seq</span>
                                    <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                </div>

                                {/* Glitch Overlays */}
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>

                            {/* SCI-FI Button: View CV */}
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-10 py-5 overflow-hidden border border-white/10 hover:border-neon-purple/50 bg-white/[0.02] transition-all flex items-center gap-3"
                            >
                                {/* Background HUD Print */}
                                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity font-mono text-[6px] p-2 leading-none pointer-events-none">
                                    {`[EXEC_CV] >`}
                                </div>

                                {/* Digital Edge Glow */}
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-purple group-hover:w-full transition-all duration-500 glow-neon-blend" />

                                <span className="text-white font-header font-black text-xs uppercase tracking-[0.3em]">Access.cv_db</span>
                                <div className="w-1.5 h-1.5 rounded-full border border-white/30 group-hover:border-neon-purple transition-colors" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Video Preview Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        className="w-full max-w-[1000px] mx-auto xl:ml-auto relative z-30 shadow-2xl"
                    >
                        <VideoPreviewPanel />
                    </motion.div>
                </div>
            </div>

            {/* Background Grid for post-intro */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        </section >
    )
}
