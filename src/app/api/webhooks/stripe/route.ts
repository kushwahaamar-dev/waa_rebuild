import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        return NextResponse.json(
            { error: 'Webhook secret not configured' },
            { status: 500 }
        );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('✅ Payment successful!', {
                sessionId: session.id,
                customerEmail: session.customer_details?.email,
                amountTotal: session.amount_total,
            });

            // TODO: Send confirmation email
            // TODO: Update order in database
            // TODO: Notify admin of new order

            break;
        }

        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('❌ Payment failed:', {
                id: paymentIntent.id,
                error: paymentIntent.last_payment_error?.message,
            });
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
