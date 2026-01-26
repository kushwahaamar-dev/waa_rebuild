"use client"

import { useEffect, useState, useRef } from "react"

// ============================================
// 1. ROTATING 3D ASCII CUBE (Interactive)
// ============================================
export const AsciiCube = ({ size = 200, className = "" }: { size?: number; className?: string }) => {
    // Rotation angles
    const [rot, setRot] = useState({ x: 0, y: 0 })

    useEffect(() => {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            targetX = y * 2; // Mouse Y controls rotation around X axis
            targetY = x * 2; // Mouse X controls rotation around Y axis
        };

        const animate = () => {
            // Smooth lerp
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;

            // Add automatic idle spin if mouse is idle/center
            const time = Date.now() * 0.0005;
            const idleX = Math.sin(time) * 0.5;
            const idleY = time;

            setRot({
                x: currentX + idleX,
                y: currentY + idleY
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    const renderCube = () => {
        const width = 40
        const height = 20
        const A = rot.x
        const B = rot.y

        const output: string[] = []
        const zbuffer: number[] = []

        for (let i = 0; i < width * height; i++) {
            output[i] = ' '
            zbuffer[i] = 0
        }

        const chars = '.,-~:;=!*#$@'

        const project = (x: number, y: number, z: number) => {
            const cosA = Math.cos(A), sinA = Math.sin(A)
            const cosB = Math.cos(B), sinB = Math.sin(B)

            let tx = x
            let ty = y * cosA - z * sinA
            let tz = y * sinA + z * cosA

            const nx = tx * cosB + tz * sinB
            const nz = -tx * sinB + tz * cosB

            const scale = 10 / (nz + 15)
            const px = Math.floor(width / 2 + nx * scale * 8)
            const py = Math.floor(height / 2 + ty * scale * 4)

            return { px, py, z: nz, scale }
        }

        // Draw cube edges
        for (let i = -1; i <= 1; i += 0.08) {
            for (let j = -1; j <= 1; j += 0.08) {
                // 6 faces
                const faces = [
                    { x: i, y: j, z: -1 },
                    { x: i, y: j, z: 1 },
                    { x: i, y: -1, z: j },
                    { x: i, y: 1, z: j },
                    { x: -1, y: i, z: j },
                    { x: 1, y: i, z: j },
                ]

                faces.forEach((face) => {
                    const { px, py, z } = project(face.x, face.y, face.z)
                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const idx = py * width + px
                        if (z > zbuffer[idx]) {
                            zbuffer[idx] = z
                            const charIdx = Math.floor((z + 2) / 4 * chars.length)
                            output[idx] = chars[Math.min(charIdx, chars.length - 1)]
                        }
                    }
                })
            }
        }

        let result = ''
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                result += output[y * width + x]
            }
            result += '\n'
        }

        return result
    }

    return (
        <pre
            className={`font-mono text-xs leading-none text-dark-1/40 select-none ${className}`}
            style={{ fontSize: `${size / 25}px`, lineHeight: 1.2 }}
        >
            {renderCube()}
        </pre>
    )
}

// ============================================
// 2. MATRIX RAIN (Crypto/Digital)
// ============================================
export const MatrixRain = ({
    width = 60,
    height = 20,
    className = ""
}: {
    width?: number
    height?: number
    className?: string
}) => {
    const [grid, setGrid] = useState<string[][]>([])
    const columnsRef = useRef<number[]>([])

    useEffect(() => {
        // Initialize columns
        columnsRef.current = Array(width).fill(0).map(() => Math.floor(Math.random() * height))

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン₿Ξ◊∞'

        const interval = setInterval(() => {
            const newGrid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '))

            columnsRef.current = columnsRef.current.map((pos, col) => {
                // Draw trail
                for (let i = 0; i < 8; i++) {
                    const row = (pos - i + height) % height
                    if (row >= 0 && row < height) {
                        const opacity = 1 - (i / 8)
                        const char = i === 0
                            ? chars[Math.floor(Math.random() * chars.length)]
                            : chars[Math.floor(Math.random() * chars.length)]
                        newGrid[row][col] = opacity > 0.3 ? char : ' '
                    }
                }

                // Move down
                return (pos + 1) % (height + 10)
            })

            setGrid(newGrid)
        }, 80)

        return () => clearInterval(interval)
    }, [width, height])

    return (
        <pre className={`font-mono text-xs leading-tight text-dark-1/30 select-none overflow-hidden ${className}`}>
            {grid.map((row, i) => (
                <div key={i}>{row.join('')}</div>
            ))}
        </pre>
    )
}

// ============================================
// 3. TERMINAL TYPING EFFECT
// ============================================
export const TerminalTyping = ({
    lines = ["Initializing blockchain...", "Connecting to network...", "Ready."],
    className = ""
}: {
    lines?: string[]
    className?: string
}) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([])
    const [currentLine, setCurrentLine] = useState(0)
    const [currentChar, setCurrentChar] = useState(0)

    useEffect(() => {
        if (currentLine >= lines.length) {
            // Reset after delay
            setTimeout(() => {
                setDisplayedLines([])
                setCurrentLine(0)
                setCurrentChar(0)
            }, 3000)
            return
        }

        if (currentChar < lines[currentLine].length) {
            const timeout = setTimeout(() => {
                setCurrentChar(c => c + 1)
            }, 50 + Math.random() * 50)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => [...prev, lines[currentLine]])
                setCurrentLine(l => l + 1)
                setCurrentChar(0)
            }, 500)
            return () => clearTimeout(timeout)
        }
    }, [currentLine, currentChar, lines])

    return (
        <div className={`font-mono text-sm text-dark-1/50 ${className}`}>
            {displayedLines.map((line, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="text-dark-1/30">{'>'}</span>
                    <span>{line}</span>
                    <span className="text-green-500">✓</span>
                </div>
            ))}
            {currentLine < lines.length && (
                <div className="flex items-center gap-2">
                    <span className="text-dark-1/30">{'>'}</span>
                    <span>{lines[currentLine].slice(0, currentChar)}</span>
                    <span className="animate-pulse">▌</span>
                </div>
            )}
        </div>
    )
}

