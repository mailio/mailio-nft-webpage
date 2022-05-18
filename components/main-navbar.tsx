import { AppBar, Box, Button, Container, IconButton, Toolbar, Link, Avatar, ButtonBase } from '@mui/material';
import { FC, useRef, useState } from 'react';
import NextLink from 'next/link';
import { Logo } from './logo';
import { Menu } from '@mui/icons-material';
import { AccountPopover } from './account/account-popover';
import { MyWallet } from '../types/my-wallet';
import { useWeb3 } from '../hooks/use-web3';
import { DEFAULT_CHAIN_ID } from '../config';

interface MainNavbarProps {
    onOpenSidebar?: () => void;
}

interface AccountButtonProps {
    accountData: MyWallet;
}

const AccountButton: FC<AccountButtonProps> = (props: AccountButtonProps) => {
    const { accountData } = props;
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const user = {
        avatar: accountData.avatar ? accountData.avatar : '',
        name: (accountData.ensName && accountData.ensName?.length > 0) ? accountData.ensName : accountData.address,
    };

    const handleOpenPopover = (): void => {
        setOpenPopover(true);
    };

    const handleClosePopover = (): void => {
        setOpenPopover(false);
    };

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: 2
                }}
            >
                <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                        pt: user.avatar === '/images/icn-user.svg' ? 0.5 : 0,
                    }}
                    src={user.avatar}
                />
            </Box>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};

export const MainNavbar: FC<MainNavbarProps> = (props) => {
    const { onOpenSidebar } = props;

    const { connectTo, wallet, provider } = useWeb3();

    const connectWallet = async () => {
        try {
            await connectTo(DEFAULT_CHAIN_ID);

        } catch (e) {
            console.warn(e);
        }
    };

    return (
        <>
            <AppBar
                elevation={0}
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.secondary',
                    boxShadow: '0 1px 6px 0px rgba(60,64,67,0.15)',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        disableGutters
                        sx={{ minHeight: 64 }}
                    >
                        <NextLink
                            href="/"
                            passHref
                        >
                            <Box
                                sx={{
                                    marginTop: 2,
                                }}
                            >
                                <a
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Logo
                                        sx={{
                                            display: {
                                                md: 'inline',
                                                xs: 'none'
                                            },
                                            height: 29,
                                            width: 41,
                                        }}
                                    />
                                </a>
                            </Box>
                        </NextLink>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                            color="inherit"
                            onClick={onOpenSidebar}
                            sx={{
                                display: {
                                    md: 'none'
                                }
                            }}
                        >
                            <Menu fontSize="small" />
                        </IconButton>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: {
                                    md: 'flex',
                                    xs: 'none'
                                }
                            }}
                        >
                            <NextLink
                                href="/#whatisthis"
                                passHref
                            >
                                <Link
                                    color="textSecondary"
                                    underline="none"
                                    variant="subtitle2"
                                >
                                    What is this?
                                </Link>
                            </NextLink>
                            <NextLink
                                href="/#why"
                                passHref
                            >
                                <Link
                                    color="textSecondary"
                                    sx={{ ml: 2 }}
                                    underline="none"
                                    variant="subtitle2"
                                >
                                    Why?
                                </Link>
                            </NextLink>
                            <NextLink
                                href="/#howitworks"
                                passHref
                            >
                                <Link
                                    color="textSecondary"
                                    component="a"
                                    sx={{ ml: 2 }}
                                    underline="none"
                                    variant="subtitle2"
                                >
                                    How does it work?
                                </Link>
                            </NextLink>
                            {wallet ? (
                                <AccountButton
                                    accountData={wallet}
                                />
                            ) : (
                                <Button
                                    onClick={connectWallet}
                                    size="medium"
                                    sx={{ ml: 2 }}
                                    variant="contained"
                                >
                                    Connect Wallet
                                </Button>
                            )}

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};