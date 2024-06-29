import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';

export interface AlertsProps {
    sx?: SxProps;
    value: number;
}

export function Alerts({ value, sx }: AlertsProps): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardContent>
                <Stack spacing={0}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" gutterBottom variant="overline">
                                Flagged Transactions
                            </Typography>
                            <Typography variant="h4">{value}</Typography>
                        </Stack>
                        <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '35px', width: '35px' }}>
                            <WarningIcon fontSize="var(--icon-fontSize-lg)" />
                        </Avatar>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
