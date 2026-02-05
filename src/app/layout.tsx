import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GridBackground } from "@/components/GridBackground";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WAA - Web3 Acceleration Association",
  description: "Educate. Innovate. Connect. The student-led nonprofit accelerating Web3 adoption at Texas Tech.",
  icons: {
    icon: "/images/waa-logo.png",
    shortcut: "/images/waa-logo.png",
    apple: "/images/waa-logo.png",
  },
};

import { KonamiMatrix } from "@/components/EasterEggs/KonamiMatrix";
import { ConsoleSignature } from "@/components/EasterEggs/ConsoleSignature";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Cart } from "@/components/merch/Cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-light-1 text-dark-1 font-sans selection:bg-dark-1 selection:text-light-1`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ConsoleSignature />
          <KonamiMatrix />
          <GridBackground />
          <div className="relative z-10">
            {children}
          </div>
          <Cart />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
