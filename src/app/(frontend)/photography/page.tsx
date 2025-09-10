import NavigationBar from "../components/NavigationBar";
import GallerySection from "./components/GallerySection";
import Footer from "../components/Footer";

export default function Photography() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex-1">
        <GallerySection
          url="/api/photos"
          title="Photography"
          description="A collection of my photography work."
          enableThumbnails={true}
          thumbnailQuality="high"
        />
      </div>
      <Footer />
    </div>
  );
}
