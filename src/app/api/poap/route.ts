import { NextRequest, NextResponse } from 'next/server';

// Cache for POAP image URLs to avoid repeated fetches
const imageCache = new Map<number, string>();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get('eventId');

    if (!eventId) {
        return NextResponse.json({ error: 'eventId is required' }, { status: 400 });
    }

    const id = parseInt(eventId, 10);

    // Check cache first
    if (imageCache.has(id)) {
        return NextResponse.json({ imageUrl: imageCache.get(id) });
    }

    try {
        // Fetch the POAP Gallery page to extract the actual image URL
        const galleryUrl = `https://poap.gallery/event/${id}`;
        const response = await fetch(galleryUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch POAP page: ${response.status}`);
        }

        const html = await response.text();

        // Extract the assets.poap.xyz URL from the HTML
        // The images are typically in srcset or src attributes with UUID filenames
        const assetMatches = html.match(/https:\/\/assets\.poap\.xyz\/[a-f0-9-]+\.(gif|png|webp)/gi);

        if (assetMatches && assetMatches.length > 0) {
            // Get the first match (usually the main image)
            const imageUrl = assetMatches[0];
            imageCache.set(id, imageUrl);
            return NextResponse.json({ imageUrl });
        }

        // Fallback: try to find any image URL pattern
        const fallbackMatch = html.match(/https:\/\/assets\.poap\.xyz\/[^"'\s<>]+\.(gif|png|webp)/i);
        if (fallbackMatch) {
            const imageUrl = fallbackMatch[0].replace(/\\"/g, '');
            imageCache.set(id, imageUrl);
            return NextResponse.json({ imageUrl });
        }

        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching POAP image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
