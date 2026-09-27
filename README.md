# ICEEIT

A premium, mobile-first ICEEIT ecommerce frontend built with React, Vite and Motion for React (Framer Motion).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Replace product images

All product content lives in `src/data/products.js`.

Put your real images in `public/images/products/` and change each product's `image` / `gallery` path.

The starter paths intentionally point to `/images/placeholders/...` so the project works before your photos are inserted.

## Replace contact/social details

Edit `src/data/site.js`.

## Payment

Checkout is intentionally prepared for a future payment integration. No fake payment credentials are used. Connect Paystack or another provider through a secure server-side endpoint before accepting real payments.

## Design

The UI uses centralized CSS design tokens in `src/styles/tokens.css`. Components should use the tokens rather than hardcoded colors, spacing or typography values.
