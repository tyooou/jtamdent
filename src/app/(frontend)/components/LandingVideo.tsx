import { useEffect, useRef, useState } from "react";
import Slogan from "./Slogan";

type LandingVideoProps = {
  isActive?: boolean;
};

export default function LandingVideo({ isActive = true }: LandingVideoProps) {
  const [showScroll, setShowScroll] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const cacheKey = `landing-video-url-${isMobile ? "mobile" : "desktop"}`;
    
    (async () => {
      try {
        setIsVideoReady(false);
        // Check if URL is cached
        const cachedUrl = localStorage.getItem(cacheKey);
        if (cachedUrl) {
          setVideoUrl(cachedUrl);
          return;
        }

        // Fetch from API
        const type = isMobile ? "mobile" : "desktop";
        const res = await fetch(`/api/landing-videos?where[type][equals]=${type}`);
        const data = await res.json();
        let fileUrl = data.docs?.[0]?.url || null;
        
        if (fileUrl && !fileUrl.startsWith("http")) {
          fileUrl = `${window.location.origin}${fileUrl}`;
        }
        
        if (fileUrl) {
          localStorage.setItem(cacheKey, fileUrl);
          setVideoUrl(fileUrl);
        } else {
          setVideoUrl(null);
          setIsVideoReady(true);
        }
      } catch (err) {
        setVideoUrl(null);
        setIsVideoReady(true);
        console.error("Error fetching landing video:", err);
      }
    })();
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY < 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isActive) {
      document.body.style.overflow = "";
      return;
    }
    if (!isVideoReady) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    document.body.style.overflow = "";
  }, [isVideoReady]);

  useEffect(() => {
    if (!isVideoReady) {
      setShowLoadingOverlay(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowLoadingOverlay(false);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [isVideoReady]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isActive && showLoadingOverlay) {
      document.body.classList.add("landing-loading");
      return () => document.body.classList.remove("landing-loading");
    }
    document.body.classList.remove("landing-loading");
  }, [isActive, showLoadingOverlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      return;
    }

    if (isVideoReady) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => undefined);
      }
    }
  }, [isActive, isVideoReady, videoUrl]);

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
          preload="auto"
          onCanPlay={() => setIsVideoReady(true)}
          onLoadedData={() => setIsVideoReady(true)}
          ref={videoRef}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {showLoadingOverlay && isActive && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
            isVideoReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center gap-5">
            <p className="loading-title text-white text-4xl sm:text-6xl font-bold">
              jtamdent
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-60 md:opacity-60 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center text-white px-8 sm:px-10 md:px-12">
        <div className="w-full max-w-4xl mx-auto">
          <Slogan />
        </div>
      </div>
      {/* Scroll Down Indicator */}
      {isActive && (
        <div
          className={`absolute bottom-[10vh] sm:bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none transition-opacity duration-500 ${showScroll ? "opacity-100" : "opacity-0"}`}
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
      )}
      <style jsx>{`
        .loading-title {
          animation: loadingPulse 1.4s ease-in-out infinite;
        }

        @keyframes loadingPulse {
          0% {
            opacity: 0.35;
            transform: scale(0.98);
            letter-spacing: 0.2em;
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
            letter-spacing: 0.35em;
          }
          100% {
            opacity: 0.35;
            transform: scale(0.98);
            letter-spacing: 0.2em;
          }
        }
      `}</style>
    </div>
  );
}
