"use client";

import { useEffect, useState } from "react";

type ProfileData = {
  id: string;
  filename: string;
  alt: string;
  url: string;
};

export default function AboutSection() {
  const [profileImage, setProfileImage] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // Fetch from Payload CMS API
        const response = await fetch("/api/profile?limit=1");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Payload returns data in format: { docs: [...] }
        const profileDoc = data?.docs?.[0];
        
        if (profileDoc) {
          // Construct the full URL for the uploaded image
          const imageUrl = profileDoc.url || `/api/media/file/${profileDoc.filename}`;
          
          setProfileImage({
            ...profileDoc,
            url: imageUrl
          });
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="text-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 gap-6 md:gap-20 md:flex-row max-w-6xl mx-auto">
      <div className="w-full md:w-auto flex justify-center md:justify-start">
        {loading ? (
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gray-200 animate-pulse rounded"></div>
        ) : profileImage ? (
          <img
            src={profileImage.url}
            alt={profileImage.alt || "Jaidyn Tam"}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded shadow-lg"
          />
        ) : (
          <img
            src="/jaidyn-tam.jpg"
            alt="Jaidyn Tam"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded shadow-lg"
          />
        )}
      </div>
      <div className="w-full md:w-auto text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Hey, I&apos;m Jaidyn Tam.</h1>
        <p className="mt-4 md:mt-6 text-base sm:text-lg max-w-full md:max-w-2xl">
          I&apos;m a current dental student and aspiring content specialist with over
          seven years of experience and a background in dentistry. I specialises
          in{" "}
          <span className="font-bold">
            creating high-quality dental content
          </span>{" "}
          designed for marketing and professional branding.
          <br />
          <br /> My work focuses on producing compelling visuals that strengthen
          the online presence of dental practices and highlight their clinical
          expertise. With my combined knowledge of dentistry and photography,
          I bring a precise and creative approach to every project. My
          aim is to support dental professionals in presenting their work with
          clarity and impact, ensuring their practices stand out in an
          increasingly competitive digital environment.
        </p>
        <button className="mt-4 md:mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition text-base sm:text-lg w-full sm:w-auto">
          contact me
        </button>
      </div>
    </div>
  );
}
