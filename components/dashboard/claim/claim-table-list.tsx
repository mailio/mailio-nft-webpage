import { FC, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableContainer, IconButton, TableHead, TableRow, Box, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useDispatch, useSelector } from '../../../store';
import { StyledTableCell, StyledTableRow } from '../../../theme/table/table-style';
import { listClaims } from '../../../store/claim-store';
import { Claim } from '../../../types/claim';
import { shortenHash } from '../../../utility/walletUtils';
import { format as formatDate } from 'date-fns';
import Link from 'next/link';
import { ETHERSCAN_URL } from '../../../config';

export const ClaimTableList: FC = () => {

    const claimStore = useSelector((state) => state.claim);
    const [pageLoaded, setPageLoaded] = useState<boolean>(false);
    const [isTableEmpty, setIsTableEmpty] = useState<boolean>(false);
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(listClaims());
        setPageLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (pageLoaded) {
            if (claimStore.claims.length === 0) {
                setIsTableEmpty(true);
            } else {
                setIsTableEmpty(false);
            }
        }
    }, [claimStore.claims, pageLoaded]);

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
                            <StyledTableCell align="center" sx={{ justifyContent: 'center' }}>Tx Hash</StyledTableCell>
                            <StyledTableCell align='center'>Catalog ID</StyledTableCell>
                            <StyledTableCell align='center'>Owner Address</StyledTableCell>
                            <StyledTableCell align='center'>Gas Price</StyledTableCell>
                            <StyledTableCell align='center'>Mailio Address</StyledTableCell>
                            <StyledTableCell align='center'>Token Uri</StyledTableCell>
                            <StyledTableCell align='center'>Signature</StyledTableCell>
                            <StyledTableCell align='center'>Created</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claimStore.claims.map((claim: Claim) => (
                            <StyledTableRow key={claim.txHash}>
                                <StyledTableCell align="center">
                                    <Link href={`${ETHERSCAN_URL}/tx/${claim.txHash}`}>
                                        <a target="_blank">{shortenHash(claim.txHash ? claim.txHash : '')}</a>
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="center">{claim.catalogId}</StyledTableCell>
                                <StyledTableCell align="center">{claim.walletAddress}</StyledTableCell>
                                <StyledTableCell align="center">{claim.gasPrice}</StyledTableCell>
                                <StyledTableCell align="center">{claim.mailioAddress}</StyledTableCell>
                                <StyledTableCell align="center">{claim.tokenUri}</StyledTableCell>
                                <StyledTableCell align="center">{shortenHash(claim.signature)}</StyledTableCell>
                                <StyledTableCell align="center">{formatDate(new Date(claim.created ? claim.created : 0), 'MM/dd/yyyy hh:mm a')}</StyledTableCell>
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
                                    dispatcher(listClaims());
                                }}
                            >
                                <Refresh fontSize="large" />
                            </IconButton>
                            <Typography variant="h6">
                                No claims just yet
                            </Typography>
                        </>
                    }
                </Box>
            </TableContainer>
        </>
    );
};