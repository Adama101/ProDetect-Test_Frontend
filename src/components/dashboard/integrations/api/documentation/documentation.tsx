/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';

import * as React from 'react';
import { Box, Typography, Divider, Tabs, Tab, Grid } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Documentation() {
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event: unknown, newValue: React.SetStateAction<number>) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
                ProDetect's Platform API provides a comprehensive interface for integrating the platform's
                capabilities with other banking systems. Our API enables external systems to submit
                transactions for analysis, retrieve alerts, flag high risk transactions and customers, and predict
                future fraudulent transaction patterns.
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
                Getting Started
            </Typography>
            <Typography variant="body1" paragraph>
                ProDetect API provides endpoints for monitoring transactions, managing alerts, and generating
                reports. The API is RESTful, ensuring easy integration and communication between your
                application and our service.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Base URL
            </Typography>
            <Typography variant="body1" paragraph>
                The base URL for all API endpoints is:
            </Typography>
            <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                https://api.prodetect.co/v1
            </SyntaxHighlighter>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>
                Authentication
            </Typography>
            <Typography variant="body1" paragraph>
                All API requests require a Private and Public API key. Include the API keys in the request header as follows:
            </Typography>
            <SyntaxHighlighter language="json" style={materialOceanic}>
                {`{
    "Authorization": "Bearer <your_private_key>",
                        "Bearer <your_public_key>"
}`}
            </SyntaxHighlighter>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>
                Endpoints
            </Typography>
            <Typography variant="h6" gutterBottom>
                1. Transactions
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                        Submit a Transaction
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        POST /transactions
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Submit a transaction for analysis.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Request Body:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="language tabs">
                        <Tab label="Json" />
                        <Tab label="Python" />
                        <Tab label="C#" />
                        <Tab label="Ruby" />
                        <Tab label="PHP" />
                        <Tab label="Java" />
                    </Tabs>
                    {/* Json Request Structure */}
                    {tabValue === 0 && (
                        <SyntaxHighlighter language="json" style={materialOceanic}>
                            {`{
    "transaction_id": "TXN12345",
    "amount": 1000.50,
    "currency": "USD",
    "timestamp": "2023-06-15T12:00:00Z",
    "sender": {
    "account_id": "A1B2C3D4",
    "name": "John Doe",
    "bank": "Bank A"
    },
    "receiver": {
    "account_id": "E5F6G7H8",
    "name": "Jane Smith",
    "bank": "Bank B"
    }
}`}
                        </SyntaxHighlighter>
                    )}
                    {/* Python Request Structure */}
                    {tabValue === 1 && (
                        <SyntaxHighlighter language="Python" style={materialOceanic}>
                            {`{
    {
    "transaction_id": "TXN12345",
    "amount": 1000.50,
    "currency": "USD",
    "timestamp": "2023-06-15T12:00:00Z",
    "sender": {
    "account_id": "A1B2C3D4",
    "name": "John Doe",
    "bank": "Bank A"
    },
    "receiver": {
    "account_id": "E5F6G7H8",
    "name": "Jane Smith",
    "bank": "Bank B"
    }
}`}
                        </SyntaxHighlighter>
                    )}
                    {/* Json Response Structure  */}
                    {tabValue === 2 && (
                        <SyntaxHighlighter language="Json" style={materialOceanic}>
                            {`{
    {
    "status": "success",
    "transaction_id": "TXN12345",
    "alert": {
    "alert_id": "67890",
    "risk_score": 85,
    "status": "pending"
    }

}`}
                        </SyntaxHighlighter>
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Python Response Structure  */}
                    <SyntaxHighlighter language="Python" style={materialOceanic}>
                        {`{
    {
    "status": "success",
    "transaction_id": "TXN12345",
    "alert": {
    "alert_id": "67890",
    "risk_score": 85,
    "status": "pending"
    }
}

}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
                Get Transaction Status
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        {'GET /transactions/{transaction_id}'}
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Retrieve the status and analysis result of a submitted transaction.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Path Parameters:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "transaction_id": "TXN12345"
}`}
                    </SyntaxHighlighter>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "transaction_id": "TXN12345",
    "status": "fraudulent",
    "analysis_result": {
        "risk_score": "68",
        "alerts": [
            {
                "alert_id": "AR1202",
                "description": "High Risk Transaction, 
                Requires further investigation"
            }
        ]
    }
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
                2. Alerts
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Retrieve Alerts
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        GET /alerts
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Retrieve a list of alerts generated by the AML monitoring platform.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Query Parameters:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "customer_id": "PDT13420",
    "status": "pending",
    "date_from": "2023-06-15T12:00:00",
    "date_to": "2024-09-10T14:00:00"
}`}
                    </SyntaxHighlighter>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "alerts": [
        {
            "alert_id": "AL0381",
            "customer_id": "PDT13420",
            "description": "Suspicious transaction pattern detected.",
            "risk_score": "84",
            "status": "pending",
            "created_at": "2023-06-15T12:05:00",
            "updated_at": "2024-09-10T14:00:00"
        }
    ]
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
                Update Alert Status
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        {'PATCH /alerts/{alert_id}'}
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Update the status of an alert.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Path Parameters:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "alert_id": "string"
}`}
                    </SyntaxHighlighter>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Request Body:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    {
    "resolution": "false_positive",
    "notes": "Transaction verified as legitimate."
    }
}`}
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    {
    "status": "success",
    "alert_id": "67890",
    "resolution": "false_positive"
    }
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
                3. Customers
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Create or Update Customer Profile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        POST /customers
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Create a new customer profile or update an existing one.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="language tabs">
                        <Tab label="JSON" />
                        <Tab label="Python" />
                        <Tab label="JavaScript" />
                    </Tabs>

                    {tabValue === 0 && (
                        <SyntaxHighlighter language="json" style={materialOceanic}>
                            {`{
    {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62701",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
    "type": "passport",
    "number": "P1234567",
    "expiry_date": "2030-01-01"
    }
}`}
                        </SyntaxHighlighter>
                    )}
                    {tabValue === 1 && (
                        <SyntaxHighlighter language="python" style={materialOceanic}>
                            {`{
    {
    "status": "success",
    "customer": {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62701",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
    "type": "passport",
    "number": "P1234567",
    "expiry_date": "2030-01-01"
    },
    "created_at": "2024-06-25T10:00:00Z"
    }
}`}
                        </SyntaxHighlighter>
                    )}
                    {tabValue === 2 && (
                        <SyntaxHighlighter language="javascript" style={materialOceanic}>
                            {`{
    {
  "status": "success",
  "customer": {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "state": "IL",
      "postal_code": "62701",
      "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
      "type": "passport",
      "number": "P1234567",
      "expiry_date": "2030-01-01"
    },
    "created_at": "2024-06-25T10:00:00Z"
  }
}

}`}
                        </SyntaxHighlighter>
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    {
    "status": "success",
    "customer": {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62701",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
        "identification": {
        "type": "passport",
        "number": "P1234567",
        "expiry_date": "2030-01-01"
    },
    "created_at": "2024-06-25T10:00:00Z"
    }
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
                Update Customer Profile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        POST /customers
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Create a new customer profile or update an existing one.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="language tabs">
                        <Tab label="JSON" />
                        <Tab label="Python" />
                        <Tab label="JavaScript" />
                    </Tabs>

                    {tabValue === 0 && (
                        <SyntaxHighlighter language="json" style={materialOceanic}>
                            {`{
    {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62701",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
    "type": "passport",
    "number": "P1234567",
    "expiry_date": "2030-01-01"
    }
}`}
                        </SyntaxHighlighter>
                    )}
                    {tabValue === 1 && (
                        <SyntaxHighlighter language="python" style={materialOceanic}>
                            {`{
    {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62701",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
    "type": "passport",
    "number": "P1234567",
    "expiry_date": "2030-01-01"
    }
}`}
                        </SyntaxHighlighter>
                    )}
                    {tabValue === 2 && (
                        <SyntaxHighlighter language="javascript" style={materialOceanic}>
                            {`{
    "customer_id": "string",
    "name": "string",
    "date_of_birth": "string (ISO 8601)",
    "address": "string",
    "phone_number": "string",
    "email": "string"
}`}
                        </SyntaxHighlighter>
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    {
    "status": "success",
    "customer": {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "456 Elm St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62702",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
    "type": "passport",
    "number": "P1234567",
    "expiry_date": "2030-01-01"
    },
    "updated_at": "2024-06-25T11:00:00Z"
    }
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
                Retrieve Customer Profile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        POST /customers
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Retrieves a new customer profile.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="language tabs">
                        <Tab label="JSON" />
                        <Tab label="Python" />
                        <Tab label="JavaScript" />
                    </Tabs>

                    {tabValue === 0 && (
                        <SyntaxHighlighter language="json" style={materialOceanic}>
                            {`{
    GET /customers/CUST12345
}`}
                        </SyntaxHighlighter>
                    )}
                    {tabValue === 1 && (
                        <SyntaxHighlighter language="python" style={materialOceanic}>
                            {`{
    GET /customers/CUST12345
}`}
                        </SyntaxHighlighter>
                    )}
                    {tabValue === 2 && (
                        <SyntaxHighlighter language="javascript" style={materialOceanic}>
                            {`{
    "customer_id": "string",
    "name": "string",
    "date_of_birth": "string (ISO 8601)",
    "address": "string",
    "phone_number": "string",
    "email": "string"
}`}
                        </SyntaxHighlighter>
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    {
    "customer": {
    "customer_id": "CUST12345",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1234567890",
    "address": {
    "street": "456 Elm St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62702",
    "country": "USA"
    },
    "date_of_birth": "1990-01-01",
    "identification": {
    "type": "passport",
    "number": "P1234567",
    "expiry_date": "2030-01-01"
    },
    "created_at": "2024-06-25T10:00:00Z",
    "updated_at": "2024-06-25T11:00:00Z"
    }
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
                4. Audit Logs
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Retrieve Audit Logs
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Endpoint:
                    </Typography>
                    <SyntaxHighlighter language="plaintext" style={materialOceanic}>
                        GET /audit-logs
                    </SyntaxHighlighter>
                    <Typography variant="body1" paragraph>
                        Description: Retrieve a list of audit logs for all actions performed on the platform.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Query Parameters:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "date_from": "string (optional, ISO 8601)",
    "date_to": "string (optional, ISO 8601)",
    "action_type": "string (optional)"
}`}
                    </SyntaxHighlighter>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Response:
                    </Typography>
                    <SyntaxHighlighter language="json" style={materialOceanic}>
                        {`{
    "audit_logs": [
        {
            "log_id": "string",
            "user_id": "string",
            "action_type": "string",
            "description": "string",
            "created_at": "string (ISO 8601)"
        }
    ]
}`}
                    </SyntaxHighlighter>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Documentation;
