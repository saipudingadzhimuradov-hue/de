/**
 * Единое место для контактов, соцсетей и домена сайта.
 * Отредактируйте этот файл — изменения применятся во всех местах
 * сайта (хедер, футер, страницы товаров, sitemap, SEO).
 *
 * ВАЖНО: замените `domain` на реальный адрес сайта перед деплоем —
 * он используется в sitemap.xml, robots.txt и Open Graph тегах.
 */
export const SITE_CONFIG = {
  brand: "DE PARCO",
  domain: "https://de-parco.example.com", // TODO: заменить на реальный домен
  description:
    "DE PARCO — предметы интерьера для дома, где важна каждая деталь: форма, материал, свет.",

  instagram: {
    url: "https://instagram.com/de.parco",
    handle: "@de.parco",
  },
  musaevGroup: {
    url: "https://instagram.com/musaev_group",
    handle: "@musaev_group",
  },

  phone: {
    display: "+7 (000) 000-00-00", // TODO: заменить на реальный номер
    href: "tel:+70000000000",
    note: "номер уточняется",
  },
  whatsapp: {
    number: "70000000000", // TODO: заменить на реальный номер (без + и пробелов)
    href: "https://wa.me/70000000000",
  },
  telegram: {
    username: "de_parco", // TODO: заменить на реальный юзернейм
    href: "https://t.me/de_parco",
  },
  address: "адрес уточняется", // TODO: заменить на реальный адрес
  hours: "время уточняется", // TODO: заменить на реальные часы работы
};
