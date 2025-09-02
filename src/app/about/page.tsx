import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import AboutSection from "../components/AboutSection";
import Section from "../components/Section";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <Section>
        <AboutSection />
      </Section>
      <Footer />
    </div>
  );
}
