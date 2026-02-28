"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, Shield, Zap, Activity, Monitor, Info, Database, Layers, Lock, Volume2, VolumeX } from "lucide-react"

const VIDEO_SLIDES = [
    {
        id: 1,
        label: "INTELLIGENCE BRIEF",
        title: "Threat Detection Alpha",
        description: "Real-time heuristic analysis of incoming neural traffic patterns and anomaly detection.",
        tag: "LIVE_FEED_01",
        videoSrc: "/videos/playback/threat_alpha.mp4",
        bitrate: "45.2 MBPS",
        encryption: "AES-256",
        status: "READY",
        metadata: {
            tags: ["AI", "SOC", "Detection"],
            securityLevel: "LEVEL_4 / TOP_SECRET",
            threatType: "HEURISTIC_ANOMALY",
            duration: "04:20",
            classification: "SIGINT_ORANGE",
            lastUpdated: "JUST_NOW"
        },
        color: "text-neon-purple",
        borderColor: "rgba(168, 85, 247, 0.2)",
    },
    {
        id: 2,
        label: "SYSTEM PROTOCOL",
        title: "Kernel Hardening Sequence",
        description: "Automated deployment of Level-7 security protocols across decentralized nodes.",
        tag: "SEC_SEQ_02",
        videoSrc: "/videos/playback/kernel_hardening.mp4",
        bitrate: "12.8 MBPS",
        encryption: "RSA-4096",
        status: "ACTIVE",
        metadata: {
            tags: ["KERNEL", "DEPLOY", "AUTOMATION"],
            securityLevel: "LEVEL_5 / RESTRICTED",
            threatType: "SYSTEM_INTEGRITY",
            duration: "02:15",
            classification: "SYS_DEF_BLUE",
            lastUpdated: "2M_AGO"
        },
        color: "text-cyan-400",
        borderColor: "rgba(34, 211, 238, 0.2)",
    },
    {
        id: 3,
        label: "NETWORK OVERVIEW",
        title: "Zero-Trust Mesh Map",
        description: "Visualizing encrypted node communication clusters and cross-segment authentication.",
        tag: "MESH_INTEL_03",
        videoSrc: "/videos/playback/zero_trust.mp4",
        bitrate: "112.5 MBPS",
        encryption: "XTS-AES-512",
        status: "STABLE",
        metadata: {
            tags: ["NETWORK", "MESH", "ZERO-TRUST"],
            securityLevel: "LEVEL_3 / INTERNAL",
            threatType: "LATERAL_MOVEMENT",
            duration: "06:45",
            classification: "NET_VIS_GREEN",
            lastUpdated: "10M_AGO"
        },
        color: "text-emerald-400",
        borderColor: "rgba(52, 211, 153, 0.2)",
    }
]

