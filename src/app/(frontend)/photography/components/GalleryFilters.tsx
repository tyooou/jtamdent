"use client";

import { useState, useEffect } from "react";

var buttons = ["All", "People", "Product", "Design"];
var filters = ["Most Recent", "Oldest", "Most Popular"];

type GalleryFiltersProps = {
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  selectedCategory?: string;
  selectedSort?: string;
};

export default function GalleryFilters({
  onCategoryChange,
  onSortChange,
  selectedCategory: initialCategory = "All",
  selectedSort: initialSort = "Most Recent",
}: GalleryFiltersProps) {
  const [getSelectedNode, setSelectedNode] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);

  // Update internal state when props change
  useEffect(() => {
    setSelectedNode(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSelectedSort(initialSort);
  }, [initialSort]);

  const handleCategoryChange = (category: string) => {
    setSelectedNode(category);
    onCategoryChange?.(category);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange?.(sort);
  };

  return (
    <div className="mx-8 flex items-center sticky top-15 bg-white py-4 z-20">
      {/* Category Filter Buttons */}
      <div className="text-xs space-x-2 px-1">
        <span className="text-gray-600 pr-4">Show</span>
        {buttons.map((button) => (
          <button
            key={button}
            className={`px-6 py-2 border border-1 rounded-full  ${
              getSelectedNode === button
                ? "bg-black border-black text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            onClick={() => handleCategoryChange(button)}
          >
            {button}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center space-x-4 px-1 ml-auto text-xs">
        <span className="text-gray-600">Sort by</span>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
