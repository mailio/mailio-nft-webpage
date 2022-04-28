import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { nftImageApi } from '../../../api/nft-image-api';
import { ImageUploadDrop } from './image-upload-drop';

export const ImageUploadForm: FC = () => {

    const [files, setFiles] = useState<any[]>([]);

    const handleDrop = (newFiles: any): void => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemove = (file: any): void => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
    };

    const handleRemoveAll = (): void => {
        setFiles([]);
    };
    const handleUpload = (): void => {
        if (files) {
            console.log('upload clicked: ', files);
            files.forEach((file) => {
                nftImageApi.uploadImage(file).then((res) => {
                    console.log('uploaded: ', res);
                });
            });
        }
    };

    return (
        <>
            <Card sx={{ mt: 3 }}>
                <CardContent>

                    <Typography variant="h6">
                        Upload and pin to IPFS
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                        sx={{ mt: 1 }}
                    >
                        File types supported: JPG, PNG, GIF, SVG. Max size: 10 MB
                    </Typography>

                    <ImageUploadDrop
                        accept="image/*"
                        files={files}
                        maxSize={10 * 1024 * 1024}
                        minSize={10}
                        maxFiles={10}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                        onUpload={handleUpload}
                    />

                </CardContent>
            </Card>
        </>
    );
};