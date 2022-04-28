import { ThemeOptions } from '@mui/material';

// Colors

const neutral = {
    50: '#e2ecfc',
    100: '#b6cef8',
    200: '#85aef3',
    300: '#548eee',
    400: '#3075eb',
    500: '#0b5de7',
    600: '#0a55e4',
    700: '#084be0',
    800: '#0641dd',
    900: '#0330d7',
};

const background = {
    default: '#F9FAFC',
    paper: '#FFFFFF',
    mailioblue: '#0b5de7',
    mailioblack: '#212529',
};

const divider = '#E6E8F0';

const primary = {
    main: '#0b5de7',
    light: '#0b5de7',
    dark: '#212529',
    contrastText: '#FFFFFF'
};

const secondary = {
    main: '#212529',
    light: '#0b5de7',
    dark: '#000000',
    contrastText: '#FFFFFF'
};

const success = {
    main: '#14B8A6',
    light: '#43C6B7',
    dark: '#0E8074',
    contrastText: '#FFFFFF'
};

const info = {
    main: '#2196F3',
    light: '#64B6F7',
    dark: '#0B79D0',
    contrastText: '#FFFFFF'
};

const warning = {
    main: '#FFB020',
    light: '#FFBF4C',
    dark: '#B27B16',
    contrastText: '#FFFFFF'
};

const error = {
    main: '#D14343',
    light: '#DA6868',
    dark: '#922E2E',
    contrastText: '#FFFFFF'
};

const text = {
    primary: '#0b5de7',
    secondary: '#212529',
    disabled: 'rgba(55, 65, 81, 0.48)'
};

export const lightThemeOptions: ThemeOptions = {
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[500],
                    color: '#FFFFFF'
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-filledDefault': {
                        backgroundColor: neutral[200],
                        '& .MuiChip-deleteIcon': {
                            color: neutral[400]
                        }
                    },
                    '&.MuiChip-outlinedDefault': {
                        '& .MuiChip-deleteIcon': {
                            color: neutral[300]
                        }
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: text.secondary
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: divider
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderColor: divider,
                    borderStyle: 'solid',
                    borderWidth: 1
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: neutral[500]
                },
                track: {
                    backgroundColor: neutral[400],
                    opacity: 1
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${divider}`
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: neutral[100],
                    '.MuiTableCell-root': {
                        color: neutral[700]
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.985rem',
                    // backgroundColor: neutral[500],
                    // '&:hover': {
                    //     backgroundColor: neutral[400],
                    // },
                }
            },
        }
    },
    palette: {
        action: {
            active: neutral[500],
            focus: 'rgba(55, 65, 81, 0.12)',
            hover: 'rgba(0, 0, 0, 0.17)',
            selected: 'rgba(55, 65, 81, 0.08)',
            disabledBackground: 'rgba(55, 65, 81, 0.12)',
            disabled: 'rgba(55, 65, 81, 0.26)'
        },
        background,
        divider,
        error,
        info,
        mode: 'light',
        neutral,
        primary,
        secondary,
        success,
        text,
        warning
    },
};
