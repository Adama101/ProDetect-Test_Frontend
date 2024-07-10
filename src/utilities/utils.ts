// src/utilities/utils.ts

import { Transaction } from '@/types'; // Adjust the import based on your project structure

export async function fetchTransactions(): Promise<Transaction[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl || !apiKey) {
        throw new Error('API URL or API Key is not defined');
    }

    const response = await fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }

    const data: Transaction[] = await response.json();
    return data;
}
