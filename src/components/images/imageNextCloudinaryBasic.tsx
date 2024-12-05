'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'
import clsx from 'clsx'

type OptimizedImageProps = CldImageProps & {
  className?: string
}

const OptimizedImage = ({
  alt,
  width,
  height,
  src,
  crop,
  priority = false,
  removeBackground = false,
  format = 'auto',
  quality = 'auto',
  className,
  ...props
}: OptimizedImageProps) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      crop={crop}
      priority={priority}
      format={format}
      quality={quality}
      removeBackground={removeBackground}
      className={clsx('h-auto', className)}
      // className={clsx('h-auto w-auto', className)}
      {...props}
    />
  )
}

export default OptimizedImage
