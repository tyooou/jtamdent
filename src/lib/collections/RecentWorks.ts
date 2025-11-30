import { CollectionConfig } from "payload";

const RecentWorks: CollectionConfig = {
  slug: "recent-works",
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      maxLength: 120,
    },
    {
      name: "description",
      type: "text",
      required: true,
      label: "Short Description",
      maxLength: 240,
    },
  ],
  access: {
    read: () => true, // Allow public read access
  },
};

export default RecentWorks;
