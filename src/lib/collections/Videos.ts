import { CollectionConfig } from "payload";

const Videos: CollectionConfig = {
  slug: "videos",
  upload: {
    mimeTypes: ["video/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Promotional", value: "promotional" },
        { label: "Interview", value: "interview" },
      ],
      required: true,
      defaultValue: "promotional",
    },
  ],
  access: {
    read: () => true, // Allow public read access
  },
};

export default Videos;
