"use client";

import React, { useEffect, useState } from "react";

const videoGalleryCache: Record<string, VideoGalleryProps[]> = {};

type VideoGalleryProps = {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: string;
  vimeoUrl: string;
  aspectRatio?: "16:9" | "9:16";
};

type VideoGridComponentProps = {
  url: string;
  selectedCategory?: string;
};

export default function VideoGrid({
  url,
  selectedCategory = "All",
}: VideoGridComponentProps) {
  const [videos, setVideos] = useState<VideoGalleryProps[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoGalleryProps[]>([]);

  useEffect(() => {
    const fetchAllGalleryData = async () => {
      if (videoGalleryCache[url]) {
        setVideos(videoGalleryCache[url]);
        return;
      }
      try {
        let allVideos: VideoGalleryProps[] = [];
        let currentPage = 1;
        let hasNextPage = true;
        while (hasNextPage) {
          const urlWithPage = url.includes("?")
            ? `${url}&page=${currentPage}`
            : `${url}?page=${currentPage}`;
          const response = await fetch(urlWithPage);
          const data = await response.json();
          const videoData = data.docs || data.videos || data || [];
          console.log(`Fetched page ${currentPage}:`, videoData);
          if (videoData.length > 0) {
            allVideos = [...allVideos, ...videoData];
            currentPage++;
            hasNextPage =
              data.hasNextPage ||
              data.nextPage ||
              (data.totalPages && currentPage <= data.totalPages) ||
              (data.pagination && data.pagination.hasNextPage) ||
              videoData.length >= (data.limit || 10);
          } else {
            hasNextPage = false;
          }
          if (currentPage > 50) break;
        }
        videoGalleryCache[url] = allVideos;
        setVideos(allVideos);
      } catch (error) {
        console.error("Error fetching video gallery data:", error);
      }
    };
    if (url) fetchAllGalleryData();
  }, [url]);

  useEffect(() => {
    let filtered = videos;
    if (selectedCategory && selectedCategory !== "All") {
      const filterCategory = selectedCategory.toLowerCase();
      filtered = videos.filter((video) => {
        const videoCategory = video.category.toLowerCase();
        return videoCategory.includes(filterCategory);
      });
    }
    setFilteredVideos(filtered);
  }, [videos, selectedCategory]);

  const getVimeoEmbedUrl = (url: string) => {
    // Extract Vimeo video ID from various URL formats
    const match = url.match(
      /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/
    );
    return match 
      ? `https://player.vimeo.com/video/${match[1]}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`
      : url;
  };

  const getAspectRatioPadding = (ratio?: "16:9" | "9:16") => {
    if (ratio === "9:16") return "177.78%"; // 9:16 vertical
    return "56.25%"; // 16:9 horizontal (default)
  };

  return (
    <div className="mt-4 md:mt-6 mb-16">
      {videos.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">Loading videos...</div>
        </div>
      )}
      {videos.length > 0 && filteredVideos.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">
            No videos found for the selected category.
          </div>
        </div>
      )}
      {filteredVideos.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 items-start">
          {filteredVideos.map((vid) => {
            const isVertical = vid.aspectRatio === "9:16";

            return (
              <div
                key={vid.id}
                className="video-card bg-black rounded-lg overflow-hidden"
                style={{
                  aspectRatio: isVertical ? "9 / 16" : "16 / 9",
                  flexShrink: 0,
                }}
              >
                <iframe
                  src={getVimeoEmbedUrl(vid.vimeoUrl)}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  title={vid.title || "Vimeo video"}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      )}
      {filteredVideos.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Displaying {filteredVideos.length} of {videos.length} videos
        </div>
      )}
      <style jsx>{`
        .video-card {
          width: 100%;
          height: auto;
        }

        @media (min-width: 640px) {
          .video-card {
            height: 240px;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}
