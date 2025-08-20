'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  unoptimized?: boolean;
}

export default function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  fallbackSrc = '/images/placeholder.jpg',
  unoptimized = false,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageSrc = error ? fallbackSrc : src;

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''} ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className || ''}`}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={unoptimized || imageSrc.includes('picsum.photos')}
        {...props}
      />
    </div>
  );
}