// ============================================
// 4. ASCII BLOCKCHAIN CHAIN
// ============================================
export const AsciiChain = ({ blocks = 5, className = "" }: { blocks?: number; className?: string }) => {
    const [highlight, setHighlight] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlight(h => (h + 1) % blocks)
        }, 800)
        return () => clearInterval(interval)
    }, [blocks])

    const renderBlock = (index: number) => {
        const isHighlighted = index === highlight
        const char = isHighlighted ? '█' : '▓'
        return `
┌─────────┐
│ ${char}${char}${char}${char}${char}${char}${char} │
│  #${String(index + 1).padStart(3, '0')}  │
│ ${char}${char}${char}${char}${char}${char}${char} │
└─────────┘`
    }

    return (
        <pre className={`font-mono text-xs text-dark-1/40 select-none ${className}`}>
            <div className="flex items-center gap-0">
                {Array(blocks).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center">
                        <span className={highlight === i ? 'text-dark-1/70' : ''}>
                            {renderBlock(i)}
                        </span>
                        {i < blocks - 1 && (
                            <span className="text-dark-1/20">{'══════'}</span>
                        )}
                    </div>
                ))}
            </div>
        </pre>
    )
}

// ============================================
// 5. ASCII NETWORK MESH
// ============================================
export const AsciiNetwork = ({ className = "" }: { className?: string }) => {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => (f + 1) % 10)
        }, 300)
        return () => clearInterval(interval)
    }, [])

    const nodes = ['◉', '◎', '○', '●']
    const connections = ['─', '│', '\\', '/', '╲', '╱']

    const getNode = (x: number, y: number) => {
        const idx = (x + y + frame) % nodes.length
        return nodes[idx]
    }

    const network = `
       ${getNode(0, 0)}───────${getNode(1, 0)}
      ╱│╲     ╱│╲
     ╱ │ ╲   ╱ │ ╲
    ${getNode(0, 1)}──┼──${getNode(1, 1)}──┼──${getNode(2, 1)}
     ╲ │ ╱   ╲ │ ╱
      ╲│╱     ╲│╱
       ${getNode(0, 2)}───────${getNode(1, 2)}
  `

    return (
        <pre className={`font-mono text-sm text-dark-1/30 select-none whitespace-pre ${className}`}>
            {network}
        </pre>
    )
}

// ============================================  
// 6. SIMPLE WAVE ANIMATION
// ============================================
export const AsciiWave = ({ width = 40, className = "" }: { width?: number; className?: string }) => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset(o => (o + 1) % 20)
        }, 100)
        return () => clearInterval(interval)
    }, [])

    const chars = ' ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁'

    const renderWave = () => {
        let result = ''
        for (let i = 0; i < width; i++) {
            const phase = (i + offset) * 0.5
            const idx = Math.floor((Math.sin(phase) + 1) * (chars.length - 1) / 2)
            result += chars[idx]
        }
        return result
    }

    return (
        <pre className={`font-mono text-lg text-dark-1/20 select-none ${className}`}>
            {renderWave()}
        </pre>
    )
}

