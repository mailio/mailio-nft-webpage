import { FC, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableContainer, IconButton, TableHead, TableRow, Box, Typography } from '@mui/material';
import { Image as ImageIcon, Refresh } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from '../../../store';
import { listCatalogs } from '../../../store/catalog-store';
import { StyledTableCell, StyledTableRow } from '../../../theme/table/table-style';
import { Catalog } from '../../../types/catalog';
import Link from 'next/link';
import { IPFS_GATEWAY_URL } from '../../../config';

export const CatalogTableList: FC = () => {

    const catalogStore = useSelector((state) => state.catalog);
    const [pageLoaded, setPageLoaded] = useState<boolean>(false);
    const [isTableEmpty, setIsTableEmpty] = useState<boolean>(false);
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(listCatalogs());
        setPageLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (pageLoaded) {
            if (catalogStore.catalog.length === 0) {
                setIsTableEmpty(true);
            } else {
                setIsTableEmpty(false);
            }
        }
    }, [catalogStore.catalog, pageLoaded]);

    return (
        <>
            <TableContainer
                component={Paper}
                elevation={2}
            >
                <Table
                    sx={{
                        minWidth: '500',
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={{ justifyContent: 'center' }}>ID</StyledTableCell>
                            <StyledTableCell align='center'>Image</StyledTableCell>
                            <StyledTableCell align='center'>Name</StyledTableCell>
                            <StyledTableCell align='center'>Description</StyledTableCell>
                            <StyledTableCell align='center'>Video Link</StyledTableCell>
                            <StyledTableCell align='center'>Keywords</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {catalogStore.catalog.map((cat: Catalog) => (
                            <StyledTableRow key={cat.id}>
                                <StyledTableCell align="center">
                                    <Link
                                        href={`/admin/dashboard/catalogs/${cat.id}`}
                                        passHref
                                    >
                                        {cat.id}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {cat.imageLink ? (
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                backgroundColor: 'background.default',
                                                backgroundImage: `url(${IPFS_GATEWAY_URL}/${cat.imageLink})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                borderRadius: 1,
                                                display: 'flex',
                                                height: 80,
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                width: 80
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                backgroundColor: 'background.default',
                                                borderRadius: 1,
                                                display: 'flex',
                                                height: 80,
                                                justifyContent: 'center',
                                                width: 80
                                            }}
                                        >
                                            <ImageIcon fontSize="small" />
                                        </Box>
                                    )}

                                </StyledTableCell>
                                <StyledTableCell align="center">{cat.name}</StyledTableCell>
                                <StyledTableCell align="center">{cat.description}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {cat.videoLink && (
                                        <ReactPlayer url={cat.videoLink} width="100%" height="100%" />
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="center">{cat.keywords}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mt: '1rem',
                        mb: '1rem',
                    }}
                >
                    {isTableEmpty &&
                        <>
                            <IconButton
                                onClick={() => {
                                    dispatcher(listCatalogs());
                                }}
                            >
                                <Refresh fontSize="large" />
                            </IconButton>
                            <Typography variant="h6">
                                No catalogs
                            </Typography>
                        </>
                    }
                </Box>
            </TableContainer>
        </>
    );
};