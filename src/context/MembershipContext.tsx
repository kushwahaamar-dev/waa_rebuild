"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { WAA_MEMBERSHIP_CONTRACT, ERC1155_ABI } from "@/lib/wagmi";

// Token IDs to check - Manifold uses the claim page ID
const TOKEN_IDS_TO_CHECK = [
    BigInt("4147314928"), // Manifold claim page ID from URL
    BigInt(1),            // Fallback token ID
];

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

    // Check NFT ownership for multiple token IDs
    const { data: balances, isLoading } = useReadContracts({
        contracts: address
            ? TOKEN_IDS_TO_CHECK.map((tokenId) => ({
                address: WAA_MEMBERSHIP_CONTRACT,
                abi: ERC1155_ABI,
                functionName: "balanceOf" as const,
                args: [address, tokenId] as const,
            }))
            : [],
        query: {
            enabled: !!address && mounted,
        },
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Check if any of the token balances are > 0
    const isMember = balances?.some(
        (result) => result.status === "success" && (result.result as bigint) > BigInt(0)
    ) ?? false;

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

