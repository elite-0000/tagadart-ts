'use client'

import { CldImage, CldImageProps, getCldImageUrl } from 'next-cloudinary'
import { useEffect, useState } from 'react'

type NextCloudinaryImageProps = CldImageProps & {
  alt: string
  width: number
  height: number
  src: string
  fallbackSrc?: string // Add a fallbackSrc prop
  crop?: string
  gravity?: string
}

const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  fallbackSrc, // Destructure fallbackSrc
  crop = 'auto',
  gravity = 'auto',
  quality = 'auto',
  ...props
}: NextCloudinaryImageProps) => {
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState(src) // Use state to manage image source

  useEffect(() => {
    const generateBlurDataURL = async () => {
      // Generate a URL for a small, blurred version of the image
      const imageUrl = getCldImageUrl({
        src: imageSrc, // Use imageSrc from state
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
  }, [imageSrc, crop, gravity])

  // Render loading state if blurDataURL is not ready
  if (isLoading || !blurDataURL) {
    return <div>Loading...</div> // or a skeleton loader
  }

  return (
    <CldImage
      src={imageSrc} // Use imageSrc from state
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      crop={crop}
      gravity={gravity}
      quality={quality}
      placeholder="blur"
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      blurDataURL={blurDataURL}
      onError={() => {
        if (fallbackSrc) {
          setImageSrc(fallbackSrc) // Set fallback image on error
        }
      }}
      {...props}
    />
  )
}

export default NextCloudinaryImage