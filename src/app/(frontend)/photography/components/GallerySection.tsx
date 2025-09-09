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
    <div className="w-full mx-auto">
      {/* Optional gallery header */}
      {(title || description) && (
        <div className="mx-8 mt-8">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
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
