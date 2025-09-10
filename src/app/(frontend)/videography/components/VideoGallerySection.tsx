"use client";

import { useState } from "react";
import VideoGallery from "./VideoGallery";
import VideoGalleryFilters from "./VideoGalleryFilters";

type VideoGallerySectionProps = {
  url: string;
  title?: string;
  description?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
};

export default function VideoGallerySection({
  url,
  title,
  description,
  columns,
}: VideoGallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Most Recent");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Optional gallery header */}
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-7xl font-bold text-gray-900 mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-2xl text-gray-600 max-w-2xl">{description}</p>
          )}
        </div>
      )}
      <VideoGalleryFilters
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        selectedSort={sortBy}
      />
      <VideoGallery
        url={url}
        title={title}
        description={description}
        columns={columns}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
      />
    </div>
  );
}
