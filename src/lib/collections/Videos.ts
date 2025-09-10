import { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  upload: {
    staticDir: "videos",
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
};
