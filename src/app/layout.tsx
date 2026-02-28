import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor"
import { allFontsVariables } from "@/lib/fonts"

export const metadata: Metadata = {
    title: "Legal X Security | Cybersecurity Architect & IT Systems Specialist",
    description: "Legal X Security provides secure, automated, and engineered digital systems that can't be exploited. Expert Cyber Systems Architecture and AI Automation.",
};

import { RainParticles } from "@/components/RainParticles"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`antialiased font-inter ${allFontsVariables}`}>
                <CustomCursor />
                <RainParticles />
                <div className="fixed inset-0 bg-grid -z-20 pointer-events-none opacity-20" />
                <div className="fixed inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg -z-10 pointer-events-none" />
                {children}

                {/* Subtle Noise Texture */}
                <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </body>
        </html>
    );
}
