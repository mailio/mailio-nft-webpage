import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { Claim } from '../../types/claim';
import NextLink from 'next/link';

interface ClaimSuccessProps {
    claim?: Claim;
}

export const ClaimSuccess: FC<ClaimSuccessProps> = (props) => {
    const { claim } = props;

    return (
        <>
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Stack
                    direction="column"
                    spacing={4}
                    alignItems="center"
                >
                    <Image src="/images/nft-token-13046.svg" alt="nft token" width={200} height={200} />
                    <Typography
                        variant='h4'
                        color='textSecondary'
                    >
                        Success! We&apos;re minting your NFT.
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        color='textSecondary'
                    >
                        The minting may take a few minutes, depending on the transaction processing speed of the blockchain.
                        You&apos;ll be able to see your NFT in your account once it&apos;s confirmed.
                    </Typography>
                    <NextLink
                        href="/account"
                        passHref
                    >
                        <Button
                            variant='contained'
                        >
                            My Account
                        </Button>
                    </NextLink>
                </Stack>
            </Box>
        </>
    );
};