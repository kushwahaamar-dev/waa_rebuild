"use client"

import { POAPEvent, getPoapDropUrl } from '@/data/poap-events';
import { motion } from 'framer-motion';
import { Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface POAPCardProps {
    event: POAPEvent;
    index: number;
}

export function POAPCard({ event, index }: POAPCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(event.image || null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Fetch POAP image URL from our API
    useEffect(() => {
        if (event.image) {
            setImageUrl(event.image);
            return;
        }

        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/poap?eventId=${event.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.imageUrl) {
                        setImageUrl(data.imageUrl);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch POAP image:', error);
            }
        };

        fetchImage();
    }, [event.id, event.image]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex flex-col items-center"
        >
            <Link
                href={getPoapDropUrl(event.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {/* Large Circular POAP Badge */}
                <div className="relative">
                    {/* Outer Glow Ring - appears on hover */}
                    <motion.div
                        className="absolute -inset-2 rounded-full bg-gradient-to-br from-dark-1/20 to-dark-1/5 blur-xl"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Border Ring */}
                    <motion.div
                        className="absolute -inset-1 rounded-full border-2 border-dark-1/10"
                        animate={{
                            borderColor: isHovered
                                ? 'rgba(0,0,0,0.3)'
                                : 'rgba(0,0,0,0.1)',
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Main Circle Container */}
                    <motion.div
                        className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-dark-1/5 border border-dark-1/10"
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* POAP Image */}
                        {imageUrl && !imageError ? (
                            <>
                                <img
                                    src={imageUrl}
                                    alt={event.name}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                    onError={() => setImageError(true)}
                                />
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-dark-1/20 border-t-dark-1/60 rounded-full animate-spin" />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-1/10 to-dark-1/5">
                                <span className="text-4xl font-serif text-dark-1/40">
                                    {event.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-dark-1/60 flex items-center justify-center"
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="text-center text-light-1 p-4">
                                <ExternalLink className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-xs font-mono uppercase tracking-wider">View POAP</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Collector Count Badge */}
                    {event.collectors > 0 && (
                        <div className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2.5 py-1 bg-white border border-dark-1/10 rounded-full shadow-sm">
                            <Users className="w-3 h-3 text-dark-1/60" />
                            <span className="text-xs font-mono text-dark-1">
                                {event.collectors}
                            </span>
                        </div>
                    )}
                </div>

                {/* Event Details */}
                <div className="mt-4 text-center max-w-[180px]">
                    <h3 className="font-serif text-sm text-dark-1 leading-tight line-clamp-2 group-hover:text-dark-1/70 transition-colors">
                        {event.name}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-dark-1/40">
                        {event.date}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
