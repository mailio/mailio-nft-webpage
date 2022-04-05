import { Avatar, Box, Divider, Popover, Typography, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { FC } from "react";
import NextLink from 'next/link';
import { AccountCircle, Logout } from "@mui/icons-material";
import { shortenWalletAddress } from "../../utility/walletUtils";
import { useRouter } from "next/router";
import { User } from "../../icons/user";
import { useWeb3 } from "../../hooks/use-web3";

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const router = useRouter();

    const { wallet, disconnect } = useWeb3();

    // handle wallet disconnect
    const handleDisconnect = (): void => {
        disconnect()
        onClose?.();
        router.push('/');
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
            keepMounted
            onClose={onClose}
            open={open}
            {...other}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    p: 2,
                    display: 'flex',
                }}
            >
                <Avatar
                    src={wallet?.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                        pt: wallet?.avatar === '/images/icn-user.svg' ? 0.5 : 0,
                    }}
                >
                    <User fontSize="small" />
                </Avatar>
                <Box
                    sx={{
                        ml: 1
                    }}
                >
                    <Typography variant="subtitle1">
                        {wallet?.ensName}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="subtitle2"
                    >
                        {wallet?.address ? shortenWalletAddress(wallet.address) : ''}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1 }}>
                <NextLink
                    href="/account"
                    passHref
                >
                    <MenuItem
                        component="a"
                        onClick={onClose}
                    >
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={(
                                <Typography variant="subtitle1">
                                    My Account
                                </Typography>
                            )}
                        />
                    </MenuItem>
                </NextLink>

                <MenuItem onClick={handleDisconnect}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={(
                            <Typography variant="subtitle1">
                                Disconnect
                            </Typography>
                        )}
                    />
                </MenuItem>
            </Box>
        </Popover >
    );
};