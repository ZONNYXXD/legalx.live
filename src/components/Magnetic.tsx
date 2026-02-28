"use client"

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const Magnetic = ({ children }: { children: React.ReactElement }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const boundingRect = ref.current?.getBoundingClientRect()
        if (boundingRect) {
            const { width, height, left, top } = boundingRect
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)
            setPosition({ x: x * 0.35, y: y * 0.35 })
        }
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="flex items-center justify-center relative z-10"
        >
            {children}
        </motion.div>
    )
}
