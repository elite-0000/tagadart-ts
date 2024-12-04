'use client'

import Image from 'next/image'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import clsx from 'clsx'

type OptimizedImageProps = {
  alt: string
  width: number
  height: number
  src: string
  crop?: any
  className?: string
}

const OptimizedImage = ({
  alt,
  width,
  height,
  src,
  crop,
  className,
}: OptimizedImageProps) => {
  // const imageUrl = getCldImageUrl({
  //   src: src,
  //   width: width,
  //   height: height,
  //   crop: crop,
  //   format: 'auto',
  //   quality: 'auto',
  // })
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      crop={crop}
      // className={className}
      className={clsx('h-auto w-auto', className)}
    />
  )
}

export default OptimizedImage
