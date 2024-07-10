"use client"; // Mark the component as a client component

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fetchTransactions } from '@/utilities/utils';
import { TransactionsFilters } from '@/components/dashboard/transactions/transactions-filter';
import { TransactionsTable } from '@/components/dashboard/transactions/transactions-table';
import type { Transaction } from '@/types';

export default function Page(): React.JSX.Element {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 15;

    React.useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions', error);
            }
        };

        getTransactions();
    }, []);

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const paginatedTransactions = applyPagination(transactions, page, rowsPerPage);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Transactions</Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }} />
                </Stack>
            </Stack>
            <TransactionsFilters />
            <TransactionsTable
                count={transactions.length}
                page={page}
                rows={paginatedTransactions}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
            />
        </Stack>
    );
}

function applyPagination(rows: Transaction[], page: number, rowsPerPage: number): Transaction[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
