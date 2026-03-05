import dynamic from 'next/dynamic'
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"

// Dynamically imported components below the fold to save initial memory
const SocialProof = dynamic(() => import("@/components/SocialProof").then(mod => mod.SocialProof))
const ExpertiseGrid = dynamic(() => import("@/components/ExpertiseGrid").then(mod => mod.ExpertiseGrid))
const ExperienceTimeline = dynamic(() => import("@/components/ExperienceTimeline").then(mod => mod.ExperienceTimeline))
const ProblemSolution = dynamic(() => import("@/components/ProblemSolution").then(mod => mod.ProblemSolution))
const Benefits = dynamic(() => import("@/components/Benefits").then(mod => mod.Benefits))
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => mod.HowItWorks))
const SystemDemo = dynamic(() => import("@/components/SystemDemo").then(mod => mod.SystemDemo))
const Pricing = dynamic(() => import("@/components/Pricing").then(mod => mod.Pricing))
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => mod.FAQ))
const FinalCTA = dynamic(() => import("@/components/Footer").then(mod => mod.FinalCTA))
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer))

export default function Home() {
    return (
        <main className="min-h-screen bg-dark-bg text-white font-inter selection:bg-neon-purple/30 overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <SocialProof />
            <ExpertiseGrid />
            <ExperienceTimeline />
            <ProblemSolution />
            <Benefits />
            <HowItWorks />
            <SystemDemo />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    )
}
