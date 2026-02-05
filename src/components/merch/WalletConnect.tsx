"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMembership } from "@/context/MembershipContext";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, LogOut, Loader2, Shield, X } from "lucide-react";
import { useState, useEffect } from "react";

export function WalletConnect() {
    const { address, isConnected } = useAccount();
    const { connect, connectors, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const { isMember, isChecking } = useMembership();
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-12 w-48 bg-dark-1/5 rounded-xl animate-pulse" />
        );
    }

    const formatAddress = (addr: string) =>
        `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    if (isConnected && address) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
            >
                {/* Membership Status */}
                {isChecking ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-dark-1/5 rounded-xl">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-mono">Verifying...</span>
                    </div>
                ) : isMember ? (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-xl"
                    >
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-mono text-emerald-700 font-medium">
                            WAA Member
                        </span>
                    </motion.div>
                ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <span className="text-sm font-mono text-amber-700">
                            Not a Member
                        </span>
                    </div>
                )}

                {/* Connected Wallet */}
                <button
                    onClick={() => disconnect()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-dark-1 text-light-1 rounded-xl hover:bg-dark-1/90 transition-colors group"
                >
                    <span className="font-mono text-sm">{formatAddress(address)}</span>
                    <LogOut className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
            </motion.div>
        );
    }

    return (
        <>
            <motion.button
                onClick={() => setShowModal(true)}
                disabled={isPending}
                className="flex items-center gap-3 px-6 py-3 bg-dark-1 text-light-1 rounded-xl hover:bg-dark-1/90 transition-all font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Wallet className="w-5 h-5" />
                )}
                <span>{isPending ? "Connecting..." : "Connect Wallet"}</span>
            </motion.button>

            {/* Wallet Selection Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-1/50 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-light-1 rounded-2xl p-6 w-full max-w-md shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-serif text-dark-1">Connect Wallet</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-dark-1/5 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-dark-1/60 mb-6 text-sm">
                                Connect your wallet to verify WAA membership and unlock free merch.
                            </p>

                            <div className="space-y-3">
                                {connectors.map((connector) => (
                                    <button
                                        key={connector.uid}
                                        onClick={() => {
                                            connect({ connector });
                                            setShowModal(false);
                                        }}
                                        disabled={isPending}
                                        className="w-full flex items-center gap-4 p-4 bg-dark-1/5 hover:bg-dark-1/10 rounded-xl transition-colors text-left group"
                                    >
                                        <div className="w-10 h-10 bg-dark-1/10 rounded-xl flex items-center justify-center">
                                            <WalletIcon connector={connector.name} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-dark-1">{connector.name}</p>
                                            <p className="text-xs text-dark-1/50">
                                                {getConnectorDescription(connector.name)}
                                            </p>
                                        </div>
                                        <Check className="w-5 h-5 text-dark-1/20 group-hover:text-dark-1/40 transition-colors" />
                                    </button>
                                ))}
                            </div>

                            <p className="text-xs text-dark-1/40 mt-6 text-center">
                                By connecting, you agree to our Terms of Service
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function WalletIcon({ connector }: { connector: string }) {
    // Simple text-based icons for different wallets
    const icons: Record<string, string> = {
        "MetaMask": "🦊",
        "Coinbase Wallet": "🔵",
        "WalletConnect": "🔗",
        "Phantom": "👻",
        "Injected": "💳",
    };

    return (
        <span className="text-lg">
            {icons[connector] || "💳"}
        </span>
    );
}

function getConnectorDescription(name: string): string {
    const descriptions: Record<string, string> = {
        "MetaMask": "Browser extension wallet",
        "Coinbase Wallet": "Easy-to-use mobile & web wallet",
        "WalletConnect": "Connect with mobile wallets",
        "Phantom": "Multi-chain wallet for crypto",
        "Injected": "Your browser wallet",
    };

    return descriptions[name] || "Connect your wallet";
}
