'use client'

import { useState } from 'react'
import { CldImage, CldImageProps } from 'next-cloudinary'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import clsx from 'clsx'

type OptimizedImageProps = CldImageProps & {
  className?: string
  skeletonClassName?: string
}

const OptimizedImage = ({
  alt,
  width,
  height,
  src,
  crop, //  //https://cloudinary.com/documentation/resizing_and_cropping#resize_and_crop_modes
  priority = true,
  removeBackground = false,
  format = 'auto',
  quality = 'auto',
  className,
  skeletonClassName,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority)

  return (
    <div className="relative">
      {isLoading && (
        <div className={clsx('absolute inset-0', skeletonClassName)}>
          <Skeleton
            className="h-full w-full"
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
          />
        </div>
      )}

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
        className={clsx(
          'h-auto max-w-full transition-opacity duration-300',
          className,
          {
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
          },
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
}

export default OptimizedImage
