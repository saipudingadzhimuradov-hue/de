"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Ruler, Layers, Palette, MessageCircle, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import Ph from "@/components/Ph";
import ProductCard from "@/components/ProductCard";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";
import type { Product } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function ProductClient({ product, related }: { product: Product; related: Product[] }) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images: LightboxImage[] = product.images.map((src) => ({ src, label: product.name }));

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navLightbox = useCallback((dir: 1 | -1) => {
    setLightboxIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));
  }, [images.length]);

  const waMsg = encodeURIComponent(`Здравствуйте! Интересует «${product.name}» на сайте DE PARCO.`);

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-wrap mx-auto px-5 md:px-10 pb-6">
        <Link
          href={`/catalog?category=${product.category}`}
          className="flex items-center gap-1.5 text-[13px] tracking-wide text-ink/55 hover:text-ink transition-colors w-fit"
        >
          <ChevronLeft size={15} /> Назад в {getCategoryName(product.category)}
        </Link>
      </div>

      <div className="max-w-wrap mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* gallery */}
        <div>
          <Reveal>
            <button
              onClick={() => openLightbox(activeImg)}
              className="relative block w-full overflow-hidden bg-beige aspect-[4/5] md:aspect-[5/6]"
            >
              <Ph src={product.images[activeImg]} alt={product.name} label={product.name} className="object-cover" />
            </button>
          </Reveal>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden bg-beige"
                  style={{ outline: activeImg === i ? "2px solid #A47551" : "2px solid transparent", outlineOffset: "-2px" }}
                >
                  <Ph src={img} alt={`${product.name} фото ${i + 1}`} label={product.name} className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <Reveal delay={0.1}>
          <p className="text-[12px] tracking-[0.25em] uppercase text-wooddark mb-3">{getCategoryName(product.category)}</p>
          <h1 className="font-serif text-3xl md:text-5xl text-ink leading-tight mb-4">{product.name}</h1>
          <p className="font-serif text-2xl md:text-3xl text-wood mb-6">{formatPrice(product.price)}</p>
          <p className="text-ink/70 font-light leading-relaxed mb-8 max-w-lg">{product.description}</p>

          <div className="space-y-5 mb-9 max-w-lg">
            <div className="flex gap-3 items-start">
              <Ruler size={17} className="text-wood mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink/45 mb-0.5">Размеры</p>
                <p className="text-[15px] text-ink/85">{product.dimensions}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Layers size={17} className="text-wood mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink/45 mb-1">Материалы</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.materials.map((m) => (
                    <span key={m} className="text-[12.5px] px-2.5 py-1 bg-ink/5 text-ink/75">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Palette size={17} className="text-wood mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink/45 mb-1.5">Варианты цвета</p>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <span key={c.name} title={c.name} className="w-6 h-6 rounded-full border border-ink/15" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`${SITE_CONFIG.whatsapp.href}?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-4 bg-ink text-milk text-[13px] tracking-[0.08em] uppercase font-medium hover:bg-[#2a2a27] transition-colors"
            >
              <MessageCircle size={16} strokeWidth={1.6} /> Узнать цену в WhatsApp
            </a>
            <a
              href={SITE_CONFIG.telegram.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-4 border border-ink/25 text-ink text-[13px] tracking-[0.08em] uppercase font-medium hover:bg-ink/5 transition-colors"
            >
              <Send size={16} strokeWidth={1.6} /> Telegram
            </a>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="max-w-wrap mx-auto px-5 md:px-10 py-20 md:py-28">
          <Reveal>
            <h2 className="font-serif text-2xl md:text-4xl text-ink mb-10">Похожие товары</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Lightbox images={images} index={lightboxIndex} onClose={closeLightbox} onNav={navLightbox} />
    </div>
  );
}
