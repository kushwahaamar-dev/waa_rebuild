import { NextRequest, NextResponse } from 'next/server';
import { CartItem } from '@/store/cartStore';

// Coinbase Commerce API endpoint
const COINBASE_COMMERCE_API = 'https://api.commerce.coinbase.com';

// Check if we're in demo mode (no API key configured)
const isDemoMode = !process.env.COINBASE_COMMERCE_API_KEY;

interface CoinbaseChargeResponse {
    data: {
        id: string;
        hosted_url: string;
        code: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const { items } = await request.json() as { items: CartItem[] };

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'No items in cart' },
                { status: 400 }
            );
        }

        // Calculate total
        const subtotal = items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
        const shipping = 599; // $5.99 flat rate
        const total = subtotal + shipping;

        // DEMO MODE: Redirect to success page with demo flag
        if (isDemoMode) {
            console.log('🎭 DEMO MODE: Simulating Coinbase checkout for', items.length, 'items');
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            return NextResponse.json({
                url: `${baseUrl}/merch/success?demo=true&charge_id=demo_crypto_${Date.now()}`,
                demo: true
            });
        }

        // Build item description
        const description = items
            .map(item => `${item.quantity}x ${item.product.name}${item.size ? ` (${item.size})` : ''}`)
            .join(', ');

        // Create Coinbase Commerce charge
        const response = await fetch(`${COINBASE_COMMERCE_API}/charges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!,
                'X-CC-Version': '2018-03-22',
            },
            body: JSON.stringify({
                name: 'WAA Merch Order',
                description: description,
                pricing_type: 'fixed_price',
                local_price: {
                    amount: (total / 100).toFixed(2), // Convert cents to dollars
                    currency: 'USD',
                },
                metadata: {
                    items: JSON.stringify(items.map(item => ({
                        id: item.product.id,
                        name: item.product.name,
                        size: item.size,
                        quantity: item.quantity,
                        price: item.product.price,
                    }))),
                    source: 'waa-merch-store',
                },
                redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merch/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merch/cancel`,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Coinbase Commerce error:', errorData);
            return NextResponse.json(
                { error: 'Failed to create crypto checkout' },
                { status: 500 }
            );
        }

        const data: CoinbaseChargeResponse = await response.json();

        return NextResponse.json({ url: data.data.hosted_url });
    } catch (error) {
        console.error('Crypto checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create crypto checkout session' },
            { status: 500 }
        );
    }
}
