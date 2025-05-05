/**
 * Image Utilities
 * 
 * This module provides utilities for optimized image loading and management.
 * It helps ensure consistent image handling across the application.
 */

/**
 * Get the appropriate image path based on the image name and category
 * @param name The image name without extension
 * @param category The image category (logos, icons, backgrounds, etc.)
 * @param extension The image extension (default: png)
 * @returns The full image path
 */
export function getImagePath(name: string, category: ImageCategory = 'illustrations', extension: string = 'png'): string {
  return `/images/${category}/${name}.${extension}`;
}

/**
 * Image categories for organizing assets
 */
export type ImageCategory = 'logos' | 'icons' | 'backgrounds' | 'illustrations' | 'features';

/**
 * Image with responsive sizes for different breakpoints
 */
export interface ResponsiveImage {
  src: string;
  srcSet?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Component props for the OptimizedImage component
 */
export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  alt: string;
  fallback?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  imgClassName?: string;
  containerClassName?: string;
  priority?: boolean;
}

/**
 * Get image dimensions from a URL if they're encoded in the filename
 * Format: image-name-{width}x{height}.ext
 * 
 * @param url The image URL
 * @returns Object with width and height if found, undefined otherwise
 */
export function getImageDimensions(url: string): { width: number; height: number } | undefined {
  const regex = /-(\d+)x(\d+)\.[a-zA-Z]+$/;
  const match = url.match(regex);
  
  if (match && match.length === 3) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10)
    };
  }
  
  return undefined;
}

/**
 * Generate a placeholder image URL with the specified dimensions and text
 * 
 * @param width Width of the placeholder image
 * @param height Height of the placeholder image
 * @param text Text to display on the placeholder (optional)
 * @param bgColor Background color (optional)
 * @param textColor Text color (optional)
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(
  width: number, 
  height: number, 
  text?: string,
  bgColor: string = 'e2e8f0',
  textColor: string = '64748b'
): string {
  const placeholderText = text || `${width}x${height}`;
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(placeholderText)}`;
}

/**
 * Default image paths for the application
 */
export const defaultImages = {
  logo: getImagePath('peochain-logo', 'logos'),
  logoLight: getImagePath('peochain-logo-light', 'logos'),
  hero: getImagePath('hero-background', 'backgrounds'),
  placeholder: getPlaceholderImage(800, 600, 'Image Coming Soon'),
  avatarPlaceholder: getPlaceholderImage(200, 200, 'User'),
  featurePlaceholder: getPlaceholderImage(400, 300, 'Feature'),
};
