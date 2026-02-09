import type { CollectionConfig } from "payload";

const LandingVideo: CollectionConfig = {
  slug: "landing-videos",
  upload: {
    mimeTypes: ["video/*"],
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      label: "Label",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Desktop", value: "desktop" },
        { label: "Mobile", value: "mobile" },
      ],
      label: "Video Type",
    },
  ],
  access: {
    read: () => true,
  },
};

export default LandingVideo;
