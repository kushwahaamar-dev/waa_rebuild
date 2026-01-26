"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Matter from "matter-js"

type SocialLinks = {
    x?: string
    instagram?: string
    linkedin?: string
    telegram?: string
    website?: string
}

type TeamMember = {
    id: string
    name: string
    role: string
    color: string
    photo: string
    socials: SocialLinks
}

const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Ezven Galarraga",
        role: "President",
        color: "#3b82f6",
        photo: "/images/team/ezven.jpg",
        socials: { x: "https://twitter.com/EzvenG", telegram: "https://t.me/EzvenG" }
    },
    {
        id: "2",
        name: "Damaris Orozco",
        role: "Vice President",
        color: "#ec4899",
        photo: "/images/team/damaris.avif",
        socials: { x: "https://twitter.com/damariscosss", instagram: "https://www.instagram.com/orozco.damarisss/" }
    },
    {
        id: "3",
        name: "Carlos Sanchez",
        role: "Treasurer",
        color: "#10b981",
        photo: "/images/team/carlos.avif",
        socials: { linkedin: "https://www.linkedin.com/in/carlos-sanchez-63960b251", x: "https://twitter.com/CarlosSanchez" }
    },
    {
        id: "4",
        name: "Wyatt Studer",
        role: "Alumni Lead",
        color: "#f59e0b",
        photo: "/images/team/wyatt.avif",
        socials: { linkedin: "https://www.linkedin.com/in/wyatt-studer", x: "https://twitter.com/WyattStuder" }
    },
    {
        id: "5",
        name: "Shanthan Sudhini",
        role: "Community Lead",
        color: "#6366f1",
        photo: "/images/team/shantan.avif",
        socials: { x: "https://twitter.com/Shanthan2307", telegram: "https://t.me/Shanthan2307" }
    },
    {
        id: "6",
        name: "Tara Salman",
        role: "College Advisor",
        color: "#14b8a6",
        photo: "/images/team/tara.avif",
        socials: { website: "https://www.depts.ttu.edu/cs/faculty/tara_salman/index.php" }
    },
    {
        id: "7",
        name: "Michael Guillemette",
        role: "College Advisor",
        color: "#8b5cf6",
        photo: "/images/team/michael.avif",
        socials: { website: "https://www.depts.ttu.edu/hs/pfp/guillemettem.php" }
    },
]

