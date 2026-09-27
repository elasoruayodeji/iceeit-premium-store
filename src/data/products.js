export const products = [
  {
    id: "complete-jacket-wear",
    name: "Complete Jacket Wear",
    category: "Outerwear",
    price: 140000,
    colors: [],
    image: "/images/placeholders/complete-jacket-wear.webp",
    gallery: [
      "/images/placeholders/complete-jacket-wear.webp",
      "/images/placeholders/complete-jacket-wear-2.webp"
    ],
    description: "A complete ICEEIT outerwear look built around a strong, cold-weather streetwear silhouette.",
    details: ["Premium streetwear silhouette", "Designed as a complete look", "Care and material details can be updated here"],
    featured: true
  },
  {
    id: "round-neck",
    name: "Round Neck",
    category: "Tops",
    price: 30000,
    colors: ["White", "Black"],
    image: "/images/placeholders/round-neck.webp",
    gallery: ["/images/placeholders/round-neck.webp"],
    description: "A clean everyday ICEEIT essential with a minimal silhouette and recognizable brand presence.",
    details: ["Available in White and Black", "Everyday streetwear essential", "Care and material details can be updated here"],
    featured: true
  },
  {
    id: "sleeveless-top",
    name: "Sleeveless Top",
    category: "Tops",
    price: 25000,
    colors: ["Purple", "Blue", "Green"],
    image: "/images/placeholders/sleeveless-top.webp",
    gallery: ["/images/placeholders/sleeveless-top.webp"],
    description: "A sharper warm-weather layer designed to keep the ICEEIT attitude lightweight and easy to style.",
    details: ["Available in Purple, Blue and Green", "Lightweight streetwear piece", "Care and material details can be updated here"],
    featured: true
  },
  {
    id: "tank-top",
    name: "Tank Top",
    category: "Tops",
    price: 15000,
    colors: [],
    image: "/images/placeholders/tank-top.webp",
    gallery: ["/images/placeholders/tank-top.webp"],
    description: "A straightforward ICEEIT staple made for relaxed styling and everyday rotation.",
    details: ["Versatile everyday piece", "Streetwear-focused fit", "Care and material details can be updated here"],
    featured: false
  },
  {
    id: "double-band-joggers",
    name: "Double Band Joggers",
    category: "Bottoms",
    price: 60000,
    colors: [],
    image: "/images/placeholders/double-band-joggers.webp",
    gallery: ["/images/placeholders/double-band-joggers.webp"],
    description: "Statement joggers built around the signature double-band detail and a strong streetwear profile.",
    details: ["Signature double-band detail", "Designed for casual styling", "Care and material details can be updated here"],
    featured: true
  },
  {
    id: "jersey",
    name: "Jersey",
    category: "Tops",
    price: 30000,
    colors: [],
    image: "/images/placeholders/jersey.webp",
    gallery: ["/images/placeholders/jersey.webp"],
    description: "A relaxed ICEEIT jersey that brings sport-inspired energy into the brand's streetwear language.",
    details: ["Sport-inspired silhouette", "Easy casual styling", "Care and material details can be updated here"],
    featured: true
  }
];

export const categories = ["All", "Tops", "Bottoms", "Outerwear"];

export const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
