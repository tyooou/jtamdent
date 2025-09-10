"use client";

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import LandingVideo from "./components/LandingVideo";
import Section from "./components/Section";
import MetricSection from "./components/MetricSection";
import RecentWorksSection from "./components/RecentWorksSection";
import AboutSection from "./components/AboutSection";
import InstagramSection from "./components/InstagramSection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to it
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the '#'
      const element = document.getElementById(sectionId);
      if (element) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, []);
  return (
    <div>
      <NavigationBar />
      <LandingVideo />
      <Section>
        <div id="about">
          <AboutSection />
        </div>
      </Section>
      <Section>
        <RecentWorksSection />
      </Section>
      <MetricSection />
      <Section>
        <InstagramSection />
      </Section>
      <Footer />
    </div>
  );
}
