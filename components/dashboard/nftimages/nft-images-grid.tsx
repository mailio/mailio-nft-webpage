/* eslint-disable @next/next/no-img-element */
import { Preview } from '@mui/icons-material';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { IPFS_GATEWAY_URL } from '../../../config';
import { useDispatch, useSelector } from '../../../store';
import { listImages } from '../../../store/nftimages-store';
import { ImageWithFallback } from '../../widgets/image-with-fallback';

interface ImageItem {
    img: string,
    cid: string,
}

export const NftImageGrid: FC = () => {

    const dispatch = useDispatch();
    const imageStore = useSelector((state) => state.nftimages);
    const [images, setImages] = useState<ImageItem[]>([]);

    useEffect(() => {
        dispatch(listImages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (imageStore.image.Keys) {
            const keys = imageStore.image.Keys;
            const imageList: ImageItem[] = [];
            Object.keys(keys).forEach((key) => {
                imageList.push({
                    img: IPFS_GATEWAY_URL + "/" + key,
                    cid: key,
                });
            });
            setImages(imageList);
        }
    }, [imageStore.image.Keys]);

    return (
        <>
            <ImageList>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">IPFS Pinned Images</ListSubheader>
                </ImageListItem>
                {images.map((item) => (
                    <ImageListItem
                        key={item.cid}
                        sx={{
                            minHeight: "300px",
                        }}
                    >
                        <ImageWithFallback
                            src={`${item.img}`}
                            fallbackSrc="/images/json-file.svg"
                            alt={item.cid}
                            layout="fill"
                            width={300}
                        />
                        <ImageListItemBar
                            title="Key"
                            subtitle={item.cid}
                            actionIcon={
                                <Link
                                    href={`${item.img}`}
                                    passHref
                                >
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about key`}
                                    >
                                        <Preview />
                                    </IconButton>
                                </Link>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};
