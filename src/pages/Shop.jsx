import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/ProductGrid";
import { products, categories } from "../data/products";
import { Reveal } from "../components/Motion";

export default function Shop() {
  const [params] = useSearchParams();
  const initial = params.get("category") || "All";
  const [category, setCategory] = useState(categories.includes(initial) ? initial : "All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = category === "All" ? [...products] : products.filter(p => p.category === category);
    if (sort === "low") list.sort((a,b) => a.price-b.price);
    if (sort === "high") list.sort((a,b) => b.price-a.price);
    return list;
  }, [category, sort]);

  return <div className="page">
    <Reveal><div className="page-header"><p className="eyebrow">ICEEIT / SHOP</p><h1>All pieces.</h1><p>Explore the current ICEEIT lineup and find your next rotation staple.</p></div></Reveal>
    <div className="shop-controls">
      <div className="filter-tabs">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
      <label>Sort <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label>
    </div>
    <ProductGrid products={filtered}/>
  </div>;
}
