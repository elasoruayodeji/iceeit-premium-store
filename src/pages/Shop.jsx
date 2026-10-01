import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/ProductGrid";
import { products, categories } from "../data/products";
import { Reveal } from "../components/Motion";

// Case-insensitive category match
function sameCategory(a, b) {
  return String(a || "").toLowerCase() === String(b || "").toLowerCase();
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("category") || "All";

  const [category, setCategory] = useState(
    categories.some((c) => sameCategory(c, initial)) ? initial : "All"
  );
  const [sort, setSort] = useState("featured");

  // Sync state when URL changes (e.g. user clicks a category link from homepage)
  useEffect(() => {
    const urlCat = params.get("category") || "All";
    setCategory(
      categories.some((c) => sameCategory(c, urlCat)) ? urlCat : "All"
    );
  }, [params]);

  function handleCategoryChange(c) {
    setCategory(c);
    if (sameCategory(c, "All")) {
      setParams({});
    } else {
      setParams({ category: c });
    }
  }

  const filtered = useMemo(() => {
    let list =
      sameCategory(category, "All")
        ? [...products]
        : products.filter((p) => sameCategory(p.category, category));

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
              className={sameCategory(category, c) ? "active" : ""}
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