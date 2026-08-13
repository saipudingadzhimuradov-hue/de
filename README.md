# DE PARCO — сайт мебельного бренда

Премиальный сайт мебельного магазина DE PARCO. Next.js 14 (App Router) + TypeScript + Tailwind CSS.

Instagram: [@de.parco](https://instagram.com/de.parco) · Проект [Musaev Group](https://instagram.com/musaev_group)

---

## 1. Быстрый старт

Понадобится установленный [Node.js](https://nodejs.org/) версии 18.17 или новее (проверить: `node -v`).

```bash
# 1. Установить зависимости
npm install

# 2. Запустить сайт локально
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) — сайт запустится с автообновлением при
изменении файлов.

Другие команды:

```bash
npm run build   # собрать production-версию
npm run start   # запустить собранную production-версию локально
npm run lint    # проверить код линтером
```

---

## 2. Структура проекта

```
de-parco/
├── app/                        # страницы (Next.js App Router)
│   ├── layout.tsx              # общий каркас: шрифты, SEO по умолчанию, Header/Footer
│   ├── page.tsx                # главная страница
│   ├── globals.css             # глобальные стили и анимации
│   ├── sitemap.ts              # автогенерация /sitemap.xml
│   ├── robots.ts                # автогенерация /robots.txt
│   ├── not-found.tsx           # страница 404
│   ├── catalog/
│   │   ├── page.tsx            # страница каталога (SEO-метаданные, читает ?category=)
│   │   └── CatalogClient.tsx   # поиск, фильтры, сортировка, сетка товаров
│   └── product/[slug]/
│       ├── page.tsx            # страница товара (SEO-метаданные, generateStaticParams)
│       └── ProductClient.tsx   # галерея, характеристики, похожие товары
│
├── components/                 # переиспользуемые UI-компоненты
│   ├── Header.tsx               # шапка сайта, мобильное меню
│   ├── Footer.tsx               # подвал, контакты
│   ├── HomeContent.tsx          # весь контент главной страницы
│   ├── ProductCard.tsx          # карточка товара
│   ├── Marquee.tsx              # бегущая строка категорий
│   ├── Lightbox.tsx             # полноэкранный просмотр фото
│   ├── Reveal.tsx               # анимация появления при скролле
│   └── Ph.tsx                   # изображение с fallback-плейсхолдером
│
├── data/                        # ВСЕ данные сайта — редактируются без затрагивания кода
│   ├── products.ts              # ← товары (главный файл для повседневного редактирования)
│   ├── categories.ts            # категории мебели
│   ├── gallery.ts               # фото для галереи и блока Instagram
│   └── siteConfig.ts            # телефон, WhatsApp, Telegram, адрес, домен, соцсети
│
├── lib/
│   ├── format.ts                 # форматирование цены
│   └── placeholder.ts            # генератор запасной картинки при ошибке загрузки фото
│
└── public/images/                # сюда кладите реальные фотографии DE PARCO
```

---

## 3. Как добавить или отредактировать товар

Откройте **`data/products.ts`**. Каждый товар — это один объект в массиве `PRODUCTS`:

```ts
{
  id: 17,
  slug: "sofa-novy-divan",              // уникальный, используется в адресе /product/...
  name: "Диван Новинка",
  category: "sofas",                     // должен совпадать со slug из data/categories.ts
  price: 99000,
  featured: false,                       // true — показать в "Избранном" на главной
  description: "Описание товара...",
  images: [
    "/images/products/novy-divan-1.jpg",
    "/images/products/novy-divan-2.jpg",
  ],
  dimensions: "200 × 90 × 80 см",
  materials: ["Массив дуба", "Велюр"],
  colors: [
    { name: "Графит", hex: "#3a3a38" },
    { name: "Молоко", hex: "#efe8db" },
  ],
},
```

Просто добавьте новый объект в массив — страница товара `/product/sofa-novy-divan` и карточка
в каталоге появятся автоматически, без правки компонентов.

Чтобы добавить категорию — отредактируйте `data/categories.ts` тем же способом.

---

## 4. Как заменить фотографии

Сейчас на сайте временные фотографии (Unsplash) — специально подобранные под тематику мебели,
чтобы дизайн сразу выглядел готовым. Их легко заменить:

1. Положите свои фото в `public/images/products/`, `public/images/gallery/` или `public/images/hero/`
   (см. `public/images/README.md`).
2. В `data/products.ts` / `data/gallery.ts` / `data/categories.ts` замените ссылку на путь вида
   `/images/products/имя-файла.jpg`.

Если фото не загрузится (например, битая ссылка), сайт автоматически покажет аккуратную
фирменную заглушку вместо сломанной иконки — ничего не сломается.

---

## 5. Как отредактировать контакты, телефон, соцсети

Откройте **`data/siteConfig.ts`** — один файл управляет телефоном, WhatsApp, Telegram, адресом,
часами работы и ссылками на Instagram во всём сайте (шапка, подвал, страницы товаров).

Также в этом файле — поле `domain`: **обязательно замените его на реальный адрес сайта перед
размещением на хостинге** — оно используется в `sitemap.xml`, `robots.txt` и SEO-тегах Open Graph.

---

## 6. Что уже реализовано

- Главная: hero-экран, категории, избранные товары, блок "О бренде", masonry-галерея с lightbox,
  блок Instagram, контакты.
- Каталог: поиск, фильтр по категориям, сортировка по цене/названию, адаптивная сетка.
- Страница товара: галерея с миниатюрами и lightbox, характеристики, цвета, кнопки
  WhatsApp/Telegram, похожие товары.
- Полностью адаптивная мобильная версия (меню, свайп миниатюр, крупные фото).
- SEO: заголовки, description, Open Graph, автогенерируемые `sitemap.xml` и `robots.txt`,
  человекопонятные URL (`/catalog`, `/product/sofa-lecco`).
- Оптимизация изображений через `next/image` (lazy loading, современные форматы, responsive sizes).
- Аккуратные микроанимации: появление при скролле, hover-зум фото, бегущая строка, плавный скролл.

## 7. Что легко подключить дальше

- **CMS/админка**: весь каталог читается через функции в `data/products.ts`
  (`getAllProducts`, `getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`,
  `getProductsByCategory`). Чтобы подключить CMS или базу данных, достаточно заменить содержимое
  этих функций на запросы к API — остальной код менять не придётся.
- **Реальные фото Instagram**: сейчас используется статичный набор фото из `data/gallery.ts`;
  при необходимости их можно заменить на данные из Instagram Graph API тем же способом.

---

## 8. Деплой на хостинг

Проект — обычное Next.js-приложение, поэтому подходит любой хостинг с поддержкой Node.js.

### Vercel (рекомендуется, самый простой способ)

1. Загрузите проект в GitHub/GitLab.
2. На [vercel.com](https://vercel.com) выберите "New Project" → укажите репозиторий.
3. Vercel сам определит Next.js и настройки сборки — просто нажмите Deploy.

### Любой другой Node.js-хостинг

```bash
npm run build
npm run start
```

По умолчанию приложение слушает порт 3000 (можно изменить через переменную окружения `PORT`).

### Перед деплоем обязательно проверьте

- [ ] Заменили `domain` в `data/siteConfig.ts` на реальный адрес сайта
- [ ] Заменили телефон, WhatsApp, Telegram, адрес и часы работы в `data/siteConfig.ts`
- [ ] Заменили временные фото на реальные (см. пункт 4)
- [ ] Проверили все товары и цены в `data/products.ts`

---

## Технологии

Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react (иконки)
