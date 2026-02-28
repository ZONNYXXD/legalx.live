"use client"

import React, { useEffect, useRef, useState } from 'react'

export const RainParticles = () => {
    const [mounted, setMounted] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resize)
        resize()

        const particles: Particle[] = []
        const particleCount = 80 // Increased density

        class Particle {
            x!: number
            y!: number
            length!: number
            speed!: number
            opacity!: number
            color!: string

            constructor() {
                this.init()
            }

            init() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height - canvas!.height
                this.length = Math.random() * 25 + 15
                this.speed = Math.random() * 8 + 4
                this.opacity = Math.random() * 0.05 + 0.02 // Significantly reduced opacity for content clarity
                // Alternate between purple and cyan
                this.color = Math.random() > 0.5 ? '#A855F7' : '#06B6D4'
            }

            update() {
                this.y += this.speed
                this.x += this.speed * 0.1 // Slight diagonal shift

                if (this.y > canvas!.height) {
                    this.y = -this.length
                    this.x = Math.random() * canvas!.width
                }
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(this.x + 1, this.y + this.length)
                ctx.strokeStyle = this.color
                ctx.globalAlpha = this.opacity
                ctx.lineWidth = 1
                ctx.stroke()

                // Add a micro-glow head
                ctx.beginPath()
                ctx.arc(this.x + 1, this.y + this.length, 1, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        const animate = () => {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.globalCompositeOperation = 'lighter'
            particles.forEach(p => {
                p.update()
                p.draw()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [mounted])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]" // Moved forward to ensure visibility
            style={{ mixBlendMode: 'screen' }}
        />
    )
}
