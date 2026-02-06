import { NextRequest, NextResponse } from 'next/server';
import { CartItem } from '@/store/cartStore';
import { formatPrice } from '@/data/products';
import nodemailer from 'nodemailer';

// Email recipients
const ADMIN_EMAILS = ['intern@waatech.xyz', 'kushwahaamar2ak5@gmail.com'];

// Config using Gmail (requires App Password)
// How to get App Password:
// 1. Go to Google Account > Security
// 2. Enable 2-Step Verification
// 3. Search for "App Passwords"
// 4. Create one named "WAA Merch"
// 5. Use that 16-character password here
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your gmail: kushwahaamar2ak5@gmail.com
        pass: process.env.EMAIL_PASS, // Your App Password
    },
});

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

        // Check for Welcome Package
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

        console.log('\n' + orderSummary + '\n');

        // Send email notifications
        try {
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                console.warn('⚠️ EMAIL_USER or EMAIL_PASS missing. Emails will not be sent.');
            } else {
                // Admin Email
                await transporter.sendMail({
                    from: `"WAA Merch" <${process.env.EMAIL_USER}>`,
                    to: ADMIN_EMAILS.join(', '),
                    subject: `🛒 New Order: ${orderId} from ${name}`,
                    text: orderSummary,
                    html: generateAdminEmailHtml(orderId, name, email, phone, walletAddress, items, subtotal, hasFreePackage),
                });

                // Customer Confirmation Email
                await transporter.sendMail({
                    from: `"WAA Merch" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: `Order Confirmed: ${orderId} - WAA Merch`,
                    text: generateCustomerEmailText(name, orderId, orderDetailsList, subtotal),
                    html: generateCustomerEmailHtml(name, orderId, items, subtotal, hasFreePackage),
                });

                console.log('✅ Order emails sent successfully successfully');
            }
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't block the order completion
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

// HTML Generators (same as before, updated slightly)
// ... (omitting full HTML logic here to save space, but it's important to include it in the real file)

function generateAdminEmailHtml(orderId: string, name: string, email: string, phone: string | undefined, walletAddress: string | undefined, items: CartItem[], subtotal: number, hasFreePackage: boolean) {
    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.product.name}${item.size ? ` (${item.size})` : ''}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.product.price * item.quantity)}</td>
        </tr>`).join('');

    return `
    <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #333;">New Order: ${orderId}</h2>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        </div>
        <table style="width: 100%; border-collapse: collapse;">
            <thead><tr style="background: #333; color: white;"><th style="padding: 10px; text-align: left;">Item</th><th style="padding: 10px;">Qty</th><th style="padding: 10px; text-align: right;">Price</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot><tr><td colspan="2" style="padding: 15px; text-align: right; font-weight: bold;">Total</td><td style="padding: 15px; text-align: right; font-weight: bold;">${formatPrice(subtotal)}</td></tr></tfoot>
        </table>
    </div>`;
}

function generateCustomerEmailText(name: string, orderId: string, details: string, total: number) {
    return `Hi ${name},\n\nThanks for your order (${orderId})!\n\n${details}\n\nTotal: ${formatPrice(total)}\n\nWe'll contact you shortly with next steps.`;
}

function generateCustomerEmailHtml(name: string, orderId: string, items: CartItem[], subtotal: number, hasFreePackage: boolean) {
    const itemsHtml = items.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
            <span>${item.quantity}x ${item.product.name}${item.size ? ` (${item.size})` : ''}</span>
            <span>${formatPrice(item.product.price * item.quantity)}</span>
        </div>`).join('');

    return `
    <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Order Confirmed!</h2>
        <p style="text-align: center; color: #666;">Order ID: ${orderId}</p>
        <div style="margin: 30px 0;">
            <h3 style="border-bottom: 2px solid #333; padding-bottom: 10px;">Your Items</h3>
            ${itemsHtml}
            <div style="display: flex; justify-content: space-between; margin-top: 20px; font-weight: bold; font-size: 1.2em;">
                <span>Total</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
        </div>
        ${hasFreePackage ? '<div style="background: #e6fffa; color: #008080; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">🎁 Member Welcome Package included!</div>' : ''}
        <p style="text-align: center; color: #666; font-size: 0.9em;">We'll email you shortly with payment/pickup details.</p>
    </div>`;
}
