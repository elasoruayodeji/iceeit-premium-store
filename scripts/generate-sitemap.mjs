/*
  ICEEIT build-time sitemap generator.

  Writes dist/sitemap.xml after `vite build`. The production origin is taken
  from VITE_SITE_URL when configured (verified deployment domain). If it is
  not set, we do NOT invent a domain — instead a placeholder origin is written
  and the build prints a loud warning so the operator can set VITE_SITE_URL
  and rebuild (or edit the file) before submitting to Search Console.

  Only eligible public URLs are included: home, shop, collections, about,
  contact, faq and every product detail page. Admin, cart and checkout routes
  are intentionally excluded.
*/
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// Read product ids straight from the data module (regex-safe for this file shape).
const productsSrc = readFileSync(path.join(root, "src/data/products.js"), "utf8");
const ids = [...productsSrc.matchAll(/^\s{4}id:\s*"([^"]+)"/gm)].map((m) => m[1]);
if (!ids.length) {
  console.error("[sitemap] No product ids found in src/data/products.js");
  process.exit(1);
}

const envUrl = process.env.VITE_SITE_URL || "";
let origin = envUrl.replace(/\/+$/, "");
if (!origin) {
  origin = "https://REPLACE-WITH-VERIFIED-PRODUCTION-DOMAIN.example";
  console.warn(
    "\n[sitemap] WARNING: VITE_SITE_URL is not set.\n" +
      "[sitemap] The generated sitemap uses a placeholder domain. Set the\n" +
      "[sitemap] verified production domain as VITE_SITE_URL and re-run the\n" +
      "[sitemap] build before submitting sitemap.xml to search engines.\n"
  );
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { p: "/", pri: "1.0" },
  { p: "/shop", pri: "0.9" },
  { p: "/collections", pri: "0.8" },
  ...ids.map((id) => ({ p: `/product/${id}`, pri: "0.8" })),
  { p: "/about", pri: "0.6" },
  { p: "/contact", pri: "0.6" },
  { p: "/faq", pri: "0.5" },
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${origin}${u.p === "/" ? "/" : u.p}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n` +
        `    <priority>${u.pri}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(path.join(dist, "sitemap.xml"), xml);

// Inject the Sitemap directive into the copied robots.txt as well.
const robotsPath = path.join(dist, "robots.txt");
if (existsSync(robotsPath)) {
  let robots = readFileSync(robotsPath, "utf8");
  robots += `\nSitemap: ${origin}/sitemap.xml\n`;
  writeFileSync(robotsPath, robots);
}

console.log(`[sitemap] Wrote dist/sitemap.xml with ${urls.length} URLs (origin: ${origin})`);
