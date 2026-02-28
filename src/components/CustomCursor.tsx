"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export const CustomCursor = () => {
    const [mounted, setMounted] = useState(false)
    const [isPointer, setIsPointer] = useState(false)
    const [coords, setCoords] = useState({ x: 0, y: 0 })

    const mouseX = useSpring(0, { damping: 30, stiffness: 400 })
    const mouseY = useSpring(0, { damping: 30, stiffness: 400 })

    // Secondary LAG for crosshair
    const lagX = useSpring(0, { damping: 40, stiffness: 200 })
    const lagY = useSpring(0, { damping: 40, stiffness: 200 })

    useEffect(() => {
        setMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            lagX.set(e.clientX)
            lagY.set(e.clientY)
            setCoords({ x: e.clientX, y: e.clientY })

            const target = e.target as HTMLElement
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A"
            )
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY, lagX, lagY])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Primary HUD Reticle */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="relative w-12 h-12 flex items-center justify-center"
            >
                {/* Corner Brackets */}
                {[0, 90, 180, 270].map((rotation) => (
                    <motion.div
                        key={rotation}
                        animate={{
                            rotate: isPointer ? rotation + 45 : rotation,
                            scale: isPointer ? 1.2 : 1,
                            borderColor: isPointer ? "#A855F7" : "rgba(168, 85, 247, 0.4)",
                        }}
                        className="absolute w-4 h-4 border-t-2 border-l-2"
                        style={{
                            top: 0,
                            left: 0,
                            transformOrigin: "center center",
                            translate: "0 0"
                        }}
                    />
                ))}

                {/* Central Horizontal Lines */}
                <motion.div
                    animate={{ width: isPointer ? 30 : 10 }}
                    className="h-[1px] bg-neon-purple shadow-[0_0_8px_#A855F7]"
                />
                <motion.div
                    animate={{ height: isPointer ? 30 : 10 }}
                    className="absolute w-[1px] bg-neon-purple shadow-[0_0_8px_#A855F7]"
                />

                {/* Technical Readout Labels */}
                <div className="absolute top-8 left-8 flex flex-col items-start gap-1 font-mono text-[6px] tracking-tighter uppercase whitespace-nowrap">
                    <div className="flex gap-2">
                        <span className="text-neon-purple opacity-40">POS_XY:</span>
                        <span className="text-white opacity-60 font-bold">{Math.round(coords.x)}.{Math.round(coords.y)}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-cyan-400 opacity-40">STAT:</span>
                        <span className="text-cyan-400 opacity-60 font-bold">{isPointer ? "AUTH_REQD" : "SYS_LOCKED"}</span>
                    </div>
                </div>
            </motion.div>

            {/* Lagging Secondary Crosshair */}
            <motion.div
                style={{
                    x: lagX,
                    y: lagY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="absolute w-2 h-2 flex items-center justify-center -z-10"
            >
                <div className="w-full h-[1px] bg-white opacity-10" />
                <div className="absolute h-full w-[1px] bg-white opacity-10" />

                {/* Micro Blinking Dots */}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute top-4 right-4 w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
                />
            </motion.div>

            {/* Scanning Laser Line (Horizontal) */}
            <motion.div
                style={{
                    y: mouseY,
                }}
                className="fixed left-0 right-0 h-[1px] bg-neon-purple/5 pointer-events-none -z-20"
            />
        </div>
    )
}
