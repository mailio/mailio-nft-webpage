import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Avatar,
    Box,
    ButtonBase,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { Face, Menu } from '@mui/icons-material';
import { AccountPopover } from './account-popover';
import { bridgeApi } from '../../api/bridge-api';
import { NETWORK_COIN_SYMBOL } from '../../config';
import { ethers } from 'ethers';

interface DashboardNavbarProps extends AppBarProps {
    onOpenSidebar?: () => void;
}


const DashboardNavbarRoot = styled(AppBar)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        ...(
            theme.palette.mode === 'light'
                ? {
                    boxShadow: theme.shadows[0]
                }
                : {
                    backgroundColor: theme.palette.background.paper,
                    borderBottomColor: 'none',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 0,
                }
        )
    })
);


const AccountButton = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

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
                        width: 40
                    }}
                >
                    <Face fontSize="small" />
                </Avatar>
            </Box>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
    const { onOpenSidebar, ...other } = props;

    const [balance, setBalance] = useState<string>('0');

    useEffect(() => {
        bridgeApi.getBridgeBalance().then((balance) => {
            if (balance.balance) {
                setBalance(balance.balance);
            }
        });
    }, []);

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280
                    },
                    width: {
                        lg: 'calc(100% - 280px)'
                    },
                    boxShadow: '0 1px 6px 0px rgba(60,64,67,0.15)',
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2
                    }}
                >
                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none'
                            }
                        }}
                    >
                        <Menu fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                    >
                        Bridge balance: {`${ethers.utils.formatEther(balance)} ${NETWORK_COIN_SYMBOL}`}
                    </Typography>
                    <AccountButton />
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
};
