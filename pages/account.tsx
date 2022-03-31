import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
// import { useAccount } from "wagmi";
import { AccountCoins } from "../components/account/account-coins";
import { AccountTransactions } from "../components/account/account-transactions";
import { MainLayout } from "../components/main-layout";

const tabs = [
    { label: 'Transactions', value: 'transactions' },
    { label: 'Coins', value: 'coins' },
];

const Account: NextPage = () => {
    const [currentTab, setCurrentTab] = useState<string>('transactions');
    // const [{ data, error, loading }] = useAccount({
    //     fetchEns: false,
    // });

    // const [accountData, setAccountData] = useState<any>({
    //     address: '',
    // });

    // useEffect(() => {
    //     if (data?.address && accountData.address !== data.address) {
    //         setAccountData(data);
    //     }
    // }, [data, accountData?.address]);
    const accountData = undefined;

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
                        {/* {data?.ens?.name} */}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                    >
                        {/* Address: {data?.address} */}
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
                    {currentTab === 'coins' && <AccountCoins accountData={accountData} />}
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