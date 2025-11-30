"use client";

import { select } from "payload/shared";
import { useEffect, useState } from "react";

type VideoGalleryProps = {
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

type VideoGalleryComponentProps = {
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

export default function VideoGallery({
  url,
  title,
  description,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  selectedCategory = "All",
  sortBy = "Most Recent",
}: VideoGalleryComponentProps) {
  const [videos, setVideos] = useState<VideoGalleryProps[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoGalleryProps[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoGalleryProps | null>(
    null
  );
  // Add state for filters
  const [category, setCategory] = useState<string>(selectedCategory);
  const [sort, setSort] = useState<string>(sortBy);
  // Track loaded state for each video
  const [videoLoaded, setVideoLoaded] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    // Fetch all gallery data from paginated API
    const fetchAllGalleryData = async () => {
      try {
        let allVideos: VideoGalleryProps[] = [];
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
          const videoData = data.docs || data.videos || data || [];

          if (videoData.length > 0) {
            allVideos = [...allVideos, ...videoData];
            currentPage++;

            // Check if there are more pages
            // Common pagination indicators
            hasNextPage =
              data.hasNextPage ||
              data.nextPage ||
              (data.totalPages && currentPage <= data.totalPages) ||
              (data.pagination && data.pagination.hasNextPage) ||
              videoData.length >= (data.limit || 10); // If we got a full page, try next
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

        setVideos(allVideos);
        console.log(
          `Fetched total of ${allVideos.length} videos from ${currentPage - 1} pages`
        );
      } catch (error) {
        console.error("Error fetching video gallery data:", error);
      }
    };

    if (url) {
      fetchAllGalleryData();
    }
  }, [url]);

  // Filter and sort videos based on category and sort options
  useEffect(() => {
    let filtered = [...videos];

    // Filter by category/collection
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((video) => {
        // Check both category and collection fields for flexibility
        const videoCategory = video.category?.toLowerCase() || "";
        const videoCollection = video.collection?.toLowerCase() || "";
        const filterCategory = selectedCategory.toLowerCase();

        return (
          videoCategory.includes(filterCategory) ||
          videoCollection.includes(filterCategory)
        );
      });
    } 

    // Sort videos
    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
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

    setFilteredVideos(filtered);
  }, [videos, selectedCategory, sort]);

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

  // Add bento box tile pattern
  const getTileClass = (i: number, total: number) => {
    const pattern = [
      "col-span-2 row-span-2", // 0
      "col-span-1 row-span-2", // 1
      "col-span-2 row-span-1", // 2
      "col-span-1 row-span-1", // 3
      "col-span-1 row-span-1", // 4
      "col-span-2 row-span-1", // 5
      "col-span-1 row-span-2", // 6
      "col-span-1 row-span-1", // 7
      "col-span-1 row-span-1", // 8
      "col-span-2 row-span-1", // 9
      "col-span-1 row-span-2", // 10
      "col-span-1 row-span-1", // 11
      "col-span-2 row-span-1", // 12
      "col-span-1 row-span-1", // 13
      "col-span-1 row-span-1", // 14
      "col-span-1 row-span-1", // 15
      "col-span-1 row-span-1", // 16
    ];
    const videosInLastRow = total % 17 === 0 ? 17 : total % 17;
    if (i >= total - videosInLastRow) return "col-span-1 row-span-1";
    return pattern[i % 17] || "col-span-1 row-span-1";
  };

  const handleVideoLoaded = (id: string) => {
    setVideoLoaded((prev) => ({ ...prev, [id]: true }));
  };

  // When a grid item is clicked, open modal with full video
  // Only modal loads the actual video file

  return (
    <div className="mt-4 md:mt-6 mb-16">
      {/* Loading state */}
      {videos.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">Loading videos...</div>
        </div>
      )}

      {/* No results message */}
      {videos.length > 0 && filteredVideos.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">
            No videos found for the selected category.
          </div>
        </div>
      )}

      {/* Grid layout for videos, preview is first frame using <video> element */}
      <div className={getGridClasses() + " auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[220px]"}>
        {filteredVideos.map((video, i) => (
          <div
            key={video.id}
            className={
              "bg-white overflow-hidden cursor-pointer relative group rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 " +
              getTileClass(i, filteredVideos.length)
            }
            onClick={() => setSelectedVideo(video)}
          >
            {/* Video preview with aspect ratio, shows first frame */}
            <div className="aspect-video w-full bg-gray-200 relative flex items-center justify-center rounded-lg md:rounded-xl overflow-hidden">
              <video
                src={video.url}
                className="w-full h-full object-cover pointer-events-none select-none bg-black"
                preload="metadata"
                tabIndex={-1}
                playsInline
                muted
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform group-active:scale-95 transition-transform">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-black ml-0.5 md:ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-2 leading-tight">{video.title}</h3>
              {video.description && (
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{video.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for expanded video */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative max-w-4xl max-h-full w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 hover:bg-opacity-70 transition-all z-10 rounded-full"
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
            {/* Expanded video - fully loaded */}
            <div className="flex items-center justify-center w-full h-full">
              <video
                src={selectedVideo.url}
                className="max-h-[90vh] max-w-full object-contain mx-auto my-auto bg-black"
                controls
                autoPlay
                poster={selectedVideo.thumbnail || undefined}
                preload="auto"
              />
            </div>
            {/* Video info */}
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
              {selectedVideo.description && (
                <p className="text-gray-300">{selectedVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Debug: Show data in console */}
      {filteredVideos.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Displaying {filteredVideos.length} of {videos.length} videos
        </div>
      )}
    </div>
  );
}
