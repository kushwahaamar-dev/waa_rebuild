"use client";

import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// WAA Membership NFT Contract on Base
export const WAA_MEMBERSHIP_CONTRACT = "0x9b931844FbaA55Bd8E709909468DA0aD2be26052" as const;

// WalletConnect Project ID - Get from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo";

export const wagmiConfig = createConfig({
    chains: [base],
    connectors: [
        // Injected wallets (MetaMask, Phantom, Rabby, etc.)
        injected({
            shimDisconnect: true,
        }),
        // Coinbase Wallet
        coinbaseWallet({
            appName: "WAA Merch",
            appLogoUrl: "https://waatech.xyz/images/logo.png",
        }),
        // WalletConnect (for mobile wallets)
        walletConnect({
            projectId,
            showQrModal: true,
            metadata: {
                name: "WAA Merch",
                description: "Web3 At Austin Merchandise Store",
                url: "https://waatech.xyz",
                icons: ["https://waatech.xyz/images/logo.png"],
            },
        }),
    ],
    transports: {
        [base.id]: http(),
    },
    ssr: true,
});

// ERC-1155 ABI for balanceOf check
export const ERC1155_ABI = [
    {
        inputs: [
            { name: "account", type: "address" },
            { name: "id", type: "uint256" },
        ],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
] as const;
