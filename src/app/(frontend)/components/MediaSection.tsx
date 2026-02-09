"use client";

import { useState } from "react";
import PhotoGrid from "../photography/components/PhotoGrid";
import VideoGrid from "../videography/components/VideoGrid";
import MediaFilters from "./MediaFilters";

type MediaSectionProps = {
  url: string;
  title?: string;
  description?: string;
  type?: "photo" | "video";
};

export default function MediaSection({
  url,
  title,
  description,
  type,
}: MediaSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const photoCategories = ["All", "Commercial", "Product"];
  const videoCategories = ["All", "Interview", "Promotional"];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12 max-w-7xl mx-auto">
      {(title || description) && (
        <div className="mb-3 md:mb-4 lg:mb-6">
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-3 md:mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      {type === "photo" ? (
        <>
          <MediaFilters
            categories={photoCategories}
            onCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <PhotoGrid
            url={url}
            selectedCategory={selectedCategory}
          />
        </>
      ) : (
        <>
          <MediaFilters
            categories={videoCategories}
            onCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <VideoGrid
            url={url}
            selectedCategory={selectedCategory}
          />
        </>
      )}
    </div>
  );
}
