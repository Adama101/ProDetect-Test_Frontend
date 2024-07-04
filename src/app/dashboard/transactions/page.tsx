import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { TransactionsFilters } from '@/components/dashboard/transactions/transactions-filter';
import { TransactionsTable } from '@/components/dashboard/transactions/transactions-table';
import type { Transactions } from '@/components/dashboard/transactions/transactions-table';
import dayjs from 'dayjs';

export const metadata = { title: `Transactions | Dashboard | ${config.site.name}` } satisfies Metadata;

const transactions = [
    // Transactions List comes here.......
    {
        transactionID: 'TSR-012',
        createdDate: dayjs().subtract(2, 'hours').toDate(),
        sourceAmount: 2300,
        sourceCountry: 'United States',
        destinationAmount: 5000000,
        destinationCountry: 'Nigeria',
        riskScore: 54.3
    },

] satisfies Transactions[];

export default function Page(): React.JSX.Element {
    const page = 0;
    const rowsPerPage = 5;

    const paginatedTransactions = applyPagination(transactions, page, rowsPerPage);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Transactions</Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    </Stack>
                </Stack>
            </Stack>
            <TransactionsFilters />
            <TransactionsTable
                count={paginatedTransactions.length}
                page={page}
                rows={paginatedTransactions}
                rowsPerPage={rowsPerPage}
            />
        </Stack>
    );
}

function applyPagination(rows: Transactions[], page: number, rowsPerPage: number): Transactions[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
