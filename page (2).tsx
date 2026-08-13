import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 text-center px-5">
      <p className="text-[12px] tracking-[0.25em] uppercase text-wooddark mb-4">404</p>
      <h1 className="font-serif text-3xl md:text-5xl text-ink mb-6">Страница не найдена</h1>
      <p className="text-ink/60 font-light mb-9 max-w-md mx-auto">
        Похоже, такой страницы не существует или она была перемещена.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-4 bg-ink text-milk text-[13px] tracking-[0.1em] uppercase font-medium hover:bg-[#2a2a27] transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}
