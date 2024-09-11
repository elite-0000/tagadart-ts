'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'

type NextCloudinaryImageProps = CldImageProps & {
  alt: string
  width: number
  height: number
  src: string
}

const NextCloudinaryImage = ({
  alt,
  width,
  height,

  src,
  ...props
}: NextCloudinaryImageProps) => {
  return (
    <CldImage
      //   src={src || publicId}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Gérer les images responsives
      {...props} // Transmettre d'autres propriétés (ex. : transformations)
    />
  )
}

export default NextCloudinaryImage
