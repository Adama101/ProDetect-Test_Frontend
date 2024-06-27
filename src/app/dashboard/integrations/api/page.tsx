import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import APIKeys from '@/components/dashboard/integrations/api/api-keys';

export const metadata = { title: `API| Integrations | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function APIPage(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <div>
                <Typography variant="h4">API Keys</Typography>
            </div>
            <APIKeys />
        </Stack>
    );
}
