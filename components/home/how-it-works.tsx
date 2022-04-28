import { Looks3, Looks4, LooksOne, LooksTwo, NavigateNext } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Link as MuiLink, Typography } from '@mui/material';
import { FC } from 'react';
import Link from 'next/link';

export const HowItWorks: FC = () => {
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
                                        <LooksOne
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
                                        Setup a Crypto Wallet
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Crypto wallets give you access to your cryptocurrencies and in this case Mailio Knowledge NFTs.
                                        Link will lead to Setup instructions for a crypto wallet Metamask by
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <MuiLink
                                color="textSecondary"
                                sx={{ ml: 2 }}
                                variant="subtitle2"
                                href="https://www.youtube.com/watch?v=OsRIHlr0_Iw"
                                target="_blank"
                            >
                                <Button
                                    endIcon={<NavigateNext fontSize="small" />}
                                    color="secondary"
                                >
                                    Metamask
                                </Button>
                            </MuiLink>
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
                                        <LooksTwo
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
                                        Go to Mailio Library
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Claiming Mailio Knowledge NFTs is Free. Once you have your wallet go to our Library and view our content.
                                        Make sure you write down the highlighted keywords.
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Link
                                href="/library"
                                passHref
                            >
                                <Button
                                    endIcon={<NavigateNext fontSize="small" />}
                                    color="secondary"
                                >
                                    Library
                                </Button>
                            </Link>
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
                                        <Looks3
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
                                        Claim your NFT
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Claim your NFT by entering all the highlighted keywords from the content. You&apos;ll be asked to sign the claim.
                                        It may take a few minutes before you can preview your NFT in your wallet.
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Link
                                href="/account"
                                passHref
                            >
                                <Button
                                    endIcon={<NavigateNext fontSize="small" />}
                                    color="secondary"
                                >
                                    My Account
                                </Button>
                            </Link>
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
                                        <Looks4
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
                                        Join our Discord
                                    </Typography>
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Our community is moving to Discord.<br /><br />
                                        Join to get updates and to discuss the project.
                                        <br />&nbsp;
                                    </Typography>
                                </div>
                                <Box sx={{ flexGrow: 1 }} />
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <MuiLink
                                color="textSecondary"
                                sx={{ ml: 2 }}
                                variant="subtitle2"
                                href="https://discord.gg/uzVbJA46E3"
                            >
                                <Button
                                    endIcon={<NavigateNext fontSize="small" />}
                                    color="secondary"
                                >
                                    Discord
                                </Button>
                            </MuiLink>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}