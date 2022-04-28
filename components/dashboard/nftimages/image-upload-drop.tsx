import { ControlPointDuplicate, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { bytesToSize } from '../../../utility/file_utils';

interface ImageUploadDropProps extends DropzoneOptions {
    files?: any[];
    onRemove?: (file: any) => void;
    onRemoveAll?: () => void;
    onUpload?: () => void;
}

export const ImageUploadDrop: FC<ImageUploadDropProps> = (props) => {
    const { files, accept, maxFiles, maxSize, minSize, onDrop, onRemove, onRemoveAll, onUpload } = props;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        maxFiles,
        maxSize,
        minSize,
        onDrop
    });

    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    outline: 'none',
                    p: 6,
                    ...(
                        isDragActive && {
                            backgroundColor: 'action.active',
                            opacity: 0.5
                        }
                    ),
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                        opacity: 0.5
                    }
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Box
                    sx={{
                        '& img': {
                            width: 100
                        }
                    }}
                >
                    <Image
                        width={64}
                        height={64}
                        alt="Select image"
                        src="/images/nft-64.png"
                    />
                </Box>
            </Box>
            {
                (files || []).length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <List>
                            {(files || []).map((file) => (
                                <ListItem
                                    key={file.path}
                                    sx={{
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        '& + &': {
                                            mt: 1
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <ControlPointDuplicate fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={file.name}
                                        primaryTypographyProps={{
                                            color: 'textPrimary',
                                            variant: 'subtitle2'
                                        }}
                                        secondary={bytesToSize(file.size)}
                                    />
                                    <Tooltip title="Remove">
                                        <IconButton
                                            edge="end"
                                            onClick={() => onRemove && onRemove(file)}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            ))}
                        </List>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 2
                            }}
                        >
                            <Button
                                onClick={onRemoveAll}
                                size="small"
                                type="button"
                            >
                                Remove All
                            </Button>
                            <Button
                                onClick={onUpload}
                                size="small"
                                sx={{ ml: 2 }}
                                type="button"
                                variant="contained"
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>
                )
            }
        </>
    );
};