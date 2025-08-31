import NavigationBar from "./components/NavigationBar";
import Slogan from "./components/Slogan";
import Footer from "./components/Footer";
import LandingVideo from "./components/LandingVideo";
import Section from "./components/Section";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <LandingVideo />
      <Section />
      <Footer />
    </div>
  );
}
