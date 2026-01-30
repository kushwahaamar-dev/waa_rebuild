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
// 11. ASCII ROCKET ANIMATION (Premium)
// ============================================
export const AsciiRocket = ({ className = "" }: { className?: string }) => {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => (f + 1) % 6)
        }, 100) // Faster, smoother animation
        return () => clearInterval(interval)
    }, [])

    // Refined flame patterns with gradient effect
    const flames = [
        ['   △   ', '  ▲▲▲  ', ' ▲ ▲ ▲ '],
        ['  △△△  ', ' ▲ ▲ ▲ ', '  ▲▲▲  '],
        [' △ △ △ ', '  ▲▲▲  ', '   △   '],
        ['  △△△  ', ' ▲▲▲▲▲ ', '  △ △  '],
        ['  ▲▲▲  ', ' △ ▲ △ ', '   △   '],
        [' ▲ ▲ ▲ ', '  ▲▲▲  ', '  △△△  '],
    ]

    const rocketBody = `
    ╱╲    
   ╱◉◉╲   
  ╱    ╲  
 │      │ 
 │  ══  │ 
 │      │ 
╱│      │╲
╲└──────┘╱`

    const currentFlame = flames[frame]
    const rocket = rocketBody + '\n' + currentFlame.join('\n')

    return (
        <pre className={`font-mono text-[11px] text-dark-1/30 select-none whitespace-pre leading-[1.1] ${className}`}>
            {rocket.trim()}
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
        }, 100); // Smoother timing
        return () => clearInterval(interval);
    }, []);

    const renderIso = () => {
        const width = 32;
        const height = 12;
        const output: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));

        // Building definitions with varied heights and widths
        const buildings = [
            { x: 2, w: 4, h: 8 },
            { x: 7, w: 3, h: 5 },
            { x: 11, w: 5, h: 10 },
            { x: 17, w: 4, h: 7 },
            { x: 22, w: 3, h: 4 },
            { x: 26, w: 4, h: 9 },
        ];

        // Draw buildings
        buildings.forEach((b, idx) => {
            for (let y = height - 1; y >= height - b.h; y--) {
                for (let x = b.x; x < b.x + b.w && x < width; x++) {
                    const row = y;
                    const buildingY = height - y;

                    // Building edges
                    if (x === b.x || x === b.x + b.w - 1) {
                        output[row][x] = '│';
                    } else if (row === height - b.h) {
                        // Roof
                        output[row][x] = '▀';
                    } else {
                        // Windows with animation
                        const windowLit = ((x + y + frame + idx) % 4) < 2;
                        if ((buildingY) % 2 === 0 && (x - b.x) % 2 === 1) {
                            output[row][x] = windowLit ? '▓' : '░';
                        } else {
                            output[row][x] = '▒';
                        }
                    }
                }
            }
        });

        // Animated construction crane
        const craneX = 14 + Math.sin(frame * 0.1) * 2;
        const craneY = 0;
        if (craneY >= 0 && craneY < height && craneX >= 0 && craneX < width) {
            output[craneY][Math.floor(craneX)] = '┬';
            if (craneY + 1 < height) output[craneY + 1][Math.floor(craneX)] = '│';
        }

        // Ground line
        for (let x = 0; x < width; x++) {
            output[height - 1][x] = output[height - 1][x] === ' ' ? '─' : output[height - 1][x];
        }

        // Animated sparkle (construction activity)
        const sparkles = ['✦', '✧', '·', '⊹'];
        for (let i = 0; i < 3; i++) {
            const sx = (frame * 2 + i * 11) % width;
            const sy = (frame + i * 3) % (height - 2);
            if (output[sy][sx] === ' ' || output[sy][sx] === '·') {
                output[sy][sx] = sparkles[(frame + i) % sparkles.length];
            }
        }

        return output.map(row => row.join('')).join('\n');
    }

    return (
        <pre className={`font-mono text-xs leading-none text-dark-1/25 select-none whitespace-pre overflow-hidden ${className}`}>
            {renderIso()}
        </pre>
    )
}

