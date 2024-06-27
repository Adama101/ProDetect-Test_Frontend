'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 100;
const WIDTH = 100;

type Color = 'dark' | 'light';

export interface LogoProps {
    color?: Color;
    emblem?: boolean;
    height?: number;
    width?: number;
}

export function DashboardLogo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
    let url: string;

    if (emblem) {
        url = color === 'light' ? '/assets/dashboard-logo.png' : '/assets/dashboard-logo.png';
    } else {
        url = color === 'dark' ? '/assets/dashboard-logo.png' : '/assets/dashboard-logo.png';
    }

    return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export interface DynamicLogoProps {
    colorDark?: Color;
    colorLight?: Color;
    emblem?: boolean;
    height?: number;
    width?: number;
}

export function DynamicLogo({
    colorDark = 'light',
    colorLight = 'dark',
    height = HEIGHT,
    width = WIDTH,
    ...props
}: DynamicLogoProps): React.JSX.Element {
    const { colorScheme } = useColorScheme();
    const color = colorScheme === 'dark' ? colorDark : colorLight;

    return (
        <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
            <DashboardLogo color={color} height={height} width={width} {...props} />
        </NoSsr>
    );
}
