import NavigationBar from "../components/NavigationBar";
import GallerySection from "./components/GallerySection";
import Footer from "../components/Footer";

export default function Photography() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1">
        <GallerySection
          url="/api/photos"
          title="Photography"
          description="A collection of my photography work."
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 3
          }}
          enableThumbnails={true}
          thumbnailQuality="high"
        />
      </main>
      <Footer />
    </div>
  );
}
