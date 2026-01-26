"use client"

import { useEffect } from "react";

export function ConsoleSignature() {
    useEffect(() => {
        const signature = `
%c    
   WAA / WEB3 ACCELERATION ASSOCIATION
   
   Build. Break. Ship.
   
   Interested in how this was built?
   Crafted by Amar (linkedin.com/in/kushwaha-amar)
   Join us: waa.ttu.edu/join

   [ARCHITECTURAL_MINIMALISM_V2.0.0_LOADED]
        `;

        const style = `
            font-family: monospace;
            font-size: 12px;
            font-weight: bold;
            color: #191919;
            background: #f9f9f9;
            padding: 20px;
            border: 1px solid #191919;
            border-radius: 4px;
        `;

        console.log(signature, style);
        console.log("%c Curious? We are hiring builders. ", "background: #000; color: #fff; padding: 5px; border-radius: 2px;");
    }, []);

    return null;
}
