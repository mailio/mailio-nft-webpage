import { Avatar, Box, Divider, Popover, Typography, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { User } from "../icons/user";
import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import { AccountCircle, Logout, SupervisedUserCircle } from "@mui/icons-material";
import { shortenWalletAddress } from "../utility/walletUtils";
import { useRouter } from "next/router";

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const [avatar, setAvatar] = useState<string>('');
    const [name, setName] = useState<string>('');
    const router = useRouter();

    const [{ data: accountData }, disconnect] = useAccount({
        fetchEns: true,
    })

    const handleDisconnect = (): void => {
        onClose?.();
        disconnect();
        router.push('/');
    };

    useEffect(() => {
        if (accountData) {
            if (accountData.ens?.avatar) {
                setAvatar(accountData.ens.avatar);
            }
            if (accountData.ens?.name) {
                setName(accountData.ens.name);
            }
        }
    }, [accountData]);

    useEffect(() => {
        setAvatar('/images/icn-user.svg');
    }, []);

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
                    src={avatar}
                    sx={{
                        height: 40,
                        width: 40,
                        pt: avatar === '/images/icn-user.svg' ? 0.5 : 0,
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
                        {name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="subtitle2"
                    >
                        {accountData?.address ? shortenWalletAddress(accountData.address) : ''}
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