"use client";

import { useEffect, useState } from "react";

type GalleryProps = {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string; // Add thumbnail URL support
  category?: string; // Add category for filtering
  tags?: string[]; // Add tags for filtering
  date?: string; // Add date for sorting
  collection?: string; // Add collection for filtering
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
    };
    medium?: {
      url?: string;
      width?: number;
      height?: number;
    };
    large?: {
      url?: string;
      width?: number;
      height?: number;
    };
  };
};

type GalleryComponentProps = {
  url: string;
  title?: string;
  description?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  enableThumbnails?: boolean; // Option to enable/disable thumbnail loading
  thumbnailQuality?: "low" | "medium" | "high"; // Thumbnail quality setting
  selectedCategory?: string; // Filter by category
  sortBy?: string; // Sort option
};

export default function Gallery({
  url,
  title,
  description,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  enableThumbnails = true,
  thumbnailQuality = "medium",
  selectedCategory = "All",
  sortBy = "Most Recent",
}: GalleryComponentProps) {
  const [images, setImages] = useState<GalleryProps[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryProps | null>(null);

  useEffect(() => {
    // Fetch all gallery data from paginated API
    const fetchAllGalleryData = async () => {
      try {
        let allImages: GalleryProps[] = [];
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
          // Add page parameter to URL
          const urlWithPage = url.includes("?")
            ? `${url}&page=${currentPage}`
            : `${url}?page=${currentPage}`;

          console.log(`Fetching page ${currentPage} from:`, urlWithPage);

          const response = await fetch(urlWithPage);
          const data = await response.json();

          // Handle different API response formats
          const imageData = data.docs || data.images || data || [];

          if (imageData.length > 0) {
            allImages = [...allImages, ...imageData];
            currentPage++;

            // Check if there are more pages
            // Common pagination indicators
            hasNextPage =
              data.hasNextPage ||
              data.nextPage ||
              (data.totalPages && currentPage <= data.totalPages) ||
              (data.pagination && data.pagination.hasNextPage) ||
              imageData.length >= (data.limit || 10); // If we got a full page, try next
          } else {
            hasNextPage = false;
          }

          // Safety break to prevent infinite loops
          if (currentPage > 50) {
            console.warn(
              "Stopped fetching after 50 pages to prevent infinite loop"
            );
            break;
          }
        }

        setImages(allImages);
        console.log(
          `Fetched total of ${allImages.length} images from ${currentPage - 1} pages`
        );
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    if (url) {
      fetchAllGalleryData();
    }
  }, [url]);

  // Filter and sort images based on category and sort options
  useEffect(() => {
    let filtered = [...images];

    // Filter by category/collection
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((image) => {
        // Check both category and collection fields for flexibility
        const imageCategory = image.category?.toLowerCase() || "";
        const imageCollection = image.collection?.toLowerCase() || "";
        const filterCategory = selectedCategory.toLowerCase();

        return (
          imageCategory.includes(filterCategory) ||
          imageCollection.includes(filterCategory)
        );
      });
    }

    // Sort images
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "Most Recent":
            return (
              new Date(b.date || "").getTime() -
              new Date(a.date || "").getTime()
            );
          case "Oldest":
            return (
              new Date(a.date || "").getTime() -
              new Date(b.date || "").getTime()
            );
          case "Most Popular":
            // Assuming there's a popularity field, fallback to title for now
            return (a.title || "").localeCompare(b.title || "");
          default:
            return 0;
        }
      });
    }

    setFilteredImages(filtered);
  }, [images, selectedCategory, sortBy]);

  // Helper function to get the best thumbnail URL
  const getThumbnailUrl = (image: GalleryProps): string => {
    if (!enableThumbnails) return image.url;

    // Check for direct thumbnail property
    if (image.thumbnail) return image.thumbnail;

    // Check for sizes object (common in CMSs like Payload)
    if (image.sizes) {
      switch (thumbnailQuality) {
        case "low":
          return (
            image.sizes.thumbnail?.url || image.sizes.medium?.url || image.url
          );
        case "medium":
          return (
            image.sizes.medium?.url || image.sizes.thumbnail?.url || image.url
          );
        case "high":
          return image.sizes.large?.url || image.sizes.medium?.url || image.url;
        default:
          return image.sizes.medium?.url || image.url;
      }
    }

    // Fallback: try to create thumbnail URL patterns
    const originalUrl = image.url;

    // Common thumbnail URL patterns
    const thumbnailPatterns = [
      // Add _thumb before file extension
      originalUrl.replace(/(\.[^.]+)$/, "_thumb$1"),
      // Add /thumbs/ directory
      originalUrl.replace(/([^/]+)$/, "thumbs/$1"),
      // Add ?w=400 query parameter for dynamic resizing
      `${originalUrl}${originalUrl.includes("?") ? "&" : "?"}w=400&h=400&fit=crop`,
    ];

    // For now, return the first pattern, but you could add logic to test which works
    return thumbnailPatterns[2]; // Using query parameter approach as it's most common
  };

  // Generate responsive grid classes based on columns prop
  const getGridClasses = () => {
    const { mobile = 1, tablet = 2, desktop = 4 } = columns;

    // Use predefined classes that Tailwind can detect
    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    const smClasses = {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
    };

    const mdClasses = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
    };

    const lgClasses = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
    };

    const mobileClass =
      gridClasses[mobile as keyof typeof gridClasses] || "grid-cols-1";
    const tabletClass =
      smClasses[tablet as keyof typeof smClasses] || "sm:grid-cols-2";
    const mediumClass =
      mdClasses[Math.min(tablet + 1, desktop) as keyof typeof mdClasses] ||
      "md:grid-cols-3";
    const desktopClass =
      lgClasses[desktop as keyof typeof lgClasses] || "lg:grid-cols-4";

    return `grid ${mobileClass} ${tabletClass} ${mediumClass} ${desktopClass} gap-3 md:gap-4 lg:gap-6`;
  };

  return (
    <div className="mt-4 md:mt-6 mb-16">
      {/* Loading state */}
      {images.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">Loading images...</div>
        </div>
      )}

      {/* No results message */}
      {images.length > 0 && filteredImages.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">No images found for the selected category.</div>
        </div>
      )}
      {/* Grid layout for images */}
      <div className={getGridClasses()}>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="bg-white overflow-hidden cursor-pointer rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setSelectedImage(image)}
          >
            {/* Image container with fixed aspect ratio - no text */}
            <div className="aspect-square w-full bg-gray-200 rounded-lg md:rounded-xl overflow-hidden">
              <img
                src={getThumbnailUrl(image)}
                alt={image.title}
                className="w-full h-full object-cover hover:scale-105 active:scale-95 transition-transform duration-300"
                loading="lazy" // Enable lazy loading for performance
                onError={(e) => {
                  console.error(
                    "Thumbnail failed to load, falling back to original:",
                    getThumbnailUrl(image)
                  );
                  // Fallback to original image if thumbnail fails
                  e.currentTarget.src = image.url;
                }}
                onLoad={() =>
                  console.log("Thumbnail loaded:", getThumbnailUrl(image))
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Debug: Show data in console */}
      {filteredImages.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Displaying {filteredImages.length} of {images.length} images
        </div>
      )}

      {/* Modal for expanded image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 hover:bg-opacity-70 transition-all z-10"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Expanded image - always use full resolution */}
            <img
              src={selectedImage.url} // Always use original high-res image in modal
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain"
              onLoad={() =>
                console.log(
                  "Full-resolution image loaded in modal:",
                  selectedImage.url
                )
              }
            />

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-gray-300">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
