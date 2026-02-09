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
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
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
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto p-8 md:p-6 lg:p-10"
    >
      <Metric
        number={300}
        duration={2000}
        isPlused={true}
        shouldStart={isVisible}
        title="Hours of content"
        description="Capturing compelling visual stories that showcase the artistry of modern dentistry."
      />
      <Metric
        number={25}
        duration={2500}
        isPlused={true}
        shouldStart={isVisible}
        title="Projects completed"
        description="From chairside cases to comprehensive event documentation, each project is client-tailored to tell a unique story."
      />
      <Metric
        number={8}
        duration={3000}
        isPlused={true}
        shouldStart={isVisible}
        title="Years of experience"
        description="Combining dental industry knowledge with professional photography and videography expertise."
      />
      <div className="col-span-1 md:col-span-3 rounded-2xl w-full border p-6 md:p-8 lg:p-10 mt-4 md:mt-0" id="contact">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-1">Interested?</h1>
        <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-2">Let&apos;s chat over coffee.</p>
        <p className="text-sm md:text-base mb-6 md:mb-4 leading-relaxed">
          Have a project or idea in mind? I&apos;d love to chat and see how I can help bring your vision to life.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
