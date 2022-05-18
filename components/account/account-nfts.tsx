import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useWeb3 } from '../../hooks/use-web3';
import { useDispatch, useSelector } from '../../store';
import { listNfts } from '../../store/claim-store';
import { NftPreview } from './nft-preview';
import NextLink from 'next/link';

export const AccountNfts: FC = () => {

    const claimStore = useSelector((state) => state.claim);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { wallet } = useWeb3();

    useEffect(() => {
        if (wallet?.address) {
            setIsLoading(true);
            dispatch(listNfts(wallet!.address));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet?.address]);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimStore.claimPreviews]);

    return (
        <>
            <Box>
                {claimStore.error && (
                    <Typography variant="subtitle2" color="error">
                        {claimStore.error.message}
                    </Typography>
                )}
                <Grid
                    container
                    spacing={2}
                >
                    {claimStore.claimPreviews.length > 0 && claimStore.claimPreviews.map((preview) => {
                        return (
                            <Grid
                                key={preview.signature}
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                            >
                                <NftPreview preview={preview} />
                            </Grid>
                        )
                    })}
                    {claimStore.claimPreviews.length === 0 && !isLoading && (
                        <Stack
                            direction="column"
                            spacing={4}
                            sx={{
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pt: 4,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h4"
                                    color="textSecondary"
                                >
                                    You have no NFTs yet
                                </Typography>
                            </Box>
                            <Box>
                                <Image
                                    src="/images/nft-64.png"
                                    width={64}
                                    height={64}
                                    alt="No Claimed NFTs"
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant='subtitle1'
                                    color="textSecondary"
                                >
                                    Go checkout out our library and claim some!
                                </Typography>
                            </Box>
                            <Box>
                                <NextLink
                                    href="/library"
                                    passHref
                                >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Go to library
                                    </Button>
                                </NextLink>
                            </Box>
                        </Stack>
                    )}
                </Grid>
            </Box>
        </>
    );
};