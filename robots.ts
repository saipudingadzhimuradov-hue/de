import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Диваны, кровати, шкафы, кухни, столы, стулья и другая мебель премиум-класса от DE PARCO.",
};

export default function CatalogPage({ searchParams }: { searchParams: { category?: string } }) {
  return <CatalogClient initialCategory={searchParams.category ?? "all"} />;
}
