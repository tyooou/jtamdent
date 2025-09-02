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

  const cardWidth = 1000; // px
  const gap = 16; // px

  // Get container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Center offset to keep the active card centered
  const centerOffset = containerWidth
    ? containerWidth / 2 - cardWidth / 2 - gap * 2
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
    <div className="flex flex-col items-center p-10 gap-10">
      {/* Custom drag cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 bg-black text-white rounded-full px-3 py-1 text-sm font-medium transform -translate-x-1/2 -translate-y-1/2"
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

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Recent Work</h2>
        <p className="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
          Check out some of my recent projects that showcase my skills and
          expertise.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full overflow-hidden p-10">
        <motion.div
          className="flex gap-4 cursor-none select-none"
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
            const threshold = 50;
            if (info.offset.x > threshold && currentIndex > 0)
              setCurrentIndex(currentIndex - 1);
            else if (
              info.offset.x < -threshold &&
              currentIndex < projects.length - 1
            )
              setCurrentIndex(currentIndex + 1);
          }}
          animate={{ x: -currentIndex * (cardWidth + gap) + centerOffset }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {projects.map((project, i) => {
            const isCenter = i === currentIndex;
            return (
              <motion.div
                key={i}
                className="flex-shrink-0 p-4 border rounded-lg bg-white shadow-lg"
                style={{ width: cardWidth, height: cardWidth * 0.6 }}
                animate={{ scale: isCenter ? 1 : 0.85 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                whileHover={{ scale: isCenter ? 1.05 : 0.85 }}
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
