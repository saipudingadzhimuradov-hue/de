import Link from "next/link";
import { Phone, MessageCircle, Send, Instagram, MapPin, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer id="contacts" className="bg-ink text-milk pt-20 md:pt-28 pb-8">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="text-[12px] tracking-[0.25em] uppercase text-wood mb-4">Контакты</p>
          <h2 className="font-serif text-3xl md:text-6xl leading-[1.05] mb-8">
            Готовы обновить
            <br />
            ваш интерьер?
          </h2>
          <a
            href={SITE_CONFIG.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-milk text-ink text-[13px] tracking-[0.1em] uppercase font-medium hover:bg-white transition-colors"
          >
            <MessageCircle size={16} strokeWidth={1.6} /> Написать в WhatsApp
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-14 md:pb-20 border-b border-milk/12">
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-milk/40 mb-3">Телефон</p>
            <a href={SITE_CONFIG.phone.href} className="flex items-center gap-2 text-[15px] text-milk/85 hover:text-milk transition-colors">
              <Phone size={15} strokeWidth={1.5} /> {SITE_CONFIG.phone.display}
            </a>
            <p className="text-[11px] text-milk/30 mt-1">{SITE_CONFIG.phone.note}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-milk/40 mb-3">Мессенджеры</p>
            <div className="flex flex-col gap-2">
              <a href={SITE_CONFIG.whatsapp.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[15px] text-milk/85 hover:text-milk transition-colors">
                <MessageCircle size={15} strokeWidth={1.5} /> WhatsApp
              </a>
              <a href={SITE_CONFIG.telegram.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[15px] text-milk/85 hover:text-milk transition-colors">
                <Send size={15} strokeWidth={1.5} /> Telegram
              </a>
              <a href={SITE_CONFIG.instagram.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[15px] text-milk/85 hover:text-milk transition-colors">
                <Instagram size={15} strokeWidth={1.5} /> {SITE_CONFIG.instagram.handle}
              </a>
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-milk/40 mb-3">Адрес</p>
            <p className="flex items-start gap-2 text-[15px] text-milk/85">
              <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" /> {SITE_CONFIG.address}
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-milk/40 mb-3">Часы работы</p>
            <p className="flex items-start gap-2 text-[15px] text-milk/85">
              <Clock size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" /> {SITE_CONFIG.hours}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 text-[12px] text-milk/40">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brand}. Проект Musaev Group.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/catalog" className="hover:text-milk/70 transition-colors">
              Каталог
            </Link>
            <a href={SITE_CONFIG.instagram.url} target="_blank" rel="noreferrer" className="hover:text-milk/70 transition-colors">
              Instagram
            </a>
            <a href={SITE_CONFIG.musaevGroup.url} target="_blank" rel="noreferrer" className="hover:text-milk/70 transition-colors">
              {SITE_CONFIG.musaevGroup.handle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
