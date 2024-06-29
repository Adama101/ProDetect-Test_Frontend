import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

export interface AverageDetectionTimeProps {
    sx?: SxProps;
    value: string;
    trend: 'up' | 'down';
    diff?: number;
}

export function AverageDetectionTime({ value, sx }: AverageDetectionTimeProps): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardContent>
                <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                    <Stack spacing={1}>
                        <Typography color="text.secondary" variant="overline">
                            Average Detection Time
                        </Typography>
                        <Typography variant="h4">{value}</Typography>
                    </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '35px', width: '35px' }}>
                        <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
}
