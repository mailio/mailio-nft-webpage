import { Box, Card, CardContent, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';

interface AccountCoinsProps {
    accountData: any,
}

export const AccountCoins: FC<AccountCoinsProps> = (props) => {
    const { accountData } = props;
    console.log('accountData', accountData);

    const getBalance = () => {

    };

    // const [loadingMatic, setLoadingMatic] = useState<boolean>(true);
    // const [maticData, setMaticData] = useState<any>();

    // const [loadingEth, setLoadingEth] = useState<boolean>(true);
    // const [ethData, setEthData] = useState<any>();

    // const bal = useBalance()[1];

    // // load MATIC erc20
    // useMemo(() => {
    //     bal({
    //         addressOrName: accountData.address,
    //         token: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    //     }).then(res => {
    //         setMaticData(res.data);
    //         setLoadingMatic(false);
    //     }).catch(err => {
    //         console.error(err);
    //         setLoadingMatic(false);
    //     });
    // }, [bal, accountData.address]);

    // bal({
    //     addressOrName: accountData.address,
    // }).then(res => {
    //     setEthData(res.data);
    //     setLoadingEth(false);
    // }).catch(err => {
    //     console.error(err);
    //     setLoadingEth(false);
    // });


    // useEffect(() => {

    // }, []);

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
            >
                {/* <Card>
                    <CardContent
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1
                            }}
                        >
                            {loadingEth && <CircularProgress />}
                            <Stack direction="column">
                                <Box>
                                    {ethData?.symbol === 'ETH' ? <Image
                                        src="/images/ethereum-logo-portrait-purple-white.jpg"
                                        width={355}
                                        height={200}
                                        alt="Ethereum"
                                    /> : <></>}
                                </Box>
                                <Box
                                    textAlign="center"
                                >
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {ethData?.formatted}&nbsp;{ethData?.symbol}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card> */}
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
            >
                {/* <Card>
                    <CardContent
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1
                            }}
                        >
                            {loadingMatic && <CircularProgress />}
                            <Stack direction="column">
                                <Box>
                                    {maticData?.symbol === 'MATIC' ? <Image
                                        src="/images/ethereum-logo-portrait-purple-white.jpg"
                                        width={355}
                                        height={200}
                                        alt="Ethereum"
                                    /> : <></>}
                                </Box>
                                <Box
                                    textAlign="center"
                                >
                                    <Typography
                                        sx={{ mt: 1 }}
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {maticData?.formatted}&nbsp;{maticData?.symbol}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card> */}
            </Grid>
        </Grid>
    )
};