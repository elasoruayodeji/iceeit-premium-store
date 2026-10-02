export const products = [
  {
    id: "complete-jacket-wear",
    name: "Cosmic Splatter",
    category: "Outerwear",
    price: 140000,
    colors: [],
    video: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871084/complete-jacket-wear.mp4",
    image: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871127/jacket-front.jpg",
    gallery: [
      { type: "video", src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871084/complete-jacket-wear.mp4" },
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871127/jacket-front.jpg" },
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871127/jacket-side.jpg" }
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
    video: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871085/round-neck.mp4",
    image: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/look-roundneck-joggers.jpg",
    gallery: [
      { type: "video", src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871085/round-neck.mp4" },
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/look-roundneck-joggers.jpg" }
    ],
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
    video: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871096/sleeveless-top.mp4",
    image: "",
    gallery: [
      { type: "video", src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871096/sleeveless-top.mp4" }
    ],
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
    video: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871069/tank-top.mp4",
    image: "",
    gallery: [
      { type: "video", src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871069/tank-top.mp4" }
    ],
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
    video: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871070/double-band-joggers.mp4",
    image: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/look-roundneck-joggers.jpg",
    gallery: [
      { type: "video", src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871070/double-band-joggers.mp4" },
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/look-roundneck-joggers.jpg" },
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871128/look-jersey-joggers.jpg" }
    ],
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
    video: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871086/jersey.mp4",
    image: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871128/look-jersey-joggers.jpg",
    gallery: [
      { type: "video", src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871086/jersey.mp4" },
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871128/look-jersey-joggers.jpg" }
    ],
    description: "A relaxed ICEEIT jersey that brings sport-inspired energy into the brand's streetwear language.",
    details: ["Sport-inspired silhouette", "Easy casual styling", "Care and material details can be updated here"],
    featured: true
  },
  {
    id: "monogram-denim-coord",
    name: "Monogram Denim Co-ord",
    category: "Outerwear",
    price: 140000,
    colors: [],
    video: "",
    image: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871124/monogram-denim-coord.jpg",
    gallery: [
      { type: "image", src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871124/monogram-denim-coord.jpg" }
    ],
    description: "A monogram-patterned co-ord set built around the ICEEIT cold identity — matching jacket and joggers in a signature repeat print.",
    details: ["One size", "Matching co-ord set", "Care and material details can be updated here"],
    featured: false
  }
];

export const categories = ["All", "Tops", "Bottoms", "Outerwear"];

export const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);