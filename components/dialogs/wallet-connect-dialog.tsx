import { HighlightOff } from '@mui/icons-material';
import { Box, Grid, Modal, Typography, Stack, FormControlLabel, Link, IconButton, Checkbox } from '@mui/material';
import { FC, useState } from 'react';
import { CoinbaseConnectCard } from '../account/connect/coinbase-card';
import { MetaMaskConnectCard } from '../account/connect/metamask-card';
import { WalletConnectCard } from '../account/connect/walletconnect-card';

interface WalletConnectDialogProps {
    open: boolean;
    onClose: () => void;
    onConnect: () => void;
}

const WalletConnectDialog: FC<WalletConnectDialogProps> = (props) => {
    const { open, onClose, onConnect } = props;

    const [tosPolicy, setTosPolicy] = useState<boolean>(false);

    const onTosPolicyClick = () => {
        setTosPolicy(!tosPolicy);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="Connect Wallet"
                aria-describedby="Select Wallet to connect"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        p: 4,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Stack
                        direction="column"
                        alignContent="center"
                        sx={{
                            pb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                            }}
                        >
                            <IconButton onClick={onClose}>
                                <HighlightOff />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h4"
                            color="textSecondary"
                        >
                            Connect Wallet
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            sx={{
                                pb: 4,
                            }}
                        >
                            Select a wallet to connect you&apos;d like to connect with
                        </Typography>
                        <Box>
                            <FormControlLabel
                                control={(
                                    <Checkbox
                                        value={tosPolicy}
                                        onChange={() => setTosPolicy(!tosPolicy)}
                                        checked={tosPolicy}
                                    />
                                )}
                                label={(
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                    >
                                        I accept the
                                        {' '}
                                        <Link
                                            component="a"
                                            href="https://mail.io/tos"
                                        >
                                            Terms of Service
                                        </Link>
                                        {' '}
                                        and
                                        {' '}
                                        <Link
                                            component="a"
                                            href="https://mail.io/privacy"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </Typography>)}
                            />
                        </Box>
                    </Stack>
                    <Grid
                        container
                        flexDirection={{ sx: 'column', md: 'row' }}
                        spacing={2}
                        flexWrap="wrap"
                    >
                        {/* {data.connectors.map((connector: Connector<any, any>) => {
                        const walletDisplay: WalletDisplay | undefined = displayWalletConnectors.find((displayConnector) => displayConnector.name === connector.name);

                        return (
                            <Grid
                                key={connector.id}
                                item
                                sx={{
                                    pr: 2,
                                }}
                                xs={12}
                                sm={12}
                                md={4}
                            >
                                <Button
                                    variant="text"
                                    color="secondary"
                                    disabled={!connector.ready || !tosPolicy}
                                    onClick={() => { connect(connector); onClose(); }}
                                    sx={{
                                        borderRadius: '3px',
                                        border: '0.5px solid',
                                        borderColor: 'neutral.50',
                                        width: '100%',
                                        minWidth: '180px',
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="flex-end"
                                    >
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            {walletDisplay?.image && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={walletDisplay.image}
                                                    alt="Wallet Logo"
                                                    style={{
                                                        filter: tosPolicy ? 'grayscale(0%)' : 'grayscale(100%)',
                                                    }}
                                                    width={45}
                                                />
                                            )}
                                            <Typography
                                                variant="h6"
                                                color="textSecondary"
                                            >
                                                {connector.name}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Button>
                            </Grid>
                        )
                    })} */}
                        <Grid
                            // key={connector.id}
                            item
                            sx={{
                                pr: 2,
                            }}
                            xs={12}
                            sm={12}
                            md={4}
                        >
                            <MetaMaskConnectCard
                                tosPolicy={tosPolicy}
                                onClose={onClose}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                pr: 2,
                            }}
                            xs={12}
                            sm={12}
                            md={4}
                        >
                            <CoinbaseConnectCard
                                tosPolicy={tosPolicy}
                                onClose={onClose}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                pr: 2,
                            }}
                            xs={12}
                            sm={12}
                            md={4}
                        >
                            <WalletConnectCard
                                tosPolicy={tosPolicy}
                                onClose={onClose}
                            />
                        </Grid>
                    </Grid>
                    <Box>
                        <Typography
                            color="error"
                            variant="subtitle2"
                        >
                            {/* {error && <div>{error?.message ?? 'Failed to connect'}</div>} */}
                        </Typography>
                    </Box>
                </Box>
            </Modal >
        </>
    );
};

export default WalletConnectDialog;