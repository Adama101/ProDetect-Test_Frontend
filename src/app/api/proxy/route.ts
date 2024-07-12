import { NextResponse } from 'next/server';

export async function GET() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl || !apiKey) {
        return NextResponse.json({ error: 'API URL or API Key is not defined' }, { status: 500 });
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: 500 });
    }
}