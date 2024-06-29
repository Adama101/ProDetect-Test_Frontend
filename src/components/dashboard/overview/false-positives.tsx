import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export interface FalsePositivesProps {
    diff?: number;
    trend: 'up' | 'down';
    sx?: SxProps;
    value: string;
}

export function FalsePositives({ diff, trend, sx, value }: FalsePositivesProps): React.JSX.Element {
    const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
    const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

    return (
        <Card sx={sx}>
            <CardContent>
                <Stack spacing={0}>
                    <Stack direction="row" sx={{ alignItems: 'normal', justifyContent: 'centre' }} spacing={1}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                Total False Positives
                            </Typography>
                            <Typography variant="h4">{value}</Typography>
                        </Stack>
                        <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '35px', width: '35px' }}>
                            <UsersIcon fontSize="var(--icon-fontSize-lg)" />
                        </Avatar>
                    </Stack>
                    {diff ? (
                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                                <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                                <Typography color={trendColor} variant="body2">
                                    {diff}
                                </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="caption">
                                Since last month
                            </Typography>
                        </Stack>
                    ) : null}
                </Stack>
            </CardContent>
        </Card>
    );
}
