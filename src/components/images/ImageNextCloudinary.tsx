'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState } from 'react'

interface NextCloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  alt: string
  width: number
  height: number
  src: string
  priority?: boolean
  className?: string
  showSkeleton?: boolean
  // Cloudinary specific props
  crop?:
    | 'fill'
    | 'crop'
    | 'auto'
    | 'fill_pad'
    | 'scale'
    | 'fit'
    | 'thumb'
    | 'pad'
    | 'limit'
    | 'mfit'
    | 'mpad'
    | 'lfill'
    | 'lpad'
    | 'imagga_scale'
    | 'imagga_crop'
  gravity?:
    | 'auto'
    | 'face'
    | 'faces'
    | 'center'
    | 'north'
    | 'north_east'
    | 'east'
    | 'south_east'
    | 'south'
    | 'south_west'
    | 'west'
    | 'north_west'
  // Advanced props
  radius?: string
  effect?: string
  quality?: 'auto' | number
  fetchFormat?: 'auto' | 'png' | 'jpg' | 'gif' | 'webp' | 'avif'
  colorSpace?: 'srgb' | 'tinysrgb' | 'cmyk' | 'no_cmyk'
  dpr?: 'auto' | number
}

/**
 * Optimized Cloudinary Image Component with Skeleton Loading
 *
 * @example
 * // Basic usage
 * <NextCloudinaryImage
 *   src="image.jpg"
 *   alt="Description"
 *   width={800}
 *   height={600}
 *   showSkeleton
 * />
 */
const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  priority = false,
  className = '',
  showSkeleton = true,
  crop = 'fill',
  gravity,
  radius,
  effect,
  quality = 'auto',
  fetchFormat = 'auto',
  colorSpace = 'srgb',
  dpr = 'auto',
  ...props
}: NextCloudinaryImageProps) => {
  const [isLoading, setIsLoading] = useState(showSkeleton)
  const [hasError, setHasError] = useState(false)

  // Calculate responsive sizes based on image width
  const sizes = (() => {
    if (width <= 640) return '100vw'
    if (width <= 768) return '75vw'
    if (width <= 1024) return '50vw'
    if (width <= 1280) return '33vw'
    return '25vw'
  })()

  const imageConfig = {
    src,
    alt,
    width,
    height,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    // Performance optimizations
    loading: priority ? ('eager' as const) : ('lazy' as const),
    fetchPriority: priority ? ('high' as const) : ('auto' as const),
    decoding: 'async' as const,
    sizes,
    // Image quality optimizations
    quality,
    format: fetchFormat,
    crop,
    gravity,
    dpr,
    colorSpace,
    // Effects and transformations
    radius,
    effect,
    // Prevents layout shift
    preserveTransformations: true,
  }

  // Handle image load complete
  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  // Handle image load error
  const handleError = (e: any) => {
    setIsLoading(false)
    setHasError(true)
    console.error('Image load failed:', src)
    props.onError?.(e)
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      {/* Skeleton loader */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 z-10">
          <Skeleton
            height="100%"
            width="100%"
            baseColor="#f3f4f6"
            highlightColor="#e5e7eb"
            duration={1.5}
          />
        </div>
      )}

      {/* Cloudinary Image */}
      {!hasError ? (
        <CldImage
          {...imageConfig}
          {...props}
          onLoad={handleLoadComplete}
          onError={handleError}
        />
      ) : (
        // Fallback for error state
        <div className="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-sm text-gray-500">
          Unable to load image
        </div>
      )}
    </div>
  )
}

export default NextCloudinaryImage
