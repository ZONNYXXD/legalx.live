"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Maximize, Activity, Terminal } from "lucide-react"

interface VideoShowcaseProps {
    src?: string // Made optional so user can inject their own later
}

export const VideoShowcase = ({ src = "" }: VideoShowcaseProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div
            className="relative w-full aspect-video bg-[#050505] rounded-lg border border-white/10 overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cinematic Scanlines */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] pointer-events-none mix-blend-overlay z-10" />

            {/* Edge Glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />

            {/* Video Element */}
            {src ? (
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    onClick={togglePlay}
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white/20">
                    <Terminal className="w-12 h-12 mb-4 opacity-30" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Awaiting Video Source (src)</span>
                </div>
            )}

            {/* Top HUD Data */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none transition-opacity duration-300">
                <div className="flex flex-col gap-1 mix-blend-difference">
                    <span className="text-[10px] font-mono text-neon-purple uppercase tracking-widest font-bold">
                        REC_STREAM_ACTIVE
                    </span>
                    <span className="text-[8px] font-mono text-white/50 tracking-[0.4em]">
                        DATA_PACKET_78A
                    </span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ height: isPlaying ? [10, Math.random() * 20 + 5, 10] : 10 }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 bg-neon-purple/50"
                        />
                    ))}
                </div>
            </div>

            {/* Center Play Button Overlay */}
            <div
                className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 ${isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: !isPlaying ? 'rgba(0,0,0,0.6)' : 'transparent' }}
            >
                <button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 hover:border-neon-purple/50 hover:bg-neon-purple/10 transition-all group/btn"
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6 text-white ml-0.5 group-hover/btn:text-neon-purple transition-colors" />
                    ) : (
                        <Play className="w-6 h-6 text-white ml-1.5 group-hover/btn:text-neon-purple transition-colors" />
                    )}
                </button>
            </div>

            {/* Bottom Tech Bar */}
            <div
                className={`absolute bottom-0 left-0 right-0 h-10 border-t border-white/10 bg-black/60 backdrop-blur-md z-20 flex items-center justify-between px-4 transition-transform duration-300 ${isHovered || !isPlaying ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="flex items-center gap-3">
                    <Activity className={`w-3.5 h-3.5 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-gray-500'}`} />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white">
                        {isPlaying ? 'PLAYBACK_ACTIVE' : 'STANDBY'}
                    </span>
                </div>

                {/* Fake Timeline for aesthetic */}
                <div className="flex-1 max-w-sm mx-8 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-neon-purple"
                        animate={{ width: isPlaying ? ['0%', '100%'] : '0%' }}
                        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
                    />
                </div>

                <Maximize className="w-3.5 h-3.5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
        </div>
    )
}
