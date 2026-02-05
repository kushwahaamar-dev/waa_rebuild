"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAccount } from "wagmi";

interface MembershipContextType {
    isConnected: boolean;
    isMember: boolean;
    isChecking: boolean;
    address: string | undefined;
}

const MembershipContext = createContext<MembershipContextType>({
    isConnected: false,
    isMember: false,
    isChecking: false,
    address: undefined,
});

export function MembershipProvider({ children }: { children: ReactNode }) {
    const { address, isConnected } = useAccount();
    const [mounted, setMounted] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Check NFT ownership via API route
    useEffect(() => {
        async function checkMembership() {
            if (!address || !mounted) {
                setIsMember(false);
                return;
            }

            setIsChecking(true);
            try {
                const response = await fetch(`/api/membership?address=${address}`);
                const data = await response.json();
                setIsMember(data.isMember === true);
                if (data.isMember) {
                    console.log('WAA Member verified! Token ID:', data.tokenId, 'Balance:', data.balance);
                }
            } catch (error) {
                console.error('Error checking membership:', error);
                setIsMember(false);
            } finally {
                setIsChecking(false);
            }
        }

        checkMembership();
    }, [address, mounted]);

    return (
        <MembershipContext.Provider
            value={{
                isConnected: mounted && isConnected,
                isMember,
                isChecking,
                address,
            }}
        >
            {children}
        </MembershipContext.Provider>
    );
}

export function useMembership() {
    return useContext(MembershipContext);
}
