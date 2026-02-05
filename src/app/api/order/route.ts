import { NextRequest, NextResponse } from 'next/server';
import { CartItem } from '@/store/cartStore';
import { formatPrice } from '@/data/products';

// Nodemailer for sending emails (you'll need to install: npm install nodemailer)
// For now, we'll log the order and return success

export interface OrderSubmission {
    name: string;
    email: string;
    phone?: string;
    items: CartItem[];
}

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, items } = await request.json() as OrderSubmission;

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

        // Build order details for email
        const orderDetails = items.map(item =>
            `• ${item.quantity}x ${item.product.name}${item.size ? ` (${item.size})` : ''} - ${formatPrice(item.product.price * item.quantity)}`
        ).join('\n');

        const orderSummary = `
🛒 NEW ORDER FROM WAA MERCH STORE
================================

Customer Information:
- Name: ${name}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}

Order Details:
${orderDetails}

Subtotal: ${formatPrice(subtotal)}

================================
Order placed at: ${new Date().toLocaleString()}
        `.trim();

        // Log the order (in production, you'd send an email here)
        console.log('\n' + orderSummary + '\n');

        // TODO: Send email using nodemailer or another service
        // Example with nodemailer:
        /*
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New WAA Merch Order from ${name}`,
            text: orderSummary,
        });

        // Send confirmation email to customer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your WAA Merch Order Confirmation',
            text: `
Hi ${name}!

Thank you for your order! We've received your request and will be in touch shortly with payment instructions and pickup details.

${orderDetails}

Total: ${formatPrice(subtotal)}

Pickup Location: (To be provided)
Payment: You'll receive payment instructions via email.

Questions? Reply to this email or contact us at hello@waatech.xyz

– The WAA Team
            `.trim(),
        });
        */

        return NextResponse.json({
            success: true,
            message: 'Order submitted successfully! Check your email for payment instructions and pickup details.',
            orderId: `WAA-${Date.now().toString(36).toUpperCase()}`,
        });

    } catch (error) {
        console.error('Order submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit order' },
            { status: 500 }
        );
    }
}
