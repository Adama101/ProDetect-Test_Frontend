'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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

function noop(): void {
    // do nothing
}

export interface Transactions {
    transactionId: string;
    transactionDate: string;
    sourceAmount: number;
    sourceCountry: string;
    descAmount: number;
    score: number;
}


interface TransactionsTableProps {
    count?: number;
    page?: number;
    rows?: Transactions[];
    rowsPerPage?: number;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

export function TransactionsTable({
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0
}: TransactionsTableProps): React.JSX.Element {
    console.log('TransactionsTable received rows:', rows);
    const rowIds = React.useMemo(() => {
        return rows.map((transaction) => transaction.transactionId);
    }, [rows]);

    const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

    const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
    const selectedAll = rows.length > 0 && selected?.size === rows.length;

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
                                {/* Transaction Tables */}
                            </TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Source Amount</TableCell>
                            <TableCell>Source Country</TableCell>
                            <TableCell>Dest. Amount</TableCell>
                            <TableCell>Dest. Country</TableCell>
                            <TableCell>Risk Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const isSelected = selected?.has(row.transactionId);

                            return (<TableRow hover key={row.transactionId} selected={isSelected}>
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
                                <TableCell>{dayjs(row.transactionDate).format('MMM D, YYYY')}</TableCell>
                                <TableCell>{row.sourceAmount}</TableCell>
                                <TableCell>{row.sourceCountry}</TableCell>
                                <TableCell>{row.descAmount}</TableCell>
                                <TableCell>N/A</TableCell>
                                <TableCell>{row.score}</TableCell>
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
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
