import { Box, Container, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { ClaimTableList } from '../../../components/dashboard/claim/claim-table-list';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AuthGuard } from '../../../components/login/auth-guard';
import { APP_NAME } from '../../../config';


const Dashboard: NextPage = (props) => {

    return (
        <>
            <Head>
                <title>{APP_NAME} Dashboard</title>
            </Head>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ mb: 4, mt: 8, }}>
                        <Typography
                            variant="h4"
                        >
                            Latest claims
                        </Typography>
                    </Box>
                    <Box>
                        <ClaimTableList />
                    </Box>
                </Container>
            </Box>
        </>
    );
};


Dashboard.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default Dashboard;