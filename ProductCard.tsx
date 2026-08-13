import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Товар не найден" };

  const title = `${product.name} — ${formatPrice(product.price)}`;
  const description = `${product.description} Категория: ${getCategoryName(product.category)}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);
  return <ProductClient product={product} related={related} />;
}
