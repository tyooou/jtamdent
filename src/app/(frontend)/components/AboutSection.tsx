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
        const response = await fetch("/api/profile");
        const data = await response.json();

        setProfileImage(data?.docs?.[0] || null);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="text-black flex flex-col items-center p-10 gap-10 md:gap-20 md:flex-row">
      <div>
        {loading ? (
          <div className="w-100 h-100 bg-gray-200 animate-pulse rounded"></div>
        ) : profileImage ? (
          <img
            src={profileImage.url}
            alt={profileImage.alt || "Jaidyn Tam"}
            className="w-100 h-100 mx-auto"
          />
        ) : (
          <img
            src="/jaidyn-tam.jpg"
            alt="Jaidyn Tam"
            className="w-100 h-100 mx-auto"
          />
        )}
      </div>
      <div>
        <h1 className="text-5xl font-bold">Hey, I'm Jaidyn Tam.</h1>
        <p className="mt-6 text-lg max-w-2xl">
          I'm a current dental student and aspiring content specialist with over
          seven years of experience and a background in dentistry. I specialises
          in{" "}
          <span className="font-bold">
            creating high-quality dental content
          </span>{" "}
          designed for marketing and professional branding.
          <br />
          <br /> My work focuses on producing compelling visuals that strengthen
          the online presence of dental practices and highlight their clinical
          expertise. With his combined knowledge of dentistry and photography,
          Jayden brings a precise and creative approach to every project. His
          aim is to support dental professionals in presenting their work with
          clarity and impact, ensuring their practices stand out in an
          increasingly competitive digital environment.
        </p>
        <button className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-lg">
          contact me
        </button>
      </div>
    </div>
  );
}
