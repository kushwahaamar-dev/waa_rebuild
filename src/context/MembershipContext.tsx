"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useAccount } from "wagmi";

interface MembershipContextType {
    isConnected: boolean;
    isMember: boolean;
    isChecking: boolean;
    address: string | undefined;
    hasRedeemed: boolean;
    markAsRedeemed: () => Promise<void>;
}

const MembershipContext = createContext<MembershipContextType>({
    isConnected: false,
    isMember: false,
    isChecking: false,
    address: undefined,
    hasRedeemed: false,
    markAsRedeemed: async () => { },
});

export function MembershipProvider({ children }: { children: ReactNode }) {
    const { address, isConnected } = useAccount();
    const [mounted, setMounted] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [hasRedeemed, setHasRedeemed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Check NFT ownership and redemption status via API routes
    useEffect(() => {
        async function checkMembershipAndRedemption() {
            if (!address || !mounted) {
                setIsMember(false);
                setHasRedeemed(false);
                return;
            }

            setIsChecking(true);
            try {
                // Check membership and redemption in parallel
                const [membershipRes, redemptionRes] = await Promise.all([
                    fetch(`/api/membership?address=${address}`),
                    fetch(`/api/redemption?address=${address}`),
                ]);

                const membershipData = await membershipRes.json();
                const redemptionData = await redemptionRes.json();

                setIsMember(membershipData.isMember === true);
                setHasRedeemed(redemptionData.hasRedeemed === true);

                if (membershipData.isMember) {
                    console.log('WAA Member verified!', redemptionData.hasRedeemed ? '(Package already redeemed)' : '(Package available)');
                }
            } catch (error) {
                console.error('Error checking membership:', error);
                setIsMember(false);
                setHasRedeemed(false);
            } finally {
                setIsChecking(false);
            }
        }

        checkMembershipAndRedemption();
    }, [address, mounted]);

    // Mark package as redeemed
    const markAsRedeemed = useCallback(async () => {
        if (!address) return;

        try {
            await fetch('/api/redemption', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address }),
            });
            setHasRedeemed(true);
        } catch (error) {
            console.error('Error marking as redeemed:', error);
        }
    }, [address]);

    return (
        <MembershipContext.Provider
            value={{
                isConnected: mounted && isConnected,
                isMember,
                isChecking,
                address,
                hasRedeemed,
                markAsRedeemed,
            }}
        >
            {children}
        </MembershipContext.Provider>
    );
}

export function useMembership() {
    return useContext(MembershipContext);
}

