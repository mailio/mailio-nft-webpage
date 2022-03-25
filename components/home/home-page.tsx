import type { FC } from 'react';
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

export const HomePage: FC = (props) => {
    const theme = useTheme();

    return (
        <>
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
                    <h2>Typography</h2>
                    <Typography
                        align="center"
                        variant="h1"
                    >
                        H1
                    </Typography>
                    <Typography
                        align="center"
                        variant="h2"
                    >
                        H2
                    </Typography>
                    <Typography
                        align="center"
                        variant="h3"
                    >
                        H3
                    </Typography>
                    <Typography
                        align="center"
                        variant="h4"
                    >
                        H4
                    </Typography>
                    <Typography
                        align="center"
                        variant="h5"
                    >
                        H5
                    </Typography>
                    <Typography
                        align="center"
                        variant="body1"
                    >
                        Body 1
                    </Typography>
                    <Typography
                        align="center"
                        variant="body2"
                        color="textSecondary"
                    >
                        Body 2
                    </Typography>
                    <Typography
                        align="center"
                        variant="subtitle1"
                    >
                        Subtitle 1
                    </Typography>
                    <Typography
                        align="center"
                        variant="subtitle2"
                    >
                        Subtitle 2
                    </Typography>
                    <Typography
                        align="center"
                        variant="caption"
                    >
                        Caption
                    </Typography>
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
                    <Box>
                        <Typography
                            align="center"
                            sx={{ pb: 6 }}
                            variant="h2"
                        >
                            Custom Icons
                        </Typography>
                        <Grid
                            container
                            flexDirection="row"
                        >
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <User
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    User
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Trash
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Trash
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Storage
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Storage
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Show
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Show
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Sent
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Send
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Refresh
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Refresh
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <MobileScreenLock
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Mobile Lock
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <MaximizeWindow
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Maximize Window
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <UnreadEmail
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Mark Unread
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <ReadEmail
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Mark Read
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Inbox
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Inbox
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    p: 6,
                                    width: '150px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'neutral.50',
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                <Drafts
                                    fontSize='medium'
                                    color='secondary'
                                />
                                <Typography
                                    color='secondary'
                                    variant='subtitle1'
                                >
                                    Drafts
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Link href="https://fonts.google.com/icons">
                            <Typography
                                color='secondary'
                                variant='subtitle1'
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Material Icons Library
                            </Typography>
                        </Link>
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
                            Graphics
                        </Typography>
                        <Grid
                            container
                            flexDirection="row"
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <img src="/images/img-handshake.svg" />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <img src="/images/img-inbox.svg" />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <img src="/images/img-trust.svg" />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            flexDirection="row"
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <SpeedBig />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <BlockBig />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <UserBig />
                            </Grid>
                        </Grid>
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
                    <Box>
                        <Typography
                            align="center"
                            sx={{ pb: 6 }}
                            variant="h2"
                        >
                            Buttons
                        </Typography>
                        <Grid
                            container
                            flexDirection="row"
                            spacing={12}
                        >
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <Button
                                    size="large"
                                    variant="contained"
                                >
                                    Contained
                                </Button>
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <Button
                                    size="large"
                                    variant="outlined"
                                >
                                    Outlined
                                </Button>
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <Button
                                    size="large"
                                    variant="text"
                                >
                                    Text
                                </Button>
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={4}
                                textAlign="center"
                            >
                                <Button
                                    size="large"
                                    variant="contained"
                                    disabled
                                >
                                    Disabled
                                </Button>
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
                            Cards
                        </Typography>
                        <CardsExample />
                    </Box>
                </Container>
            </Box>
            <Divider />
        </>
    );
};