// ============================================
// 13. HIGH-FIDELITY ROTATING GLOBE (Premium)
// ============================================
export const AsciiGlobe = ({ className = "" }: { className?: string }) => {
    const [rot, setRot] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setRot(r => r + 0.04), 40); // Smoother, slower rotation
        return () => clearInterval(interval);
    }, []);

    const renderGlobe = () => {
        const R = 9;
        let output = "";

        for (let y = -R; y <= R; y += 1) {
            let row = "";
            const y2 = y * y;
            for (let x = -R * 2.2; x <= R * 2.2; x += 1) {
                const x2 = (x * 0.45) ** 2;
                if (x2 + y2 <= R * R) {
                    const z = Math.sqrt(R * R - x2 - y2);
                    const lon = Math.atan2(x * 0.45, z) + rot;
                    const lat = Math.asin(y / R);

                    // Enhanced continent pattern with latitude bands
                    const continent =
                        Math.sin(lon * 3) * Math.cos(lat * 2.5) * 0.7 +
                        Math.sin(lon * 1.5 + lat) * 0.5 +
                        Math.cos(lon * 2 - lat * 2) * 0.3;

                    // Gradient from land to ocean
                    if (continent > 0.7) row += "█";
                    else if (continent > 0.4) row += "▓";
                    else if (continent > 0.15) row += "▒";
                    else if (continent > -0.1) row += "░";
                    else if (continent > -0.5) row += "·";
                    else row += " ";
                } else {
                    // Orbit ring hint at equator
                    if (Math.abs(y) < 1 && Math.abs(x) > R * 1.8 && Math.abs(x) < R * 2.2) {
                        row += "·";
                    } else {
                        row += " ";
                    }
                }
            }
            output += row + "\n";
        }
        return output;
    }

    return (
        <pre className={`font-mono text-[10px] leading-[10px] text-dark-1/25 select-none whitespace-pre ${className}`}>
            {renderGlobe()}
        </pre>
    )
}

