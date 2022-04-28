import { ArrowBack } from "@mui/icons-material";
import { Box, Container, Link, Typography } from "@mui/material";
import { NextPage } from "next";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { AuthGuard } from "../../../../../components/login/auth-guard";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { CatalogAddForm } from "../../../../../components/dashboard/catalog/catalog-add-form";

const DashboardAddCatalog: NextPage = () => {

    const router = useRouter();
    const { catalogId } = router.query;

    let cId: string = 'add';
    if (catalogId) {
        cId = catalogId as string;
    }

    return (
        <>
            <Container maxWidth="lg">
                <Box
                    component="main"
                    sx={{
                        py: 8,
                        maxWidth: '100px'
                    }}
                >
                    <NextLink
                        href="/admin/dashboard/catalogs"
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
                            <ArrowBack fontSize="small" color="secondary" />
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Back
                            </Typography>
                        </Link>
                    </NextLink>
                </Box>
                <CatalogAddForm
                    catalogId={cId}
                />
            </Container>
        </>
    );
};

DashboardAddCatalog.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default DashboardAddCatalog;