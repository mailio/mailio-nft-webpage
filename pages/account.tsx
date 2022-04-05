import { Network } from "@ethersproject/networks";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { BigNumber } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
import { formatEther } from "ethers/lib/utils";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { AccountTransactions } from "../components/account/account-transactions";
import { MainLayout } from "../components/main-layout";
import { NETWORK_COIN_SYMBOL } from "../config";
import { useWeb3 } from "../hooks/use-web3";

const tabs = [
    { label: 'Transactions', value: 'transactions' },
];

const Account: NextPage = () => {
    const [currentTab, setCurrentTab] = useState<string>('transactions');

    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
    const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

    const { wallet, provider } = useWeb3();

    const getBalance = async (provider: BaseProvider, address: string): Promise<BigNumber> => {
        if (provider && address) {
            return provider.getBalance(address);
        }
        return BigNumber.from(0);
    };

    useEffect(() => {
        if (wallet?.address && provider) {
            setLoadingBalance(true);
            getBalance(provider, wallet.address).then((balance) => {
                setBalance(balance);
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setLoadingBalance(false);
            });
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
                    {currentTab === 'transactions' && <AccountTransactions />}
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