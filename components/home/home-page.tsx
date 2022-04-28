import { FC } from 'react';
import { Box, Container, Divider, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SpeedBig } from '../../icons/speed-big';
import { BlockBig } from '../../icons/block-big';
import { User } from '../../icons/user';
import { UserBig } from '../../icons/user-big';
import { Trash } from '../../icons/trash';
import { Storage } from '../../icons/storage';
import { Show } from '../../icons/show';
import { Sent } from '../../icons/sent';
import { Refresh } from '../../icons/refresh';
import { MobileScreenLock } from '../../icons/mobile-screen-lock';
import { MaximizeWindow } from '../../icons/maximize';
import { UnreadEmail } from '../../icons/unread-email';
import { ReadEmail } from '../../icons/read-email';
import { Inbox } from '../../icons/inbox';
import { Drafts } from '../../icons/drafts';
import Link from 'next/link';
import { CardsExample } from '../widgets/cards';
import Image from 'next/image';
import NextLink from 'next/link';
import { HowItWorks } from './how-it-works';

export const HomePage: FC = (props) => {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    pt: 6,
                    pb: 21,
                }}
                {...props}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        align="center"
                        variant="h1"
                        sx={{
                            mt: 21,
                            mb: 6,
                        }}
                    >
                        Mailio Knowledge NFTs
                    </Typography>
                    <Typography
                        align="center"
                        variant="body2"
                        color="textSecondary"
                    >
                        Claim Your NFTs for the Mailio content You&apos;ve consumed
                    </Typography>
                    <Box
                        sx={{
                            mt: 6,
                            mb: 6,
                        }}
                    >
                        <NextLink
                            href="/library"
                            passHref
                        >
                            <Button
                                size="medium"
                                sx={{ ml: 2 }}
                                variant="contained"
                            >
                                Show Library
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
            <Divider />
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    pt: 6,
                    pb: 6,
                }}
                {...props}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        id="whatisthis"
                    >
                        <Typography
                            align="center"
                            sx={{ pb: 6 }}
                            variant="h2"
                        >
                            What is this?
                        </Typography>
                        <Grid
                            container
                            flexDirection="row"
                            spacing={6}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    align="center"
                                    sx={{
                                        pb: 6,
                                    }}
                                >
                                    Mailio Knowledge NFTs are digital badges, minted <b>for free</b> for anyone who consumes Mailio content.
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                            >
                                <Box
                                    sx={{
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Image src="/images/mailio-knowhow.jpg" width={1254} height={836} alt="handshake" />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Divider />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    pt: 6,
                    pb: 6,
                }}
                {...props}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        id="why"
                    >
                        <Typography
                            align="center"
                            sx={{ pb: 6 }}
                            variant="h2"
                        >
                            Why?
                        </Typography>
                        <Grid
                            container
                            flexDirection="row"
                            spacing={6}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                            >
                                <Box
                                    sx={{
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Image src="/images/mailio-handling-spam.jpg" width={1254} height={836} alt="handshake" />
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    align="center"
                                    sx={{
                                        pb: 6,
                                    }}
                                >
                                    We want our current and new users to be able to benefit from understanding the Mailio ecosystem.
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    align="center"
                                    sx={{
                                        pb: 6,
                                    }}
                                >
                                    Old ways of doing email is not sustainable anymore. Mailio is working on a <b>new approach</b>.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Divider />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    pt: 6,
                    pb: 6,
                }}
                {...props}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box>
                        <Typography
                            align="center"
                            sx={{ pb: 6 }}
                            variant="h2"
                        >
                            How does it work?
                        </Typography>
                        <HowItWorks />
                    </Box>
                </Container>
            </Box>
            <Divider />
        </>
    );
};
