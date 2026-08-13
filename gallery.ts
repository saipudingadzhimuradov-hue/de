"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
import Reveal from "@/components/Reveal";
import Ph from "@/components/Ph";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";
import { CATEGORIES } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { GALLERY_IMAGES } from "@/data/gallery";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function HomeContent() {
  const featured = getFeaturedProducts();
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  const openLightbox = useCallback((images: LightboxImage[], index: number) => setLightbox({ images, index }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const navLightbox = useCallback((dir: 1 | -1) => {
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + dir + lb.images.length) % lb.images.length } : lb));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[560px] flex items-end overflow-hidden">
        <Ph
          src="https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1800&q=80"
          alt="Интерьер DE PARCO"
          label="DE PARCO interior"
          priority
          className="object-cover scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/35" />
        <div className="relative z-10 max-w-wrap mx-auto w-full px-5 md:px-10 pb-16 md:pb-24">
          <Reveal>
            <p className="text-[12px] md:text-sm tracking-[0.35em] uppercase text-milk/75 mb-5">
              Мебельный бренд премиум-класса
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-[13vw] leading-[0.95] md:text-[6.2vw] text-milk max-w-4xl">
              Мебель,
              <br />с которой живут иначе
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="text-milk/80 text-base md:text-lg max-w-md mt-6 font-light">
              DE PARCO — предметы интерьера для дома, где важна каждая деталь: форма, материал, свет.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                href="/catalog"
                className="px-8 py-4 bg-milk text-ink text-[13px] tracking-[0.1em] uppercase font-medium hover:bg-white transition-colors"
              >
                Смотреть каталог
              </Link>
              <Link
                href="/#contacts"
                className="px-8 py-4 border border-milk/50 text-milk text-[13px] tracking-[0.1em] uppercase font-medium hover:bg-milk/10 transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-6 right-6 md:right-10 z-10 hidden sm:flex flex-col items-center gap-2 text-milk/60">
          <span className="text-[10px] tracking-[0.25em] uppercase [writing-mode:vertical-rl]">Прокрутите</span>
          <span className="w-px h-10 bg-milk/40 animate-scrollcue" />
        </div>
      </section>

      <Marquee />

      {/* CATEGORIES */}
      <section className="max-w-wrap mx-auto px-5 md:px-10 py-20 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <h2 className="font-serif text-3xl md:text-5xl text-ink">Категории</h2>
            <Link
              href="/catalog"
              className="hidden sm:flex items-center gap-1.5 text-[13px] tracking-[0.08em] uppercase text-wooddark hover:opacity-70 transition-opacity"
            >
              Весь каталог <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.05, 0.3)} className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}>
              <Link
                href={`/catalog?category=${c.slug}`}
                className={`group relative block w-full overflow-hidden bg-beige ${
                  i % 5 === 0 ? "aspect-[16/12] md:aspect-[16/11]" : "aspect-[4/5]"
                }`}
              >
                <Ph src={c.image} alt={c.name} label={c.name} className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 font-serif text-xl md:text-3xl text-milk">{c.name}</span>
                <span className="absolute top-4 right-4 md:top-6 md:right-6 text-milk opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-[#efe9dc] py-20 md:py-28">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <p className="text-[12px] tracking-[0.25em] uppercase text-wooddark mb-3">Подборка</p>
                <h2 className="font-serif text-3xl md:text-5xl text-ink">Избранные вещи сезона</h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-wrap mx-auto px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal className="order-2 md:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative w-full aspect-[3/4]">
              <Ph
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
                alt="DE PARCO"
                label="DE PARCO showroom"
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-[3/4] mt-8">
              <Ph
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80"
                alt="DE PARCO детали"
                label="Детали интерьера"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 md:order-2">
          <p className="text-[12px] tracking-[0.25em] uppercase text-wooddark mb-4">О бренде</p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink leading-[1.05] mb-6">
            DE PARCO — мебель для тех, кто ценит форму
          </h2>
          <p className="text-ink/70 font-light leading-relaxed mb-8 max-w-lg">
            Мы отбираем предметы интерьера по трём принципам: качество материалов, аккуратность форм и
            практичность в повседневной жизни. Каждая коллекция создаётся с вниманием к деталям — от каркаса
            до фурнитуры.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-md mb-4">
            {[
              ["12+", "лет опыта"],
              ["500+", "проектов"],
              ["100%", "контроль качества"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl md:text-4xl text-ink">{n}</p>
                <p className="text-[12px] text-ink/55 mt-1 leading-snug">{l}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-ink/40 mb-8">* демонстрационные цифры — заменим на реальные данные бренда</p>
          <ul className="space-y-3 text-[15px] text-ink/80 font-light">
            {["Индивидуальный подбор мебели под интерьер", "Доставка и сборка", "Изготовление на заказ по размеру помещения"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-2 bg-wood shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Marquee dark />

      {/* GALLERY */}
      <section id="gallery" className="max-w-wrap mx-auto px-5 md:px-10 py-20 md:py-28">
        <Reveal>
          <p className="text-[12px] tracking-[0.25em] uppercase text-wooddark mb-3">Галерея</p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink mb-12 md:mb-14">Интерьеры и детали</h2>
        </Reveal>
        <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {GALLERY_IMAGES.map((g, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)} className="break-inside-avoid">
              <button onClick={() => openLightbox(GALLERY_IMAGES, i)} className="group relative block w-full overflow-hidden bg-beige">
                <div className={`relative w-full ${g.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Ph
                    src={g.src}
                    alt={g.label}
                    label={g.label}
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white text-[11px] tracking-[0.15em] uppercase border border-white/60 px-3 py-1.5">
                    Открыть
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-[12px] tracking-[0.25em] uppercase text-wood mb-3">Instagram</p>
                <h2 className="font-serif text-3xl md:text-5xl text-milk">Мы в Instagram</h2>
                <p className="text-milk/50 font-light mt-3">
                  {SITE_CONFIG.instagram.handle} · проект Musaev Group {SITE_CONFIG.musaevGroup.handle}
                </p>
              </div>
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 self-start px-7 py-3.5 bg-milk text-ink text-[13px] tracking-[0.1em] uppercase font-medium hover:bg-white transition-colors"
              >
                <Instagram size={16} strokeWidth={1.6} /> Подписаться
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {GALLERY_IMAGES.slice(0, 6).map((g, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.25)}>
                <button onClick={() => openLightbox(GALLERY_IMAGES, i)} className="group relative block w-full aspect-square overflow-hidden bg-[#2a2a27]">
                  <Ph src={g.src} alt={g.label} label={g.label} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400 flex items-center justify-center">
                    <Instagram size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={lightbox?.images ?? []} index={lightbox?.index ?? null} onClose={closeLightbox} onNav={navLightbox} />
    </div>
  );
}