export const VideoPreviewPanel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isAnalysisMode, setIsAnalysisMode] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true) // Default to playing for better UX
    const [progress, setProgress] = useState(0)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const currentSlide = VIDEO_SLIDES[currentIndex]

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(e => console.log("Playback failed:", e))
            } else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying, currentIndex])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime
            const duration = videoRef.current.duration
            if (!isNaN(duration)) {
                setProgress((current / duration) * 100)
            }
        }
    }

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + VIDEO_SLIDES.length) % VIDEO_SLIDES.length)
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            filter: "blur(10px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            filter: "blur(10px)"
        })
    }

    return (
        <div className="relative w-full mx-auto flex flex-col gap-8">
            {/* Top Toolbar */}
            <div className="flex justify-between items-center px-2">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsAnalysisMode(!isAnalysisMode)}>
                        <div className={`w-8 h-4 rounded-full border border-white/10 relative transition-all ${isAnalysisMode ? 'bg-neon-purple/20' : 'bg-white/5'}`}>
                            <motion.div
                                animate={{ x: isAnalysisMode ? 16 : 0 }}
                                className={`absolute top-[2px] left-[2px] w-2.5 h-2.5 rounded-full ${isAnalysisMode ? 'bg-neon-purple' : 'bg-gray-500'}`}
                            />
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest leading-none">
                            {isAnalysisMode ? 'Analysis Mode' : 'Cinematic Mode'}
                        </span>
                    </div>
                </div>

                <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentIndex === i ? 'bg-neon-purple scale-125' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Intelligence Module Container */}
            <div
                className="rounded-sm relative group overflow-hidden transition-all duration-700 w-full"
                style={{
                    background: 'rgba(10, 10, 15, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${currentSlide.borderColor}`,
                }}
            >
                {/* 1px Inner Border Glow */}
                <div className="absolute inset-px border border-white/[0.02] pointer-events-none" />

                {/* Visual Section (Taller Aspect Ratio as requested) */}
                <div className="relative aspect-[4/3] lg:aspect-[16/10] flex flex-col min-h-[400px] lg:min-h-[500px]">
                    {/* Video System Header */}
                    <div className="h-12 flex items-center justify-between px-6 border-b border-white/5 bg-white/[0.02] relative z-20">
                        <div className="flex items-center gap-6 font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em]">
                            <span className={currentSlide.color}>{currentSlide.tag}</span>
                            <div className="w-[1px] h-3 bg-white/10" />
                            <span>{currentSlide.bitrate}</span>
                            <div className="w-[1px] h-3 bg-white/10" />
                            <span>{currentSlide.encryption}</span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[9px] tracking-widest">
                            <span className="text-emerald-500 flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                STATUS: {currentSlide.status}
                            </span>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 relative overflow-hidden bg-black/20">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 p-8 lg:p-12 flex flex-col gap-8"
                            >
                                {/* Video Background (Absolute Full Bleed) */}
                                <div className="absolute inset-0 bg-black overflow-hidden group/vid">
                                    <video
                                        ref={videoRef}
                                        src={currentSlide.videoSrc}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        loop
                                        muted={isMuted}
                                        autoPlay={isPlaying}
                                        onTimeUpdate={handleTimeUpdate}
                                        playsInline
                                    />

                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 bg-scanline opacity-[0.05] pointer-events-none mix-blend-overlay" />

                                    {/* Top Gradient for Header Readability */}
                                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

                                    {/* Bottom Gradient for Typography Readability */}
                                    <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

                                    {/* Subtle Waveform Animation Overlay */}
                                    {isAnalysisMode && (
                                        <div className="absolute top-6 right-6 flex gap-1 items-end h-16 opacity-30">
                                            {[...Array(32)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [4, Math.random() * 48 + 4, 4] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                                                    className={`w-[2px] bg-cyan-400`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Play Overlay (Soft Fade-in - Modified to stay hidden if autoplaying) */}
                                    {!isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/vid:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm z-20">
                                            <button
                                                onClick={() => setIsPlaying(true)}
                                                className="w-24 h-24 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all backdrop-blur-md"
                                            >
                                                <Play className="w-10 h-10 text-white ml-2 drop-shadow-2xl" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Solid UI Overlay (Typography & Navigation) */}
                                <div className="relative z-[40] w-full h-full flex justify-between items-end p-8 lg:p-12 pointer-events-none gap-8">
                                    {/* Left: Empty Spacer (Text moved below player) */}
                                    <div className="flex-1" />

                                    {/* Right: Next Video Navigation Block (Creates balance in the empty space) */}
                                    <div className="flex-shrink-0 flex flex-col items-end space-y-3 pointer-events-auto relative z-[50]">
                                        <div className="flex items-center gap-3 w-full justify-end">
                                            <div className="flex-1 h-[1px] bg-gradient-to-l from-white/20 to-transparent max-w-[100px]" />
                                            <span className="text-[9px] font-mono font-black text-gray-500 tracking-[0.3em] uppercase">
                                                NEXT_IN_QUEUE //
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); paginate(1); }}
                                            className="group/nextbtn flex items-center gap-5 p-4 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 hover:border-neon-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] text-right"
                                        >
                                            <div>
                                                <div className="text-sm font-header font-black text-white uppercase tracking-widest group-hover/nextbtn:text-neon-purple transition-colors">
                                                    {VIDEO_SLIDES[(currentIndex + 1) % VIDEO_SLIDES.length].title}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mt-1">
                                                    {VIDEO_SLIDES[(currentIndex + 1) % VIDEO_SLIDES.length].tag}
                                                </div>
                                            </div>
                                            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover/nextbtn:bg-neon-purple/20 group-hover/nextbtn:scale-110 transition-all duration-300">
                                                <ChevronRight className="w-6 h-6 text-white" />
                                            </div>
                                        </button>

                                        {/* Back Button underneath for full navigation */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                                            className="group/prevbtn flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity mt-2"
                                        >
                                            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover/prevbtn:bg-white/10 transition-colors">
                                                <ChevronLeft className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-[9px] font-mono text-gray-400 tracking-[0.2em] uppercase group-hover/prevbtn:text-white transition-colors">
                                                PREV_LOG
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Professional Controls Footer */}
                    <div className="h-16 border-t border-white/5 bg-white/[0.01] px-6 flex items-center gap-8 relative z-10">
                        {/* Smaller Corner Play Button */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center gap-2 group/play"
                        >
                            <div className="p-1 rounded bg-white/10 group-hover/play:bg-neon-purple/20 transition-colors">
                                {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white fill-current" />}
                            </div>
                            <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest group-hover/play:text-white">
                                {isPlaying ? 'Streaming..' : 'Init_Stream'}
                            </span>
                        </button>

                        {/* Progress/Timeline Area */}
                        <div className="flex-1 flex items-center gap-4">
                            <span className="text-[8px] font-mono text-gray-600">
                                {videoRef.current ?
                                    `${Math.floor(videoRef.current.currentTime / 60)}:${Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0')}`
                                    : "00:00"}
                            </span>
                            <div
                                className="flex-1 h-[2px] bg-white/5 relative group/bar cursor-pointer"
                                onClick={(e) => {
                                    if (videoRef.current) {
                                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                                        const x = e.clientX - rect.left
                                        const pct = x / rect.width
                                        videoRef.current.currentTime = pct * videoRef.current.duration
                                    }
                                }}
                            >
                                <motion.div
                                    className={`absolute inset-y-0 left-0 bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.5)]`}
                                    style={{ width: `${progress}%` }}
                                />
                                <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-100 bg-white/5 transition-opacity" />
                            </div>
                            <span className="text-[8px] font-mono text-gray-600">
                                {videoRef.current && !isNaN(videoRef.current.duration) ?
                                    `${Math.floor(videoRef.current.duration / 60)}:${Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0')}`
                                    : "00:00"}
                            </span>
                        </div>

                        {/* Nav Buttons (Small Arrows) */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => paginate(-1)}
                                className="w-8 h-8 rounded border border-white/5 bg-white/[0.02] hover:bg-white/10 flex items-center justify-center transition-all"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                                onClick={() => paginate(1)}
                                className="w-8 h-8 rounded border border-white/5 bg-white/[0.02] hover:bg-white/10 flex items-center justify-center transition-all"
                            >
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Micro Decorations */}
            <div className="flex justify-between px-2 opacity-20 pointer-events-none mt-1">
                <div className="text-[6px] font-mono uppercase tracking-[1em] text-white">ZYN_SYSTEM_ENCRYPTION_LAYER_ACTIVE</div>
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-0.5 bg-white/20" />
                    <span className="text-[6px] font-mono">NODE_7.1</span>
                </div>
            </div>

            {/* External Dynamic Typography Block (Animated below the video player) */}
            <div className="w-full relative min-h-[160px] pl-4 border-l-2 border-neon-purple mt-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="space-y-3 text-left pr-4 absolute inset-0 w-full"
                    >
                        <div className="flex items-center gap-4">
                            <div className="px-3 py-1 rounded bg-neon-purple/10 border border-neon-purple/30 backdrop-blur-md">
                                <span className="text-[10px] font-mono font-black text-neon-purple tracking-[0.2em] uppercase">
                                    INTELLIGENCE BRIEF_//[{currentIndex + 1}]
                                </span>
                            </div>
                        </div>
                        <h3 className="text-3xl lg:text-5xl font-header font-black text-white uppercase italic tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                            {currentSlide.title}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-400 font-ui uppercase tracking-widest leading-relaxed max-w-2xl">
                            {currentSlide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
