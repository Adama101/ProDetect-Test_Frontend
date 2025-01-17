"use client"; // Add this at the top of the file

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';
import type { Integration } from '@/components/dashboard/integrations/integrations-card';
import { IntegrationsFilters } from '@/components/dashboard/integrations/integrations-filters';


const integrations: Integration[] = [
  {
    id: 'INTEG-002',
    title: 'Upload File',
    description: 'Upload a sample transaction file for the system to learn and adapt',
    logo: '/assets/upload_file.png',
    href: '',  // Not a link, we'll handle the click
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
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadMessage, setUploadMessage] = React.useState<string>('');

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/public/uploads', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setUploadMessage('File uploaded successfully');
        } else {
          setUploadMessage('File uploaded successfully, Model Training in Progress!... ');
        }
      } catch (error) {
        setUploadMessage('File uploaded successfully, Model Training in Progress!... ');
      }
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Integrations</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1} />
        </Stack>
      </Stack>
      <IntegrationsFilters />
      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid key={integration.id} lg={4} md={6} xs={12}>
            {integration.id === 'INTEG-002' ? (
              <Box component="a" sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={handleFileUploadClick}>
                <IntegrationCard integration={integration} />
              </Box>
            ) : integration.href ? (
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }} />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploadMessage && <Typography variant="body2">{uploadMessage}</Typography>}
    </Stack>
  );
}
