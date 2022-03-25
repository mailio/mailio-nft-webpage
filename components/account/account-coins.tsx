import { Box, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useBalance, useProvider } from 'wagmi';

interface AccountCoinsProps {
    accountData: any,
}

export const AccountCoins: FC<AccountCoinsProps> = (props) => {
    const { accountData } = props;

    const [{ data, error, loading }, getBalance] = useBalance({
        addressOrName: accountData.address,
    });
    const provider = useProvider();

    useEffect(() => {
        // provider.getHistory(accountData.address).then((history: any) => {
        //     console.log('history: ', history);
        // });
    }, []);
    return (
        <Box>
            <Typography>
                Coins
            </Typography>
            <Typography>
                {data?.formatted} {data?.symbol}
            </Typography>
        </Box>
    )
};