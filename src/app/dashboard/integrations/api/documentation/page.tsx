import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import Documentation from '@/components/dashboard/integrations/api/documentation/documentation';

export const metadata = { title: `Documentation| API | Integrations | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function DocumentationPage(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <div>
                <Typography variant="h4">API Documentation</Typography>
            </div>
            <Documentation />
        </Stack>
    );
}
