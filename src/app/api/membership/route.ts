import { NextRequest, NextResponse } from 'next/server';

// WAA Membership NFT Contract on Base
const WAA_MEMBERSHIP_CONTRACT = "0x9b931844FbaA55Bd8E709909468DA0aD2be26052";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    try {
        // Token ID 2 is the WAA Membership token (confirmed from screenshot)
        const tokenIdsToCheck = [
            "0x2",       // Token ID 2 - THE CORRECT ONE!
            "0x1",       // Token ID 1 (fallback)
        ];

        const baseRpcUrl = "https://mainnet.base.org";

        for (const tokenIdHex of tokenIdsToCheck) {
            // Encode balanceOf(address,uint256) call
            const paddedAddress = address.slice(2).toLowerCase().padStart(64, '0');
            const paddedTokenId = tokenIdHex.slice(2).padStart(64, '0');
            const data = `0x00fdd58e${paddedAddress}${paddedTokenId}`; // balanceOf selector

            const response = await fetch(baseRpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'eth_call',
                    params: [
                        {
                            to: WAA_MEMBERSHIP_CONTRACT,
                            data: data,
                        },
                        'latest',
                    ],
                }),
            });

            const result = await response.json();

            if (result.result && result.result !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                const balance = parseInt(result.result, 16);
                if (balance > 0) {
                    return NextResponse.json({
                        isMember: true,
                        balance,
                        tokenId: parseInt(tokenIdHex, 16),
                        address
                    });
                }
            }
        }

        return NextResponse.json({ isMember: false, address });
    } catch (error) {
        console.error('Error checking membership:', error);
        return NextResponse.json({ error: 'Failed to check membership' }, { status: 500 });
    }
}
