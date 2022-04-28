import { Box, Button, ListItem } from '@mui/material';
import { FC, ReactNode } from 'react';
import NextLink from 'next/link';

interface DashboardSidebarItemProps {
    active?: boolean,
    name: string,
    icon?: ReactNode,
    path: string,
}

export const DashboardSidebarItem: FC<DashboardSidebarItemProps> = (props) => {

    const { active, name, icon, path } = props;

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'block',
                mb: 0.5,
                py: 0,
                px: 2
            }}
        >
            <NextLink
                href={path}
                passHref
            >
                <Button
                    disableRipple
                    component="a"
                    startIcon={icon}
                    sx={{
                        justifyContent: 'flex-start',
                        color: active ? 'white' : 'neutral.300',
                        backgroundColor: active ? 'secondary.light' : 'transparent',
                        pl: '16px',
                        pr: '16px',
                        textAlign: 'left',
                        textTransform: 'none',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0, .08)',
                        },
                        "& .MuiSvgIcon-root": {
                            color: active ? 'white' : 'neutral.300',
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {name}
                    </Box>
                </Button>
            </NextLink>
        </ListItem>
    );
};