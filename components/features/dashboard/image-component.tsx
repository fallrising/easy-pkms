// File Path: personal-info-manager/components/features/dashboard/image-component.tsx
import Image from 'next/image'

interface ImageComponentProps {
    data: {
        src: string;
        alt: string;
        title?: string;
    }
}

export function ImageComponent({ data }: ImageComponentProps) {
    return (
        <div className="relative w-full aspect-video">
            <Image
                src={data.src}
                alt={data.alt}
                fill
                className="object-cover rounded-lg" // New way to specify styling
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
            />
            {data.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
                    <h3 className="text-sm font-medium">{data.title}</h3>
                </div>
            )}
        </div>
    )
}