// ============================================
// 14. ROTATING FLUX CARD (Premium Holographic)
// ============================================
export const AsciiFluxCard = ({ className = "" }: { className?: string }) => {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setAngle(a => a + 0.03), 30); // Smoother rotation
        return () => clearInterval(interval);
    }, []);

    const renderCard = () => {
        const w = 14; // Half width
        const h = 8;  // Half height
        let output = "";

        const cos = Math.cos(angle);
        const shimmerSpeed = angle * 3;

        // Scan grid with finer detail
        for (let y = -10; y <= 10; y++) {
            let row = "";
            for (let x = -24; x <= 24; x++) {
                // Avoid singularity
                const effCos = Math.abs(cos) < 0.1 ? (cos < 0 ? -0.1 : 0.1) : cos;
                const x_world = x / effCos;

                // Check bounds of card
                if (Math.abs(x_world) < w && Math.abs(y) < h) {
                    // Multiple shimmer bands for holographic effect
                    const shimmer1 = Math.sin(shimmerSpeed + x_world * 0.3) * w;
                    const shimmer2 = Math.sin(shimmerSpeed * 0.7 + x_world * 0.5 + Math.PI) * w;
                    const distToShimmer1 = Math.abs(x_world - shimmer1);
                    const distToShimmer2 = Math.abs(x_world - shimmer2);

                    // Border with rounded corners hint
                    const xEdge = Math.abs(x_world) > w - 1.2;
                    const yEdge = Math.abs(y) > h - 1.2;
                    const corner = xEdge && yEdge;

                    if (corner) {
                        row += "╭╮╰╯"[Math.floor(Math.random() * 4)] === "a" ? "·" : "░";
                    } else if (xEdge || yEdge) {
                        row += "█"; // Border
                    } else if (distToShimmer1 < 2) {
                        // Primary rainbow shimmer
                        const chars = "░▒▓█";
                        row += chars[Math.floor(distToShimmer1 / 0.5)];
                    } else if (distToShimmer2 < 1.5) {
                        // Secondary shimmer
                        row += "░";
                    } else {
                        // Card body with subtle texture
                        const texture = ((x_world + y) * 0.5) % 2 < 1 ? "·" : ":";
                        row += texture;
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
        <pre className={`font-mono text-[9px] leading-[9px] text-dark-1/25 select-none whitespace-pre ${className}`}>
            {renderCard()}
        </pre>
    )
}


// ============================================
// 15. COLLEGE.XYZ PATHWAY ANIMATION (Premium)
// ============================================
export const AsciiCollegeXYZ = ({ className = "" }: { className?: string }) => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => (f + 1) % 60);
        }, 80); // Smoother animation timing
        return () => clearInterval(interval);
    }, []);

    const renderPathways = () => {
        const width = 36;
        const height = 20;
        const output: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));

        // Central hub position
        const centerX = 6;
        const centerY = 10;

        // Industry destinations with visual hierarchy
        const nodes = [
            { x: 30, y: 3, label: '◆', pulse: 0 },    // Top right - Major
            { x: 32, y: 10, label: '◆', pulse: 1 },   // Right - Major
            { x: 30, y: 17, label: '◆', pulse: 2 },   // Bottom right - Major
            { x: 22, y: 1, label: '○', pulse: 3 },    // Top mid
            { x: 22, y: 19, label: '○', pulse: 4 },   // Bottom mid
        ];

        // Draw smooth bezier-like pathways
        nodes.forEach((node, idx) => {
            const pulsePhase = ((frame + idx * 12) % 60) / 60;
            const steps = 30;

            for (let i = 0; i <= steps; i++) {
                const t = i / steps;

                // Bezier curve for smoother paths
                const controlX = (centerX + node.x) / 2 + (idx % 2 === 0 ? 4 : -2);
                const controlY = (centerY + node.y) / 2;

                // Quadratic bezier
                const x = Math.round((1 - t) * (1 - t) * centerX + 2 * (1 - t) * t * controlX + t * t * node.x);
                const y = Math.round((1 - t) * (1 - t) * centerY + 2 * (1 - t) * t * controlY + t * t * node.y);

                if (x >= 0 && x < width && y >= 0 && y < height) {
                    // Wave-based pulse animation
                    const wavePos = (Math.sin((t - pulsePhase) * Math.PI * 4) + 1) / 2;
                    const dist = Math.abs(t - pulsePhase);

                    if (dist < 0.08 || (dist > 0.92 && pulsePhase < 0.08)) {
                        output[y][x] = '●';
                    } else if (dist < 0.15) {
                        output[y][x] = '◉';
                    } else if (dist < 0.25) {
                        output[y][x] = '○';
                    } else {
                        // Gradient intensity for path
                        const pathChar = t < 0.3 ? '·' : t < 0.7 ? '∙' : '·';
                        if (output[y][x] === ' ') output[y][x] = pathChar;
                    }
                }
            }

            // Draw destination node with glow
            if (node.x < width && node.y >= 0 && node.y < height) {
                output[node.y][node.x] = node.label;
                // Subtle glow around major nodes
                if (node.label === '◆') {
                    if (node.x - 1 >= 0 && output[node.y][node.x - 1] === ' ') output[node.y][node.x - 1] = '·';
                    if (node.x + 1 < width && output[node.y][node.x + 1] === ' ') output[node.y][node.x + 1] = '·';
                }
            }
        });

        // Draw refined central hub - college.xyz logo hint
        const hubPulse = Math.sin(frame * 0.2) > 0;
        output[centerY][centerX] = hubPulse ? '◉' : '◎';

        // Hub crosshairs
        const crossChars = '─│┌┐└┘';
        if (centerY > 0) output[centerY - 1][centerX] = '│';
        if (centerY < height - 1) output[centerY + 1][centerX] = '│';
        if (centerX > 0) output[centerY][centerX - 1] = '─';
        if (centerX < width - 1) output[centerY][centerX + 1] = '─';

        // Corner accents
        if (centerY > 0 && centerX > 0) output[centerY - 1][centerX - 1] = '┌';
        if (centerY > 0 && centerX < width - 1) output[centerY - 1][centerX + 1] = '┐';
        if (centerY < height - 1 && centerX > 0) output[centerY + 1][centerX - 1] = '└';
        if (centerY < height - 1 && centerX < width - 1) output[centerY + 1][centerX + 1] = '┘';

        // Ambient particles - minimal and elegant
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            const angle = (frame * 0.05 + i * (Math.PI * 2 / particleCount));
            const radius = 8 + Math.sin(frame * 0.1 + i) * 2;
            const px = Math.round(centerX + Math.cos(angle) * radius);
            const py = Math.round(centerY + Math.sin(angle) * (radius * 0.5));
            if (px >= 0 && px < width && py >= 0 && py < height && output[py][px] === ' ') {
                output[py][px] = '✧';
            }
        }

        return output.map(row => row.join('')).join('\n');
    };

    return (
        <pre className={`font-mono text-xs leading-tight text-dark-1/30 select-none whitespace-pre ${className}`}>
            {renderPathways()}
        </pre>
    );
}

