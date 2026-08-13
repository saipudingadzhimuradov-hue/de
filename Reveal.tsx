import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import Ph from "./Ph";
import type { Product } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)}>
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden aspect-[4/5] bg-beige">
          <Ph
            src={product.images[0]}
            alt={product.name}
            label={product.name}
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 bg-milk/90 text-ink">
            {getCategoryName(product.category)}
          </span>
          <span className="absolute bottom-4 right-4 flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            Смотреть <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="pt-4">
          <h3 className="font-serif text-lg md:text-xl text-ink leading-tight">{product.name}</h3>
          <p className="text-[13px] tracking-wide text-wooddark mt-1.5">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </Reveal>
  );
}
