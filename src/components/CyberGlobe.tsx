"use client"

import React, { useEffect, useState, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamically import Globe to avoid SSR issues with Three.js
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

interface AttackArc {
    startLat: number
    startLng: number
    endLat: number
    endLng: number
    color: string
    severity: 'low' | 'medium' | 'high'
}

interface OrbitalArc {
    lat: number
    lng: number
    size: number
    color: string
}

const SEVERITY_COLORS = {
    low: '#00ffff',     // neon cyan
    medium: '#ffaa00',  // orange
    high: '#ff0033'     // neon red
}

// ──────────────────────────────────────────────────────
// Matrix Number Rain (canvas-based, green, transparent)
// ──────────────────────────────────────────────────────
const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const fontSize = 13
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ9183726450'
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = Array(columns).fill(1)

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'rgba(0, 255, 70, 0.35)'
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)]
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }

        const interval = setInterval(draw, 40)
        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
        />
    )
}

export const CyberGlobe = ({ isConnecting = false }: { isConnecting?: boolean }) => {
    const [arcsData, setArcsData] = useState<AttackArc[]>([])
    const [orbitalArcs, setOrbitalArcs] = useState<OrbitalArc[]>([])
    const [mounted, setMounted] = useState(false)
    const globeRef = useRef<any>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Random point generator
    const getRandomPoint = () => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360
    })

    useEffect(() => {
        let isMounted = true
        const timeouts = new Set<NodeJS.Timeout>()

        // Attack simulation loop
        const interval = setInterval(() => {
            if (!isMounted) return

            const start = getRandomPoint()
            const end = getRandomPoint()
            const severity: AttackArc['severity'] = Math.random() < 0.2 ? 'high' : (Math.random() < 0.5 ? 'medium' : 'low')

            const newArc: AttackArc = {
                startLat: start.lat,
                startLng: start.lng,
                endLat: end.lat,
                endLng: end.lng,
                severity,
                color: SEVERITY_COLORS[severity]
            }

            setArcsData(current => {
                const updated = [...current, newArc]
                return updated.length > 30 ? updated.slice(1) : updated
            })

            // Spawn collision effect after arc reaches destination (1500ms arcDashAnimateTime)
            const timeoutId = setTimeout(() => {
                if (!isMounted) return

                setOrbitalArcs(current => {
                    const newRing: OrbitalArc = {
                        lat: end.lat,
                        lng: end.lng,
                        size: severity === 'high' ? 6 : (severity === 'medium' ? 4 : 2),
                        color: SEVERITY_COLORS[severity]
                    }
                    const updated = [...current, newRing]
                    // Keep up to 15 active rings to allow them to propagate and fade
                    return updated.length > 15 ? updated.slice(1) : updated
                })
                timeouts.delete(timeoutId)
            }, 1500)

            timeouts.add(timeoutId)
        }, 800)

        // Ambient orbital arcs simulation
        const orbitalInterval = setInterval(() => {
            if (!isMounted) return

            setOrbitalArcs(current => {
                const point = getRandomPoint()
                const newOrbital: OrbitalArc = {
                    ...point,
                    size: Math.random() * 0.5 + 0.1,
                    color: Math.random() < 0.3 ? '#A855F7' : '#00ffff'
                }
                const updated = [...current, newOrbital]
                return updated.length > 15 ? updated.slice(1) : updated
            })
        }, 2000)

        return () => {
            isMounted = false
            clearInterval(interval)
            clearInterval(orbitalInterval)
            timeouts.forEach(clearTimeout)
            timeouts.clear()
        }
    }, [])

    useEffect(() => {
        if (globeRef.current) {
            const globe = globeRef.current
            globe.controls().autoRotate = true
            globe.controls().autoRotateSpeed = isConnecting ? 2.0 : 0.5
            globe.controls().enableZoom = false

            const altitude = isConnecting ? 1.4 : 1.8
            globe.pointOfView({ altitude }, isConnecting ? 1500 : 3000)
        }
    }, [isConnecting])

    return (
        <div className="absolute inset-0 z-0 bg-black overflow-hidden perspective-2000">
            {/* Layer 0: Matrix Number Rain */}
            <MatrixRain />

            {/* Layer 1: Drifting Starfield */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                {mounted && [...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: Math.random(), x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1],
                            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                    />
                ))}
            </div>

            <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                atmosphereColor="#A855F7"
                atmosphereAltitude={0.25}

                // Attack Arcs
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.5}
                arcDashGap={2}
                arcDashAnimateTime={1500}
                arcStroke={0.4}
                arcsTransitionDuration={0} // Prevents glitching on array updates

                // Rings (Collision & Orbital depth)
                ringsData={orbitalArcs}
                ringColor="color"
                ringMaxRadius="size"     // Dynamic radius based on size property
                ringPropagationSpeed={2} // Slightly faster explosion
                ringRepeatPeriod={0}     // Only emit once for collisions

                // Points (Threat Nodes)
                pointsData={arcsData}
                pointColor="color"
                pointAltitude={0.01}
                pointRadius={0.05}

                hexBinPointsData={[]}
            />

            {/* Tactical HUD Reticles/Overlays */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-[800px] h-[800px] border border-white/[0.03] rounded-full absolute"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-[600px] h-[600px] border border-white/[0.05] rounded-full absolute border-dashed"
                />

                {/* Status Labels around globe */}
                <div className="absolute left-[20%] top-[40%] text-[8px] font-mono text-cyan-400 opacity-40 animate-pulse tracking-widest uppercase">
                    Scanning_Vectors...
                </div>
                <div className="absolute right-[20%] bottom-[40%] text-[8px] font-mono text-neon-purple opacity-40 animate-pulse tracking-widest uppercase" style={{ animationDelay: '1s' }}>
                    Signal_Lock: Stable
                </div>
                <div className="absolute left-[30%] bottom-[25%] text-[8px] font-mono text-white opacity-20 tracking-widest uppercase">
                    Tracking_Hostile_Nodes...
                </div>
            </div>

            {/* Radar Sweep SVG Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]">
                <defs>
                    <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="#A855F7" />
                    </radialGradient>
                </defs>
                <motion.circle
                    cx="50%" cy="50%" r="250"
                    fill="none"
                    stroke="url(#radar-gradient)"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                />
            </svg>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)] pointer-events-none" />
        </div>
    )
}
