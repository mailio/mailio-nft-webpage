import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        paddingTop: '1.2rem',
    },
    [`&.${tableCellClasses.body}`]: {
        color: theme.palette.secondary.main,
        fontSize: 14,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&.MuiTableRow-root': {
        backgroundColor: theme.palette.common.white,
    },
    '&.MuiTableRow-hover:hover': {
        backgroundColor: "#f4f6f8",
    },
}));