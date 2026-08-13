"use client";

import { useState } from "react";
import Image from "next/image";
import { placeholderDataUrl } from "@/lib/placeholder";

interface PhProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * "Photo" — wraps next/image for automatic optimization / lazy loading,
 * and falls back to a branded gradient placeholder if the source fails
 * to load (e.g. a temporary stock photo URL going offline).
 */
export default function Ph({
  src,
  alt,
  label,
  className = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  fill = true,
}: PhProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={placeholderDataUrl(label ?? alt)}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onError={() => setErrored(true)}
      className={className}
    />
  );
}
