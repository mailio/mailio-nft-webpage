import { Box, Container, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { MailioKnowledgeLibrary } from '../../components/home/knowledge-library';
import { MainLayout } from '../../components/main-layout';
import { Info } from '../../components/widgets/info';

const Library: NextPage = () => {

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
                        Mailio Knowledge Library
                    </Typography>
                    <Box
                        sx={{
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Info
                            message="Collect keywords by viewing the content"
                        />
                    </Box>
                    <MailioKnowledgeLibrary />
                </Stack>
            </Container>
        </Box>
    );
};

Library.getLayout = (page) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default Library;

