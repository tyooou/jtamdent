"use client";

import { useEffect, useRef, useState } from "react";
import Metric from "./Metric";
import ContactForm from "./ContactForm";

export default function MetricSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div 
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto p-4 md:p-6 lg:p-10"
    >
      <Metric
        number={750}
        duration={2000}
        isPlused={true}
        shouldStart={isVisible}
        title="Hours of content"
        description="Capturing and crafting compelling visual stories that showcase the artistry of modern dentistry."
      />
      <Metric
        number={20}
        duration={2500}
        isPlused={true}
        shouldStart={isVisible}
        title="Projects completed"
        description="From intimate portraits to comprehensive practice documentation, each project tells a unique story."
      />
      <Metric
        number={7}
        duration={3000}
        isPlused={true}
        shouldStart={isVisible}
        title="Years of experience"
        description="Combining deep dental industry knowledge with professional photography and videography expertise."
      />
      <div className="col-span-1 md:col-span-3 rounded-2xl w-full border p-6 md:p-8 lg:p-10 mt-4 md:mt-0" id="contact">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-1">Interested?</h1>
        <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-2">Let's chat over coffee.</p>
        <p className="text-sm md:text-base mb-6 md:mb-4 leading-relaxed">
          I'm excited to discuss how we can elevate your dental practice through
          stunning visual storytelling.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
