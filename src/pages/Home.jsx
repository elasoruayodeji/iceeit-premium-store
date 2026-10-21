/*
  ICEEIT V3 — Home.
  Cinematic editorial composition:
    1. Cinematic hero (campaign photo, WEAR THE COLD type, shop CTA)
    2. Brand introduction (asymmetric editorial split)
    3. Featured collection (real featured products, poster grid)
    4. Editorial campaign (alternating image/video panels)
    5. Shop all (responsive grid wired to real product data + cart flow)
    6. Closing brand statement (full-bleed finish with CTA)
  All copy is plain DOM text so it stays readable without JS animation.
*/
import { Link } from "react-router-dom";
import { CinematicHero } from "../components/CinematicHero";
import { BrandIntro } from "../components/BrandIntro";
import { FeaturedCollection } from "../components/FeaturedCollection";
import { EditorialCampaign } from "../components/EditorialCampaign";
import { ClosingStatement } from "../components/ClosingStatement";
import { ProductGrid } from "../components/ProductGrid";
import { useSeo } from "../hooks/useSeo";
import { getSiteOrigin } from "../lib/seo";
import { products } from "../data/products";

export default function Home() {
  useSeo({
    title:
      "ICEEIT — Streetwear Clothing Brand in Lagos, Nigeria | Wear the Cold",
    description:
      "Shop ICEEIT, a Lagos-based streetwear brand serving Nigeria. FW25 jackets, tops, joggers and co-ord sets built on bold silhouettes and a cold identity. Wear the cold.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ICEEIT FW25 Collection",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${getSiteOrigin()}/product/${p.id}`,
      })),
    },
  });

  return (
    <article className="v3-home">
      <CinematicHero />
      <BrandIntro />
      <FeaturedCollection />
      <EditorialCampaign />

      {/* Shop all — clear product discovery, real routes, real cart */}
      <section className="v3-shopall section" aria-labelledby="v3-shopall-title">
        <header className="v3-feature__head">
          <div>
            <p className="eyebrow">Shop all</p>
            <h2 id="v3-shopall-title">Every piece in the rotation.</h2>
          </div>
          <Link to="/shop" className="text-link">
            Open the full shop →
          </Link>
        </header>
        <ProductGrid products={products} />
        <nav className="v3-shopall__links" aria-label="Shop by category">
          <Link to="/shop?category=Tops">Tops</Link>
          <Link to="/shop?category=Bottoms">Bottoms</Link>
          <Link to="/shop?category=Outerwear">Outerwear</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About ICEEIT</Link>
        </nav>
      </section>

      <ClosingStatement />
    </article>
  );
}
