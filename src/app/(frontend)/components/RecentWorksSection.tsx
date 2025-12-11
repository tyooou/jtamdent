"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  url: string;
  mimeType?: string;
  filename?: string;
}

export default function RecentWorksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/recent-works?limit=10&sort=-createdAt");
        const data = await res.json();
        // Map Payload docs to Project[]
        const mapped = (data.docs || []).map((doc: Project) => ({
          title: doc.title,
          description: doc.description,
          url: doc.url?.startsWith('http') ? doc.url : doc.url,
          mimeType: doc.mimeType,
          filename: doc.filename,
          
        }));
        setProjects(mapped);
      } catch (err) {
        setProjects([])
        console.error("Error fetching recent works:", err);
      }
    };
    fetchProjects();
  }, []);

  // Responsive card dimensions and gap (client only, avoid SSR window usage)
  const [cardWidth, setCardWidth] = useState(700);
  const [gap, setGap] = useState(16);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let newCardWidth = 700;
      let newGap = 16;
      let mobile = false;
      if (width < 640) {
        newCardWidth = Math.min(width - 100, 280);
        newGap = 12;
        mobile = true;
      } else if (width < 768) {
        newCardWidth = 400;
      } else if (width < 1024) {
        newCardWidth = 500;
      }
      setCardWidth(newCardWidth);
      setGap(newGap);
      setIsMobile(mobile);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Center offset to keep the active card centered
  const getPadding = () => (isMobile ? 32 : 80);
  const centerOffset = containerWidth && cardWidth
    ? (containerWidth - getPadding()) / 2 - cardWidth / 2
    : 0;

  useEffect(() => {
    if (modalProject) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modalProject]);

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-10 overflow-hidden">
      <div className="items-center text-center mb-2 md:mb-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-2">Recent Work</h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Check out some of my recent projects:
        </p>
      </div>

      <div ref={containerRef} className="relative w-full overflow-hidden py-8 md:py-12">
        {/* Carousel navigation arrows */}
        <motion.div
          className="flex select-none"
          style={{ 
            gap: `${gap}px`,
            paddingLeft: isMobile ? '16px' : '40px',
            paddingRight: isMobile ? '16px' : '40px'
          }}
          animate={{ x: -currentIndex * (cardWidth + gap) + centerOffset }}
          transition={{ 
            type: "spring", 
            damping: isMobile ? 25 : 20, 
            stiffness: isMobile ? 200 : 300 
          }}
          drag={isMobile ? 'x' : false}
          dragConstraints={{ left: -((projects.length - 1) * (cardWidth + gap)), right: 0 }}
          dragElastic={0.15}
          onDragEnd={(e, info) => {
            if (isMobile) {
              if (info.offset.x < -50 && currentIndex < projects.length - 1) {
                setCurrentIndex(currentIndex + 1);
              } else if (info.offset.x > 50 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
              }
            }
          }}
        >
          {projects.map((project, i) => {
            const isCenter = i === currentIndex;
            const cardHeight = isMobile ? cardWidth * 1.1 : cardWidth * 0.6;
            return (
              <motion.div
                key={i}
                className="flex-shrink-0 relative border rounded-lg md:rounded-xl bg-black shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden p-0"
                style={{ 
                  width: cardWidth, 
                  height: cardHeight,
                  minWidth: cardWidth,
                  maxWidth: cardWidth
                }}
                animate={{ 
                  scale: isCenter ? 1 : (isMobile ? 0.98 : 0.85),
                  opacity: isCenter ? 1 : 0.7
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                whileHover={{ 
                  scale: isCenter ? (isMobile ? 1.01 : 1.05) : (isMobile ? 0.98 : 0.85),
                  opacity: 1
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (isCenter) {
                    setModalProject(project);
                  } else {
                    setCurrentIndex(i);
                  }
                }}
              >
                {/* Media fills card */}
                {project && project.url && (
                  project.mimeType?.startsWith('video') ? (
                    <video
                      src={project.url}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls={false}
                      muted
                      playsInline
                      preload="metadata"
                      tabIndex={-1}
                      style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    <Image
                      src={project.url}
                      alt={project.title}
                      fill
                      className="absolute inset-0 w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                      priority={i === 0}
                    />
                  )
                )}
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                {/* Title and description overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg">{project.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-white drop-shadow-lg line-clamp-3">{project.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation dots and arrows */}
      <div className="flex flex-row items-center space-x-2 w-full justify-center">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black disabled:opacity-30 transition-all duration-200 cursor-pointer"
          aria-label="Previous project"
          disabled={currentIndex === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 mx-1 ${
              i === currentIndex
                ? "bg-black scale-110"
                : "bg-gray-300 hover:bg-gray-400 active:bg-gray-500 cursor-pointer"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
        <button
          onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1))}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black disabled:opacity-30 transition-all duration-200 cursor-pointer"
          aria-label="Next project"
          disabled={currentIndex === projects.length - 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      {/* View More Buttons - below navigation dots/arrows */}
      <div className="flex flex-row gap-2 mt-6 mb-3 md:mb-0 w-full justify-center">
        <a
          href="/photography"
          className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition-colors text-sm md:text-md text-center min-w-[120px]"
        >
          View Photos
        </a>
        <a
          href="/videography"
          className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition-colors text-sm md:text-md text-center min-w-[120px]"
        >
          View Videos
        </a>
      </div>

      {/* Mobile swipe indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <p className="text-xs text-gray-500">← Swipe to navigate →</p>
      </div>

      {/* Modal for enlarged project */}
      {modalProject && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setModalProject(null)}
        >
          {/* Left arrow */}
          <button
            onClick={e => {
              e.stopPropagation();
              const idx = projects.findIndex(p => p.title === modalProject.title);
              if (idx > 0) {
                setModalProject(projects[idx - 1]);
                setCurrentIndex(idx - 1);
              }
            }}
            className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 md:p-3 min-w-[40px] min-h-[40px] md:min-w-[48px] md:min-h-[48px] rounded-full z-50 disabled:opacity-30 transition-all duration-200 hover:bg-opacity-90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center cursor-pointer"
            style={{ touchAction: 'manipulation' }}
            aria-label="Previous project"
            disabled={projects.findIndex(p => p.title === modalProject.title) === 0}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Right arrow */}
          <button
            onClick={e => {
              e.stopPropagation();
              const idx = projects.findIndex(p => p.title === modalProject.title);
              if (idx < projects.length - 1) {
                setModalProject(projects[idx + 1]);
                setCurrentIndex(idx + 1);
              }
            }}
            className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 md:p-3 min-w-[40px] min-h-[40px] md:min-w-[48px] md:min-h-[48px] rounded-full z-50 disabled:opacity-30 transition-all duration-200 hover:bg-opacity-90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center cursor-pointer"
            style={{ touchAction: 'manipulation' }}
            aria-label="Next project"
            disabled={projects.findIndex(p => p.title === modalProject.title) === projects.length - 1}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div
            className="relative w-full max-w-3xl lg:max-w-4xl rounded-xl shadow-xl p-0 text-center mx-2 sm:mx-4 overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black bg-opacity-80 p-1.5 sm:p-2 rounded-full hover:bg-red-400 hover:text-white hover:bg-opacity-100 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {/* Media fills modal with natural aspect ratio */}
            <div className="relative w-full flex items-center justify-center inset-0" style={{ minHeight: '500px', minWidth: '200px' }}>
              {modalProject && modalProject.url && (
                modalProject.mimeType?.startsWith('video') ? (
                  <video
                    src={modalProject.url}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    style={{ background: '#000', maxHeight: '80vh' }}
                  />
                ) : (
                  <Image
                    src={modalProject.url}
                    alt={modalProject.title}
                    fill
                    className="object-contain"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
