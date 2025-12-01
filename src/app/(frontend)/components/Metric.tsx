import CountUp from "./CountUp";

export default function Metric({
  number = 1003,
  duration = 4000,
  isPlused = false,
  title = "clients",
  description = "and counting.",
  className = "",
  shouldStart = true,
}) {
  return (
    <div
      className={`rounded rounded-2xl border flex flex-col items-left p-4 md:p-6 lg:p-8 transition-transform duration-200 hover:scale-95 ${className}`}
    >
      <CountUp
        target={number}
        duration={duration}
        isPlused={isPlused}
        shouldStart={shouldStart}
        className="text-black font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 md:mb-3"
      />
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-1">{title}</h1>
      <p className="text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  );
}
