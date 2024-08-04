import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { FalsePositives } from '@/components/dashboard/overview/false-positives';
import { Alerts } from '@/components/dashboard/overview/alerts';
import { AverageDetectionTime } from '@/components/dashboard/overview/average-detection-time';
import { LatestAlerts } from '@/components/dashboard/overview/all-alerts';
import { FlaggedCustomer } from '@/components/dashboard/overview/flagged-customers';
import { ConfirmedFraudCases } from '@/components/dashboard/overview/confirmed-fraud-cases';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid lg={3} sm={6} xs={12}>        

        {/* Alerts Tile */}
        <Alerts sx={{ height: '100%' }} value={2} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>

        {/* Confirmed Fraud Cases Tile */}
        <ConfirmedFraudCases diff={12} trend="up" sx={{ height: '100%' }} value="0" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>

        {/* False Positive Tile */}
        <FalsePositives diff={16} trend="down" sx={{ height: '100%' }} value="0" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>

        {/* Average Detection Time Tile */}
        <AverageDetectionTime sx={{ height: '100%' }} value="0.3 " trend={'up'}/>
      </Grid>

      {/* Flagged Customers Tile */}
      <Grid lg={4} md={6} xs={12}>
        <FlaggedCustomer
          products={[
            {
              id: 'PRD-004',
              name: 'Kaba Mohammad',
              avatar: 'assets/avatar.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Jude Oliver',
              avatar: 'assets/avatar.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestAlerts
          alert={[
            
            // This is a sample dummy  data for place holding
            {
              id: 'PTD-006',
              customer: { name: 'Emmanuel Terwase' },
              amount: 2500.11,
              status: 'flagged',
              riskscore: 75,
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },            
            {
              id: 'PTD-002',
              customer: { name: 'Kaba Mohammad' },
              amount: 1920.54,
              status: 'flagged',
              riskscore: 71,
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
    
  );
}

