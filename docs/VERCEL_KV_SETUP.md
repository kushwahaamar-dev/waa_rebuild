# Setting Up Vercel KV for Redemption Tracking

To ensure members can only claim their Welcome Package once, we use Vercel KV (Redis).

## Step-by-Step Setup

1. **Go to Vercel Dashboard**
   Navigate to your project on [vercel.com](https://vercel.com).

2. **Navigate to Storage**
   Click on the **"Storage"** tab in the top menu.

3. **Create Database**
   - Click **"Create Database"**.
   - Select **"KV"** (Redis).
   - Give it a name (e.g., `waa-redemption-store`).
   - Select a region (closest to your users, e.g., `Washington, D.C. (iad1)`).
   - Click **"Create"**.

4. **Connect to Project**
   - Once created, look for the **"Connect Project"** button.
   - Select your `waa-rebuild` project.
   - Click **"Connect"**.

5. **Done!**
   Vercel automatically adds the necessary environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) to your project.
   - **Note:** You may need to redeploy your project for the changes to take effect.

## Verification
1. Connect your wallet on the site.
2. Claim a Welcome Package via email order.
3. Refresh the page.
4. You should see "Added to Cart" (or similar redeemed state) instead of the claim button.
