"use client";

import { useState, useEffect } from "react";

const DEFAULT_CATEGORY_OPTIONS = ["All"];

export type MediaFiltersProps = {
  categories?: string[];
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
  stickyClassName?: string;
};

export default function MediaFilters({
  categories = DEFAULT_CATEGORY_OPTIONS,
  onCategoryChange,
  selectedCategory = "All",
  stickyClassName = "sticky top-16 bg-white py-4 z-20 border-b border-gray-100",
}: MediaFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className={stickyClassName}>
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex flex-row gap-3 w-full items-center">
          <span className="text-md text-gray-600">Show</span>
          {categories.map((option) => (
            <button
              key={option}
              className={`flex-1 px-2 py-2 text-sm border rounded-lg transition-colors ${
                activeCategory === option
                  ? "bg-black border-black text-white"
                  : "bg-white border-gray-300 text-black hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center text-sm space-x-3">
          <span className="text-gray-600">Show</span>
          <div className="flex space-x-2">
            {categories.map((option) => (
              <button
                key={option}
                className={`px-6 py-2 border rounded-full transition-colors ${
                  activeCategory === option
                    ? "bg-black border-black text-white"
                    : "bg-white border-gray-300 text-black hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
