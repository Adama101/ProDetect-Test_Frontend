import { Transactions } from '@/types';

export async function fetchTransactions(): Promise<Transactions[]> {
    let allTransactions: Transactions[] = [];
    let page = 1;
    const limit = 1000; // Adjust based on API's capabilities

    while (true) {
        const response = await fetch(`/api/proxy?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Check your Internet');
        }

        const data: Transactions[] = await response.json();
        console.log(`Fetched ${data.length} transactions for page ${page}`);

        allTransactions = allTransactions.concat(data);

        if (data.length < limit) {
            // We've reached the end of the data
            break;
        }

        page++;
    }

    console.log(`Total transactions fetched: ${allTransactions.length}`);

    // Sort transactions by date, latest first
    allTransactions.sort((a, b) => new Date(b.transactiontime).getTime() - new Date(a.transactiontime).getTime());

    return allTransactions;
}