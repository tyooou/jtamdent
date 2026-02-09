"use client";

import React, { useEffect, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const galleryCache: Record<string, GalleryProps[]> = {};

type GalleryProps = {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: string;
  width: number;
  height: number;
};

type GalleryComponentProps = {
  url: string;
  selectedCategory?: string;
};

export default function PhotoGrid({
  url,
  selectedCategory = "All",
}: GalleryComponentProps) {
  const [images, setImages] = useState<GalleryProps[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryProps[]>([]);
  const [modalPhoto, setModalPhoto] = useState<null | typeof photos[0]>(null);

  useEffect(() => {
    const fetchAllGalleryData = async () => {
      if (galleryCache[url]) {
        setImages(galleryCache[url]);
        return;
      }
      try {
        let allImages: GalleryProps[] = [];
        let currentPage = 1;
        let hasNextPage = true;
        while (hasNextPage) {
          const urlWithPage = url.includes("?")
            ? `${url}&page=${currentPage}`
            : `${url}?page=${currentPage}`;
          const response = await fetch(urlWithPage);
          const data = await response.json();
          const imageData = data.docs || data.images || data || [];
          if (imageData.length > 0) {
            allImages = [...allImages, ...imageData];
            currentPage++;
            hasNextPage =
              data.hasNextPage ||
              data.nextPage ||
              (data.totalPages && currentPage <= data.totalPages) ||
              (data.pagination && data.pagination.hasNextPage) ||
              imageData.length >= (data.limit || 10);
          } else {
            hasNextPage = false;
          }
          if (currentPage > 50) break;
        }
        galleryCache[url] = allImages;
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };
    if (url) fetchAllGalleryData();
  }, [url]);

  useEffect(() => {
    let filtered = images;
    if (selectedCategory && selectedCategory !== "All") {
      const filterCategory = selectedCategory.toLowerCase();
      filtered = images.filter((image) => {
        const imageCategory = image.category.toLowerCase();
        return imageCategory.includes(filterCategory);
      });
    }
    setFilteredImages(filtered);
  }, [images, selectedCategory]);

  const photos = filteredImages.map((img) => {
    return {
      src: img.url,
      width: img.width,
      height: img.height,
      alt: img.title || "",
      title: img.title || "",
      key: img.id?.toString() || img.url,
    };
  });

  return (
    <div className="mt-4 md:mt-6 mb-16">
      {images.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">Loading images...</div>
        </div>
      )}
      {images.length > 0 && filteredImages.length === 0 && (
        <div className="text-center text-gray-500 py-12 md:py-16">
          <div className="text-lg md:text-xl">
            No images found for the selected category.
          </div>
        </div>
      )}
      {filteredImages.length > 0 && (
        <RowsPhotoAlbum
          photos={photos}
          sizes={{
            size: "1168px",
            sizes: [
              {
                viewport: "(max-width: 1200px)",
                size: "calc(100vw - 32px)",
              },
            ],
          }}
          spacing={8}
          onClick={({ index }) => setModalPhoto(photos[index])}
          render={{
            image: (props) => (
              <img
                {...props}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                className="select-none"
              />
            ),
          }}
        />
      )}
      {filteredImages.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Displaying {filteredImages.length} of {images.length} images
        </div>
      )}
      {modalPhoto && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setModalPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-full flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalPhoto(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 hover:bg-opacity-70 transition-all z-10 hover:scale-110 rounded-full"
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
            <img
              src={modalPhoto.src}
              alt={modalPhoto.alt}
              className="max-w-full max-h-[90vh] object-contain select-none"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">
                {modalPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
