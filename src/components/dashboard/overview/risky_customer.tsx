import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';


export interface RiskyCustomers {
    id: string;
    name: string;
    updatedAt: Date;
}

export interface RiskyCustomers {
    RiskyCustomers?: RiskyCustomers[];
    sx?: SxProps;
}

export function RiskyCustomers({ sx }: RiskyCustomers): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardHeader title="High Risk Customers" />
            <Divider />
            <List>
                {/* // List of High Risk Cutomers */}
            </List>
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
