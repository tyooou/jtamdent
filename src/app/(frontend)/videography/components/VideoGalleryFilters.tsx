"use client";

import { useState, useEffect } from "react";

const buttons = ["All", "Interview", "Promotional"];
const filters = ["Most Recent", "Oldest"];

type VideoGalleryFiltersProps = {
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  selectedCategory?: string;
  selectedSort?: string;
};

export default function VideoGalleryFilters({
  onCategoryChange,
  selectedCategory: initialCategory = "All",
  selectedSort: initialSort = "Most Recent",
}: VideoGalleryFiltersProps) {
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

  return (
    <div className="sticky top-16 md:top-28 bg-white py-4 z-20 border-b border-gray-100 mb-6">
      {/* Mobile Layout - Stacked */}
      <div className="block md:hidden space-y-4">
        {/* Category Filter Buttons - Mobile */}
        <div className="space-y-2">
          <span className="text-sm text-gray-600 block">Show</span>
          <div className="grid grid-cols-2 gap-2">
            {buttons.map((button) => (
              <button
                key={button}
                className={`px-4 py-3 text-sm border rounded-lg transition-colors ${
                  getSelectedNode === button
                    ? "bg-black border-black text-white"
                    : "bg-white border-gray-300 text-black hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryChange(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex items-center justify-between">
        {/* Category Filter Buttons - Desktop */}
        <div className="flex items-center text-sm space-x-3">
          <span className="text-gray-600">Show</span>
          <div className="flex space-x-2">
            {buttons.map((button) => (
              <button
                key={button}
                className={`px-6 py-2 border rounded-full transition-colors ${
                  getSelectedNode === button
                    ? "bg-black border-black text-white"
                    : "bg-white border-gray-300 text-black hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryChange(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}
