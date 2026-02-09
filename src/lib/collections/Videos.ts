import { CollectionConfig } from "payload";

const Videos: CollectionConfig = {
  slug: "videos",
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
    {
      name: "vimeoUrl",
      label: "Vimeo URL",
      type: "text",
      required: true,
    },
    {
      name: "aspectRatio",
      label: "Aspect Ratio",
      type: "select",
      options: [
        { label: "16:9 (Landscape)", value: "16:9" },
        { label: "9:16 (Portrait)", value: "9:16" },
      ],
      required: false,
      defaultValue: "16:9",
    },
  ],
  access: {
    read: () => true,
  },
};

export default Videos;
