import { useEffect, useState } from "react";
import Slogan from "./Slogan";

export default function LandingVideo() {
  const [showScroll, setShowScroll] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Device type detection (client only)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch video when device type changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchVideo = async () => {
      try {
        const type = isMobile ? "mobile" : "desktop";
        const res = await fetch(`/api/landing-videos?where[type][equals]=${type}`);
        const data = await res.json();
        const videoDoc = data.docs?.[0];
        let fileUrl = videoDoc?.url || null;
        if (fileUrl && !fileUrl.startsWith("http")) {
          // Prepend domain if not absolute
          fileUrl = `${window.location.origin}${fileUrl}`;
        }
        setVideoUrl(fileUrl);
      } catch (err) {
        setVideoUrl(null)
        console.error("Error fetching landing video:", err);
      }
    };
    fetchVideo();
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      // Only show scroll indicator if near the top of the page
      setShowScroll(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen md:min-h-[80vh] lg:min-h-screen">
      {videoUrl && (
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="absolute inset-0 bg-black opacity-70 md:opacity-80 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center text-white px-8 sm:px-10 md:px-12">
        <div className="w-full max-w-4xl mx-auto">
          <Slogan />
        </div>
      </div>
      {/* Scroll Down Indicator */}
      <div
        className={`absolute bottom-[10vh] sm:bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none transition-opacity duration-500 ${showScroll ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="animate-bounce text-white text-md mb-1 select-none">{isMobile ? "Swipe up" : "Scroll down"}</span>
        <svg className="w-6 h-6 animate-bounce text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {isMobile ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          )}
        </svg>
      </div>
    </div>
  );
}
