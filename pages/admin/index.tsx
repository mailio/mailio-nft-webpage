import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Logo } from '../../components/logo';
import { Login as LoginComponent } from '../../components/login/login';

const Login: NextPage = () => {
    const router = useRouter();
    // const { platform } = useAuth() as any;
    const { disableGuard } = router.query;

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Box
                component="div"
                className="star-field"
                sx={{
                    backgroundImage: 'linear-gradient(to bottom, #222222, #212529)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >

                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>


                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: '60px',
                            md: '120px',
                        }
                    }}
                >
                    < Box
                        display="flex"
                        sx={{
                            width: '100%',
                            zIndex: 100,
                        }}
                        alignItems="center"
                        justifyContent="center"
                        mb={6}
                    >
                        <Logo variant='white' />
                    </Box>
                    <Card
                        elevation={12}
                        sx={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                p: 4,
                            }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Stack direction="column" spacing={4}>
                                <Typography
                                    color="white"
                                    sx={{ mt: 2, textAlign: 'center' }}
                                    variant="body2"
                                >
                                    Sign in on the internal platform
                                </Typography>
                                <LoginComponent />
                            </Stack>
                        </Box>
                    </Card>
                </Container>

            </Box >
        </>
    );
};

Login.getLayout = (page) => (
    <>
        {page}
    </>
);

export default Login;