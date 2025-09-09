import NavigationBar from "../components/NavigationBar";
import GallerySection from "./components/GallerySection";
import Footer from "../components/Footer";

export default function Photography() {
  return (
    <div>
      <NavigationBar />
      <GallerySection
        url="/api/photos"
        title="Photography"
        description="A collection of my photography work."
        enableThumbnails={true}
        thumbnailQuality="high"
      />
      <Footer />
    </div>
  );
}
