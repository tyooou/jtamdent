import NavigationBar from "./components/NavigationBar";
import Slogan from "./components/Slogan";
import Footer from "./components/Footer";
import LandingVideo from "./components/LandingVideo";
import Section from "./components/Section";
import MetricSection from "./components/MetricSection";
import Metric from "./components/Metric";
import RecentWorksSection from "./components/RecentWorksSection";
import AboutLanding from "./components/AboutLanding";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <LandingVideo />
      <Section>
        <AboutLanding />
      </Section>
      <Section>
        <RecentWorksSection />
      </Section>
      <Section>
        <MetricSection />
      </Section>
      <Footer />
    </div>
  );
}
