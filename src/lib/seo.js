/*
  ICEEIT SEO helpers.

  Production origin is read from the live deployment at runtime, so canonical
  URLs and sitemap entries always match the real domain — no invented domain.
  Set VITE_SITE_URL in the hosting environment to pin an explicit production
  domain (e.g. a custom domain) if desired.
*/

export const SITE_NAME = "ICEEIT";
export const DEFAULT_TITLE =
  "ICEEIT — Streetwear Clothing Brand in Lagos, Nigeria | Wear the Cold";
export const DEFAULT_DESCRIPTION =
  "ICEEIT is a Lagos-based streetwear and clothing brand serving Nigeria. Shop jackets, tops, joggers and co-ord sets. Wear the cold.";
export const OG_IMAGE =
  "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/hero.jpg";

// Public routes that should be indexed by search engines.
export const PUBLIC_PATHS = ["/", "/shop", "/collections", "/about", "/contact", "/faq"];

import { products } from "../data/products";

// Product detail paths, used by the build-time sitemap generator.
export function productPaths() {
  return products.map((p) => `/product/${p.id}`);
}

// Image helper for social previews / structured data.
const CLOUDINARY = "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto";
export const PRODUCT_IMAGE_FALLBACK = `${CLOUDINARY}/v1790871129/hero.jpg`;
export function productImage(product) {
  return product.image || PRODUCT_IMAGE_FALLBACK;
}

export function getSiteOrigin() {
  if (typeof window === "undefined") return "";
  const env = import.meta.env.VITE_SITE_URL;
  if (env) return String(env).replace(/\/+$/, "");
  return window.location.origin;
}

export function canonicalFor(pathname) {
  const origin = getSiteOrigin();
  const clean = pathname.replace(/\/+$/, "") || "/";
  return `${origin}${clean === "/" ? "/" : clean}`;
}

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  if (content != null && content !== "") {
    el.setAttribute("content", content);
  } else if (el.parentNode) {
    // Clear stale per-route values (e.g. noindex) when a page has none.
    el.parentNode.removeChild(el);
  }
  return el;
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/*
  Apply per-route SEO metadata. Client-side rendering caveat: crawlers that
  execute JS (Google) will see these tags; social scrapers that do not
  (some platforms) fall back to the static defaults in index.html.
*/
export function applySeo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  ogImage = OG_IMAGE,
  ogType = "website",
  robots,
  jsonLd,
}) {
  document.title = title;
  setMeta("name", "description", description);
  setMeta("name", "robots", robots);

  const url = canonicalFor(path);
  setLink("canonical", url);

  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", ogImage);
  setMeta("property", "og:locale", "en_NG");
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", ogImage);

  upsertJsonLd("iceeit-route-jsonld", jsonLd || null);
}

// Site-wide structured data (Organization + WebSite), injected once.
export function applyGlobalStructuredData() {
  const origin = getSiteOrigin();
  if (!origin) return;
  let el = document.getElementById("iceeit-global-jsonld");
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "iceeit-global-jsonld";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ClothingStore",
        "@id": `${origin}/#brand`,
        name: SITE_NAME,
        alternateName: "ICEEIT Streetwear",
        slogan: "Wear the Cold",
        description:
          "ICEEIT is a Lagos-based streetwear and clothing brand serving customers in Nigeria.",
        url: origin,
        email: "iceeit.orders@gmail.com",
        areaServed: { "@type": "Country", name: "Nigeria" },
        sameAs: ["https://instagram.com/iceeitofficial"],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        url: origin,
        publisher: { "@id": `${origin}/#brand` },
      },
    ],
  });
}

// Rebuild sitemap-relevant info is server-side only; nothing to do at runtime.
export { productPaths as seoProductPaths };
