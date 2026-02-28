"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Shield, User, Mail, MessageSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

import { useModal } from "./ModalContext"

export const ContactModal = () => {
    const { isContactModalOpen: isOpen, closeContactModal: setIsOpen } = useModal()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formRef.current) return

        setIsSubmitting(true)
        setStatus("idle")

        try {
            const SERVICE_ID = "service_mk6yqh9"
            const ADMIN_TEMPLATE_ID = "template_69l8scj"
            const USER_TEMPLATE_ID = "template_l7qmkjm"
            const PUBLIC_KEY = "6GQU5XRb5q6WEQWsg"

            // Initialize EmailJS explicitly
            emailjs.init(PUBLIC_KEY)

            const formData = new FormData(formRef.current)

            // Unified parameters for both templates
            const templateParams = {
                user_name: formData.get("user_name"),
                user_email: formData.get("user_email"),
                message: formData.get("message"),
                // Standard variable names to ensure both templates resolve correctly
                to_email: "zonnyxxd@gmail.com", // For Admin Template
                recipient_email: formData.get("user_email"), // For Auto-reply Template if it uses this
                reply_to: formData.get("user_email"),
                to_name: "SONY",
            }

            console.log("Transmitting Parallel Payloads:", templateParams)

            // Send both emails simultaneously for better performance
            await Promise.all([
                emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY),
                emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY)
            ])

            setStatus("success")

            setTimeout(() => {
                setIsOpen() // This is closeContactModal
                setStatus("idle")
            }, 3000)
        } catch (error: any) {
            console.error("EmailJS Full Error Object:", error)
            console.error("EmailJS Error Status:", error?.status)
            console.error("EmailJS Error Text:", error?.text)
            setStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 select-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isSubmitting && setIsOpen()}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#030303] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)]"
                    >
                        {/* Interactive Grid Background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#A855F7 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                        />

                        {/* Header */}
                        <div className="relative z-10 p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-neon-purple" />
                                    </div>
                                    <h2 className="font-header font-black text-2xl tracking-tighter text-white uppercase italic">
                                        Secure <span className="text-neon-purple not-italic">Communication</span>
                                    </h2>
                                </div>
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">
                                    Auth_Protocol: Direct_Inquiry_v2.0
                                </span>
                            </div>
                            <button
                                onClick={setIsOpen}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 md:p-12">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
                                    <h3 className="text-2xl font-header font-black text-white uppercase mb-2 tracking-widest">Transmission Successful</h3>
                                    <p className="text-gray-400 font-ui text-sm uppercase tracking-widest opacity-60">Your message has been encrypted and dispatched.</p>
                                </motion.div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Name Field */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-2 text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em] font-bold">
                                                <User className="w-3 h-3" /> Identity_Name
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type="text"
                                                    name="user_name"
                                                    placeholder="ENTER FULL NAME"
                                                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-sm font-ui text-white uppercase tracking-[0.2em] outline-none focus:border-neon-purple/50 focus:bg-white/[0.05] transition-all"
                                                />
                                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-purple transition-all duration-500 group-focus-within:w-full" />
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-2 text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em] font-bold">
                                                <Mail className="w-3 h-3" /> Secure_Endpoint
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type="email"
                                                    name="user_email"
                                                    placeholder="EMAIL_ADDRESS"
                                                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-sm font-ui text-white uppercase tracking-[0.2em] outline-none focus:border-neon-purple/50 focus:bg-white/[0.05] transition-all"
                                                />
                                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-purple transition-all duration-500 group-focus-within:w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em] font-bold">
                                            <MessageSquare className="w-3 h-3" /> Encrypted_Payload
                                        </label>
                                        <div className="relative group">
                                            <textarea
                                                required
                                                name="message"
                                                rows={5}
                                                placeholder="DESCRIBE_YOUR_REQUIREMENTS..."
                                                className="w-full bg-white/[0.03] border border-white/10 px-4 py-4 text-sm font-ui text-white uppercase tracking-[0.2em] outline-none focus:border-neon-purple/50 focus:bg-white/[0.05] transition-all resize-none"
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-purple transition-all duration-500 group-focus-within:w-full" />
                                        </div>
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-center gap-3 text-red-500 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 p-4 border border-red-500/20">
                                            <AlertCircle className="w-4 h-4" /> ERROR: PACKET_LOSS_DETECTED. PLEASE RETRY.
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full group relative overflow-hidden bg-white/5 border border-white/10 py-6 transition-all hover:bg-neon-purple/10 hover:border-neon-purple/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-4">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin text-neon-purple" />
                                                    <span className="font-header font-black text-xs uppercase tracking-[0.5em] text-white">Transmitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="font-header font-black text-xs uppercase tracking-[0.5em] text-white group-hover:text-neon-purple transition-colors">Initialize Dispatch</span>
                                                    <Send className="w-4 h-4 text-gray-500 group-hover:text-neon-purple transition-colors" />
                                                </>
                                            )}
                                        </div>
                                        {/* Button Background Decorations */}
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Footer Status Bar */}
                        <div className="px-8 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-gray-500 uppercase tracking-widest">
                            <div className="flex items-center gap-4">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                CONNECTED_TO_SECURE_NODE_0x71A
                            </div>
                            <div className="opacity-40">UTC_TIME: {new Date().toISOString().split('T')[1].split('.')[0]}</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
