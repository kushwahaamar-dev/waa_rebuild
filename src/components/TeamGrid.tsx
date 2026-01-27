"use client"

import Link from "next/link"
import { useRef } from "react"

type SocialLinks = {
    x?: string
    instagram?: string
    linkedin?: string
    telegram?: string
    website?: string
}

type TeamMember = {
    name: string
    role: string
    photo: string
    socials: SocialLinks
}

const teamMembers: TeamMember[] = [
    {
        name: "Ezven Galarraga",
        role: "President",
        photo: "/images/team/ezven.jpg",
        socials: { x: "https://twitter.com/EzvenG", telegram: "https://t.me/EzvenG" }
    },
    {
        name: "Damaris Orozco",
        role: "Vice President",
        photo: "/images/team/damaris.avif",
        socials: { x: "https://twitter.com/damariscosss", instagram: "https://www.instagram.com/orozco.damarisss/" }
    },
    {
        name: "Carlos Sanchez",
        role: "Treasurer",
        photo: "/images/team/carlos.avif",
        socials: { linkedin: "https://www.linkedin.com/in/carlos-sanchez-63960b251", x: "https://twitter.com/CarlosSanchez" }
    },
    {
        name: "Wyatt Studer",
        role: "Alumni Lead",
        photo: "/images/team/wyatt.avif",
        socials: { linkedin: "https://www.linkedin.com/in/wyatt-studer", x: "https://twitter.com/WyattStuder" }
    },
    {
        name: "Shanthan Sudhini",
        role: "Community Lead",
        photo: "/images/team/shantan.avif",
        socials: { x: "https://twitter.com/Shanthan2307", telegram: "https://t.me/Shanthan2307" }
    },
    {
        name: "Tara Salman",
        role: "College Advisor",
        photo: "/images/team/tara.avif",
        socials: { website: "https://www.depts.ttu.edu/cs/faculty/tara_salman/index.php" }
    },
    {
        name: "Michael Guillemette",
        role: "College Advisor",
        photo: "/images/team/michael.avif",
        socials: { website: "https://www.depts.ttu.edu/hs/pfp/guillemettem.php" }
    },
]

// Social Icons
const SocialIcon = ({ type, className = "" }: { type: keyof SocialLinks, className?: string }) => {
    const icons: Record<keyof SocialLinks, React.ReactNode> = {
        x: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
        instagram: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
        linkedin: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
        telegram: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>,
        website: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
    }
    return icons[type] || null
}

// Single Avatar Component
const Avatar = ({ member, size = 100 }: { member: TeamMember, size?: number }) => {
    const firstSocialLink = Object.values(member.socials).find(Boolean)

    return (
        <div className="group relative flex-shrink-0">
            <Link
                href={firstSocialLink || "#"}
                target={firstSocialLink ? "_blank" : undefined}
                className="block"
            >
                <div
                    className="rounded-full overflow-hidden border-4 border-dark-1/10 group-hover:border-dark-1/30 transition-all duration-300 group-hover:scale-110"
                    style={{ width: size, height: size }}
                >
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            {/* Tooltip on hover */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                <div className="bg-dark-1 text-light-1 px-4 py-2 rounded-lg whitespace-nowrap text-center shadow-lg">
                    <p className="font-bold font-sans tracking-tight text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-light-1/60">{member.role}</p>
                    <div className="flex gap-2 justify-center mt-1">
                        {(Object.keys(member.socials) as (keyof SocialLinks)[]).map(key => (
                            member.socials[key] && (
                                <span key={key} className="text-light-1/60">
                                    <SocialIcon type={key} className="w-3 h-3" />
                                </span>
                            )
                        ))}
                    </div>
                </div>
                <div className="w-3 h-3 bg-dark-1 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
            </div>
        </div>
    )
}

// Rotating Row Component
const RotatingRow = ({ members, direction = "left", speed = 30 }: { members: TeamMember[], direction?: "left" | "right", speed?: number }) => {
    const rowRef = useRef<HTMLDivElement>(null)

    // Duplicate members for seamless loop
    const duplicatedMembers = [...members, ...members, ...members]

    return (
        <div className="overflow-hidden py-4">
            <div
                ref={rowRef}
                className="flex gap-8 animate-scroll"
                style={{
                    animationDirection: direction === "right" ? "reverse" : "normal",
                    animationDuration: `${speed}s`,
                }}
            >
                {duplicatedMembers.map((member, i) => (
                    <Avatar key={`${member.name}-${i}`} member={member} size={120} />
                ))}
            </div>
        </div>
    )
}

export function TeamGrid() {
    return (
        <div className="w-screen -mx-[50vw] left-1/2 relative">
            <style jsx global>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>

            <div className="overflow-hidden py-20">
                <div className="flex gap-8 animate-scroll hover:pause">
                    {/* Triple duplication for seamless loop */}
                    {[...teamMembers, ...teamMembers, ...teamMembers].map((member, i) => (
                        <Avatar key={`${member.name}-${i}`} member={member} size={120} />
                    ))}
                </div>
            </div>
        </div>
    )
}
