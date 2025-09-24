import React from "react";

export default function Pagination({ page = 1, pages = 1, onPage }) {
    if (pages <= 1) return null;
    const arr = Array.from({ length: pages }, (_, i) => i + 1);
    return (
        <nav>
            <ul className="pagination">
                {arr.map(p => (
                    <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPage(p)}>{p}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
