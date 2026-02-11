import type { CollectionConfig } from "payload";

const About: CollectionConfig = {
  slug: "about",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Hey, I'm Jaidyn.",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      defaultValue: "I'm a current dental student with over eight years of photography and videography experience, delivering premium visual content for dental and healthcare professionals.\n\nFrom intra-oral macro photography to full-scale videography, my aim is to support dental professionals in presenting their work with clarity and impact. With a deep understanding of the industry, I simplify complex clinical work into clear, engaging visuals that build trust and strengthen your brand online.",
    },
  ],
  access: {
    read: () => true,
  },
};

export default About;
