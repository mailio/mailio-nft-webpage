import { AppBar, Box, Button, Container, IconButton, Toolbar, Link, Avatar, ButtonBase } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { Logo } from './logo';
import { AccessAlarm } from '@mui/icons-material';
import WalletConnectDialog from './dialogs/wallet-connect-dialog';
import { useAccount, useConnect } from 'wagmi';
import { AccountPopover } from './account-popover';
import { User } from '../icons/user';
import { UserBig } from '../icons/user-big';

interface MainNavbarProps {
    onOpenSidebar?: () => void;
}

interface AccountButtonProps {
    accountData: any;
}

const AccountButton = (props: AccountButtonProps) => {
    const { accountData } = props;
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const user = {
        avatar: accountData.ens?.avatar ? accountData.ens.avatar : '/images/icn-user.svg',
        name: accountData.ens?.name,
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
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

    const handleConnectWalletClick = () => {
        setWalletModalOpen(true);
    };
    const [{ data: accountData }] = useAccount({
        fetchEns: true,
    });

    return (
        <>
            <AppBar
                elevation={0}
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.secondary',
                }}
            >
                <Container maxWidth="lg">
                    <WalletConnectDialog
                        open={walletModalOpen}
                        onClose={() => setWalletModalOpen(false)}
                        onConnect={() => console.log('connected')}
                    />
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
                                    marginTop: 1,
                                }}
                            >
                                <a>
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
                            <AccessAlarm fontSize="small" />
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
                                href="/"
                                passHref
                            >
                                <Link
                                    color="textSecondary"
                                    underline="none"
                                    variant="subtitle2"
                                >
                                    Example Link 1
                                </Link>
                            </NextLink>
                            <NextLink
                                href="/browse"
                                passHref
                            >
                                <Link
                                    color="textSecondary"
                                    sx={{ ml: 2 }}
                                    underline="none"
                                    variant="subtitle2"
                                >
                                    Example Link 2
                                </Link>
                            </NextLink>
                            <NextLink
                                href="/"
                                passHref
                            >
                                <Link
                                    color="textSecondary"
                                    component="a"
                                    sx={{ ml: 2 }}
                                    underline="none"
                                    variant="subtitle2"
                                >
                                    Example Link 3
                                </Link>
                            </NextLink>
                            {accountData ? (
                                <AccountButton
                                    accountData={accountData}
                                />
                            ) : (
                                <Button
                                    onClick={handleConnectWalletClick}
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