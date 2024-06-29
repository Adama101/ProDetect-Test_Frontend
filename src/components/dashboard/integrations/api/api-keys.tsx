'use client';

import React, { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, FormControlLabel, IconButton, InputAdornment, Stack, Switch, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const generateKey = () => uuidv4();

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
};

function APIKeys() {
    const [isLive, setIsLive] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const toggleMode = () => {
        setIsLive((prev) => !prev);
    };

    const generateKeys = () => {
        setPublicKey(generateKey());
        setPrivateKey(generateKey());
    };

    useEffect(() => {
        generateKeys();
    }, [isLive]);

    return (
        <Box sx={{ p: 3, position: 'relative' }}>
            <FormControlLabel
                control={<Switch checked={isLive} onChange={toggleMode} />}
                label={isLive ? 'Live Mode' : 'Test Mode'}
            />
            <Stack spacing={2} sx={{ mt: 3 }}>
                <TextField
                    label="Public Key"
                    value={publicKey}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => copyToClipboard(publicKey)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
                <TextField
                    label="Private Key"
                    value={privateKey}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => copyToClipboard(privateKey)}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
            </Stack>
            <Button
                variant="contained"
                href="/dashboard/integrations/api/documentation"
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                }}
            >
                Documentation
            </Button>
        </Box>
    );
}

export default APIKeys;
