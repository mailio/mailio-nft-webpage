/* eslint-disable @next/next/no-img-element */
import { Button, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { upsertWallet, MyWallet, setWalletNetwork } from "../../../store/wallet-store";
import { connectWallet } from "../../web3/connect";
import { hooks, metaMask } from "../../web3/connectors/metamask";

interface MetaMaskConnectProps {
    onClose: () => void;
    tosPolicy: boolean,
}

export const MetaMaskConnect: FC<MetaMaskConnectProps> = (props) => {

    const { tosPolicy, onClose } = props;

    const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

    const dispatch = useDispatch();

    const chainId = useChainId();
    const accounts = useAccounts();
    const error = useError();
    const isActivating = useIsActivating();

    const isActive = useIsActive();

    const provider = useProvider();
    const ENSNames = useENSNames(provider);

    const connectMetamask = async () => {
        connectWallet(metaMask, 80001);
    };

    useEffect(() => {
        console.log('accounts: ', accounts);
        console.log('provider: ', provider);
        console.log('ENSNames: ', ENSNames);
        console.log('chainId: ', chainId);
        console.log('error: ', error);
        console.log('isActivating: ', isActivating);
        console.log('isActive: ', isActive);
        if (provider && (accounts && accounts?.length > 0)) {
            const network = provider.getNetwork().then(network => {
                dispatch(setWalletNetwork(accounts[0], network));
            });
        }
        if (accounts && accounts.length > 0) {
            const wallet: MyWallet = {
                name: 'MetaMask',
                address: accounts[0],
                isActive: isActive,
                ensNames: ENSNames,
            }
            dispatch(upsertWallet(wallet));
        }
    }, [accounts, provider, ENSNames, chainId, isActivating, isActive, error, dispatch]);

    return (
        <>
            <Button
                variant="text"
                color="secondary"
                disabled={!tosPolicy}
                onClick={() => { connectMetamask(); }}
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
                        <img
                            src="/images/meta-mask-fox.svg"
                            alt="Metamask Logo"
                            style={{
                                filter: tosPolicy ? 'grayscale(0%)' : 'grayscale(100%)',
                            }}
                            width={45}
                        />
                        <Typography
                            variant="h6"
                            color="textSecondary"
                        >
                            MetaMask
                        </Typography>
                    </Stack>
                </Stack>
            </Button>
        </>
    );
}