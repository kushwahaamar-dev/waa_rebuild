"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAccount, useReadContract } from "wagmi";
import { WAA_MEMBERSHIP_CONTRACT, ERC1155_ABI } from "@/lib/wagmi";

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

    // Check NFT ownership - token ID 1 (most common for Manifold claims)
    const { data: balance, isLoading } = useReadContract({
        address: WAA_MEMBERSHIP_CONTRACT,
        abi: ERC1155_ABI,
        functionName: "balanceOf",
        args: address ? [address, BigInt(1)] : undefined,
        query: {
            enabled: !!address && mounted,
        },
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMember = balance !== undefined && balance > BigInt(0);

    return (
        <MembershipContext.Provider
            value={{
                isConnected: mounted && isConnected,
                isMember,
                isChecking: isLoading,
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
