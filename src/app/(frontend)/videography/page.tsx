import NavigationBar from "../components/NavigationBar";
import MediaSection from "../components/MediaSection";
import Footer from "../components/Footer";

export default function Videography() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1">
        <MediaSection
          url="/api/videos"
          title="Videography"
          description="A collection of my videography work."
          type="video"
        />
      </main>
      <Footer />
    </div>
  );
}
