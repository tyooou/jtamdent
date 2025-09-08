import Metric from "./Metric";
import ContactForm from "./ContactForm";

export default function MetricSection() {
  return (
    <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto p-10">
      <Metric
        number={750}
        duration={2000}
        isPlused={true}
        title="Hours of content"
        description="Capturing and crafting compelling visual stories that showcase the artistry of modern dentistry."
      />
      <Metric
        number={20}
        duration={2500}
        isPlused={true}
        title="Projects completed"
        description="From intimate portraits to comprehensive practice documentation, each project tells a unique story."
      />
      <Metric
        number={7}
        duration={3000}
        isPlused={true}
        title="Years of experience"
        description="Combining deep dental industry knowledge with professional photography and videography expertise."
      />
      <div className="col-span-3 rounded-2xl w-full border p-10">
        <h1 className="text-3xl font-bold mb-1">Interested?</h1>
        <p className="text-lg text-gray-600 mb-2">Let's chat over coffee.</p>
        <p className="text-base mb-4">
          I'm excited to discuss how we can elevate your dental practice through
          stunning visual storytelling.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
