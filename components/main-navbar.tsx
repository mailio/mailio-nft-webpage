import { AppBar, Box, Button, Container, IconButton, Toolbar, Link, Avatar, ButtonBase } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { Logo } from './logo';
import { ConstructionOutlined, Menu } from '@mui/icons-material';
import { AccountPopover } from './account/account-popover';
import { MyWallet } from '../types/my-wallet';
import { useWeb3 } from '../hooks/use-web3';
import { DEFAULT_CHAINS, DEFAULT_CHAIN_ID } from '../config';
import toast from 'react-hot-toast';

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

    const { connect, wallet, provider } = useWeb3();

    const connectWallet = async () => {
        try {
            await connect();

        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        // chehck if on the right network
        provider?.getNetwork()?.then((network) => {
            console.log('network', network);
            // if user not on our desired network, ask to switch
            if (network.chainId !== DEFAULT_CHAIN_ID) {
                if (!window.ethereum) {
                    toast.error('No crypto wallet found');
                    return;
                }
                const ch = DEFAULT_CHAINS[DEFAULT_CHAIN_ID];
                console.log('switching to chain: ', ch);
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            ...ch,
                        }
                    ]
                }).then(() => {
                    toast.success('Succesfully switched network');
                }).catch((e) => {
                    console.error(e);
                    toast.error("Couldn't switch to the correct network");
                });
            }
        });
    }, [provider]);


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