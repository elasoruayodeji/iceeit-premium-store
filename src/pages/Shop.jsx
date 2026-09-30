import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/ProductGrid";
import { products, categories } from "../data/products";
import { Reveal } from "../components/Motion";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("category") || "All";
  const [category, setCategory] = useState(
    categories.includes(initial) ? initial : "All"
  );
  const [sort, setSort] = useState("featured");

  // Sync state when URL changes (e.g. user clicks "View all" from homepage)
  useEffect(() => {
    const urlCat = params.get("category") || "All";
    if (categories.includes(urlCat) && urlCat !== category) {
      setCategory(urlCat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // When user clicks a filter, also update the URL
  function handleCategoryChange(c) {
    setCategory(c);
    if (c === "All") {
      setParams({});
    } else {
      setParams({ category: c });
    }
  }

  const filtered = useMemo(() => {
    // Case-insensitive comparison so "Tops" matches "tops"
    let list =
      category === "All"
        ? [...products]
        : products.filter(
            (p) =>
              (p.category || "").toLowerCase() === category.toLowerCase()
          );

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [category, sort]);

  return (
    <div className="page">
      <Reveal>
        <div className="page-header">
          <p className="eyebrow">ICEEIT / SHOP</p>
          <h1>All pieces.</h1>
          <p>
            Explore the current ICEEIT lineup and find your next rotation staple.
          </p>
        </div>
      </Reveal>

      <div className="shop-controls">
        <div className="filter-tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              onClick={() => handleCategoryChange(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label>
          Sort{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}