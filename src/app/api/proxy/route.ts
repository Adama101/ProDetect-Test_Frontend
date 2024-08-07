import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl || !apiKey) {
        return NextResponse.json({ error: 'API URL or API Key is not defined' }, { status: 500 });
    }

    // Get pagination parameters from the request, if any
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '1000'; // high limit to get all data

    try {
        const response = await fetch(`${apiUrl}?page=${page}&limit=${limit}`, {
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
        console.log('Proxy response:', {
            status: response.status,
            headers: Object.fromEntries(response.headers),
            dataLength: Array.isArray(data) ? data.length : 'Not an array',
            data: data
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: 500 });
    }
}