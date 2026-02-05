// POAP Events Data for Texas Tech Blockchain Club
// Collection: https://collections.poap.xyz/collections/texas-tech-blockchain-club/5371
// 
// To add POAP images: 
// 1. Go to https://poap.gallery/event/[DROP_ID]
// 2. Right-click the POAP image and copy the image URL
// 3. Add it to the `image` field for that event

export interface POAPEvent {
    id: number;
    name: string;
    date: string;
    collectors: number;
    year: number;
    image?: string; // Optional: direct URL to POAP image
}

// All POAP events from the Texas Tech Blockchain Club collection
export const poapEvents: POAPEvent[] = [
    // 2026
    { id: 225036, name: "General Meeting", date: "Jan 29, 2026", collectors: 5, year: 2026 },

    // 2025 (Fall)
    { id: 214031, name: "WAA's GM", date: "Nov 12, 2025", collectors: 14, year: 2025 },
    { id: 211975, name: "Solana Across Campuses", date: "Oct 29, 2025", collectors: 528, year: 2025 },
    { id: 209397, name: "Crypto and Ice Cream", date: "Oct 7, 2025", collectors: 3, year: 2025 },
    { id: 203030, name: "WAA Tabling Event", date: "Sep 8, 2025", collectors: 1, year: 2025 },
    { id: 201187, name: "General Meeting (gm)", date: "Sep 3, 2025", collectors: 19, year: 2025 },

    // 2025 (Spring)
    { id: 189970, name: "Sui Office Hours p3", date: "May 13, 2025", collectors: 2, year: 2025 },
    { id: 189832, name: "House of ZK x N3XUS", date: "May 7, 2025", collectors: 5, year: 2025 },
    { id: 189737, name: "Sui Office Hours p2", date: "May 5, 2025", collectors: 4, year: 2025 },
    { id: 189738, name: "Permissionless Info Sesh", date: "May 5, 2025", collectors: 13, year: 2025 },
    { id: 189621, name: "W⋆A⋆P X CHIPPED", date: "Apr 30, 2025", collectors: 6, year: 2025 },
    { id: 189320, name: "WAA @ EAB Dinner", date: "Apr 23, 2025", collectors: 21, year: 2025 },
    { id: 188911, name: "Sui Office Hours", date: "Apr 17, 2025", collectors: 0, year: 2025 },
    { id: 188837, name: "The Future of Law w/ @thedefidefender", date: "Apr 16, 2025", collectors: 15, year: 2025 },
    { id: 188838, name: "This ain't our first Rodeo", date: "Apr 16, 2025", collectors: 11, year: 2025 },
    { id: 188880, name: "What are NFTs?!!!", date: "Apr 16, 2025", collectors: 6, year: 2025 },
    { id: 188749, name: "Bitcoin Mining w/ Galaxy", date: "Apr 15, 2025", collectors: 20, year: 2025 },
    { id: 188669, name: "Crypto is The Future w/ Sergito", date: "Apr 14, 2025", collectors: 11, year: 2025 },
    { id: 188591, name: "Sui Workshop (3)", date: "Apr 11, 2025", collectors: 7, year: 2025 },
    { id: 188524, name: "Colosseum Info Sesh", date: "Apr 9, 2025", collectors: 15, year: 2025 },
    { id: 188446, name: "Open your 1st Wallet!!", date: "Apr 9, 2025", collectors: 6, year: 2025 },
    { id: 188447, name: "Sonic Info Sesh", date: "Apr 8, 2025", collectors: 6, year: 2025 },
    { id: 188445, name: "Web3 & Ice Cream", date: "Apr 8, 2025", collectors: 8, year: 2025 },
    { id: 188234, name: "WHaT EveN iS WEB3?!!!", date: "Apr 2, 2025", collectors: 9, year: 2025 },
    { id: 188150, name: "Web3 w/ BoredElonMusk", date: "Apr 1, 2025", collectors: 15, year: 2025 },
    { id: 188149, name: "LUKSO Technical Workshop (2)", date: "Apr 1, 2025", collectors: 10, year: 2025 },
    { id: 188043, name: "House of ZK | Workshop", date: "Mar 26, 2025", collectors: 9, year: 2025 },
    { id: 187968, name: "Lukso Workshop (1)", date: "Mar 24, 2025", collectors: 7, year: 2025 },
    { id: 187740, name: "Sui Workshop (2)", date: "Mar 20, 2025", collectors: 7, year: 2025 },
    { id: 187129, name: "Solana Workshop (1)", date: "Mar 13, 2025", collectors: 12, year: 2025 },
    { id: 186993, name: "N3XUS: IRL Info Sesh", date: "Mar 12, 2025", collectors: 20, year: 2025 },
    { id: 186764, name: "Sui Workshop (1)", date: "Mar 11, 2025", collectors: 14, year: 2025 },
    { id: 186575, name: "N3XUS: Buildathon Info Sesh", date: "Mar 10, 2025", collectors: 15, year: 2025 },
    { id: 186311, name: "Campfire Kegger", date: "Mar 1-2, 2025", collectors: 25, year: 2025 },
    { id: 185456, name: "Galentines with W⋆A⋆P", date: "Feb 12, 2025", collectors: 4, year: 2025 },
    { id: 185358, name: "Memecoin Monday w/ hype", date: "Feb 10, 2025", collectors: 11, year: 2025 },
    { id: 184754, name: "Coffee and Yap", date: "Jan 29, 2025", collectors: 10, year: 2025 },
    { id: 184681, name: "Sonic & Sodas", date: "Jan 28, 2025", collectors: 16, year: 2025 },
    { id: 184261, name: "WAA's 3rd GM", date: "Jan 22, 2025", collectors: 20, year: 2025 },

    // 2024 (Fall)
    { id: 181940, name: "Chipped Girls Night", date: "Nov 13, 2024", collectors: 23, year: 2024 },
    { id: 180028, name: "WAA x MBC POAP", date: "Nov 8, 2024", collectors: 11, year: 2024 },
    { id: 180026, name: "WAA takes over Michigan", date: "Nov 8, 2024", collectors: 10, year: 2024 },
    { id: 179793, name: "Advancing Blockchain @ Texas Tech - a Meeting with the Provost", date: "Nov 6, 2024", collectors: 0, year: 2024 },
    { id: 179686, name: "WAA Movie Night", date: "Nov 4, 2024", collectors: 8, year: 2024 },
    { id: 179562, name: "Solana Bootcamp Day2", date: "Oct 31, 2024", collectors: 12, year: 2024 },
    { id: 179447, name: "Solana Bootcamp Day1", date: "Oct 29, 2024", collectors: 15, year: 2024 },
    { id: 179318, name: "Defi Bootcamp Day 2", date: "Oct 24, 2024", collectors: 4, year: 2024 },
    { id: 179244, name: "Defi Bootcamp Day 1", date: "Oct 22, 2024", collectors: 9, year: 2024 },
    { id: 178832, name: "Beyond the Campus Career Fair: How to Find Jobs that Actually Hire", date: "Oct 9, 2024", collectors: 10, year: 2024 },
    { id: 178624, name: "Jeopardy Night", date: "Oct 2, 2024", collectors: 12, year: 2024 },
    { id: 178396, name: "Lets Talk Web3", date: "Sep 25, 2024", collectors: 5, year: 2024 },
    { id: 178164, name: "Starting Your Journey in Web3 (Workshop)", date: "Sep 18, 2024", collectors: 14, year: 2024 },
    { id: 178007, name: "WAA @ HackWesTx", date: "Sep 15, 2024", collectors: 9, year: 2024 },
    { id: 177896, name: "HackWesTX Hacker", date: "Sep 14-15, 2024", collectors: 95, year: 2024 },
    { id: 177601, name: "WAA's 2nd GM ft. Bankless Academy", date: "Sep 4, 2024", collectors: 17, year: 2024 },

    // 2024 (Spring)
    { id: 172696, name: "Your Future with Blockchain a Q&A Pannel", date: "Apr 22, 2024", collectors: 18, year: 2024 },
    { id: 169036, name: "Defi Basics Workshop", date: "Feb 29, 2024", collectors: 14, year: 2024 },
    { id: 169034, name: "Web3 & Ice Cream", date: "Feb 27, 2024", collectors: 6, year: 2024 },
    { id: 167940, name: "WAA's 1st Workshop", date: "Feb 8, 2024", collectors: 20, year: 2024 },
    { id: 167419, name: "WAA'S FIRST GM", date: "Jan 29, 2024", collectors: 35, year: 2024 },
];

// Get total collectors across all events
export const getTotalCollectors = () =>
    poapEvents.reduce((sum, event) => sum + event.collectors, 0);

// Get events by year
export const getEventsByYear = (year: number) =>
    poapEvents.filter(event => event.year === year);

// Get unique years
export const getYears = () =>
    [...new Set(poapEvents.map(event => event.year))].sort((a, b) => b - a);

// Get POAP drop URL
export const getPoapDropUrl = (eventId: number) =>
    `https://poap.gallery/event/${eventId}`;

// Get POAP image URL - uses the drops.poap.xyz CDN
export const getPoapImageUrl = (eventId: number) =>
    `https://assets.poap.xyz/${eventId}.png`;
