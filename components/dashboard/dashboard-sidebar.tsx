import { Box, Drawer, List, Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import SimpleBarReact from "simplebar-react";
import NextLink from 'next/link';
import { Logo } from '../logo';
import { DashboardSidebarItem } from './dashboard-sidebar-item';
import { BorderRight, Collections, ListAlt, RocketLaunch } from '@mui/icons-material';

interface DashboardSidebarProps {
    onClose: () => void;
    open: boolean;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onClose, open } = props;
    const router = useRouter();
    const lgUp = useMediaQuery(
        (theme: Theme) => theme.breakpoints.up('lg'),
        {
            noSsr: true
        }
    );

    const handlePathChange = () => {
        if (!router.isReady) {
            return;
        }

        if (open) {
            onClose?.();
        }
    };

    useEffect(
        handlePathChange,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady, router.asPath]
    );

    const menuContent = (
        <>
            <SimpleBarReact style={{
                height: '100%',
                borderRight: '1px solid rgba(0,0,0,0.12)',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <div>
                        <Box sx={{ p: 3 }}>
                            <NextLink
                                href="/admin/dashboard"
                                passHref
                            >
                                <a>
                                    <Logo
                                        sx={{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                </a>
                            </NextLink>
                        </Box>
                    </div>
                    <Box sx={{ flexGrow: 1 }}>
                        <List
                            disablePadding
                        >
                            <DashboardSidebarItem
                                name='Claimed'
                                active={'/admin/dashboard' === router.asPath}
                                path='/admin/dashboard'
                                icon={<RocketLaunch fontSize='small' />}
                            />
                            <DashboardSidebarItem
                                name='Catalogs'
                                active={new RegExp('/admin/dashboard/catalogs.*').test(router.asPath)}
                                path='/admin/dashboard/catalogs'
                                icon={<ListAlt fontSize='small' />}
                            />
                            <DashboardSidebarItem
                                name='Nft Gallery'
                                active={new RegExp('/admin/dashboard/gallery.*').test(router.asPath)}
                                path='/admin/dashboard/gallery'
                                icon={<Collections fontSize='small' />}
                            />
                        </List>
                    </Box>
                </Box>
            </SimpleBarReact>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                        borderRightColor: 'divider',
                        borderRightStyle: 'solid',
                        borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {menuContent}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'background.mailioblack',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {menuContent}
        </Drawer>
    );
};