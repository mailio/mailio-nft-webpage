import { Container, Box, Link, Typography } from '@mui/material';
import { NextPage } from 'next';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { AuthGuard } from '../../../../components/login/auth-guard';
import NextLink from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import { ImageUploadForm } from '../../../../components/dashboard/nftimages/image-upload-form';

const DashboardGalleryUpload: NextPage = () => {

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
                        href="/admin/dashboard/gallery"
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
                <ImageUploadForm />
            </Container>
        </>
    );
};


DashboardGalleryUpload.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default DashboardGalleryUpload;