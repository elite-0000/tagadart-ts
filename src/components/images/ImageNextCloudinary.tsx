'use client'

import { CldImage, CldImageProps, getCldImageUrl } from 'next-cloudinary'
import { useEffect, useState } from 'react'

type NextCloudinaryImageProps = CldImageProps & {
  alt: string
  width: number
  height: number
  src: string
  crop?: string
  gravity?: string
}

const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  crop = 'auto',
  gravity = 'auto',
  quality = 'auto',
  ...props
}: NextCloudinaryImageProps) => {
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateBlurDataURL = async () => {
      // Generate a URL for a small, blurred version of the image
      const imageUrl = getCldImageUrl({
        src,
        width: 100, // Resize to a smaller size for blur effect
        crop,
        gravity,
      })

      try {
        const response = await fetch(imageUrl)
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64 = buffer.toString('base64')
        const dataUrl = `data:${response.headers.get('content-type')};base64,${base64}`
        setBlurDataURL(dataUrl)
      } catch (error) {
        console.error('Error generating blur data URL:', error)
      } finally {
        setIsLoading(false)
      }
    }

    generateBlurDataURL()
  }, [src, crop, gravity])

  // Render loading state if blurDataURL is not ready
  if (isLoading || !blurDataURL) {
    return <div>Loading...</div> // or a skeleton loader
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      crop={crop}
      gravity={gravity}
      quality={quality}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      blurDataURL={blurDataURL}
      
      {...props}
    />
  )
}

export default NextCloudinaryImage