import CountUp from "./CountUp";

export default function Metric({
  number = 1003,
  duration = 4000,
  isPlused = false,
  title = "clients",
  description = "and counting.",
  className = "",
}) {
  return (
    <div
      className={`rounded rounded-2xl border flex flex-col items-left p-8 transition-transform duration-200 hover:scale-95 cursor-pointer ${className}`}
    >
      <CountUp
        target={number}
        duration={duration}
        isPlused={isPlused}
        className="text-black font-semibold text-7xl mb-3"
      />
      <h1 className="font-bold text-2xl mb-1">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
  );
}
