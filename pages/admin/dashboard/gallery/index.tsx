import { Container, Grid, Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import { AuthGuard } from "../../../../components/login/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { Add } from "@mui/icons-material";
import NextLink from 'next/link';
import { NftImageGrid } from "../../../../components/dashboard/nftimages/nft-images-grid";

const DashboardGallery: NextPage = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Grid
                        container
                    >
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <Typography
                                variant="h4"
                            >
                                NFT Gallery
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            justifyContent="flex-end"
                            alignContent="flex-end"
                            textAlign="right"
                        >
                            <NextLink
                                href="/admin/dashboard/gallery/upload"
                                passHref
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<Add fontSize="small" />}
                                >
                                    Upload
                                </Button>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <NftImageGrid />
                </Box>
            </Container>
        </>
    );
};

DashboardGallery.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default DashboardGallery;