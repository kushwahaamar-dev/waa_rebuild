import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const WAA_MEMBERSHIP_CONTRACT = "0x9b931844FbaA55Bd8E709909468DA0aD2be26052" as const;

export const wagmiConfig = createConfig({
    chains: [base],
    connectors: [
        injected({ shimDisconnect: true }),
        coinbaseWallet({ appName: "WAA Merch", appLogoUrl: "https://waatech.xyz/images/logo.png" }),
    ],
    transports: { [base.id]: http() },
    ssr: true,
});

export const ERC1155_ABI = [
    {
        inputs: [{ name: "account", type: "address" }, { name: "id", type: "uint256" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
] as const;
