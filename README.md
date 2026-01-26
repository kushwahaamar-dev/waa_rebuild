# WAA Rebuild

A high-performance, design-centric tailored website for the Web3 Acceleration Association (WAA). Built with Next.js 15, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## 🛠 Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS + Vanilla CSS Variables
*   **Animations:** Framer Motion + Matter.js (Physics) + React Spring
*   **Typography:** Inter (Sans) & Fraunces (Serif)
*   **Icons:** Lucide React

## ☁️ Deploying to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  **Push to GitHub:**
    Ensure your code is pushed to a GitHub repository (like this one).

2.  **Import Project in Vercel:**
    *   Go to your Vercel Dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import the `waa_rebuild` repository.

3.  **Configure Build:**
    *   **Framework Preset:** Next.js
    *   **Root Directory:** `./` (default)
    *   **Build Command:** `npm run build`
    *   **Install Command:** `npm install`

4.  **Deploy:**
    Click **Deploy**. Vercel will automatically build and assign a `.vercel.app` domain.

## 📈 Enabling Vercel Analytics

This project includes `@vercel/analytics` pre-configured in `src/app/layout.tsx`.

To enable it in your dashboard:

1.  Go to your project settings on [Vercel](https://vercel.com).
2.  Click on the **Analytics** tab.
3.  Click **Enable**.
4.  Redeploy your application (or wait for the next push) for data to start appearing.

---

Designed with ❤️ for WAA.
