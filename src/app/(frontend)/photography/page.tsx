import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import MediaSection from "../components/MediaSection";

export default function Photography() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1">
        <MediaSection
          url="/api/photos"
          title="Photography"
          description="A collection of my photography work."
          type="photo"
        />
      </main>
      <Footer />
    </div>
  );
}
