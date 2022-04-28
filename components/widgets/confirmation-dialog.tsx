import { Cancel } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface ConfirmationDialogProps {
    onClose: (confirmed: boolean, optionalItem?: any) => void;
    open: boolean;
    optionalText?: string,
    optionalItem?: any,
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
    const { onClose, open, optionalText, optionalItem, ...other } = props;

    const handleOnCloseFalse = () => {
        onClose(false, optionalItem);
    };
    const handleonCloseTrue = () => {
        onClose(true, optionalItem);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            {...other}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 3,
                    py: 2
                }}
            >
                <Typography variant="h6">
                    Delete
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleOnCloseFalse}
                >
                    <Cancel fontSize="small" />
                </IconButton>
            </Box>
            <DialogContent>
                <Box
                    sx={{
                        pt: 3,
                        pb: 3
                    }}
                >
                    <Typography variant="body1" color="error">
                        Are you sure you want to delete this item?
                    </Typography>
                    <Typography
                        variant='body1'
                        color='error'
                    >
                        {optionalText}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        pt: 3,
                    }}
                >
                    <Grid
                        container
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleOnCloseFalse}
                            >
                                No
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            alignContent="flex-end"
                            justifyContent="flex-end"
                            textAlign="right"
                        >
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleonCloseTrue}
                            >
                                Yes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

            </DialogContent>
        </Dialog>
    );
};