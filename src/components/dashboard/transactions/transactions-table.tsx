'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

export interface Transactions {
    transactionId: string;
    accountnumber: number;
    transactiontype: string;
    amount: number;
    accountbalance: number;
    receivername: string;
    transactiontime: Date;
    riskscore: number;
}

interface TransactionsTableProps {
    count?: number;
    initialPage?: number;
    initialRowsPerPage?: number;
    rows?: Transactions[];
    onPageChange?: (newPage: number) => void;
    onRowsPerPageChange?: (newRowsPerPage: number) => void;
}

export function TransactionsTable({
    count = 0,
    initialPage = 0,
    initialRowsPerPage = 50,
    rows = [],
    onPageChange,
    onRowsPerPageChange
}: TransactionsTableProps): React.JSX.Element {
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    console.log('TransactionsTable received rows:', rows);
    console.log('Count:', count, 'Page:', page, 'RowsPerPage:', rowsPerPage);

    const rowIds = React.useMemo(() => {
        return rows.map((transaction) => transaction.transactionId);
    }, [rows]);

    const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

    const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
    const selectedAll = rows.length > 0 && selected?.size === rows.length;

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        if (onRowsPerPageChange) {
            onRowsPerPageChange(newRowsPerPage);
        }
    };

    const paginatedRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            selectAll();
                                        } else {
                                            deselectAll();
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Transaction Date</TableCell>
                            <TableCell>Transaction Type</TableCell>
                            <TableCell>Account Number</TableCell>
                            <TableCell>Transaction Type</TableCell>
                            <TableCell>Receiving Amount</TableCell>
                            <TableCell>Risk Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => {
                            const isSelected = selected?.has(row.transactionId);

                            return (
                                <TableRow hover key={row.transactionId} selected={isSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    selectOne(row.transactionId);
                                                } else {
                                                    deselectOne(row.transactionId);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                            <Typography variant="subtitle2">{row.transactionId}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{dayjs(row.transactiontime).format('MMM D, YYYY HH:mm:ss')}</TableCell>
                                    <TableCell>{row.transactionId}</TableCell>
                                    <TableCell>{row.accountnumber}</TableCell>
                                    <TableCell>{row.transactiontype}</TableCell>
                                    {/* <TableCell>{row.receivername}</TableCell> */}
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.riskscore}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[50, 100, 500]}
            />
        </Card>
    );
}