export const FloatingProfiles = () => {
    const sceneRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const engineRef = useRef<Matter.Engine | null>(null)
    const runnerRef = useRef<Matter.Runner | null>(null)
    const bodiesRef = useRef<Matter.Body[]>([])
    const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null)

    const [mounted, setMounted] = useState(false)
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [draggedId, setDraggedId] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted || !sceneRef.current || !canvasRef.current) return

        // Cleanup previous
        if (engineRef.current) {
            Matter.World.clear(engineRef.current.world, false)
            Matter.Engine.clear(engineRef.current)
        }
        if (runnerRef.current) Matter.Runner.stop(runnerRef.current)

        const container = sceneRef.current
        const canvas = canvasRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        canvas.width = width
        canvas.height = height

        // Engine
        const engine = Matter.Engine.create()
        const world = engine.world
        engine.gravity.y = 0.03
        engine.gravity.x = 0
        engineRef.current = engine

        // Walls
        const wallOptions = { isStatic: true, restitution: 0.9, friction: 0 }
        const wallThickness = 100

        Matter.World.add(world, [
            Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions),
            Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions),
            Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions),
            Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions),
        ])

        // Bodies
        const bodies: Matter.Body[] = []
        const sizes = [100, 90, 85, 80, 75, 70, 70]

        teamMembers.forEach((member, i) => {
            const radius = sizes[i] || 75
            const x = (width / (teamMembers.length + 1)) * (i + 1) + (Math.random() - 0.5) * 50
            const y = height / 2 + (Math.random() - 0.5) * 100

            const body = Matter.Bodies.circle(x, y, radius, {
                restitution: 0.9,
                friction: 0.001,
                frictionAir: 0.01,
                density: 0.0008,
                label: member.id,
            })

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 3
            })

            bodies.push(body)
        })

        bodiesRef.current = bodies
        Matter.World.add(world, bodies)

        // Mouse - THIS IS THE KEY FIX
        // Create mouse on our own canvas reference
        const mouse = Matter.Mouse.create(canvas)

        // Scale mouse to match canvas if needed (for retina displays)
        mouse.pixelRatio = window.devicePixelRatio || 1

        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2, // Higher = snappier dragging
                damping: 0.3,
                render: { visible: false }
            }
        })

        mouseConstraintRef.current = mouseConstraint
        Matter.World.add(world, mouseConstraint)

        // Track which body is being dragged for visual feedback
        Matter.Events.on(mouseConstraint, 'startdrag', (event: any) => {
            setDraggedId(event.body?.label || null)
        })

        Matter.Events.on(mouseConstraint, 'enddrag', () => {
            setDraggedId(null)
        })

        // Runner
        const runner = Matter.Runner.create()
        runnerRef.current = runner
        Matter.Runner.run(runner, engine)

        // Animation Loop
        let animationFrameId: number

        const updatePositions = () => {
            bodies.forEach(body => {
                const element = document.getElementById(`bubble-${body.label}`)
                if (element) {
                    const { x, y } = body.position
                    const angle = body.angle
                    const speed = body.speed

                    const scaleX = 1 + Math.min(speed * 0.008, 0.12)
                    const scaleY = 1 / scaleX

                    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`

                    const shadowBlur = 15 + speed * 1.5
                    const shadowY = 4 + speed * 0.3
                    element.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${0.06 + speed * 0.008})`
                }
            })
            animationFrameId = requestAnimationFrame(updatePositions)
        }

        updatePositions()

        // Gentle floating force
        Matter.Events.on(engine, 'beforeUpdate', () => {
            bodies.forEach(body => {
                if (body.speed < 0.5 && mouseConstraint.body !== body) {
                    Matter.Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.00003,
                        y: (Math.random() - 0.5) * 0.00003
                    })
                }
                Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.97)
            })
        })

        // Resize handler
        const handleResize = () => {
            if (!sceneRef.current || !canvasRef.current) return
            const newWidth = sceneRef.current.clientWidth
            const newHeight = sceneRef.current.clientHeight
            canvasRef.current.width = newWidth
            canvasRef.current.height = newHeight
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
            Matter.Runner.stop(runner)
            Matter.Engine.clear(engine)
        }
    }, [mounted])

    // Helper to get first available social link
    const getFirstSocialLink = (member: TeamMember): string | null => {
        const { socials } = member
        return socials.x || socials.instagram || socials.linkedin || socials.telegram || socials.website || null
    }

    const handleBubbleClick = useCallback((member: TeamMember, e: React.MouseEvent) => {
        // Only navigate if not currently dragging
        if (draggedId) return

        const link = getFirstSocialLink(member)
        if (link) {
            window.open(link, '_blank')
        }
    }, [draggedId])

    // Social icon SVGs (minimal inline)
    const SocialIcon = ({ type, size = 14 }: { type: keyof SocialLinks, size?: number }) => {
        const icons: Record<keyof SocialLinks, React.ReactNode> = {
            x: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
            instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
            linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
            telegram: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
            website: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
        }
        return icons[type] || null
    }

    return (
        <div ref={sceneRef} className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Instruction */}
            <div className="absolute top-4 w-full text-center pointer-events-none z-20">
                <p className="text-dark-1/20 text-xs uppercase tracking-[0.3em] font-bold">
                    Click & Drag Bubbles
                </p>
            </div>

            {/* CRITICAL: This canvas captures all mouse events for physics */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
            />

            {/* Bubbles are BELOW the canvas for events, but visually above via z-index tricks */}
            {mounted && teamMembers.map((member, index) => {
                const isHovered = hoveredId === member.id
                const isDragged = draggedId === member.id
                const hasSocials = Object.keys(member.socials).length > 0

                return (
                    <div
                        key={member.id}
                        id={`bubble-${member.id}`}
                        className={`
                absolute top-0 left-0 rounded-full 
                flex items-center justify-center p-4 text-center 
                select-none pointer-events-none
                transition-all duration-75 ease-out
                ${isDragged ? 'scale-105 ring-2 ring-offset-2' : ''}
              `}
                        style={{
                            willChange: "transform, box-shadow",
                            transform: "translate(-500px, -500px)",
                            width: `${[200, 180, 170, 160, 150, 140, 140][index]}px`,
                            height: `${[200, 180, 170, 160, 150, 140, 140][index]}px`,
                            background: `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))`,
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: isDragged
                                ? `2px solid ${member.color}`
                                : `1px solid rgba(0,0,0,0.06)`,
                            zIndex: isDragged ? 30 : 5,
                        }}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className="rounded-full mb-2 overflow-hidden"
                                style={{
                                    width: `${[80, 70, 65, 60, 55, 50, 50][index]}px`,
                                    height: `${[80, 70, 65, 60, 55, 50, 50][index]}px`,
                                    border: `2px solid ${member.color}30`,
                                }}
                            >
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3
                                className="font-bold font-sans tracking-tight leading-tight text-dark-1"
                                style={{ fontSize: `${[18, 16, 15, 14, 13, 12, 12][index]}px` }}
                            >
                                {member.name}
                            </h3>
                            <p
                                className="text-dark-1/50 uppercase tracking-widest font-medium mt-1"
                                style={{ fontSize: `${[11, 10, 9, 9, 8, 8, 8][index]}px` }}
                            >
                                {member.role}
                            </p>
                            {/* Social Icons */}
                            {hasSocials && (
                                <div className="flex gap-2 mt-2 opacity-50">
                                    {(Object.keys(member.socials) as (keyof SocialLinks)[]).map(key => (
                                        member.socials[key] && (
                                            <span key={key} className="text-dark-1">
                                                <SocialIcon type={key} size={[14, 13, 12, 11, 10, 10, 10][index]} />
                                            </span>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
