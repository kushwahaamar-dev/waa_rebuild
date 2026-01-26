"use client";

export function GridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
            {/* Main Container Width */}
            <div className="w-full max-w-7xl h-full border-l border-r border-dark-1/5 relative">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-100" />

                {/* Crosshairs at geometric centers - optional decorative elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-dark-1/20 -translate-x-px -translate-y-px" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-dark-1/20 translate-x-px -translate-y-px" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-dark-1/20 -translate-x-px translate-y-px" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-dark-1/20 translate-x-px translate-y-px" />
            </div>
        </div>
    );
}
