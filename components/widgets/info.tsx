import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Lightbulb } from '@mui/icons-material';

interface InfoProps {
    message: string;
}

const InfoRoot = styled('div')(
    (({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark'
            ? '#333'
            : '#000',
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        padding: theme.spacing(1)
    }))
);

export const Info: FC<InfoProps> = (props) => {
    const { message, ...other } = props;

    return (
        <InfoRoot
            {...other}
        >
            <Lightbulb
                sx={{
                    color: 'white',
                    mr: 1
                }}
                fontSize="small"
            />
            <Typography
                color="white"
                sx={{
                    '& span': {
                        fontWeight: 700
                    }
                }}
                variant="subtitle2"
            >
                <span>
                    Info.
                </span>
                {' '}
                {message}
            </Typography>
        </InfoRoot>
    );
};

Info.propTypes = {
    message: PropTypes.string.isRequired
};
