"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full" />
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full hover:bg-dark-1/10 dark:hover:bg-light-1/10 transition-colors"
            aria-label="Toggle theme"
        >
            {resolvedTheme === 'dark' ? (
                <Moon className="h-[1.2rem] w-[1.2rem] text-dark-1" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] text-dark-1" />
            )}
        </Button>
    )
}
