/* eslint-disable @next/next/no-img-element */
import { AddCircleOutline, Delete, EventAvailable, Store } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { bridgeApi } from "../../api/bridge-api";
import { nftServerApi } from "../../api/nft-server-api";
import { IPFS_GATEWAY_URL } from "../../config";
import { useWeb3 } from "../../hooks/use-web3";
import { Catalog } from "../../types/catalog";
import { Claim } from "../../types/claim";
import { Info } from "../widgets/info";
import { ClaimSuccess } from "./claim-success";

interface ClaimFormProps {
    catalog: Catalog | null,
}

interface ClaimInput extends Claim { }

export const ClaimForm: FC<ClaimFormProps> = (props) => {
    const { catalog, ...other } = props;
    const router = useRouter();

    const { wallet, provider } = useWeb3();
    const [claim, setClaim] = useState<Claim>();
    const [isClaiming, setIsClaiming] = useState<boolean>(false); // is in the process of claiming
    const [hasClaimed, setHasClaimed] = useState<boolean>(false); // has claimed (process of claiming successfully done)

    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<ClaimInput>();
    const { fields, append, remove } = useFieldArray({
        name: 'keywords',
        control
    })

    const onSubmit = async (data: ClaimInput) => {
        // create eip-712 signature first then submit the form
        if (!wallet?.address || !catalog || !provider) {
            toast.error('Please connect your wallet first');
            router.push('/library');
            return;
        }
        try {
            setIsClaiming(true);
            const payload = await nftServerApi.getSignaturePayload(wallet!.address, catalog.id!);
            const signer = provider.getSigner();
            const signature = await signer.provider.send('eth_signTypedData_v4', [
                wallet!.address,
                JSON.stringify(payload)
            ]);
            const clm: Claim = {
                catalogId: catalog.id,
                walletAddress: wallet?.address,
                mailioAddress: data.mailioAddress,
                keywords: data.keywords,
                signature: signature,
            } as Claim;

            const successClaim = await nftServerApi.claim(clm);
            console.log('the success claim: ', successClaim);
            setClaim(successClaim);
            setHasClaimed(true);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsClaiming(false);
        };
    };

    const addKeyword = () => {
        append({ word: '' });
    };

    useEffect(() => {
        append({ word: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {hasClaimed && <ClaimSuccess claim={claim} />}
            {!hasClaimed && (
                <>
                    <Box
                        sx={{
                            mb: 3,
                        }}
                    >
                        <Info
                            message="Claiming means the image will be added as an NFT to your wallet. NFT proves you're farmiliar with our content. We'll pick up the transaction cost making it completely FREE for you to get the NFT."
                        />
                    </Box>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <Stack direction="column" spacing={2}>
                                    <TextField
                                        InputProps={{ style: { fontSize: 16 } }}
                                        InputLabelProps={{ style: { fontSize: 16 } }}
                                        label="Mailio SmartKey Address (optional...)"
                                        placeholder="0x..."
                                        variant="outlined"
                                        id="mailioAddress"
                                        {...register('mailioAddress', { required: false })}
                                    />
                                    {fields.map((item, i) => (
                                        <Stack spacing={2} key={i} direction="row">
                                            <TextField
                                                key={i}
                                                InputProps={{ style: { fontSize: 16 } }}
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                label="Keyword"
                                                placeholder={`Claim Keyword ${i}`}
                                                variant="outlined"
                                                id={`Keywords[${i}]word`}
                                                {...register(`keywords.${i}.word`, { required: true })}
                                            />
                                            <IconButton
                                                onClick={() => remove(i)}
                                            >
                                                <Delete fontSize="medium" />
                                            </IconButton>
                                            {i === fields.length - 1 && (
                                                <IconButton
                                                    onClick={addKeyword}
                                                >
                                                    <AddCircleOutline fontSize="medium" />
                                                </IconButton>
                                            )}
                                        </Stack>
                                    ))}
                                    <Box
                                        sx={{
                                            width: { xs: '100%', sm: '250px' },
                                        }}
                                    >
                                        <LoadingButton
                                            fullWidth
                                            loading={isClaiming}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Claim
                                        </LoadingButton>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <Grid
                                    container
                                    sx={{
                                        flexDisplay: { xs: 'column', md: 'row' }
                                    }}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                    >
                                        <Card
                                            elevation={10}
                                        >
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Store color="secondary" fontSize="medium" />
                                                    <Typography
                                                        color="textSecondary"
                                                        sx={{ pl: 1 }}
                                                        variant="subtitle2"
                                                    >
                                                        Claimed
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    color="primary.main"
                                                    sx={{ mt: 2 }}
                                                    variant="h4"
                                                >
                                                    {catalog?.nftTokensUsed}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                    >
                                        <Card
                                            elevation={10}
                                        >
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <EventAvailable color="secondary" fontSize="medium" />
                                                    <Typography
                                                        color="textSecondary"
                                                        sx={{ pl: 1 }}
                                                        variant="subtitle2"
                                                    >
                                                        Available
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    color="primary.main"
                                                    sx={{ mt: 2 }}
                                                    variant="h4"
                                                >
                                                    {100 - (catalog ? catalog.nftTokensUsed : 0)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                    >
                                        <Card
                                            elevation={10}
                                        >
                                            <CardContent>
                                                <img
                                                    src={catalog?.imageLink ? IPFS_GATEWAY_URL + "/" + catalog.imageLink : '/images/highlight-background.svg'}
                                                    alt="catalog"
                                                    style={{
                                                        flexShrink: 0,
                                                        width: '100%',
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </>
    );
};