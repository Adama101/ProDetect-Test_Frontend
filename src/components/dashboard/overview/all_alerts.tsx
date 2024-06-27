import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

const statusMap = {
    flagged: { label: 'Flagged', color: 'warning' },
    low_risk: { label: 'Low Risk', color: 'success' },
    high_risk: { label: 'High Risk', color: 'error' },
} as const;

export interface allalerts {
    id: string;
    customer: { name: string };
    amount: number;
    status: 'flagged' | 'low_risk' | 'high_risk';
    createdAt: Date;
    riskscore: number;
}

export interface LatestAlertsProps {
    alert?: allalerts[];
    sx?: SxProps;
}

export function LatestAlerts({ alert = [], sx }: LatestAlertsProps): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardHeader title="Latest Alerts" />
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Alert ID</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell sortDirection="desc">Date</TableCell>
                            <TableCell>Alert Status</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Risk Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alert.map((alertItem) => {
                            const { label, color } = statusMap[alertItem.status] ?? { label: 'Unknown', color: 'default' };

                            return (
                                <TableRow hover key={alertItem.id}>
                                    <TableCell>{alertItem.id}</TableCell>
                                    <TableCell>{alertItem.customer.name}</TableCell>
                                    <TableCell>{dayjs(alertItem.createdAt).format('MMM D, YYYY')}</TableCell>
                                    <TableCell>
                                        <Chip color={color} label={label} size="small" />
                                    </TableCell>
                                    <TableCell>{alertItem.amount}</TableCell>
                                    <TableCell>{alertItem.riskscore}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </CardActions>
        </Card>
    );
}
