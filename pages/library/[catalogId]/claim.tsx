import { NextPage } from 'next';
import { MainLayout } from '../../../components/main-layout';
import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { ClaimForm } from '../../../components/home/claim-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Catalog } from '../../../types/catalog';
import { ArrowBack } from '@mui/icons-material';
import NextLink from 'next/link';
import { nftServerApi } from '../../../api/nft-server-api';
import toast from 'react-hot-toast';

const Claim: NextPage = () => {

    const router = useRouter();
    const { catalogId } = router.query;

    const [catalog, setCatalog] = useState<Catalog | null>(null);

    useEffect(() => {
        if (catalogId) {
            if (!Array.isArray(catalogId)) {
                nftServerApi.getCatalog(catalogId).then((cat) => {
                    setCatalog(cat);
                }).catch((e) => {
                    console.error(e);
                    toast.error('failed to load catalog');
                });
            }
        }
    }, [catalogId]);

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                pt: 6,
                pb: 21,
            }}
        >
            <Container
                maxWidth="md"
            >
                <Stack direction="column" spacing={6}>
                    <Typography

                        variant="h1"
                        sx={{
                            pt: 6,
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        &apos;{catalog?.name}&apos;
                    </Typography>
                    <Grid
                        container
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Box sx={{ mb: 4 }}>
                                <NextLink
                                    href="/library"
                                    passHref
                                >
                                    <Link
                                        color="textPrimary"
                                        component="a"
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <ArrowBack
                                            fontSize="small"
                                            sx={{ mr: 1 }}
                                            color="secondary"
                                        />
                                        <Typography variant="subtitle2" color="secondary">
                                            Library
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            textAlign="right"
                        >
                            &nbsp;
                        </Grid>
                    </Grid>
                    <Box>
                        <ClaimForm
                            catalog={catalog}
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

Claim.getLayout = (page) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default Claim;