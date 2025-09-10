import Slogan from "./Slogan";

export default function LandingVideo() {
  return (
    <div className="relative w-full h-auto">
      <video autoPlay loop muted className="w-full block">
        <source src="/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-80 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center text-white ">
        <Slogan />
      </div>
    </div>
  );
}
