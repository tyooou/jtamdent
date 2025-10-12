import Slogan from "./Slogan";

export default function LandingVideo() {
  return (
    <div className="relative w-full min-h-screen md:min-h-[80vh] lg:min-h-screen">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover absolute inset-0"
        preload="metadata"
      >
        <source src="/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-70 md:opacity-80 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center text-white px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <Slogan />
        </div>
      </div>
    </div>
  );
}
