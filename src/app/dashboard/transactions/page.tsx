"use client";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { fetchTransactions } from '@/utilities/utils';
import { TransactionsFilters } from '@/components/dashboard/transactions/transactions-filter';
import { TransactionsTable } from '@/components/dashboard/transactions/transactions-table';
import type { Transactions } from '@/types';

export default function Page(): React.JSX.Element {
    const [transactions, setTransactions] = React.useState<Transactions[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const getTransactions = React.useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchTransactions();
            console.log('Fetched and sorted transactions:', data);
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions', error);
            setError('Failed to fetch transactions. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        getTransactions();
        const intervalId = setInterval(getTransactions, 600000); // Automatically Refresh timer
        return () => clearInterval(intervalId);
    }, [getTransactions]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Transactions</Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }} />
                </Stack>
            </Stack>
            <TransactionsFilters />
            {transactions.length === 0 ? (
                <Typography>No transactions found.</Typography>
            ) : (
                <TransactionsTable
                    count={transactions.length}
                    initialPage={page}
                    initialRowsPerPage={rowsPerPage}
                    rows={transactions}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
        </Stack>
    );
}