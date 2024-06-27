import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import { config } from '@/config';
import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';
import type { Integration } from '@/components/dashboard/integrations/integrations-card';
import { IntegrationsFilters } from '@/components/dashboard/integrations/integrations-filters';

export const metadata = { title: `Integrations | Dashboard | ${config.site.name}` } satisfies Metadata;

const integrations: Integration[] = [
  {
    id: 'INTEG-002',
    title: 'Upload File',
    description: 'Upload a sample transaction file for the system to learn and adapt',
    logo: '/assets/upload_file.png',
    href: '',  // To UPLOAD FILE of Sample Transactions
  },
  {
    id: 'INTEG-001',
    title: 'API Integrations',
    description: 'Start a system integration using our APIs',
    logo: '/assets/rest_api.png',
    href: '/dashboard/integrations/api',  // Route to API KEYS Page
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Integrations</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          </Stack>
        </Stack>
      </Stack>
      <IntegrationsFilters />
      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid key={integration.id} lg={4} md={6} xs={12}>
            {integration.href ? (
              <Link href={integration.href} passHref style={{ textDecoration: 'none' }}>
                <Box component="a" sx={{ textDecoration: 'none' }}>
                  <IntegrationCard integration={integration} />
                </Box>
              </Link>
            ) : (
              <IntegrationCard integration={integration} />
            )}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      </Box>
    </Stack>
  );
}