// ============================================  
// 7. COMING SOON ASCII ART
// ============================================
export const AsciiComingSoon = ({ className = "" }: { className?: string }) => {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => (f + 1) % 4)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    const dots = '.'.repeat(frame + 1)

    const art = `
   ╔═══════════════════════╗
   ║                       ║
   ║    COMING  SOON${dots.padEnd(4, ' ')}   ║
   ║                       ║
   ║    ▓▓▓░░░░░░░  30%    ║
   ║                       ║
   ╚═══════════════════════╝
  `

    return (
        <pre className={`font-mono text-xs text-dark-1/40 select-none whitespace-pre ${className}`}>
            {art}
        </pre>
    )
}

// ============================================  
// 8. ASCII TROPHY ANIMATION (for Buildathons)
// ============================================
export const AsciiTrophy = ({ className = "" }: { className?: string }) => {
    const [sparkle, setSparkle] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSparkle(s => (s + 1) % 4)
        }, 400)
        return () => clearInterval(interval)
    }, [])

    const sparkles = ['✦', '✧', '✦', '✧']
    const s = sparkles[sparkle]

    const trophy = `
          ${s}   ${s}
       ╔═══════╗
       ║ ░░░░░ ║
       ║ ░ ${s} ░ ║
       ║ ░░░░░ ║
       ╚╦═════╦╝
        ║     ║
       ╔╩═════╩╗
       ║  #1  ║
       ╚═══════╝
    `.trim()

    return (
        <pre className={`font-mono text-xs text-dark-1/25 select-none whitespace-pre leading-tight ${className}`}>
            {trophy}
        </pre>
    )
}

// ============================================  
// 9. ASCII BOOK/LEARNING ANIMATION
// ============================================
export const AsciiBook = ({ className = "" }: { className?: string }) => {
    const [page, setPage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(p => (p + 1) % 5)
        }, 600)
        return () => clearInterval(interval)
    }, [])

    const pages = ['│', '╱', '─', '╲', '│']
    const p = pages[page]

    const book = `
       ╭───────────╮
      ╱           ╱│
     ╱  Web3    ╱ │
    ╱     101  ╱  │
   ├─────────┤   ${p}
   │ ════════│  ╱
   │ ═══ ════│ ╱
   │ ════════│╱
   ╰─────────╯
    `.trim()

    return (
        <pre className={`font-mono text-xs text-dark-1/25 select-none whitespace-pre leading-tight ${className}`}>
            {book}
        </pre>
    )
}

// ============================================  
// 10. ASCII NFT GEM ANIMATION
// ============================================
export const AsciiGem = ({ className = "" }: { className?: string }) => {
    const [glow, setGlow] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setGlow(g => (g + 1) % 6)
        }, 300)
        return () => clearInterval(interval)
    }, [])

    const shades = ['░', '▒', '▓', '█', '▓', '▒']
    const g = shades[glow]

    const gem = `
        ╱╲
       ╱${g}${g}╲
      ╱${g}${g}${g}${g}╲
     ╱────────╲
     ╲${g}${g}${g}${g}${g}${g}${g}${g}╱
      ╲${g}${g}${g}${g}${g}${g}╱
       ╲${g}${g}${g}${g}╱
        ╲${g}${g}╱
         ╲╱
    `.trim()

    return (
        <pre className={`font-mono text-xs text-dark-1/25 select-none whitespace-pre leading-tight ${className}`}>
            {gem}
        </pre>
    )
}

// ============================================  
// 11. ASCII ROCKET ANIMATION
// ============================================
export const AsciiRocket = ({ className = "" }: { className?: string }) => {
    const [flame, setFlame] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setFlame(f => (f + 1) % 3)
        }, 150)
        return () => clearInterval(interval)
    }, [])

    const flames = [
        '  ▲\n ▲▲▲\n▲▲▲▲▲',
        ' ▲▲\n▲▲▲▲\n ▲▲▲',
        '▲▲▲\n ▲▲▲▲\n  ▲▲'
    ]

    const rocket = `
      ╱╲
     ╱  ╲
    │ ◉◉ │
    │    │
    │    │
   ╱│    │╲
  ╱ │    │ ╲
  ╲ │    │ ╱
   ╲╰────╯╱
${flames[flame]}
    `.trim()

    return (
        <pre className={`font-mono text-xs text-dark-1/25 select-none whitespace-pre leading-tight ${className}`}>
            {rocket}
        </pre>
    )
}

