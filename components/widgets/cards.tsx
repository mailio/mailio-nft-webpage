import type { FC } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavigateNext, Pending } from '@mui/icons-material';
import { UserBig } from '../../icons/user-big';
import { SpeedBig } from '../../icons/speed-big';
import { User } from '../../icons/user';
import Link from 'next/link';
import HighlightCard from './highlight-card';

export const CardsExample: FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 3
            }}
        >
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Card>
                        <CardContent
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 1
                                }}
                            >
                                <div>
                                    <Box
                                        sx={{
                                            mr: 2,
                                        }}
                                    >
                                        <User
                                            fontSize="large"
                                            color='secondary'
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <Typography
                                        variant="h4"
                                        color="textSecondary"
                                    >
                                        Your title here
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Loreum ipsum lorem ipsum lorem ipsum lorem ipsum
                                        Loreum ipsum lorem ipsum lorem ipsum lorem ipsum
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                endIcon={<NavigateNext fontSize="small" />}
                                color="secondary"
                            >
                                Details
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Card>
                        <CardContent
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 1
                                }}
                            >
                                <div>
                                    <Box
                                        sx={{
                                            mr: 2,
                                        }}
                                    >
                                        <UserBig />
                                    </Box>
                                </div>
                                <div>
                                    <Typography variant="h4">
                                        Your title here
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                    >
                                        Loreum ipsum lorem ipsum lorem ipsum lorem ipsum
                                        Loreum ipsum lorem ipsum lorem ipsum lorem ipsum
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                endIcon={<NavigateNext fontSize="small" />}
                            >
                                Details
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Card>
                        <CardContent
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <SpeedBig />
                                </div>
                                <div>
                                    <Chip
                                        icon={<Pending />}
                                        label="Waiting for approval"
                                        color="secondary"
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                        sx={{
                                            mt: 4,
                                        }}
                                    >
                                        Loreum ipsum lorem ipsum lorem ipsum lorem ipsum Loreum ipsum lorem ipsum lorem ipsum lorem ipsum Loreum ipsum lorem ipsum lorem ipsum lorem ipsum
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                endIcon={<NavigateNext fontSize="small" />}
                                color="secondary"
                            >
                                Details
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <HighlightCard
                        type="podcast"
                        date="15-Oct-2022"
                        title="Bad Monkey"
                        description="Highlight card design for full screen size. The graphic here is borrowed from https://knownorigin.io/tokens/119203. Design by David Moore"
                        imageSrc='/images/david_moore_monkey.gif'
                    >
                        <Box
                            sx={{
                                width: '100%',
                                textAlign: 'right',
                            }}
                        >
                            <Link
                                href="https://knownorigin.io/tokens/119203"
                                passHref={true}
                            >
                                <Button
                                    endIcon={<NavigateNext fontSize="small" />}
                                    color="secondary"
                                />
                            </Link>
                        </Box>
                    </HighlightCard>
                </Grid>
            </Grid>
        </Box >
    );
};
