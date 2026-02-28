import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { SocialProof } from "@/components/SocialProof"
import { ExpertiseGrid } from "@/components/ExpertiseGrid"
import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { ProblemSolution } from "@/components/ProblemSolution"
import { Benefits } from "@/components/Benefits"
import { HowItWorks } from "@/components/HowItWorks"
import { SystemDemo } from "@/components/SystemDemo"
import { Pricing } from "@/components/Pricing"
import { FAQ } from "@/components/FAQ"
import { FinalCTA, Footer } from "@/components/Footer"

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
