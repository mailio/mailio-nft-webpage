/* eslint-disable @next/next/no-img-element */
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { NftMetadata } from '../../types/nft-metadata';
import { ClaimPreview } from '../../types/claim';
import { IPFS_GATEWAY_URL } from '../../config';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { OpenInNew } from '@mui/icons-material';

interface NftPreviewProps {
    preview: ClaimPreview,
}

export const NftPreview: FC<NftPreviewProps> = (props) => {

    const { preview } = props;

    // const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
    // const { data, error } = useSWR(metadata.image, fetcher);

    const [metadata, setMetadata] = useState<NftMetadata>();

    const loadNft = async (tokenUri?: string) => {
        if (tokenUri) {
            try {
                const url = tokenUri.replace("ipfs://", IPFS_GATEWAY_URL + "/");
                const response = await axios.get<NftMetadata>(url);
                const metadata: NftMetadata = response.data;
                const nftImage = metadata.image.replace("ipfs://", IPFS_GATEWAY_URL + "/");
                metadata.image = nftImage;
                setMetadata(metadata);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load NFT image");
            }    // const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
            // const
        }
    };

    useEffect(() => {
        loadNft(preview.tokenUri);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Box
         pt={20}
        >
        <Card
            elevation={12}
            sx={{
                mt: 2,
                height: '100%',
                display: 'flex',
                overflow: 'visible',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            {metadata && metadata.image && (
                <div
                  style={{
                      position: 'relative',
                  }}
                >
                    <img
                        style={{
                            position: 'absolute',
                            width: '300px',
                            left: '50%',
                            transform: 'translate(-50%, -0%)',
                            top: '-200px',   
                        }} 
                        src="/images/mailio_owl_image.png" 
                        alt="nft" />
                </div>
            )}
            <CardContent
                sx={{
                    alignContent: 'top',
                    height: '100%',
                    minHeight: '400px',
                }}
            >
                <Box
                    sx={{
                        pb: 2,
                        textAlign: 'center',
                        pt: '100px',
                    }}
                >
                    <Typography
                        variant="h4"
                    >
                        {metadata?.name}
                    </Typography>
                </Box>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                >
                    {metadata?.description}
                </Typography>
            </CardContent>
            <Box
                sx={{
                    display: 'flex',
                    height: '90px',
                    backgroundColor: '#4FACFF',
                }}
            >
                <Grid
                    container
                >

                    <Grid
                        item
                        xs={4}
                        textAlign="center"
                        sx={{
                            p: 1,
                        }}
                    >
                        <Typography
                            variant='subtitle1'
                            color="white"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            token
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="white"
                            sx={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                            }}
                        >
                            {preview.tokenId}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem style={{ marginRight: "-1px", borderColor: '#309eff' }} />
                    <Grid
                        item
                        xs={4}
                        textAlign="center"
                        sx={{
                            p: 1,
                        }}
                    >
                        <Typography
                            variant='subtitle1'
                            color="white"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            knowing
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="white"
                            sx={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                            }}
                        >
                            {metadata?.attributes?.map((attribute) => attribute.value).join(", ")}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem style={{ marginRight: "-1px", borderColor: '#309eff' }} />
                    <Grid
                        item
                        xs={4}
                        textAlign="center"
                        sx={{
                            p: 1,
                        }}
                    >
                        <Box
                            alignItems="center"
                            justifyItems="center"
                            justifyContent="center"
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                            }}
                        >
                            <IconButton
                                onClick={() => window.open(metadata?.external_url, "_blank")}
                            >
                                <OpenInNew style={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card >
        </Box>
    );
}