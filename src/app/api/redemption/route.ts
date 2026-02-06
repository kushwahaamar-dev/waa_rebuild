import { NextRequest, NextResponse } from 'next/server';

const REDEMPTION_KEY_PREFIX = 'waa:redemption:';

// In-memory store for development (resets on restart)
const devRedemptions = new Set<string>();

// Check if wallet has already redeemed
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address')?.toLowerCase();

    if (!address) {
        return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    try {
        let hasRedeemed = false;

        if (process.env.KV_REST_API_URL) {
            // Production: Use Vercel KV
            const { kv } = await import('@vercel/kv');
            hasRedeemed = await kv.exists(`${REDEMPTION_KEY_PREFIX}${address}`) > 0;
        } else {
            // Development: Use in-memory set
            hasRedeemed = devRedemptions.has(address);
        }

        return NextResponse.json({ hasRedeemed, address });
    } catch (error) {
        console.error('Error checking redemption:', error);
        return NextResponse.json({ hasRedeemed: false, address });
    }
}

// Mark wallet as redeemed
export async function POST(request: NextRequest) {
    try {
        const { address } = await request.json();

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        const normalizedAddress = address.toLowerCase();

        if (process.env.KV_REST_API_URL) {
            // Production: Use Vercel KV
            const { kv } = await import('@vercel/kv');
            await kv.set(`${REDEMPTION_KEY_PREFIX}${normalizedAddress}`, {
                redeemedAt: new Date().toISOString(),
                address: normalizedAddress,
            });
        } else {
            // Development: Use in-memory set
            devRedemptions.add(normalizedAddress);
            console.log('[Dev] Marked as redeemed:', normalizedAddress);
        }

        return NextResponse.json({ success: true, address: normalizedAddress });
    } catch (error) {
        console.error('Error marking redemption:', error);
        return NextResponse.json({ error: 'Failed to mark redemption' }, { status: 500 });
    }
}
