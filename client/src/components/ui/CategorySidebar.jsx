import React from "react";

export default function CategorySidebar({ categories = [], selected = "", onSelect }) {
  return (
    <div className="mb-4">
      <h5>Categories</h5>
      <ul className="list-group">
        <li
          className={`list-group-item ${!selected ? "active" : ""}`}
          style={{ cursor: "pointer" }}
          onClick={() => onSelect("")}
        >All</li>
        {categories.map((c) => (
          <li
            key={c._id}
            className={`list-group-item ${selected === c._id ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(c._id)}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
