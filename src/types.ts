// types.ts

import dayjs from 'dayjs';

export interface Transaction {
    transactionID: string;
    createdDate: Date;
    sourceAmount: number;
    sourceCountry: string;
    destinationAmount: number;
    destinationCountry: string;
    riskScore: number;
}
