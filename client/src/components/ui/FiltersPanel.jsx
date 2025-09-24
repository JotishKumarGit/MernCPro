import React, { useState, useEffect } from "react";

export default function FiltersPanel({ query = {}, onChangeParam }) {
  const [min, setMin] = useState(query.minPrice || "");
  const [max, setMax] = useState(query.maxPrice || "");
  const [minRating, setMinRating] = useState(query.minRating || "");
  const [sort, setSort] = useState(query.sort || "");

  useEffect(() => {
    setMin(query.minPrice || "");
    setMax(query.maxPrice || "");
    setMinRating(query.minRating || "");
    setSort(query.sort || "");
  }, [query]);

  const apply = () => {
    onChangeParam("minPrice", min || "");
    onChangeParam("maxPrice", max || "");
    onChangeParam("minRating", minRating || "");
    onChangeParam("sort", sort || "");
  };

  const clearAll = () => {
    setMin(""); setMax(""); setMinRating(""); setSort("");
    onChangeParam("minPrice", "");
    onChangeParam("maxPrice", "");
    onChangeParam("minRating", "");
    onChangeParam("sort", "");
  };

  return (
    <div className="mb-4">
      <h5>Filters</h5>

      <div className="mb-2">
        <label>Price</label>
        <div className="d-flex gap-2">
          <input type="number" className="form-control" placeholder="Min" value={min} onChange={e=>setMin(e.target.value)} />
          <input type="number" className="form-control" placeholder="Max" value={max} onChange={e=>setMax(e.target.value)} />
        </div>
      </div>

      <div className="mb-2">
        <label>Min Rating</label>
        <select className="form-select" value={minRating} onChange={e=>setMinRating(e.target.value)}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Sort</label>
        <select className="form-select" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={apply}>Apply</button>
        <button className="btn btn-secondary" onClick={clearAll}>Clear</button>
      </div>
    </div>
  );
}
