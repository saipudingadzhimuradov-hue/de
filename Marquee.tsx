"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, MessageCircle, Send } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

const NAV_ITEMS = [
  { label: "Каталог", href: "/catalog" },
  { label: "О нас", href: "/#about" },
  { label: "Галерея", href: "/#gallery" },
  { label: "Контакты", href: "/#contacts" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Non-home pages are always solid; home page is transparent until scrolled or menu open.
  const solid = !isHome || scrolled || open;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: solid ? "rgba(246,243,236,0.92)" : "transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
          boxShadow: solid ? "0 1px 0 rgba(20,19,18,0.07)" : "none",
        }}
      >
        <div className="max-w-wrap mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20">
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl tracking-[0.14em] transition-colors"
            style={{ color: solid ? "#141312" : "#F6F3EC" }}
          >
            DE&nbsp;PARCO
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] tracking-[0.08em] uppercase font-light transition-colors hover:opacity-60"
                style={{ color: solid ? "#141312" : "#F6F3EC" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE_CONFIG.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 transition-opacity hover:opacity-60"
              style={{ color: solid ? "#141312" : "#F6F3EC" }}
              aria-label="Instagram DE PARCO"
            >
              <Instagram size={18} strokeWidth={1.4} />
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 transition-colors"
            style={{ color: solid ? "#141312" : "#F6F3EC" }}
            aria-label="Открыть меню"
          >
            <Menu size={26} strokeWidth={1.4} />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className="fixed inset-0 z-[100] md:hidden transition-opacity duration-300"
        style={{ pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className="absolute top-0 right-0 h-full w-[82%] max-w-sm bg-milk px-7 pt-6 pb-10 flex flex-col transition-transform duration-400"
          style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
        >
          <div className="flex items-center justify-between mb-12">
            <span className="font-serif text-xl tracking-[0.14em] text-ink">DE&nbsp;PARCO</span>
            <button onClick={() => setOpen(false)} className="p-2 text-ink" aria-label="Закрыть меню">
              <X size={24} strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-left py-3 border-b border-ink/10 text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-5 pt-8">
            <a href={SITE_CONFIG.instagram.url} target="_blank" rel="noreferrer" className="p-2 border border-ink/20 rounded-full text-ink">
              <Instagram size={18} strokeWidth={1.4} />
            </a>
            <a href={SITE_CONFIG.whatsapp.href} target="_blank" rel="noreferrer" className="p-2 border border-ink/20 rounded-full text-ink">
              <MessageCircle size={18} strokeWidth={1.4} />
            </a>
            <a href={SITE_CONFIG.telegram.href} target="_blank" rel="noreferrer" className="p-2 border border-ink/20 rounded-full text-ink">
              <Send size={18} strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
