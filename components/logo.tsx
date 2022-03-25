import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

interface LogoProps {
    variant?: 'blue' | 'white' | 'black';
}

export const Logo = styled((props: LogoProps) => {
    const { variant, ...other } = props;
    let color = '#0b5de7'; // default color
    if (variant === 'white') {
        color = '#ffffff';
    } else if (variant === 'black') {
        color = '#212529';
    }

    return (
        <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="34" height="23" stroke={color} strokeWidth="2" />
            <path d="M2 27L38 2M2 2L20 14.5" stroke={color} strokeWidth="2" />
            <circle cx="3" cy="3" r="3" fill={color} />
            <circle cx="37" cy="3" r="3" fill={color} />
            <circle cx="20" cy="14" r="3" fill={color} />
            <circle cx="3" cy="26" r="3" fill={color} />
            <circle cx="37" cy="26" r="3" fill={color} />
        </svg>
    );
})``;

Logo.defaultProps = {
    variant: 'blue'
};

Logo.propTypes = {
    variant: PropTypes.oneOf(['blue', 'white', 'black'])
};
