/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { ComponentProps, FC, useEffect, useState } from 'react';

interface ImageWithFallbackProps extends ComponentProps<typeof Image> {
    src: string,
    fallbackSrc: string,
    alt: string,
}

export const ImageWithFallback: FC<ImageWithFallbackProps> = (props) => {
    const { src, fallbackSrc, alt, ...other } = props;

    const [imageError, setImageError] = useState<boolean>(false);

    return (
        <img
            src={imageError ? fallbackSrc : src}
            alt={alt}
            onError={() => setImageError(true)} // fires re-rendering
            {...other}
        />
    );
};