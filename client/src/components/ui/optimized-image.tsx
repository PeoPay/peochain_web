import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImageProps, getPlaceholderImage } from '@/lib/image-utils';

/**
 * OptimizedImage Component
 * 
 * A performance-optimized image component that handles:
 * - Lazy loading
 * - Error fallbacks
 * - Loading states
 * - Responsive sizing
 */
export function OptimizedImage({
  src,
  alt,
  fallback,
  width,
  height,
  sizes,
  loading = 'lazy',
  className,
  imgClassName,
  containerClassName,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Default fallback if none provided
  const fallbackSrc = fallback || getPlaceholderImage(
    width || 300, 
    height || 200, 
    'Image Not Found'
  );
  
  // Handle successful load
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  // Handle load error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{ 
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 bg-muted/30 animate-pulse rounded-md',
            className
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          imgClassName
        )}
        {...props}
      />
    </div>
  );
}

/**
 * BackgroundImage Component
 * 
 * A component for optimized background images
 */
export function BackgroundImage({
  src,
  fallback,
  className,
  children,
  overlayClassName,
  ...props
}: {
  src: string;
  fallback?: string;
  className?: string;
  children?: React.ReactNode;
  overlayClassName?: string;
}) {
  const [hasError, setHasError] = useState(false);
  
  // Default fallback if none provided
  const fallbackSrc = fallback || getPlaceholderImage(1920, 1080, 'Background');
  
  // Preload image to check if it loads correctly
  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onerror = () => setHasError(true);
    
    return () => {
      img.onerror = null;
    };
  }, [src]);
  
  return (
    <div 
      className={cn(
        'relative bg-cover bg-center bg-no-repeat',
        className
      )}
      style={{ 
        backgroundImage: `url(${hasError ? fallbackSrc : src})`,
      }}
      {...props}
    >
      {/* Optional overlay */}
      {overlayClassName && (
        <div className={cn('absolute inset-0', overlayClassName)} aria-hidden="true" />
      )}
      
      {/* Content */}
      {children}
    </div>
  );
}
