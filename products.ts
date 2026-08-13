"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Ph from "./Ph";

export interface LightboxImage {
  src: string;
  label?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNav: (direction: 1 | -1) => void;
}

export default function Lightbox({ images, index, onClose, onNav }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNav]);

  if (index === null) return null;
  const item = images[index];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadein"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Закрыть"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNav(-1);
            }}
            className="absolute left-2 md:left-8 text-white/60 hover:text-white transition-colors p-3"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft size={32} strokeWidth={1.25} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNav(1);
            }}
            className="absolute right-2 md:right-8 text-white/60 hover:text-white transition-colors p-3"
            aria-label="Следующее фото"
          >
            <ChevronRight size={32} strokeWidth={1.25} />
          </button>
        </>
      )}

      <div className="relative max-w-5xl w-full px-14 md:px-24" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-[70vh] md:h-[80vh]">
          <Ph src={item.src} alt={item.label ?? ""} label={item.label} className="object-contain select-none" />
        </div>
        <div className="flex items-center justify-between mt-4 text-white/50 text-xs tracking-[0.15em] uppercase font-light">
          <span>{item.label}</span>
          {images.length > 1 && (
            <span>
              {index + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
