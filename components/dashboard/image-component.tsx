'use client'

import Image from 'next/image'

export function ImageComponent({ data }: { data: { src: string; alt: string } }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={data.src}
        alt={data.alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

