"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?~'

interface TextDecryptProps {
    text: string;
    className?: string;
    speed?: number; // Speed of decryption (milliseconds per character switch)
    duration?: number; // Total duration in ms
}

export const TextDecrypt = ({ text, className = "", speed = 40, duration = 800 }: TextDecryptProps) => {
    const textRef = useRef<HTMLSpanElement>(null)
    const inView = useInView(textRef, { once: true, margin: "-10%" })
    const [mounted, setMounted] = useState(false)
    const [displayText, setDisplayText] = useState(text)

    useEffect(() => {
        setMounted(true)
        if (mounted) {
            setDisplayText(text.replace(/[a-zA-Z0-9]/g, () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]))
        }
    }, [mounted, text])

    useEffect(() => {
        if (!inView) return

        let isMounted = true
        let iteration = 0
        const interval = setInterval(() => {
            if (!isMounted) return

            setDisplayText((prev) => {
                return text.split('').map((letter, index) => {
                    if (letter === ' ' || letter === '\n') {
                        return letter;
                    }

                    if (index < iteration) {
                        return text[index]
                    }

                    return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
                }).join('')
            })

            // Increment iteration based on duration and text length
            const totalSteps = text.length
            const intervalTime = duration / totalSteps
            iteration += (speed / intervalTime)

            if (iteration >= text.length) {
                clearInterval(interval)
                setDisplayText(text)
            }
        }, speed)

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [inView, text, speed, duration])

    return (
        <span ref={textRef} className={className}>
            {displayText}
        </span>
    )
}
