import { FC } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ClientErrorProps {
    reset: () => void;
}

const ClientError: FC<ClientErrorProps> = (props) => {
    const { reset } = props;
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Head>
                <title>
                    Error: Client Error
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flexGrow: 1,
                    py: '80px'
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        align="center"
                        variant={mobileDevice ? 'h4' : 'h1'}
                    >
                        400: Something went wrong
                    </Typography>
                    <Typography
                        align="center"
                        color="textSecondary"
                        sx={{ mt: 0.5 }}
                        variant="subtitle2"
                    >
                        You&apos;ve encountered an error. Please try again later or report the problem to the administrator.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 6
                        }}
                    >
                        <NextLink
                            href="/"
                            passHref
                        >
                            <Button
                                onClick={reset}
                                component="a"
                                variant="outlined"
                            >
                                Back to Start
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ClientError;

