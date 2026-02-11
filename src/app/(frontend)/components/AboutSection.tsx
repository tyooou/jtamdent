"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ProfileData = {
  id: string;
  filename: string;
  alt: string;
  url: string;
};

export default function AboutSection() {
  const [profileImage, setProfileImage] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [aboutContent, setAboutContent] = useState({
    heading: "Hey, I'm Jaidyn.",
    content: "I'm a current dental student with over eight years of photography and videography experience, delivering premium visual content for dental and healthcare professionals.\n\nFrom intra-oral macro photography to full-scale videography, my aim is to support dental professionals in presenting their work with clarity and impact. With a deep understanding of the industry, I simplify complex clinical work into clear, engaging visuals that build trust and strengthen your brand online."
  });

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          if (data.heading && data.content) {
            setAboutContent({
              heading: data.heading,
              content: data.content
            });
          }
        }
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };

    fetchAboutContent();
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch("/api/profile");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.url)
        {
          setProfileImage({
            id: data.id,
            filename: data.filename,
            alt: data.alt,
            url: data.url,
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
          <Image
            src={profileImage.url}
            alt={profileImage.alt || "Jaidyn Tam"}
            width={384}
            height={384}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded shadow-lg"
            priority
          />
        ) : (
          <Image
            src="/jaidyn-tam.jpg"
            alt="Jaidyn Tam"
            width={384}
            height={384}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded shadow-lg"
            priority
          />
        )}
      </div>
      <div className="w-full md:w-auto text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{aboutContent.heading}</h1>
        <p className="mt-4 md:mt-6 text-base sm:text-lg max-w-full md:max-w-2xl whitespace-pre-line">
          {aboutContent.content}
        </p>
        <button
          className="mt-4 md:mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition text-sm sm:text-md w-full sm:w-auto rounded-xl cursor-pointer"
          type="button"
          onClick={() => {
            const element = document.getElementById('contact');
            if (element && typeof window !== 'undefined') {
              const navbarHeight = window.innerWidth < 768 ? 64 : 112;
              const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
              window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
              });
            } else {
              window.location.hash = '#contact';
            }
          }}
        >
         Get in touch!
        </button>
      </div>
    </div>
  );
}
