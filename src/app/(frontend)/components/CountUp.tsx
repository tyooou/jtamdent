"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  target: number;
  duration?: number;
  isPlused?: boolean;
  className?: string;
}

export default function CountUp({
  target,
  duration = 2000,
  isPlused = false,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in-out quart function for slower deceleration at the end
      const easeInOutQuart = (t: number) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const easedProgress = easeInOutQuart(progress);
      const currentCount = Math.floor(target * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure we end at the exact target
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);

  return (
    <div className={`${className}`}>
      {count.toLocaleString()}
      {isPlused && "+"}
    </div>
  );
}
