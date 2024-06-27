import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { FalsePositives } from '@/components/dashboard/overview/false_positives';
import { Alerts } from '@/components/dashboard/overview/alerts';
import { AverageDetectionTime } from '@/components/dashboard/overview/average_detection_time';
import { LatestAlerts } from '@/components/dashboard/overview/all_alerts';
import { FlaggedCustomer } from '@/components/dashboard/overview/flagged_customers';
import { ConfirmedFraudCases } from '@/components/dashboard/overview/confirmed_fraud_cases';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>        

        {/* Alerts Tile */}
        <Alerts sx={{ height: '100%' }} value={149} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>

        {/* Confirmed Fraud Cases Tile */}
        <ConfirmedFraudCases diff={12} trend="up" sx={{ height: '100%' }} value="41" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>

        {/* False Positive Tile */}
        <FalsePositives diff={16} trend="down" sx={{ height: '100%' }} value="108" />
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
              id: 'PRD-005',
              name: 'Edward Snowden',
              avatar: 'assets/avatar.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-005',
              name: 'Samson Were',
              avatar: 'assets/avatar.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Kaba Mohammad',
              avatar: '',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Adama Jarju',
              avatar: 'assets/avatar.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Larry Page',
              avatar: '',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
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
              id: 'PTD-007',
              customer: { name: 'Lucky Dogbey' },
              amount: 15000.50,
              status: 'high_risk',
              riskscore: 78,
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'PTD-006',
              customer: { name: 'Emmanuel Terwase' },
              amount: 2500.11,
              status: 'flagged',
              riskscore: 75,
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'PTD-004',
              customer: { name: 'Jude Belligham' },
              amount: 41000.99,
              status: 'high_risk',
              riskscore: 90,
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'PTD-003',
              customer: { name: 'Bright Init' },
              amount: 1906.43,
              status: 'flagged',              
              riskscore: 63,
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'PTD-002',
              customer: { name: 'Grace Oliver' },
              amount: 5320.54,
              status: 'flagged',              
              riskscore: 75.54,
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

