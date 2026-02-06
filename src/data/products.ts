export interface Product {
    id: string;
    name: string;
    description: string;
    price: number; // in cents
    image: string;
    category: 'apparel' | 'accessories' | 'stickers' | 'bundle';
    sizes?: string[];
    inStock: boolean;
    memberExclusive?: boolean;
}

// Member-exclusive Welcome Package (one-time claim)
export const WELCOME_PACKAGE: Product = {
    id: 'member-welcome-package',
    name: 'Member Welcome Package',
    description: 'Exclusive package for WAA members. Includes: WAA Classic Tee, Sticker Pack, and Holographic Sticker. One-time claim.',
    price: 0,
    image: '/images/merch/welcome-package.png',
    category: 'bundle',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    memberExclusive: true,
};

export const products: Product[] = [
    {
        id: 'waa-tshirt-black',
        name: 'WAA Classic Tee - Black',
        description: 'Premium cotton t-shirt with the classic WAA logo. Embrace the future in style.',
        price: 2500, // $25.00
        image: '/images/merch/tshirt-black.png',
        category: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        inStock: true,
    },
    {
        id: 'waa-tshirt-white',
        name: 'WAA Classic Tee - White',
        description: 'Premium cotton t-shirt with the inverted WAA logo. Clean and minimal.',
        price: 2500, // $25.00
        image: '/images/merch/tshirt-white.png',
        category: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        inStock: true,
    },
    {
        id: 'waa-hoodie-black',
        name: 'WAA Essential Hoodie',
        description: 'Cozy heavyweight hoodie with embroidered WAA logo. Perfect for hackathon nights.',
        price: 5500, // $55.00
        image: '/images/merch/hoodie-black.png',
        category: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        inStock: true,
    },
    {
        id: 'waa-cap',
        name: 'WAA Dad Cap',
        description: 'Structured dad cap with embroidered WAA logo. Adjustable strap.',
        price: 2000, // $20.00
        image: '/images/merch/cap.png',
        category: 'accessories',
        inStock: true,
    },
    {
        id: 'waa-beanie',
        name: 'WAA Beanie',
        description: 'Knit beanie with woven WAA patch. Stay warm while building the future.',
        price: 1800, // $18.00
        image: '/images/merch/beanie.png',
        category: 'accessories',
        inStock: true,
    },
    {
        id: 'waa-sticker-pack',
        name: 'WAA Sticker Pack',
        description: 'Pack of 5 vinyl stickers featuring WAA logos and Web3 designs. Laptop approved.',
        price: 800, // $8.00
        image: '/images/merch/stickers.png',
        category: 'stickers',
        inStock: true,
    },
    {
        id: 'waa-holographic-sticker',
        name: 'Holographic WAA Sticker',
        description: 'Limited edition holographic sticker. Catches light like an NFT catches attention.',
        price: 500, // $5.00
        image: '/images/merch/holographic-sticker.png',
        category: 'stickers',
        inStock: true,
    },
    {
        id: 'waa-tote',
        name: 'WAA Canvas Tote',
        description: 'Heavy-duty canvas tote bag. Carry your laptop and dreams in style.',
        price: 1500, // $15.00
        image: '/images/merch/tote.png',
        category: 'accessories',
        inStock: true,
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
    return products.filter(p => p.category === category);
}

export function formatPrice(priceInCents: number): string {
    return `$${(priceInCents / 100).toFixed(2)}`;
}

