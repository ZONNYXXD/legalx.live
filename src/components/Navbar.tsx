"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, Shield, Activity, Lock, ExternalLink, Mail, User, BookOpen, Terminal, Globe, Cpu } from "lucide-react"
import { useModal } from "./ModalContext"
import { Magnetic } from "./Magnetic"

const navLinks = [
    { name: "Expertise", href: "#expertise-dashboard" },
    { name: "Journey", href: "#journey" },
    { name: "Solutions", href: "#solutions" },
    { name: "Systems", href: "#systems" },
    { name: "Impact", href: "#projects" },
    { name: "Contact", href: "#contact" },
]

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { openContactModal } = useModal()
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === "#contact") {
            e.preventDefault()
            openContactModal()
            setIsOpen(false)
            return
        }
        e.preventDefault()
        setIsOpen(false)

        const targetId = href.replace("#", "")
        const element = document.getElementById(targetId)

        if (element) {
            const offset = 80 // Navbar height offset
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out flex justify-center ${isScrolled ? "pt-6 px-4" : "pt-8 px-6"
                    }`}
            >
                <div
                    className={`flex items-center justify-between w-full transition-all duration-700 ease-in-out relative
                        ${isScrolled
                            ? "max-w-5xl bg-[#030303]/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] shadow-neon-purple/5"
                            : "max-w-7xl bg-transparent px-2 py-2"
                        }
                    `}
                >
                    {/* Logo Area */}
                    <Magnetic>
                        <Link href="/" className="flex items-center gap-3 group relative z-10 w-48">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 group-hover:border-neon-purple/50 group-hover:bg-neon-purple/10 transition-all duration-300">
                                <Shield className="w-4 h-4 text-white group-hover:text-neon-purple transition-colors duration-300" />
                            </div>
                            <span className="font-header font-black text-xl tracking-widest text-white uppercase transition-colors duration-300">
                                LEGAL<span className="text-neon-purple ml-1">X</span>
                            </span>
                        </Link>
                    </Magnetic>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 relative z-10" onMouseLeave={() => setHoveredLink(null)}>
                        {navLinks.map((link) => (
                            <Magnetic key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    className="relative px-5 py-2 text-[10px] uppercase font-ui font-black text-gray-400 hover:text-white transition-colors duration-300 tracking-[0.2em]"
                                >
                                    {hoveredLink === link.name && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/[0.03] border border-white/10 -z-10 overflow-hidden"
                                            style={{ borderRadius: '2px 12px 2px 12px' }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-transparent opacity-50" />
                                            <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
                                        </motion.div>
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {link.name}
                                    </span>
                                </Link>
                            </Magnetic>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-end w-48 relative z-10">
                        <Magnetic>
                            <button
                                onClick={openContactModal}
                                className="hidden md:flex relative group items-center justify-center px-8 py-3 overflow-hidden transition-all duration-300"
                            >
                                {/* Tactical Notched Background */}
                                <div
                                    className="absolute inset-0 bg-white/[0.03] group-hover:bg-neon-purple/10 transition-colors backdrop-blur-md border border-white/10"
                                    style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
                                />

                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 flex items-center gap-3">
                                    <span className="text-white font-header font-black text-[10px] uppercase tracking-[0.4em] group-hover:text-cyan-400 transition-colors">
                                        Access_Hub
                                    </span>
                                    <div className="relative">
                                        <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse" />
                                        <div className="absolute inset-0 w-1.5 h-1.5 bg-neon-purple rounded-full animate-ping opacity-75" />
                                    </div>
                                </div>
                            </button>
                        </Magnetic>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white z-50 rounded-full bg-white/5 border border-white/10"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <motion.div
                                animate={isOpen ? "open" : "closed"}
                                className="flex flex-col gap-1.5"
                            >
                                <motion.span
                                    className="w-4 h-px bg-white block"
                                    variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
                                />
                                <motion.span
                                    className="w-4 h-px bg-white block"
                                    variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                                />
                                <motion.span
                                    className="w-4 h-px bg-white block relative"
                                    variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-neon-purple rounded-full" />
                                </motion.span>
                            </motion.div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Fullscreen Takeover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-black/80 flex flex-col items-center justify-center"
                    >
                        {/* Matrix Grid BG */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#A855F7 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        <div className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-full text-center border-b border-white/5 pb-4"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-2xl font-header font-black text-white uppercase tracking-widest hover:text-neon-purple transition-colors flex flex-col items-center gap-2"
                                    >
                                        <span className="text-[10px] text-neon-purple font-mono">0{i + 1}</span>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 px-12 py-4 bg-neon-purple text-black font-header font-black text-xs uppercase tracking-[0.3em] w-full max-w-sm"
                            >
                                Secure Infrastructure
                            </motion.button>

                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-4 px-12 py-4 border border-white/10 text-white font-header font-black text-[10px] uppercase tracking-[0.3em] w-full max-w-sm text-center"
                            >
                                Download_CV.pdf
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
