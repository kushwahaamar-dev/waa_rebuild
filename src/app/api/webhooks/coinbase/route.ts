import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface CoinbaseWebhookEvent {
    id: string;
    type: string;
    data: {
        id: string;
        code: string;
        pricing: {
            local: {
                amount: string;
                currency: string;
            };
        };
        metadata?: {
            items?: string;
            source?: string;
        };
        timeline: Array<{
            status: string;
            time: string;
        }>;
    };
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
    const computedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    // Ensure both buffers have same length to prevent timing attacks
    if (signature.length !== computedSignature.length) {
        return false;
    }

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(computedSignature)
    );
}

export async function POST(request: NextRequest) {
    const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('COINBASE_WEBHOOK_SECRET is not configured');
        return NextResponse.json(
            { error: 'Webhook not configured' },
            { status: 500 }
        );
    }

    const body = await request.text();
    const signature = request.headers.get('x-cc-webhook-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing signature' },
            { status: 400 }
        );
    }

    // Verify webhook signature
    if (!verifySignature(body, signature, webhookSecret)) {
        console.error('Coinbase webhook signature verification failed');
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    const event: CoinbaseWebhookEvent = JSON.parse(body);

    // Handle the event
    switch (event.type) {
        case 'charge:confirmed': {
            console.log('✅ Crypto payment confirmed!', {
                chargeId: event.data.id,
                code: event.data.code,
                amount: event.data.pricing.local,
            });

            // Parse items from metadata
            if (event.data.metadata?.items) {
                const items = JSON.parse(event.data.metadata.items);
                console.log('Order items:', items);
            }

            // TODO: Send confirmation email
            // TODO: Update order in database
            // TODO: Notify admin of new order

            break;
        }

        case 'charge:pending': {
            console.log('⏳ Crypto payment pending:', event.data.code);
            break;
        }

        case 'charge:failed': {
            console.log('❌ Crypto payment failed:', event.data.code);
            break;
        }

        case 'charge:delayed': {
            console.log('⏰ Crypto payment delayed:', event.data.code);
            break;
        }

        default:
            console.log(`Unhandled Coinbase event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
