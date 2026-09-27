import { Link } from "react-router-dom";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { ProductGrid } from "../components/ProductGrid";
import { products } from "../data/products";
import { Reveal } from "../components/Motion";
import { Button } from "../components/Button";

export default function Collections() {
  return <div className="page">
    <section className="collection-hero"><ImagePlaceholder src="/images/placeholders/collection.webp" alt="ICEEIT collection placeholder"/><div><p className="eyebrow">ICEEIT / 01</p><h1>The current<br/>collection.</h1><p>A focused edit of contemporary pieces built around the ICEEIT cold identity.</p></div></section>
    <section className="section"><Reveal><div className="page-header page-header--small"><p className="eyebrow">The edit</p><h2>Designed to move together.</h2><p>Build a complete look or pick a single piece that carries the room.</p></div></Reveal><ProductGrid products={products}/></section>
    <section className="cta-band"><p className="eyebrow">Find your piece</p><h2>Make it yours.</h2><Button to="/shop">Shop ICEEIT</Button></section>
  </div>;
}
