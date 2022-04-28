import { Face, Logout } from "@mui/icons-material";
import { Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAuth } from "../../hooks/use-auth";

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {

    const { anchorEl, onClose, open, ...other } = props;
    const router = useRouter();
    const { logout } = useAuth();

    const logoutAdmin = () => {
        logout();
        router.push("/");
    }

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
                keepMounted
                onClose={onClose}
                open={open}
                PaperProps={{ sx: { width: 300 } }}
                transitionDuration={0}
                {...other}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        p: 2,
                        display: 'flex'
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
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1">
                            Admin
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ my: 1 }}>
                    <MenuItem onClick={logoutAdmin}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={(
                                <Typography variant="subtitle1">
                                    Logout
                                </Typography>
                            )}
                        />
                    </MenuItem>
                </Box>

            </Popover>
        </>
    );
};