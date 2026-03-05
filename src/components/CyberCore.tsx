"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Icosahedron, Float, Torus } from '@react-three/drei'
import * as THREE from 'three'

const Core = ({ isMobile }: { isMobile: boolean }) => {
    const sphereRef = useRef<THREE.Mesh>(null)
    const icosaRef = useRef<THREE.Mesh>(null)
    const ringRef1 = useRef<THREE.Mesh>(null)
    const ringRef2 = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (sphereRef.current) sphereRef.current.rotation.y = t * 0.2
        if (icosaRef.current) {
            icosaRef.current.rotation.x = t * 0.3
            icosaRef.current.rotation.y = t * 0.4
        }
        if (ringRef1.current) {
            ringRef1.current.rotation.x = Math.sin(t * 0.5) * 0.5
            ringRef1.current.rotation.y = t * 0.5
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.x = Math.cos(t * 0.3) * 0.5
            ringRef2.current.rotation.y = -t * 0.3
        }
    })

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#A855F7" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />

            <Float speed={isMobile ? 0.5 : 1.5} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
                {/* Inner Core */}
                <Sphere ref={sphereRef} args={isMobile ? [1.5, 32, 32] : [1.5, 64, 64]}>
                    <MeshDistortMaterial
                        color="#050505"
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        metalness={0.9}
                        roughness={0.1}
                        distort={isMobile ? 0.2 : 0.4}
                        speed={isMobile ? 1 : 2}
                    />
                </Sphere>

                {/* Wireframe Hull */}
                <Icosahedron ref={icosaRef} args={[1.9, 2]}>
                    <meshBasicMaterial color="#A855F7" wireframe transparent opacity={0.15} />
                </Icosahedron>

                {/* Data Rings */}
                <Torus ref={ringRef1} args={isMobile ? [2.5, 0.02, 8, 32] : [2.5, 0.02, 16, 100]}>
                    <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={2} toneMapped={false} />
                </Torus>

                <Torus ref={ringRef2} args={isMobile ? [3, 0.01, 8, 32] : [3, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} transparent opacity={0.5} />
                </Torus>
            </Float>
        </group>
    )
}

export const CyberCore = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [dpr, setDpr] = useState<[number, number]>([1, 2])

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            setDpr(mobile ? [1, 1] : [1, 2])
        }
        checkMobile()
        window.addEventListener('resize', checkMobile, { passive: true })
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 z-0 pointer-events-none opacity-60 mix-blend-screen overflow-visible translate-y-[100px] md:translate-y-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={dpr} performance={{ min: 0.5 }}>
                <Core isMobile={isMobile} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
