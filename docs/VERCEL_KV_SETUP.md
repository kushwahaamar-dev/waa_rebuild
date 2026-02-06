# Setting Up Vercel KV for Redemption Tracking

To ensure members can only claim their Welcome Package once, we use Vercel KV (Redis).

## Step-by-Step Setup

1. **Go to Vercel Dashboard**
   Navigate to your project on [vercel.com](https://vercel.com).

2. **Navigate to Storage**
   Click on the **"Storage"** tab in the top menu.

3. **Create Database (Marketplace)**
   - You will see a list of providers (Marketplace).
   - Click on **Upstash**.
   - Select **Upstash for Redis** (Serverless DB).
   - Click **Add Integration**.
   - Select your project (`waa-rebuild`) from the dropdown.
   - Click **Add Integration** / **Install**.
   - Follow the prompts to create a **Redis** database (Free tier is usually sufficient).
   - Ensure it links to your `waa-rebuild` project.

4. **Verify Environment Variables**
   - Once installed, Vercel will automatically add the environment variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - You can verify this in **Settings** → **Environment Variables**.

## Verification
1. Connect your wallet on the site.
2. Claim a Welcome Package via email order.
3. Refresh the page.
4. You should see "Added to Cart" (or similar redeemed state) instead of the claim button.
