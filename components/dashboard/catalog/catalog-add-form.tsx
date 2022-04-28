import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from '../../../store';
import { putCatalog } from '../../../store/catalog-store';
import { Catalog } from '../../../types/catalog';
import { nftServerApi } from '../../../api/nft-server-api';

interface CatalogAddFormProps {
    catalogId: string;
}

export const CatalogAddForm: FC<CatalogAddFormProps> = (props) => {

    const { catalogId } = props;

    console.log('received catalog id: ', catalogId);

    const dispatch = useDispatch();
    const router = useRouter();
    const catalogStore = useSelector((state: any) => state.catalog);
    let defaultCatalog: Catalog = {} as Catalog;
    if (catalogId !== 'add') {
        defaultCatalog = catalogStore.catalog.find((catalog: Catalog) => catalog.id === catalogId);
    }

    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm<Catalog>({ defaultValues: defaultCatalog });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onSubmit = async (data: Catalog) => {
        setIsSubmitting(true);
        try {
            if (catalogId !== "add") {
                data.id = catalogId;
            }
            dispatch(putCatalog(data));
            router.push('/admin/dashboard/catalogs');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader title="Catalog" />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CardContent>

                        <Stack spacing={2} direction="column">
                            <TextField
                                {...register('id')}
                                type="hidden"
                                sx={{
                                    display: 'none',
                                }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="type">Type</InputLabel>
                                <Select
                                    labelId="type"
                                    id="type"
                                    {...register('type', { required: true })}
                                    label="Type"
                                    defaultValue="video"
                                >
                                    <MenuItem value="video">Video</MenuItem>
                                    <MenuItem value="article">Article</MenuItem>
                                    <MenuItem value="podcast">Podcast</MenuItem>
                                    <MenuItem value="podcast-episode">Podcast Episode</MenuItem>
                                    <MenuItem value="virtual-event">Virtual Event</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Name"
                                variant="outlined"
                                {...register('name', { required: true })}
                                error={errors.name ? true : false}
                                helperText={errors.name ? 'Name is required' : ''}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                {...register('description', { required: true })}
                                error={errors.description ? true : false}
                                helperText={errors.description ? 'Description is required' : ''}
                            />
                            <TextField
                                label="Content Link"
                                variant="outlined"
                                {...register('contentLink', { required: true })}
                                error={errors.description ? true : false}
                                helperText={errors.description ? 'Content link is required' : ''}
                            />
                            <TextField
                                label="Image Cid (hash)"
                                variant="outlined"
                                {...register('imageLink', { required: false })}
                                error={errors.imageLink ? true : false}
                                helperText={errors.imageLink ? '' : ''}
                            />
                            <TextField
                                label="Video Link"
                                variant="outlined"
                                {...register('videoLink', { required: false })}
                                error={errors.videoLink ? true : false}
                                helperText={errors.videoLink ? '' : ''}
                            />
                            <TextField
                                label="Comma separated keywords"
                                variant="outlined"
                                {...register('keywords', { required: false })}
                                error={errors.keywords ? true : false}
                                helperText={errors.keywords ? 'Keywords are required' : ''}
                            />
                        </Stack>

                    </CardContent>
                    <CardActions>
                        <LoadingButton
                            loading={isSubmitting}
                            sx={{
                                mt: 2,
                            }}
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </LoadingButton>
                    </CardActions>
                </form>
            </Card>
        </>
    );
};