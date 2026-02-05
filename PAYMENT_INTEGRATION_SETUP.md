# Payment Integration Setup Guide

This document explains how to set up payment processing for the WAA Merch Store.

## Required API Keys

You need to obtain API keys from **two** payment providers:

| Provider | Purpose | Keys Needed |
|----------|---------|-------------|
| **Stripe** | Credit card payments | Secret Key, Publishable Key, Webhook Secret |
| **Coinbase Commerce** | Cryptocurrency payments | API Key, Webhook Secret |

---

## 1. Stripe Setup (Credit Cards)

### Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" and create an account
3. Verify your email address
4. Complete the business verification (can use "Test Mode" for development)

### Step 2: Get Your API Keys

1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com)
2. Click on **Developers** in the left sidebar
3. Click on **API keys**
4. Copy the following keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

> ⚠️ **Important**: Use `test` keys for development, `live` keys for production.

### Step 3: Set Up Webhooks

1. In the Stripe Dashboard, go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL:
   - Development: `https://your-ngrok-url.ngrok.io/api/webhooks/stripe`
   - Production: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

---

## 2. Coinbase Commerce Setup (Crypto)

### Step 1: Create a Coinbase Commerce Account

1. Go to [commerce.coinbase.com](https://commerce.coinbase.com)
2. Click "Get Started"
3. Sign up with email or link your existing Coinbase account
4. Complete identity verification

### Step 2: Get Your API Key

1. Log in to [Coinbase Commerce Dashboard](https://beta.commerce.coinbase.com)
2. Go to **Settings** (gear icon)
3. Scroll down to **API keys**
4. Click **Create an API key**
5. Copy your API key

### Step 3: Set Up Webhooks

1. In Settings, scroll to **Webhook subscriptions**
2. Click **Add an endpoint**
3. Enter your webhook URL:
   - Development: `https://your-ngrok-url.ngrok.io/api/webhooks/coinbase`
   - Production: `https://yourdomain.com/api/webhooks/coinbase`
4. Copy the **Shared secret** for webhook verification

---

## 3. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Coinbase Commerce Configuration
COINBASE_COMMERCE_API_KEY=your_coinbase_commerce_api_key_here
COINBASE_WEBHOOK_SECRET=your_coinbase_webhook_shared_secret_here

# Application URL (for redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env.local` to version control!**

---

## 4. Testing Payments

### Stripe Test Cards

Use these test card numbers in test mode:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Declined (insufficient funds) |
| `4000 0000 0000 0002` | Card declined |

Use any future expiry date, any 3-digit CVC, and any ZIP code.

### Coinbase Commerce Testing

Coinbase Commerce doesn't have a dedicated test mode. For testing:
1. Use small amounts
2. Use testnet tokens if supported
3. Test the flow on staging before going live

---

## 5. Going Live Checklist

- [ ] Switch to Stripe **live** API keys
- [ ] Verify Coinbase Commerce account is fully approved
- [ ] Update `NEXT_PUBLIC_BASE_URL` to your production domain
- [ ] Update webhook URLs in both dashboards to point to production
- [ ] Test a real transaction with a small amount
- [ ] Set up email notifications for new orders
- [ ] Configure shipping settings if using physical products

---

## 6. Webhook Testing (Local Development)

To test webhooks locally, use [ngrok](https://ngrok.com):

```bash
# Install ngrok
brew install ngrok

# Expose your local server
ngrok http 3000
```

Then update your webhook URLs in Stripe and Coinbase dashboards to use the ngrok URL.

---

## Support

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Coinbase Commerce Docs**: [commerce.coinbase.com/docs](https://commerce.coinbase.com/docs)

---

## Environment Variable Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key for server-side API calls |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ | Stripe publishable key (for client-side, if needed) |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook signing secret |
| `COINBASE_COMMERCE_API_KEY` | ✅ | Coinbase Commerce API key |
| `COINBASE_WEBHOOK_SECRET` | ✅ | Coinbase Commerce webhook shared secret |
| `NEXT_PUBLIC_BASE_URL` | ✅ | Your application's base URL |
