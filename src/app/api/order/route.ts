import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CartItem } from '@/store/cartStore';
import { formatPrice } from '@/data/products';

// Initialize Resend - Free tier: 3000 emails/month
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email recipients for order notifications
const ADMIN_EMAILS = ['intern@waatech.xyz', 'kushwahaamar2ak5@gmail.com'];

export interface OrderSubmission {
    name: string;
    email: string;
    phone?: string;
    items: CartItem[];
    walletAddress?: string;
}

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, items, walletAddress } = await request.json() as OrderSubmission;

        // Validate required fields
        if (!name || !email || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Name, email, and items are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Calculate totals
        const subtotal = items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );

        // Generate order ID
        const orderId = `WAA-${Date.now().toString(36).toUpperCase()}`;

        // Build order details
        const orderDetailsList = items.map(item =>
            `• ${item.quantity}x ${item.product.name}${item.size ? ` (${item.size})` : ''} - ${formatPrice(item.product.price * item.quantity)}`
        ).join('\n');

        // Check for Welcome Package (free member item)
        const hasFreePackage = items.some(item => item.product.id === 'member-welcome-package');

        const orderSummary = `
🛒 NEW ORDER: ${orderId}
================================

Customer Information:
- Name: ${name}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}
${walletAddress ? `- Wallet: ${walletAddress}` : ''}

Order Details:
${orderDetailsList}

Total: ${formatPrice(subtotal)}
${hasFreePackage ? '\n⭐ Includes Member Welcome Package (complimentary)' : ''}

================================
Order placed: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST
        `.trim();

        // Log the order
        console.log('\n' + orderSummary + '\n');

        // Send email notifications using Resend
        if (resend) {
            try {
                // Send to admin emails
                await resend.emails.send({
                    from: 'WAA Merch <orders@waatech.xyz>',
                    to: ADMIN_EMAILS,
                    subject: `🛒 New Order: ${orderId} from ${name}`,
                    text: orderSummary,
                    html: generateAdminEmailHtml(orderId, name, email, phone, walletAddress, items, subtotal, hasFreePackage),
                });

                // Send confirmation to customer
                await resend.emails.send({
                    from: 'WAA Merch <orders@waatech.xyz>',
                    to: email,
                    subject: `Order Confirmed: ${orderId} - WAA Merch`,
                    text: generateCustomerEmailText(name, orderId, orderDetailsList, subtotal),
                    html: generateCustomerEmailHtml(name, orderId, items, subtotal, hasFreePackage),
                });

                console.log('✅ Order emails sent successfully');
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Continue even if email fails - order is still valid
            }
        } else {
            console.log('⚠️ RESEND_API_KEY not configured - emails not sent');
        }

        return NextResponse.json({
            success: true,
            message: 'Order submitted successfully! Check your email for confirmation.',
            orderId,
        });

    } catch (error) {
        console.error('Order submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit order' },
            { status: 500 }
        );
    }
}

// Generate HTML email for admins
function generateAdminEmailHtml(
    orderId: string,
    name: string,
    email: string,
    phone: string | undefined,
    walletAddress: string | undefined,
    items: CartItem[],
    subtotal: number,
    hasFreePackage: boolean
): string {
    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                ${item.product.name}${item.size ? ` <span style="color: #666;">(${item.size})</span>` : ''}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.product.price * item.quantity)}</td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #1a1a1a; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🛒 New Order: ${orderId}</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 24px; border: 1px solid #eee;">
        <h2 style="margin-top: 0; color: #333;">Customer Details</h2>
        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
        ${walletAddress ? `<p style="margin: 8px 0;"><strong>Wallet:</strong> <code style="background: #eee; padding: 2px 6px; border-radius: 4px;">${walletAddress}</code></p>` : ''}
    </div>

    <div style="padding: 24px; border: 1px solid #eee; border-top: none;">
        <h2 style="margin-top: 0; color: #333;">Order Items</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: #f5f5f5;">
                    <th style="padding: 12px; text-align: left;">Item</th>
                    <th style="padding: 12px; text-align: center;">Qty</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" style="padding: 16px; font-weight: bold; font-size: 18px;">Total</td>
                    <td style="padding: 16px; text-align: right; font-weight: bold; font-size: 18px;">${formatPrice(subtotal)}</td>
                </tr>
            </tfoot>
        </table>
        ${hasFreePackage ? '<p style="color: #059669; margin-top: 16px;">⭐ Includes Member Welcome Package (complimentary)</p>' : ''}
    </div>

    <div style="background: #1a1a1a; color: #999; padding: 16px; border-radius: 0 0 12px 12px; text-align: center; font-size: 12px;">
        Order placed at ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST
    </div>
</body>
</html>`;
}

// Generate plain text email for customers
function generateCustomerEmailText(name: string, orderId: string, orderDetails: string, subtotal: number): string {
    return `
Hi ${name}!

Thank you for your order! We've received your request.

Order ID: ${orderId}

${orderDetails}

Total: ${formatPrice(subtotal)}

WHAT'S NEXT?
- For paid items: You'll receive payment instructions shortly
- For pickup: We'll email you the pickup location and time

Questions? Reply to this email or contact us at hello@waatech.xyz

– The WAA Team
    `.trim();
}

// Generate HTML email for customers
function generateCustomerEmailHtml(
    name: string,
    orderId: string,
    items: CartItem[],
    subtotal: number,
    hasFreePackage: boolean
): string {
    const itemsHtml = items.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee;">
            <span>${item.quantity}x ${item.product.name}${item.size ? ` (${item.size})` : ''}</span>
            <span style="font-weight: 500;">${formatPrice(item.product.price * item.quantity)}</span>
        </div>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
    <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: #1a1a1a; color: white; padding: 32px; text-align: center;">
            <h1 style="margin: 0 0 8px 0; font-size: 28px;">Order Confirmed! ✓</h1>
            <p style="margin: 0; opacity: 0.7; font-size: 14px;">Order ID: ${orderId}</p>
        </div>

        <div style="padding: 32px;">
            <p style="font-size: 18px; margin-top: 0;">Hi ${name}! 👋</p>
            <p style="color: #666; line-height: 1.6;">Thank you for your order. We've received your request and will be in touch shortly.</p>

            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Your Items</h3>
                ${itemsHtml}
                <div style="display: flex; justify-content: space-between; padding-top: 16px; margin-top: 8px; border-top: 2px solid #1a1a1a;">
                    <span style="font-weight: bold; font-size: 18px;">Total</span>
                    <span style="font-weight: bold; font-size: 18px;">${formatPrice(subtotal)}</span>
                </div>
            </div>

            ${hasFreePackage ? `
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px;">
                <p style="margin: 0; font-weight: 500;">🎁 Your Member Welcome Package is included!</p>
            </div>
            ` : ''}

            <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h3 style="margin-top: 0; color: #92400e;">What's Next?</h3>
                <ul style="color: #92400e; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>For paid items, payment instructions coming soon</li>
                    <li>We'll email pickup location and time</li>
                </ul>
            </div>

            <p style="color: #666; font-size: 14px; text-align: center;">
                Questions? Reply to this email or contact<br/>
                <a href="mailto:hello@waatech.xyz" style="color: #1a1a1a;">hello@waatech.xyz</a>
            </p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">Web3 At Austin • waatech.xyz</p>
        </div>
    </div>
</body>
</html>`;
}