// ============================================
// 12. HIGH-FIDELITY ISOMETRIC CITY (Buildathon)
// ============================================
export const AsciiIsometricBuild = ({ className = "" }: { className?: string }) => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => f + 1);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const renderIso = () => {
        const width = 28;
        const skyline = Array(width).fill(0).map((_, x) => {
            const h = Math.abs(Math.sin((x + frame * 0.5) * 0.3) * 4) + Math.abs(Math.cos((x - frame * 0.2) * 0.5) * 3);
            return Math.floor(h);
        });

        const chars = [" ", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

        let output = "";
        for (let y = 8; y >= 0; y--) {
            let row = "";
            for (let x = 0; x < width; x++) {
                if (skyline[x] > y) {
                    if ((x + y + frame) % 3 === 0) row += "█";
                    else if ((x + y) % 2 === 0) row += "▓";
                    else row += "▒";
                } else if (skyline[x] === y) {
                    row += chars[Math.min(7, Math.floor((skyline[x] % 1) * 8)) || 7];
                } else {
                    row += " ";
                }
            }
            output += row + "\n";
        }
        return output;
    }

    return (
        <pre className={`font-mono text-xs leading-none text-dark-1/20 select-none whitespace-pre overflow-hidden ${className}`}>
            {renderIso()}
        </pre>
    )
}

// ============================================
// 13. HIGH-FIDELITY ROTATING GLOBE (Learn)
// ============================================
export const AsciiGlobe = ({ className = "" }: { className?: string }) => {
    const [rot, setRot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setRot(r => r + 0.1), 50);
        return () => clearInterval(interval);
    }, []);

    const renderGlobe = () => {
        const R = 8;
        let output = "";

        for (let y = -R; y <= R; y += 1) {
            let row = "";
            const y2 = y * y;
            for (let x = -R * 2.2; x <= R * 2.2; x += 1) {
                const x2 = (x * 0.45) ** 2; // Aspect correction
                if (x2 + y2 <= R * R) {
                    // Sphere point
                    const z = Math.sqrt(R * R - x2 - y2);
                    // Map to longitude to see rotation
                    const lon = Math.atan2(x * 0.45, z) + rot;

                    // Continents (Simulated with noise function or math)
                    const continent = Math.sin(lon * 2) * Math.cos(y * 0.4) + Math.sin(lon + y * 0.5);

                    if (continent > 0.6) row += "█";
                    else if (continent > 0.3) row += "▓";
                    else if (continent > 0) row += "▒";
                    else if (continent > -0.4) row += "·";
                    else row += " "; // Ocean
                } else {
                    row += " ";
                }
            }
            output += row + "\n";
        }
        return output;
    }

    return (
        <pre className={`font-mono text-[10px] leading-[10px] text-dark-1/20 select-none whitespace-pre ${className}`}>
            {renderGlobe()}
        </pre>
    )
}

// ============================================
// 14. ROTATING FLUX CARD (Membership)
// ============================================
export const AsciiFluxCard = ({ className = "" }: { className?: string }) => {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setAngle(a => a + 0.1), 50);
        return () => clearInterval(interval);
    }, []);

    const renderCard = () => {
        const w = 12; // Half width
        const h = 7;  // Half height
        let output = "";

        const cos = Math.cos(angle);

        // Scan grid
        for (let y = -9; y <= 9; y++) {
            let row = "";
            for (let x = -18; x <= 18; x++) {
                // Inverse project: assume simplistic rotation around Y
                // x_screen = x_world * cos(angle)
                // So x_world = x_screen / cos(angle)

                // Avoid singularity
                const effCos = Math.abs(cos) < 0.1 ? 0.1 : cos;
                const x_world = x / effCos;

                // Check bounds of card
                if (Math.abs(x_world) < w && Math.abs(y) < h) {
                    // It's on the card

                    // Lighting/Material effect: shimmer band
                    // Shimmer moves across the card as it rotates
                    const shimmerPos = Math.sin(angle * 2) * w;
                    const distToShimmer = Math.abs(x_world - shimmerPos);

                    // Border check
                    if (Math.abs(x_world) > w - 1 || Math.abs(y) > h - 1) {
                        row += "█"; // Border
                    } else if (distToShimmer < 3) {
                        row += "░"; // Highlight
                    } else {
                        row += ":"; // Body
                    }
                } else {
                    row += " ";
                }
            }
            output += row + "\n";
        }
        return output;
    }

    return (
        <pre className={`font-mono text-[10px] leading-[10px] text-dark-1/20 select-none whitespace-pre ${className}`}>
            {renderCard()}
        </pre>
    )
}
