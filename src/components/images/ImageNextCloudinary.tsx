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
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    const generateBlurDataURL = async () => {
      const imageUrl = getCldImageUrl({
        src: imageSrc,
        width: 100,
        crop,
        gravity,
        format: 'auto',
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

  if (isLoading || !blurDataURL) {
    return <div>Loading...</div> // or a skeleton loader
  }

  return (
    <CldImage
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      crop={crop}
      gravity={gravity}
      quality={quality}
      format="auto"
      placeholder="blur"
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      blurDataURL={blurDataURL}
      onError={() => {
        if (fallbackSrc) {
          setImageSrc(fallbackSrc)
        }
      }}
      {...props}
    />
  )
}

export default NextCloudinaryImage
