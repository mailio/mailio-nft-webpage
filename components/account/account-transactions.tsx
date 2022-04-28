import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Link, Tooltip, Chip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { shortenHash } from '../../utility/walletUtils';
import { ETHERSCAN_URL, NETWORK_COIN_SYMBOL } from '../../config';
import { formatDistanceToNow } from 'date-fns';
import { BigNumber, ethers } from 'ethers';
import { useWeb3 } from '../../hooks/use-web3';
import { StyledTableCell, StyledTableRow } from '../../theme/table/table-style';

export const AccountTransactions: FC = () => {

    const [transactions, setTransactions] = useState<any[]>([]);

    const { wallet } = useWeb3();

    useEffect(() => {
        if (wallet?.address) {

            axios.get(`/api/transactions/${wallet.address}`).then(res => {
                if (res.data?.result) {
                    if (Array.isArray(res.data.result)) {
                        setTransactions(res.data.result);
                    }
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }, [wallet]);

    return (
        <Box>
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
                            <StyledTableCell align="center" sx={{ justifyContent: 'center' }}>Txn Hash</StyledTableCell>
                            <StyledTableCell align='center'>Age</StyledTableCell>
                            <StyledTableCell align='center'>From</StyledTableCell>
                            <StyledTableCell align='center'></StyledTableCell>
                            <StyledTableCell align='center'>To</StyledTableCell>
                            <StyledTableCell align='center'>Value</StyledTableCell>

                            <Tooltip title={`gasPrice * gasUsed in ${NETWORK_COIN_SYMBOL}`}>
                                <StyledTableCell align='center'>
                                    Fee
                                </StyledTableCell>
                            </Tooltip>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((tx: any) => (
                            <StyledTableRow
                                key={tx.hash}
                                hover
                            >
                                <StyledTableCell align='center'>
                                    <Link
                                        color="textSecondary"
                                        sx={{ ml: 2 }}
                                        variant="subtitle2"
                                        href={`${ETHERSCAN_URL}/tx/${tx.hash}`}
                                        target="_blank"
                                    >
                                        {shortenHash(tx.hash, 12)}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align='center'>{formatDistanceToNow(+tx.timeStamp * 1000, { addSuffix: false })}</StyledTableCell>
                                <StyledTableCell align='center'>
                                    <Link
                                        color="textSecondary"
                                        sx={{ ml: 2 }}
                                        variant="subtitle2"
                                        href={`${ETHERSCAN_URL}/address/${tx.from}`}
                                        target="_blank"
                                    >
                                        {shortenHash(tx.from, 12)}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align={tx.to === '0x1b1dc08159d2ec270ca851d71ea6dfa0c1a3375a' ? 'right' : 'left'}>{tx.to === '0x1b1dc08159d2ec270ca851d71ea6dfa0c1a3375a' ?
                                    (<Chip label="in" color="primary" size="small" />) :
                                    (
                                        <Chip label="out" color="secondary" size="small" />
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                    <Link
                                        color="textSecondary"
                                        sx={{ ml: 2 }}
                                        variant="subtitle2"
                                        href={`${ETHERSCAN_URL}/address/${tx.to}`}
                                        target="_blank"
                                    >
                                        {shortenHash(tx.to, 12)}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align='center'>{Math.round(+ethers.utils.formatUnits(BigNumber.from(tx.value), 18) * 1e4) / 1e4}&nbsp;{`${NETWORK_COIN_SYMBOL}`}</StyledTableCell>
                                <StyledTableCell align='center'>{Math.round(+ethers.utils.formatUnits(BigNumber.from(tx.gasUsed).mul(tx.gasPrice)) * 1e4) / 1e4}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};