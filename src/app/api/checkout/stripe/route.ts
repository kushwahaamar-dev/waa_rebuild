import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/store/cartStore';

// Check if we're in demo mode (no API key configured)
const isDemoMode = !process.env.STRIPE_SECRET_KEY;

// Lazy initialization to avoid build-time errors
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2026-01-28.clover',
    });
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

        // DEMO MODE: Redirect to success page with demo flag
        if (isDemoMode) {
            console.log('🎭 DEMO MODE: Simulating Stripe checkout for', items.length, 'items');
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            return NextResponse.json({
                url: `${baseUrl}/merch/success?demo=true&session_id=demo_${Date.now()}`,
                demo: true
            });
        }

        const stripe = getStripe();

        // Build line items for Stripe
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name + (item.size ? ` (${item.size})` : ''),
                    description: item.product.description,
                    images: [
                        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${item.product.image}`,
                    ],
                },
                unit_amount: item.product.price, // Already in cents
            },
            quantity: item.quantity,
        }));

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merch/cancel`,
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 599, // $5.99
                            currency: 'usd',
                        },
                        display_name: 'Standard Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1499, // $14.99
                            currency: 'usd',
                        },
                        display_name: 'Express Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 3,
                            },
                        },
                    },
                },
            ],
            metadata: {
                source: 'waa-merch-store',
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
