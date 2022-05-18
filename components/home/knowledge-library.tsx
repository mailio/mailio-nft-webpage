import { Recommend } from '@mui/icons-material';
import { Box, Container, Grid, LinearProgress, Typography, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../store';
import { listCatalogs } from '../../store/catalog-store';
import { format } from 'date-fns';
import NextLink from 'next/link';
import { Catalog } from '../../types/catalog';
import { useWeb3 } from '../../hooks/use-web3';
import { DEFAULT_CHAIN_ID, IPFS_GATEWAY_URL } from '../../config';
import toast from 'react-hot-toast';
import HighlightCard from '../widgets/highlight-card';
import Router, { useRouter } from 'next/router';

export const MailioKnowledgeLibrary: FC = () => {

    const catalogStore = useSelector((state) => state.catalog);
    const dispatch = useDispatch();
    const { connectTo, wallet } = useWeb3();
    const [isClaiming, setIsClaiming] = useState<boolean>(false);

    const router = useRouter();

    const [openCatalogId, setOpenCatalogId] = useState<string>('');


    const handleClaimClick = async (catalog: Catalog) => {
        setIsClaiming(true);
        try {
            let addr = wallet?.address;
            if (!addr) {
                const prov = await connectTo(DEFAULT_CHAIN_ID);
                if (prov) {
                    const signer = prov!.getSigner();
                    addr = await signer.getAddress();
                }
            }
            if (!addr) {
                toast.error('failed to sign in. Please try connecting your wallet again.');
                return;
            }
            router.push(`/library/${catalog.id}/claim`);
        } catch (e) {
            console.error(e);
        } finally {
            setIsClaiming(false);
        }
    };

    useEffect(() => {
        dispatch(listCatalogs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box
                sx={{
                    p: 3
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        {catalogStore.catalog.map((catalog) => (

                            <Grid
                                key={catalog.id}
                                item
                                xs={12}
                                lg={12}
                            >
                                <HighlightCard
                                    type={catalog.type}
                                    date={format(catalog.created ? catalog.created : 0, 'MMMM dd, yyyy')}
                                    title={catalog.name ? catalog.name : 'Untitled'}
                                    description={catalog.description ? catalog.description : 'No description'}
                                    imageSrc={catalog.imageLink ? IPFS_GATEWAY_URL + "/" + catalog.imageLink : ''}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                pt: 2,
                                                pb: 2,
                                            }}
                                        >
                                            {catalog.nftTokensUsed === 100 && (
                                                <Typography
                                                    variant="subtitle2"
                                                    color="textSecondary"
                                                >
                                                    Out of stock
                                                </Typography>
                                            )}
                                        </Box>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                                lg={6}
                                                sx={{
                                                    textAlign: 'left',
                                                }}
                                            >
                                                <NextLink
                                                    href={catalog.contentLink}
                                                    passHref
                                                >
                                                    <a
                                                        target="_blank"
                                                        style={{
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                        >
                                                            View content
                                                        </Button>
                                                    </a>
                                                </NextLink>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                lg={6}
                                                sx={{
                                                    textAlign: 'right',
                                                    // mr: 1,
                                                }}
                                            >
                                                <Button
                                                    // loading={isClaiming}
                                                    fullWidth
                                                    endIcon={<Recommend fontSize="small" />}
                                                    color="primary"
                                                    variant='contained'
                                                    disabled={catalog.nftTokensUsed >= 100}
                                                    onClick={() => handleClaimClick(catalog)}
                                                >
                                                    Got Keywords
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </HighlightCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};