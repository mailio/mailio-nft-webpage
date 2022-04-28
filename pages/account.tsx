import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
import { formatEther } from "ethers/lib/utils";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { MainLayout } from "../components/main-layout";
import { NETWORK_COIN_SYMBOL } from "../config";
import { useWeb3 } from "../hooks/use-web3";
import { AccountNfts } from "../components/account/account-nfts";

const tabs = [
    { label: 'Claimed NFTs', value: 'nfts' },
];

const Account: NextPage = () => {
    const [currentTab, setCurrentTab] = useState<string>('nfts');

    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
    const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

    const { wallet, provider } = useWeb3();

    const loadWalletBalance = async (provider: BaseProvider, address: string) => {
        if (provider && address) {
            try {
                setLoadingBalance(true);
                const bal = await provider.getBalance(address);
                setBalance(bal);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingBalance(false);
            }
        } else {
            setBalance(BigNumber.from(0));
        }
    };

    useEffect(() => {
        if (wallet?.address && provider) {
            loadWalletBalance(provider, wallet.address);
        }
    }, [wallet, provider]);


    return (
        <>
            <Head>
                <title>
                    Mailio Account
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    minHeight: '100vh',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h4">
                        My Account
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                    >
                        {wallet?.ensName}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                    >
                        Address: {wallet?.address}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                    >
                        {!loadingBalance && (`Balance: ${formatEther(balance)} ${NETWORK_COIN_SYMBOL}`)}
                        {loadingBalance && 'Loading balance...'}
                    </Typography>
                    <Tabs
                        indicatorColor="primary"
                        onChange={(event: ChangeEvent<{}>, value: string) => setCurrentTab(value)}
                        scrollButtons="auto"
                        textColor="primary"
                        value={currentTab}
                        variant="scrollable"
                        sx={{ mt: 3 }}
                    >

                        {tabs.map(({ label, value }) => (
                            <Tab
                                key={value}
                                label={label}
                                value={value}
                            />
                        ))}
                    </Tabs>
                    <Divider sx={{ mb: 3 }} />
                    {currentTab === 'nfts' && <AccountNfts />}
                </Container>
            </Box>
        </>
    );
};

Account.getLayout = (page) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default Account;