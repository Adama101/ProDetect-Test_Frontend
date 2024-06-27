import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';

export interface FlaggedCustomer {
    id: string;
    avatar: string;
    name: string;
    updatedAt: Date;
}

export interface FlaggedCustomerProps {
    products?: FlaggedCustomer[];
    sx?: SxProps;
}

export function FlaggedCustomer({ products = [], sx }: FlaggedCustomerProps): React.JSX.Element {
    return (
        <Card sx={sx}>
            <CardHeader title="High Risk Customers" />
            <Divider />
            <List>
                {products.map((product, index) => (
                    <ListItem divider={index < products.length - 1} key={product.id}>
                        <ListItemAvatar>
                            {product.avatar ? (
                                <Box component="img" src={product.avatar} sx={{ borderRadius: 1, height: '48px', width: '48px' }} />
                            ) : (
                                <Box
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: 'var(--mui-palette-neutral-200)',
                                        height: '48px',
                                        width: '48px',
                                    }}
                                />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                            primaryTypographyProps={{ variant: 'subtitle1' }}
                            secondary={`Updated ${dayjs(product.updatedAt).format('MMM D, YYYY')}`}
                            secondaryTypographyProps={{ variant: 'body2' }}
                        />
                        <IconButton edge="end">
                            <DotsThreeVerticalIcon weight="bold" />
                        </IconButton>
                    </ListItem>
                ))}
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
