import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import LandingVideo from "./components/LandingVideo";
import Section from "./components/Section";
import MetricSection from "./components/MetricSection";
import RecentWorksSection from "./components/RecentWorksSection";
import AboutSection from "./components/AboutSection";
import InstagramSection from "./components/InstagramSection";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <LandingVideo />
      <Section>
        <AboutSection />
      </Section>
      <Section>
        <RecentWorksSection />
      </Section>
      <Section>
        <MetricSection />
      </Section>
      <Section>
        <InstagramSection />
      </Section>
      <Footer />
    </div>
  );
}
