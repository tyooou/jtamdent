import NavigationBar from "../components/NavigationBar";
import VideoGallerySection from "./components/VideoGallerySection";
import Footer from "../components/Footer";

export default function Videography() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1">
        <VideoGallerySection
          url="/api/videos"
          title="Videography"
          description="A collection of my videography work."
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 3
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
