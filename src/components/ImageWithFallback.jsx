import React, { forwardRef, useState } from 'react';

/**
 * ImageWithFallback Component
 *
 * Renders real verified member photographs with graceful fallback handling.
 * Applies the cinematic editorial monochrome portrait styling by default.
 */
export const ImageWithFallback = forwardRef(function ImageWithFallback(
  {
    src,
    alt = '',
    className = '',
    name = '',
    role = '',
    loading = 'lazy',
    style = {},
    ...rest
  },
  ref
) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div
        ref={ref}
        className={`portrait-blank-canvas ${className}`}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100%',
          display: 'block',
          position: 'relative',
          backgroundColor: 'var(--team-bg-surface, #14161A)',
          ...style,
        }}
        aria-hidden="true"
        {...rest}
      />
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt || name || 'FCIT Member'}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`monochrome-portrait ${isLoaded ? 'is-loaded' : 'is-loading'} ${className}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 18%',
        display: 'block',
        ...style,
      }}
      {...rest}
    />
  );
});

export default ImageWithFallback;
