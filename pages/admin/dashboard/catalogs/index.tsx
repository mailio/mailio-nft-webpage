import { Container, Grid, Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import { AuthGuard } from "../../../../components/login/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { Add } from "@mui/icons-material";
import NextLink from 'next/link';
import { CatalogTableList } from "../../../../components/dashboard/catalog/catalog-table-list";

const DashboardCatalogs: NextPage = () => {
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
                                All Catalogs
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
                                href="/admin/dashboard/catalogs/add"
                                passHref
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<Add fontSize="small" />}
                                >
                                    Add
                                </Button>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <CatalogTableList />
                </Box>
            </Container>
        </>
    );
};

DashboardCatalogs.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default DashboardCatalogs;