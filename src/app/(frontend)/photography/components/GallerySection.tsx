"use client";

import { useState } from "react";
import Gallery from "./Gallery";
import GalleryFilters from "./GalleryFilters";

type GallerySectionProps = {
  url: string;
  title?: string;
  description?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  enableThumbnails?: boolean;
  thumbnailQuality?: "low" | "medium" | "high";
};

export default function GallerySection({
  url,
  title,
  description,
  columns,
  enableThumbnails,
  thumbnailQuality,
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Most Recent");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Optional gallery header */}
      {(title || description) && (
        <div>
          {title && (
            <h2 className="text-7xl font-bold text-gray-900 mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-2xl text-gray-600 max-w-2xl">{description}</p>
          )}
        </div>
      )}
      <GalleryFilters
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        selectedSort={sortBy}
      />
      <Gallery
        url={url}
        title={title}
        description={description}
        columns={columns}
        enableThumbnails={enableThumbnails}
        thumbnailQuality={thumbnailQuality}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
      />
    </div>
  );
}
