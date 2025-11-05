import React from "react";

export default function SearchBar({ value, onChange, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <input
        className="input"
        placeholder="Search questions…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <select
        className="input md:w-48"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="date">Newest</option>
        <option value="votes">Top</option>
      </select>
    </div>
  );
}
