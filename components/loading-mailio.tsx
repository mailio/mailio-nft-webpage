import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { Logo } from './logo';

export const LoadingMailio: FC = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                height: '100vh',
                margin: 0,
                placeItems: 'center center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Logo variant='blue' />
                <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    sx={{
                        pt: 2,
                    }}
                >
                    Loading...Please wait
                </Typography>
            </Box>
        </Box>
    );
};