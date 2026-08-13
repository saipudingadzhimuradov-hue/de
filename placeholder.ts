import { CATEGORIES } from "@/data/categories";

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const line = CATEGORIES.map((c) => c.name.toUpperCase()).join("   ·   ") + "   ·   ";

  return (
    <div className={`overflow-hidden py-4 md:py-5 border-y ${dark ? "border-milk/15 bg-ink" : "border-ink/10 bg-milk"}`}>
      <div className="flex whitespace-nowrap animate-marquee" style={{ width: "max-content" }}>
        <span className={`font-serif text-lg md:text-2xl italic tracking-wide px-2 ${dark ? "text-milk/60" : "text-ink/50"}`}>
          {line}
          {line}
        </span>
      </div>
    </div>
  );
}
