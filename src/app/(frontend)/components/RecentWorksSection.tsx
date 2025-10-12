"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Project {
  title: string;
  description: string;
}

export default function RecentWorksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showDragCursor, setShowDragCursor] = useState(false);

  const projects: Project[] = [
    {
      title: "Dental Practice Branding",
      description:
        "Complete visual identity and photography for a modern dental practice, showcasing their state-of-the-art facilities.",
    },
    {
      title: "Orthodontic Treatment Documentation",
      description:
        "Before and after photography series documenting smile transformations and treatment progress.",
    },
    {
      title: "Clinic Interior Photography",
      description:
        "Professional architectural photography highlighting the clean, modern design of a dental clinic.",
    },
    {
      title: "Educational Content Creation",
      description:
        "Video production for patient education materials covering various dental procedures and treatments.",
    },
    {
      title: "Team Portrait Session",
      description:
        "Professional headshots and team photography for dental practice marketing materials.",
    },
  ];

  // Responsive card dimensions
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return Math.min(window.innerWidth - 100, 280); // Mobile: smaller cards, max 280px
      if (window.innerWidth < 768) return 400; // Small tablet: reduced from 500
      if (window.innerWidth < 1024) return 500; // Tablet: reduced from 600
      return 700; // Desktop: reduced from 800
    }
    return 700; // Default for SSR
  };

  const [cardWidth, setCardWidth] = useState(700);
  const gap = typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 16; // Smaller gap on mobile

  // Get container width and update card dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setCardWidth(getCardWidth());
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Center offset to keep the active card centered
  const getPadding = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 32 : 80; // 16px * 2 for mobile, 40px * 2 for desktop
    }
    return 80;
  };
  
  const centerOffset = containerWidth && cardWidth
    ? (containerWidth - getPadding()) / 2 - cardWidth / 2
    : 0;

  // Handle mouse movement for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setShowDragCursor(true);
  };

  const handleMouseLeave = () => {
    setShowDragCursor(false);
  };

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-10 overflow-hidden">
      {/* Custom drag cursor - hidden on mobile */}
      <motion.div
        className="fixed pointer-events-none z-50 bg-black text-white rounded-full px-3 py-1 text-sm font-medium transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showDragCursor ? 1 : 0,
          scale: showDragCursor ? 1 : 0.8,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        drag
      </motion.div>

      <div className="items-center text-center mb-6 md:mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-2">Recent Work</h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Check out some of my recent projects that showcase my skills and
          expertise.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full overflow-hidden py-8 md:py-12">
        <motion.div
          className="flex cursor-none select-none md:cursor-none"
          style={{ 
            gap: `${gap}px`,
            paddingLeft: typeof window !== 'undefined' && window.innerWidth < 640 ? '16px' : '40px',
            paddingRight: typeof window !== 'undefined' && window.innerWidth < 640 ? '16px' : '40px'
          }}
          drag="x"
          dragConstraints={{
            left: -(projects.length - 1) * (cardWidth + gap),
            right: 0,
          }}
          dragElastic={0.1}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDragEnd={(e, info) => {
            const threshold = typeof window !== 'undefined' && window.innerWidth < 640 ? 30 : 50;
            if (info.offset.x > threshold && currentIndex > 0)
              setCurrentIndex(currentIndex - 1);
            else if (
              info.offset.x < -threshold &&
              currentIndex < projects.length - 1
            )
              setCurrentIndex(currentIndex + 1);
          }}
          animate={{ x: -currentIndex * (cardWidth + gap) + centerOffset }}
          transition={{ 
            type: "spring", 
            damping: typeof window !== 'undefined' && window.innerWidth < 640 ? 25 : 20, 
            stiffness: typeof window !== 'undefined' && window.innerWidth < 640 ? 200 : 300 
          }}
        >
          {projects.map((project, i) => {
            const isCenter = i === currentIndex;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const cardHeight = isMobile ? cardWidth * 1.1 : cardWidth * 0.6;
            
            return (
              <motion.div
                key={i}
                className="flex-shrink-0 p-3 sm:p-4 md:p-6 border rounded-lg md:rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
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
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-2 leading-tight">{project.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{project.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-6 md:mt-8 space-x-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              i === currentIndex 
                ? "bg-black scale-110" 
                : "bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <p className="text-xs text-gray-500">← Swipe to navigate →</p>
      </div>
    </div>
  );
}
