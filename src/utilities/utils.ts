import { Transactions } from '@/types';

export async function fetchTransactions(): Promise<Transactions[]> {
    const response = await fetch('/api/proxy');
    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }
    const data: Transactions[] = await response.json();
    console.log('Fetched transactions:', data); // Add this line
    return data;
}